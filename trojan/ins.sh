#!/bin/bash

# 字体颜色
blue() {
  echo -e "\033[34m\033[01m$1\033[0m"
}
green() {
  echo -e "\033[32m\033[01m$1\033[0m"
}
red() {
  echo -e "\033[31m\033[01m$1\033[0m"
}

# 系统识别增强版
if [[ -f /etc/os-release ]]; then
  source /etc/os-release
  case "$ID" in
    almalinux|rocky|centos|rhel)
      release="centos"
      systemPackage="dnf"
      systempwd="/usr/lib/systemd/system/"
      ;;
    debian)
      release="debian"
      systemPackage="apt-get"
      systempwd="/lib/systemd/system/"
      ;;
    ubuntu)
      release="ubuntu"
      systemPackage="apt-get"
      systempwd="/lib/systemd/system/"
      ;;
    *)
      red "当前系统（$ID）不受脚本支持"
      exit 1
      ;;
  esac
else
  red "无法识别系统发行版，请手动确认"
  exit 1
fi

function install_trojan() {
  # 停止 nginx 并检查端口
  systemctl stop nginx >/dev/null 2>&1
  $systemPackage -y install net-tools socat curl wget unzip zip tar
  
  Port80=$(netstat -tlpn | awk -F '[: ]+' '$1=="tcp"{print $5}' | grep -w 80)
  Port443=$(netstat -tlpn | awk -F '[: ]+' '$1=="tcp"{print $5}' | grep -w 443)
  
  if [ -n "$Port80" ] || [ -n "$Port443" ]; then
    red "==========================================================="
    red "检测到 80 或 443 端口被占用，请先停止占用进程后再运行"
    red "==========================================================="
    exit 1
  fi

  # SELinux 检测与处理
  if [ -f /etc/selinux/config ]; then
    CHECK=$(grep SELINUX= /etc/selinux/config | grep -v "#")
    if [[ "$CHECK" == *"enforcing"* ]] || [[ "$CHECK" == *"permissive"* ]]; then
      red "======================================================================="
      red "检测到 SELinux 处于开启或宽容状态。AlmaLinux 建议关闭 SELinux 以申请证书。"
      red "======================================================================="
      read -p "是否自动修改配置并重启服务器? [Y/n] :" yn
      [ -z "${yn}" ] && yn="y"
      if [[ $yn == [Yy] ]]; then
        sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
        sed -i 's/SELINUX=permissive/SELINUX=disabled/g' /etc/selinux/config
        setenforce 0
        blue "VPS 重启中，请稍后重新连接并运行脚本..."
        reboot
        exit 0
      fi
    fi
  fi

  # 针对 AlmaLinux / CentOS 的特定初始化
  if [ "$release" == "centos" ]; then
    systemctl stop firewalld
    systemctl disable firewalld
    # 注意：AlmaLinux 不再需要手动添加外部 nginx.org 源，自带的就很稳定
    $systemPackage -y install epel-release
  elif [ "$release" == "ubuntu" ] || [ "$release" == "debian" ]; then
    apt-get update
    [ "$release" == "ubuntu" ] && { systemctl stop ufw; systemctl disable ufw; }
  fi

  # 安装 Nginx
  $systemPackage -y install nginx
  systemctl enable nginx
  systemctl stop nginx

  green "======================="
  blue "请输入绑定到本VPS的域名："
  green "======================="
  read your_domain
  
  local_addr=$(curl -s ipv4.icanhazip.com)
  real_addr=$(ping ${your_domain} -c 1 | sed '1{s/[^(]*(//;s/).*//;q}')

  if [ "$real_addr" == "$local_addr" ]; then
    green "域名解析正常，开始安装..."
    
    # 配置 Nginx
    cat >/etc/nginx/nginx.conf <<-EOF
user root;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;
events { worker_connections 1024; }
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 120;
    server {
        listen 80;
        server_name $your_domain;
        root /usr/share/nginx/html;
        index index.html;
    }
}
EOF
    # 下载伪装站
    rm -rf /usr/share/nginx/html/*
    mkdir -p /usr/share/nginx/html/
    wget https://github.com/xyz690/Trojan/raw/master/web.zip -O /usr/share/nginx/html/web.zip
    unzip -d /usr/share/nginx/html/ /usr/share/nginx/html/web.zip
    
    # 申请证书
    mkdir -p /usr/src/trojan-cert
    curl https://get.acme.sh | sh
    ~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
    ~/.acme.sh/acme.sh --issue -d $your_domain --standalone
    ~/.acme.sh/acme.sh --installcert -d $your_domain \
      --key-file /usr/src/trojan-cert/private.key \
      --fullchain-file /usr/src/trojan-cert/fullchain.cer

    if test -s /usr/src/trojan-cert/fullchain.cer; then
      # 下载并配置 Trojan (逻辑保留原样，仅做路径兼容优化)
      cd /usr/src
      wget https://api.github.com/repos/trojan-gfw/trojan/releases/latest -O latest-trojan
      latest_version=$(grep tag_name latest-trojan | awk -F '[:,"v]' '{print $6}')
      wget https://github.com/trojan-gfw/trojan/releases/download/v${latest_version}/trojan-${latest_version}-linux-amd64.tar.xz
      tar xf trojan-${latest_version}-linux-amd64.tar.xz
      
      # 密码随机生成
      trojan_passwd=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 12)
      
      # 创建 Trojan 服务端配置
      cat >/usr/src/trojan/server.conf <<-EOF
{
    "run_type": "server",
    "local_addr": "0.0.0.0",
    "local_port": 443,
    "remote_addr": "127.0.0.1",
    "remote_port": 80,
    "password": ["$trojan_passwd"],
    "ssl": {
        "cert": "/usr/src/trojan-cert/fullchain.cer",
        "key": "/usr/src/trojan-cert/private.key",
        "cipher_tls13":"TLS_AES_128_GCM_SHA256:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_256_GCM_SHA384",
        "alpn": ["http/1.1"]
    }
}
EOF

      # 写入 Systemd 服务
      cat >${systempwd}trojan.service <<-EOF
[Unit]
Description=trojan
After=network.target
[Service]
Type=simple
ExecStart=/usr/src/trojan/trojan -c "/usr/src/trojan/server.conf"
Restart=on-failure
[Install]
WantedBy=multi-user.target
EOF

      chmod +x ${systempwd}trojan.service
      systemctl daemon-reload
      systemctl start trojan nginx
      systemctl enable trojan nginx

      blue "========================== Trojan 安装完成 ================================"
      red "域名：$your_domain"
      red "密码：$trojan_passwd"
      red "端口：443"
      green "=========================================================================="
    else
      red "证书申请失败，请检查防火墙或域名解析"
    fi
  else
    red "域名解析 IP ($real_addr) 与本机 IP ($local_addr) 不匹配！"
  fi
}

function remove_trojan() {
  systemctl stop trojan nginx
  systemctl disable trojan nginx
  rm -f ${systempwd}trojan.service
  $systemPackage remove -y nginx
  rm -rf /usr/src/trojan*
  rm -rf /usr/share/nginx/html/*
  green "卸载完成。"
}

# 菜单逻辑保持不变...
function start_menu() {
  clear
  green " Trojan AlmaLinux 适配版脚本 "
  echo
  green " 1. 安装 Trojan"
  red " 2. 卸载 Trojan"
  blue " 0. 退出"
  echo
  read -p "请输入数字:" num
  case "$num" in
    1) install_trojan ;;
    2) remove_trojan ;;
    0) exit 0 ;;
    *) start_menu ;;
  esac
}

start_menu

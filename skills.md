# Claude Code 三大技能框架使用指南

> 本文档详细介绍 Agent Skills、Superpowers 和 Spec Kit 三大框架的安装、使用方式和实战教程。

---

## 目录

1. [Agent Skills（官方技能框架）](#1-agent-skills官方技能框架)
2. [Superpowers（超能力框架）](#2-superpowers超能力框架)
3. [Spec Kit（规范驱动开发工具包）](#3-spec-kit规范驱动开发工具包)
4. [实战对比与选择建议](#4-实战对比与选择建议)

---

## 1. Agent Skills（Addy Osmani 技能框架）

### 1.1 简介

Agent Skills 是由 Addy Osmani 创建的完整软件开发方法论框架，包含 20 个专业技能和 7 个斜杠命令，覆盖从需求定义到发布上线的完整开发流程。

**核心设计理念：**
- **流程而非散文**：提供步骤式工作流程
- **反理性化**：针对常见的"跳过步骤借口"提供应对方案
- **验证不可妥协**：必须提供证据证明完成
- **渐进式披露**：最小化 token 消耗

### 1.2 安装方式

#### Claude Code（推荐）

```bash
# 添加技能市场
/plugin marketplace add addyosmani/agent-skills

# 安装技能包
/plugin install agent-skills@addy-agent-skills
```

#### 本地安装

```bash
# 克隆仓库
git clone https://github.com/addyosmani/agent-skills.git

# 使用本地目录启动
claude --plugin-dir /path/to/agent-skills
```

#### Gemini CLI

```bash
gemini skills install https://github.com/addyosmani/agent-skills.git --path skills
```

#### Cursor

```bash
# 将 SKILL.md 文件复制到 .cursor/rules/ 目录
cp skills/*/SKILL.md .cursor/rules/
```

### 1.3 七大斜杠命令

| 命令 | 核心原则 | 用途 |
|------|---------|------|
| `/spec` | **Spec before code** | 先写规范，再写代码 |
| `/plan` | **Small, atomic tasks** | 拆分为原子级小任务 |
| `/build` | **One slice at a time** | 一次实现一个切片 |
| `/test` | **Tests are proof** | 测试是完成的证明 |
| `/review` | **Improve code health** | 改善代码健康度 |
| `/code-simplify` | **Clarity over cleverness** | 清晰胜于炫技 |
| `/ship` | **Faster is safer** | 快速发布更安全 |

### 1.4 完整技能列表（20 个）

#### Define 阶段（定义）

| 技能 | 用途 |
|------|------|
| `idea-refine` | 想法精炼，验证想法可行性 |
| `spec-driven-development` | 规范驱动开发，先写规范再编码 |

#### Plan 阶段（规划）

| 技能 | 用途 |
|------|------|
| `planning-and-task-breakdown` | 任务拆分，将大任务分解为原子级步骤 |

#### Build 阶段（构建）

| 技能 | 用途 |
|------|------|
| `incremental-implementation` | 渐进式实现，一次一个切片 |
| `context-engineering` | 上下文工程，优化 AI 理解效率 |
| `source-driven-development` | 源码驱动开发，基于实际代码而非假设 |
| `frontend-ui-engineering` | 前端 UI 工程，组件化开发最佳实践 |
| `test-driven-development` | 测试驱动开发，RED-GREEN-REFACTOR |
| `api-and-interface-design` | API 与接口设计，RESTful 最佳实践 |

#### Verify 阶段（验证）

| 技能 | 用途 |
|------|------|
| `browser-testing-with-devtools` | 使用 DevTools 进行浏览器测试 |
| `debugging-and-error-recovery` | 调试与错误恢复，系统化排查问题 |

#### Review 阶段（审查）

| 技能 | 用途 |
|------|------|
| `code-review-and-quality` | 代码审查与质量检查 |
| `code-simplification` | 代码简化，消除冗余 |
| `security-and-hardening` | 安全加固，OWASP 漏洞检查 |
| `performance-optimization` | 性能优化，识别瓶颈 |

#### Ship 阶段（发布）

| 技能 | 用途 |
|------|------|
| `git-workflow-and-versioning` | Git 工作流与版本管理 |
| `ci-cd-and-automation` | CI/CD 与自动化部署 |
| `deprecation-and-migration` | 弃用与迁移策略 |
| `documentation-and-adrs` | 文档与架构决策记录（ADR） |
| `shipping-and-launch` | 发布上线流程 |

### 1.5 代理角色（Agent Personas）

| 角色 | 视角 | 用途 |
|------|------|------|
| `code-reviewer` | Staff Engineer 视角 | 高标准代码审查 |
| `test-engineer` | QA/测试策略视角 | 测试覆盖与质量保证 |
| `security-auditor` | OWASP/漏洞视角 | 安全审计与加固 |

### 1.6 完整开发流程示例

```bash
# ========== Define 阶段 ==========

# 步骤 1: 精炼想法
> /spec
我想开发一个实时协作的白板应用，支持多人同时绘制

# Claude 将引导你：
# - 定义核心功能边界
# - 识别技术可行性
# - 生成初步规范文档

# 步骤 2: 规范驱动开发
> /spec-driven-development
为白板应用创建详细规范

# ========== Plan 阶段 ==========

# 步骤 3: 任务拆分
> /plan
将白板应用拆分为可执行的小任务

# Claude 将输出：
# Phase 1: 核心画布组件
#   - [ ] Canvas 组件基础结构
#   - [ ] 绘制工具栏
#   - [ ] 颜色选择器
# Phase 2: 实时同步
#   - [ ] WebSocket 连接
#   - [ ] 操作广播机制
# Phase 3: 用户管理
#   - [ ] 用户标识
#   - [ ] 光标显示

# ========== Build 阶段 ==========

# 步骤 4: 渐进式实现
> /build
实现 Canvas 组件，一次一个功能切片

# 步骤 5: 测试驱动开发
> /test-driven-development
为绘制功能编写测试

# Claude 将执行：
# RED: 编写失败的测试
def test_canvas_draw_line():
    canvas = Canvas()
    canvas.draw_line(0, 0, 100, 100)
    assert canvas.has_line_at(0, 0, 100, 100)  # 失败

# GREEN: 实现最小代码
class Canvas:
    def __init__(self):
        self.lines = []
    def draw_line(self, x1, y1, x2, y2):
        self.lines.append((x1, y1, x2, y2))
    def has_line_at(self, x1, y1, x2, y2):
        return (x1, y1, x2, y2) in self.lines

# REFACTOR: 优化结构
class Canvas:
    """实时协作画布"""
    def __init__(self):
        self._elements: List[DrawElement] = []
    
    def draw_line(self, start: Point, end: Point) -> Line:
        line = Line(start, end)
        self._elements.append(line)
        return line

# ========== Verify 阶段 ==========

# 步骤 6: 浏览器测试
> /browser-testing-with-devtools
测试画布在 Chrome 中的渲染性能

# 步骤 7: 调试错误
> /debugging-and-error-recovery
排查 WebSocket 连接断开的问题

# ========== Review 阶段 ==========

# 步骤 8: 代码审查
> /review
审查整个白板应用的代码质量

# 步骤 9: 安全审计
> /security-auditor
检查 WebSocket 连接的安全漏洞

# ========== Ship 阶段 ==========

# 步骤 10: 简化代码
> /code-simplify
简化 Canvas 组件的实现

# 步骤 11: 发布上线
> /ship
准备白板应用的发布

# Claude 将执行：
# - 创建 Git tag
# - 更新 CHANGELOG
# - 验证 CI/CD 流程
# - 准备发布说明
```

---

## 2. Superpowers（超能力框架）

### 2.1 简介

Superpowers 是由 Jesse Vincent 创建的完整多代理开发工作流框架，强调测试驱动开发（TDD）和结构化方法论。v5.0.7 已官方集成到 Claude Code。

### 2.2 安装方式

#### Claude Code

```bash
/plugin install superpowers@claude-plugins-official
```

#### 其他平台

```bash
# OpenAI Codex CLI
/plugins  # 搜索 "superpowers"

# Cursor
/add-plugin superpowers

# GitHub Copilot CLI
copilot plugin marketplace add obra/superpowers-marketplace
copilot plugin install superpowers@superpowers-marketplace

# Gemini CLI
gemini extensions install https://github.com/obra/superpowers
```

### 2.3 核心技能列表

| 技能名称 | 用途 |
|----------|------|
| `brainstorming` | 头脑风暴，分块验证设计想法 |
| `using-git-worktrees` | 在新分支创建隔离工作空间 |
| `writing-plans` | 将工作拆分为 2-5 分钟任务 |
| `subagent-driven-development` | 调度子代理并两阶段审查 |
| `test-driven-development` | 强制 RED-GREEN-REFACTOR 循环 |
| `requesting-code-review` | 根据计划进行代码审查 |
| `finishing-a-development-branch` | 合并/PR 决策工作流 |

### 2.4 完整开发流程示例

```bash
# 步骤 1: 头脑风暴
> /brainstorming
我想开发一个用户认证系统，需要支持邮箱注册和 OAuth 登录

# 步骤 2: 创建隔离工作区
> /using-git-worktrees
为新功能创建分支 feature/auth-system

# 步骤 3: 编写计划
> /writing-plans
为认证系统创建详细实施计划

# 步骤 4: 测试驱动开发
> /test-driven-development
实现用户注册功能，先写测试

# 步骤 5: 请求代码审查
> /requesting-code-review
审查认证模块的实现

# 步骤 6: 完成分支
> /finishing-a-development-branch
合并认证系统分支
```

### 2.5 测试驱动开发（TDD）示例

```bash
# 用户输入
> /test-driven-development
实现一个计算器类，支持加减乘除

# Claude 将执行：
# 1. RED 阶段：先编写失败的测试
def test_calculator_add():
    calc = Calculator()
    assert calc.add(2, 3) == 5

# 2. GREEN 阶段：编写最小代码使测试通过
class Calculator:
    def add(self, a, b):
        return a + b

# 3. REFACTOR 阶段：优化代码结构
class Calculator:
    """支持基本四则运算的计算器"""
    def add(self, a: int, b: int) -> int:
        return a + b
```

### 2.6 核心理念

- **测试先行**：先写测试，再写实现
- **系统化优于临时性**：流程优于猜测
- **降低复杂度**：简洁是首要目标
- **证据优于声明**：验证后再宣布成功

---

## 3. Spec Kit（规范驱动开发工具包）

### 3.1 简介

Spec Kit 是 GitHub 官方开源的规范驱动开发框架，支持 20+ AI 编程助手，核心思想是将"随意编码（Vibe Coding）"转变为结构化的规范驱动开发。

### 3.2 安装方式

#### 方法一：使用 uvx（推荐）

```bash
uvx --from git+https://github.com/github/spec-kit.git@vX.Y.Z specify init my-project
```

#### 方法二：使用 pipx

```bash
pipx install git+https://github.com/github/spec-kit.git@vX.Y.Z
specify init my-project
```

#### 方法三：离线安装

```bash
# 构建 wheel
pip wheel .

# 传输 dist/ 文件夹后安装
pip install --no-index --find-links=./dist specify-cli
```

### 3.3 验证安装

```bash
specify version
```

### 3.4 支持的集成平台

```bash
# 初始化时指定平台
specify init my-project --integration claude
specify init my-project --integration gemini
specify init my-project --integration copilot
specify init my-project --integration codebuddy
specify init my-project --integration pi
```

### 3.5 四步开发流程

```
┌─────────────────────────────────────────────────────────┐
│  Step 1: 建立项目原则 (Project Principles)              │
│  定义项目的核心价值观和约束条件                           │
└─────────────────────┬───────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────────────┐
│  Step 2: 创建项目规范 (Project Specification)           │
│  详细描述项目需求和技术规格                              │
└─────────────────────┬───────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────────────┐
│  Step 3: 功能规范澄清 (Feature Specification)          │
│  在规划前必须澄清的功能细节                              │
└─────────────────────┬───────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────────────┐
│  Step 4: 实施计划 (Implementation Plan)                │
│  具体的编码实施步骤                                     │
└─────────────────────────────────────────────────────────┘
```

### 3.6 核心命令

安装后，在 Claude Code 中可使用以下命令：

```bash
# 创建项目规范
/speckit.specify

# 创建实施计划
/speckit.plan

# 管理任务列表
/speckit.tasks
```

### 3.7 完整使用示例

#### 步骤 1: 初始化项目

```bash
# 创建新项目
specify init my-ecommerce-app --integration claude

# 这将创建以下结构
my-ecommerce-app/
├── .specify/
│   ├── principles.md      # 项目原则
│   ├── specifications/     # 规范文档
│   ├── plans/              # 实施计划
│   └── scripts/            # 自动化脚本
│       ├── specify.sh
│       ├── specify.ps1
│       ├── plan.sh
│       └── plan.ps1
└── src/
```

#### 步骤 2: 建立项目原则

```bash
# 用户输入
> /speckit.specify

# Claude 将引导你创建原则文档
# .specify/principles.md 内容示例：

# 项目原则

## 核心价值观
- 安全性优先：所有用户输入必须验证
- 可测试性：核心功能需有单元测试
- 文档完整：API 必须有文档注释

## 技术约束
- 使用 TypeScript 严格模式
- 数据库操作使用 ORM
- API 遵循 RESTful 规范

## 代码风格
- 使用 ESLint + Prettier
- 提交信息遵循 Conventional Commits
```

#### 步骤 3: 创建功能规范

```bash
# 用户输入
> /speckit.specify --feature user-auth

# 创建 .specify/specifications/user-auth.md

# 用户认证功能规范

## 功能概述
实现用户邮箱注册、登录和 OAuth 认证

## 用户故事
1. 作为用户，我希望用邮箱注册账号
2. 作为用户，我希望用 GitHub OAuth 登录
3. 作为用户，我希望安全地登出

## 技术规范
- 密码使用 bcrypt 加密
- JWT 有效期 24 小时
- OAuth 支持 GitHub 和 Google

## 验收标准
- [ ] 邮箱注册功能可用
- [ ] OAuth 登录功能可用
- [ ] 登出功能可用
- [ ] 单元测试覆盖率 > 80%
```

#### 步骤 4: 生成实施计划

```bash
# 用户输入
> /speckit.plan --feature user-auth

# 生成 .specify/plans/user-auth-plan.md

# 用户认证实施计划

## Phase 1: 数据模型（预计 30 分钟）
- [ ] 创建 User 模型
- [ ] 创建 Session 模型
- [ ] 编写数据库迁移

## Phase 2: 认证服务（预计 1 小时）
- [ ] 实现 PasswordHasher
- [ ] 实现 JwtService
- [ ] 实现 OAuthService

## Phase 3: API 端点（预计 45 分钟）
- [ ] POST /auth/register
- [ ] POST /auth/login
- [ ] POST /auth/logout
- [ ] GET /auth/oauth/:provider

## Phase 4: 测试（预计 30 分钟）
- [ ] 单元测试
- [ ] 集成测试
- [ ] E2E 测试
```

#### 步骤 5: 执行任务

```bash
# 查看任务列表
> /speckit.tasks

# 开始实施
# Claude 将按照计划逐步执行每个任务
```

---

## 4. 实战对比与选择建议

### 4.1 快速对比表

| 维度 | Agent Skills | Superpowers | Spec Kit |
|------|-------------|-------------|----------|
| **来源** | Addy Osmani（社区） | Jesse Vincent（社区） | GitHub 官方 |
| **技能数量** | 20 个 + 7 命令 | 7 个核心技能 | 3 个核心命令 |
| **安装复杂度** | 低 | 低 | 中 |
| **学习曲线** | 中 | 中 | 中 |
| **平台支持** | Claude Code + Gemini + Cursor | Claude Code 为主 | 20+ AI 平台 |
| **方法论强度** | 高（六阶段流程） | 高（TDD） | 高（规范驱动） |
| **代理角色** | 3 个（审查/测试/安全） | 无 | 无 |
| **发布流程** | 完整 CI/CD 技能 | 中等 | 中 |

### 4.2 使用场景推荐

```
┌─────────────────────────────────────────────────────────┐
│  选择 Agent Skills 如果：                               │
│  • 需要完整的六阶段开发流程（定义→发布）                  │
│  • 需要专业代理角色（审查/测试/安全）                     │
│  • 希望有清晰的斜杠命令驱动                              │
│  • 跨平台需求（Claude/Gemini/Cursor）                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  选择 Superpowers 如果：                                │
│  • 团队重视 TDD 测试驱动开发                             │
│  • 需要完整的代码审查工作流                              │
│  • 想要系统化的开发方法论                                │
│  • 需要多代理协作开发                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  选择 Spec Kit 如果：                                   │
│  • 团队使用多种 AI 编程工具                              │
│  • 项目需要详细的规范文档                                │
│  • 大型项目需要结构化管理                                │
│  • 需要从"随意编码"转向规范开发                           │
└─────────────────────────────────────────────────────────┘
```

### 4.3 组合使用建议

三者可以组合使用：

```bash
# 1. 安装 Agent Skills（完整开发流程）
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills

# 2. 使用 Spec Kit 建立项目规范
specify init my-project --integration claude

# 3. 使用 Superpowers 进行深度 TDD 开发
/plugin install superpowers@claude-plugins-official

# 工作流：
# Spec Kit（项目规划）→ Agent Skills（六阶段开发）→ Superpowers（深度 TDD）
```

---

## 5. 常见问题

### Q1: 可以同时安装多个框架吗？

可以，它们互不冲突。建议根据项目阶段选择：
- 项目规划：Spec Kit
- 六阶段开发：Agent Skills
- 深度 TDD：Superpowers

### Q2: 哪个框架对中文支持最好？

- Superpowers 有完整中文版：[superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)
- Spec Kit 有中文版：[spec-kit-cn](https://github.com/Linfee/spec-kit-cn)

### Q3: 如何更新到最新版本？

```bash
# Agent Skills
/plugin update agent-skills@addy-agent-skills

# Superpowers
/plugin update superpowers@claude-plugins-official

# Spec Kit
pipx upgrade specify-cli
```

---

## 参考资料

- [Agent Skills (Addy Osmani) 官方仓库](https://github.com/addyosmani/agent-skills)
- [Superpowers 官方仓库](https://github.com/obra/superpowers)
- [Superpowers 中文版](https://github.com/jnMetaCode/superpowers-zh)
- [Spec Kit 官方仓库](https://github.com/github/spec-kit)
- [Spec Kit 官方文档](https://github.github.com/spec-kit/installation.html)
- [Spec Kit 中文版](https://github.com/Linfee/spec-kit-cn)
- [Spec Kit vs Superpowers 对比](https://dev.to/truongpx396/spec-kit-vs-superpowers-a-comprehensive-comparison-practical-guide-to-combining-both-52jj)

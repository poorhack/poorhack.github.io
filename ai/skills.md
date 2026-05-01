# Claude Code 四大技能框架使用指南

> 本文档详细介绍 Agent Skills、Superpowers、Spec Kit 和 Claude Code Game Studios 四大框架的安装、使用方式和实战教程。

---

## 目录

1. [Agent Skills（官方技能框架）](#1-agent-skills官方技能框架)
2. [Superpowers（超能力框架）](#2-superpowers超能力框架)
3. [Spec Kit（规范驱动开发工具包）](#3-spec-kit规范驱动开发工具包)
4. [Claude Code Game Studios（游戏开发工作室框架）](#4-claude-code-game-studios游戏开发工作室框架)
5. [实战对比与选择建议](#5-实战对比与选择建议)
6. [常见问题](#6-常见问题)

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

## 4. Claude Code Game Studios（游戏开发工作室框架）

### 4.1 简介

Claude Code Game Studios 是由 Donchitos 创建的完整游戏开发工作室框架，将单个 Claude Code 会话转变为完整的游戏开发团队。包含 49 个专业代理、72 个技能命令、12 个自动化钩子和 11 个路径规则，模拟真实工作室的层级结构。

**核心理念：**
- **结构化协作而非自主执行**：每个代理遵循"提问→选项→决策→草稿→批准"流程
- **专业分工**：总监（Director）→ 部门主管（Lead）→ 专家（Specialist）三层架构
- **跨部门协调**：代理间可横向咨询但需上级裁决跨领域决策
- **自动化安全**：钩子自动验证提交、资产、代码规范

### 4.2 安装方式

```bash
# 克隆仓库作为项目模板
git clone https://github.com/Donchitos/Claude-Code-Game-Studios.git my-game
cd my-game

# 启动 Claude Code
claude

# 运行引导式入门
> /start
```

### 4.3 工作室层级架构

```
Tier 1 — 总监层（使用 Opus 模型）
├── creative-director    创意总监 - 创意决策最高权威
├── technical-director   技术总监 - 技术架构最高决策
└── producer             制作人 - 生产协调与时间管理

Tier 2 — 部门主管层（使用 Sonnet 模型）
├── game-designer        游戏设计师 - 游戏机制设计
├── lead-programmer      主程序员 - 代码架构管理
├── art-director         躲术总监 - 视觉风格把控
├── audio-director       音频总监 - 音效音乐方向
├── narrative-director   叙事总监 - 剧情故事方向
├── qa-lead              QA主管 - 测试策略管理
├── release-manager      发布经理 - 发布流程管理
├── localization-lead    本地化主管 - 多语言适配

Tier 3 — 专家层（使用 Sonnet/Haiku 模型）
├── gameplay-programmer  游戏逻辑程序员
├── engine-programmer    引擎程序员
├── ai-programmer        AI程序员
├── network-programmer   网络程序员
├── ui-programmer        UI程序员
├── systems-designer     系统设计师
├── level-designer       关卡设计师
├── technical-artist     技术美术
├── sound-designer       音效设计师
├── ux-designer          UX设计师
├── qa-tester            QA测试员
└── ...更多专家角色
```

### 4.4 引擎专家支持

| 引擎 | 主专家 | 子专家 |
|------|--------|--------|
| **Godot 4** | `godot-specialist` | GDScript、Shader、GDExtension |
| **Unity** | `unity-specialist` | DOTS/ECS、Shader/VFX、Addressables、UI Toolkit |
| **Unreal 5** | `unreal-specialist` | GAS、Blueprint、Replication、UMG/CommonUI |

### 4.5 七大斜杠命令分类（72 个技能）

#### 入门与导航
| 命令 | 用途 |
|------|------|
| `/start` | 引导式入门，检测项目状态并推荐工作流 |
| `/help` | 显示帮助信息 |
| `/project-stage-detect` | 分析现有项目阶段和缺失项 |
| `/setup-engine` | 配置游戏引擎 |
| `/adopt` | 审计现有文档格式合规性 |

#### 游戏设计
| 命令 | 用途 |
|------|------|
| `/brainstorm` | 从零开始探索游戏创意（支持 open 或带提示） |
| `/map-systems` | 将概念分解为独立系统 |
| `/design-system` | 为每个 MVP 系统编写 GDD |
| `/quick-design` | 快速设计迭代 |
| `/review-all-gdds` | 跨系统一致性检查 |
| `/propagate-design-change` | 传播设计变更到相关文档 |

#### 艺术与资产
| 命令 | 用途 |
|------|------|
| `/art-bible` | 定义视觉身份指南 |
| `/asset-spec` | 创建资产规格文档 |
| `/asset-audit` | 审计资产命名和结构 |

#### UX 与界面
| 命令 | 用途 |
|------|------|
| `/ux-design` | 编写关键屏幕 UX 规格 |
| `/ux-review` | UX 设计审查 |

#### 架构设计
| 命令 | 用途 |
|------|------|
| `/create-architecture` | 生成主架构蓝图和 ADR 需求列表 |
| `/architecture-decision` | 记录关键技术决策（ADR） |
| `/architecture-review` | 验证架构覆盖完整性 |
| `/create-control-manifest` | 将决策汇编为可执行规则表 |

#### 史诗与冲刺
| 命令 | 用途 |
|------|------|
| `/create-epics` | 将系统映射为史诗 |
| `/create-stories` | 将史诗拆分为可实现故事 |
| `/dev-story` | 开发单个故事 |
| `/sprint-plan` | 规划冲刺 |
| `/sprint-status` | 冲刺状态检查 |
| `/story-readiness` | 故事准备度检查 |
| `/story-done` | 完成故事标记 |
| `/estimate` | 工作量估算 |

#### 审查与分析
| 命令 | 用途 |
|------|------|
| `/design-review` | 设计文档审查 |
| `/code-review` | 代码审查 |
| `/balance-check` | 游戏平衡检查 |
| `/content-audit` | 内容审计 |
| `/scope-check` | 范围检查 |
| `/perf-profile` | 性能分析 |
| `/tech-debt` | 技术债务识别 |
| `/gate-check` | 阶段门检查 |
| `/consistency-check` | 一致性检查 |

#### QA 与测试
| 命令 | 用途 |
|------|------|
| `/qa-plan` | 创建测试计划 |
| `/smoke-check` | 烟雾测试 |
| `/soak-test` | 压力测试 |
| `/regression-suite` | 回归测试套件 |
| `/test-setup` | 测试环境配置 |
| `/test-evidence-review` | 测试证据审查 |
| `/test-flakiness` | 测试稳定性检查 |
| `/skill-test` | 技能测试 |
| `/skill-improve` | 技能改进 |

#### 生产管理
| 命令 | 用途 |
|------|------|
| `/milestone-review` | 里程碑审查 |
| `/retrospective` | 回顾总结 |
| `/bug-report` | Bug 报告 |
| `/bug-triage` | Bug 分级处理 |
| `/reverse-document` | 从代码反向生成文档 |
| `/playtest-report` | 试玩测试报告 |

#### 发布管理
| 命令 | 用途 |
|------|------|
| `/release-checklist` | 发布检查清单 |
| `/launch-checklist` | 上线检查清单 |
| `/changelog` | 变更日志 |
| `/patch-notes` | 补丁说明 |
| `/hotfix` | 紧急修复 |

#### 团队协作（多代理协调）
| 命令 | 用途 |
|------|------|
| `/team-combat` | 协调战斗系统多代理 |
| `/team-narrative` | 协调叙事系统多代理 |
| `/team-ui` | 协调 UI 系统多代理 |
| `/team-release` | 协调发布流程多代理 |
| `/team-polish` | 协调打磨阶段多代理 |
| `/team-audio` | 协调音频系统多代理 |
| `/team-level` | 协调关卡设计多代理 |
| `/team-live-ops` | 协调运营活动多代理 |
| `/team-qa` | 协调 QA 测试多代理 |

### 4.6 自动化钩子（12 个）

| 钩子 | 触发时机 | 功能 |
|------|----------|------|
| `validate-commit.sh` | PreToolUse (Bash) | 验证提交内容（硬编码检查、TODO 格式、JSON 有效性） |
| `validate-push.sh` | PreToolUse (Bash) | 保护分支推送警告 |
| `validate-assets.sh` | PostToolUse (Write/Edit) | 验证资产命名规范和 JSON 结构 |
| `session-start.sh` | 会话开始 | 显示当前分支和最近提交 |
| `detect-gaps.sh` | 会话开始 | 检测新项目或缺失设计文档 |
| `pre-compact.sh` | 压缩前 | 保存会话进度笔记 |
| `post-compact.sh` | 压缩后 | 提醒恢复会话状态 |
| `notify.sh` | 通知事件 | Windows Toast 通知 |
| `session-stop.sh` | 会话结束 | 归档 active.md 到会话日志 |
| `log-agent.sh` | 代理启动 | 记录子代理调用审计日志 |
| `log-agent-stop.sh` | 代理停止 | 完成子代理审计记录 |
| `validate-skill-change.sh` | PostToolUse | 提示修改技能后运行测试 |

### 4.7 路径规则（11 个）

| 规则文件 | 适用路径 | 强制要求 |
|----------|----------|----------|
| `gameplay-code.md` | `src/gameplay/**` | 数据驱动值、delta time、无 UI 直接引用 |
| `engine-code.md` | `src/core/**` | 热路径零分配、线程安全、API 稳定 |
| `ai-code.md` | `src/ai/**` | 性能预算、可调试性、数据驱动参数 |
| `network-code.md` | `src/networking/**` | 服务端权威、版本化消息、安全 |
| `ui-code.md` | `src/ui/**` | 无游戏状态所有权、本地化就绪、无障碍 |
| `design-docs.md` | `design/gdd/**` | 必需 8 个章节、公式格式、边缘情况 |
| `test-standards.md` | `tests/**` | 测试命名、覆盖要求、fixture 模式 |
| `prototype-code.md` | `prototypes/**` | 放宽标准、README 必需、假设文档化 |
| `data-files.md` | `assets/data/**` | JSON 格式验证、命名规范 |
| `shader-code.md` | `shaders/**` | 性能注释、平台兼容 |
| `narrative.md` | `narrative/**` | 角色一致性、对话格式 |

### 4.8 完整开发流程示例

```bash
# ========== Phase 1: 入门检测 ==========

# 步骤 1: 引导式入门（新用户必做）
> /start

# Claude 将检测项目状态并询问：
# - A) 完全没有想法
# - B) 有模糊想法
# - C) 有清晰概念
# - D) 已有现有工作

# ========== Phase 2: 概念阶段 ==========

# 如果选择 A/B：从头脑风暴开始
> /brainstorm open
# 或带提示
> /brainstorm "太空探索 + cozy元素"

# Claude 将引导：
# - MDA 框架分析（8 种美学目标排序）
# - 玩家心理学（自主性、能力感、关联性）
# - 动词优先设计（玩家能"做"什么）
# - 生成 game-concept.md

# 步骤 2: 配置引擎
> /setup-engine godot 4.6

# 步骤 3: 定义视觉身份
> /art-bible

# 步骤 4: 系统分解
> /map-systems

# 输出：
# System 1: Player Movement
# System 2: Resource Collection
# System 3: Crafting
# System 4: Quest System

# 步骤 5: 为每个系统编写 GDD
> /design-system Player Movement

# 步骤 6: 跨系统一致性检查
> /review-all-gdds

# 步骤 7: 阶段门检查
> /gate-check

# ========== Phase 3: 架构阶段 ==========

# 步骤 8: 创建架构蓝图
> /create-architecture

# 输出：master-architecture.md + Required ADR 列表

# 步骤 9: 记录技术决策（按 ADR 列表）
> /architecture-decision "使用哪种物理引擎"

# 步骤 10: 架构审查
> /architecture-review

# ========== Phase 4: 前期制作 ==========

# 步骤 11: UX 设计
> /ux-design

# 步骤 12: 原型验证
> /prototype "核心移动机制"

# 步骤 13: 试玩测试报告
> /playtest-report

# 步骤 14: 创建史诗
> /create-epics

# 步骤 15: 拆分故事
> /create-stories

# 步骤 16: 冲刺规划
> /sprint-plan

# ========== Phase 5: 生产阶段 ==========

# 开始开发故事
> /dev-story STORY-001

# 故事完成检查
> /story-done STORY-001

# 冲刺状态
> /sprint-status

# ========== Phase 6: QA 阶段 ==========

# 测试计划
> /qa-plan

# 烟雾测试
> /smoke-check

# 回归测试
> /regression-suite

# ========== Phase 7: 发布阶段 ==========

# 发布检查清单
> /release-checklist

# 上线检查
> /launch-checklist

# 变更日志
> /changelog

# 补丁说明
> /patch-notes
```

### 4.9 代理协调协议

**核心原则：用户控制，代理协助**

```
┌─────────────────────────────────────────────────────────────┐
│  1. Ask（提问）—— 代理先问问题再提方案                        │
│  2. Present Options（展示选项）—— 代理提供 2-4 个选项         │
│  3. You Decide（你决策）—— 用户做最终决定                     │
│  4. Draft（草稿）—— 代理展示工作草稿                          │
│  5. Approve（批准）—— 用户批准后才能写入文件                  │
└─────────────────────────────────────────────────────────────┘
```

**代理协调模式：**

1. **垂直委托**：总监 → 部门主管 → 专家
2. **横向咨询**：同层级代理可互相咨询但不能做跨领域决策
3. **冲突升级**： disagreements 升级到共同上级（创意/技术总监）
4. **变更传播**：跨部门变更由制作人协调
5. **领域边界**：代理不能修改非本领域文件（除非明确委托）

### 4.10 审查模式设置

三种审查强度可选：

| 模式 | 适用场景 | 审查频率 |
|------|----------|----------|
| `Full` | 团队开发、学习工作流 | 每个关键步骤都有总监审查 |
| `Lean`（推荐） | 独立开发者、小团队 | 仅在阶段门（/gate-check）审查 |
| `Solo` | Game Jam、原型 | 无总监审查，最大速度 |

设置方式：
- 在 `/start` 时选择
- 或手动写入 `production/review-mode.txt`

### 4.11 项目目录结构

```
CLAUDE.md                    # 主配置文件
.claude/
  settings.json              # 钩子、权限、安全规则
  agents/                    # 49 个代理定义（Markdown + YAML frontmatter）
  skills/                    # 72 个斜杠命令（每个子目录一个技能）
  hooks/                     # 12 个钩子脚本（Bash，跨平台兼容）
  rules/                     # 11 个路径规则
  docs/
    workflow-catalog.yaml    # 7 阶段流程定义
    templates/               # 39 个文档模板
src/                         # 游戏源代码
assets/                      # 艺术、音频、VFX、Shader、数据文件
design/                      # GDD、叙事文档、关卡设计
  gdd/                       # 游戏设计文档
  pillars.md                 # 游戏支柱原则
docs/                        # 技术文档和 ADR
  architecture/              # 架构决策记录
tests/                       # 测试套件
prototypes/                  # 抛弃式原型（与 src/ 隔离）
production/                  # 冲刺计划、里程碑、发布追踪
  sprints/                   # 冲刺文档
  milestones/                # 里程碑定义
```

### 4.12 设计哲学（基于专业游戏开发实践）

| 理论框架 | 应用方式 |
|----------|----------|
| **MDA Framework** | Mechanics（机制）→ Dynamics（动态）→ Aesthetics（美学）分析 |
| **Self-Determination Theory** | Autonomy（自主）、Competence（能力）、Relatedness（关联）驱动玩家动机 |
| **Flow State Design** | 挑战-技能平衡设计玩家沉浸体验 |
| **Bartle Player Types** | 玩家类型分析（探索者、成就者、社交者、杀手） |
| **Verification-Driven Development** | 测试先行，再实现 |

### 4.13 创意总监决策框架示例

```bash
# 用户请求
> The game-designer wants complex crafting but the lead-programmer 
> says it will take 3 weeks and we only have 2 weeks before Alpha.

# Creative Director 将：
# 1. 理解上下文（读取相关文档）
# 2. 澄清问题（支柱相关性、时间约束）
# 3. 展示 2-3 个战略选项：

# Option A: 完整实现（3周，延期 Alpha）
#   ✅ 支柱完整展示
#   ❌ 错过投资者演示日期

# Option B: 简化核心（1.5周，赶上 Alpha）
#   ✅ 支柱核心保留
#   ✅ 赶上演示
#   ❌ 第一印象"粗糙"

# Option C: 完全砍掉（0周，赶上 Alpha）
#   ✅ 有时间打磨其他
#   ❌ 支柱缺失
#   ❌ 游戏身份不完整

# 4. 明确推荐：Option B
# 5. 用户最终决定
# 6. 文档化决策并传播到相关部门
```

---

## 5. 实战对比与选择建议

### 5.1 快速对比表

| 维度 | Agent Skills | Superpowers | Spec Kit | Game Studios |
|------|-------------|-------------|----------|--------------|
| **来源** | Addy Osmani（社区） | Jesse Vincent（社区） | GitHub 官方 | Donchitos（社区） |
| **技能数量** | 20 个 + 7 命令 | 7 个核心技能 | 3 个核心命令 | 72 个技能 + 49 代理 |
| **安装复杂度** | 低 | 低 | 中 | 低（克隆即用） |
| **学习曲线** | 中 | 中 | 中 | 中高 |
| **平台支持** | Claude Code + Gemini + Cursor | Claude Code 为主 | 20+ AI 平台 | Claude Code |
| **方法论强度** | 高（六阶段流程） | 高（TDD） | 高（规范驱动） | 极高（七阶段流程） |
| **代理角色** | 3 个（审查/测试/安全） | 无 | 无 | 49 个（三层架构） |
| **发布流程** | 完整 CI/CD 技能 | 中等 | 中 | 完整发布流程 |
| **适用领域** | 通用软件开发 | 通用软件开发 | 通用软件开发 | **游戏开发专用** |

### 5.2 使用场景推荐

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

┌─────────────────────────────────────────────────────────┐
│  选择 Claude Code Game Studios 如果：                   │
│  • 正在开发游戏项目（独立游戏/原型）                      │
│  • 需要模拟真实游戏工作室的协作结构                       │
│  • 想要专业游戏设计方法论（MDA/Flow/玩家心理学）          │
│  • 需要 49 个专业代理覆盖游戏开发全流程                   │
│  • 项目需要自动化钩子保证质量                            │
│  • 使用 Godot/Unity/Unreal 引擎                         │
└─────────────────────────────────────────────────────────┘
```

### 5.3 组合使用建议

四者可以组合使用：

```bash
# 1. 安装 Agent Skills（完整开发流程）
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills

# 2. 使用 Spec Kit 建立项目规范
specify init my-project --integration claude

# 3. 使用 Superpowers 进行深度 TDD 开发
/plugin install superpowers@claude-plugins-official

# 4. 游戏项目：使用 Claude Code Game Studios
git clone https://github.com/Donchitos/Claude-Code-Game-Studios.git my-game

# 工作流：
# Spec Kit（项目规划）→ Agent Skills（六阶段开发）→ Superpowers（深度 TDD）
# 游戏开发：Game Studios（七阶段游戏专用流程）
```

---

## 6. 常见问题

### Q1: 可以同时安装多个框架吗？

可以，它们互不冲突。建议根据项目阶段选择：
- 项目规划：Spec Kit
- 六阶段开发：Agent Skills
- 深度 TDD：Superpowers
- **游戏开发：Claude Code Game Studios**

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

# Claude Code Game Studios
git pull origin main
```

### Q4: 游戏开发应该用哪个框架？

如果开发游戏，强烈推荐使用 **Claude Code Game Studios**：
- 专为游戏开发设计，包含 Godot/Unity/Unreal 专家代理
- 提供 49 个游戏专业代理（总监→主管→专家三层架构）
- 内置 MDA 框架、玩家心理学等专业游戏设计方法论
- 自动化钩子保证代码质量和资产规范

非游戏项目可使用 Agent Skills + Superpowers 组合。

---

## 参考资料

- [Agent Skills (Addy Osmani) 官方仓库](https://github.com/addyosmani/agent-skills)
- [Superpowers 官方仓库](https://github.com/obra/superpowers)
- [Superpowers 中文版](https://github.com/jnMetaCode/superpowers-zh)
- [Spec Kit 官方仓库](https://github.com/github/spec-kit)
- [Spec Kit 官方文档](https://github.github.com/spec-kit/installation.html)
- [Spec Kit 中文版](https://github.com/Linfee/spec-kit-cn)
- [Spec Kit vs Superpowers 对比](https://dev.to/truongpx396/spec-kit-vs-superpowers-a-comprehensive-comparison-practical-guide-to-combining-both-52jj)
- [Claude Code Game Studios 官方仓库](https://github.com/Donchitos/Claude-Code-Game-Studios)

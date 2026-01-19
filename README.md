# spec-engine

基于 YAML 规范的页面引擎，用于快速生成管理后台页面。

## 项目结构

```
spec-engine/
├── apps/
│   └── admin/           # 管理后台应用
├── packages/
│   ├── runtime/         # 核心运行时包
│   └── renderer-semi/   # Semi Design 渲染器
├── server/              # API 服务器
└── preview/             # 预览功能
```

## 核心功能

1. **基于规范的页面生成**：通过 YAML 规范文件定义页面结构和功能
2. **运行时支持**：提供页面运行时环境和数据处理能力
3. **组件渲染**：基于 Semi Design 组件库渲染页面
4. **CRUD 操作**：内置文件、用户、角色的增删改查功能

## 技术栈

- **前端**：React 18 + TypeScript + Vite
- **UI 组件**：Semi Design
- **后端**：Express.js
- **数据格式**：YAML
- **构建工具**：Vite

## 快速开始

### 安装依赖

```bash
yarn install
```

### 启动服务

1. **启动 API 服务器**：

```bash
yarn start:server
```

服务器将在 http://localhost:5000 上运行

2. **启动管理后台**：

```bash
yarn dev:admin
```

应用将在 http://localhost:3000 上运行

## 使用说明

### 页面规范

在 `apps/admin/src/pages/` 目录下，为每个实体创建页面规范：

```yaml
# page.spec.yaml
entity:
  name: File
  fields:
    - name: id
      type: string
      required: true
    - name: name
      type: string
      required: true
    - name: size
      type: number
      required: false

compose:
  - module.table
  - module.drawer

actions:
  row:
    delete:
      confirmText: 确定要删除这条记录吗？
```

### 运行时文件

为每个页面创建运行时文件：

```typescript
// runtime.ts
import { RuntimeContext } from '@runtime'
import { fetchFiles, saveFile, deleteFile } from '../effects/fileEffects'

export const createRuntime = (): RuntimeContext => ({
  data: { records: [] },
  fetchRecords: async () => {
    const records = await fetchFiles()
    ;(window as any).ctx.data.records = records
  },
  saveRecord: async (record) => {
    await saveFile(record)
    await (window as any).ctx.fetchRecords()
  },
  deleteRecord: async (record) => {
    await deleteFile(record.id)
    await (window as any).ctx.fetchRecords()
  }
})
```

## 项目架构

### 1. 运行时包 (packages/runtime)

提供页面规范编译和运行时上下文：

- `compilePageSpec()`：编译页面规范
- `RuntimeContext`：定义运行时上下文接口

### 2. 渲染器包 (packages/renderer-semi)

基于 Semi Design 渲染页面：

- `PageRuntime`：页面运行时组件
- 支持表格展示、抽屉表单、增删改查操作

### 3. API 服务器 (server/)

提供 RESTful API：

- GET /files：获取文件列表
- POST /files：创建文件
- PUT /files/:id：更新文件
- DELETE /files/:id：删除文件
- 同样支持 users 和 roles 实体

## 开发指南

### 添加新实体

1. 在 `server/index.ts` 中调用 `generateCrudApi('EntityName')`
2. 在 `apps/admin/src/effects/` 目录下创建效果文件
3. 在 `apps/admin/src/pages/` 目录下创建页面目录
4. 编写 `page.spec.yaml` 和 `runtime.ts` 文件

### 自定义组件

在 `packages/renderer-semi/` 目录下扩展渲染组件：

```typescript
// 扩展渲染组件
export function CustomComponent({ spec, ctx }) {
  // 自定义渲染逻辑
}
```

## 许可证

MIT License

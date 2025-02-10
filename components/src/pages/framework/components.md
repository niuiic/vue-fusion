# 组件库

## 项目结构

```
app/ -- 应用代码
components/ -- 组件库
```

以上两者同属一个monorepo，主体结构由应用持有，在一个仓库下。components通过子仓库的方式引入，在多个应用中复用。

## 组件开发

1. 在`components/src/components`下编写组件。若为文件，则直接导出。若为目录，则通过`index.ts`导出组件。

2. 在`components/src/pages`下编写组件示例、测试用例和文档。

假设有组件foo。则建立`components/src/pages/foo/`，在`index.ts`中导出文档内容，内容如下。

```typescript
import { CompStatus, type Page } from '@/page'
// 获取目标文件内容
import components from './components.md?raw'

export default {
  name: '框架',
  status: [CompStatus.Approved],
  author: 'nsc',
  auditor: 'nsc',
  category: 'doc',
  docs: [
    {
      label: '组件',
      language: 'markdown',
      code: components
    }
  ],
  desc: '框架功能及操作说明。'
} satisfies Page
```

```typescript
export interface Page {
  // 组件名称
  name: string
  // 示例组件
  component?: AsyncComponentLoader
  // 组件状态
  status: CompStatus[]
  // 作者
  author: string
  // 审核人
  auditor?: string
  // 组件文档
  docs?: CodeProps[]
  // 组件目录，通过/划分层级
  category?: string
  // 标签
  tags?: string[]
  // 描述
  desc?: string
}
```

3. 打包组件库。

`pnpm build --filter components`

4. 重启应用开发服务器。

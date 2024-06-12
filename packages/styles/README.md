# styles

## 用法

1. 引入包。

`package.json`

```json
{
  "dependencies": {
    "styles": "workspace:*"
  }
}
```

2. 引入样式。

```typescript
import 'styles/index.scss'
```

> 编译只是将`src/styles`目录内容转移到了`dist`。可引入任意scss文件。

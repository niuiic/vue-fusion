# tsconfig

## 用法

1. 引入包。

`package.json`

```json
{
  "devDependencies": {
    "tsconfig": "workspace:*"
  }
}
```

2. 在配置文件中引用。

`tsconfig.json`

```json
{
  "extends": "tsconfig/vite.json"
}
```

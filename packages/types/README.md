# types

## 用法

1. 引入包。

`package.json`

```json
{
  "devDependencies": {
    "types": "workspace:*"
  }
}
```

2. 在`tsconfig.json`中全局引入。

```json
{
  "compilerOptions": {
    "types": ["types/dist/index"]
  }
}
```

使用依赖该package的library时需要同时配置当前package，否则全局类型不生效。

# eslint-config-custom

## 用法

1. 引入包。

`package.json`

```json
{
  "devDependencies": {
    "eslint-config-custom": "workspace:*"
  }
}
```

2. 在配置文件中引用。

`.eslintrc.json`

```json
{
  "extends": ["custom"]
}
```

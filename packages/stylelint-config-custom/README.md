# stylelint-config-custom

## 用法

1. 引入包。

`package.json`

```json
{
  "devDependencies": {
    "stylelint-config-custom": "workspace/*"
  }
}
```

2. 在配置文件中引用。

`.stylelintrc.json`

```json
{
  "extends": ["stylelint-config-custom"]
}
```

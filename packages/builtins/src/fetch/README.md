# fetch

## 用法

使用以下方式发起请求。

```typescript
import { Fetch } from 'fetch'

const fetch = new Fetch({ timeout: 10000 })
fetch.get()
fetch.post()
```

一般情况下全局存在一个`fetch`变量即可。

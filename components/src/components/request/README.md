# request

- 初始化request

```typescript
import { Request } from '@/components'

// 参数与axios.create相同，可在此注册拦截器。
const request = new Request({ timeout: 10000 })
```

一般情况下全局存在一个`request`变量即可。

- 发送请求

```typescript
// 转换响应为统一结构，若请求失败，则抛出code和msg，若请求成功，则返回data。
request.get()
request.post()
// 不对响应做转换
request.rawGet()
request.rawPost()
```

各方法参数与axios的同名方法相同，仅在最后添加一个`cacheOptions`，当`baseURL` + `url` + `key`相同且缓存有效时，可命中缓存。缓存存活时间默认为1s。

```typescript
interface CacheOptions {
  key: string
  lifetime?: number
}
```

query参数，即params中值为undefined和null的键值对会被移除。

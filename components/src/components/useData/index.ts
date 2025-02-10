import { onBeforeMount, onUnmounted, ref } from 'vue'
import { notify } from '../notify'

export const useData = <T>(queryData: () => Promise<T>, dataName: string, updateInterval?: number) => {
  const data = ref<T>()
  const loading = ref(false)

  const query = () => {
    loading.value = true
    queryData()
      .then((x) => (data.value = x))
      .catch(() => notify('error', `查询${dataName}失败`))
      .finally(() => (loading.value = false))
  }

  let timer: any
  onBeforeMount(() => {
    if (typeof updateInterval === 'number') {
      timer = setInterval(query, updateInterval)
    }
    return query()
  })
  onUnmounted(() => timer && clearInterval(timer))

  return [data, loading]
}

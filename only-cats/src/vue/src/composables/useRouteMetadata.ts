import { useTitle } from '@vueuse/core'
import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default function useRouteMetadata(): {
  title: Ref<string | undefined>
} {
  const route = useRoute()
  const title: Ref<string | undefined> = ref(undefined)

  const updateRouteMetadata = () => {
    if (route && route.meta) {
      title.value = route.meta.title
      useTitle(title)
    }
  }

  updateRouteMetadata()
  watch(route, () => updateRouteMetadata())

  return { title }
}

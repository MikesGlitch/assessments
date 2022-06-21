import { useTitle } from '@vueuse/core'
import { Ref, ref, watch } from 'vue'
import { BreadcumbItem, useRoute } from 'vue-router'

export default function useBreadcrumbs(): {
  bcHome: { icon: string; to: string }
  bcItems: Ref<BreadcumbItem[] | undefined>
  bcTitle: Ref<string | undefined>
} {
  const route = useRoute()
  const bcHome = { icon: 'pi pi-home', to: '/' }
  const bcItems: Ref<BreadcumbItem[] | undefined> = ref([])
  const bcTitle: Ref<string | undefined> = ref(undefined)

  const updateBreadcrumbs = () => {
    if (route && route.meta) {
      bcItems.value = route.meta.breadcrumbRoute
      bcTitle.value = route.meta.title
      useTitle(bcTitle)
    }
  }

  updateBreadcrumbs()
  watch(route, () => updateBreadcrumbs())

  return { bcHome, bcItems, bcTitle }
}

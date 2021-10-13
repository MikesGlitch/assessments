import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import 'primevue/resources/primevue.min.css'

// don't think we have a theme
// import 'primevue/resources/themes/saga-blue/theme.css'

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)

app.use(createPinia())
app.use(router)

app.mount('#app')

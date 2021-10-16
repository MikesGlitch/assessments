import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// don't think we have a theme
import 'primevue/resources/themes/tailwind-light/theme.css'

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(PrimeVue)

app.use(createPinia())
app.use(router)

app.mount('#app')

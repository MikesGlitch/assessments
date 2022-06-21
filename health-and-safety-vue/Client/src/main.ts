import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'

//PrimeVue Components
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tooltip from 'primevue/tooltip'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import TreeSelect from 'primevue/treeselect'
import MultiSelect from 'primevue/multiselect'
import Dropdown from 'primevue/dropdown'
import PrimeVueBreadcrumb from 'primevue/breadcrumb'

//Tailwind styles and PrimeVue themes
import './styles/index.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.use(createPinia())

//PrimeVue components
app.component('Button', Button)
app.component('Card', Card)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Dialog', Dialog)
app.component('InputText', InputText)
app.component('Calendar', Calendar)
app.component('TreeSelect', TreeSelect)
app.component('MultiSelect', MultiSelect)
app.component('Dropdown', Dropdown)
app.component('PrimeVueBreadcrumb', PrimeVueBreadcrumb)

app.directive('tooltip', Tooltip)

app.mount('#app')

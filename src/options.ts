import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import Options from '~/pages/options.vue'
import { createStore } from '~/store'

const store = createStore()
const vuetify = createVuetify()

const app = createApp(Options)

app.use(store)
app.use(vuetify)

app.mount('#app')

import { createApp } from 'vue'
import Options from '~/pages/options.vue'
import vuetify from '~/plugins/vuetify'
import { createStore } from '~/store'

const store = createStore()

const app = createApp(Options)

app.use(store)
app.use(vuetify)

app.mount('#app')

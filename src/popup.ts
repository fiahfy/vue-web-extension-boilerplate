import { createApp } from 'vue'
import Popup from '~/pages/popup.vue'
import vuetify from '~/plugins/vuetify'
import { createStore } from '~/store'

const store = createStore()

const app = createApp(Popup)

app.use(store)
app.use(vuetify)

app.mount('#app')

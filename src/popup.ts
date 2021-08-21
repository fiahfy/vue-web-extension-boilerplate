import { createApp } from 'vue'
// import { createVuetify } from 'vuetify'
import vuetify from '~/plugins/vuetify'
import Popup from '~/pages/popup.vue'
import { createStore } from '~/store'

const store = createStore()
// const vuetify = createVuetify()

const app = createApp(Popup)

app.use(store)
app.use(vuetify)

app.mount('#app')

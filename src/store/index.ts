import { Plugin, inject, reactive, watch } from 'vue'
import browser from 'webextension-polyfill'

type State = {
  fontSize: string
}

type Store = ReturnType<typeof initializeStore>

const initialState = {
  fontSize: '100%',
}

const key = 'store'
const provideKey = Symbol(key)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const initializeStore = () => {
  let restoredState
  try {
    const json = localStorage.getItem(key)
    restoredState = json ? JSON.parse(json) : {}
  } catch (e) {
    restoredState = {}
  }

  const state = reactive<State>({
    ...initialState,
    ...restoredState,
  })

  const setFontSize = (fontSize: string) => (state.fontSize = fontSize)

  watch(state, async () => {
    localStorage.setItem(key, JSON.stringify(state))
    await browser.runtime.sendMessage({ id: 'requestContentUpdate' })
  })

  return {
    state,
    setFontSize,
  }
}

export const createStore = (): Plugin => {
  return {
    install: (app) => {
      app.provide(provideKey, initializeStore())
    },
  }
}

export const useStore = (): Store => {
  const s = inject<Store>(provideKey)
  if (!s) {
    throw new Error('store is not provided')
  }
  return s
}

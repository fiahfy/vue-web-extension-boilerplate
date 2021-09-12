import { Plugin, inject, reactive, watch } from 'vue'
import browser from 'webextension-polyfill'
import { Settings } from '~/models'

type State = Settings

type Store = ReturnType<typeof initializeStore>

const initialState = {
  fontSize: '100%',
}

const key = 'store'
const provideKey = Symbol(key)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const initializeStore = () => {
  const state = reactive<State>(initialState)

  const setFontSize = (fontSize: string) => (state.fontSize = fontSize)

  watch(state, async () => {
    const json = JSON.stringify(state)
    await browser.storage.local.set({ [key]: json })
    await browser.runtime.sendMessage({ id: 'requestContentUpdate' })
  })

  let restored = false

  const restore = async () => {
    let restoredState
    try {
      const result = await browser.storage.local.get(key)
      const json = result[key]
      restoredState = json ? JSON.parse(json) : {}
    } catch (e) {
      restoredState = {}
    }
    Object.assign(state, restoredState)
    restored = true
  }
  restore()

  const waitForRestore = async () => {
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (restored) {
          clearInterval(timer)
          resolve(undefined)
        }
      }, 100)
    })
  }

  return {
    state,
    setFontSize,
    waitForRestore,
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

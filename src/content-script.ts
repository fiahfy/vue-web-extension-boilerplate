import browser from 'webextension-polyfill'
import { Settings } from '~/models'

const updateContent = async (settings: Settings) => {
  const oldStyle = document.documentElement.querySelector('.injected-style')
  oldStyle && oldStyle.remove()
  const style = document.createElement('style')
  style.classList.add('injected-style')
  style.textContent = `body { font-size: ${settings.fontSize}!important; }`
  const head = document.documentElement.querySelector('head')
  head?.append(style)
}

browser.runtime.onMessage.addListener(async (message) => {
  const { id, data } = message
  switch (id) {
    case 'urlChanged':
      return await updateContent(data.settings)
    case 'requestContentUpdate':
      return await updateContent(data.settings)
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  const { settings } = await browser.runtime.sendMessage({
    id: 'initializeTab',
  })
  updateContent(settings)
})

import browser from 'webextension-polyfill'
import iconOn from '~/assets/icon-on.png'
import { Settings } from '~/models'
import { initializeStore } from '~/store'

const getSettings = async () => {
  const store = initializeStore()
  await store.waitForRestore()
  return JSON.parse(JSON.stringify(store.state)) as Settings
}

const initializeTab = async (tabId: number) => {
  await browser.pageAction.setIcon({ tabId, path: iconOn })
  await browser.pageAction.show(tabId)

  const settings = await getSettings()

  return { settings }
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  const { id } = message
  const { tab } = sender
  switch (id) {
    case 'initializeTab':
      return tab?.id && (await initializeTab(tab.id))
  }
})

browser.storage.onChanged.addListener(async () => {
  const settings = await getSettings()
  const tabs = await browser.tabs.query({})
  for (const tab of tabs) {
    try {
      tab.id &&
        (await browser.tabs.sendMessage(tab.id, {
          id: 'requestContentUpdate',
          data: { settings },
        }))
    } catch (e) {} // eslint-disable-line no-empty
  }
})

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url) {
    const settings = await getSettings()
    browser.tabs.sendMessage(tabId, { id: 'urlChanged', data: { settings } })
  }
})

import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Settings } from '~/models'

const initialState: Settings = {
  fontSize: '16px',
}

@Module({ name: 'settings' })
export default class SettingsModule extends VuexModule {
  fontSize = initialState.fontSize

  @Mutation
  setFontSize({ fontSize }: { fontSize: string }): void {
    this.fontSize = fontSize
  }
}

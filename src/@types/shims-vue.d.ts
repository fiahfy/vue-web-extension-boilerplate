// @see https://github.com/vuejs/vue-class-component/issues/219
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

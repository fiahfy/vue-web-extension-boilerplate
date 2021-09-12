<template>
  <v-app>
    <v-main class="fill-height">
      <v-container fluid>
        <!-- TODO: use v-slider if implemented -->
        <!-- <v-slider
          v-model="fontSize"
          :max="300"
          label="Font Size"
          class="align-center"
          hide-details
        >
          <template #append>
            <v-text-field
              v-model="fontSize"
              class="mt-0 pt-0"
              type="number"
              style="width: 72px"
              suffix="%"
              hide-details
            />
          </template>
        </v-slider> -->
        <div>Font Size <input v-model="fontSize" type="number" /> %</div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '~/store'

export default defineComponent({
  setup() {
    const store = useStore()

    const fontSize = computed({
      get: () => {
        return parseInt(store.state.fontSize)
      },
      set: (value) => {
        store.setFontSize(`${value}%`)
      },
    })

    return {
      fontSize,
    }
  },
})
</script>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>

<style lang="scss" scoped>
.v-application {
  width: 320px;
}
</style>

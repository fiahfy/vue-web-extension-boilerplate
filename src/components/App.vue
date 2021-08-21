<template>
  <v-app>
    <v-main class="fill-height">
      <v-container fluid>
        <!-- <v-slider
          v-model="fontSize"
          :max="64"
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
              suffix="px"
              hide-details
            />
          </template>
        </v-slider> -->
        <v-icon>mdi-plus</v-icon>Font Size
        <input v-model="fontSize" type="number" /> %
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { settingsStore } from '~/store'

export default defineComponent({
  setup() {
    const fontSize = computed({
      get: () => {
        return parseInt(settingsStore.fontSize)
      },
      set: (value) => {
        settingsStore.setFontSize({
          fontSize: `${value}px`,
        })
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

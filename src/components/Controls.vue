<template>
  <div :class="$style.controls">
    <div :class="$style.checkbox" v-for="(preset, i) of allPresets">
      <input type="checkbox" :id="preset + i" :value="preset" v-model="presets" />
      <label :for="preset+i">{{preset}}</label>
    </div>

    <div :class="$style.button">
      <button @click="compile">Compile</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "controls",
  computed: {
    allPresets() {
      return this.$store.getters.availablePresets;
    },
    presets: {
      get() {
        return this.$store.state.options.presets;
      },
      set(presets) {
        this.$store.commit("updatePresets", presets);
      }
    }
  },
  methods: {
    compile() {
      this.$store.dispatch("compile");
    }
  }
};
</script>

<style module>
.controls {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>

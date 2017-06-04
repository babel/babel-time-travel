<template>
  <div :class="$style.controls">
    <div :class="$style.checkbox" v-for="(preset, i) of availablePresets">
      <input type="checkbox" :id="preset + i" :value="preset" v-model="enabledPresets" />
      <label :for="preset+i">{{preset}}</label>
    </div>

    <div :class="$style.button">
      <button @click="compile">Compile</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availablePresets: [
        "es2015",
        "stage-0",
        "stage-1",
        "stage-2",
        "stage-3",
        "babili"
      ],
      enabledPresets: ["es2015"]
    }
  },
  methods: {
    compile() {
      this.$store.dispatch("transform", this.enabledPresets);
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

.checkbox {}
</style>

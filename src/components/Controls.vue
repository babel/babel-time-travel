<template>
  <div :class="$style.controls">
    <div :class="$style.checkbox" v-for="(preset, i) of allPresets">
      <input type="checkbox" :id="preset + i" :value="preset" v-model="presets" />
      <label :for="preset+i">{{preset}}</label>
    </div>

    <div>
      <button :class="[$style.button, $style.green]" @click="compile">Compile</button>
    </div>
    <div>
      <button :class="[$style.button, $style.red]" @click="clear">Clear Caches</button>
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
    },
    clear() {
      this.$store.dispatch("unregisterSw");
      this.$store.dispatch("clearCaches");
    }
  }
};
</script>

<style module>
.controls {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  --ht: 40px;
}

.checkbox {
  height: var(--ht);
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox input[type="checkbox"] {
  position: absolute;
  left: -9999px;
}

.checkbox label {
  position: relative;
  padding-left: 2em;
  padding-top: 0.15em;
  cursor: pointer;
}

.checkbox label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 1.25em;
  height: 1.25em;
  border: 2px solid var(--gray);
  background: white;
  border-radius: 13px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, .1);
}

.checkbox label:after {
  content: '\2022';
  position: absolute;
  top: -0.38em;
  left: .02em;
  font-size: 4em;
  color: var(--green);
  transition: all .1s;
}

.checkbox input:not(checked)+label:after {
  opacity: 0;
  transform: scale(0);
}

.checkbox input:checked+label:after {
  opacity: 1;
  transform: scale(1);
}

.button {
  outline: none;
  height: var(--ht);
  text-align: center;
  padding: 0 16px;
  border-radius: 40px;
  background: white;
  border: 2px solid black;
  color: black;
  letter-spacing: 1px;
  text-shadow: 0;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease;
}

.button:hover {
  color: white;
  background: black;
}

.button:active {
  letter-spacing: 2px;
}

.green {
  border-color: var(--green);
  color: var(--green);
}

.green:hover {
  background: var(--green);
}

.red {
  border-color: var(--red);
  color: var(--red);
}

.red:hover {
  background: var(--red);
}
</style>

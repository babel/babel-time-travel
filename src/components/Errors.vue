<template>
  <div :class="$style.errorContainer" v-if="error">
    <div :class="$style.error">
      <pre>{{error}} <br/><br/>Check console for more details</pre>
    </div>
    <button :class="$style.close" @click="clear">X</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    clear() {
      this.$store.commit("removeError");
    }
  }
}
</script>

<style module>
.errorContainer {
  width: 100%;
  z-index: 100;
  position: absolute;
  bottom: 0;
  color: #D8000C;
  background-color: #FFBABA;
}

.error {
  border: solid 1px #F44336;
  padding-left: 16px;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1em;
  font-family: sans-serif;
  background: none;
  border-radius: 2em;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>

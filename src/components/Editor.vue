<template>
  <codemirror :code="code" :options="editorOptions" @change="onEditorCodeChange">
  </codemirror>
</template>

<script>
import { codemirror, CodeMirror } from "vue-codemirror";

export default {
  data() {
    return {
      editorOptions: {
        mode: "text/javascript",
        tabSize: 2,
        lineNumbers: true,
        line: true,
        foldGutter: true
      }
    };
  },
  computed: {
    code() {
      return this.$store.state.transitions[this.$store.state.current];
    }
  },
  methods: {
    onEditorCodeChange(newCode) {
      this.$store.dispatch("updateSource", newCode);
    }
  },
  components: {
    codemirror
  }
};
</script>

<style module>
.controls {}
</style>

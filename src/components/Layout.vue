<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <h1>{{title}}</h1>
    </header>
    <main :class="$style.main">
      <div :class="$style.controls">
        <slot name="controls"></slot>
      </div>
      <div :class="$style.editor">
        <slot name="editor"></slot>
      </div>
      <div :class="$style.slider">
        <slot name="slider"></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "app-layout",
  props: ["title"]
};
</script>

<style module>
.header h1 {
  text-align: center;
  font-size: 1.5em;
  font-weight: 100;
}

.main {
  --width: calc(100vw - 100px);
  --height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.controls {
  width: var(--width);
  display: flex;
  justify-content: flex-end;
  height: 50px;
  align-items: center;
}

.slider {
  width: var(--width);
}

.editor {
  border: solid 1px #CCCCCC;

  width: var(--width);
  height: var(--height);
}

.editor :global(.CodeMirror) {
  width: var(--width);
  height: var(--height);
}
</style>

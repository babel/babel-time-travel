<template>
  <div :class="$style.container">
    <div :class="$style.slider">
      <div :class="{ [$style.sliderItem]: true, [$style.current]: i === current}" v-for="(item, i) in items" @mouseover="selectItem(i)" v-bind:key="item">
      </div>
    </div>
    <div :class="$style.info">
      Current Plugin:
      <span :class="$style.plugin">{{currentPlugin}}</span>, Current Visitor:
      <span :class="$style.visitor">{{currentVisitor}}</span>, Size:
      <span :class="$style.visitor">{{currentSize}}</span>

    </div>
  </div>
</template>

<script>
export default {
  name: "slider",
  methods: {
    selectItem(i) {
      this.$store.commit("updateCurrent", i);
    }
  },
  computed: {
    currentSize() {
      return this.$store.state.transitions[this.current].size;
    },

    currentPlugin() {
      return this.$store.state.transitions[this.current].pluginAlias;
    },
    currentVisitor() {
      const transition = this.$store.state.transitions[this.current];
      const currentNode = transition.currentNode || "File";
      return currentNode + " " + transition.visitorType;
    },
    current() {
      return this.$store.state.current;
    },
    items() {
      return this.$store.state.transitions;
    }
  }
}
</script>

<style module>
.container {
  width: 100%;
}

.info {
  text-align: left;
  padding: 0 8px;
  color: #777777;
}

.info .plugin,
.info .visitor {
  color: #2196F3;
}

.slider {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: solid 1px var(--gray);
}

.sliderItem {
  width: 100%;
  text-align: center;
  height: 50px;
  border-right: solid 1px var(--gray);
}

.sliderItem:last-child {
  border-right: 0;
}

.sliderItem:hover,
.current {
  background: var(--gray);
}
</style>

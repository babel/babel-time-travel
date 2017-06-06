<template>
  <div :class="$style.slider">
    <div :class="{ [$style.sliderItem]: true, [$style.current]: i === current}" v-for="(item, i) in items" @mouseover="selectItem(i)">
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
.slider {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.sliderItem {
  width: 100%;
  text-align: center;
  line-height: 25px;
  height: 25px;
  border-right: solid 1px var(--gray);
}

.sliderItem:last-child {
  border-right: 0;
}

.sliderItem:hover,
.current {
  background: var(--green);
}
</style>

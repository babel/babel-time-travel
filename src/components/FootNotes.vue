<template>
  <div :class="$style.footer">
    <a href="https://github.com/boopathi/babel-time-travel" target="_blank">babel-time-travel</a> by
    <a href="https://github.com/boopathi" target="_blank">boopathi</a>
  </div>
</template>

<script>
export default {

}
</script>

<style module>
.footer {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  line-height: 20px;
  --red: red;
}

.red {
  outline: none;
  border: 2px solid var(--red);
  text-align: center;
  cursor: pointer;
  font-weight: 100;
  background: white;
}
</style>

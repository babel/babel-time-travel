<template>
  <Layout :title="title">
    <Editor slot="editor"></Editor>
    <Slider slot="slider"></Slider>
    <Controls slot="controls"></Controls>
    <Errors slot="errors"></Errors>
  </Layout>
</template>

<script>
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Controls from "./components/Controls";
import Slider from "./components/Slider";
import Errors from "./components/Errors";

export default {
  name: "app",
  props: ["title"],
  components: { Layout, Editor, Controls, Slider, Errors }
};
</script>

<style module>
body {
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  --gray: #bbbbbb;
}
</style>

<template>
  <Layout :title="title">
    <Editor slot="editor"></Editor>
    <Slider slot="slider"></Slider>
    <Controls slot="controls"></Controls>
  </Layout>
</template>

<script>
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Controls from "./components/Controls";
import Slider from "./components/Slider";

export default {
  name: "app",
  props: ["title"],
  components: { Layout, Editor, Controls, Slider }
};
</script>

<style module>
body {
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>

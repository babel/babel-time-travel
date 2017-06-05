<template>
  <Layout :title="title">
    <Editor slot="editor"></Editor>
    <Slider slot="slider"></Slider>
    <Controls slot="controls"></Controls>
    <FootNotes slot="footer"></FootNotes>
  </Layout>
</template>

<script>
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Controls from "./components/Controls";
import Slider from "./components/Slider";
import FootNotes from "./components/FootNotes";

export default {
  name: "app",
  props: ["title"],
  components: { Layout, Editor, Controls, Slider, FootNotes }
};
</script>

<style module>
body {
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>

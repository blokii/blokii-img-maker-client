<template>
  <q-layout view="hhh lpR fff">
    <Header></Header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer></Footer>
  </q-layout>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: "HBLayout",
  components: {
    Header,
    Footer
  }
};
</script>

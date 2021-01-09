<template>
  <q-footer elevated class="bg-grey-9 text-white">
    <div class="row q-px-md q-my-md">
      <div class="col-12 col-sm-4 self-end ">
        &copy; {{ copyrightText }} by
        <a
          href="https://www.rachelcheuk.com"
          target="_blank"
          title="Rachel Cheuk"
          class="text-white text-bold decoration-none"
          >Rachel Cheuk</a
        >
        <br />
        <!--Produced by {{ company }}-->
        Made with <q-icon class="text-red" name="fas fa-heart"></q-icon> in
        Houston, TX.
      </div>
      <div class="col-12 col-sm-4 column self-center text-center">
        This site uses Google Analytics. This site does not collect personal
        information aside from what is collected by Google Analytics. By using
        this site, you agree to these terms.
      </div>
      <div class="col-12 col-sm-4 text-right q-pa-sm self-center">
        <q-btn
          type="a"
          href="https://www.twitter.com/rachel_cheuk"
          flat
          dense
          rounded
          style="color: #1DA1F2;"
          icon="fab fa-twitter"
        />
      </div>
    </div>
  </q-footer>
</template>

<script>
export default {
  data() {
    return {
      startingYear: "2020"
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    copyrightText() {
      let text = this.currentYear;
      if (this.startingYear) {
        text = this.startingYear + "-" + text;
      }
      return `${text}`;
    }
  }
};
</script>

<style>
.decoration-none {
  text-decoration: none;
}
</style>

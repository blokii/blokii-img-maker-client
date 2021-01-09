<template>
  <q-page class="row">
    <q-banner
      class="text-grey-800 q-pa-md q-ma-md text-body1"
      style="border: 1px solid #666"
      rounded
      v-if="showBanner"
    >
      Welcome! This is a simple image maker for tech blog posts. It creates a
      downloadable image with your blog post title, subtitle, byline, and tech
      icons. To get started, select an image. You can either enter a url with an
      image you'd like to use or select an image from Unsplash. Please note, at
      the time of deployment, the Unsplash API hasn't been cleared yet for
      production use, so it's currently limited to 50 requests per hour. This
      process typically takes several days, so please be patient if results
      don't appear! This is a work in progress. Let me know what you want to see
      from this by sending me a
      <a
        class="text-weight-bold text-black"
        style="text-decoration:none"
        href="https://twitter.com/rachel_cheuk"
        target="_blank"
        >DM on Twitter</a
      >. This will help my prioritize feature requests.
      <template v-slot:action>
        <q-btn
          outline
          color="positive"
          icon="fas fa-check"
          label="Got it! Let's make an image!"
          @click="showBanner = false"
        />
      </template>
    </q-banner>
    <div class="col-12 col-md-9 q-pa-sm">
      <BlokiiCanvas />
    </div>
    <div class="col-12 col-md-3">
      <q-card class="q-pa-md q-mt-sm" flat>
        <Settings />
        <q-card-section class="bg-grey-2 q-py-md">
          <q-input
            color="black"
            :value="filename"
            label="Enter filename for download..."
            emit-value
            :rules="[
              val => !!val || 'Field is required',
              val => val.indexOf('.png') > -1 || 'Must contain .png in filename'
            ]"
            @input="updateFilename($event)"
          >
            <template v-slot:prepend>
              <q-icon name="fad fa-file-download" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="q-px-md">
          <q-btn
            unelevated
            color="positive"
            @click="$root.$emit('download-image')"
            icon="fad fa-download"
            label="Download"
            :disable="filename"
            size="md"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import techOptions from "../../public/data/techOptions.json";
import fontOptions from "../../public/data/fonts.json";
import Settings from "../components/Settings";
import BlokiiCanvas from "../components/BlokiiCanvas";
import { mapState } from "vuex";

export default {
  data() {
    return {
      showBanner: true
    };
  },
  components: {
    Settings,
    BlokiiCanvas
  },
  computed: {
    ...mapState({
      filename: state => state.global.filename
    })
  },
  methods: {
    updateFilename(filename) {
      this.$store.commit("global/SET_FILENAME", { filename: filename });
    }
  },
  mounted() {
    this.$emit("initialize-canvas");
  }
};
</script>

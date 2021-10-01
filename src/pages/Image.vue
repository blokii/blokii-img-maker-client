<template>
  <q-page class="row">
    <div class="col-12 col-md-9 q-pa-sm">
      <div class="q-my-sm">
        <span class="text-h4 text-bold">{{ filename }}</span>
      </div>
      <BlokiiCanvas />
    </div>
    <div class="col-12 col-md-3">
      <q-card class="q-pa-md q-mt-sm" flat>
        <Settings :disable-input="true" />
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
import Settings from "../components/Settings";
import BlokiiCanvas from "../components/BlokiiCanvas";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      filename: "",
      imageData: {}
    };
  },
  components: {
    Settings,
    BlokiiCanvas
  },
  mounted() {
    this.$emit("initialize-canvas");
    this.$feathersClient
      .service("images")
      .get(this.id)
      .then(image => {
        this.filename = image.filename;
        this.$store.commit(
          "image/setImageOptions",
          image.settings.imageOptions
        );
        this.$store.commit("text/setTextOptions", image.settings.textOptions);
        this.imageData = image;
      });
  }
};
</script>

<template>
  <q-page class="row">
    <div class="col-12 col-md-9 q-pa-sm">
      <BlokiiCanvas />
    </div>
    <div class="col-12 col-md-3">
      <q-card class="q-pa-md q-mt-sm" flat>
        <q-card-section>
          <Settings />
          <q-input
            color="purple-12"
            :value="filename"
            label="Enter filename for download..."
            emit-value
            @input="updateFilename($event)"
          >
            <template v-slot:prepend>
              <q-icon name="far fa-file-download" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="q-px-md">
          <q-btn
            unelevated
            color="primary"
            @click="$root.$emit('download-image')"
            icon="fad fa-download"
            label="Download"
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

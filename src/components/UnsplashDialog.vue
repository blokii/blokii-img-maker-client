<template>
  <q-dialog ref="dialog" @hide="onDialogHide" full-height>
    <q-card
      class="q-dialog-plugin q-pa-md"
      style="width: 700px; max-width: 80vw;"
      full-height
    >
      <div class="q-ma-sm">
        <q-input
          debounce="750"
          rounded
          dense
          outlined
          color="black"
          @input="getResults"
          placeholder="technology"
          label="Search"
          v-model="search"
        >
          <template v-slot:after>
            <q-icon name="fal fa-search"></q-icon>
          </template>
        </q-input>
      </div>
      <div class="row justify-center items-center">
        <div
          class="column-12 col-md-6 q-pa-sm"
          v-for="pic in results"
          :key="pic.id"
        >
          <UnsplashCard :data="pic"> </UnsplashCard>
        </div>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="currentPage"
            @input="getResults"
            :max-pages="7"
            :direction-links="true"
            :max="totalPages"
            color="black"
          >
          </q-pagination>
        </div>
      </div>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="grey" flat label="Cancel" @click="onCancelClick" />
        <q-btn color="positive" label="Select Image" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import UnsplashCard from "./UnsplashCard";
import feathersClient from "../boot/feathersClient";

export default {
  props: {
    // ...your custom props
  },
  components: {
    UnsplashCard
  },
  data() {
    return {
      results: {},
      search: "",
      per_page: "6",
      order_by: "",
      color: "",
      currentPage: 1,
      total: 0,
      totalPages: 0,
      selectedImage: {},
      hover: false
    };
  },
  mounted() {
    this.getResults();
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    async getResults() {
      this.$q.loading.show({
        delay: 400 // ms
      });

      const { response } = await feathersClient.service("unsplash").find({
        query: {
          query: this.search ? this.search : "technology",
          page: this.currentPage,
          per_page: this.per_page,
          order_by: "relevance",
          orientation: "landscape"
        }
      });
      this.$q.loading.hide();

      if (response) {
        this.total = response ? response.total : 0;
        this.totalPages = response ? response.total_pages : 5;
        this.results = response ? response.results : [];
      }
    },
    downloadImageTriggered() {
      // track photo
      feathersClient.service("unsplash").find({
        query: {
          action: "trackPhoto",
          download_location: this.$store.state.image.imageOptions.downloadInfo
        }
      });
    },
    onDialogHide() {
      this.$emit("hide");
    },

    onOKClick() {
      this.$emit("ok");
      this.downloadImageTriggered();
      this.hide();
    },

    onCancelClick() {
      this.hide();
    }
  }
};
</script>

<style scoped lang="scss">
.active {
  color: red;
}
</style>

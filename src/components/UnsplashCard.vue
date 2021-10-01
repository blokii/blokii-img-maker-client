<template>
  <q-card :class="{ selected: select(pic.urls.raw) }">
    <q-img
      :src="pic.urls.thumb"
      style="max-height: 200px"
      @mouseover.native="hover = true"
      @mouseleave.native="hover = false"
      @click="updateImage(pic)"
      flat
      :class="{ active: hover }"
    >
      <div v-if="hover" class="absolute-bottom text-center">
        <span class="text-subtitle2"
          ><a
            class="text-white"
            :href="
              `${pic.user.links.html}?utm_source=BlokiiImageMaker&utm_medium=referral`
            "
            target="_blank"
            >{{ pic.user.name }} ({{ pic.user.username }})</a
          ></span
        ><br />
        <q-icon
          v-if="pic.user.location"
          name="fad fa-map-marker-smile"
          class="q-mr-xs"
        ></q-icon
        ><span class="text-caption">{{ pic.user.location }} </span>
      </div>
    </q-img>
  </q-card>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      hover: false
    };
  },
  computed: {
    pic() {
      return this.data;
    }
  },
  methods: {
    select(val) {
      return this.$store.state.image.imageOptions.selectedImage === val;
    },
    updateImage(value, method) {
      let data = {
        ...this.$store.state.image.imageOptions
      };
      data.selectedImage = value.urls.raw;
      data.selectedUser = value.user;
      data.downloadInfo = value.links.download_location;
      this.$store.commit("image/updateOptions", { imageOptions: data });
    }
  }
};
</script>

<style scoped>
.selected {
  border: 5px solid red;
}
</style>

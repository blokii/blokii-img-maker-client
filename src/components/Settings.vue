<template>
  <q-card>
    <q-tabs
      active-color="positive"
      align="justify"
      class="text-grey"
      dense
      indicator-color="positive"
      narrow-indicator
      inline-label
      v-model="tab"
    >
      <q-tab icon="fad fa-image" label="Image" name="image" />
      <q-tab icon="fad fa-text" label="Text" name="text" />
    </q-tabs>

    <q-separator />
    <q-tab-panels animated v-model="tab">
      <q-tab-panel name="image">
        <div class="row justify-center">
          <q-btn align="center" color="black" @click="showUnplashDialog"
            >Pick from Unsplash
          </q-btn>
        </div>
        <q-img
          class="q-ma-sm"
          size="sm"
          v-if="$store.state.image.imageOptions.backgroundUrl"
          :src="$store.state.image.imageOptions.backgroundUrl"
        >
          <q-icon
            v-if="$store.state.image.imageOptions.selectedUser"
            class="absolute all-pointer-events"
            size="32px"
            name="fad fa-info-circle"
            color="white"
            style="right: 8px; bottom: 8px"
          >
            <q-tooltip>
              {{
                $store.state.image.imageOptions.selectedUser
                  ? $store.state.image.imageOptions.selectedUser.name
                  : ""
              }}
              {{
                $store.state.image.imageOptions.selectedUser
                  ? `(${$store.state.image.imageOptions.selectedUser.username})`
                  : ""
              }}
            </q-tooltip>
          </q-icon>
        </q-img>
        <q-input
          @input="updateImage($event, BACKGROUND_URL)"
          color="positive"
          label="Background Image Url"
          :value="backgroundUrl"
          v-on:set-background="setBackground"
          debounce="500"
        >
          <template v-slot:before>
            <q-icon name="fad fa-image" />
          </template>
          <template v-slot:after>
            <q-btn color="green" dense flat round size="x-small">
              <q-icon name="fad fa-info-circle"></q-icon>
              <q-tooltip
                :offset="[10, 10]"
                anchor="center right"
                self="center left"
              >
                <strong
                  >By adding an image, you agree you have the right to use the
                  image.</strong
                >
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
        <FilterImage />
      </q-tab-panel>
      <q-tab-panel name="text">
        <q-select
          :options="fonts"
          :value="font"
          @input="updateVal($event, FONT)"
          dense
          emit-value
          label="Font"
          map-options
          option-value="label"
          outlined
          color="positive"
          rounded
        >
          <template v-slot:before>
            <q-icon name="fad fa-font" />
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>
                  <span :class="`${scope.opt.style} q-ml-sm text-subtitle2`">{{
                    scope.opt.label
                  }}</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          @keyup="updateVal($event.target.value, TITLE)"
          debounce="500"
          color="positive"
          label="Title"
          :value="title"
        >
          <template v-slot:prepend>
            <q-icon name="fad fa-heading" />
          </template>
          <template v-slot:append>
            <q-icon :style="`color: ${titleColor};`" name="fas fa-square">
              <q-popup-proxy transition-hide="scale" transition-show="scale">
                <q-color
                  @change="updateVal($event, TITLE_COLOR)"
                  :value="titleColor"
                />
              </q-popup-proxy>
            </q-icon>
            <q-icon :style="`color: ${titleStrokeColor};`" name="fal fa-square">
              <q-popup-proxy transition-hide="scale" transition-show="scale">
                <q-color
                  @change="updateVal($event, TITLE_STROKE_COLOR)"
                  :value="titleStrokeColor"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          @keyup="updateVal($event.target.value, SUBTITLE)"
          debounce="500"
          color="positive"
          label="Subtitle"
          :value="subtitle"
        >
          <template v-slot:prepend>
            <q-icon name="fad fa-h2" />
          </template>
          <template v-slot:append>
            <q-icon :style="`color: ${subtitleColor};`" name="fas fa-square">
              <q-popup-proxy transition-hide="scale" transition-show="scale">
                <q-color
                  @change="updateVal($event, SUBTITLE_COLOR)"
                  :value="subtitleColor"
                />
              </q-popup-proxy>
            </q-icon>
            <q-icon
              :style="`color: ${subtitleStrokeColor};`"
              name="fal fa-square"
            >
              <q-popup-proxy transition-hide="scale" transition-show="scale">
                <q-color
                  @change="updateVal($event, SUBTITLE_STROKE_COLOR)"
                  :value="subtitleStrokeColor"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          @keyup="updateVal($event.target.value, AUTHOR)"
          color="positive"
          label="Author"
          :debounce="500"
          :value="author"
        >
          <template v-slot:prepend>
            <q-icon name="fad fa-id-card-alt" />
          </template>
          <template v-slot:append>
            <q-icon :style="`color: ${authorColor};`" name="fas fa-square">
              <q-popup-proxy transition-hide="scale" transition-show="scale">
                <q-color
                  @change="updateVal($event, AUTHOR_COLOR)"
                  :value="authorColor"
                />
              </q-popup-proxy>
            </q-icon>
            <q-icon
              :style="`color: ${authorStrokeColor};`"
              name="fal fa-square"
            >
              <q-popup-proxy transition-hide="scale" transition-show="scale">
                <q-color
                  @change="updateVal($event, AUTHOR_STROKE_COLOR)"
                  :value="authorStrokeColor"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          :options="options"
          input-debounce
          use-input
          @filter="filterFn"
          class="q-my-sm"
          color="positive"
          dense
          label="Technologies"
          placeholder="Start typing a technology..."
          multiple
          outlined
          rounded
          map-options
          use-chips
          error-message="Too many selected. Please remove before adding more."
          v-model="technologies"
          :rules="[val => val.length <= 8]"
          @input="updateTechOpt"
          hint="Pick up to 8 technologies."
        >
          <template v-slot:before>
            <q-icon name="fad fa-laptop-code" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected>
            <div>
              <q-chip
                v-for="tech in technologies"
                dense
                text-color="black"
                class="q-my-none q-ml-xs q-mr-none"
                :key="tech.value"
              >
                <q-avatar
                  color="blue-grey-1"
                  :style="`color: ${tech.color}`"
                  :icon="tech.icon"
                />
                {{ tech.label }}
              </q-chip>
            </div>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label
                  ><q-icon
                    :style="`color: ${scope.opt.color}`"
                    :name="scope.opt.icon"
                    size="md"
                  />
                  <span class="q-ml-sm">{{ scope.opt.label }}</span>
                </q-item-label>
              </q-item-section>
              <!--<q-item-section side>
                <q-toggle :val="scope.opt.selected" :value="scope.opt.selected" @input="updateTechOpt(scope.index, TECHNOLOGIES)" />
              </q-item-section>-->
            </q-item>
          </template>
        </q-select>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import techOptions from "../../public/data/techOptions.json";
import FilterImage from "./FilterImage";
import UnsplashDialog from "./UnsplashDialog";

export default {
  data() {
    return {
      FONT: 1,
      TITLE: 2,
      SUBTITLE: 3,
      AUTHOR: 4,
      TITLE_COLOR: 5,
      SUBTITLE_COLOR: 6,
      AUTHOR_COLOR: 7,
      TITLE_STROKE_COLOR: 8,
      SUBTITLE_STROKE_COLOR: 9,
      AUTHOR_STROKE_COLOR: 10,
      BACKGROUND_URL: 11,
      TECHNOLOGIES: 12,
      TECHNOLOGY_OPTIONS: 13,
      tab: "image",
      options: techOptions.options,
      technologies: []
    };
  },
  computed: {
    ...mapState({
      fonts: state => state.text.fonts,
      font: state => state.text.textOptions.font,
      title: state => state.text.textOptions.title,
      subtitle: state => state.text.textOptions.subtitle,
      author: state => state.text.textOptions.author,
      titleColor: state => state.text.textOptions.titleColor,
      subtitleColor: state => state.text.textOptions.subtitleColor,
      authorColor: state => state.text.textOptions.authorColor,
      titleStrokeColor: state => state.text.textOptions.titleStrokeColor,
      subtitleStrokeColor: state => state.text.textOptions.subtitleStrokeColor,
      authorStrokeColor: state => state.text.textOptions.authorStrokeColor,
      backgroundUrl: state => state.image.imageOptions.backgroundUrl,
      technologyOptions: state => state.text.technologyOptions
    })
  },
  methods: {
    updateVal(value, method) {
      console.log("val", value);
      let data = {
        ...this.$store.state.text.textOptions
      };
      switch (method) {
        case this.FONT:
          data.font = value;
          break;
        case this.TITLE:
          data.title = value;
          break;
        case this.SUBTITLE:
          data.subtitle = value;
          break;
        case this.AUTHOR:
          data.author = value;
          break;
        case this.TITLE_COLOR:
          5;
          data.titleColor = value;
          break;
        case this.SUBTITLE_COLOR:
          data.subtitleColor = value;
          break;
        case this.AUTHOR_COLOR:
          data.authorColor = value;
          break;
        case this.TITLE_STROKE_COLOR:
          data.titleStrokeColor = value;
          break;
        case this.SUBTITLE_STROKE_COLOR:
          data.subtitleStrokeColor = value;
          break;
        case this.AUTHOR_STROKE_COLOR:
          data.authorStrokeColor = value;
          break;
        default:
          break;
      }
      this.$store.commit("text/updateOptions", { data: data });
    },
    setBackground(data) {
      console.log("background", data);
      //this.$store.commit("image/updateOptions", {imageOptions: data })
    },
    updateTechOpt(value) {
      console.log("value", value);
      this.$store.commit("text/updateTechOptions", { data: this.technologies });
    },
    updateImage(value, method) {
      console.log("avl", value);
      let data = {
        ...this.$store.state.image.imageOptions
      };
      switch (method) {
        case this.BACKGROUND_URL:
          data.backgroundUrl = value;
          break;
      }
      this.$store.commit("image/updateOptions", { imageOptions: data });
    },
    filterFn(val, update, abort) {
      console.log("val", val);
      if (val.length < 3) {
        abort();
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = techOptions.options.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    showUnplashDialog() {
      this.$q
        .dialog({
          component: UnsplashDialog,
          parent: this,
          text: "Select a Photo from Unsplash"
        })
        .onOk(() => {
          let data = {
            ...this.$store.state.image.imageOptions
          };
          data.backgroundUrl = this.$store.state.image.imageOptions.selectedImage;
          this.$store.commit("image/updateOptions", { imageOptions: data });
        })
        .onCancel(() => {
          console.log("Cancelled");
        })
        .onDismiss(() => {
          console.log("Dismissed");
        });
    }
  },
  components: {
    FilterImage
  }
};
</script>

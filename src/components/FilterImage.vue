<template>
  <div>
    <q-select
      :disable="disableInput"
      :options="FILTER_TYPES"
      :value="filter"
      @input="updateFilter($event)"
      dense
      emit-value
      color="positive"
      label="Image Filter"
      map-options
    >
      <template v-slot:before>
        <q-icon name="far fa-filter" />
      </template>
    </q-select>
    <q-input
      :disable="disableInput"
      placeholder="10px"
      label="Blur Length"
      :value="filterValue"
      type="number"
      debounce="500"
      color="positive"
      error-message="For best results, this number should be less than 50."
      :rules="[val => val <= 50]"
      v-if="showBlurSettings"
      hint="Number of pixels"
      @input="updateFilterParam($event)"
    >
      <template v-slot:before>
        <q-icon name="far fa-compact-disc" />
      </template>
      <template v-slot:append>
        <span class="text-caption">px</span>
      </template>
    </q-input>
    <q-input
      :disable="disableInput"
      placeholder="20%"
      color="positive"
      label="Brighten Value"
      error-message="For best results, this number should be less than 500."
      :rules="[val => val <= 500]"
      :value="filterValue"
      type="number"
      debounce="500"
      hint="100% is no change; above 100 = extra brightness."
      v-if="showBrightenSettings"
      @input="updateFilterParam($event)"
    >
      <template v-slot:before>
        <q-icon name="far fa-sun" />
      </template>
      <template v-slot:append>
        <span class="text-caption">%</span>
      </template>
    </q-input>
    <q-input
      :disable="disableInput"
      placeholder="20%"
      color="positive"
      label="Contrast Value"
      error-message="For best results, this number should be less than 500."
      :rules="[val => val <= 500]"
      :value="filterValue"
      type="number"
      debounce="500"
      hint="100% is no change; above 100 = extra contrast."
      v-if="showContrastSettings"
      @input="updateFilterParam($event)"
    >
      <template v-slot:before>
        <q-icon name="fas fa-adjust" />
      </template>
      <template v-slot:append>
        <span class="text-caption">%</span>
      </template>
    </q-input>
    <q-input
      :disable="disableInput"
      placeholder="10%"
      label="Grayscale Value"
      color="positive"
      error-message="For best results, this number should be less than 100."
      :rules="[val => val <= 100]"
      :value="filterValue"
      type="number"
      debounce="500"
      hint="Between 0-100%; 0% = no change."
      v-if="showGrayscaleSettings"
      @input="updateFilterParam($event)"
    >
      <template v-slot:before>
        <q-icon color="gray" name="fas fa-square" />
      </template>
      <template v-slot:append>
        <span class="text-caption">%</span>
      </template>
    </q-input>
    <q-input
      :disable="disableInput"
      placeholder="90deg"
      label="Hue Rotate Value"
      color="positive"
      error-message="For best results, this number should be equal to or less than 360."
      :rules="[val => val <= 360]"
      :value="filterValue"
      hint="0-360degrees"
      type="number"
      debounce="500"
      v-if="showHueRotateSettings"
      @input="updateFilterParam($event)"
    >
      <template v-slot:before>
        <q-icon name="fal fa-sync-alt" />
      </template>
      <template v-slot:append>
        <span class="text-caption">deg</span>
      </template>
    </q-input>
    <q-input
      :disable="disableInput"
      placeholder="10%"
      label="Invert Value"
      error-message="For best results, this number should be less than 100."
      :rules="[val => val <= 100]"
      color="positive"
      :value="filterValue"
      type="number"
      debounce="500"
      hint="Between 0 and 100."
      v-if="showInvertSettings"
      @input="updateFilterParam($event)"
    >
      <template v-slot:before>
        <q-icon name="far fa-sort-alt" />
      </template>
      <template v-slot:append>
        <span class="text-caption">%</span>
      </template>
    </q-input>
    <q-input
      :disable="disableInput"
      placeholder="30%"
      label="Saturate Value"
      error-message="For best results, this number should be less than 500."
      :rules="[val => val <= 500]"
      :value="filterValue"
      color="positive"
      type="number"
      debounce="500"
      hint="100% is no change; above 100 = extra saturation."
      v-if="showSaturateSettings"
      @input="updateFilterParam($event)"
    >
      <template v-slot:before>
        <q-icon name="far fa-adjust" />
      </template>
      <template v-slot:append>
        <span class="text-caption">%</span>
      </template>
    </q-input>
    <q-input
      :disable="disableInput"
      placeholder="25%"
      label="Opacity Value"
      error-message="For best results, this number should be less than 100."
      :rules="[val => val <= 100]"
      :value="filterValue"
      type="number"
      color="positive"
      debounce="500"
      v-if="showOpacitySettings"
      hint="Between 0 and 100."
      @input="updateFilterParam($event)"
    >
      <template v-slot:before>
        <q-icon name="far fa-transporter-empty" />
      </template>
      <template v-slot:append>
        <span class="text-caption">%</span>
      </template>
    </q-input>
    <q-input
      :disable="disableInput"
      placeholder="60%"
      label="Sepia Value"
      error-message="For best results, this number should be less than 100."
      :rules="[val => val <= 100]"
      :value="filterValue"
      color="positive"
      type="number"
      debounce="500"
      hint="Between 0 and 100."
      v-if="showSepiaSettings"
      @input="updateFilterParam($event)"
    >
      <template v-slot:before>
        <q-icon color="brown" name="fas fa-square" />
      </template>
      <template v-slot:append>
        <span class="text-caption">%</span>
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapState } from "vuex";
const FILTERS = [
  { label: "None", value: "none" },
  { label: "Blur", value: "blur" },
  { label: "Brighten", value: "brighten" },
  { label: "Contrast", value: "contrast" },
  { label: "Grayscale", value: "grayscale" },
  { label: "Hue Rotate", value: "hue-rotate" },
  { label: "Invert", value: "invert" },
  { label: "Opacity", value: "opacity" },
  { label: "Saturate", value: "saturate" },
  { label: "Sepia", value: "sepia" }
];

export default {
  props: {
    disableInput: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      FILTER_TYPES: FILTERS,
      filterError: false
    };
  },
  computed: {
    ...mapState({
      filter: state => state.image.imageOptions.filter.filterName,
      filterValue: state =>
        state.image.imageOptions.filter.filterParams.filterValue
    }),
    showBlurSettings() {
      return this.filter === "blur";
    },
    showBrightenSettings() {
      return this.filter === "brighten";
    },
    showContrastSettings() {
      return this.filter === "contrast";
    },
    showGrayscaleSettings() {
      return this.filter === "grayscale";
    },
    showHueRotateSettings() {
      return this.filter === "hue-rotate";
    },
    showInvertSettings() {
      return this.filter === "invert";
    },
    showSaturateSettings() {
      return this.filter === "saturate";
    },
    showOpacitySettings() {
      return this.filter === "opacity";
    },
    showSepiaSettings() {
      return this.filter === "sepia";
    }
  },
  methods: {
    updateFilter(val) {
      this.$store.commit("image/updateFilter", { filterName: val });
    },
    updateFilterParam(val) {
      if (!this.filterError) {
        this.$store.commit("image/updateFilterOptions", { settings: val });
      }
    }
  }
};
</script>

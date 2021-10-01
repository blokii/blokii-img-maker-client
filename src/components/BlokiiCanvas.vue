<template>
  <div class="full-height full-width">
    <canvas
      ref="canvas"
      class="border full-height full-width"
      v-on:refresh-canvas="drawCanvas"
    ></canvas>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { exportFile } from "quasar";
export default {
  watch: {
    textOptions: function(newVal, oldVal) {
      this.drawCanvas();
    },
    selected: function(newVal, oldVal) {
      this.drawCanvas();
    },
    backgroundUrl: function(newVal, oldVal) {
      this.drawCanvas();
    },
    filter: function(newVal, oldVal) {
      this.drawCanvas();
    },
    filterValue: function(newVal, oldVal) {
      this.drawCanvas();
    }
  },
  computed: {
    ...mapState({
      DPR: state => state.global.DPR,
      WIDTH: state => state.global.WIDTH,
      HEIGHT: state => state.global.HEIGHT,
      textOptions: state => state.text.textOptions,
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
      selected: state => state.text.textOptions.technologies,
      technologyOptions: state => state.text.technologyOptions,
      filename: state => state.global.filename,
      filter: state => state.image.imageOptions.filter,
      filterValue: state =>
        state.image.imageOptions.filter.filterParams.filterValue,
      backgroundUrl: state => state.image.imageOptions.backgroundUrl
    }),
    filterCSS() {
      if (this.filter.filterName === "blur") {
        return `blur(${
          this.filter.filterParams.filterValue
            ? this.filter.filterParams.filterValue
            : 5
        }px)`;
      } else if (this.filter.filterName === "brighten") {
        return `brightness(${
          this.filter.filterParams.filterValue
            ? this.filter.filterParams.filterValue
            : 20
        }%)`;
      } else if (this.filter.filterName === "contrast") {
        return `contrast(${
          this.filter.filterParams.filterValue
            ? this.filter.filterParams.filterValue
            : 10
        }%)`;
      } else if (this.filter.filterName === "grayscale") {
        return `grayscale(${
          this.filter.filterParams.filterValue
            ? this.filter.filterParams.filterValue
            : 50
        }%)`;
      } else if (this.filter.filterName === "hue-rotate") {
        return `hue-rotate(${
          this.filter.filterParams.filterValue
            ? this.filter.filterParams.filterValue
            : 90
        }deg)`;
      } else if (this.filter.filterName === "invert") {
        return `invert(${
          this.filter.filterParams.filterValue
            ? this.filter.filterParams.filterValue
            : 10
        }%)`;
      } else if (this.filter.filterName === "saturate") {
        return `saturate(${
          this.filter.filterParams.filterValue
            ? this.filter.filterParams.filterValue
            : 30
        }%)`;
      } else if (this.filter.filterName === "opacity") {
        return `opacity(${
          this.filter.filterParams.filterValue
            ? this.filter.filterParams.filterValue
            : 25
        }%)`;
      } else if (this.filter.filterName === "sepia") {
        return `sepia(${
          this.filter.filterParams.filterValue
            ? this.filter.filterParams.filterValue
            : 60
        }%)`;
      }
      return "none";
    }
  },
  mounted() {
    let dpr = window.devicePixelRatio || 1;
    let canvas = this.$refs.canvas;
    // Get the size of the canvas in CSS pixels.
    let rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    let width = (canvas.width = rect.width * dpr);
    let height = (canvas.height = rect.height * dpr);
    let ctx = canvas.getContext("2d");
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);

    this.SET_DPR({ dpr: dpr });
    this.SET_HEIGHT({ height: height });
    this.SET_WIDTH({ width: width });

    this.drawCanvas();
    this.$root.$on("download-image", this.downloadImage);
  },
  methods: {
    ...mapMutations({
      SET_DPR: "global/SET_DPR",
      SET_HEIGHT: "global/SET_HEIGHT",
      SET_WIDTH: "global/SET_WIDTH"
    }),
    downloadImage() {
      let canvas = this.$refs.canvas;

      canvas.toBlob(blob => {
        var newImg = document.createElement("img"),
          url = URL.createObjectURL(blob);

        newImg.onload = function() {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url);
        };

        newImg.src = url;
        const status = exportFile(this.filename, blob);

        if (status === true) {
          // browser allowed it
        } else {
          // browser denied it
          console.log("Error: " + status);
        }
      });
    },
    drawCanvas() {
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      const x = canvas.width / 2;

      if (this.backgroundUrl) {
        // images
        let background = new Image();
        background.setAttribute("crossorigin", "anonymous");
        background.width = canvas.width;
        background.src = this.backgroundUrl;
        let that = this;
        background.onload = function() {
          background.height =
            (canvas.height * background.width) / background.naturalWidth;
          if (that.filter.filterName) {
            ctx.filter = that.filterCSS;
          }
          ctx.drawImage(
            background,
            0,
            0,
            canvas.width / that.DPR,
            canvas.height / that.DPR
          );
          ctx.filter = "none";
          that.drawOverlays(ctx, x);
          that.drawText(ctx, x);
          that.drawTech(ctx, x);
        };
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawOverlays(ctx, x);
        this.drawText(ctx, x);
        this.drawTech(ctx, x);
      }
    },
    drawOverlays(ctx, x) {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(0, this.HEIGHT / 5 + 200, this.WIDTH, this.HEIGHT / 5);
      ctx.fill();
    },
    drawText(ctx, x) {
      if (this.title) {
        ctx.font = "bold 84px '" + this.font + "', serif";
        ctx.fillStyle = this.titleColor;
        ctx.strokeStyle = this.titleStrokeColor;
        ctx.lineWidth = 0.5;
        ctx.textAlign = "center";
        ctx.fillText(this.title, x / this.DPR, this.HEIGHT / 5);
        ctx.strokeText(this.title, x / this.DPR, this.HEIGHT / 5);
      }

      if (this.subtitle) {
        ctx.font = "bold 64px '" + this.font + "', serif";
        ctx.fillStyle = this.subtitleColor;
        ctx.lineWidth = 0.33;
        ctx.strokeStyle = this.subtitleStrokeColor;
        ctx.textAlign = "center";
        ctx.fillText(this.subtitle, x / this.DPR, this.HEIGHT / 5 + 75);
        ctx.strokeText(this.subtitle, x / this.DPR, this.HEIGHT / 5 + 75);
      }

      if (this.author) {
        ctx.font = "bold 36px '" + this.font + "', serif";
        ctx.fillStyle = this.authorColor;
        ctx.strokeStyle = this.authorStrokeColor;
        ctx.lineWidth = 0.25;
        ctx.textAlign = "center";
        ctx.fillText(this.author, x / this.DPR, this.HEIGHT / 5 + 150);
        ctx.strokeText(this.author, x / this.DPR, this.HEIGHT / 5 + 150);
      }
    },
    drawTech(ctx, x) {
      let distanceVar = 140;
      let distance = 120;
      this.selected.forEach(s => {
        ctx.font = "normal 5em 'Font Awesome 5 Brands', serif";
        ctx.fillStyle = s.color ? s.color : "#000000";
        ctx.strokeStyle = s.color ? s.color : "#000000";
        ctx.lineWidth = 1;
        ctx.textAlign = "center";
        ctx.fillText(
          s.unicode,
          (this.WIDTH - distance) / this.DPR,
          (this.HEIGHT - 100) / this.DPR
        );
        distance += distanceVar;
      });
    }
  }
};
</script>

<style scoped>
.border {
  border: 1px solid #000;
}
canvas {
  width: 100%;
}
</style>

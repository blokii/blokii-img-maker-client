import techOptions from "../../../public/data/techOptions.json";
import fontOptions from "../../../public/data/fonts.json";

export default function() {
  return {
    fonts: fontOptions.options,
    technologyOptions: techOptions.options,
    textOptions: {
      font: "Lato",
      title: "",
      subtitle: "",
      author: "",
      titleColor: "#000",
      subtitleColor: "#000",
      authorColor: "#000",
      titleStrokeColor: "#000",
      subtitleStrokeColor: "#000",
      authorStrokeColor: "#000",
      technologies: []
    }
  };
}

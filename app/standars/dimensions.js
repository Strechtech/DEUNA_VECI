import { Dimensions } from "react-native";

let screen = Dimensions.get("window");
let widthScreen = screen.width;
let heightScreen = screen.height;

export const screenStandar = {
  separation: {
      horizontalSeparation: widthScreen * 0.055,
  },
  heightBar: {
      heightSize: heightScreen * 0.03,
  },
};
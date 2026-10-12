import { StyleSheet, View } from "react-native";
import { screenStandar } from "./dimensions";

export const HeadBarSpace = () => {
    return(
        <View style={styleHeadBar.container}></View>
    )
}

export const styleHeadBar = StyleSheet.create({
    container: {
        height: screenStandar.heightBar.heightSize,
    }
});
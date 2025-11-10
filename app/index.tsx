import Clutton from "@/components/clutton/Clutton";
import CenterContainer from "@/components/containers/CenterContainer";
import Icon from "@/components/icon/Icon";
import { EIconSize } from "@/components/icon/types";
import Rotatable from "@/components/misc/Rotatable/Rotatable";
import { ETypographyFont, ETypographyFontSize, ETypographyTheme } from "@/components/Typography/types";
import Typography from "@/components/typography/Typography";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <CenterContainer style={styles.container}>
      <View style={styles.titleContainer}>
        <Rotatable duration={2500}>
          <Icon name="music-circle" size={EIconSize.Huge} theme={ETypographyTheme.Primary} />
        </Rotatable>
        <Typography 
          fontSize={ETypographyFontSize.Title} 
          fontType={ETypographyFont.Bold}
          center
        >
          Amplitude
        </Typography>
      </View>

      <View style={styles.buttonContainer}>
        <Clutton text="Continue" icon="arrow-right" iconOrientation="row-reverse" />
        <Clutton text="Login" icon="login" iconOrientation="row-reverse" />
      </View>
    </CenterContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 54
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 24
  },
  buttonContainer: {
    gap: 18
  }
});

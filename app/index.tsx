import Clutton from "@/components/clutton/Clutton";
import CenterContainer from "@/components/containers/CenterContainer";
import Icon from "@/components/icon/Icon";
import { EIconSize, EIconTheme } from "@/components/icon/types";
import Rotatable from "@/components/misc/Rotatable/Rotatable";
import { ETypographyFont, ETypographyFontSize } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <CenterContainer style={styles.container}>
      <View style={styles.titleContainer}>
        <Rotatable duration={2500}>
          <Icon name="music-circle" size={EIconSize.Huge} theme={EIconTheme.Primary} />
        </Rotatable>
        <Typography 
          fontSize={ETypographyFontSize.Title} 
          fontType={ETypographyFont.Regular}
          center
        >
          Amplitude
        </Typography>
      </View>

      <View style={styles.buttonContainer}>
        <Clutton 
          text="Continue" 
          icon="arrow-right" 
          iconOrientation="row-reverse" 
          onPress={() => router.push("/(tabs)/songs")}
        />
        <Clutton 
          text="Login" 
            icon="login" 
            iconOrientation="row-reverse" 
        />
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

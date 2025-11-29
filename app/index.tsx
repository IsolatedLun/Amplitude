import { AuthUserContext } from "@/components/auth/AuthProvider";
import Clutton from "@/components/clutton/Clutton";
import CenterContainer from "@/components/containers/CenterContainer";
import Icon from "@/components/icon/Icon";
import { EIcon_Size, EIcon_Theme } from "@/components/icon/types";
import Rotatable from "@/components/misc/Rotatable/Rotatable";
import { ETypography_FontSize, ETypography_FontType } from "@/components/typography/types";
import Typography from "@/components/typography/Typography";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { user } = useContext(AuthUserContext)!;

  return (
    <CenterContainer style={styles.container}>
      <View style={styles.titleContainer}>
        <Rotatable duration={2500}>
          <Icon name="music-circle" size={EIcon_Size.Page} theme={EIcon_Theme.Primary} />
        </Rotatable>
        <Typography 
          fontSize={ETypography_FontSize.Title} 
          fontType={ETypography_FontType.Regular}
          center
        >
          Amplitude
        </Typography>
      </View>

      <View style={styles.buttonContainer}>
        {
          user 
          ? (
            <>
              <Clutton
                  text="Home" 
                  icon="home"
                  onPress={() => router.push("/(tabs)/songs")}
              />
              <Clutton
                  text="Logout" 
                  icon="login"  
                  onPress={() => null}
              />
            </>
          )
          : (
            <>
              <Clutton
                  text="Sign up" 
                  icon="plus"
                  onPress={() => router.push("/auth/signup")}
              />
              <Clutton
                  text="Login" 
                  icon="login"  
                  onPress={() => router.push("/auth/login")}
              />
            </>
          )
        }
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

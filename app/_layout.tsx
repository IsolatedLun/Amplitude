import { AuthProvider } from "@/components/auth/AuthProvider";
import RootWrapper from "@/components/RootWrapper";
import { ColorSchemeProvider } from "@/components/scheme/ColorSchemeProvider";
import { MOCK_USER } from "@/utils/global";
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    SecureStore.setItemAsync("user", JSON.stringify(MOCK_USER));
  }, [])

  return(
    <AuthProvider>
      <ColorSchemeProvider>
        <RootWrapper />
      </ColorSchemeProvider>
    </AuthProvider>
  )
}

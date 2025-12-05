import { AuthProvider } from "@/components/auth/AuthProvider";
import RootWrapper from "@/components/RootWrapper";
import { ColorSchemeProvider } from "@/components/scheme/ColorSchemeProvider";

export default function RootLayout() {
  return(
    <AuthProvider>
      <ColorSchemeProvider>
        <RootWrapper />
      </ColorSchemeProvider>
    </AuthProvider>
  )
}

import RootWrapper from "@/components/RootWrapper";
import { ColorSchemeProvider } from "@/components/scheme/ColorSchemeProvider";

export default function RootLayout() {
  return(
    <ColorSchemeProvider>
      <RootWrapper />
    </ColorSchemeProvider>
  )
}

import CenterContainer from "@/components/containers/CenterContainer";
import { ETypographyFont, ETypographyFontSize } from "@/components/Typography/types";
import Typography from "@/components/typography/Typography";

export default function Index() {
  return (
    <CenterContainer alignCenter>
      <Typography 
        fontSize={ETypographyFontSize.Title} 
        fontType={ETypographyFont.Bold}
      >
        Amplitude
      </Typography>
    </CenterContainer>
  );
}

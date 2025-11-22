import { Link } from "expo-router";
import { ETypographyTheme } from "../typography/types";
import Typography from "../typography/Typography";
import { IAnchor } from "./types";

const Anchor = (props: IAnchor) => {
    return(
        <Link href={props.href}>
            <Typography 
                theme={ETypographyTheme.Primary} 
                style={{ 
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid" 
                    }}
                >
                { props.text }
            </Typography>
        </Link>
    )
};

export default Anchor;
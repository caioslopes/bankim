import { TextProps as RNTextProps, Text as RNText } from "react-native";
import Theme from "../../theme/theme";

export type TextProps = {} & RNTextProps;

export default function Text({ children, style, ...props }: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        {
          fontSize: Theme.font.size.body,
          color: Theme.color.textPrimary,
          //fontFamily: Theme.font.family.regular,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

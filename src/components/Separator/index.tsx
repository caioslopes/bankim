import { View } from "react-native";
import Theme from "../../theme/theme";

export type SeparatorProps = {
  height?: number;
};

export default function Separator({ height = Theme.space.md }: SeparatorProps) {
  return <View style={{ height }} />;
}

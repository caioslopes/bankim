import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export type SafeScreenProps = {} & SafeAreaViewProps;

export default function SafeScreen({ children, ...props }: SafeScreenProps) {
  const { style } = props;
  return (
    <SafeAreaView {...props} style={[style, { flex: 1 }]}>
      {children}
    </SafeAreaView>
  );
}

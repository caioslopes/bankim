import { Text, View } from "react-native";
import { RootStackScreenProps } from "../../navigation/types";
import SafeScreen from "../../components/SafeScreen";

type Props = RootStackScreenProps<"AdicionarFonteRecorrenteScreen">;

export default function AdicionarFonteRecorrenteScreen({ navigation }: Props) {
  return (
    <SafeScreen>
      <View>
        <Text>AdicionarFonteRecorrenteScreen</Text>
      </View>
    </SafeScreen>
  );
}

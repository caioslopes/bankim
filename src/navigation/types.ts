import { useNavigation } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  DashboardScreen: undefined;
  NovaFonteRecorrenteScreen: undefined;
  NovoLancamentoScreen: undefined;
  NovoCartaoScreen: undefined;
  DetalhesMesScreen: {
    competencia: string;
  };
  DetalhesCartaoScreen: {
    id: string;
    competencia: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function useTypedNavigation() {
  return useNavigation<NavigationProp>();
}

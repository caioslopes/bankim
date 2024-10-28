import { Pressable, Text, View } from "react-native";
import { Href, Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>You are in index</Text>
      <Link href="/home">
        <Text>Go to Home</Text>
      </Link>
    </View>
  );
}

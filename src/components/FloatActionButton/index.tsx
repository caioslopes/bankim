import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";

export type FabAction = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress: () => void;
  color?: string;
  labelColor?: string;
};

type FloatingActionButtonProps = {
  actions: FabAction[];
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function FloatingActionButton({
  actions,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useSharedValue(0);

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    animation.value = withSpring(toValue, { damping: 15 });
    setIsOpen(!isOpen);
  };

  const rotationStyle = useAnimatedStyle(() => {
    const rotate = interpolate(animation.value, [0, 1], [0, 45]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      {actions.map((action, index) => {
        const actionStyle = useAnimatedStyle(() => {
          const translateY = interpolate(
            animation.value,
            [0, 1],
            [0, -(index + 1) * 60]
          );
          const opacity = animation.value;
          return {
            transform: [{ translateY }],
            opacity,
          };
        });

        return (
          <AnimatedTouchable
            key={index}
            style={[styles.actionButton, actionStyle]}
            onPress={() => {
              action.onPress();
              toggleMenu();
            }}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.label, { color: action.labelColor || "#FFF" }]}
            >
              {action.label}
            </Text>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: action.color || "#4A90E2" },
              ]}
            >
              <MaterialCommunityIcons
                name={action.icon}
                size={24}
                color="#FFF"
              />
            </View>
          </AnimatedTouchable>
        );
      })}

      <TouchableOpacity
        style={styles.fab}
        onPress={toggleMenu}
        activeOpacity={0.8}
      >
        <Animated.View style={rotationStyle}>
          <MaterialCommunityIcons name="plus" size={30} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 30,
    alignItems: "center",
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  actionButton: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    right: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  label: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: "bold",
  },
});

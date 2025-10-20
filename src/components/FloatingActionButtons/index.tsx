import React, { useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "../Icon";
import Theme from "../../theme/theme";
import Text from "../Text";

export type FloatingActionButtonsOption = {
  label: string;
  icon: React.ComponentProps<typeof Icon>["name"];
  onPress: () => void;
};

export type FloatingActionButtonsProps = {
  options: FloatingActionButtonsOption[];
};

export default function FloatingActionButtons({
  options,
}: FloatingActionButtonsProps) {
  const [showOptions, setShowOptions] = useState(false);

  const animationValue = useRef(new Animated.Value(0)).current;
  const duration = 250;

  const rotate = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const zIndex = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 2],
  });

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  const animateIn = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const animateOut = () => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const handleClick = () => {
    if (showOptions) {
      setShowOptions(false);
      animateOut();
    } else {
      setShowOptions(true);
      animateIn();
    }
  };

  const handleOptionPress = (onPress: () => void) => {
    setShowOptions(false);
    animateOut();

    onPress();
  };

  return (
    <>
      <Animated.View
        style={[styles.container, { opacity: animationValue }, { zIndex }]}
      >
        <Animated.View
          style={[styles.optionsContainer, { transform: [{ translateY }] }]}
        >
          {options.map(({ label, icon, onPress }) => {
            return (
              <TouchableOpacity
                onPress={() => handleOptionPress(onPress)}
                style={styles.option}
                key={label}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{label}</Text>
                </View>
                <View style={styles.icon}>
                  <Icon color={Theme.colors.primary} size={20} name={icon} />
                </View>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </Animated.View>

      <TouchableOpacity onPress={handleClick} style={styles.showOptions}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Icon color={Theme.colors.white} size={24} name="add" />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.3)",
  },
  showOptions: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radius.full,
    position: "absolute",
    bottom: 60,
    right: 16,
    elevation: 4,
    zIndex: 3,
  },
  optionsContainer: {
    position: "absolute",
    gap: Theme.space.lg,
    alignItems: "flex-end",
    right: 20,
    bottom: 140,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.space.md,
  },
  textContainer: {
    paddingVertical: Theme.space.xxs,
    paddingHorizontal: Theme.space.xs,
    justifyContent: "center",
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radius.small,
  },
  text: {
    fontWeight: "bold",
    color: Theme.colors.textSecondary,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radius.full,
  },
});

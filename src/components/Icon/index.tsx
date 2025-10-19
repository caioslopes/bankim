import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export type IconProps = {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
};

export default function Icon({ name, size = 24, color = "black" }: IconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}

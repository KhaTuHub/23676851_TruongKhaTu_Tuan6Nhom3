import React from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useCart } from "../hooks/useCart";

const FloatingCartButton = ({
  onPress,
}) => {
  const {
    totalQuantity,
  } = useCart();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.icon}>
        🛒
      </Text>

      {totalQuantity > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {totalQuantity}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",

    right: 20,
    bottom: 20,

    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor: "#1976D2",

    justifyContent: "center",
    alignItems: "center",

    elevation: 6,
  },

  icon: {
    fontSize: 27,
  },

  badge: {
    position: "absolute",

    right: -2,
    top: -2,

    minWidth: 23,
    height: 23,

    paddingHorizontal: 5,

    borderRadius: 12,

    backgroundColor: "#E53935",

    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default FloatingCartButton;

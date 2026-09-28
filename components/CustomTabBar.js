import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map(
        (route, index) => {
          const isFocused =
            state.index === index;

          const {
            options,
          } =
            descriptors[route.key];

          const label =
            options.tabBarLabel ||
            options.title ||
            route.name;

          const onPress = () => {
            const event =
              navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

            if (
              !isFocused &&
              !event.defaultPrevented
            ) {
              navigation.navigate(
                route.name
              );
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
            >
              <View
                style={[
                  styles.tabContent,
                  isFocused &&
                    styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.label,
                    isFocused &&
                      styles.activeLabel,
                  ]}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 65,

    flexDirection: "row",

    backgroundColor: "#fff",

    borderTopWidth: 1,
    borderTopColor: "#ddd",

    elevation: 10,
  },

  tab: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  tabContent: {
    width: "85%",

    paddingVertical: 9,

    alignItems: "center",

    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: "#E3F2FD",
  },

  label: {
    color: "#777",
    fontSize: 13,
  },

  activeLabel: {
    color: "#1976D2",
    fontWeight: "bold",
  },
});

export default CustomTabBar;

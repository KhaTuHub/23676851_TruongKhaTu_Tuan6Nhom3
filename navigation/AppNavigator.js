import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import CategoryScreen from "../screens/CategoryScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import AccountScreen from "../screens/AccountScreen";

import CustomTabBar from "../components/CustomTabBar";

const RootStack =
  createNativeStackNavigator();

const HomeStack =
  createNativeStackNavigator();

const Tab =
  createBottomTabNavigator();


// Stack của Home
const HomeStackNavigator =
  () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Trang chủ",
          }}
        />

        <HomeStack.Screen
          name="BookDetail"
          component={BookDetailScreen}
          options={{
            title: "Chi tiết sách",
          }}
        />
      </HomeStack.Navigator>
    );
  };


// Bottom Tab
const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomTabBar
          {...props}
        />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={
          HomeStackNavigator
        }
        options={{
          tabBarLabel: "Home",
        }}
      />

      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarLabel: "Danh mục",
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Giỏ hàng",
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Tài khoản",
        }}
      />
    </Tab.Navigator>
  );
};


// Root Stack
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MainTabs}
          options={{
            headerShown: false,
          }}
        />

        <RootStack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{
            title: "Thanh toán",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

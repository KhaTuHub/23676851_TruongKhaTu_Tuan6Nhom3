import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  useAuth,
} from "../hooks/useAuth";

const AccountScreen = () => {
  const {
    user,
    isLoggedIn,
    loginUser,
    logoutUser,
  } = useAuth();

  const handleLogin =
    () => {
      loginUser(
        {
          id: "user01",
          name: "Nguyễn Văn A",
          email: "nguyenvana@gmail.com",
        },
        "fake-token-123456"
      );
    };

  // Chưa đăng nhập
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Tài khoản
        </Text>

        <Text style={styles.status}>
          Bạn chưa đăng nhập.
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            Đăng nhập giả lập
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Đã đăng nhập
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tài khoản
      </Text>

      <View style={styles.profile}>
        <Text style={styles.welcome}>
          Xin chào, {user.name}
        </Text>

        <Text>
          Email: {user.email}
        </Text>

        <Text>
          ID: {user.id}
        </Text>

        <Text style={styles.loggedIn}>
          Đã đăng nhập
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logoutUser}
      >
        <Text style={styles.buttonText}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },

  status: {
    fontSize: 17,
    color: "#666",
  },

  profile: {
    padding: 20,
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
  },

  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  loggedIn: {
    color: "#2E7D32",
    fontWeight: "bold",
    marginTop: 15,
  },

  loginButton: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },

  logoutButton: {
    backgroundColor: "#E53935",
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AccountScreen;

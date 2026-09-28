import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const CheckoutScreen = ({
  route,
}) => {
  const {
    totalPrice,
  } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Thanh toán
      </Text>

      <Text style={styles.label}>
        Tổng tiền:
      </Text>

      <Text style={styles.price}>
        {Number(totalPrice).toLocaleString()} VNĐ
      </Text>

      <Text style={styles.note}>
        Đây là màn hình thanh toán
        tạm thời.
      </Text>

      <Text>
        Chức năng thanh toán sẽ
        hoàn thiện ở Tuần 9.
      </Text>
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
    marginBottom: 30,
  },

  label: {
    fontSize: 17,
  },

  price: {
    color: "#E53935",
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
  },

  note: {
    marginTop: 20,
    marginBottom: 5,
  },
});

export default CheckoutScreen;

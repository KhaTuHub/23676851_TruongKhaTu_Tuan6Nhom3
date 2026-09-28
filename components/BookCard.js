import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const BookCard = ({
  book,
  onDetail,
  onAddToCart,
  onWishlist,
  isFavorite,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {book.title}
        </Text>

        <TouchableOpacity
          onPress={onWishlist}
        >
          <Text style={styles.heart}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.category}>
        {book.category}
      </Text>

      <Text
        style={styles.description}
        numberOfLines={2}
      >
        {book.description}
      </Text>

      <Text style={styles.price}>
        {Number(book.price).toLocaleString()} VNĐ
      </Text>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={onDetail}
      >
        <Text style={styles.buttonText}>
          Xem chi tiết
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={onAddToCart}
      >
        <Text style={styles.buttonText}>
          Thêm vào giỏ
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },

  heart: {
    fontSize: 28,
    color: "#E53935",
    marginLeft: 10,
  },

  category: {
    color: "#1976D2",
    marginTop: 5,
  },

  description: {
    color: "#666",
    marginTop: 8,
  },

  price: {
    color: "#E53935",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  detailButton: {
    backgroundColor: "#1976D2",
    padding: 11,
    borderRadius: 7,
    marginBottom: 8,
  },

  cartButton: {
    backgroundColor: "#43A047",
    padding: 11,
    borderRadius: 7,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default BookCard;

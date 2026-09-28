import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  getProductById,
} from "../services/productApi";

import { useCart } from "../hooks/useCart";

import {
  useWishlist,
} from "../hooks/useWishlist";

const BookDetailScreen = ({
  route,
}) => {
  const {
    bookId,
  } = route.params;

  const [
    book,
    setBook,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const {
    addItem,
  } = useCart();

  const {
    toggleItem,
    isFavorite,
  } = useWishlist();

  useEffect(() => {
    loadBook();
  }, [bookId]);

  const loadBook = async () => {
    try {
      const data =
        await getProductById(
          bookId
        );

      setBook(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
        />

        <Text>
          Đang tải...
        </Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.center}>
        <Text>
          Không tìm thấy sách.
        </Text>
      </View>
    );
  }

  const favorite =
    isFavorite(book.id);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {book.title}
        </Text>

        <TouchableOpacity
          onPress={() =>
            toggleItem(book.id)
          }
        >
          <Text style={styles.heart}>
            {favorite
              ? "♥"
              : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.category}>
        {book.category}
      </Text>

      <Text style={styles.description}>
        {book.description}
      </Text>

      <Text style={styles.price}>
        {Number(book.price).toLocaleString()} VNĐ
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          addItem(book.id)
        }
      >
        <Text style={styles.buttonText}>
          Thêm vào giỏ hàng
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  title: {
    flex: 1,
    fontSize: 27,
    fontWeight: "bold",
  },

  heart: {
    fontSize: 32,
    color: "#E53935",
    marginLeft: 15,
  },

  category: {
    fontSize: 16,
    color: "#1976D2",
    marginTop: 15,
  },

  description: {
    fontSize: 17,
    color: "#555",
    lineHeight: 26,
    marginTop: 20,
  },

  price: {
    color: "#E53935",
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 30,
  },

  button: {
    backgroundColor: "#1976D2",
    padding: 16,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default BookDetailScreen;

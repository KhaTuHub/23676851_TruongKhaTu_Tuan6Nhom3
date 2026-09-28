import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  getProducts,
} from "../services/productApi";

import {
  useCart,
} from "../hooks/useCart";

const CartScreen = ({
  navigation,
}) => {
  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const {
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts =
    async () => {
      try {
        const data =
          await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const findBook = (
    bookId
  ) => {
    return products.find(
      (product) =>
        String(product.id) ===
        String(bookId)
    );
  };

  // Tính tổng tiền
  const totalPrice =
    items.reduce(
      (total, item) => {
        const book =
          findBook(
            item.bookId
          );

        if (!book) {
          return total;
        }

        return (
          total +
          Number(book.price) *
            item.quantity
        );
      },
      0
    );

  const renderItem = ({
    item,
  }) => {
    const book =
      findBook(
        item.bookId
      );

    if (!book) {
      return null;
    }

    return (
      <View style={styles.item}>
        <Text style={styles.bookTitle}>
          {book.title}
        </Text>

        <Text>
          {book.category}
        </Text>

        <Text style={styles.price}>
          {Number(book.price).toLocaleString()} VNĐ
        </Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() =>
              updateItemQuantity(
                book.id,
                item.quantity - 1
              )
            }
          >
            <Text
              style={
                styles.quantityButton
              }
            >
              −
            </Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            onPress={() =>
              updateItemQuantity(
                book.id,
                item.quantity + 1
              )
            }
          >
            <Text
              style={
                styles.quantityButton
              }
            >
              +
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtotal}>
          Thành tiền:{" "}
          {(
            Number(book.price) *
            item.quantity
          ).toLocaleString()}{" "}
          VNĐ
        </Text>

        <TouchableOpacity
          onPress={() =>
            removeItem(book.id)
          }
        >
          <Text style={styles.remove}>
            Xóa
          </Text>
        </TouchableOpacity>
      </View>
    );
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Giỏ hàng
      </Text>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text>
            Giỏ hàng đang trống.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) =>
              String(
                item.bookId
              )
            }
            renderItem={
              renderItem
            }
          />

          <Text style={styles.total}>
            Tổng tiền:{" "}
            {totalPrice.toLocaleString()}{" "}
            VNĐ
          </Text>

          <TouchableOpacity
            style={
              styles.checkoutButton
            }
            onPress={() =>
              navigation.navigate(
                "Checkout",
                {
                  totalPrice,
                }
              )
            }
          >
            <Text
              style={
                styles.checkoutText
              }
            >
              Thanh toán
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },

  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    color: "#E53935",
    fontWeight: "bold",
    marginTop: 5,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  quantityButton: {
    fontSize: 30,
    paddingHorizontal: 15,
  },

  quantity: {
    fontSize: 18,
    fontWeight: "bold",
  },

  subtotal: {
    fontWeight: "bold",
  },

  remove: {
    color: "#E53935",
    marginTop: 8,
  },

  total: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#E53935",
    marginVertical: 15,
  },

  checkoutButton: {
    backgroundColor: "#1976D2",
    padding: 16,
    borderRadius: 8,
  },

  checkoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default CartScreen;

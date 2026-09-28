import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  getProducts,
} from "../services/productApi";

import BookCard from "../components/BookCard";

import FloatingCartButton from "../components/FloatingCartButton";

import { useCart } from "../hooks/useCart";

import {
  useWishlist,
} from "../hooks/useWishlist";

const HomeScreen = ({
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

  const [
    error,
    setError,
  ] = useState("");

  const {
    addItem,
  } = useCart();

  const {
    toggleItem,
    isFavorite,
  } = useWishlist();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data =
        await getProducts();

      setProducts(data);
    } catch (error) {
      console.log(error);

      setError(
        "Không thể tải dữ liệu"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (
    bookId
  ) => {
    navigation.navigate(
      "BookDetail",
      {
        bookId,
      }
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#1976D2"
        />

        <Text>
          Đang tải sách...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Danh sách sách
      </Text>

      <Text style={styles.count}>
        {products.length} sản phẩm
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) =>
          String(item.id)
        }
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onDetail={() =>
              handleDetail(
                item.id
              )
            }
            onAddToCart={() =>
              addItem(item.id)
            }
            onWishlist={() =>
              toggleItem(item.id)
            }
            isFavorite={isFavorite(
              item.id
            )}
          />
        )}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={
          false
        }
      />

      <FloatingCartButton
        onPress={() =>
          navigation.navigate(
            "Cart"
          )
        }
      />
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
  },

  count: {
    color: "#777",
    marginBottom: 15,
  },
});

export default HomeScreen;

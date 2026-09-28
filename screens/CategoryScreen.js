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

const CategoryScreen = () => {
  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
    async () => {
      try {
        const data =
          await getProducts();

        const uniqueCategories =
          [
            ...new Set(
              data.map(
                (item) =>
                  item.category
              )
            ),
          ];

        setCategories(
          uniqueCategories
        );
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Danh mục
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) =>
          item
        }
        renderItem={({ item }) => (
          <View style={styles.category}>
            <Text style={styles.text}>
              {item}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },

  category: {
    backgroundColor: "#E3F2FD",
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
  },

  text: {
    color: "#1976D2",
    fontWeight: "bold",
  },
});

export default CategoryScreen;

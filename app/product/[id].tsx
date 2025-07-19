import { ProductDetailsShimmer } from "@/components/ProductDetailsShimmer";
import useGetProduct from "@/hooks/api/useGetProduct";
import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const { product, isLoading } = useGetProduct(id as string);
  const { bottom } = useSafeAreaInsets();
  const { addProduct } = useCartStore();

  const handleAddToCart = () => {
    if (!product) return;
    addProduct(product);
  };

  if (isLoading) {
    return <ProductDetailsShimmer />;
  }

  if (!product) {
    return <Text>No product found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product?.title,
        }}
      />
      <ScrollView>
        <Image
          source={{ uri: product?.image }}
          style={styles.image}
          contentFit="contain"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
          <Text style={styles.category}>Category: {product?.category}</Text>
          <Text style={styles.description}>{product?.description}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>Rating: {product?.rating.rate}★</Text>
            <Text style={styles.ratingCount}>
              ({product?.rating.count} reviews)
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.addToCartButton,
          {
            paddingBottom: Platform.select({
              ios: bottom,
              android: bottom + 10,
            }),
          },
        ]}
        onPress={handleAddToCart}
      >
        <Ionicons name="cart" size={24} color="#fff" />
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    flexDirection: "column",
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.primary,
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
  },
  rating: {
    fontSize: 14,
    fontWeight: "400",
    color: "#ffB800",
  },
  ratingCount: {
    fontSize: 12,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  addToCartButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
    paddingTop: 16,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

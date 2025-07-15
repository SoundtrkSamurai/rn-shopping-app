import { Product } from "@/types/interfaces";
import { COLORS } from "@/utils/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      style={styles.productCard}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <Text numberOfLines={1}>{product.description}</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 12,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
});

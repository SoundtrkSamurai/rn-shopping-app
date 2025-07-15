import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.4; // Adjust for margins

const ProductShimmer = () => {
  return (
    <View style={styles.card}>
      {/* Placeholder for product image */}
      <ShimmerPlaceholder
        style={styles.image}
        shimmerColors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
      />
      {/* Content container */}
      <View style={styles.content}>
        {/* Placeholder for product title */}
        <ShimmerPlaceholder
          style={styles.title}
          shimmerColors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
        />
        {/* Rating container placeholder */}
        <View style={styles.ratingContainer}>
          <ShimmerPlaceholder
            style={styles.rating}
            shimmerColors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
          />
        </View>
      </View>
    </View>
  );
};

export const ProductShimmerGrid = () => {
  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, index) => (
        <ProductShimmer key={index} />
      ))}
    </View>
  );
};
export default ProductShimmerGrid;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: CARD_WIDTH,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
    gap: 8,
  },
  title: {
    width: "80%",
    height: 20,
    borderRadius: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    width: "60%",
    height: 16,
    borderRadius: 4,
  },
});

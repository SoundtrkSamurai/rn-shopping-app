import useCartStore from "@/store/cartStore";
import { Product } from "@/types/interfaces";
import { COLORS } from "@/utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem = ({ item }: CartItemProps) => {
  const { addProduct, reduceProduct } = useCartStore();

  const handleQuantityChange = (action: "increment" | "decrement") => {
    // Handle increment or decrement of item quantity
    // This could involve updating the cart store or state
    if (action === "increment") {
      addProduct(item);
    } else {
      reduceProduct(item.id);
    }
    console.log(`Quantity ${action} for item: ${item.title}`);
  };
  return (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemPrice}>
          Price: ${item.price.toFixed(2)}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => {
            handleQuantityChange("decrement");
          }}
        >
          <Ionicons name="remove" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            handleQuantityChange("increment");
          }}
        >
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 14,
    marginBottom: 4,
  },
  cartItemQuantity: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    width: 30,
    color: "white",
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
});

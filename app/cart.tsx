import CartItem from "@/components/CartItem";
import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Cart = () => {
  const { products, totalPrice, clearCart } = useCartStore();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert("Your cart is empty");
      return;
    }
    clearCart();
    Alert.alert("Checkout successful", "Thank you for your purchase!");
    router.dismiss();
  };

  if (products.length === 0) {
    return (
      <View style={styles.emptyCart}>
        <Text>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        ListHeaderComponent={() => (
          <>
            {products.length > 0 && (
              <Text style={styles.totalPrice}>
                Total: ${totalPrice.toFixed(2)}
              </Text>
            )}
          </>
        )}
      />
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
        onPress={handleCheckout}
      >
        <Ionicons name="checkmark-circle" size={24} color="#fff" />
        <Text style={styles.addToCartButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
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

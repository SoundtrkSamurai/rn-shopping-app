import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const { count } = useCartStore();

  return (
    <TouchableOpacity>
      {count > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
      <Ionicons name="cart" size={28} color="black" />
    </TouchableOpacity>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    bottom: -5,
    right: -10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 1,
    width: 20,
    height: 20,
  },
  countText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});

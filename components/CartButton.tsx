import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CartButton = () => {
  const { count } = useCartStore();

  return (
    <Link href="/cart" asChild>
      <TouchableOpacity>
        {count > 0 && (
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
        <Ionicons style={styles.icon} name="cart" size={28} color="black" />
      </TouchableOpacity>
    </Link>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    bottom: Platform.select({ ios: -5, android: 2 }),
    right: Platform.select({ ios: -10, android: 2 }),
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
  icon: {
    marginRight: Platform.select({ android: 10 }),
  },
});

import useCartStore from "@/store/cartStore";
import { StyleSheet, Text, View } from "react-native";

const CartButton = () => {
  const { count } = useCartStore();

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
    </View>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  container: {},
});

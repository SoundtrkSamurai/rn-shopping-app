import useCartStore from "@/store/cartStore";
import { Product } from "@/types/interfaces";
import { COLORS } from "@/utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React, { useRef } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem = ({ item }: CartItemProps) => {
  const { addProduct, reduceProduct, removeProduct } = useCartStore();
  const reanimatedRef = useRef<SwipeableMethods>(null);
  const opacityAnim = useSharedValue(1);
  const scaleAnim = useSharedValue(1);
  const heightAnim = useSharedValue(80);

  const handleQuantityChange = (action: "increment" | "decrement") => {
    // Handle increment or decrement of item quantity
    // This could involve updating the cart store or state
    if (action === "increment") {
      addProduct(item);
    } else {
      reduceProduct(item.id);
    }

    scaleAnim.value = withSequence(
      withSpring(1.2, { damping: 2, stiffness: 80 }),
      withSpring(1, { damping: 2, stiffness: 80 })
    );
  };

  const quantityAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const closeAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnim.value,
      height: heightAnim.value,
    };
  });

  const LeftActions = (
    progress: SharedValue<number>,
    dragX: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        opacity: progress.value,
        transform: [
          {
            translateX: dragX.value < 0 ? -dragX.value : 0,
          },
        ],
      };
    });
    return (
      <Reanimated.View style={styleAnimation}>
        <RectButton
          style={[styles.deleteButton, styles.swipeableButton]}
          onPress={() => {
            console.log("Delete pressed");
            if (Platform.OS === "ios") {
              opacityAnim.value = withTiming(0, {
                duration: 300,
                easing: Easing.inOut(Easing.ease),
              });
            }

            heightAnim.value = withTiming(0, {
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            });

            setTimeout(() => {
              reanimatedRef.current?.close();
              removeProduct(item.id);
            }, 300);
          }}
        >
          <Ionicons name="trash" size={28} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </RectButton>
      </Reanimated.View>
    );
  };

  return (
    <Reanimated.View style={closeAnimatedStyle}>
      <ReanimatedSwipeable
        ref={reanimatedRef}
        renderLeftActions={LeftActions}
        overshootRight={false}
        friction={2}
        rightThreshold={50}
        containerStyle={styles.swipeable}
      >
        <View style={styles.cartItemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.cartItemDetails}>
            <Text style={styles.cartItemTitle} numberOfLines={1}>
              {item.title}
            </Text>
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
            <Reanimated.Text
              style={[styles.quantityText, quantityAnimatedStyle]}
            >
              {item.quantity}
            </Reanimated.Text>
            <TouchableOpacity
              onPress={() => {
                handleQuantityChange("increment");
              }}
            >
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ReanimatedSwipeable>
    </Reanimated.View>
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
  swipeableButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "96%",
    marginVertical: 5,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 4,
  },
  cancelButton: {
    backgroundColor: "#007AFF",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 4,
  },
  swipeable: {
    marginRight: 4,
  },
  swipeableButtonContainer: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 5,
  },
});

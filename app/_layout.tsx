import CartButton from "@/components/CartButton";
import { storage } from "@/store/mmkv";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1 minute
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  useMMKVDevTools({
    storage,
  });
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Galactic Products",
            headerShadowVisible: false,
            headerSearchBarOptions: {
              placeholder: "Search products...",
              hideWhenScrolling: false,
              hideNavigationBar: false,
            },
            headerRight: () => <CartButton />,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{ headerBackTitle: "Products", title: "Product Details" }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: "Shopping Cart",
            headerBackTitle: "Products",
            presentation: "modal",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.dismiss()}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

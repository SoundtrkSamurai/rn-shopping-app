import CartButton from "@/components/CartButton";
import { storage } from "@/store/mmkv";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

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
      </Stack>
    </QueryClientProvider>
  );
}

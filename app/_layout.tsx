import CartButton from "@/components/CartButton";
import { storage } from "@/store/mmkv";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Sentry from "@sentry/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useNavigationContainerRef, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1 minute
    },
  },
});

// Get Sentry DSN from environment variable
const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

// Initialize Sentry once at the module level
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    attachScreenshot: true,
    debug: __DEV__,
    tracesSampleRate: 1.0,
    _experiments: {
      profileSampleRate: 0.1,
      replyasSessionsSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    },
    sendDefaultPii: true,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [
      Sentry.mobileReplayIntegration({
        maskAllText: false,
        maskAllImages: true,
        maskAllVectors: false,
      }),
      Sentry.spotlightIntegration(),
      Sentry.feedbackIntegration(),
      navigationIntegration,
    ],
  });
}

export default Sentry.wrap(function RootLayout() {
  useReactQueryDevTools(queryClient);
  useMMKVDevTools({
    storage,
  });
  const router = useRouter();

  const ref = useNavigationContainerRef();

  useEffect(() => {
    navigationIntegration.registerNavigationContainer(ref);
  }, [ref]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
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
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
});

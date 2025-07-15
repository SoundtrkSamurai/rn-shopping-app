import ProductCard from "@/components/ProductCard";
import { ProductShimmerGrid } from "@/components/ProductListShimmer";
import useGetCategories from "@/hooks/api/useGetCategories";
import useGetProducts from "@/hooks/api/useGetProducts";
import { Product } from "@/types/interfaces";
import { COLORS } from "@/utils/colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { products, isLoading, refetchProducts, isRefetchingProducts } =
    useGetProducts();
  const { categories } = useGetCategories();
  const headerHeight = useHeaderHeight();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allCategories = ["all", ...(categories || [])];

  const filteredProducts = useMemo(() => {
    return products?.filter((product: Product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    []
  );

  return (
    <View
      style={[
        styles.container,
        { marginTop: Platform.select({ ios: headerHeight, android: 0 }) },
      ]}
    >
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryButton}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color:
                    selectedCategory === category ? COLORS.primary : "black",
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {isLoading ? (
        <ProductShimmerGrid />
      ) : (
        <FlashList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item: Product) => item.id.toString()}
          estimatedItemSize={200}
          numColumns={2}
          contentContainerStyle={{ padding: 8 }}
          refreshing={isRefetchingProducts}
          onRefresh={refetchProducts}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    padding: 8,
    flexDirection: "row",
    gap: 8,
    zIndex: 1,
    height: 50,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
});

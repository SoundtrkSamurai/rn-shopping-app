import useGetCategories from "@/hooks/api/useGetCategories";
import useGetProducts from "@/hooks/api/useGetProducts";
import { Product } from "@/types/interfaces";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { products } = useGetProducts();

  const { categories } = useGetCategories();

  return (
    <View style={styles.container}>
      <FlashList
        data={products ?? []}
        renderItem={({ item }: { item: Product }) => (
          <View style={{ padding: 20 }}>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item: Product) => item.id?.toString() ?? item.title}
        estimatedItemSize={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

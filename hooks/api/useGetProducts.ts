import { Product } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export default function useGetProducts() {
  const {
    data: products,
    isLoading,
    error,
    refetch: refetchProducts,
    isRefetching: isRefetchingProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return useMemo(
    () => ({
      error,
      isLoading,
      products,
      refetchProducts,
      isRefetchingProducts,
    }),
    [error, isLoading, products, refetchProducts, isRefetchingProducts]
  );
}

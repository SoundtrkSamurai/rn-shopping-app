import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/products/categories`);
  return response.json();
};

export default function useGetCategories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return useMemo(
    () => ({
      categories,
      error,
      isLoading,
    }),
    [categories, error, isLoading]
  );
}

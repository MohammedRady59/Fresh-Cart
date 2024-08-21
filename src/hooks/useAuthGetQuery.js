import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstanse";

function useAuthGetQuery({ queryKey, url }) {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
}

export default useAuthGetQuery;

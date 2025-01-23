import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

interface APIConfig {
  qyeryConfig?: {
    staleTime?: number;
    enabled?: boolean;
  };
}

const useApiQuery = <ResponseType>(
  url: string,
  config?: APIConfig
): UseQueryResult<ResponseType, Error> => {
  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      const res = await axios.get<ResponseType>(url);

      return res.data;
    },
    staleTime: config?.qyeryConfig?.staleTime ?? 1000 * 60 * 5, // 5 mins default stale time
  });
};

export default useApiQuery;

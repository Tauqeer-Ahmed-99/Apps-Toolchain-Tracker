import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useApiQuery from "./useApiQuery";

const useDebouncedApiQuery = <ResponseType>(
  url: string,
  {
    debounceSearchTerm,
    debounceTime,
  }: { debounceSearchTerm: string; debounceTime: number }
) => {
  const [enabled, setEnabled] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (debounceSearchTerm) {
      const timer = setTimeout(() => {
        setEnabled(true);
        queryClient.invalidateQueries({ queryKey: [url] });
      }, debounceTime);

      return () => {
        clearTimeout(timer);
        setEnabled(false);
      };
    }
  }, [debounceSearchTerm]);

  return {
    ...useApiQuery<ResponseType>(url, {
      qyeryConfig: { enabled: enabled },
    }),
    enabled,
  };
};

export default useDebouncedApiQuery;

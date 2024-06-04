import { useQuery } from "@tanstack/react-query";
import { getCurrentAccount } from "@/services/account.services";

/**
 * Custom React hook to fetch and manage the current user data.
 */

export const useCurrentUser = () => {
  const { data: userData, ...rest } = useQuery({
    queryKey: ["current_user", "users"],
    queryFn: () => getCurrentAccount(),
    retry: 1,
  });

  return {
    userData: userData?.data,
    ...rest,
  };
};

import { useQuery } from "@tanstack/react-query";
import { getCurrentAccount } from "@/services/account.services";

interface CurrentUser {
  email: string;
  name: string;
  role: "admin" | "customer";
}

export const useCurrentUser = () => {
  const { data: userData, ...rest } = useQuery<CurrentUser>({
    queryKey: ["current_user", "users"],
    queryFn: async () => {
      const response = await getCurrentAccount();
      return response.data;
    },
    retry: 1,
  });

  return {
    userData,
    ...rest,
  };
};

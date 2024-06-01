// Adjust the import path as necessary

import { getUsers } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

interface IOrder {
  status: string;
}

interface IUser {
  _id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  orders_received: IOrder[];
}

interface CustomersResponse {
  data: IUser[];
  message: string;
  pagination: any;
}

interface EngineersData {
  _id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  completed_projects: number;
  ongoing_projects: number;
}

interface UseEngineersDataResponse {
  engineersData: EngineersData[];
  isGetEngineersDataLoading: boolean;
  isGetEngineersDataFetching: boolean;
  refetchGetEngineers: () => Promise<any>;
}

export const useEngineersData = (
  enabled?: boolean
): UseEngineersDataResponse => {
  const {
    data,
    isLoading: isGetEngineersDataLoading,
    isFetching: isGetEngineersDataFetching,
    refetch: refetchGetEngineers,
  } = useQuery<any>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, message, pagination } = await getUsers(
        undefined,
        "engineer"
      );

      const users = data?.map((user: IUser) => ({
        _id: user._id,
        createdAt: dayjs(user.createdAt).format("MMM DD, YYYY"),
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        completed_projects:
          user.orders_received.filter(
            (order: IOrder) => order.status === "completed"
          ).length ?? 0,
        ongoing_projects:
          user.orders_received.filter(
            (order: IOrder) => order.status === "in_progress"
          ).length ?? 0,
      }));

      return {
        users,
        message,
        pagination,
      };
    },
    enabled: enabled ?? true,
    refetchOnMount: false,
  });

  return {
    engineersData: data?.users || [],
    isGetEngineersDataLoading,
    isGetEngineersDataFetching,
    refetchGetEngineers,
  };
};

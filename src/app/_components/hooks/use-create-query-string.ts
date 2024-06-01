import { useSearchParams } from "next/navigation";

export const useCreateQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value === "") {
      newSearchParams.delete(name);
    } else {
      newSearchParams.set(name, value);
    }

    const newQueryString = newSearchParams.toString();
    return newQueryString;
  };

  return createQueryString;
};

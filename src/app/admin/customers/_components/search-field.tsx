import { createQueryString } from "@/shared/functions";
import { Search } from "@mui/icons-material";
import { Input } from "@mui/joy";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchField = () => {
  const [query, setQuery] = useState<string>("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const router = useRouter();
  const pathname = usePathname();

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    return (...args: any[]) => {
      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => func(...args), delay);
      setTypingTimeout(timeout);
    };
  };

  const fetchResults = async (searchQuery: string) => {
    try {
      const queryString = searchQuery
        ? pathname + "?" + createQueryString("q", searchQuery)
        : pathname;

      router.push(queryString, {
        scroll: false,
      });
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const handleSearch = debounce((searchQuery: string) => {
    fetchResults(searchQuery);
  }, 1000);

  useEffect(() => {
    if (query !== "") {
      handleSearch(query);
    } else {
      handleSearch("");
    }
  }, [query]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (typingTimeout) clearTimeout(typingTimeout);
      fetchResults(query);
    }
  };

  return (
    <>
      <Input
        placeholder="Search for customers with name, email or phone..."
        startDecorator={<Search />}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default SearchField;

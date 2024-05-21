import { createQueryString, debounce } from "@/shared/functions";
import { Search } from "@mui/icons-material";
import { Input } from "@mui/joy";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const SearchField = () => {
  const [term, setTerm] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  const delayedSearch = debounce((searchTerm) => {
    console.log("Searching for:", searchTerm);
  }, 500);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(pathname + "?" + createQueryString("search", term));
  };

  const handleKeyPress = (event: any) => {
    // Check if the key pressed is the Enter key
    if (event.key === "Enter") {
      console.log("Enter key pressed!");
      handleSearch(event);
    }
  };

  return (
    <div onKeyDown={handleKeyPress}>
      <Input
        placeholder="Search for customers with name, email or phone..."
        startDecorator={<Search />}
        onChange={(e) => {
          setTerm(e.target.value);
          delayedSearch(e.target.value);

          //   if (e.target.value === "") {
          //     const query = { ...router.query };

          //     delete query["search"];

          //     router.push(
          //       {
          //         pathname: router.pathname,
          //         query: { ...query },
          //       },
          //       undefined,
          //       {
          //         shallow: true,
          //       }
          //     );
          //   }
        }}
      />
    </div>
  );
};

export default SearchField;

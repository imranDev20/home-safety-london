import React from "react";
import { Link as JoyLink, LinkProps } from "@mui/joy";
import Link from "next/link";

export default function NextLink({
  href,
  children,
  ...props
}: {
  children: React.ReactNode;
  href: string;
} & LinkProps) {
  return (
    <JoyLink {...props} component={Link} href={href}>
      NextLink
    </JoyLink>
  );
}

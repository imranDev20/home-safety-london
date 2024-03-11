"use client";
import { Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import { ParagraphProps } from "@/types/props";

const Paragraph = ({ children, lineHeight, ...props }: ParagraphProps) => {
  const theme = useTheme();

  return (
    <Typography
      level="body-md"
      sx={{
        lineHeight: lineHeight ? lineHeight : 1.8,
        ...props?.sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default Paragraph;

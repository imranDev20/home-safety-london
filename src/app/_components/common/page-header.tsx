"use client";
import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import Image from "next/image";
import { PageHeaderProps } from "@/types/props";

const PageHeader = ({ backgroundImage, title, secondary }: PageHeaderProps) => {
  return (
    <Box component="section" sx={{ position: "relative" }}>
      <Image
        src={backgroundImage}
        alt="Background"
        sizes="100vw"
        fill
        loading="lazy"
        placeholder="blur"
        style={{ objectFit: "cover" }}
      />
      <Box
        sx={{
          height: "100%",
          position: "relative",
          pt: 10,
          pb: 10,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(17, 38, 49, .9)",
          },
        }}
      >
        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "white",
          }}
          component="h1"
          level="h1"
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Breadcrumbs sx={{ position: "relative", zIndex: 1, color: "white" }}>
            <Link
              href="/"
              component={Link}
              underline="hover"
              sx={{
                color: "white",
              }}
            >
              Home
            </Link>

            {secondary ? (
              <Link href={`/${secondary.toLowerCase()}`} component={Link}>
                {secondary}
              </Link>
            ) : null}

            <Typography color="secondary">{title}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
};

export default PageHeader;

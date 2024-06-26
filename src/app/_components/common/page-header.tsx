import { Box, Breadcrumbs, Link as JoyLink, Typography } from "@mui/joy";
import Image from "next/image";
import { PageHeaderProps } from "@/types/props";
import { hexToRgba } from "@/shared/functions";
import Link from "next/link";

const PageHeader = ({
  backgroundImage,
  title,
  secondary,
  tertiary,
}: PageHeaderProps) => {
  return (
    <Box component="section" sx={{ position: "relative", mt: -8.5 }}>
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
          pt: 19.5,
          pb: 10,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: hexToRgba("#062C64", 0.9),
            mixBlendMode: "multiply",
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
            <JoyLink
              href="/"
              component={JoyLink}
              underline="hover"
              sx={{
                color: "white",
              }}
            >
              Home
            </JoyLink>

            {secondary ? (
              <JoyLink
                href={`/${secondary.toLowerCase()}`}
                component={Link}
                sx={{
                  color: "white",
                }}
              >
                {secondary}
              </JoyLink>
            ) : null}

            {tertiary ? (
              <JoyLink
                href={`/${tertiary.toLowerCase()}`}
                component={Link}
                sx={{
                  color: "white",
                }}
              >
                {tertiary}
              </JoyLink>
            ) : null}

            <Typography color="secondary">{title}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
};

export default PageHeader;

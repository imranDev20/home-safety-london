import { customSlugify } from "@/shared/functions";
import {
  Box,
  Card,
  Link as JoyLink,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";
import React from "react";

interface ServiceProps {
  service: {
    id: number;
    serviceName: string;
    serviceDetail: string;
    Icon: any;
  };
}

export default function ServiceCategoryCard({ service }: ServiceProps) {
  const theme = useTheme();
  return (
    <JoyLink
      component={Link}
      href={`/services/${customSlugify(service.serviceName)}`}
      underline="none"
    >
      <Card
        variant="plain"
        sx={{
          p: 4,
          borderRadius: "xl",
          transition: "350ms all ease",
          backgroundColor: "white",
          ":hover": {
            backgroundColor: theme.palette.primary[500],
            ".MuiTypography-root": {
              color: "white",
            },
            ".MuiSvgIcon-root": {
              color: "white",
            },
          },
        }}
      >
        <Stack direction="row" spacing={3}>
          <service.Icon
            sx={{
              fontSize: 70,
            }}
          />
          <Stack>
            <Typography
              level="h3"
              sx={{
                mb: 2,
              }}
            >
              {service.serviceName}
            </Typography>
            <Typography color="neutral">{service.serviceDetail}</Typography>
          </Stack>
        </Stack>
      </Card>
    </JoyLink>
  );
}

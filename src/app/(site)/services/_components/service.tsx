import Image from "next/image";
import { Box, Button, Card, Typography } from "@mui/joy";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import { customSlugify } from "@/shared/functions";

export default function Service({ service }: any) {
  const { description } = service;
  const trimDeccription =
    description.length > 150
      ? `${description.slice(0, 120)}.....`
      : description;
  return (
    <Box sx={{ mb: 2 }}>
      <Image
        src={service.image}
        objectFit="cover"
        alt="serviceImage"
        style={{ width: "100%", height: "100%", borderRadius: 5 }}
      />

      <Card
        variant="outlined"
        sx={{
          mt: -10,
          ml: 5,
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <service.Icon sx={{ fontSize: 50 }} color="primary" />
        <Box sx={{ height: "100%" }}>
          <Typography level="h3" component="h3">
            {service.title}
          </Typography>
          <Typography
            color="neutral"
            sx={{
              my: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {trimDeccription}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href={`/services/${customSlugify(service.parentService)}${
            service.route
          }`}
          endDecorator={<ArrowCircleRightIcon />}
          sx={{
            px: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          Learn More
        </Button>
      </Card>
    </Box>
  );
}

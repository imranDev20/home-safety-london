import React from "react";
import { Button, Card, Typography } from "@mui/joy";

interface ServiceProps {
  service: {
    id: number;
    serviceName: string;
    serviceDetail: string;
    price: string;
  };
}

export default function ServiceCard({ service }: ServiceProps) {
  return (
    <Card variant="soft">
      <Typography level="title-md">{service.serviceName}</Typography>
      <Typography>{service.serviceDetail}</Typography>
      <Typography component="span">from</Typography>
      <Typography>{service.price}</Typography>
      <Button variant="solid">Book Now</Button>
    </Card>
  );
}

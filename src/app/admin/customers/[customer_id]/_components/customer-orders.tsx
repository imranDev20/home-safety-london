import { Button, Sheet, Stack, Typography } from "@mui/joy";
import React from "react";

const CustomerOrders = () => {
  return (
    <>
      <Typography level="h4" mb={2}>
        Orders
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button size="sm" variant="outlined" color="neutral">
          All Orders
        </Button>
        <Button size="sm" variant="outlined" color="neutral">
          Processing
        </Button>
        <Button size="sm" variant="outlined" color="neutral">
          Completed
        </Button>
        <Button size="sm" variant="outlined" color="neutral">
          Cancelled
        </Button>
      </Stack>
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          p: 2,
          mt: 3,
        }}
      >
        Hello
      </Sheet>
    </>
  );
};

export default CustomerOrders;

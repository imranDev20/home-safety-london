import { Box, Card, CardContent, Typography } from "@mui/joy";
import React from "react";

export default function OrderActivity() {
  return (
    <Box mt={3}>
      <Typography
        level="title-lg"
        sx={{
          mb: 1,
        }}
      >
        Activity
      </Typography>
      <Card>
        <CardContent orientation="vertical"></CardContent>
      </Card>
    </Box>
  );
}

import { Box, Grid, Link as JoyLink } from "@mui/joy";
import OrderDetailsHeader from "./_components/order-details-header";
import CustomerDetails from "./_components/customer-details";
import OrderItems from "./_components/order-items";
import OrderNotes from "./_components/order-notes";
import OrderActivity from "./_components/order-activity";

export default function SingleOrderPage() {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "sm",
        flexShrink: 1,
        overflowY: "auto",
        overflowX: "hidden",
        minHeight: `calc(100vh - 35px)`,
        height: `calc(100vh - 35px)`,
      }}
    >
      <OrderDetailsHeader />

      <Grid
        container
        spacing={2}
        sx={{
          mt: 3,
        }}
      >
        <Grid md={9}>
          <OrderItems />
        </Grid>
        <Grid md={3}>
          <OrderNotes />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={3}>
        <Grid md={3}>
          <CustomerDetails />
        </Grid>
        <Grid md={3}>
          <OrderActivity />
        </Grid>
      </Grid>
    </Box>
  );
}

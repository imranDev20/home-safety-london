import { Box, Grid, Link as JoyLink } from "@mui/joy";
import OrderDetailsHeader from "./_components/order-details-header";
import CustomerDetails from "./_components/customer-details";
import OrderItems from "./_components/order-items";
import OrderNotes from "./_components/order-notes";
import OrderActivity from "./_components/order-activity";
import PropertyDetails from "./_components/property-details";
import AssignedAndTimeInfo from "./_components/assigned-and-time-info";

export default function SingleOrderPage() {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "sm",
        flexShrink: 1,
        overflowY: "auto",
        minHeight: `calc(100vh - 35px)`,
        height: `calc(100vh - 35px)`,
        pr: 2,
      }}
    >
      <Box>
        <OrderDetailsHeader />

        <AssignedAndTimeInfo />

        <Grid
          container
          spacing={3}
          sx={{
            mt: 3,
          }}
        >
          <Grid md={9}>
            <OrderItems />
            {/* <OrderItems /> */}
          </Grid>
          <Grid md={3}>
            <OrderNotes />
            <PropertyDetails />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3}>
          <Grid md={4}>
            <CustomerDetails />
          </Grid>

          <Grid md={8}>
            <OrderActivity />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

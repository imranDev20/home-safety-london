import { Box, Card, Typography } from "@mui/joy";

export default function RecentActivities() {
  return (
    <Box mt={4}>
      <Typography level="h4" mb={2}>
        Recent Activities
      </Typography>
      <Card>
        <Box>
          <Typography level="body-sm">User ID</Typography>
          <Typography level="title-md">Hello</Typography>
        </Box>

        <Box>
          <Typography level="body-sm">Name</Typography>
          <Typography level="title-md">Darkness</Typography>
        </Box>
      </Card>
    </Box>
  );
}

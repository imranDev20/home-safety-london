"use client";
import { ORDER_STATUS } from "@/shared/constants";
import { snakeCaseToNormalText } from "@/shared/functions";
import {
  AspectRatio,
  BookmarkAdd,
  Download,
  Edit,
  EditNote,
  Home,
  KeyboardArrowRight,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Link as JoyLink,
  List,
  ListItem,
  ListItemContent,
  Option,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";

export default function SingleOrderPage() {
  const theme = useTheme();

  return (
    <>
      <Breadcrumbs
        sx={{
          px: 0,
          fontSize: 13,
        }}
        separator={<KeyboardArrowRight />}
      >
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          <Home />
        </JoyLink>
        <JoyLink
          component={Link}
          color="neutral"
          href="/admin/orders"
          sx={{
            textDecoration: "none",
          }}
        >
          Orders
        </JoyLink>

        <Typography
          color="primary"
          sx={{
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 13,
          }}
        >
          INV-1215
        </Typography>
      </Breadcrumbs>

      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <Typography component="h1" level="h2">
          INV-1215
        </Typography>

        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Select
            size="sm"
            defaultValue="pending"
            placeholder="Order status: loading..."
            renderValue={(option) => (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: 14,
                }}
              >
                Status:{" "}
                <Typography
                  component="span"
                  sx={{
                    color: ORDER_STATUS.find(
                      (status) => status.value === option?.value
                    )?.color,
                    fontWeight: 500,
                  }}
                >
                  {snakeCaseToNormalText(option?.value as string)}
                </Typography>
              </Typography>
            )}
          >
            {ORDER_STATUS.map((status) => (
              <Option
                value={status.value}
                key={status.id}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {snakeCaseToNormalText(status.value)}
              </Option>
            ))}
          </Select> */}
          <Button size="sm" startDecorator={<Download />}>
            Download Invoice
          </Button>

          <IconButton variant="outlined">
            <MoreHoriz />
          </IconButton>
        </Stack>
      </Stack>

      <Grid
        container
        spacing={2}
        sx={{
          mt: 3,
        }}
      >
        <Grid md={8}>
          <Typography
            level="title-md"
            sx={{
              mb: 1,
            }}
          >
            Order Items
          </Typography>
          <Card>
            <CardContent orientation="horizontal"></CardContent>
          </Card>
        </Grid>
        <Grid md={4}>
          <Card>
            <Typography
              level="title-md"
              sx={{
                mb: 1,
              }}
            >
              Customer Information
            </Typography>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
            >
              <EditNote />
            </IconButton>
            <Divider />
            <CardContent orientation="horizontal">
              <List>
                <ListItem
                  sx={{
                    mb: 0.5,
                    px: 0,
                  }}
                >
                  <ListItemContent>
                    <Typography level="body-sm" noWrap>
                      Name
                    </Typography>
                    <Typography level="title-sm">Salam Maiah</Typography>
                  </ListItemContent>
                </ListItem>

                <ListItem
                  sx={{
                    mb: 0.5,
                    px: 0,
                  }}
                >
                  <ListItemContent>
                    <Typography level="body-sm" noWrap>
                      Email
                    </Typography>
                    <Typography level="title-sm">salam@gmail.com</Typography>
                  </ListItemContent>
                </ListItem>

                <ListItem
                  sx={{
                    mb: 0.5,
                    px: 0,
                  }}
                >
                  <ListItemContent>
                    <Typography level="body-sm" noWrap>
                      Shipping Address
                    </Typography>
                    <Typography level="title-sm">
                      1600 Amphiteatre Parkway, CA, USA
                    </Typography>
                  </ListItemContent>
                </ListItem>

                <ListItem
                  sx={{
                    mb: 0.5,
                    px: 0,
                  }}
                >
                  <ListItemContent>
                    <Typography level="body-sm" noWrap>
                      Billing address
                    </Typography>
                    <Typography level="title-sm">
                      Same as shipping address
                    </Typography>
                  </ListItemContent>
                </ListItem>

                <ListItem
                  sx={{
                    px: 0,
                  }}
                >
                  <ListItemContent>
                    <Typography level="body-sm" noWrap>
                      Payment
                    </Typography>
                    <Typography level="title-sm">Cash on Delivery</Typography>
                  </ListItemContent>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

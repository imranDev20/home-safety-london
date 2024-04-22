"use client";
import { Home, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  Input,
  Link as JoyLink,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Teams from "./_components/teams";

const Team = () => {
  const theme = useTheme();

  return (
    <>
      <Breadcrumbs
        sx={{
          px: 0,
          fontSize: 13,
        }}
        separator={<KeyboardArrowRight fontSize="md" />}
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
          href="/admin/team"
          sx={{
            textDecoration: "none",
          }}
        >
          Team
        </JoyLink>
      </Breadcrumbs>

      <Typography component="h1" level="h2">
        Team
      </Typography>

      <Stack
        sx={{
          my: 3,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: "center",
          }}
        >
          <Grid xs={12} sm={6} md={5}>
            <Box>
              <FormControl size="sm">
                <Input
                  fullWidth
                  placeholder="Search for name or designation"
                  startDecorator={<SearchIcon />}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid
            xs={12}
            sm={5}
            md={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", sm: "end" },
            }}
          >
            <Box>
              <Button variant="solid" fullWidth startDecorator={<AddIcon />}>
                Add New Member
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      {/* import team page component */}
      <Teams />
    </>
  );
};

export default Team;

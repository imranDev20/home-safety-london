import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import {
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  useTheme,
} from "@mui/joy";
import Image from "next/image";
import engineer from "../../../../images/engineer-note.jpg";

export default function Team({ team }: any) {
  const theme = useTheme();
  return (
    <>
      <Card variant="outlined">
        <CardOverflow>
          <AspectRatio maxHeight={140}>
            <Image src={engineer} alt="cardImage" loading="lazy" />
          </AspectRatio>
          <Box
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mt: -7,
              zIndex: 20,
              border: 3,
              borderColor: theme.palette.primary[100],
              borderRadius: "50%",
            }}
          >
            <Image
              src={engineer}
              alt="profileImage"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                objectFit: "cover",
              }}
            />
          </Box>
        </CardOverflow>

        <CardContent sx={{ textAlign: "center" }}>
          <Typography level="title-md">{team.teamMember}</Typography>
          <Typography level="body-sm">{team.degination}</Typography>

          <Stack
            spacing={3}
            direction="row"
            sx={{ display: "flex", justifyContent: "center", my: 3 }}
          >
            <Box>
              <Typography component="h5" color="primary">
                {team.project}
              </Typography>
              <Typography color="neutral">Project </Typography>
            </Box>
            <Divider orientation="vertical"></Divider>
            <Box>
              <Typography component="h5" color="primary">
                {team.task}
              </Typography>
              <Typography color="neutral">Task </Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardOverflow>
          <CardActions buttonFlex="1">
            <ButtonGroup
              variant="outlined"
              sx={{ bgcolor: "background.surface" }}
            >
              <Button variant="solid" color="primary">
                View Profile
              </Button>
              <Button>Message</Button>
            </ButtonGroup>
          </CardActions>
        </CardOverflow>
      </Card>
    </>
  );
}

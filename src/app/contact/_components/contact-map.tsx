import { Box } from "@mui/joy";
import React from "react";

export default function ContactMap() {
  return (
    <>
      <Box sx={{}}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
          style={{
            width: "100%",
            height: "500px",
            border: 0,
            overflow: "hidden",
          }}
        ></iframe>
      </Box>
    </>
  );
}

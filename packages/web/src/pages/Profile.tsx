import React from "react";
import { Container } from "@mui/material";
import ProfileEditor from "../components/ProfileEditor";

export default function Profile() {
  return (
    <Container maxWidth="md">
      <ProfileEditor />
    </Container>
  );
}

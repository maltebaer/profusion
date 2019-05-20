import React from "react";
import { Button, Container, Header } from "semantic-ui-react";
import PanelCRUD from "../PanelCRUD";

import apiAuth from "../../api/auth";

export default function Admin() {
  return (
    <Container>
      <Header as="h2">Adminbereich</Header>
      <Button
        floated="right"
        basic
        as="a"
        href="/login"
        content="Logout"
        onClick={() => apiAuth.logout()}
      />
      <PanelCRUD catalog="protests" />
    </Container>
  );
}

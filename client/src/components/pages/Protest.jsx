import React from "react";
import { Container, Header } from "semantic-ui-react";
import PanelProtest from "../PanelProtest";

export default function Protest() {
  return (
    <div>
      <Container>
        <Header as="h2" content="Protest" />
        <PanelProtest catalog="protests" />
      </Container>
    </div>
  );
}

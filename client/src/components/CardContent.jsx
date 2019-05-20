import React from "react";
import { Divider, Grid, Icon, List, Header, Segment } from "semantic-ui-react";

export default function CardContent({ data }) {
  return (
    <div>
      <Header size="medium">{data.name}</Header>
      <Grid columns={3}>
        <Grid.Column>
          <Icon name="chart bar outline" />
          {data.level}
        </Grid.Column>
        <Grid.Column>
          <Icon name="calendar alternate outline" />
          {data.time}
        </Grid.Column>
        <Grid.Column>
          <Icon name="clock outline" />
          {data.time_investment}
        </Grid.Column>
      </Grid>
      <Divider />
      <Segment basic>
        <p>{data.description}</p>

        <List>
          <List.Item>
            <List.Icon name="user outline" />
            <List.Content>{data.nof_people}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="euro sign" />
            <List.Content>{data.material_costs}</List.Content>
          </List.Item>
        </List>
      </Segment>
    </div>
  );
}

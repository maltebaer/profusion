import React from "react";
import { List, Segment } from "semantic-ui-react";

export default function PanelList({ data, onSelect }) {
  return (
    <Segment>
      <List>
        {data.map(item => (
          <List.Item key={item._id} as="a" onClick={() => onSelect(item._id)}>
            <List.Icon name={item.reported && "exclamation"} color="red" />
            <List.Content>{item.name}</List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
}

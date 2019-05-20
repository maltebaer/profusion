import React from "react";
import { Form, Grid } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";

import { getSelectOptions } from "../helpers";

// * --- D A T A  F I E L D S ---
// * name
// * description
// * time
// * time_investment
// * level
// * nof_people
// * material_costs
// * rating
// * reported

export default function FormProtest({ data, onDataChange }) {
  const levelOptions = getSelectOptions(["einfach", "normal", "schwierig"]);
  const timeOptions = getSelectOptions(["davor", "während", "danach"]);

  return (
    <div>
      <Form>
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <Form.Input
                label="Name"
                placeholder="Name der Protestaktion"
                onChange={(e, { value }) => onDataChange({ ...data, name: value })}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <Form>
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <Form.Select
                label="Schwierigkeitsgrad"
                options={levelOptions}
                placeholder="Schwierigkeitsgrad"
                onChange={(e, { value }) => onDataChange({ ...data, level: value })}
              />
              <Form.Select
                label="Zeitpunkt"
                options={timeOptions}
                placeholder="Zeitpunkt"
                onChange={(e, { value }) => onDataChange({ ...data, time: value })}
              />
              <Form.Input
                label="Zeitaufwand"
                placeholder="Drei Stunden, halber Tag, ..."
                onChange={(e, { value }) => onDataChange({ ...data, time_investment: value })}
              />
              <div />
            </Grid.Column>
            <Grid.Column mobile={16} computer={12}>
              <Form.Field
                control={TextareaAutosize}
                minRows={9}
                label="Beschreibung"
                placeholder="Anmerkungen, Besonderheiten, Details..."
                onChange={e => onDataChange({ ...data, description: e.target.value })}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <Form>
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <Form.Input
                label="Benötige Personen"
                placeholder="3, 300, irrelevant, ..."
                onChange={(e, { value }) => onDataChange({ ...data, nof_people: value })}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Materialkosten"
                placeholder="3€, 300€, keine, ..."
                onChange={(e, { value }) => onDataChange({ ...data, material_costs: value })}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Button, Card, Grid, Input } from "semantic-ui-react";
import List from "./ProtestList";
import ModalCRUD from "./ModalCRUD";
import CardContent from "./CardContent";
import FormProtest from "./FormProtest";
import ReportProtest from "./ReportProtest";

import { sortItems, nofValues } from "../helpers";
import apiREST from "../api/rest";

export default function PanelProtest({ catalog }) {
  // --------------- # # # ---------------
  // --- S T A T E S ---
  // --------------- # # # ---------------

  // --- R E A D ---
  const [data, setData] = useState(null);
  console.log("TCL: PanelProtest -> data", data);
  const [currentId, setCurrentId] = useState(null);
  const [newDataAvailable, setNewDataAvailable] = useState(false);

  const [searchTerm, setSearchTerm] = useState(null);
  const [nofFields, setNofFields] = useState(null);

  // --- C R E A T E  /  U P D A T E ---
  const [singleData, setSingleData] = useState(null);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  // --------------- # # # ---------------
  // --- M E T H O D S ---
  // --------------- # # # ---------------

  // --- R E A D ---
  useEffect(() => {
    if (newDataAvailable) {
      setNewDataAvailable(false);
    }
    apiREST
      .get(catalog)
      .then(items => {
        let filteredItems = items;
        if (searchTerm) {
          filteredItems = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filteredItems.length === 0) {
            filteredItems = [{ _id: 0, name: "Deine Suche ergab keine Treffer" }];
          }
        }
        setData(sortItems(filteredItems, "name"));
      })
      .catch(err => console.log(err));
  }, [newDataAvailable, searchTerm]);

  useEffect(() => {
    if (singleData) {
      setNofFields(nofValues(singleData));
    }
  });

  // --- C R E A T E ---
  const handlePost = () => {
    apiREST
      .post(catalog, singleData)
      .then(() => {
        setNewDataAvailable(true);
        setSingleData(null);
        setShowCreate(false);
      })
      .catch(err => {
        console.log(err);
        setError(err);
        setTimeout(() => setError(null), 2000);
      });
  };
  const handleCreateOpen = () => {
    setSingleData(null);
    setShowCreate(true);
  };
  const handleCreateClose = () => {
    setSingleData(null);
    setShowCreate(false);
  };

  // --- U P D A T E ---
  const handlePut = () => {
    apiREST
      .put(catalog, singleData._id, singleData)
      .then(() => {
        setShowUpdate(false);
        setNewDataAvailable(true);
        setSingleData(null);
      })
      .catch(err => {
        console.log(err);
        setError(err);
        setTimeout(() => setError(null), 2000);
      });
  };
  const handleUpdateOpen = () => {
    setSingleData(data.filter(items => items._id === currentId)[0]);
    setShowUpdate(true);
  };
  const handleUpdateClose = () => {
    setSingleData(null);
    setShowUpdate(false);
  };

  // --------------- # # # ---------------
  // --- D I S P L A Y ---
  // --------------- # # # ---------------
  const demoData = {
    name: "Name der Protestaktion",
    description: (
      <p>
        Aussagekräftige Beschreibung, die deine Aktion erklärt. Hier ist Platz für alle
        Informationen, die nicht gesondert abgefragt werden.
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus blandit vehicula.
        Praesent cursus nibh sit amet mauris semper finibus. Sed sit amet lacus ut mi sagittis
        consectetur eget gravida elit. Duis finibus fermentum mi sit amet condimentum. Morbi porta
        odio ac erat vulputate dignissim. Maecenas commodo sit amet neque et posuere. Quisque eu
        mauris pretium neque finibus venenatis. Nunc non hendrerit libero. Maecenas pretium ex a
        vehicula auctor.
      </p>
    ),
    level: "Schwierigkeitsgrad",
    time: "Zeitraum",
    time_investment: "Zeitaufwand",
    nof_people: "Anzahl benötiger Personen",
    material_costs: "Materialkosten, bitte begründen"
  };

  const actions = (
    <Grid>
      <Grid.Column mobile={8} computer={12}>
        <Button fluid basic content="Bewerten" />
      </Grid.Column>
      <Grid.Column mobile={8} computer={4}>
        <Button
          fluid
          basic
          icon="exclamation"
          content="Melden"
          color="red"
          onClick={() => handleUpdateOpen()}
        />
      </Grid.Column>
    </Grid>
  );

  return (
    data && (
      <div>
        <Grid columns={2} stackable>
          <Grid.Column width={4}>
            <Button fluid basic icon="add" content="Erstellen" onClick={() => handleCreateOpen()} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Input
              fluid
              placeholder="Suchen"
              value={searchTerm && searchTerm}
              onChange={(e, { value }) => setSearchTerm(value)}
              icon={{ name: "filter" }}
            />
          </Grid.Column>
        </Grid>
        {/* <Grid>
          <Grid.Column only="mobile">
            <Button.Group basic fluid>
              <Button content="Listenansicht" />
              <Button content="Details" />
            </Button.Group>
          </Grid.Column>
        </Grid> */}
        <Grid columns={2} divided>
          <Grid.Column mobile={16} tablet={6} computer={6}>
            <List data={data} onSelect={setCurrentId} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={10}>
            {currentId ? (
              <Card
                fluid
                description={
                  <CardContent data={data.filter(items => items._id === currentId)[0]} />
                }
                extra={actions}
              />
            ) : (
              <Card fluid description={<CardContent data={demoData} />} />
            )}
          </Grid.Column>
        </Grid>

        {showCreate && (
          <ModalCRUD
            error={error}
            nofFields={nofFields}
            show={showCreate}
            title="Neuen Protest eintragen"
            size="large"
            content={<FormProtest data={singleData} onDataChange={setSingleData} />}
            onClose={handleCreateClose}
            onCreate={handlePost}
          />
        )}
        {showUpdate && (
          <ModalCRUD
            error={error}
            show={showUpdate}
            title="Protest melden"
            size="tiny"
            content={<ReportProtest data={singleData} onDataChange={setSingleData} />}
            onClose={handleUpdateClose}
            onUpdate={handlePut}
          />
        )}
      </div>
    )
  );
}

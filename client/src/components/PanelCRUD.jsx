import React, { useState, useEffect } from "react";
import { Button, Card, Grid, Input } from "semantic-ui-react";
import List from "./PanelList";
import ModalCRUD from "./ModalCRUD";
import CardContent from "./CardContent";
import DereportProtest from "./DereportProtest";

import { sortItems } from "../helpers";
import apiREST from "../api/rest";

export default function ProtestCRUD({ catalog }) {
  // --------------- # # # ---------------
  // --- S T A T E S ---
  // --------------- # # # ---------------

  // --- R E A D ---
  const [data, setData] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [newDataAvailable, setNewDataAvailable] = useState(false);

  const [searchTerm, setSearchTerm] = useState(null);

  // --- U P D A T E  /  D E L E T E ---
  const [singleData, setSingleData] = useState(null);
  const [error, setError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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
          filteredItems = items.filter(item => item.name.includes(searchTerm));
        }
        setData(sortItems(filteredItems, "name"));
      })
      .catch(err => console.log(err));
  }, [newDataAvailable, searchTerm]);

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

  // --- D E L E T E ---
  const handleDelete = () => {
    apiREST
      .delete(catalog, singleData._id)
      .then(() => {
        setNewDataAvailable(true);
        setSingleData(null);
        setCurrentId(null);
        setShowDelete(false);
      })
      .catch(err => console.log(err));
  };
  const handleDeleteOpen = () => {
    setSingleData(data.filter(items => items._id === currentId)[0]);
    setShowDelete(true);
  };
  const handleDeleteClose = () => {
    setSingleData(null);
    setShowDelete(false);
  };

  // --------------- # # # ---------------
  // --- D I S P L A Y ---
  // --------------- # # # ---------------
  const actions = (
    <Grid>
      <Grid.Column width={8}>
        <Button
          color="red"
          fluid
          basic
          icon="delete"
          content="Löschen"
          onClick={() => handleDeleteOpen()}
        />
      </Grid.Column>
      <Grid.Column width={8}>
        <Button
          fluid
          basic
          icon="exclamation"
          content="Meldung wiederufen"
          onClick={() => handleUpdateOpen()}
        />
      </Grid.Column>
    </Grid>
  );

  return (
    data && (
      <div>
        <Grid>
          <Grid.Column>
            <Input
              fluid
              placeholder="Suchen"
              value={searchTerm && searchTerm}
              onChange={(e, { value }) => setSearchTerm(value)}
              icon={{ name: "filter" }}
            />
          </Grid.Column>
        </Grid>

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
              <Card
                fluid
                description={
                  <p>
                    Hier kannst du gemeldete Protestaktionen überprüfen und ggfs. löschen.
                    <br />
                    <br />
                    Die gemeldeten Beiträge sind links in der Liste markiert.
                    <br />
                    Achtung: der Löschvorgang kann nicht rückgängig gemacht werden.
                  </p>
                }
              />
            )}
          </Grid.Column>
        </Grid>

        {showUpdate && (
          <ModalCRUD
            error={error}
            show={showUpdate}
            title="Protest melden"
            size="tiny"
            content={<DereportProtest data={singleData} onDataChange={setSingleData} />}
            onClose={handleUpdateClose}
            onUpdate={handlePut}
          />
        )}

        {showDelete && (
          <ModalCRUD
            error={error}
            show={showDelete}
            title="Löschen"
            size="mini"
            content={`Soll der Eintrag ${singleData.name} wirklich gelöscht werden?`}
            onClose={handleDeleteClose}
            onDelete={handleDelete}
          />
        )}
      </div>
    )
  );
}

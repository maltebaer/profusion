import React, { useState } from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";

import apiAuth from "../../api/auth.js";

export default function Login({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    apiAuth
      .login(username, password)
      .then(res => {
        console.log("LOGGED IN");
        history.push("/admin");
      })
      .catch(err => {
        setMessage(err.toString());
        setTimeout(() => setMessage(null), 2000);
      });
  };

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Header as="h2" content="Login" />

        <Segment>
          <Form size="large" error onSubmit={handleSubmit}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Benutzername"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Passwort"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button color="blue" fluid size="large" type="submit">
              Login
            </Button>
          </Form>
        </Segment>
        {message && <Message error content={message} />}
      </Grid.Column>
    </Grid>
  );
}

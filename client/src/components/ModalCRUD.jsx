import React from "react";
import { Button, Modal, Message } from "semantic-ui-react";

import { displayError } from "../helpers";

export default function ModalCRUD({
  error,
  nofFields,
  show,
  size,
  title,
  content,
  onClose,
  onUpdate,
  onCreate,
  onDelete,
  onPublish
}) {
  return (
    <Modal open={show} size={size}>
      <Modal.Header>{title}</Modal.Header>
      {/* <Modal.Content scrolling> */}
      <Modal.Content>
        {content}
        {error && <Message error>{displayError(error)}</Message>}
      </Modal.Content>
      <Modal.Actions>
        {onUpdate && (
          <Button basic icon="exclamation" content="Melden" onClick={() => onUpdate()} />
        )}
        {onCreate && (
          <Button
            disabled={nofFields !== 7}
            basic
            icon="add"
            content="Erstellen"
            onClick={() => onCreate()}
          />
        )}
        {onDelete && (
          <Button
            basic
            icon="trash alternate outline"
            content="Löschen"
            onClick={() => onDelete()}
          />
        )}
        {onPublish && (
          <Button
            basic
            icon="share alternate"
            content="Veröffentlichen"
            onClick={() => onPublish()}
          />
        )}
        <Button basic icon="cancel" content="Abbrechen" onClick={() => onClose()} />
      </Modal.Actions>
    </Modal>
  );
}

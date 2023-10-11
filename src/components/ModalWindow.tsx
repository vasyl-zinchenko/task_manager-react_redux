import React, {
  useState,
  useEffect,
  MouseEventHandler,
  useCallback,
} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DarkTheme } from "../types/enums";

interface Props {
  show: boolean;
  handleClose: () => void;
  setNewTitle: (newValue: string) => void;
  setNewContent: (newValue: string) => void;
  newTitle: string;
  newContent: string;
  saveTask: () => void;
  action: string;
}

export const ModalWindow: React.FC<Props> = ({
  show,
  handleClose,
  newTitle,
  newContent,
  setNewTitle,
  setNewContent,
  saveTask,
  action,
}) => {
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (show) {
      setValidated(false);
    }
  }, [show]);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);

      if (!newTitle || !newContent) {
        return;
      }

      saveTask();
      setTimeout(() => {
        setNewTitle("");
        setNewContent("");
        setValidated(false);
      }, 100);
    },
    [newContent, newTitle, saveTask, setNewContent, setNewTitle]
  );

  return (
    <>
      <Modal show={show} onHide={handleClose} data-bs-theme='dark'>
        <Modal.Header closeButton style={{ ...DarkTheme, border: "none" }}>
          <Modal.Title>{action === "add" ? "Add" : "Edit"} task</Modal.Title>
        </Modal.Header>

        <Modal.Body style={DarkTheme}>
          <Form noValidate validated={validated}>
            <Form.Group
              controlId='validationCustom01'
              className='mb-3'
              style={DarkTheme}
            >
              <Form.Label>Title</Form.Label>

              <Form.Control
                required
                type='text'
                autoFocus
                value={newTitle}
                onChange={(event) =>
                  setNewTitle(event.target.value.replace(/^(\s)*/g, ""))
                }
              />

              <Form.Control.Feedback type='invalid'>
                Please enter a title.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='validationCustom01' className='mb-3'>
              <Form.Label>Description</Form.Label>

              <Form.Control
                required
                as='textarea'
                rows={3}
                value={newContent}
                onChange={(event) =>
                  setNewContent(event.target.value.replace(/^(\s)*/g, ""))
                }
              />

              <Form.Control.Feedback type='invalid'>
                Please enter a description.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#202124", border: "none" }}>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
					
          <Button variant='success' onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

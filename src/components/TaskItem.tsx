import React, { useCallback, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { actions as taskActions } from "../features/tasks";
import {
  Trash,
  PencilSquare,
  Square,
  Check2Square,
} from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ModalWindow } from "./ModalWindow";
import { Task } from "../types/models";
import { Colors, checkedStyle } from "../types/enums";

interface Props {
  task: Task;
}

export const TaskItem: React.FC<Props> = ({ task }) => {
  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newContent, setNewContent] = useState(task.content);

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = useCallback(() => {
    setShow(true);
    setNewTitle(task.title);
    setNewContent(task.content);
  }, [task.content, task.title]);

  const removeTask = useCallback(
    (id: number) => {
      dispatch(taskActions.remove(id));
    },
    [dispatch]
  );

  const updateStatus = useCallback(() => {
    const updates = { ...task, status: !task.status };
    dispatch(taskActions.updateTask(task.id, updates));
  }, [dispatch, task]);

  const saveTask = useCallback(() => {
    const updates = {
      title: newTitle,
      content: newContent,
      status: task.status,
    };
    dispatch(taskActions.updateTask(task.id, updates));
    handleClose();
  }, [dispatch, newContent, newTitle, task.id, task.status]);

  return (
    <>
      <ModalWindow
        show={show}
        newTitle={newTitle}
        newContent={newContent}
        setNewTitle={setNewTitle}
        setNewContent={setNewContent}
        handleClose={handleClose}
        saveTask={saveTask}
        action='edit'
      />

      <Container style={{ border: "none" }}>
        <Container
          style={{
            borderBottom: Colors.BORDER,
          }}
        >
          <Row className='py-3'>
            <Col>
              <Form>
                {!task.status ? (
                  <Square
                    onClick={updateStatus}
                    style={{ marginLeft: "1.5px" }}
                  />
                ) : (
                  <Check2Square
                    onClick={updateStatus}
                    size={20}
                    style={{ fill: Colors.CHECKED_COLOR }}
                  />
                )}
              </Form>
            </Col>

            <Col xs={8}>
              <Card.Body className='p-0' style={{ width: "fit-content" }}>
                <Card.Title style={task.status ? checkedStyle : {}}>
                  {task.title}
                </Card.Title>
                <Card.Text style={task.status ? checkedStyle : {}}>
                  {task.content}
                </Card.Text>
              </Card.Body>
            </Col>

            <Col className='text-end'>
              <Container className='d-flex p-0'>
                <Container className='p-0'>
                  <PencilSquare className='edit' onClick={handleShow} />
                </Container>

                <Container className='p-0'>
                  <Trash
                    onClick={() => removeTask(task.id)}
                    color='royalblue'
                    className='trash'
                  />
                </Container>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

import { useCallback, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import Container from "react-bootstrap/esm/Container";
import { TaskItem } from "./TaskItem";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { actions as taskActions } from "../features/tasks";
import { TaskFilter } from "./TaskFilter";
import { ModalWindow } from "./ModalWindow";
import { Colors, DarkTheme, SortType } from "../types/enums";
import { Task } from "../types/models";

export function TaskList() {
  const tasks = useAppSelector((state) => state.tasks);
  const filter = useAppSelector((state) => state.filter.status);
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [show, setShow] = useState(false);

  const lastId = useMemo(() => {
    return tasks.length !== 0
      ? Math.max(...tasks.map((task: Task) => task.id))
      : 0;
  }, [tasks]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      switch (filter) {
        case SortType.ACTIVE:
          return !task.status;

        case SortType.COMPLETED:
          return task.status;

        default:
          return tasks;
      }
    });
  }, [filter, tasks]);

  const addTask = useCallback(() => {
    const newTask = {
      id: lastId + 1,
      title: newTitle,
      content: newContent,
      status: false,
    };

    dispatch(taskActions.add(newTask));

    handleClose();
  }, [dispatch, lastId, newContent, newTitle]);

  return (
    <>
      <ModalWindow
        show={show}
        newTitle={newTitle}
        newContent={newContent}
        setNewTitle={setNewTitle}
        setNewContent={setNewContent}
        handleClose={handleClose}
        saveTask={addTask}
        action='add'
      />

      <Container className='my-auto' style={{ maxWidth: "550px" }}>
        <Card.Header className='d-flex justify-content-between align-items-center'>
          <h1>TODO APP</h1>

          <Button onClick={handleShow} variant='primary'>
            ADD
          </Button>
        </Card.Header>

        <TaskFilter />

        {filteredTasks.length > 0 && (
          <Card className='mt-4' style={{ border: "none", background: "none" }}>
            <ListGroup
              variant='flush'
              className='py-3'
              style={{
                boxShadow: Colors.BOX_SHADOW,
              }}
            >
              {filteredTasks.map((task) => (
                <ListGroup.Item
                  key={task.id}
                  className='p-0'
                  style={{
                    borderRadius: "0",
                    ...DarkTheme,
                    border: "none",
                  }}
                >
                  <TaskItem task={task} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}
      </Container>
    </>
  );
}

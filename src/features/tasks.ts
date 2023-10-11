import { Task } from "../types/models";

type AddAction = { type: "tasks/ADD"; payload: Task };
type RemoveAction = { type: "tasks/Remove"; payload: number };
type UpdateAction = {
  type: "tasks/UpdateAction";
  payload: {
    id: number;
    updates: Partial<Omit<Task, "id">>;
  };
};

type Action = AddAction | RemoveAction | UpdateAction;

const add = (task: Task): AddAction => ({ type: "tasks/ADD", payload: task });

const remove = (id: number): RemoveAction => ({
  type: "tasks/Remove",
  payload: id,
});

const updateTask = (
  id: number,
  updates: { [key in keyof Omit<Task, "id">]: string | boolean }
) => ({
  type: "tasks/UpdateAction",
  payload: { id, updates },
});

export const actions = { add, remove, updateTask };

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Wake up",
    content: "Wake up at 7 in the morning, make coffee and go for a walk",
    status: true,
  },
  {
    id: 2,
    title: "Buy food",
    content: "After work, go to the store and buy some food",
    status: false,
  },
];

const tasksReducer = (tasks = initialTasks, action: Action) => {
  switch (action.type) {
    case "tasks/ADD":
      return [...tasks, action.payload];

    case "tasks/Remove":
      return tasks.filter((task) => task.id !== action.payload);

    case "tasks/UpdateAction":
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, ...action.payload.updates };
        } else {
          return task;
        }
      });

    default:
      return tasks;
  }
};

export default tasksReducer;

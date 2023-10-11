import { combineReducers, createStore } from "redux";
import tasksReducer from "../features/tasks";
import filterReducer from '../features/filter';

const reducer = combineReducers({
  tasks: tasksReducer,
  filter: filterReducer,
});
const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;

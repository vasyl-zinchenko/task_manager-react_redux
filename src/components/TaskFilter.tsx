import { useDispatch } from "react-redux";
import { actions as filterActions } from "../features/filter";
import { useAppSelector } from "../app/hooks";
import Form from "react-bootstrap/Form";
import { SortType } from "../types/enums";
import { useCallback } from "react";

export const TaskFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useAppSelector((state) => state.filter.status);

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSortType = event.target.value as SortType;
      const dispatchAction = (type: SortType) => {
        dispatch(filterActions.setFilter(type));
      };

      switch (newSortType) {
        case SortType.ACTIVE:
          dispatchAction(SortType.ACTIVE);
          break;

        case SortType.COMPLETED:
          dispatchAction(SortType.COMPLETED);
          break;

        default:
          dispatchAction(SortType.ALL);
          break;
      }
    },
    [dispatch]
  );

  return (
    <Form.Select
      className='w-1 mt-3 mb-4'
      data-bs-theme='dark'
      value={filter}
      onChange={handleSelect}
    >
      <option value={SortType.ALL}>All</option>

      <option value={SortType.ACTIVE}>Active</option>

      <option value={SortType.COMPLETED}>Completed</option>
    </Form.Select>
  );
};

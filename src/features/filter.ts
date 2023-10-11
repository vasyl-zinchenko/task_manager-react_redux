import { SortType } from '../types/enums';

type SetVisibilityFilter = { type: "filter/SORTTYPE"; payload: SortType };

type Action = SetVisibilityFilter;
type State = { status: SortType };

const setFilter = (payload: SortType): SetVisibilityFilter => ({
  type: "filter/SORTTYPE",
  payload,
});

const initialState: State = {
  status: SortType.ALL,
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "filter/SORTTYPE":
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const actions = {
  setFilter,
};

export default filterReducer;

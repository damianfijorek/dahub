import { Reducer } from "redux";
import { Actions, ActionTypes } from "./actions";
import AppState from "./state";

const initialState: AppState = {
  pagerState: { page: 1, pageSize: 10 },
};

export const appReducer: Reducer<AppState, Actions> = (state = initialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionTypes.UsersPageChanged:
      return { ...state, pagerState: { ...state.pagerState, page: action.page } };
    case ActionTypes.UsersPageSizeChanged:
      return { ...state, pagerState: { page: 1, pageSize: action.pageSize } };
    default:
      return state;
  }
};

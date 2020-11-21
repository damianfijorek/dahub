import { Action } from "redux";

export enum ActionTypes {
  UsersPageChanged = "UsersPageChanged",
  UsersPageSizeChanged = "UsersPageSizeChanged",
}

export interface UsersPageChanged extends Action<ActionTypes> {
  type: ActionTypes.UsersPageChanged;
  page: number;
}

export const setPage = (page: number): UsersPageChanged => ({
  type: ActionTypes.UsersPageChanged,
  page,
});

export interface UsersPageSizeChanged extends Action<ActionTypes> {
  type: ActionTypes.UsersPageSizeChanged;
  pageSize: number;
}

export const setPageSize = (pageSize: number): UsersPageSizeChanged => ({
  type: ActionTypes.UsersPageSizeChanged,
  pageSize,
});

export type Actions = UsersPageChanged | UsersPageSizeChanged;

export interface PagerState {
  page: number;
  pageSize: number;
}

export default interface AppState {
  pagerState: PagerState;
}
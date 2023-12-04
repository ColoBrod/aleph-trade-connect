import { Status } from "~/interfaces/common"

export interface StateBase {
  status: Status;
  error: string;
  pagesTotal: number;
  activePage: number;
}

export const initialStateBase: StateBase = {
  status: 'idle',
  error: "",
  pagesTotal: 0,
  activePage: 0,
}
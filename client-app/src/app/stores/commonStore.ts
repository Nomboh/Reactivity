import { makeAutoObservable } from "mobx";
import { ServerError } from "../Model/serverError";

export default class CommomStore {
  error: ServerError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setServerError(error: ServerError) {
    this.error = error;
  }
}

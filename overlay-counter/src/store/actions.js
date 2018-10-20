import axios from "axios";
import {
  APP_SETUP,
  APP_READY,
  APP_ERROR
} from "@/store/mutations/app.mutations";

export const APP_INIT = "APP_INIT";
export const AppActions = {
  [APP_INIT]({ commit }) {
    axios
      .get("/static/config.json")
      .then(response => {
        commit(APP_SETUP, response.data);
        commit(APP_READY);
      })
      .catch(error => commit(APP_ERROR, error));
  }
};

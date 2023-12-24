import { BehaviorSubject } from "rxjs";

const currentComponent = new BehaviorSubject("");
const addButton = new BehaviorSubject(false);

export var snackBarMessage = new BehaviorSubject("");

export const commonService = {
  setSnackBarMessage: (value) => currentComponent.next(value),
  getSnackBarMessage: () => {
    let returnValue = "";
    snackBarMessage.subscribe((value) => {
      returnValue = value;
    });
    return returnValue;
  },

  setCurrentComponent: (value) => currentComponent.next(value),
  clearCurrentComponent: () => currentComponent.next(),
  getCurrentComponent: () => {
    let returnValue = "";
    currentComponent.subscribe((value) => {
      returnValue = value;
    });
    return returnValue;
  },

  setAddButton: (value) => addButton.next(value),
  getAddButton: () => addButton,

  getUserRoles: () => {
    let roles = [];
    roles = JSON.parse(sessionStorage.getItem("authorities")) || [];
    if (roles.length > 0) {
      roles = roles.map((r) => r.authority);
    }
    return roles;
  },
};

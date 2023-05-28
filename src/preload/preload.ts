import { contextBridge, ipcRenderer } from "electron";
import { request } from "../main/request";
/* This object is to declare the interface */
export interface PreloadAPIInterface {
  version: {
    chrome: string;
    node: string;
    electron: string;
    v8: string;
  };
  edusoft: {
    signIn: (
      username: string,
      password: string
    ) => Promise<request.EdusoftSignInResponse>;
  };
}

/** This object is to declare functionality */
const willExposeObject: PreloadAPIInterface = {
  version: {
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron,
    v8: process.versions.v8,
  },
  edusoft: {
    signIn(username, password) {
      return ipcRenderer.invoke("request:sign-in", username, password);
    },
  },
};

contextBridge.exposeInMainWorld("api", willExposeObject);

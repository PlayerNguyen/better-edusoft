import { request } from "../request";
import { IpcChannels, IpcInvokeRecord } from "./ipcRegister";

export class IpcRequestSignIn extends IpcInvokeRecord<string> {
  channel: IpcChannels = "request:sign-in";

  public listener = async (
    event: Electron.IpcMainInvokeEvent,
    ...args: any[]
  ) => {
    if (args.length < 2 || args[0] === "" || args[1] === "") {
      throw new Error(`Undefined username or password`);
    }

    console.log(
      await request.getRequestor().sendLoginRequest(args[0], args[1])
    );
    return "";
  };
}

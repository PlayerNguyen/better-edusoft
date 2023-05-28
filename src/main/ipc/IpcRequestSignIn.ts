import { request } from "./../request";
import { IpcChannels, IpcInvokeRecord } from "./ipcRegister";

export class IpcRequestSignIn extends IpcInvokeRecord<request.EdusoftSignInResponse> {
  channel: IpcChannels = "request:sign-in";

  public listener = async (
    _event: Electron.IpcMainInvokeEvent,
    ...args: any[]
  ) => {
    const studentId = args[0];
    const password = args[1];

    // Validate the studentID and Password before submit
    if (args.length < 2 || studentId === "" || password === "") {
      throw new Error(`Undefined username or password`);
    }

    console.log(`Successfully login with student id ${studentId}`);

    return await request.getRequestor().sendLoginRequest(studentId, password);
  };
}

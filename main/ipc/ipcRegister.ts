export type IpcChannels = "request:sign-in";

export class IpcRecordRegister {
  public records: IpcRecord<any>[] = [];

  public addRecord(record: IpcRecord<any>) {
    this.records.push(record);
  }
}

export type IpcRecordType = "on" | "handle";
export interface IpcRecord<T> {
  channel: IpcChannels;
  type: IpcRecordType;
  listener: (
    event: Electron.IpcMainInvokeEvent,
    ...args: any[]
  ) => Promise<T> | void;
}

export abstract class IpcInvokeRecord<T> implements IpcRecord<T> {
  public abstract channel: IpcChannels;
  public type: IpcRecordType = "handle";
  public abstract listener: (
    event: Electron.IpcMainInvokeEvent,
    ...args: any[]
  ) => Promise<T>;
}

export abstract class IpcSendRecord<T> implements IpcRecord<T> {
  public abstract channel: IpcChannels;
  public type: IpcRecordType = "handle";
  public abstract listener: (
    event: Electron.IpcMainInvokeEvent,
    ...args: any[]
  ) => void;
}

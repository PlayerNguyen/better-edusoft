import { PreloadAPIInterface } from "./preload";

declare global {
  interface Window {
    api: PreloadAPIInterface;
  }
}

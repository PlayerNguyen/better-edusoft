import { parse } from "node-html-parser";
import { HTMLElement } from "node-html-parser";

export function parseHtmlFromBody(fetchData: any): HTMLElement {
  const bounds = [
    fetchData.lastIndexOf("<body "),
    fetchData.lastIndexOf("</body>"),
  ];
  const bodyPlainHtml = fetchData.substring(bounds[0], bounds[1]);
  const documentHtml = parse(bodyPlainHtml);

  return documentHtml;
}

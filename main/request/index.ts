import axios, { AxiosInstance, AxiosResponse } from "axios";
import { EDUSOFT_WEB_URL, EdusoftAxios } from "../utils/edusoftAxios";
import setCookieParser from "set-cookie-parser";
import { parse } from "node-html-parser";

export module request {
  export interface EdusoftSignInResponse {
    studentId: string;
    fullName: string;
    sessionId: string;
  }
  export class EdusoftRequestor {
    private initialResponse?: AxiosResponse<any>;
    private axiosInstance?: AxiosInstance;

    private STUDENT_ID_FORM_KEY =
      "ctl00$ContentPlaceHolder1$ctl00$ucDangNhap$txtTaiKhoa";
    private PASSWORD_FORM_KEY =
      "ctl00$ContentPlaceHolder1$ctl00$ucDangNhap$txtMatKhau";
    private SUBMIT_BUTTON_FORM_KEY =
      "ctl00$ContentPlaceHolder1$ctl00$ucDangNhap$btnDangNhap";

    private async init() {
      this.initialResponse = await EdusoftAxios.get("/default.aspx");
    }

    public async getHeaderSetCookieValues() {
      if (this.initialResponse === undefined) {
        await this.init();
      }

      const headers = this.initialResponse?.headers;
      if (headers === undefined) {
        throw new Error(`Invalid header value`);
      }
      const cookies = headers["set-cookie"];
      if (cookies === undefined) {
        throw new Error(`Unable to receive a set-cookie value`);
      }
      return cookies;
    }

    /**
     * Creates a request to Edusoft and retrieves `headers['set-cookie']['ASP.NET_SessionId']` value.
     *
     * @returns the ASP.NET_SessionId cookie from set-cookie
     */
    public async getASPSessionId() {
      const parsedCookies = setCookieParser.parse(
        await this.getHeaderSetCookieValues()
      );
      const sessionIdObject = parsedCookies.find(
        (cookie) => cookie.name === "ASP.NET_SessionId"
      );
      if (sessionIdObject === undefined) {
        throw new Error(
          `Cannot found ASP.NET_SessionId from set-cookie response`
        );
      }

      return sessionIdObject.value;
    }

    public async getHiddenFormInputValue() {
      if (this.initialResponse === undefined) {
        await this.init();
      }
      // Parse html
      const fetchData: string = this.initialResponse!.data;
      const bounds = [
        fetchData.lastIndexOf("<body "),
        fetchData.lastIndexOf("</body>"),
      ];
      const bodyPlainHtml = fetchData.substring(bounds[0], bounds[1]);
      const documentHtml = parse(bodyPlainHtml);
      const viewStateInputs = documentHtml
        .querySelectorAll("input")
        .filter(
          (ele) => ele.id === "__VIEWSTATE" || ele.id === "__VIEWSTATEGENERATOR"
        );
      // Declare an object and push collected values
      let r: { [key: string]: string } = {};

      viewStateInputs.forEach((e) => {
        // return { id: , value: e.attributes["value"] };
        r[e.id] = e.attributes["value"];
      });

      return r;
    }

    public async sendLoginRequest(
      studentId: string,
      password: string
    ): Promise<EdusoftSignInResponse> {
      const formData = new FormData();
      const hiddenInputs = await this.getHiddenFormInputValue();
      Object.entries(hiddenInputs).forEach(([k, v], _i) => {
        formData.append(k, v);
      });

      formData.append(this.STUDENT_ID_FORM_KEY, studentId);
      formData.append(this.PASSWORD_FORM_KEY, password);
      formData.append(this.SUBMIT_BUTTON_FORM_KEY, "Đăng Nhập");
      formData.append("__EVENTTARGET", "");
      formData.append("__EVENTARGUMENT", "");

      const postResponse = await (
        await this.getAxiosInstanceWithSession()
      ).post("/default.aspx?page=gioithieu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if ((postResponse.data as string).includes("Sai thông tin đăng nhập")) {
        throw new Error(
          `Invalid credential. Check your studentId or password.`
        );
      }

      // TODO: cache the profile information, included session id
      const nameQueries = parse(postResponse.data)
        .querySelector("#ctl00_Header1_Logout1_lblNguoiDung > b > font")
        ?.innerText.split(" ");
      const fullName = nameQueries!
        .filter((_v, _i) => _i >= 2 && _i < nameQueries!.length - 1)
        .join(" ");

      return {
        studentId,
        fullName,
        sessionId: await this.getASPSessionId(),
      };
    }

    public async getAxiosInstanceWithSession() {
      const requestCookie = `ASP.NET_SessionId=${await this.getASPSessionId()};`;
      if (this.axiosInstance === undefined) {
        this.axiosInstance = axios.create({
          baseURL: EDUSOFT_WEB_URL,
          headers: { Cookie: requestCookie },
        });
      }

      return this.axiosInstance;
    }
  }

  let globalRequestor: EdusoftRequestor;

  export function getRequestor(): EdusoftRequestor {
    if (globalRequestor === undefined) {
      globalRequestor = new EdusoftRequestor();
    }
    return globalRequestor;
  }
}

import { expect } from "chai";
import { request } from "..";

describe("[unit] request", () => {
  describe("- getASPSessionId", () => {
    it(`should successfully get ASP.Net_SessionId`, () => {
      let edusoftInitialRequest = new request.EdusoftRequestor();
      return expect(edusoftInitialRequest.getASPSessionId()).to.eventually.be.a(
        "string"
      );
    });
  });

  describe("- getHiddenFormInputValue", () => {
    it(`should successfully get hidden form input value`, () => {
      let edusoftInitialRequest = new request.EdusoftRequestor();
      return expect(
        edusoftInitialRequest.getHiddenFormInputValue()
      ).to.eventually.have.keys(["__VIEWSTATE", "__VIEWSTATEGENERATOR"]);
    });
  });

  describe("- sendLoginRequest", () => {
    it(`should successfully logged in`, () => {
      let edusoftInitialRequest = new request.EdusoftRequestor();
      return expect(
        edusoftInitialRequest.sendLoginRequest(
          process.env.TEST_CREDENTIAL_USER_ID as string,
          process.env.TEST_CREDENTIAL_USER_PASSWORD as string
        )
      ).to.eventually.have.keys(["studentId", "fullName", "sessionId"]);
    });

    it(`should failed when use invalid credential`, () => {
      let edusoftInitialRequest = new request.EdusoftRequestor();
      return expect(
        edusoftInitialRequest.sendLoginRequest("", "")
      ).rejectedWith(Error, /Invalid credential/);
    });
  });
});

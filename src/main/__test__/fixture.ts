import chai from "chai";
import chaiAsPromised from "chai-as-promised";
/**
 * Set up before running all tests
 */
export async function mochaGlobalSetup() {
  /** Use chai as promised for Promise testing */
  chai.use(chaiAsPromised);
}
/**
 * Tear down after running all tests
 */
export async function mochaGlobalTeardown() {}

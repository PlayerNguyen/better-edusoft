module.exports = {
  require: [
    "@swc-node/register",
    "dotenv/config",
    "./main/__test__/fixture.ts",
  ],
  spec: ["./main/**/*.spec.ts"],
};

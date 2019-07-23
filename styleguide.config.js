const path = require("path");

module.exports = {
  title: "D3 Demo",
  components: "src/components/**/*.tsx",
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
    {
      propFilter: prop => {
        if (prop.parent == null) {
          return true;
        }

        return !prop.parent.fileName.includes("@types/react");
      }
    }
  ).parse,
  skipComponentsWithoutExample: true,
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.tsx?$/, ".md");
  },
  pagePerSection: true,
  usageMode: "collapse",
  exampleMode: "collapse",
  require: [path.join(__dirname, "./src/index.scss")],
  ignore: ["**/*.test.*", "**/*.d.ts", "**/index.*"]
};

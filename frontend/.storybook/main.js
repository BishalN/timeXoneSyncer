module.exports = {
  stories: [
    "../src/stories/**/*.story.@(ts|tsx|js|jsx|mdx)",
    "../src/stories/components/NavBar.stories.tsx",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
};

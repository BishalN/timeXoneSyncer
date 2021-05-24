module.exports = {
  stories: [
    // Paths to the story files
    '../pages/*.stories.mdx',
    '../pages/*.stories.js',
    '../pages/index.story.js',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
};

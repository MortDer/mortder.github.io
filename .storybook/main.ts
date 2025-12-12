import path from 'path';

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (configWebpack) => {
    configWebpack.resolve = configWebpack.resolve || {};
    configWebpack.resolve.alias = {
      ...(configWebpack.resolve.alias || {}),
      src: path.resolve(__dirname, '../src'),
    };

    return configWebpack;
  },
};

export default config;


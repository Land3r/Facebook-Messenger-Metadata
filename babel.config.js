module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          electron: '3.0',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-nullish-coalescing-operator'],
    ['file-loader', {
      name: '[name]-[hash].[ext]',
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
      outputPath: '/public',
      publicPath: 'C:\\Users\\ngordat\\Documents\\GitHub\\Facebook-Messenger-Metadata\\public',
      context: '/app',
      limit: 0
    }]
  ],
};

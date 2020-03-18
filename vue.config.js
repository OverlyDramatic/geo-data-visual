module.exports = {
  configureWebpack: {
    // vscode debug
    devtool: 'source-map'
  },
  // 插件选项
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        productName: '未爆炸物探测数据可视化系统',
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        }
      }
    }
  }
}

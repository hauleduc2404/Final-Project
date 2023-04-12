const path = require('path')

module.exports = {
    pwa:{
        name: "LingoPWA",
        themeColor: "#ffd100",
        workboxPluginMode: "InjectManifest",
        workboxOptions:{
            swSrc:"./src/service-worker.js",
        },
        icons: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/msapplication-icon-144x144.png'
        }
    },
    configureWebpack: {
        devServer: {
            https: true,
            port: 8080,
            proxy: 'http://localhost:3000/api'
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            },
        }
    }
}

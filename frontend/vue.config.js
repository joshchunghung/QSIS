const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})

module.exports = {
    assetsDir: 'static',
    lintOnSave: false
}

// module.exports = {
//     lintOnSave: false
// }

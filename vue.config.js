module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "xdCovid19Upper"
                return args
            })
    },
}
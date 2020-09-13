module.exports = {
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "xdCovid19Upper",
            chunks: [
                "chunk-vendors",
                "chunk-common",
                "index"
            ],
            meta: {revised: (new Date().getTime()).toString()}
        },
    },

};
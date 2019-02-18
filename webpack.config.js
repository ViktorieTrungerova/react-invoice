module.exports = {
  watch: true,

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
    mode: "development",
    entry: {
        invoices: "./src/entry/invoices.tsx",
        listingInvoices: "./src/entry/listingInvoices.tsx",
        detailInvoice: "./src/entry/detailInvoice.tsx",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/www/dist"
    },

    devtool: "inline-source-map",

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`

            {
                test: /\.tsx?$/,
                use: [
                    //'babel-loader',
                    'awesome-typescript-loader'
                ]
            },

        ]

    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};

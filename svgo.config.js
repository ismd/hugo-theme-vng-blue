module.exports = {
    plugins: [
        "removeDimensions",
        {
            name: "convertColors",
            params: {
                currentColor: true,
            },
        },
        {
            name: "removeAttrs",
            params: {
                attrs: "fill",
            },
        },
    ],
};

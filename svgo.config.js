module.exports = {
    plugins: [
        "removeDimensions",
        {
            name: "convertColors",
            params: {
                currentColor: true,
            },
        },
    ],
};

module.exports = {
    plugins: [
        {
            name: 'removeDimensions',
            active: true,
        },
        {
            name: 'addAttributesToSVGElement',
            params: {
                attributes: [{ viewBox: '0 0 24 24' }],
            },
        },
        {
            name: 'removeUselessStrokeAndFill',
        },
    ],
};

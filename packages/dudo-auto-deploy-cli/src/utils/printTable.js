const { table } = require('table');
const color = require('colors/safe');

const printTable = (header, data) => {
    console.log(
        table([
            header.map(item => color.cyan(item)),
            ...data,
        ], {
            border: {
                topBody: color.gray('─'),
                topJoin: color.gray('┬'),
                topLeft: color.gray('┌'),
                topRight: color.gray('┐'),

                bottomBody: color.gray('─'),
                bottomJoin: color.gray('┴'),
                bottomLeft: color.gray('└'),
                bottomRight: color.gray('┘'),

                bodyLeft: color.gray('│'),
                bodyRight: color.gray('│'),
                bodyJoin: color.gray('│'),

                joinBody: color.gray('─'),
                joinLeft: color.gray('├'),
                joinRight: color.gray('┤'),
                joinJoin: color.gray('┼'),
            },
        }),
    );
};

module.exports = printTable;

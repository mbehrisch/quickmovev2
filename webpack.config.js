//development does not work in Thunderbird, it will raise CSP errors because of an included "eval"
//production minifies the code which I don't like because errors are all reported on line 1 then
const theMode = 'none';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const outputPath = path.resolve(__dirname, './dist/release/');

module.exports = [
    {
        name: 'webextension', //all "standard" webextension scripts
        mode: theMode,
        entry: {
            background: './dist/compile/backgroundScript/background.js',
            options: './dist/compile/options/options.js',
            popup: './dist/compile/popup/popup.js',
        },
        output: {
            path: outputPath,
        },
    },
    {
        name: 'experiment', //the experiment needs a different output configuration
        mode: theMode,
        entry: './dist/compile/webexperiment/quickmove-api.js',
        output: {
            filename: 'quickmove-api.js',
            path: outputPath,

            //export the default class under the variable "autoarchive"!
            library: 'quickmove',
            libraryExport: 'default',
        },
    },
];

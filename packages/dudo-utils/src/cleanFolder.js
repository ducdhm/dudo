const fs = require('fs');
const path = require('path');

const cleanFolder = (folder, ignore) => {
    try {
        let files = fs.readdirSync(folder);
        for (let file of files) {
            if (typeof ignore === 'function') {
                if (ignore(file, folder)) {
                    continue;
                }
            } else if (Array.isArray(ignore)) {
                if (ignore.indexOf(file) !== -1) {
                    continue;
                }
            }

            const stat = fs.statSync(path.join(folder, file));
            if (stat.isDirectory()) {
                cleanFolder(path.join(folder, file), ignore);
            } else {
                fs.unlinkSync(path.join(folder, file));
            }
        }
    } catch (e) {
        console.error(`Error when cleaning "${folder}" folder`, e);
    }
};

module.exports =  cleanFolder;

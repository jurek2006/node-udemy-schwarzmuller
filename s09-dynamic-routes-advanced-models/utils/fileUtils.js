const fs = require("fs");
const path = require("path");

exports.getDataFromFile = (filename, callback) => {
    // gets data from JSON file (in data folder)
    const filePath = path.join(
        path.dirname(process.mainModule.filename),
        "data",
        filename
    );
    fs.readFile(filePath, (err, fileData) => {
        if (!err) {
            callback(JSON.parse(fileData), filePath);
        } else {
            callback(null, filePath);
        }
    });
};

var fs = require('fs'); 
// var data = fs/.readFileSync('dummyfile.txt', 'utf8');
// console.log(data);

exports.read = async (filePath) => {
    await fs.readFileSync(filePath, 'utf8', function(err, data) {
        if(err) {
            console.error("Could not open file: %s", err);
            return;
        }
    });
}

exports.write = async (filePath) => {
    await fs.writeFileSync(filePath, data, function(err) {
        if(err) {
            console.error("Could not write file: %s", err);
        }
    });
}
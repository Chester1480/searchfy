var fs = require('fs'); 
// var data = fs/.readFileSync('dummyfile.txt', 'utf8');
// console.log(data);

exports.read = async (filePath) => {
    const result = await fs.readFileSync(filePath, 'utf8');
    return result;
}

exports.write = async (filePath) => {
    const result = await fs.writeFileSync(filePath, 'utf8');
    return result;
}

exports.readOnStream = async (filePath) => {
    const result = await fs.readFileSync(filePath, 'utf8');
    return result;
}

exports.writeOnStream = async (filePath) => {
    const result = await fs.writeFileSync(filePath, 'utf8');
    return result;
}

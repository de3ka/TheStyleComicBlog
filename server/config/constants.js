//const connectionString = "mongodb://localhost:27017/blog",
const connectionString = "mongodb://sashkaVaseva:comicheaven@ds147544.mlab.com:47544/comicblog"
port = 8001,
    // console.log(port);
    path = require("path"),
    rootPath = path.normalize(__dirname + "/../..");

module.exports = {
    environment: process.env.NODE_ENV,
    connectionString: connectionString,
    port: port,
    rootPath: rootPath
};
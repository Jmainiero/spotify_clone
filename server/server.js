const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/routes");
const { port } = require("./utils/utils");

//Even as a test, I don't want to expose the application using Access-Control-Allow-Origin: *', so I'm opting to whitelist domains, even if its localhost.
const whitelist = ["http://localhost:3000"]; //I'd add more domains if I had some.
/*const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
};
app.use(cors(corsOptions));
*/
app.use(express.json())
app.use("/", router);

//Global error handler to send to client.
app.use((error, next, res, req) => {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message,
        },
    });
});

let server; //We'll need this to close our server

//Base Server Configuration
const startServer = async () => {
    try {
        server = await app.listen(port, console.log(`Listening on port ${port}`));
    } catch (err) {
        return err;
    }
};

const closeServer = async () => {
    try {
        await server.close();
    } catch (err) {
        return err;
    }
};

if (require.main === module) {
    startServer().catch((err) => console.log(err));
}

module.exports = { app, startServer, closeServer };
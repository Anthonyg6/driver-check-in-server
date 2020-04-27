const http = require("http");
const app = require("./app");
const cors = require("cors");

app.use(cors());
app.set("port", process.env.port || 4000);
const server = http.createServer(app);

server.listen(process.env.port || 4000);

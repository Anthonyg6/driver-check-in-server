const http = require("http");
const app = require("./app");

app.set("port", process.env.PORT || 4000);
const server = http.createServer(app);

app.listen(app.get("port"), () => {
  console.log("Server up");
});

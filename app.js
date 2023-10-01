require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const docsRouter = require("./src/middlewares/swagger.middleware");
const blogRouter = require("./src/api/blog/router.blog");
const middlewares = require("./src/middlewares/response.middleware");

app.use(express.json());

app.use(middlewares.globalResponseHandler);
app.use(middlewares.globalErrorHandler);

app.use("/docs", docsRouter);
app.use("/v1/api", blogRouter);


app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});
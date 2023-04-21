import express from "express";
import bodyParser from "body-parser";
import * as hbsRoot from "express-handlebars";
import { contactRouter } from "./routers/contactRouter";

const hbs = hbsRoot.create({
  extname: ".hbs",
  helpers: {
    goBack: () => "window.location.href = '/'",
  },
});

const port = 3000;

const app = express();

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use("/", contactRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Server started successfully`)
);

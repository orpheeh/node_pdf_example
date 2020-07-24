const express = require('express');
const bodyParser = require('body-parser');

const puppeteer = require('./puppeteer');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.get('/puppeteer/pdf/:message', puppeteer.getPDF);

app.listen(PORT, () => console.log("Listenning at port " + PORT));


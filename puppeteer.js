const convertHtmlToPdf = require('pdf-puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * 
 * @param {String} message 
 */
function generateAndSendPdf(message, res){
    const $ = cheerio.load(fs.readFileSync('./hello.html'));

    $('p').text(message);

    const html = $.html();
    convertHtmlToPdf(html, (pdf) => {
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdf);
    }, { printBackground: true, format: 'A6', landscape: true})
}

module.exports = {

    getPDF(req, res, next){
        //Recupérer les données
        const message = req.params.message;

        //Passer les données à la fonction pour créer le pdf
        generateAndSendPdf(message, res);
    }
}


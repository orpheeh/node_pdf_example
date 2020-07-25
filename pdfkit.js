const PDFDocument = require('pdfkit');

/**
 * 
 * @param {PDFDocument} doc 
 */
function definePDFContent(doc, message){
    doc.font('public/fonts/font.ttf');

    //image du dessus
    const radius = 20;
    let x = (doc.page.width - 2*radius)/2;
    let y = 10;

    //doc.circle(x+radius, y+radius, radius).clip();
    doc.image('public/illustre.jpg', x, y, { width: 2*radius, height: 2*radius});
    
    doc.text("CCNI87", 0, doc.y + y + 2*radius, { width: doc.page.width, align: 'center'});
    doc.fontSize(8);
    y = doc.y;
    doc.text("Situé au " + message + ",  074 25 16 49", doc.x + 5, y, { width: doc.page.width, align: 'center'}); 

    const WIDTH = doc.page.width;
    
    y = doc.y + 20;
    doc.fillColor('#777777');
    doc.text("Code du billet", 10, y, { width: WIDTH/2, align: 'left'});
    doc.text("Date d'enregistrement", WIDTH/2, y, { width: WIDTH/2 - 10, align: 'right'});

    y = doc.y;
    doc.fillColor('#000000');
    doc.text(message, 10, y, { width: WIDTH/2, align: 'left'});
    doc.text(message, WIDTH/2, y, { width: WIDTH/2 - 10, align: 'right'});

    doc.rect(10, doc.y+10, WIDTH - 20, 0.5).fill('#cccccc');

    y = doc.y + 20;
    doc.fillColor('#777777');
    doc.text("Nom & prénom", 10, y, { width: WIDTH/2, align: 'left'});
    doc.text("Téléphone", WIDTH/2, y, { width: WIDTH/2 - 10, align: 'right'});

    y = doc.y;
    doc.fillColor('#000000');
    doc.text(message, 10, y, { width: WIDTH/2, align: 'left'});
    doc.text(message, WIDTH/2, y, { width: WIDTH/2 - 10, align: 'right'});

    doc.rect(10, doc.y+10, WIDTH - 20, 0.5).fill('#cccccc');

    y = doc.y + 20;
    doc.fillColor('#777777');
    doc.text("Code du billet", 10, y, { width: WIDTH/2, align: 'left'});
    doc.text("Date d'enregistrement", WIDTH/2, y, { width: WIDTH/2 - 10, align: 'right'});

    y = doc.y;
    doc.fillColor('#000000');
    doc.text(message, 10, y, { width: WIDTH/2, align: 'left'});
    doc.text(message, WIDTH/2, y, { width: WIDTH/2 - 10, align: 'right'});

    doc.rect(10, doc.y+10, WIDTH - 20, 0.5).fill('#cccccc');

    y = doc.y + 20;
    doc.fillColor('#777777');
    doc.text("Code du billet", 10, y, { width: WIDTH/2, align: 'left'});
    doc.text("Date d'enregistrement", WIDTH/2, y, { width: WIDTH/2 - 10, align: 'right'});

    y = doc.y;
    doc.fillColor('#000000');
    doc.text(message, 10, y, { width: WIDTH/2, align: 'left'});
    doc.text(message, WIDTH/2, y, { width: WIDTH/2 - 10, align: 'right'});

    doc.rect(10, doc.y+10, WIDTH - 20, 0.5).fill('#cccccc');

    doc.fillColor("#777777");
    y = doc.page.height - 20;
    doc.text("Merci d'avoir choisi EKena", 10, y-10, { width: WIDTH/2});
    doc.text("Nous vous souhaitons un excellent voyage", 10, y, { width: WIDTH/2});


    doc.text("Adresse: Rue pecqueur", WIDTH - 200 - 40, y-20, { width: 120, align: 'right' } )
    doc.text("Téléphone: +241 62 47 89", WIDTH - 200 - 40, y-10, { width: 120 , align: 'right'} )
    doc.text("Email: contact@ekena.com", WIDTH - 200 - 40, y, { width: 120, align: 'right' } )

    doc.image("public/ekena.jpeg", WIDTH - 100 - 10, y - 40, { width: 100});

}

function generateAndSendPDF(message, res){
    //Création du document
    const doc = new PDFDocument({
     size: 'A5',
     layout: "landscape",
     margin: 0
    });
    console.log(doc.page.width + " " + doc.page.height);
    //Configuration du mode d'enregistrement, renvoi en réponse à la requête
    res.setHeader('Content-disposition', 'inline; filename='+ message +'.pdf');
    
    doc.pipe(res);
    //Remplissage du document pdf
    definePDFContent(doc, message);
    //Enregistrement et envoi de document
    doc.end();
}

module.exports = {

    getPDF(req, res, next){
        const message = req.params.message;

        generateAndSendPDF(message, res);
    }
}
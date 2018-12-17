import * as jsPDF from 'jspdf'
import {imgData} from './assets/pdfImage'


export default{
    print : function(movie,theater,name,age,items,money) {
        var doc = new jsPDF()
        doc.addImage(imgData, 'JPEG', 40, 40, 140, 120)
        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.setFontSize(16);
        doc.text(110, 30,`You booked a ticket for ${JSON.stringify(movie.Name)}`, null, null, 'center');
        doc.text(20, 180, 'Playing at:');
        doc.setFontSize(13);
        doc.text(50,180,` ${JSON.stringify(theater.name)} theater `)
        doc.setFontSize(16)
        doc.text(20,200,'Name:');
        doc.setFontSize(13)
        doc.text(40,200,`${name}`)
        doc.setFontSize(16)
        doc.text(20,220,'Age:');
        doc.setFontSize(13);
        doc.text(35,220,`${age}`)
        doc.setFontSize(16);
        doc.text(20,240,'You bought:')
        doc.setFontSize(13);
        doc.text(55,240,`${items}`)
        doc.setFontSize(16);
        doc.text(175,265,'Total')
        doc.setLineWidth(0.6)
        doc.line(60, 270, 190, 270)
        doc.text(165,280,`${money} Euros`)

        doc.save('a4.pdf')
    }
}

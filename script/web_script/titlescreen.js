import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js'
import Calendrier from '../class/calendrier.js';
import Controleur from '../class/controler.js';
const fs = require('fs');


var Mycalendrier = new Calendrier();
var MyControleur = new Controleur(Mycalendrier);
/*
// 8 -> 17
MyControleur.setInterneMeeting(myday,8,8,"Réunion en Interne");
*/

console.log(Mycalendrier);

//MyControleur.setExterneMeeting(new Jour("X",2,2,2023),15,17,"Meeting BK");
//MyControleur.setFormation(new Jour("X",1,2,2023),2,"Formation etoile");
//MyControleur.setInterneMeeting(new Jour("X",1,2,2023),8,8,"Réunion interne");




const RESFolder = './reservation/';
console.log("reading file");
fs.readdirSync(RESFolder).forEach(file => {
    console.log("inside");
    let nextRES = JSON.parse(fs.readFileSync(RESFolder+file, 'utf8'));
    if(nextRES.type == "Formation"){
        // Jour
        // Horaire (1 ou 2)
        // motif
        var ResJour = new Jour("X",
            parseInt(nextRES.Jour.jour,10),
            parseInt(nextRES.Jour.month,10),
            parseInt(nextRES.Jour.year,10));
        
            var ResHoraire;
        var ResMotif;
        if (nextRES.HeureDepart == 9)
            ResHoraire = 1;
        else
            ResHoraire = 2;

        ResMotif = nextRES.Raison;
        MyControleur.setFormation(ResJour,ResHoraire,ResMotif);
    }
    if (nextRES.type == "Externe"){
        console.log("externe")
        // Jour
        // Horaire1 et 2
        // motif
        var ResJour = new Jour("X",
            parseInt(nextRES.Jour.jour,10),
            parseInt(nextRES.Jour.month,10),
            parseInt(nextRES.Jour.year,10));
        
        var ResHoraire = [parseInt(nextRES.HeureDepart,10),parseInt(nextRES.HeureFin,10)];
        var ResMotif = nextRES.Raison
        console.log(nextRES.HeureDepart);
        console.log(nextRES.HeureFin);

        console.log(ResJour);
        console.log(ResHoraire);
        console.log(ResMotif);
        MyControleur.setExterneMeeting(ResJour,ResHoraire[0],ResHoraire[1],ResMotif);
    }   
    if (nextRES.type == "Interne"){
        console.log("interne")
        // Jour
        // Horaire1 et 2
        // motif
        var ResJour = new Jour("X",
            parseInt(nextRES.Jour.jour,10),
            parseInt(nextRES.Jour.month,10),
            parseInt(nextRES.Jour.year,10));
        
        var ResHoraire = [parseInt(nextRES.HeureDepart,10),parseInt(nextRES.HeureFin,10)];
        var ResMotif = nextRES.Raison

        MyControleur.setInterneMeeting(ResJour,ResHoraire[0],ResHoraire[1],ResMotif);
    }   
});


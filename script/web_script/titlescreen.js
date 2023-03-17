import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js';
import Calendrier from '../class/calendrier.js';
import Controleur from '../class/controler.js';
const fs = require('fs');


var Mycalendrier = new Calendrier();
var MyControleur = new Controleur(Mycalendrier);


const RESFolder = './reservation/';
fs.readdirSync(RESFolder).forEach(file => {
    console.log("reading path res");
    let nextRES = JSON.parse(fs.readFileSync(RESFolder+file, 'utf8'));



    var ResJour = new Jour("X",
            parseInt(nextRES.Jour.jour,10),
            parseInt(nextRES.Jour.month,10),
            parseInt(nextRES.Jour.year,10));
    if(nextRES.type == "Formation"){
        console.log("res formation");
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
        console.log("Reu externe");
        var ResHoraire = [parseInt(nextRES.HeureDepart,10),parseInt(nextRES.HeureFin,10)];
        var ResMotif = nextRES.Raison
        MyControleur.setExterneMeeting(ResJour,ResHoraire[0],ResHoraire[1],ResMotif);
    }   
    if (nextRES.type == "Interne"){
        console.log("Reu interne");
        var ResHoraire = [parseInt(nextRES.HeureDepart,10),parseInt(nextRES.HeureFin,10)];
        var ResMotif = nextRES.Raison

        MyControleur.setInterneMeeting(ResJour,ResHoraire[0],ResHoraire[1],ResMotif);
    }   
});
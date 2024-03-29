import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js';
import Calendrier from '../class/calendrier.js';
import Controleur from '../class/controler.js';
import * as fs_utils from '../backend/fs_utils.js';
import Config from '../class/config.js';
const fs = require('fs');

import * as session_checker from './session_checker.js';

session_checker.isValidSession();

var Mycalendrier = new Calendrier("Beryl");
var MyControleur = new Controleur(Mycalendrier);


document.getElementsByTagName("h1")[0].innerHTML += " : " + MyControleur.calendrier.SalleName;

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


function key_manage_week(key){
    if(key.code == 'ArrowRight')
        MyControleur.NextWeek();
    
    else if(key.code == 'ArrowLeft')
        MyControleur.PreviousWeek();
    }

document.onkeydown = key_manage_week;

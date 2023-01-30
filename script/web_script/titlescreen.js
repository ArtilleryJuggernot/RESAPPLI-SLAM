import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js'
import Calendrier from '../class/calendrier.js';
import Controleur from '../class/controler.js';

var myday = new Jour("Mercredi",23,1,2023)
let mySemaine = new Semaine(0,myday);
console.log(mySemaine);
var Mycalendrier = new Calendrier();

console.log(Mycalendrier);

let a = Mycalendrier.GetSemaineID(myday);
console.log("a = "+a);
console.log(Mycalendrier.SemaineList.length)

var MyControleur = new Controleur(Mycalendrier);
//MyControleur.setFormation(myday,1,"Formation Excel");

// 8 -> 17
MyControleur.setFormation(myday,1,"Formation Teams");
MyControleur.setInterneMeeting(myday,8,8,"Réunion en Interne");
MyControleur.setExterneMeeting(myday,15,17,"Meeting BK");

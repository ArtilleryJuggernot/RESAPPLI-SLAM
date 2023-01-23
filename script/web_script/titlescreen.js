import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js'
import Calendrier from '../class/calendrier.js';
import Controleur from '../class/controler.js';



var myday = new Jour("Mercredi",28,5,2023)
var myday2 = new Jour("Mardi",5,6,2023)
let mySemaine = new Semaine(0,myday);
console.log(mySemaine);
var Mycalendrier = new Calendrier();

console.log(Mycalendrier);

let a = Mycalendrier.GetSemaineID(myday);
console.log("a = "+a);
console.log(Mycalendrier.SemaineList.length)

var MyControleur = new Controleur(Mycalendrier);
MyControleur.setFormation(myday,1,"Formation Excel");
MyControleur.setFormation(myday2,1,"Formation Teams");
MyControleur.setInterneMeeting(myday,8,8,"Réunion en Interne");
MyControleur.setExterneMeeting(myday2,15,18,"Meeting BK");
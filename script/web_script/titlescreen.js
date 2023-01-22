import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js'
import Calendrier from '../class/calendrier.js';
import Controleur from '../class/controler.js';



var myday = new Jour("Mercredi",5,2,2020)
let mySemaine = new Semaine(0,myday);
console.log(mySemaine);
var Mycalendrier = new Calendrier();

console.log(Mycalendrier);

let a = Mycalendrier.GetSemaineID(myday);
console.log("a = "+a);
console.log(Mycalendrier.SemaineList.length)

var MyControleur = new Controleur(Mycalendrier);
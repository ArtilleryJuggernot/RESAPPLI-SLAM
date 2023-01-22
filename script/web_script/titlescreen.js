import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js'
import Calendrier from '../class/calendrier.js';


const mybody = document.body;




var myday = new Jour("Samedi",1,1,2000)
let mySemaine = new Semaine(0,myday);
console.log(mySemaine);
var Mycalendrier = new Calendrier();

console.log(Mycalendrier);


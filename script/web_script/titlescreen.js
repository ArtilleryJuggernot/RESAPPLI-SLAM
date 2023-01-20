import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js'

const mybody = document.body;

let myday = new Jour("Samedi",1,1,2000)
var mySemaine = new Semaine(0,myday);
console.log(mySemaine);

import Semaine from "./semaine.js";
import Jour from "./jour.js";

class Calendrier{
    constructor(){
        this.SemaineList = []
        var myday = new Jour("Mercredi",1,1,2020)
        let mySemaine = new Semaine(0,myday);
        this.SemaineList.push(mySemaine);
        console.log(mySemaine);
        for (let i = 1; i <= 2006; i++) {
            myday = this.SemaineList[this.SemaineList.length - 1].GetLastDay() // On récupère le dernier jour de la dernière semaine
            mySemaine = new Semaine(i,mySemaine.GetNextDay(myday)); // On crée une nouvelle semaine à partir du prochain jour de myday
            this.SemaineList.push(mySemaine);
        }
    }

    GetSemaineID(jour){
        let index = 0;
        for (let i = 0; i < this.SemaineList.length; i++) { // Parcours des semaines
            if (jour in this.SemaineList[i].SemaineDays){
                return i;
                }
            }
        }
}

export default Calendrier;
import Semaine from "./semaine.js";
import Jour from "./jour.js";

class Calendrier{
    constructor(){
        this.SemaineList = []
        this.HoursListReserved = [];
        var myday = new Jour("Dimanche",1,1,2023)
        let mySemaine = new Semaine(0,myday);
        this.SemaineList.push(mySemaine);
        console.log(mySemaine);
        for (let i = 1; i <= 2006; i++) {
            myday = this.SemaineList[this.SemaineList.length - 1].GetLastDay() // On récupère le dernier jour de la dernière semaine
            mySemaine = new Semaine(i,mySemaine.GetNextDay(myday)); // On crée une nouvelle semaine à partir du prochain jour de myday
            this.SemaineList.push(mySemaine);
        }
    }

    /**
     * 
     * @param {Jour} jour - Le jour à rechercher
     * @returns {int} L'index de la semaine dans le calendrier dans laquelle le jour appartient
     */
    GetSemaineID(jour){
        let currentDay;
        for (let SemaineIndex = 0; SemaineIndex < this.SemaineList.length; SemaineIndex++) { // Parcours des semaines
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) { // Parcours des jours dans la semaine
                currentDay = this.SemaineList[SemaineIndex].SemaineDays[dayIndex];
                if(jour.jour === currentDay.jour && jour.month === currentDay.month && jour.annee === currentDay.annee){
                    console.log("find !");
                    return SemaineIndex;
                }
            }
        }
        return null;
    }
}

export default Calendrier;
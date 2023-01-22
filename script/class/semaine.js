import Jour from './jour.js';
const Week = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const DicoMonth = {
    1 : 31,
    2 : 28,
    3 : 31,
    4 : 30,
    5 : 31,
    6 : 30,
    7 : 31,
    8 : 31,
    9 : 30,
    10 : 31,
    11 : 30,
    12 : 31
};


/**
 * 
 * @param {int} year 
 * @returns Vérifie si l'année est bissextile
 */
function IsBissextile(year){
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}



function GetNbJour(month, year){
    if(month == 2){
        if(IsBissextile(year)){
            return 29;
        }
        else{
            return 28;
        }
    }
    return DicoMonth[month];
}





/**
 * @class Semaine
 * @description Classe représentant une semaine
 * @param {int} SemaineID - Représente l'identifiant de la semaine
 */
class Semaine {

    /**
    * 
    * @param {Jour} day Le jour actuel
    * @returns {Jour} Le jour de la semaine suivant
    */
   GetNextDay(day) {
        let MonthDay = GetNbJour(day.month, day.year);
        let NextDateName = Week[( Week.indexOf(day.JourSemaine) + 1) % 7];
        if(day.jour < MonthDay){
            console.log()
            return new Jour(NextDateName,day.jour + 1, day.month, day.year);
            }
        else {
            if(day.month == 12){
                return new Jour(NextDateName,1, 1, day.year + 1);
            }
            else{
                return new Jour(NextDateName,1, day.month + 1, day.year);
            }
        }
    }


    constructor(SemaineID,startDay){
        this.SemaineID = SemaineID;
        this.SemaineDays = [];
        let currentDay = startDay;
        for (let index = 1; index <= 7; index++) {
            this.SemaineDays.push(currentDay);
            currentDay = this.GetNextDay(currentDay);
        }
    }



    


    GetFirstDay(){
        return this.SemaineDays[0];
    }

    /**
     * 
     * @returns {Jour} Le dernier jour de la semaine
     */
    GetLastDay(){
        return this.SemaineDays[6];
    }
}

export default Semaine;
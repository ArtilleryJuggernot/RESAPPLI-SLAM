/**
 * TODO : 
 * 
 * 
 *
 * - Mettre le calendrier par défaut sur la semaine d'aujourd'hui
 * 
 * - Crée la grosse fonction main qui updcheckday.ListHeure[index2].typetaken != "Formation"te tout
 * - Créer autant de classe que table MRD
 */ 
import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js'
import Calendrier from '../class/calendrier.js';
import Heure from './heure.js';
const fs = require('fs');


/**
 * Permet de contrôler la page à l'aide de ses fonctions
 *
 */
class Controleur {

/** 
 * @author Hugo Jacquel
 * @param {int} n - Le numéro du jour à créer (1 à 7) 
 * @returns {string} - Le code HTML du jour
 */
    dayBuilder(n){
    const Week = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

    // Ajout de "Semaine"
    let data = "<div class='day day-"+n+"'>";
    let myDay = "<div class='dayName dayName-"+n+"'>"+Week[n-1]+"</div>";
    data+= myDay;
    // Ajout n du jour
    let myNum = "<div class='day-num day-num-"+n+"'>"+n+"</div>"
    data+=myNum
    let h = "";
    // Ajout des heures
    for (let heure = 8; heure <= 17; heure++) {
        h = "<div class='hour day-"+n+"-h-"+heure+"'>"+heure+"</div>";
        data += h;
    } 
    data+= "</div>";
    return data;
}

    /**
     * 
     * @param {int} n - L'ID de la semaine a afficher 
     */
    SetWeekScreen(n){
        const DicoMonth = {
            1 : "Janvier",
            2 : "Février",
            3 : "Mars",
            4 : "Avril",
            5 : "Mai",
            6 : "Juin",
            7 : "Juillet",
            8 : "Août",
            9 : "Septembre",
            10 : "Octobre",
            11 : "Novembre",
            12 : "Décembre"
        };
        let semaine = this.calendrier.SemaineList[n];
        let days_screen = document.getElementsByClassName("day-num");
        let day = document.getElementsByClassName("day");
        // Mise a jour des jours
        for (let index = 0; index < days_screen.length; index++) {
            days_screen[index].innerHTML = semaine.SemaineDays[index].jour + " " + DicoMonth[semaine.SemaineDays[index].month] + "<br>" + semaine.SemaineDays[index].year;  
        }
        // Mise a jour des heures
        for (let index = 0; index < day.length; index++) {
            let hours = day[index].getElementsByClassName("hour");
            for (let index2 = 0; index2 < hours.length; index2++) {
                let myHeure = semaine.SemaineDays[index].ListHeure[index2];
                let myHeureVal = myHeure.heure;
                let myContent = myHeure.content;
                hours[index2].innerHTML =  myHeureVal + "h - " + (myHeureVal + 1) + "h" + "<br>" + myContent;
                if (myHeure.typetaken == "Formation"){
                    hours[index2].classList.add("Formation");
                    hours[index2].classList.remove("Interne");
                    hours[index2].classList.remove("Externe");
                    hours[index2].classList.remove("Libre");

                }
                if (myHeure.typetaken == "Interne"){
                    hours[index2].classList.add("Interne")
                    hours[index2].classList.remove("Formation");
                    hours[index2].classList.remove("Externe");
                    hours[index2].classList.remove("Libre");
                    
                }
                if (myHeure.typetaken == "Externe"){
                    hours[index2].classList.add("Externe");
                    hours[index2].classList.remove("Interne");
                    hours[index2].classList.remove("Formation");
                    hours[index2].classList.remove("Libre");

                }
                if (myHeure.typetaken == ""){
              
                    hours[index2].classList.add("Libre");
                    hours[index2].classList.remove("Interne");
                    hours[index2].classList.remove("Externe");
                    hours[index2].classList.remove("Formation");
                }
            }
        }
    }
    

    NextWeek()
    {
        if (this.currentWeek < 2006 && this.currentWeek >= 0)
        {
         
            this.currentWeek += 1
            let BoundedSetWeekScreen = this.SetWeekScreen.bind(this);
            BoundedSetWeekScreen(this.currentWeek);
        }
    }

    PreviousWeek()
    {
      

        if (this.currentWeek > 0 && this.currentWeek < 2006)
        {
         
            this.currentWeek -= 1
            let BoundedSetWeekScreen = this.SetWeekScreen.bind(this);
            BoundedSetWeekScreen(this.currentWeek);
            //this.SetWeekScreen(this.currentWeek);
            
        }
            
    }


    /**
     * Change le motif d'une heure en fonction du jour
     * 
     * @param {Jour} day - Jour auquel l'heure est a modifier
     * @param {int} heure - Heure à modifier (valeur de 8-18)
     * @param {string} motif - Le modif de la modification
     */
    changeHour(day,heure,motif,typetaken){
        let mysemaine = this.calendrier.GetSemaineID(day);
        for (let index = 0; index < this.calendrier.SemaineList[mysemaine].SemaineDays.length; index++) {
            let checkday = this.calendrier.SemaineList[mysemaine].SemaineDays[index];
            if(checkday.jour == day.jour && checkday.month == day.month && checkday.year == day.year){
                console.log(heure);
                console.log(this.calendrier.SemaineList[mysemaine].SemaineDays[index]);
                
                this.calendrier.SemaineList[mysemaine].SemaineDays[index].ListHeure[heure - 8].content = motif
                this.calendrier.SemaineList[mysemaine].SemaineDays[index].ListHeure[heure - 8].taken = true;
                this.calendrier.SemaineList[mysemaine].SemaineDays[index].ListHeure[heure - 8].typetaken = typetaken;
                this.SetWeekScreen(this.currentWeek);
                
            }

            }     
        }
    

        /**
         *  Similaire à changeHour() mais fonctionne sur une séquence d'heure [h1,h2]
         * 
         * @param {Jour} day 
         * @param {int} h1 
         * @param {int} h2 
         * @param {string} motif 
         */
    changeSeq(day,h1,h2,motif,typetaken){
        for (let index = h1; index < h2; index++) {
            this.changeHour(day,index,motif,typetaken);
        }
    }



    /**
     * Vérifie qu'une formation est placable dans le calendrier si et seulement si il n'y a pas
     * d'autre évennement (Interne, Externe) dans la plage horare. 
     * @param {Jour} day 
     * @param {int} mode 
     * @returns 
     */
    checkOtherHoursTakenFormation(day,mode) // mode = 1 9-12h , mode = 2 14-17h
    {
        let t1 = 0
        let t2 = 4;
        if(mode == 2)
            t1,t2 = 5,10;
        let mysemaine = this.calendrier.GetSemaineID(day);
        for (let index = 0; index < this.calendrier.SemaineList[mysemaine].SemaineDays.length; index++) {
            let checkday = this.calendrier.SemaineList[mysemaine].SemaineDays[index];
            if(checkday.jour == day.jour && checkday.month == day.month && checkday.year == day.year){
                for (let index2 = t1; index2 <= t2; index2++) {
                    if(checkday.ListHeure[index2].typetaken != "")  // Soit un Interne ou Externe
                        return false;
                }
            }
        }
        return true;
}


checkOtherHoursTakenOther(day,t1,t2) 
{
    let mysemaine = this.calendrier.GetSemaineID(day);
    for (let index = 0; index < this.calendrier.SemaineList[mysemaine].SemaineDays.length; index++) {
        let checkday = this.calendrier.SemaineList[mysemaine].SemaineDays[index];
        if(checkday.jour == day.jour && checkday.month == day.month && checkday.year == day.year){
            for (let index2 = t1; index2 <= t2; index2++) {
                if(checkday.ListHeure[index2].typetaken != "Formation" && checkday.ListHeure[index2].typetaken != "")  // Soit un Interne ou Externe
                    return true;
            }
        }
    }
    return false;
}


    /**
     * Vérifie puis définie une formation selon changeSeq()
     * 
     * @param {Jour} day 
     * @param {int} demi_journée - 1 pour le matin (9-12h) et 2 pour l'après midi (14-17h)
     * @param {string} motif 
     */
    setFormation(day,demi_journée,motif)
    {
        if(demi_journée == 1)
            this.changeSeq(day,9,12,motif,"Formation");
        else
            this.changeSeq(day,14,17,motif,"Formation");
    }

    setInterneMeeting(day,h1,h2,motif){
        this.changeSeq(day,h1,h2,motif,"Interne");
    }

    setExterneMeeting(day,h1,h2,motif){
        this.changeSeq(day,h1,h2,motif,"Externe");
    }


    /**
     * Convertis la date d'aujourd'hui en Jour
     * @returns le jour d'aujourd'hui selon la date du jour
     */
        GetTodayDate(){
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            let todayDate = new Jour("Today",day,month,year);
            return todayDate
        }
    




    /**
     * 
     * @param {Calendrier} calendrier - le calendrier que le contrôleur va gérer
     */
    constructor(calendrier)
    {
        this.currentWeek =  calendrier.GetSemaineID(this.GetTodayDate());
        this.calendrier = calendrier;
        this.Event = [];
        // Variable Global 
        const Week = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
        const DicoMonth = {
            1 : "Janvier",
            2 : "Février",
            3 : "Mars",
            4 : "Avril",
            5 : "Mai",
            6 : "Juin",
            7 : "Juillet",
            8 : "Août",
            9 : "Septembre",
            10 : "Octobre",
            11 : "Novembre",
            12 : "Décembre"
        };
        // Initialisation du tableau
        let jourSemaine = document.getElementById("currentWeek");
        for (let jour = 1; jour <= 7; jour++) {
            jourSemaine.innerHTML += this.dayBuilder(jour);
        }
        
        // Affichage de la semaine
        this.SetWeekScreen(this.currentWeek);     

        // Gestion des boutons
        let prevWeek = document.getElementsByClassName("previous-week");
        let nextWeek = document.getElementsByClassName("next-week");
        
        

        prevWeek[0].addEventListener("click",this.PreviousWeek.bind(this));
        nextWeek[0].addEventListener("click",this.NextWeek.bind(this));
        
        
        



    }


}
export default Controleur;
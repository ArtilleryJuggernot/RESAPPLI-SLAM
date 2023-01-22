/**
 * TODO : 
 * 
 * - Créer la fonction update qui prend un ID de semaine
 *   et qui met a jour sur le tableau la semaine qui correspond
 *
 * - Mettre le calendrier par défaut sur la semaine d'aujourd'hui
 * 
 * - Crée la grosse fonction main qui update tout
 * - Créer autant de classe que table MRD
 */ 
import Jour from '../class/jour.js';
import Semaine from '../class/semaine.js'
import Calendrier from '../class/calendrier.js';



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
    for (let heure = 8; heure <= 18; heure++) {
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
            days_screen[index].innerHTML = semaine.SemaineDays[index].jour + " " + DicoMonth[semaine.SemaineDays[index].month];  
        }
        // Mise a jour des heures
        for (let index = 0; index < day.length; index++) {
            let hours = day[index].getElementsByClassName("hour");
            for (let index2 = 0; index2 < hours.length; index2++) {
                let myHeure = semaine.SemaineDays[index].ListHeure[index2].heure;
                let myContent = semaine.SemaineDays[index].ListHeure[index2].content;
                hours[index2].innerHTML =  myHeure + "<br>" + myContent;
    }

}
    }
    
    /**
     * 
     * @param {Calendrier} calendrier - le calendrier que le contrôleur va gérer
     */
    constructor(calendrier)
    {   
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
            console.log("build");
            jourSemaine.innerHTML += this.dayBuilder(jour);
        }

        this.SetWeekScreen(10);        
    }

}

export default Controleur;
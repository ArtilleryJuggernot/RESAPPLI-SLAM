import Heure from './heure.js'


/**
 * Classe représentant un jour
 * @param {string} JourSemaine - Nom du jour
 * @param {int} jour - Numéro du jour
 * @param {int} month - Numéro du mois
 * @param {int} year - Numéro de l'année
 */
class Jour {
    constructor(JourSemaine,jour,month,year) {
        this.JourSemaine = JourSemaine;
        this.jour = jour;
        this.month = month;
        this.year = year;
        this.ListHeure = [];
        for (let i = 8; i <= 18; i++) {
            this.ListHeure.push(new Heure(i));
        }
    }
    ToString(){
        return this.JourSemaine + " " + " "
        + this.jour + " " + this.month + " " + this.year;
    }
    
}

export default Jour;
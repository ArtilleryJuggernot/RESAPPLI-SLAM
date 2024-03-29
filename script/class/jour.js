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
        for (let i = 8; i <= 17; i++) { // <= 18
            this.ListHeure.push(new Heure(i,"Libre"));
        }
    }
}

export default Jour;
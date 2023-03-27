/**
 * Classe de la configuration des couleurs
 * @param {string} title - Le titre de la configuration
 * @param {Color} formation - La couleur des réservations type formation
 * @param {Color} interne - La couleur des réservation type internes
 * @param {Color} externe - La couleur des réservation type externes
 * 
 */
class Theme {

    constructor(title,formation,interne,externe) {
        this.title = title;
        this.formation = formation;
        this.interne = interne;
        this.externe = externe;
    }
}

export default Theme;
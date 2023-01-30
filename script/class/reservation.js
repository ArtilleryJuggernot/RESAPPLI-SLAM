/**
 * @author Hugo Jacquel
 * @version 1.0
 * ""
 */


/**
 * @class Reservation
 * @constructor Reservation
 * @param {String} idReservation - Identifiant unique de la réservation
 * @param {String} Client - Nom du client 
 * @param {String} Adresse_Postal - Adresse postal du client
 * @param {String} Email - Adresse mail du client
 * @param {String} Telephone - Numéro de téléphone du client 
 * @param {String} NbPersonne - Nombre de personnes présente dans la salle
 * @param {Jour} Jour - Jour de la réservation
 * @param {int} h1 - Heure de départ de la réservation
 * @param {int} h2 - Heure de fin de la réservation
 * @param {String} raison - Raison de la réservation
 * @param {String} type - Type de réservation (Interne, Externe, Formation)
 */
class Reservation{
    constructor(IdRerservation,Client,Adresse_Postal,Email,Telephone,NbPersonne,Jour,h1,h2,raison,type){
        this.ID_reservation = IdRerservation
        this.Client = Client;
        this.Adresse_Postal = Adresse_Postal
        this.Email = Email;
        this.Telephone = Telephone;
        this.NbPersonne = NbPersonne;
        this.Jour = Jour;
        this.HeureDepart = h1;
        this.HeureFin = h2;
        this.Raison = raison;
        this.type = type;
        this.statut = "Active" // (En attente, Accepté)
    }
    
}
export default Reservation;
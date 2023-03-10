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
 * @param {String} equipement - Equipement de la réservation
 */
class Reservation{

    /**
     * @param {*} attribut - Attribut à vérifier
     */
    CheckNull(attribut){
        return attribut == null || attribut == undefined;
    }

    constructor(IdRerservation,Client,Adresse_Postal,Email,Telephone,NbPersonne,Jour,h1,h2,raison,type,equipement){
        this.ID_reservation = IdRerservation
        
        if(this.CheckNull(Client))
            this.Client = "";
        else
            this.Client = Client;
        if(this.CheckNull(Adresse_Postal))
            this.Adresse_Postal = "";
        else
            this.Adresse_Postal = Adresse_Postal
        
        if(this.CheckNull(Email))
            this.Email = "";
        else
            this.Email = Email;
        
        if(this.CheckNull(Telephone))
            this.Telephone = "";
        else
            this.Telephone = Telephone;
        
        if(this.CheckNull(NbPersonne))
            this.NbPersonne = 0;
        else
            this.NbPersonne = NbPersonne;
        
        this.Jour = Jour;
        this.HeureDepart = h1;
        this.HeureFin = h2;
        this.Raison = raison;
        this.type = type;
        this.statut = "Active" // (En attente, Accepté)
        
        if(this.CheckNull(equipement))
            this.equipement = "";
        else
            this.equipement = equipement;
    }
    
}
export default Reservation;
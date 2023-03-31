import Reservation from '../class/reservation.js';
import Jour from '../class/jour.js';
import Status from '../class/status.js';
const fs = require('fs');

/**
 * Permet de vérifier si une réservation first "overlap" une réservation Second
 * @param {int} Firsth1 - Horaire de Départ de First
 * @param {int} Firsth2 - Horaire de Fin de First
 * @param {int} Secondh1 - Horaire de Départ de Second
 * @param {int} Secondh2 - Horaire de Fin de Second
 * @returns {boolean} - True si il y a un overlap, false sinon
 */
function checkHoraireOverlap(Firsth1,Firsth2,Secondh1,Secondh2){
    for (let i = Firsth1; i < Firsth2; i++) {
        if(i == Secondh1 || i == Secondh2)
            return true;
    }
    for (let i = Secondh1; i < Secondh2; i++) {
        if(i == Firsth1 || i == Firsth2)
            return true;
    }
    return false;

}



/**
 * Verifie si la réservation est sur une même demi-journée qu'une formation
 * @param {Reservation} myResToCheck - La réservation à vérifier
 * @param {Reservation[]} ResList - La liste des réservations à vérifier
 * 
 * @return {boolean} - True si il y a une formation dans la même journée, false sinon
 */
function formation_rules(myResToCheck,ResList){
    for (let i = 0; i < ResList.length; i++) {
        const CurrentResChecked = ResList[i];
        if (CurrentResChecked.Jour.year == myResToCheck.Jour.year &&
            CurrentResChecked.Jour.month == myResToCheck.Jour.month &&
            CurrentResChecked.Jour.jour == myResToCheck.Jour.jour &&
            CurrentResChecked.type == "Formation"){
                if(CurrentResChecked.HeureDepart == 9 && CurrentResChecked.HeureFin == 13)
                {
                    if(checkHoraireOverlap(myResToCheck.HeureDepart,myResToCheck.HeureFin,8,13)){
                        return true;
                }
                }
                if(CurrentResChecked.HeureDepart == 14 && CurrentResChecked.HeureFin == 17)
                {
                    if(checkHoraireOverlap(myResToCheck.HeureDepart,myResToCheck.HeureFin,14,18)){
                        return true;
                    }
                    
                }
               
            }
        }
    return false;
}

/**
 * Permet de vérifier si la réservation ne vas pas overlap (1h ou plus
 * qui deborde sur une autre formation) une autre.
 * 
 * @return {boolean} - True si il y a un overlap, false sinon
 * 
 * @param {Reservation} myResToCheck - La réservation à vérifier
 * @param {Reservation[]} ResList - La liste des réservations à vérifier
 * @returns {boolean} - True si il y a un overlap, false sinon
 */
function checkOverlap(myResToCheck,ResList){
    for (let i = 0; i < ResList.length; i++) {
        const CurrentResChecked = ResList[i];
        if (CurrentResChecked.Jour.year == myResToCheck.Jour.year &&
            CurrentResChecked.Jour.month == myResToCheck.Jour.month &&
            CurrentResChecked.Jour.jour == myResToCheck.Jour.jour){
                if (checkHoraireOverlap(myResToCheck.HeureDepart,myResToCheck.HeureFin,CurrentResChecked.HeureDepart,CurrentResChecked.HeureFin)){
                    return true;
                }
        }
    }
    return false;
}

/**
 * Permet de vérifier la réservation selon les différentes règles.
 * @param {Reservation} maReservation 
 * @returns {Status} - Status de la réservation (valide ou avec un message d'erreur)
 */
function rulesChecker(maReservation){
    
    if(maReservation.HeureDepart == maReservation.HeureFin){
        return new Status(false,"La réservation doit durer au moins 1h");
    }

    if(maReservation.HeureFin > 18 || maReservation.HeureDepart < 8){
        return new Status(false,"La réservation doit être entre 8h et 18h");
    }

    if(maReservation.HeureDepart > maReservation.HeureFin){
        return new Status(false,"La réservation doit être dans le bon ordre");
    }

    const RESFolder = './reservation/';
    var ListeReservation = [];
    fs.readdirSync(RESFolder).forEach(file => {
    
    let nextRES = JSON.parse(fs.readFileSync(RESFolder+file, 'utf8'));

    var ResJour = new Jour("X",
            parseInt(nextRES.Jour.jour,10),
            parseInt(nextRES.Jour.month,10),
            parseInt(nextRES.Jour.year,10));
    let final_rez = new Reservation(nextRES.ID_reservation, nextRES.Client, nextRES.Adresse_Postal, nextRES.Email, nextRES.Telephone, nextRES.NbPersonne, ResJour, Number(nextRES.HeureDepart), Number(nextRES.HeureFin), nextRES.Raison, nextRES.type, nextRES.equipement);
    ListeReservation.push(final_rez);
})
    if (checkOverlap(maReservation,ListeReservation)){
        return new Status(false,"Il y a déjà une réservation sur cette plage horaire");
    }

    if (formation_rules(maReservation,ListeReservation)){
        return new Status(false,"Il y a déjà une formation sur cette demi-journée");
    }

    return new Status(true,"Votre réservation à bien été crée");
};

export {rulesChecker};
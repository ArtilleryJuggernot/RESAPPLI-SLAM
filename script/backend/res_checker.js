import Reservation from '../class/reservation.js';
import Jour from '../class/jour.js';
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
    if (Firsth1 < Secondh1 && Secondh2 > Firsth2)
        return true;
    if (Secondh1 > Firsth1 && Secondh2 > Firsth2)
        return true;
    if (Firsth1 < Secondh1 && Secondh1 < Firsth2 && Secondh2 > Firsth2)
        return true;
    if (Secondh1 < Firsth1 && Firsth1 < Secondh2 && Firsth2 > Secondh2)
        return true;
    if (Secondh1 < Firsth1 && Firsth1 < Secondh2 && Secondh2 < Firsth2)
        return true;
    if (Firsth1 < Secondh1 && Secondh1 < Firsth2 && Firsth2 < Secondh2)
        return true;
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
 * @returns {boolean} - True si la réservation est valide, false sinon
 */
function rulesChecker(maReservation){
    const RESFolder = './reservation/';
    var ListeReservation = [];
    fs.readdirSync(RESFolder).forEach(file => {
    
    console.log("reading path res");
    let nextRES = JSON.parse(fs.readFileSync(RESFolder+file, 'utf8'));
    console.log(nextRES.type);
    var ResJour = new Jour("X",
            parseInt(nextRES.Jour.jour,10),
            parseInt(nextRES.Jour.month,10),
            parseInt(nextRES.Jour.year,10));
    let final_rez = new Reservation(nextRES.ID_reservation, nextRES.Client, nextRES.Adresse_Postal, nextRES.Email, nextRES.Telephone, nextRES.NbPersonne, ResJour, Number(nextRES.HeureDepart), Number(nextRES.HeureFin), nextRES.Raison, nextRES.type, nextRES.equipement);
    ListeReservation.push(final_rez);
})
    if (checkOverlap(maReservation,ListeReservation) || formation_rules(maReservation,ListeReservation)){
        return false;
    }
    return true;
};

export {rulesChecker};
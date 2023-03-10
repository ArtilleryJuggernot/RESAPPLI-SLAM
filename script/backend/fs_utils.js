const fs = require('fs');

/**
 * Renvoie le prochain ID d'une réservation en 
 * calculatant le nombre de réservation + 1
 */
function GetNextID() {
    const dir = "./reservation/";
    const file = "reservation_";
    let next_length = fs.readdirSync(dir).length + 1;
    
    while(fs.existsSync(dir + file + next_length + ".json"))
        next_length++;
    return next_length;
}


/**
 * Sauvegarder la réservation en paramètre en fichier JSON
 * dans le respertoire reservation.
 * @param {Reservation} reservation 
 */
function save_RES_JSON(reservation) {
    const dir = "./reservation/";
    const file = "reservation_" + reservation.ID_reservation + ".json"
    const path = dir + file;
    //fs.writeFile(path, JSON.stringify(reservation))
    fs.writeFileSync(path, JSON.stringify(reservation));
    window.location.reload();
}


/**
 * Supprime la réservation avec l'ID
 * @param {int} ID 
 */
function delete_RES(ID) {
    const dir = "./reservation/";
    var files = fs.readdirSync(dir);
    const length = files.length;
    for (let index = 0; index < length; index++) {
        let filename = files[index];
        let path = dir + filename;
        let nextRES = JSON.parse(fs.readFileSync(path, 'utf8'));
        console.log(nextRES)
        if (nextRES.ID_reservation == ID)
            fs.unlinkSync(path);
    }
    window.location.reload();
}


export {GetNextID, save_RES_JSON, delete_RES};
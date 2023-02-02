import Reservation from '../class/reservation.js';
import Jour from '../class/jour.js';
const fs = require('fs');

// Récup des bouton pour activer les forms
let btn_popup_formation =  document.getElementById("btn-ajt-formation-btn");
let btn_popup_externe = document.getElementById("btn-ajt-externe-btn");
let btn_popup_interne = document.getElementById("btn-ajt-interne-btn");

// Récup des dérouler des forms
let popup_formation = document.getElementById("popup-res-formation");
let popup_externe = document.getElementById("popup-res-externe");
let popup_interne = document.getElementById("popup-res-interne");

popup_formation.style.visibility = "hidden";
popup_externe.style.visibility = "hidden";
popup_interne.style.visibility = "hidden";


//Event de chaque bouton
btn_popup_formation.addEventListener("click",() => 
{

    if(popup_formation.style.visibility == "hidden")
{
    popup_formation.style.visibility = "visible";
    popup_externe.style.visibility = "hidden";
    popup_interne.style.visibility = "hidden";
}
else{
    popup_formation.style.visibility = "hidden";
    popup_externe.style.visibility = "hidden";
    popup_interne.style.visibility = "hidden";
}   
});

btn_popup_externe.addEventListener("click",() => 
{

    if(popup_externe.style.visibility == "hidden")
{
    popup_formation.style.visibility = "hidden";
    popup_externe.style.visibility = "visible";
    popup_interne.style.visibility = "hidden";
}
else{
    popup_formation.style.visibility = "hidden";
    popup_externe.style.visibility = "hidden";
    popup_interne.style.visibility = "hidden";
}   
});

btn_popup_interne.addEventListener("click",() => 
{

    if(popup_interne.style.visibility == "hidden")
{
    popup_formation.style.visibility = "hidden";
    popup_externe.style.visibility = "hidden";
    popup_interne.style.visibility = "visible";
}
else{
    popup_formation.style.visibility = "hidden";
    popup_externe.style.visibility = "hidden";
    popup_interne.style.visibility = "hidden";
}   
});


/**
 * Renvoie le prochain ID d'une réservation en 
 * calculatant le nombre de réservation + 1
 */
function GetNextID(){
    const dir = "./reservation/";
    const length = fs.readdirSync(dir).length;
    return length + 1;
}

/**
 * Sauvegarder la réservation en paramètre en fichier JSON
 * dans le respertoire reservation.
 * @param {Reservation} reservation 
 */
function save_RES_JSON(reservation){
    const dir = "./reservation/";
    const file = "reservation_" + reservation.ID_reservation + ".json"
    const path = dir + file;
    //fs.writeFile(path, JSON.stringify(reservation))
    fs.writeFileSync(path, JSON.stringify(reservation));
}

function parse_formation(form){
    let ID = GetNextID();
    let ClientNom = form.get("client_name");
    let ReunionNom = form.get("formation_name");
    let ClientEmail = form.get("client_email");
    let ClientTelephone = form.get("client_phone");
    let ClientAdresse = form.get("client_address");
    let ReunionDate = form.get("formation_date");
    console.log(ReunionDate)
    let ReunionHoraire = form.get("horaire_selector");
    let ReunionNbPersonne = Number(form.get("nb_personne"));
    
    if (ReunionHoraire == "1")
    
        ReunionHoraire = [9,13]
    else
        ReunionHoraire = [14,17];
    
    let split_date = ReunionDate.split("-");
    ReunionDate = new Jour("X",split_date[2],split_date[1],split_date[0])
    let myRes = new Reservation(ID,ClientNom,ClientAdresse,ClientEmail,ClientTelephone,ReunionNbPersonne,ReunionDate,ReunionHoraire[0],ReunionHoraire[1],ReunionNom,"Formation");
    console.log(myRes);
    save_RES_JSON(myRes);
}

function parse_interne(form){
    let ID = GetNextID();
    let ReunionNom = form.get("interne_name");
    let ReunionDate = form.get("interne_date");
    console.log(ReunionDate)
    let ReunionHoraire1 = Number(form.get("interne_h1"));    
    let ReunionHoraire2 = Number(form.get("interne_h2"));
    
    let split_date = ReunionDate.split("-");
    ReunionDate = new Jour("X",split_date[2],split_date[1],split_date[0])
    let myRes = new Reservation(ID,null,null,null,null,null,ReunionDate,
        ReunionHoraire1,ReunionHoraire2,ReunionNom,"Interne");
    console.log(myRes);
    save_RES_JSON(myRes);
}

function parse_externe(form){
    let ID = GetNextID();
    let ClientNom = form.get("externe_client_name");
    let ReunionNom = form.get("externe_reunion_name");
    let ClientEmail = form.get("externe_client_email");
    let ClientTelephone = form.get("externe_client_phone");
    let ClientAdresse = form.get("externe_client_addresse");
    let ReunionDate = form.get("externe_date");
    console.log(ReunionDate)
    let ReunionNbPersonne = Number(form.get("nb_personne"));
    let ReunionHoraire1 = Number(form.get("externe_h1"));    
    let ReunionHoraire2 = Number(form.get("externe_h2"));
    let split_date = ReunionDate.split("-");
    ReunionDate = new Jour("X",split_date[2],split_date[1],split_date[0])
    let myRes = new Reservation(ID,ClientNom,ClientAdresse,ClientEmail,ClientTelephone,ReunionNbPersonne,ReunionDate,ReunionHoraire1,ReunionHoraire2,ReunionNom,"Externe");
    console.log(myRes);
    save_RES_JSON(myRes);
}



document.getElementById("form-formation").addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data)
    parse_formation(data);
  });

  document.getElementById("form-externe").addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data)
    parse_externe(data);
  });

  document.getElementById("form-interne").addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data)
    parse_interne(data);
  });





console.log(GetNextID());


import Reservation from '../class/reservation.js';
import Jour from '../class/jour.js';
var IS_POPUP_BTN_VISIBLE = false
let btn_popup_res =  document.getElementById("btn-ajt-formation-btn");
const fs = require('fs');

//const path = require('path'); 

  btn_popup_res.addEventListener("click",() => 
{
    let popup_res = document.getElementById("popup-res");
    if (!IS_POPUP_BTN_VISIBLE){
        popup_res.style.visibility = "visible";
        IS_POPUP_BTN_VISIBLE = true;
    }
        
    else{
        popup_res.style.visibility = "hidden";
        IS_POPUP_BTN_VISIBLE = false;
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
 * 
 * @param {string} type - Le type de formulaire rempli (interne, externe, formation) 
 */
const check = (type) => {
    //console.log("checking !")
    //const form = new FormData(type.target);
    //const email = form.get("client_email");
    //console.log(email);



    let ID = GetNextID();
    let ClientNom = "Prixy";
    let ReunionNom;
    let ClientEmail = "administration@prixy.fr";
    let ClientTelephone = "0792034059" // Prixy Default
    let ClientAdresse = "Rue de la Volvic, Batiment Prixy";
    let ReunionDate;
    let ReunionHoraire;
    let ReunionNbPersonne;
    let myForm;
    if(type == "formation"){
        console.log("formation !")
        myForm = document.getElementById("form-formation");

    }

    if(type == "interne"){

    }
    if(type == "externe"){

    }
    let myRes = new Reservation();
}


function my_strsplit(str,delimiter){
    let result = [];
    let tmp = ""
    for(let i = 0; i < str.length; i++){
        if(str[i] != delimiter){
            tmp += str[i];
        }
        else{
            result.push(tmp);
            tmp = "";
        }
    }
    result.push
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


//document.getElementById("form-formation").addEventListener("submit", check("formation"));

document.getElementById("form-formation").addEventListener('submit', e => {
    //console.log(GetNextID());
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data)
    parse_formation(data);
    const email = data.get("formation_date");
    console.log(email);
    console.log(email.split("-"));
    //console.log([...data.entries()]);
  });

  console.log(GetNextID());
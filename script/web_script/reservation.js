import Reservation from '../class/reservation.js';
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
    fs.readdir(dir, (err, files) => {
        return files.length + 1;
});
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


document.getElementById("form-formation").addEventListener("submit", check("formation"));





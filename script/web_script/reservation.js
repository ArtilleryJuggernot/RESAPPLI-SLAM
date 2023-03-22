import Reservation from '../class/reservation.js';
import Jour from '../class/jour.js';
import * as res_utils from '../parse/res_HTML_parse.js';
import * as fs_utils from '../backend/fs_utils.js';
import * as form_res from './form-res.js';
import * as res_checker from '../backend/res_checker.js';
import Status from '../class/status.js';
const fs = require('fs');





/**
 * Instancie les formulaires de réservation
 * @param {string} formType Type de formulaire à instancier (formation, interne, externe)
 * @param {string} divDest Div où instancier le formulaire
 */

function InstantiateForms(formType,divDest){

}

// Récup des bouton pour activer les forms
let btn_popup_formation = document.getElementById("btn-ajt-formation-btn");
let btn_popup_externe = document.getElementById("btn-ajt-externe-btn");
let btn_popup_interne = document.getElementById("btn-ajt-interne-btn");

// Récup des dérouler des forms
let popup_formation = document.getElementById("popup-res-formation");
let popup_externe = document.getElementById("popup-res-externe");
let popup_interne = document.getElementById("popup-res-interne");

popup_formation.style.visibility = "collapse";
popup_externe.style.visibility = "collapse";
popup_interne.style.visibility = "collapse";


//Event de chaque bouton
btn_popup_formation.addEventListener("click", () => {

    if (popup_formation.style.visibility == "collapse") {
        popup_formation.style.visibility = "visible";
        popup_externe.style.visibility = "collapse";
        popup_interne.style.visibility = "collapse";
    }
    else {
        popup_formation.style.visibility = "collapse";
        popup_externe.style.visibility = "collapse";
        popup_interne.style.visibility = "collapse";
    }
});

btn_popup_externe.addEventListener("click", () => {

    if (popup_externe.style.visibility == "collapse") {
        popup_formation.style.visibility = "collapse";
        popup_externe.style.visibility = "visible";
        popup_interne.style.visibility = "collapse";
    }
    else {
        popup_formation.style.visibility = "collapse";
        popup_externe.style.visibility = "collapse";
        popup_interne.style.visibility = "collapse";
    }
});

btn_popup_interne.addEventListener("click", () => {
    if (popup_interne.style.visibility == "collapse") {
        popup_formation.style.visibility = "collapse";
        popup_externe.style.visibility = "collapse";
        popup_interne.style.visibility = "visible";
    }
    else {
        popup_formation.style.visibility = "collapse";
        popup_externe.style.visibility = "collapse";
        popup_interne.style.visibility = "collapse";
    }
});


function parse_formation(form) {
    let ID = fs_utils.GetNextID();
    let ClientNom = form.get("client_name");
    let ReunionNom = form.get("formation_name");
    let ClientEmail = form.get("client_email");
    let ClientTelephone = form.get("client_phone");
    let ClientAdresse = form.get("client_address");
    let ReunionDate = form.get("formation_date");

    let ReunionHoraire = form.get("horaire_selector");
    let ReunionNbPersonne = Number(form.get("nb_personne"));

    if (ReunionHoraire == "1")
        ReunionHoraire = [9, 13]
    else
        ReunionHoraire = [14, 17];

    let split_date = ReunionDate.split("-");
    ReunionDate = new Jour("X", split_date[2], split_date[1], split_date[0])
    let myRes = new Reservation(ID, ClientNom, ClientAdresse, ClientEmail, ClientTelephone, ReunionNbPersonne, ReunionDate, ReunionHoraire[0], ReunionHoraire[1], ReunionNom, "Formation","Aucun");
    
    let check = res_checker.rulesChecker(myRes);
    if (check.isvalid)
        fs_utils.save_RES_JSON(myRes);
    DisplayStatus(check);
    
}

function parse_interne(form) {
    let ID = fs_utils.GetNextID();
    let ReunionNom = form.get("interne_name");
    let ReunionDate = form.get("interne_date");
    let ReunionHoraire1 = Number(form.get("interne_h1"));
    let ReunionHoraire2 = Number(form.get("interne_h2"));

    let split_date = ReunionDate.split("-");
    ReunionDate = new Jour("X", split_date[2], split_date[1], split_date[0])
    let myRes = new Reservation(ID, null, null, null, null, null, ReunionDate,
        ReunionHoraire1, ReunionHoraire2, ReunionNom, "Interne","Aucun");

    let check = res_checker.rulesChecker(myRes);
        if (check.isvalid)
            fs_utils.save_RES_JSON(myRes);
        DisplayStatus(check);
}

function parse_externe(form) {
    let ID = fs_utils.GetNextID();
    let ClientNom = form.get("externe_client_name");
    let ReunionNom = form.get("externe_reunion_name");
    let ClientEmail = form.get("externe_client_email");
    let ClientTelephone = form.get("externe_client_phone");
    let ClientAdresse = form.get("externe_client_addresse");
    let ReunionDate = form.get("externe_date");
    let ReunionEquipement = form.get("equipement");

    let ReunionNbPersonne = Number(form.get("nb_personne"));
    let ReunionHoraire = form.get("horaire_selector");

    if (ReunionHoraire == "1")
        ReunionHoraire = [9, 13]
    else
        ReunionHoraire = [14, 17];

    let split_date = ReunionDate.split("-");
    ReunionDate = new Jour("X", split_date[2], split_date[1], split_date[0])
    let myRes = new Reservation(ID, ClientNom, ClientAdresse, ClientEmail, ClientTelephone, ReunionNbPersonne, ReunionDate, ReunionHoraire[0], ReunionHoraire[1], ReunionNom, "Externe", ReunionEquipement);
    
    let check = res_checker.rulesChecker(myRes);
    if (check.isvalid)
        fs_utils.save_RES_JSON(myRes);
    DisplayStatus(check);


}



document.getElementById("form-formation").addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    parse_formation(data);
});

document.getElementById("form-externe").addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    parse_externe(data);
});

document.getElementById("form-interne").addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    parse_interne(data);
});


/**
 * Renvoie un code HTML d'un input pour un texte ou un nombre ou un calendrier
 * @param {string} Content - Le contenu de l'input
 * @param {string} Type - Le type de l'input
 * @param {int} ID - L'ID de l'input pour le récupérer et modifier la réservation
 * @param {string} initialValue - La valeur initiale de l'input (celle de la réservation de base)
 */



function input_html_number_gen(ID,initialValue){

    let my_content = "<label>Nombre de personnes présente :</label>";
    my_content += "<input type='number' id='"+ID+"' name='"+ID+"' min='1' max='30' value='"+initialValue+"'></input>";
    return my_content;
}

function input_html_generator(Content,Type,ID,initialValue){ 
    let my_content = "<label>"+Content+"</label> <input type='"+Type+"' id='"+ID+"' value='"+initialValue+"'><br>";
    return my_content;
}


/**
 * Renvoie une date du code HTML pour le calendrier
 * 10/02/2023 -> 2023-02-10
 * @param {string} date  
 */
function htmlDate_to_Date(date){
    let split_date = date.split("/");
    let dt = split_date[2]+"-"+split_date[1]+"-"+split_date[0];
    return dt.replace(" ", '');
}

/**
 * Similaire à input_html_generator, mais pour les horaires
 * @param {int} ID - L'ID de l'input pour le récupérer et modifier la réservation
 * @param {string} timeline - start ou end | Détermine si c'est l'heure de début ou de fin
 * @returns 
 */
function Heure_input_html_generator(ID,initialValue,timeline){
    let start = 1;
    if (timeline == "end")
        start = 2;
    if (timeline == "start")
        var my_content = "<label>Choisissez votre horaire de début</label>";
    else
        var my_content = "<label>Choisissez votre horaire de fin</label>";

    my_content += "<select name='"+ID+"' id='horaire-selector_"+start+"'>";
    for(let i = 8; i < 19; i++){
        if(i == initialValue){
            my_content += "<option value='"+i+"' selected>"+i+"h</option>";
        }else{
            my_content += "<option value='"+i+"'>"+i+"h</option>";
        }
    }
    my_content += "</select>";
    return my_content;
}


function NoSpaceString(str){
    str = str.replace(" ", '');
    return str;
}




/**
 * Permet d'afficher le status de la réservation sur la page utilisateur
 * @param {Status} status 
 */
function DisplayStatus(status){
    console.log(status)
    let root = document.getElementById("status")

    if (root.children.length > 0)
        root.removeChild(root.children[0]);
    
    let my_content = "<div class='status-res'> <h2>Statut de la réservation :</h2> <p>"+status.type+"</p> </div>";
    root.innerHTML += my_content
    let myMessage = document.getElementsByClassName("status-res")[0];
    if (status.isvalid)
        myMessage.style.borderColor = "green";
    else
        myMessage.style.borderColor = "red";
    

    
   

    console.log("Display status !");

}

/**
 * 
 * @param {*} indexHTML - Index HTML de la réservation
 * @param {*} ID - ID de la réservation
 */
function confirm_RES_modification(indexHTML,ID)
{
   

    let head = document.getElementById("res_display_"+indexHTML);
    
    let res_name = head.children['res_name_'+indexHTML].children[1].value;
    let res_date = head.children['res_date_'+indexHTML].children[1].value;
    let res_nb_personne = Number(head.children['res_nbpersonne_'+indexHTML].children[1].value);
    let res_client = head.children['res_client_'+indexHTML].children[1].value;
    let res_email = head.children['res_email_'+indexHTML].children[1].value;
    let res_telephone = head.children['res_telephone_'+indexHTML].children[1].value;
    let res_adresse = head.children['res_adresse_'+indexHTML].children[1].value;
    let res_equipement = head.children['res_equipement_'+indexHTML].children[1].value;


    let h1 = Number(head.children['res_horaire_'+indexHTML].children['horaire-selector_1'].value);
    let h2 = Number(head.children['res_horaire_'+indexHTML].children['horaire-selector_2'].value);



    let split_date = res_date.split("-");
    let res_jour = new Jour("X", split_date[2], split_date[1], split_date[0]);
    let res_type = head.children['res_type_'+indexHTML].innerHTML.split(":")[1];
    fs_utils.delete_RES(ID);
    let myRes = new Reservation(ID, res_client, res_adresse, res_email, res_telephone, res_nb_personne, res_jour, h1, h2, res_name, NoSpaceString(res_type),res_equipement);

    let check = res_checker.rulesChecker(myRes);
    if (check.isvalid)
        fs_utils.save_RES_JSON(myRes);
    DisplayStatus(check);
    
}


// TODO
/**
 * Permet de modifier la réservation, en changeant avec les inputs sur la page web
 * avec un bouton de confirmation, et le change dans le fichier JSON correspondant
 * @param {int} ID - ID de la formation
 * @param {int} indexHTML - index de la formation dans le HTML
 * @param {HTMLElement} btnHTMLElement - L'élément HTML du bouton
 */
function modify_RES(ID, indexHTML, btnHTMLElement) {

    let head = btnHTMLElement.parentElement.children
    
    // Nom de la réservation
    let splitted_value = head['res_name_'+indexHTML].innerHTML.split(": ")[1];
    head['res_name_' + indexHTML].innerHTML = input_html_generator("Nom de la réservation : ","text",indexHTML,splitted_value);
    
    // Date de la réservation
    splitted_value = htmlDate_to_Date(head['res_date_'+indexHTML].innerHTML.split(": ")[1]);
    head['res_date_'+indexHTML].innerHTML = input_html_generator("Date de la réservation : ","date",indexHTML,splitted_value);

    // Heure de début de la réservation
    splitted_value = head['res_horaire_'+indexHTML].innerHTML.split(": ")[1];
    splitted_value = splitted_value.replace("h", "");
    splitted_value = splitted_value.split('-');
    head['res_horaire_'+indexHTML].innerHTML = Heure_input_html_generator(indexHTML,splitted_value[0],"start") + "<br>" + Heure_input_html_generator(indexHTML,splitted_value[1],"end");

    // Nombre de personne
    splitted_value = head['res_nbpersonne_'+indexHTML].innerHTML.split(": ")[1];
    splitted_value = splitted_value.replace(" ", "");
    splitted_value = Number(splitted_value);
    head['res_nbpersonne_'+indexHTML].innerHTML = input_html_number_gen(indexHTML,splitted_value);


    // Nom du client
    splitted_value = head['res_client_'+indexHTML].innerHTML.split(": ")[1];
    head['res_client_'+indexHTML].innerHTML = input_html_generator("Nom du client : ","text",indexHTML,splitted_value);

    // Email du client
    splitted_value = head['res_email_'+indexHTML].innerHTML.split(": ")[1];
    head['res_email_'+indexHTML].innerHTML = input_html_generator("Email du client : ","email",indexHTML,splitted_value);
    
    // Téléphone du client
    splitted_value = head['res_telephone_'+indexHTML].innerHTML.split(": ")[1];
    head['res_telephone_'+indexHTML].innerHTML = input_html_generator("Téléphone du client : ","tel",indexHTML,splitted_value);

    // Adresse postal du client
    splitted_value = head['res_adresse_'+indexHTML].innerHTML.split(": ")[1];
    head['res_adresse_'+indexHTML].innerHTML = input_html_generator("Adresse postal du client : ","text",indexHTML,splitted_value);

    // Equipement
    splitted_value = head['res_equipement_'+indexHTML].innerHTML.split(": ")[1];
    head['res_equipement_'+indexHTML].innerHTML = input_html_generator("Equipement : ","text",indexHTML,splitted_value);



    // Création du bouton de confirmation

    let btn_confirm = "<button id='btn_confirm_"+ indexHTML +"'>Confirmer</button>";
    btnHTMLElement.parentElement.innerHTML += btn_confirm;
    let my_confirm = document.getElementById("btn_confirm_"+indexHTML);
    
    document.getElementsByClassName("btn_modify")[indexHTML].remove();
    my_confirm.addEventListener("click", () => confirm_RES_modification(indexHTML,ID));

    // Suppression du bouton de modification
    


}




/**
 * Affiche les réservations du dossier reservation
 * dans la page web avec modification et suppression possible.
 */
function DisplayReservation() {
    const dir = "./reservation/";
    const default_id = "res_display_";
    var files = fs.readdirSync(dir);
    const length = files.length;
    for (let index = 0; index < length; index++) {
        let filename = files[index];
        let path = dir + filename;
        let nextRES = JSON.parse(fs.readFileSync(path, 'utf8'));
        // Formatage de la date
        let date = nextRES.Jour.jour + "/" + nextRES.Jour.month + "/" + nextRES.Jour.year;





        let nextHTML = '<div class="res_dis" id="' + default_id + index + '">';
        nextHTML += "<h3 id='res_name_" + index + "'>" + "Nom de la réservation : " + nextRES.Raison + "</h3>";
        nextHTML += "<p id='res_id_" + index + "'>" + "Identifiant : " + nextRES.ID_reservation + "</p>";
        nextHTML += "<p id='res_type_" + index + "'>" + "Type de réservation : " + nextRES.type + "</p>";
        nextHTML += "<p id='res_date_" + index + "'>" + "Date : " + date + "</p>";
        nextHTML += "<p id='res_horaire_" + index + "'>" + " Horaire : " + nextRES.HeureDepart + "h  - " + nextRES.HeureFin + "h" + "</p>";
        nextHTML += "<p id='res_nbpersonne_" + index + "'>" + "Nombre de personnes : " + nextRES.NbPersonne + "</p>";
        nextHTML += "<p id='res_client_" + index + "'>" + "Nom du client : " + nextRES.Client + "</p>";
        nextHTML += "<p id='res_email_" + index + "'>" + "Email : " + nextRES.Email + "</p>";
        nextHTML += "<p id='res_telephone_" + index + "'>" + "Numéro de Téléphone : " + nextRES.Telephone + "</p>";
        nextHTML += "<p id='res_adresse_" + index + "'>" + "Adresse Postal : " + nextRES.Adresse_Postal + "</p>";
        nextHTML += "<p id='res_equipement_" + index + "'>" + "Equipement : " + nextRES.equipement + "</p>";


        nextHTML += '<button class="btn_delete" ">Supprimer</button>';
        nextHTML += '<button class="btn_modify" ">Modifier</button>';
        nextHTML += '</div>';

        document.getElementById("reserv_list").innerHTML += nextHTML;
    }


}
/**
 * Permet de parser le HTML d'une réservation pour obtenir l'ID;
 * @param {String} inner 
 */
function ParseHTMLReservation(inner) {
    let split = inner.split(":");
    return parseInt(split[1]);
}


// Lancement de la fonction d'affichage
DisplayReservation();


// Assignation des boutons


let myBtnDelList = document.getElementsByClassName("btn_delete");
let myBtnModList = document.getElementsByClassName("btn_modify");

for (let index = 0; index < myBtnDelList.length; index++) {
    // Assignation bouton delete

    let btn_delete = myBtnDelList[index];
    let IdInnerHTML = btn_delete.parentElement.children['res_id_' + index].innerHTML; // Récupère l'ID de la réservation de la div en cours
    let Id = ParseHTMLReservation(IdInnerHTML);
    btn_delete.addEventListener("click", () => {
        fs_utils.delete_RES(Id);
    })

    // Assignation bouton modifier
    let btn_modify = myBtnModList[index];
    btn_modify.addEventListener("click", () => {
        modify_RES(Id, index, btn_modify);
    })
}







console.log(fs_utils.GetNextID());
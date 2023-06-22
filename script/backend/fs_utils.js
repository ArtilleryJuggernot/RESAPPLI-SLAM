const fs = require('fs');
const mysql = require('mysql');
import Theme from '../class/theme.js';
import Color from '../class/color.js';
import Config from '../class/config.js';
import Login from '../class/login.js';


var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "jug",
});

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
        if (nextRES.ID_reservation == ID)
            fs.unlinkSync(path);
    }
    window.location.reload();
}

/**
 * 
 * @param {Theme} theme - le theme à sauvegarder 
 */
function save_config_color(theme){
    const dir = "./themes/";
    const file = "theme_" + theme.title + ".json"
    const path = dir + file;
    fs.writeFileSync(path, JSON.stringify(theme));
    window.location.reload();
}


/**
 * 
 * @param {Config} config 
 */
function save_config(config){
    const dir = "./config/";
    const file = "config_" + config.name + ".json"
    const path = dir + file;
    fs.writeFileSync(path, JSON.stringify(config));
    window.location.reload();
}


function JSON_to_Theme(json){
    let theme = new Theme(json.title,
        new Color(json.formation.title, json.formation.value),
        new Color(json.interne.title, json.interne.value),
        new Color(json.externe.title, json.externe.value));
    return theme;
}

/**
 * Retourne la liste des thèmes présents dans le dossier config
 * @returns {Theme[]}
 */
function get_themes(){
    let L = [];
    const dir = "./themes/";
    var files = fs.readdirSync(dir);
    const length = files.length;
    for (let index = 0; index < length; index++) {
        let filename = files[index];
        let path = dir + filename;
        let nextTheme = JSON.parse(fs.readFileSync(path, 'utf8'));
        L.push(JSON_to_Theme(nextTheme));
    }
    return L;
}

function delete_theme(name){
    const dir = "./themes/";
    var files = fs.readdirSync(dir);
    const length = files.length;
    for (let index = 0; index < length; index++) {
        let filename = files[index];
        let path = dir + filename;
        let nextTheme = JSON.parse(fs.readFileSync(path, 'utf8'));
        if (nextTheme.title == name)
            fs.unlinkSync(path);
    }
    window.location.reload();
}



function load_config(name){
    const dir = "./config/";
    const file = "config_" + name + ".json"
    const path = dir + file;
    let config = JSON.parse(fs.readFileSync(path, 'utf8'));
    return new Config(config.name, JSON_to_Theme(config.theme));
}


/**
 * 
 * @param {Login} Login - Le login à sauvegarder 
 */
function save_login(login){
    const dir = "./user/";
    const file = "user_" + login.user + ".json"
    const path = dir + file;
    fs.writeFileSync(path, JSON.stringify(login));
}

/**
 * 
 * @param {string} name - L'ID du login à charger
 * @returns {Login} - Le login chargé
 */
function load_login(name){
    const dir = "./user/";
    const file = "user_" + name + ".json"
    const path = dir + file;
    let login = JSON.parse(fs.readFileSync(path, 'utf8'));
    return new Login(login.ID, login.user, login.hashed_passwd, load_config(login.config.name),login.Permision,login.creationDate);
}


function isLoginValid(name){
    const dir = "./user/";
    const file = "user_" + name + ".json"
    const path = dir + file;
    return fs.existsSync(path)
}

export {GetNextID, save_RES_JSON, delete_RES,
     save_config_color, get_themes, JSON_to_Theme, 
     delete_theme, save_config, load_config, load_login, save_login
    , isLoginValid};
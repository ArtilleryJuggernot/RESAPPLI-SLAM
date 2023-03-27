// Fonction pour récuperer les valeurs des couleurs des input de la page
import Color from '../class/color.js';
import Theme from '../class/theme.js';
import * as fs_utils from '../backend/fs_utils.js';
import Config from '../class/config.js';
var colorID = ['color-formation','color-interne','color-externe'];


/**
 * Retourne un tableau asscoiatif contenant les valeurs des couleurs
 */
function getColors() {
    let L = {};
    for (let i = 0; i < colorID.length; i++) {
        L[colorID[i]] = document.getElementById(colorID[i]).value;
    }
    console.log(L);
    return L;
}



// Fonction pour créer un theme avec les valeurs des couleurs
function createTheme() {
    let colors = getColors();
    let title = document.getElementById("theme-title").value;
    let theme = new Theme(title,
        new Color("Formation - " + title ,colors['color-formation']),
        new Color("Interne - " + title ,colors['color-interne']),
        new Color("Externe - " + title ,colors['color-externe']));
    fs_utils.save_config_color(theme);
    console.log("Theme sauvegardé");
    }

document.getElementById("save-color").addEventListener("click", () => createTheme())


// Fonction qui permet de récuperer la liste des themes enregistrer et de les afficher dans la page

function getThemes() {

    let themes = fs_utils.get_themes();
    let select = document.getElementById("theme-selector-id");
    let html = "<select name='theme-select-value' id='theme-selector-value'>"
    for (let i = 0; i < themes.length; i++) {
        
        let option = document.createElement("option");
        option.value = themes[i].title;
        option.text = themes[i].title;
        select.appendChild(option);
    }
}

getThemes();

// Fonction qui permet de récuperer le theme selectionner et de l'appliquer

function applyTheme(theme) {
    let themes = fs_utils.get_themes(); // [ THemes]
    for (let i = 0; i < themes.length; i++) {
        if (themes[i].title == theme) {
            document.getElementById("color-formation").value = themes[i].formation.value;
            document.getElementById("color-interne").value = themes[i].interne.value;
            document.getElementById("color-externe").value = themes[i].externe.value;
        }
    }
}

function chargeTheme() {
    let theme = document.getElementById("theme-selector-id").value;
    let themes = fs_utils.get_themes(); // [ THemes]
    for (let i = 0; i < themes.length; i++) {
        if (themes[i].title == theme) {
            let a = new Config("test", themes[i]);
            fs_utils.save_config(a);
        }
    }
}

function focusSelected(theme){
    let select = document.getElementById("theme-selector-id");
    select.value = theme;
}

document.getElementById("theme-selector-id").addEventListener("change", () => applyTheme(
    document.getElementById("theme-selector-id").value
))

document.getElementById("set-color").addEventListener("click", () => chargeTheme())


// Fonction qui permet de supprimer un theme

function deleteTheme() {
    let theme = document.getElementById("theme-selector-id").value;
    fs_utils.delete_theme(theme);
}



document.getElementById("reset-color").addEventListener("click" ,() => deleteTheme());


let config = fs_utils.load_config("test");
applyTheme(config.theme.title);
focusSelected(config.theme.title);


// TODO : Faire une page de login qui identifie une session avec un id relier à une config
// TODO : Faire une page de gestion des utilisateurs
// TODO : Faire une page de gestion des salles
// TODO URGENT : Faire une page paramètre de bases


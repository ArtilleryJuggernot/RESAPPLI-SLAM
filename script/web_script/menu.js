import * as fs_utils from '../backend/fs_utils.js';

function SetMenu(){
    document.getElementById("login-name").innerHTML = "Utilisateur : " + window.sessionStorage.getItem("User");

    document.getElementById("login-role").innerHTML = "Role : " + fs_utils.load_login(window.sessionStorage.getItem("User")).role;
}

SetMenu();

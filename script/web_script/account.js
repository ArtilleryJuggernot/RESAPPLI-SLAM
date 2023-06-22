import * as session_checker from './session_checker.js';
import * as account_utils from '../backend/account_utils.js'
import * as fs_utils from '../backend/fs_utils.js'
session_checker.isValidSession();



// Recup info utilisateur
let User = window.sessionStorage.getItem("User");
console.log(User)
var log = fs_utils.load_login(User);
console.log(log)
document.getElementById("username").innerHTML += log.user;

document.getElementById("perm").innerHTML += log.role;

document.getElementById("dt_crea").innerHTML += log.displayCreationDate();


// Bind des boutons ->

document.getElementById("acc_change_passwd").addEventListener("click", account_utils.display_form_passwd)


document.getElementById("form-change_passwd").addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    account_utils.change_password(data);
});
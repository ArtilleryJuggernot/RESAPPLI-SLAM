import * as session_checker from './session_checker.js';
import * as account_utils from '../backend/account_utils.js'
import * as fs_utils from '../backend/fs_utils.js'
import Login from '../class/login.js';
session_checker.isValidSession();



// Recup info utilisateur
let User = window.sessionStorage.getItem("User");
var log = fs_utils.load_login(User);

document.getElementById("username").innerHTML += log.user;

document.getElementById("perm").innerHTML += log.role + '('+ log.Permision  +')';

document.getElementById("last_con").innerHTML += log.lastConnection.toString();
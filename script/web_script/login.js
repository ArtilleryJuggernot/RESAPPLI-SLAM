import * as fs_utils from '../backend/fs_utils.js';
import Login from '../class/login.js';
import Status from '../class/status.js';
const { createHash } = require('crypto');

sessionStorage.clear();

let passwd = "admin"
let hashed_passwd = createHash('sha256').update(passwd).digest('hex');
fs_utils.save_login(new Login(0, "admin", hashed_passwd, fs_utils.load_config("test"),0));


function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}




function DisplayStatus(status){
    console.log(status)
    let root = document.getElementById("status")

    if (root.children.length > 0)
        root.removeChild(root.children[0]);
    
    let my_content = "<div class='status-res'> <h2>Statut du login :</h2> <p>"+status.type+"</p> </div>";
    root.innerHTML += my_content
    let myMessage = document.getElementsByClassName("status-res")[0];
    if (status.isvalid)
        myMessage.style.borderColor = "green";
    else
        myMessage.style.borderColor = "red";

    console.log("Display status !");

}


async function login(){
    console.log("oui")
    let user = document.getElementById("login").value;
    console.log("User: " + user);

    if(fs_utils.isLoginValid(user)){
        let password = document.getElementById("password").value;
        console.log("password: " + password);
        var myUser = fs_utils.load_login(user);
        console.log("FIND : " + myUser.hashed_passwd)
        if (myUser.checkPassword(password)){
            console.log("Login successful");

            let status = new Status(true, "Connexion en cours...");
            DisplayStatus(status);

            await sleep(1);
            window.sessionStorage.setItem("User", myUser.user);
            window.sessionStorage.setItem("SessionID", myUser.setSessionID());
            window.location.href = "index.html";
        }
        else{
            console.log("Login failed");
            let status = new Status(false, "Mot de passe incorrect");
            DisplayStatus(status);
        }
    }
    else{
        console.log("Login failed");
        let status = new Status(false, "Cet utilisateur n'existe pas");
        DisplayStatus(status);


    }
}

document.getElementById("connect-btn").addEventListener("click", () => login());


document.addEventListener('keypress', (event)=>{
    if(event.code === "Enter") 
        login();
});

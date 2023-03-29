import * as fs_utils from '../backend/fs_utils.js';
import Login from '../class/login.js';
import Status from '../class/status.js';

fs_utils.save_login(new Login(0, "admin", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", fs_utils.load_config("test")));


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
        let myUser = fs_utils.load_login(user);
        if (myUser.checkPassword(password)){
            console.log("Login successful");

            let status = new Status(true, "Connexion en cours...");
            DisplayStatus(status);

            await sleep(1);
            window.location.href = "index.html";
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

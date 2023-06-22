import * as fs_utils from './fs_utils.js'
import * as session_check from '../web_script/session_checker.js'
import Status from '../class/status.js';
export function display_form_passwd(){
    console.log("oui")
    var div = document.getElementById('form_passwd');
    if(div.style.visibility == 'hidden'){
        div.style.visibility = 'visible';
    }
    else{
        div.style.visibility = 'hidden';
    }
  
}

function display_status(status,div_id){
    let root = document.getElementById(div_id)
        
    if (root.children.length > 0)
        root.removeChild(root.children[0]);
    
    let my_content = "<div class='status-res'> <p>"+status.type+"</p> </div>";
    root.innerHTML += my_content
    let myMessage = document.getElementsByClassName("status-res")[0];
    if (status.isvalid)
        myMessage.style.borderColor = "green";
    else
        myMessage.style.borderColor = "red";

    console.log("Display status !");
}

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

export function change_password(form){
    if(session_check.isValidSession()){

        let old_passwd = form.get("old_passwd");
        let new_passwd = form.get("new_passwd");
        let new_confirm = form.get("new_confirm");
        let User = window.sessionStorage.getItem("User");
        let acc = fs_utils.load_login(User)
        console.log(acc)
        if(acc.checkPassword(old_passwd) && new_passwd == new_passwd && new_passwd != ''){
            acc.hashed_passwd = acc.hash(new_passwd);
            console.log(acc)
            fs_utils.save_login(acc)
            console.log("nouveau mot de passe sauvegarder avec succès")
            let status = new Status(true, "Votre mot de passe à bien été mis à jour. Vous allez être redirigez vers la page de connexion");
            display_status(status,'status_passwd');
            sleep(3)
            window.location.href = 'login.html'


        }   
    }
}

import * as fs_utils from '../backend/fs_utils.js';


function isValidSession(){
    let User = window.sessionStorage.getItem("User");
    let SessionID = window.sessionStorage.getItem("SessionID");

    if (User == null || SessionID == null)
        window.location.href = "unauthorized.html";
    else{
        var myUser = fs_utils.load_login(User);
        if (myUser.setSessionID() == SessionID)
            return true;
        else
            window.location.href = "unauthorized.html";
    }
}


export {isValidSession};
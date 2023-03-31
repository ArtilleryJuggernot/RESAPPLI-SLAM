// Pour qu'un utilisateur puisse accéder aux pages il doit : 
// 1. être connecté
// 2. avoir les droits d'accès à la page
//
// On stock l'identifiant de session dans la variable de session "SessionID"
// On stock le nom d'utilisateur dans la variable de session "User"

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}


async function redirect(){
    await sleep(3);
    window.location.href = "login.html";
}

redirect();


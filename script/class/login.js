const { createHash } = require('crypto');
import Config from './config.js';
import * as fs_utils from '../backend/fs_utils.js'



/**
 * Classe représentantant un login
 * @param {int} ID - Identifiant du login
 * @param {string} user - Nom d'utilisateur
 * @param {string} hashed_passwd - Mot de passe hashé
 * @param {Config} config - Configuration du login
 * @param {int} Permision - Permission du login (0: admin RES, 1 : admin, 2: sécretaire, 3 : guest)
 * @param {Date} createConnection - Date de création du compte, par défaut aujourd'hui si non renseigné en paramètre (optionel)
* @author Hugo Jacquel
 */
class Login {

    /**
     * @author Hugo Jacquel




     * @param {string} string 
     * @returns {string} - Hash de la string
     */
    hash(string) {
        return createHash('sha256').update(string).digest('hex');
    }

    constructor(ID,user,password,config,Permision,creationDate = 'DEFAULT') {
        this.ID = ID;
        this.user = user;
        this.hashed_passwd = password;
        this.config = config;
        this.Permision = Permision;
        this.role = "";

        // Création d'un compte
        if (creationDate == 'DEFAULT') {
            console.log("Création du compte")
            this.creationDate = new Date();
        }
        // Connexion à un compte déjà existant
        else {
            this.creationDate = creationDate;
        }
            
        
        if (Permision == 0){
            this.role = "Administrateur RES";
        }

        else if(Permision == 1){
            this.role = "Administrateur"
        }

        else if (Permision == 2){
            this.role = "Secrétaire";
        }
        else if (Permision == 3){
            this.role = "Guest";
        }

    }


    checkPassword(password) {
        console.log(this.hash(password))
        console.log(this.hashed_passwd)
        return this.hash(password) === this.hashed_passwd;
      }

    setSessionID(){
        console.log("SessionID : " + this.hash(this.user + this.hashed_passwd))
        return this.hash(this.user + this.hashed_passwd);
    }
    displayCreationDate(){
        this.creationDate = new Date(this.creationDate)
        
        let day = this.creationDate.getDay().toString();
        if (day.length == 1)
            day = '0' + day;
        let month = this.creationDate.getMonth().toString();
        if (month.length == 1)
            month = '0' + month;
            
        let year = this.creationDate.getFullYear().toString();
        var dt = day + "/" + month + "/" + year;
        return dt;
    }
}

export default Login;
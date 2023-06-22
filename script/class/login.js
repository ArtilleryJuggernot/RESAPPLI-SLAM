const { createHash } = require('crypto');
import Config from './config.js';
import * as fs_utils from '../backend/fs_utils.js'



/**
 * Classe représentantant un login
 * @param {int} ID - Identifiant du login
 * @param {string} user - Nom d'utilisateur
 * @param {string} hashed_passwd - Mot de passe hashé
 * @param {Config} config - Configuration du login
 * @param {int} Permision - Permission du login (0: admin, 2: sécretaire, 3 : guest)
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
            this.creationDate = new Date();
        }
        // Connexion à un compte déjà existant
        else {
            this.creationDate = creationDate;
        }
            
        
        this.lastConnection = new Date();
        if (Permision == 0){
            this.role = "Administrateur";
        }
        else if (Permision == 1){
            this.role = "Secrétaire";
        }
        else if (Permision == 2){
            this.role = "Guest";
        }

    }
    checkPassword(password) {
        return this.hash(password) === this.hashed_passwd;
      }

    setSessionID(){
        console.log("SessionID : " + this.hash(this.user + this.hashed_passwd))
        return this.hash(this.user + this.hashed_passwd);
    }

    Disconnect(){
        sessionStorage.clear();
        this.lastConnection = new Date();
        fs_utils.save_login(this)
    }
}

export default Login;
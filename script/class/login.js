const { createHash } = require('crypto');
import Config from './config.js';



/**
 * Classe représentantant un login
 * @param {int} ID - Identifiant du login
 * @param {string} user - Nom d'utilisateur
 * @param {string} hashed_passwd - Mot de passe hashé
 * @param {Config} config - Configuration du login
 * @author Hugo Jacquel
 */
class Login {

    hash(string) {
        return createHash('sha256').update(string).digest('hex');
    }

    constructor(ID,user,hashed_passwd,config) {
        this.ID = ID;
        this.user = user;
        this.hashed_passwd = hashed_passwd;
        this.config = config;
    }
    checkPassword(password) {
        return this.hash(password) === this.hashed_passwd;
      }
}

export default Login;
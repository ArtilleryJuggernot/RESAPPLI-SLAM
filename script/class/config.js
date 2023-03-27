import Theme from './theme.js';

/**
 * Classe de la configuration de l'utilisateur
 * @param {string} name - Le nom de la configuration
 * @param {Theme} theme - Le theme de la configuration
 **/
class Config {

    constructor(name,theme) {
        this.name = name;
        this.theme = theme;
    }
}

export default Config;
/**
 * @author Hugo Jacquel
 * @version 1.0
 * ""
 */

class Heure{
    constructor(heure,content){
        this.heure = heure;
        this.taken = false;
        this.typetaken = ""; //  Formation, Interne, Externe"
        this.content = content
    }
}


export default Heure;
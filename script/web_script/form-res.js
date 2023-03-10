function Summon_Interne(){
    var content="<form id='form-interne' enctype='multipart/form-data'>";
    content+= "<label for='interne_name'>Nom de la Réunion Interne :</label>";
    content += "<input type='text' id='formation_name' name='interne_name' required>";
    content += "<br> <br>";
    content += "<label for='interne_date'>Date de la Réunion Interne :</label>";
    content += "<input type='date' id='formation_date' name='interne_date' value='' min='2023-01-16' max='2061-7-3' required>";
    content += "<label for='horaire-select'>Choisissez votre horaire de début</label>";
    content += "<select name='interne_h1' id='horaire-selector'>";
    content += "<option value='8'>8h</option> <option value='9'>9h</option> <option value='10'>10h</option> <option value='11'>11h</option> <option value='12'>12h</option> <option value='13'>13h</option>";
    content += "<option value='14'>14h</option> <option value='15'>15h</option> <option value='16'>16h</option> <option value='17'>17h</option> <option value='18'>18h</option>";
    content += "</select>";

    content += "<label for='horaire-select'>Choisissez votre horaire de fin</label>";
    content += "<select name='interne_h2' id='horaire-selector'>";
    content += "<option value='8'>8h</option> <option value='9'>9h</option> <option value='10'>10h</option> <option value='11'>11h</option> <option value='12'>12h</option> <option value='13'>13h</option>";
    content += "<option value='14'>14h</option> <option value='15'>15h</option> <option value='16'>16h</option> <option value='17'>17h</option> <option value='18'>18h</option>";
    content += "</select>";

   content += "<button type='submit'>Envoyer</button> </form>";
}
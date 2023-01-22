/**
 * @author Hugo Jacquel
 * @param {int} n - Le numéro du jour à créer (1 à 7) 
 * @returns {string} - Le code HTML du jour
 */

const Week = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];


function dayBuilder(n)
{
    // Ajout de "Semaine"
    let data = "<div class='day day-"+n+"'>";
    let myDay = "<div class='dayName dayName-"+n+"'>"+Week[n-1]+"</div>";
    data+= myDay;
    // Ajout n du jour
    let myNum = "<div class='day-num-"+n+"'>"+n+"</div>"
    data+=myNum
    let h = "";
    // Ajout des heures
    for (let heure = 8; heure <= 18; heure++) {
        h = "<div class='hour day-"+n+"-h-"+heure+"'></div>"
        data += h
    } 
    data+= "</div>";
    return data;
}


let jourSemaine = document.getElementById("currentWeek");
for (let jour = 1; jour <= 7; jour++) {
    jourSemaine.innerHTML += dayBuilder(jour);
}
/**
 * Fichier Display.js
 * ------------------
 * 
 * Description :
 * Ce fichier contient toutes les fonctions nécessaires pour mettre à jour les éléments d'affichage
 * dans le HTML de l'application. Les fonctions sont regroupées sous un objet nommé `display`.
 * 
 * Utilisation :
 * L'encapsulation des fonctions d'affichage dans l'objet `display` permet une organisation claire
 * et une facilité d'appel des fonctions. Pour appeler une fonction, on utilise la syntaxe :
 * `display.nom_fonction()` à partir de n'importe quel autre script dans le projet, notamment depuis
 * la fonction `init()` qui sert à initialiser l'application.
 * 
 * Objectifs :
 * - Centraliser toutes les fonctions d'affichage pour simplifier la maintenance et l'évolution du code.
 * - Séparer clairement les responsabilités des fonctions d'affichage des autres logiques métier 
 *   dans le projet, renforçant ainsi la structure modulaire du code.
 * - Fournir une interface unique (`display`) pour l'accès aux fonctionnalités d'affichage, 
 *   augmentant la lisibilité et la réutilisabilité du code.
 * 
 * Architecture :
 * Le fichier `Display.js` agit comme une bibliothèque d'affichage, où chaque fonction membre de `display`
 * peut être visualisée comme un service d'affichage autonome. Ce modèle contribue à une meilleure 
 * organisation du code et facilite les tests unitaires des fonctions d'affichage indépendamment des 
 * autres parties du système.
 */




var display = {



    /**
      * Récupère et retourne les résultats actuels filtrés selon les critères définis
      * par les contrôles de l'interface utilisateur.
      * 
      * Cette fonction consulte le tableau global `data` qui doit contenir tous les trajets possibles
      * avec leurs détails (ville de départ, destination, kilométrage, péages, temps de trajet, etc.).
      * Elle applique un filtre basé sur la ville de départ sélectionnée dans le champ input correspondant
      * et limite le nombre de trajets retournés à la valeur spécifiée par le slider pour le nombre de matchs.
      *
      * Prérequis :
      * - Un élément input avec l'id "VilleDepart" doit exister dans le DOM, contenant la ville de départ souhaitée.
      * - Un élément input de type slider avec l'id "nbre_matchs_01" doit exister dans le DOM pour indiquer
      *   le nombre maximal de trajets à retourner.
      * - Le tableau `data` doit être initialisé et accessible dans le contexte de cette fonction, contenant
      *   les objets de trajet avec les propriétés nécessaires (VilleDepart, VilleDestination, Km, Peages, TempsTrajet).
      *
      * Sortie :
      * - Un tableau d'objets où chaque objet représente un trajet qui correspond aux critères de filtrage.
      *   Chaque objet contient des propriétés telles que VilleDepart, VilleDestination, Km, Peages, TempsTrajet.
      *
      * Exemple d'utilisation :
      * var currentResults = display.getCurrentResults();
      * console.log(currentResults); // Affiche les trajets filtrés selon les critères actuels.
      */
    getCurrentResultsold: function () {
        // Récupération des résultats actuels
        var villeDepart = document.getElementById("VilleDepart").value; // On suppose un champ input pour la ville de départ
        var nbreMaxMatchs = parseInt(document.getElementById("nbre_matchs_01").value);

        // Filtrage des données basé sur la ville de départ et un nombre maximum de résultats
        var filteredResults = data.filter(function (trajet) {
            return trajet.VilleDepart === villeDepart;
        }).slice(0, nbreMaxMatchs); // Limitation du nombre de résultats au maximum spécifié par le slider

        return filteredResults;
    },

    getCurrentResults: function () {
        // Récupération de la ville de départ depuis l'input utilisateur
        var villeDepart = document.getElementById("VilleDepart").value;
        var nbreMaxMatchs = parseInt(document.getElementById("nbre_matchs_01").value);

        // Filtrer les données pour obtenir uniquement les trajets démarrant de la ville sélectionnée
        var departures = data.filter(trajet => trajet.VilleDepart === villeDepart);

        // Créer un tableau temporaire pour stocker les destinations
        var tempArray = [];

        // Collecter toutes les destinations correspondant aux villes de départ sélectionnées
        departures.forEach(trajet => {
            tempArray.push({ destination: trajet.VilleDestination, details: trajet });
        });

        // Mélanger aléatoirement la liste des destinations pour garantir un ordre différent à chaque appel
        this.shuffleArray(tempArray);

        // Construire les résultats finaux à partir des destinations mélangées
        var randomResults = [];
        for (let i = 0; i < Math.min(nbreMaxMatchs, tempArray.length); i++) {
            randomResults.push(tempArray[i].details);
        }

        return randomResults;
    },





    // Mise à jour de l'affichage du slider
    updateOutput: function (sliderId, outputId) {
        var value = document.getElementById(sliderId).value;
        document.getElementById(outputId).textContent = value;
    },


    // On affiche le slider joli
    updateOutputPourcent: function (val) {
        document.getElementById('rangeOutput').value = val + ' %';  // Met à jour le contenu de l'output
        document.getElementById('rangeOutput').textContent = val + ' %';  // Ajoute aussi pour garantir l'affichage
    },


    // Mise à jour de l'affichage du tableau des résultats
    updateSelectedIndemnityValue: function () {
        // Récupérer la valeur sélectionnée du bouton radio
        var selectedRadio = document.querySelector('#indemniteChoisieDiv input[type="radio"]:checked');
        // Afficher la valeur sélectionnée dans la console
        if (selectedRadio) {
            //console.log('Valeur sélectionnée:', selectedRadio.value);
        } else {
            console.error('Aucun bouton radio n’est sélectionné.');
        }
    },


    setupRadioChangeListeners: function () {
        // Récupérer tous les boutons radio dans le div
        var radios = document.querySelectorAll('#indemniteChoisieDiv input[type="radio"]');
        // Ajouter un écouteur d'événements pour chaque bouton radio
        radios.forEach(function (radio) {
            radio.addEventListener('change', function () {
                //console.log('Nouvelle valeur sélectionnée:', radio.value);
            });
        });
    },

    // Création du formulaire pour le choix de l'indemnité
    createIndemniteChoisieDiv: function () {
        // Création de l'élément div pour le choix de l'indemnité
        const indemniteChoisieDiv = document.createElement('div');
        indemniteChoisieDiv.id = 'indemniteChoisieDiv';
        indemniteChoisieDiv.textContent = 'Montant des primes de préparation et d\'équipement (historique):';

        // Création de l'élément div pour le choix de l'indemnité
        const radioContainer = document.createElement('div');

        // Créer les options pour le choix de l'indemnité
        const indemniteOptions = [
            { value: 145, label: '145' },
            { value: 130, label: '130' },
            { value: 115, label: '115', checked: true },  // Pre-sélectionne 115
            { value: 100, label: '100' },
        ];

        // Créer les boutons radio pour chaque option
        for (const option of indemniteOptions) {
            // Créer l'input radio
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = `indemnite${option.value}`;
            radioInput.name = 'indemnite';
            radioInput.value = option.value;
            if (option.checked) {
                radioInput.checked = true;
            }
            // Créer le label pour l'input radio
            const radioLabel = document.createElement('label');
            radioLabel.htmlFor = radioInput.id;  // Lier le label à l'input
            radioLabel.textContent = option.label;

            // Ajouter l'input et le label au conteneur
            radioContainer.appendChild(radioInput);
            radioContainer.appendChild(radioLabel);
        }

        // Ajouter le conteneur des boutons radio à l'élément div
        indemniteChoisieDiv.appendChild(radioContainer);
        // Ajouter l'élément div au document
        return indemniteChoisieDiv;
    },


    // Créé le menu déroulant avec l'ensemble des villes disponibles lu dans le tableau data
    // Avec un tri par ordre croissant
    menuVilles: function () {
        // Récupération de l'élément conteneur pour le menu déroulant des villes de départ
        const selectContainer = document.getElementById("VilleDepart");
        // Insertion du menu déroulant des villes de départ dans l'élément conteneur
        if (selectContainer) {
            var villesDepartCount = {};

            // Compter les occurrences de chaque ville de départ
            data.forEach(function (trajet) {
                if (villesDepartCount[trajet.VilleDepart]) {
                    villesDepartCount[trajet.VilleDepart]++;
                } else {
                    villesDepartCount[trajet.VilleDepart] = 1;
                }
            });

            // Convertir l'objet en un tableau de tuples [ville, compteur], puis trier ce tableau
            var sortedVilles = Object.entries(villesDepartCount).sort(function (a, b) {
                return a[1] - b[1];  // Tri basé sur le compteur de manière ascendante
            });

            // Générer les options du menu déroulant en utilisant le tableau trié
            var options = "";
            var first = true;
            sortedVilles.forEach(function (item) {
                var ville = item[0];
                var count = item[1];
                var sel = "";
                if (first) {
                    sel = " selected";
                    first = false;
                }
                options += `<option value="${ville}"${sel}>${ville} (${count})</option>\n`;
            });
            selectContainer.innerHTML = options;
        } else {
            console.error("L'élément conteneur pour le menu des villes de départ n'existe pas dans le document.");
        }
    },


    // génération du menu du PRK avec des formules calculées selon la distance
    menuPRK: function () {
        var options = "";
        // Définition des catégories et formules selon la distance
        const categories = [
            { chevaux: "3 CV ou moins", formulas: ["0.456 * d", "(0.273 * d) + 915", "0.318 * d"] },
            { chevaux: "4 CV", formulas: ["0.523 * d", "(0.294 * d) + 1147", "0.352 * d"] },
            { chevaux: "5 CV", formulas: ["0.548 * d", "(0.308 * d) + 1200", "0.368 * d"] },
            { chevaux: "6 CV", formulas: ["0.574 * d", "(0.323 * d) + 1256", "0.386 * d"] },
            { chevaux: "7 CV ou plus", formulas: ["0.601 * d", "(0.340 * d) + 1301", "0.405 * d"] }
        ];

        categories.forEach((category) => {
            category.formulas.forEach((formula, index) => {
                var label = `${category.chevaux} => `;
                if (index === 0) {
                    label += "moins de 5 000 km";
                } else if (index === 1) {
                    label += "de 5001 à 20 000 km";
                } else {
                    label += "plus 20 000 km";
                }
                options += `<option value='${formula}'>${label}</option>\n`;
            });
        });

        document.getElementById("menuPRK").innerHTML = options;
    },


    // Affichage des résultats du tableau historique en fonction de la ville de départ sélectionnée
    updateHistoriqueVille: function () {


        // Récupération de la ville de départ sélectionnée
        var selectElement = document.getElementById("VilleDepart");
        if (!selectElement) {
            console.error("L'élément VilleDepart n'existe pas dans le document.");
            return; // Sortie de la fonction si l'élément VilleDepart n'existe pas
        }

        if (selectElement) {
            var VilleDepart = selectElement.value;

            // Filtrage des résultats pour la ville de départ sélectionnée
            var resultats_filtres = data.filter(function (trajet) {
                return trajet.VilleDepart === VilleDepart;
            });

            // Génération du tableau des résultats si des résultats ont été trouvés
            var tableauHtml = "";
            if (resultats_filtres.length > 0) {
                // Récupération du PRK de la voiture sélectionné
                var prkVoiture = parseFloat(document.getElementById('menuPRK').value);
                // Génération du tableau des résultats

                var tableauHtml = display.tableauComparatif(resultats_filtres, prkVoiture);

                // Récupération de l'élément conteneur pour le tableau des résultats
                var tableauContainer = document.getElementById("tableauComparatifDiv");

                // Affichage du tableau des résultats dans l'élément conteneur
                if (tableauContainer) {
                    tableauContainer.innerHTML = tableauHtml;
                } else {
                    console.error("L'élément conteneur pour le tableau historique n'existe pas dans le document.");
                }
            } else {
                // Aucun résultat trouvé pour la ville de départ sélectionnée
                console.log("Aucun résultat trouvé pour la ville de départ sélectionnée :", VilleDepart);
            }
        }
        else {
            console.error("L'élément VilleDepart n'existe pas dans le document.");
        }
    },


    // fonction de mélange aléatoire d'un tableau Fisher-Yates
    shuffleArray: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },


    tableauComparatif: function (resultats) {
        var etiquettes = ["Saison régulière", "Poule de relégation", "Phase finale"];
        var coutRepas = 17;  // Coût fixé pour les repas
        var coutHotel = 87;  // Coût fixé pour les hôtels

        var nbMatches = [
            parseInt(document.getElementById('nbre_matchs_01').value),
            parseInt(document.getElementById('nbre_matchs_02').value),
            parseInt(document.getElementById('nbre_matchs_03').value)
        ];

        // Récupération des grands déplacements
        var pourcentageGrandDeplacement = parseInt(document.getElementById('pourcentageGrandDeplacement').value);

        var tableauxHtml = etiquettes.map((etiquette, index) => {
            var prime = parseFloat(document.getElementById(`prime_montant_0${index + 1}`).value);
            var frais = parseFloat(document.getElementById(`frais_par_match0${index + 1}`).value);
            var formulePrk = document.getElementById("menuPRK").value;
            let colorPrimeBenefice = 0;
            let colorBeneficeReel = 0;
            let colorTotalBeneficeReel = 0;
            let colorTotalPrimeBenefice = 0;

            // Récupération de la valeur de l'indemnité choisie
            var valeurIndemnite = document.querySelector('#indemniteChoisieDiv input[type="radio"]:checked') ?
                parseInt(document.querySelector('#indemniteChoisieDiv input[type="radio"]:checked').value) : 115;

            var totalPRK = 0, totalKilometriques = 0, totalRepas = 0, totalHotels = 0, totalFrais = 0;
            var totalGrandDeplacement = 0, totalDistance = 0, totalPeages = 0, totalTempsTrajet = 0;
            var totalPrimes = 0, totalFraisHistorique = 0, totalPreparation = 0, totalBeneficeReel = 0, totalPrimeBenefice = 0;
            // Récupération du nombre de matchs à traiter
            var nbMatchs = nbMatches[index];
            var htmlTableau = `<h3>${etiquette} : ${nbMatchs} matchs.</h3><table id="tableauComparatif" class="Tableau01_AutoEntrepriseArray" border='3'><thead><tr><th>Domicile / Départ</th><th>Destination</th><th>Distance<br>aller/retour</th><th>Péages</th><th>Temps de trajet A/R</th><th>Grand déplacement</th><th>Indemnités kilométriques</th><th>PRK</th><th>Repas</th><th>Hôtel</th><th>Indemnité de préparation <br> et d'équipement</th><th>Note de frais historique <br>Chiffre d'affaire</th><th>Note de frais historique<br>bénéfices rééls</th><th>Prime<br>(chiffre d'affaire)</th><th>Frais</th><th>PRIMES<br>bénéfices rééls<br>(prime - frais - PRK)</th></tr></thead><tbody>`;

            // Itération sur les résultats pour les afficher dans le tableau
            var processedCount = 0;

            var graphData = [];  // Tableau pour collecter les données pour le graphe

            // Vérification si le nombre de matchs est supérieur au nombre de résultats
            if (resultats.length === 0) {
                console.error("Aucun résultat disponible pour le traitement.");
                return `<h3>${etiquette} : Aucun résultat disponible.</h3>`;
            }

            // Calcul du nombre de grands déplacements et de petits déplacements
            var nbGrandDeplacement = Math.round(nbMatches[index] * pourcentageGrandDeplacement);
            var matchTypes = new Array(nbMatches[index]).fill(0).map((_, idx) => idx < nbGrandDeplacement);

            // Boucle sur les résultats pour les afficher dans le tableau
            for (var i = 0; i < nbMatchs && processedCount < nbMatches[index]; i++) {
                var isLongDistance = matchTypes[i];
                var distance = isLongDistance ? 600 : 300;  // Utilisation des types de match mélangés pour assigner les distances
                var baseRepasCost = isLongDistance ? 2 * coutRepas : coutRepas;
                var hotelCost = isLongDistance ? coutHotel : 0;

                var trajet = resultats[i % resultats.length];
                // Vérification des données pour le calcul
                if (!trajet || !trajet.Km || !trajet.Peages) {
                    console.error("Données incomplètes pour l'index", i);
                    continue;
                }

                distance = parseFloat(trajet.Km * 2);  // Surcharge de la variable 'distance' pour refléter les vraies distances
                var prk = eval(formulePrk.replace('d', distance.toString()));  // Calcul du PRK, utilisation sécurisée de eval
                var grandDeplacement = distance > 500 ? 80 : 0;
                var repas = (distance > 500 ? 2 : 1) * coutRepas;
                var indemnites = distance * 0.410;
                var peages = parseFloat(trajet.Peages * 2);
                var fraisHistorique = peages + grandDeplacement + indemnites + repas + hotelCost + valeurIndemnite;
                var beneficeReel = fraisHistorique - (prk + repas + peages + hotelCost);
                var primeBenefice = prime - frais - prk;

                var TempsTrajetAllerRetour = (parseInt(trajet.TempsTrajet.split('h')[0]) * 60 + parseInt(trajet.TempsTrajet.split('h')[1])) * 2;

                // Peuplement des données pour le graphique
                // Peuplement du tableau temporaire qui va servir pour la génération du graphe

                graphData.push({
                    processedCount: processedCount,
                    //fraisHistorique: fraisHistorique.toFixed(2),
                    beneficeReel: beneficeReel.toFixed(2),
                    //prime: prime.toFixed(2),
                    primeBenefice: primeBenefice.toFixed(2)
                });
    

                // Mise en format du tableau HTML
                htmlTableau += `<tr><td>${trajet.VilleDepart}</td><td>${trajet.VilleDestination}</td><td>${distance} Km</td><td>${peages} €</td><td>${Math.floor(TempsTrajetAllerRetour / 60)}h${TempsTrajetAllerRetour % 60} min</td><td>${grandDeplacement} €</td><td>${indemnites.toFixed(2)} €</td><td>${prk.toFixed(2)} €</td><td>${repas.toFixed(2)} €</td><td>${hotelCost.toFixed(2)} €</td><td>${valeurIndemnite} €</td><td>${fraisHistorique.toFixed(2)} €</td><td style="${beneficeReel < 0 ? "color:red;" : ""}">${beneficeReel.toFixed(2)} €</td><td>${prime.toFixed(2)} €</td><td>${frais.toFixed(2)} €</td><td style="${primeBenefice < 0 ? "color:red;" : ""}">${primeBenefice.toFixed(2)} €</td></tr>`;

                // Mise à jour des totaux
                totalDistance += distance;
                totalPeages += peages;
                totalTempsTrajet += TempsTrajetAllerRetour;
                totalKilometriques += indemnites;
                totalRepas += repas;
                totalHotels += hotelCost;
                totalGrandDeplacement += grandDeplacement;
                totalPrimes += prime;
                totalFrais += frais;
                totalFraisHistorique += fraisHistorique;
                totalPreparation += valeurIndemnite;
                totalBeneficeReel += beneficeReel;
                totalPrimeBenefice += primeBenefice;
                totalPRK += prk;
                processedCount++;

            };

            var totalHeuresTrajet = Math.floor(totalTempsTrajet / 60);
            var tauxHoraireIndemnite = totalBeneficeReel / totalHeuresTrajet;
            var tauxHorairePrime = totalPrimeBenefice / totalHeuresTrajet;

            // Si jamais le résultat est négatif, alors on le met en rouge
            colorTotalBeneficeReel = totalBeneficeReel < 0 ? "color:red;" : "";
            colorTotalPrimeBenefice = totalPrimeBenefice < 0 ? "color:red;" : "";

            htmlTableau += `</tbody><tfoot><tr class="totalRow"><td>TOTAUX</td><td>${nbMatchs} matchs</td><td>${totalDistance} km</td><td>${totalPeages.toFixed(2)} €</td><td>${Math.floor(totalTempsTrajet / 60)}h${totalTempsTrajet % 60}</td><td>${totalGrandDeplacement.toFixed(2)} €</td><td>${totalKilometriques.toFixed(2)} €</td><td>${totalPRK.toFixed(2)} €</td><td>${totalRepas.toFixed(2)} €</td><td>${totalHotels.toFixed(2)} €</td><td>${totalPreparation.toFixed(2)} €</td><td>${totalFraisHistorique.toFixed(2)} €</td><td style ="${colorTotalBeneficeReel}">${totalBeneficeReel.toFixed(2)} €</td><td>${totalPrimes.toFixed(2)} €</td><td>${totalFrais.toFixed(2)} €</td><td style ="${colorTotalPrimeBenefice}">${totalPrimeBenefice.toFixed(2)} €</td></tr></tfoot></table>`;
            htmlTableau += `<table><tr><td colspan='1'>Taux horaire moyen basé sur l'indemnité : ${tauxHoraireIndemnite.toFixed(2)} €/heure</td></tr>`;
            htmlTableau += `<tr><td colspan='8'>Taux horaire moyen basé sur la prime : ${tauxHorairePrime.toFixed(2)} €/heure</td></tr>`;
            htmlTableau += `</table>`;

            console.log("DISPLAY : données pour le graphique " + index + ": ", graphData);
            //generateGraphs(graphData, `canvasId-${index}`);  // Ensure unique canvas ID for each graph
            generateGraphsPlot(graphData, "canvas01");
            

            return htmlTableau;
        }); // fin de la boucle sur les étiquettes : tableauxHtml






        return tableauxHtml.join('<br>');
    }, // Fin de la fonction


    // Mise à jour du tableau historique avec le PRKVoiture sélectionné
    updateHistoriquePRK: function () {
        // Test si le menu déroulant pour le PRKVoiture existe dans le document
        if (document.getElementById("menuPRK")) {
            // Récupérer la valeur sélectionnée du PRKVoiture dans le menu déroulant
            var prkVoiture = document.getElementById("menuPRK").value;
            // Récupérer l'élément conteneur du tableau des résultats
            var tableauContainer = document.getElementById("tableauComparatifDiv");

            if (tableauContainer) {
                // Mettre à jour le contenu du tableau des résultats avec les données et le PRKVoiture sélectionné
                tableauContainer.innerHTML = display.tableauComparatif(resultats, prkVoiture);


            } else {
                console.error("L'élément conteneur pour le tableau historique des résultats n'existe pas dans le document.");
            }
        }
    },


    // Mise à jour de l'ensemble des tableaux prévisionnels de la fédération
    updateTableauxFederation: function () {



        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 1 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("cell4_1").innerHTML = pourcentage_urssaf + " %"; // % URSSAF
        document.getElementById("cell5_1").innerHTML = cotisations_urssaf_par_match_01.toLocaleString('fr-FR') + " €"; // Cotisations URSSAF par match (match 1)
        document.getElementById("cell6_1").innerHTML = net_match_01.toLocaleString('fr-FR') + " €"; // Net par match (match 1)
        document.getElementById("cell7_1").innerHTML = brut_annuel_01.toLocaleString('fr-FR') + " €"; // Brut annuel 
        document.getElementById("cell8_1").innerHTML = cotisations_annuelles_01.toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("cell9_1").innerHTML = net_urssaf_annuel_01.toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("cell10_1").innerHTML = frais_par_match01.toLocaleString('fr-FR') + " €"; // Nos frais par match
        document.getElementById("cell11_1").innerHTML = frais_annuel_01.toLocaleString('fr-FR') + " €"; // Nos frais de l'ensemble des matchs annuels
        document.getElementById("cell12_1").innerHTML = resultat_net_01.toLocaleString('fr-FR') + " €"; // Caillasse annuelle

        // Ligne 2
        document.getElementById("cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("cell4_2").innerHTML = pourcentage_urssaf + " %"; // % URSSAF
        document.getElementById("cell5_2").innerHTML = cotisations_urssaf_par_match_02 + " €"; // Cotisations URSSAF par match (match 2)
        document.getElementById("cell6_2").innerHTML = net_match_02.toLocaleString('fr-FR') + " €"; // Net par match (match 2)
        document.getElementById("cell7_2").innerHTML = brut_annuel_02.toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("cell8_2").innerHTML = cotisations_annuelles_02.toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("cell9_2").innerHTML = net_urssaf_annuel_02.toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €"; // Nos frais par match
        document.getElementById("cell11_2").innerHTML = frais_annuel_02.toLocaleString('fr-FR') + " €"; // Nos frais de l'ensemble des matchs annuels
        document.getElementById("cell12_2").innerHTML = resultat_net_02.toLocaleString('fr-FR') + " €"; // Caillasse annuelle

        // Ligne 3
        document.getElementById("cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("cell4_3").innerHTML = pourcentage_urssaf + " %"; // % URSSAF
        document.getElementById("cell5_3").innerHTML = cotisations_urssaf_par_match_03 + " €"; // Cotisations URSSAF par match (match 3)
        document.getElementById("cell6_3").innerHTML = net_match_03 + " €"; // Net par match (match 3)
        document.getElementById("cell7_3").innerHTML = brut_annuel_03.toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("cell8_3").innerHTML = cotisations_annuelles_03.toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("cell9_3").innerHTML = net_urssaf_annuel_03.toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €"; // Nos frais par match
        document.getElementById("cell11_3").innerHTML = frais_annuel_03.toLocaleString('fr-FR') + " €"; // Nos frais de l'ensemble des matchs annuels
        document.getElementById("cell12_3").innerHTML = resultat_net_03.toLocaleString('fr-FR') + " €"; // Caillasse annuelle

        // Ligne 4 => Sommes annuelles
        const totalmatch = parseInt(nbre_matchs_01) + parseInt(nbre_matchs_02) + parseInt(nbre_matchs_03);
        document.getElementById("cell2_4").innerHTML = totalmatch.toLocaleString('fr-FR'); // Nombre de matchs ANNUEL

        document.getElementById("cell7_4").innerHTML = (brut_annuel_01 + brut_annuel_02 + brut_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("cell8_4").innerHTML = (cotisations_annuelles_01 + cotisations_annuelles_02 + cotisations_annuelles_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations sur la saison
        document.getElementById("cell9_4").innerHTML = (net_urssaf_annuel_01 + net_urssaf_annuel_02 + net_urssaf_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets sur la saison
        document.getElementById("cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais sur la saison
        document.getElementById("cell12_4").innerHTML = (resultat_net_01 + resultat_net_02 + resultat_net_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des résultats sur la saison

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 2 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("tns_ir_cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("tns_ir_cell4_1").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_ir_cell5_1").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 1)
        document.getElementById("tns_ir_cell6_1").innerHTML = (urssaf_zero + prime_montant_01).toLocaleString('fr-FR') + " €"; // Net par match (match 1)
        document.getElementById("tns_ir_cell7_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_ir_cell8_1").innerHTML = urssaf_zero * nbre_matchs_01 + " €"; // Cotisations annuelles
        document.getElementById("tns_ir_cell9_1").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("tns_ir_cell10_1").innerHTML = frais_par_match01.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("tns_ir_cell11_1").innerHTML = frais_annuel_01.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_ir_cell12_1").innerHTML = resultat_intermediaire_01 + " €"; // Resultat intermédiaire

        document.getElementById("tns_ir_cell13_1").innerHTML = frais_banque + " €"; // Frais annexes

        // colone 15 ligne 1 - cotisations sociales
        document.getElementById("tns_ir_cell15_1").innerHTML = CotisationsSociales.toLocaleString('fr-FR') + " €"; // Cotisations sociales

        document.getElementById("tns_ir_cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("tns_ir_cell4_2").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_ir_cell5_2").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 2)
        document.getElementById("tns_ir_cell6_2").innerHTML = urssaf_zero + prime_montant_02 + " €"; // Net par match (match 2)
        document.getElementById("tns_ir_cell7_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_ir_cell8_2").innerHTML = urssaf_zero * nbre_matchs_02 + " €"; // Cotisations annuelles
        document.getElementById("tns_ir_cell9_2").innerHTML = (urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("tns_ir_cell10_2").innerHTML = frais_par_match02 + " €"; // Frais par match
        document.getElementById("tns_ir_cell11_2").innerHTML = frais_annuel_02.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_ir_cell12_2").innerHTML = resultat_intermediaire_02.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("tns_ir_cell13_2").innerHTML = frais_comptable.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("tns_ir_cell15_2").innerHTML = Salaires.toLocaleString('fr-FR') + " €"; // Salaires
        document.getElementById("tns_ir_cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("tns_ir_cell4_3").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_ir_cell5_3").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 3)
        document.getElementById("tns_ir_cell6_3").innerHTML = urssaf_zero + prime_montant_03 + " €"; // Net par match (match 3)
        document.getElementById("tns_ir_cell7_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_ir_cell8_3").innerHTML = urssaf_zero * nbre_matchs_03 + " €"; // Cotisations annuelles
        document.getElementById("tns_ir_cell9_3").innerHTML = (urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("tns_ir_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("tns_ir_cell11_3").innerHTML = frais_annuel_03.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_ir_cell12_3").innerHTML = resultat_intermediaire_03.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("tns_ir_cell13_3").innerHTML = frais_urssaf.toLocaleString('fr-FR') + " €"; // Frais URSSAF
        // IR colone 15 ligne 3
        document.getElementById("tns_ir_cell15_3").innerHTML = (impotsSurLeRevenu.toFixed(2)).toLocaleString('fr-FR') + " €"; // impots sur le revenu
        // Ligne 4 => Sommes annuelles
        document.getElementById("tns_ir_cell2_4").innerHTML = totalmatch.toLocaleString('fr-FR'); // Nombre de matchs ANNUEL
        document.getElementById("tns_ir_cell7_4").innerHTML = (nbre_matchs_01 * prime_montant_01 + nbre_matchs_02 * prime_montant_02 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("tns_ir_cell8_4").innerHTML = (urssaf_zero * nbre_matchs_01 + urssaf_zero * nbre_matchs_02 + urssaf_zero * nbre_matchs_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations URSSAF
        document.getElementById("tns_ir_cell9_4").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01 + urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02 + urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets d'URSSAF
        document.getElementById("tns_ir_cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais sur la saison
        document.getElementById("tns_ir_cell12_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des résultats sur la saison
        document.getElementById("tns_ir_cell13_4").innerHTML = (frais_banque + frais_comptable + frais_urssaf).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison
        document.getElementById("tns_ir_cell14_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 - frais_banque - frais_comptable - frais_urssaf).toLocaleString('fr-FR') + " €"; // Résultat net
        document.getElementById("tns_ir_cell15_4").innerHTML = (AC16 - impotsSurLeRevenu).toLocaleString('fr-FR') + " €"; // impots sur le revenu
        document.getElementById("tns_ir_cell16_4").innerHTML = AC16.toLocaleString('fr-FR'); // impots sur le revenu

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 3 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("tns_is_cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("tns_is_cell4_1").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_is_cell5_1").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 1)
        document.getElementById("tns_is_cell6_1").innerHTML = urssaf_zero + prime_montant_01 + " €"; // Net par match (match 1)
        document.getElementById("tns_is_cell7_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_is_cell8_1").innerHTML = (urssaf_zero * nbre_matchs_01).toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("tns_is_cell9_1").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("tns_is_cell10_1").innerHTML = (frais_par_match01).toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("tns_is_cell11_1").innerHTML = (frais_annuel_01).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_is_cell12_1").innerHTML = (resultat_intermediaire_01).toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("tns_is_cell13_1").innerHTML = frais_banque + " €"; // Frais annexes

        // Ligne 2
        document.getElementById("tns_is_cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("tns_is_cell4_2").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_is_cell5_2").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 2)
        document.getElementById("tns_is_cell6_2").innerHTML = (urssaf_zero + prime_montant_02).toLocaleString('fr-FR') + " €"; // Net par match (match 2)
        document.getElementById("tns_is_cell7_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_is_cell8_2").innerHTML = urssaf_zero * nbre_matchs_02 + " €"; // Cotisations annuelles
        document.getElementById("tns_is_cell9_2").innerHTML = (urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("tns_is_cell10_2").innerHTML = frais_par_match02 + " €"; // Frais par match
        document.getElementById("tns_is_cell11_2").innerHTML = (frais_annuel_02).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_is_cell12_2").innerHTML = resultat_intermediaire_02.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("tns_is_cell13_2").innerHTML = frais_comptable + " €"; // Frais annexes

        document.getElementById("tns_is_cell15_2").innerHTML = (resultat_net_is_TNS * (15 / 100)).toLocaleString('fr-FR') + " €"; // Salaires
        document.getElementById("tns_is_cell16_2").innerHTML = montantFinal.toLocaleString('fr-FR') + " €"; // Impot sur les dividendes

        // Ligne 3
        document.getElementById("tns_is_cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("tns_is_cell4_3").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_is_cell5_3").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 3)
        document.getElementById("tns_is_cell6_3").innerHTML = (urssaf_zero + prime_montant_03).toLocaleString('fr-FR') + " €"; // Net par match (match 3)
        document.getElementById("tns_is_cell7_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_is_cell8_3").innerHTML = urssaf_zero * nbre_matchs_03 + " €"; // Cotisations annuelles
        document.getElementById("tns_is_cell9_3").innerHTML = (urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel

        document.getElementById("tns_is_cell10_3").innerHTML = frais_par_match03 + " €"; // Frais par match
        document.getElementById("tns_is_cell11_3").innerHTML = (frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais

        document.getElementById("tns_is_cell12_3").innerHTML = resultat_intermediaire_03.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("tns_is_cell13_3").innerHTML = frais_urssaf.toLocaleString('fr-FR') + " €"; // Frais annexes

        // Ligne 4 => Sommes annuelles
        document.getElementById("tns_is_cell2_4").innerHTML = totalmatch; // Nombre de matchs ANNUEL
        document.getElementById("tns_is_cell7_4").innerHTML = (brut_annuel_01 + brut_annuel_02 + brut_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("tns_is_cell8_4").innerHTML = (urssaf_zero * nbre_matchs_01 + urssaf_zero * nbre_matchs_02 + urssaf_zero * nbre_matchs_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations URSSAF
        document.getElementById("tns_is_cell9_4").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01 + urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02 + urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets d'URSSAF
        document.getElementById("tns_is_cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais sur la saison
        document.getElementById("tns_is_cell12_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des résultats sur la saison
        document.getElementById("tns_is_cell13_4").innerHTML = (frais_banque + frais_comptable + frais_urssaf).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison
        document.getElementById("tns_is_cell14_4").innerHTML = resultat_net_is_TNS.toLocaleString('fr-FR') + " €"; // Résultat net
        // Résultat net - AC22
        //console.log("AC24 : " + AC24);
        document.getElementById("tns_is_cell15_4").innerHTML = AC24.toLocaleString('fr-FR') + " €"; // impots sur le revenu

        document.getElementById("tns_is_cell16_4").innerHTML = (AC24 * (1 - ((30 / 100)))).toLocaleString('fr-FR') + " €"; // impots sur le revenu

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 4 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("sasu_ir_cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("sasu_ir_cell4_1").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_ir_cell5_1").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 1)
        document.getElementById("sasu_ir_cell6_1").innerHTML = (urssaf_zero + prime_montant_01).toLocaleString('fr-FR') + " €"; // Net par match (match 1)
        document.getElementById("sasu_ir_cell7_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_ir_cell8_1").innerHTML = (urssaf_zero * nbre_matchs_01).toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("sasu_ir_cell9_1").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("sasu_ir_cell10_1").innerHTML = frais_par_match01.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_ir_cell11_1").innerHTML = frais_annuel_01.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_ir_cell12_1").innerHTML = resultat_intermediaire_01.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("sasu_ir_cell13_1").innerHTML = (frais_banque + frais_comptable + frais_urssaf).toLocaleString('fr-FR') + " €"; // Frais annexes

        // Ligne 2
        document.getElementById("sasu_ir_cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("sasu_ir_cell4_2").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_ir_cell5_2").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 2)
        document.getElementById("sasu_ir_cell6_2").innerHTML = (urssaf_zero + prime_montant_02).toLocaleString('fr-FR') + " €"; // Net par match (match 2)
        document.getElementById("sasu_ir_cell7_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_ir_cell8_2").innerHTML = urssaf_zero * nbre_matchs_02.toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("sasu_ir_cell9_2").innerHTML = (urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("sasu_ir_cell10_2").innerHTML = (frais_par_match02).toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_ir_cell11_2").innerHTML = frais_annuel_02.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_ir_cell12_2").innerHTML = resultat_intermediaire_02.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire

        // Ligne 3
        document.getElementById("sasu_ir_cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("sasu_ir_cell4_3").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_ir_cell5_3").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 3)
        document.getElementById("sasu_ir_cell6_3").innerHTML = (urssaf_zero + prime_montant_03).toLocaleString('fr-FR') + " €"; // Net par match (match 3)
        document.getElementById("sasu_ir_cell7_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_ir_cell8_3").innerHTML = urssaf_zero * nbre_matchs_03 + " €"; // Cotisations annuelles
        document.getElementById("sasu_ir_cell9_3").innerHTML = (urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("sasu_ir_cell10_3").innerHTML = (frais_par_match03).toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_ir_cell11_3").innerHTML = frais_annuel_03.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_ir_cell12_3").innerHTML = resultat_intermediaire_03.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire

        // Ligne 4
        document.getElementById("sasu_ir_cell2_4").innerHTML = totalmatch; // Nombre de matchs ANNUEL
        document.getElementById("sasu_ir_cell7_4").innerHTML = (brut_annuel_01 + brut_annuel_02 + brut_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("sasu_ir_cell8_4").innerHTML = (urssaf_zero * nbre_matchs_01 + urssaf_zero * nbre_matchs_02 + urssaf_zero * nbre_matchs_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations URSSAF
        document.getElementById("sasu_ir_cell9_4").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01 + urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02 + urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets d'URSSAF
        document.getElementById("sasu_ir_cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_ir_cell12_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des résultats sur la saison

        const resultat_intermediaire_total = resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03;
        document.getElementById("sasu_ir_cell13_1").innerHTML = frais_banque + " €"; // Frais annexes
        document.getElementById("sasu_ir_cell13_2").innerHTML = frais_comptable + " €"; // Frais annexes
        document.getElementById("sasu_ir_cell13_4").innerHTML = (frais_banque + frais_comptable).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison

        document.getElementById("sasu_ir_cell14_4").innerHTML = (resultat_intermediaire_total - frais_banque - frais_comptable).toLocaleString('fr-FR') + " €"; // Résultat net
        document.getElementById("sasu_ir_cell15_2").innerHTML = ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15).toLocaleString('fr-FR') + " €"; // impots sur le revenu

        const resultatApresIS = (resultat_intermediaire_total - frais_banque - frais_comptable) - (resultat_intermediaire_total - frais_banque - frais_comptable * 0.15);

        document.getElementById("sasu_ir_cell15_4").innerHTML = ((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15)).toLocaleString('fr-FR') + " €"; // impots sur le revenu
        document.getElementById("sasu_ir_cell16_2").innerHTML = (((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15)) * 0.30).toLocaleString('fr-FR') + " €"; // impots sur le revenu
        document.getElementById("sasu_ir_cell16_4").innerHTML = (((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15)) -
            ((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15)) * 0.30).toLocaleString('fr-FR') + " €"; // impots sur le revenu


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 5 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("sasu_is_cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("sasu_is_cell4_1").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_is_cell5_1").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 1)
        document.getElementById("sasu_is_cell6_1").innerHTML = urssaf_zero + prime_montant_01 + " €"; // Net par match (match 1)
        document.getElementById("sasu_is_cell7_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_is_cell8_1").innerHTML = urssaf_zero * nbre_matchs_01 + " €"; // Cotisations annuelles
        document.getElementById("sasu_is_cell9_1").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("sasu_is_cell10_1").innerHTML = (frais_par_match01).toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_is_cell11_1").innerHTML = frais_annuel_01.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_is_cell12_1").innerHTML = resultat_net_01.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("sasu_is_cell13_1").innerHTML = frais_banque + frais_comptable + frais_urssaf.toLocaleString('fr-FR') + " €"; // Frais annexes

        document.getElementById("sasu_is_cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("sasu_is_cell4_2").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_is_cell5_2").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 2)
        document.getElementById("sasu_is_cell6_2").innerHTML = (urssaf_zero + prime_montant_02).toLocaleString('fr-FR') + " €"; // Net par match (match 2)
        document.getElementById("sasu_is_cell7_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_is_cell8_2").innerHTML = urssaf_zero * nbre_matchs_02 + " €"; // Cotisations annuelles
        document.getElementById("sasu_is_cell9_2").innerHTML = (urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("sasu_is_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_is_cell11_2").innerHTML = frais_annuel_02.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_is_cell13_2").innerHTML = frais_comptable.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("sasu_is_cell16_2").innerHTML = montantFinal.toFixed(2).toLocaleString('fr-FR') + " €"; // Impot sur les dividendes

        document.getElementById("sasu_is_cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("sasu_is_cell4_3").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_is_cell5_3").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 3)
        document.getElementById("sasu_is_cell6_3").innerHTML = urssaf_zero + prime_montant_03 + " €"; // Net par match (match 3)
        document.getElementById("sasu_is_cell7_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_is_cell8_3").innerHTML = urssaf_zero * nbre_matchs_03 + " €"; // Cotisations annuelles
        document.getElementById("sasu_is_cell9_3").innerHTML = (urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("sasu_is_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_is_cell11_3").innerHTML = frais_annuel_03.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_is_cell12_3").innerHTML = resultat_intermediaire_03.toLocaleString('fr-FR').toLocaleString('fr-FR') + " €"; // Resultat intermédiaire

        document.getElementById("sasu_is_cell12_2").innerHTML = resultat_intermediaire_02.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("sasu_is_cell13_3").innerHTML = frais_urssaf.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("sasu_is_cell12_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des résultats sur la saison

        //console.log(frais_banque);
        document.getElementById("sasu_is_cell13_1").innerHTML = frais_banque.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("sasu_is_cell13_2").innerHTML = frais_comptable.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("sasu_is_cell13_4").innerHTML = (frais_banque + frais_comptable).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison

        // Ligne 4 => Sommes annuelles
        document.getElementById("sasu_is_cell2_4").innerHTML = totalmatch; // Nombre de matchs ANNUEL
        document.getElementById("sasu_is_cell7_4").innerHTML = (brut_annuel_01 + brut_annuel_02 + brut_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("sasu_is_cell8_4").innerHTML = (urssaf_zero * nbre_matchs_01 + urssaf_zero * nbre_matchs_02 + urssaf_zero * nbre_matchs_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations URSSAF
        document.getElementById("sasu_is_cell9_4").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01 + urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02 + urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets d'URSSAF
        document.getElementById("sasu_is_cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais sur la saison
        document.getElementById("sasu_is_cell14_4").innerHTML = (resultat_intermediaire_total - frais_banque - frais_comptable).toLocaleString('fr-FR') + " €"; // Sommes annuelle des résultats sur la saison
        document.getElementById("sasu_is_cell15_2").innerHTML = ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison

        const ResultatApresIS_temp = ((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15)).toFixed(2);
        document.getElementById("sasu_is_cell15_4").innerHTML = ResultatApresIS_temp.toLocaleString('fr-FR') + " €"; // impots sur le revenu

        const MontantRevenuImposable = (ResultatApresIS_temp * 0.60) - (0.068 * ResultatApresIS_temp);
        document.getElementById("sasu_is_cell16_1").innerHTML = "Montant revenus imposable : " + MontantRevenuImposable.toLocaleString('fr-FR') + " €"; // impots sur le revenu
        document.getElementById("sasu_is_cell16_2").innerHTML = "Prélèvements sociaux : " + (ResultatApresIS_temp * CSG_CR).toLocaleString('fr-FR') + " €"; // Prélèvement sociaux

        // Utilisation de la fonction pour calculer la taxe
        const resultatPrelevementSociaux = calculerPrelevementSociaux(MontantRevenuImposable, tranches, taux);
        document.getElementById("sasu_is_cell16_3").innerHTML = "Prélèvement sur barême fiscal : " + resultatPrelevementSociaux.toLocaleString('fr-FR') + " €"; // Prélevement sur bareme fiscal ligne 3 - BUG !!
        document.getElementById("sasu_is_cell16_4").innerHTML = (ResultatApresIS_temp - (ResultatApresIS_temp * CSG_CR) - resultatPrelevementSociaux).toLocaleString('fr-FR') + " €"; // Total


        // Mise à jour des tableaux prévisionnels de la fédération des paramètres modifiés par les sliders
        var resultats = display.getCurrentResults();  // Vous devrez définir cette méthode pour récupérer les données actuelles
        var prkVoiture = document.getElementById("menuPRK").value;
        var tableauContainer = document.getElementById("tableauComparatifDiv");
        if (tableauContainer) {
            tableauContainer.innerHTML = display.tableauComparatif(resultats, prkVoiture);
        } else {
            console.error("Le conteneur du tableau n'existe pas.");
        }

    },


    // Mise à jour dans les tableaux prévisionnels de la fédération des paramètres modifiés par les sliders
    updatePrimeMontant: function () {
        prime_montant_01 = document.getElementById("prime_montant_01").value;
        document.getElementById("cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_ir_cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";

        prime_montant_02 = document.getElementById("prime_montant_02").value;
        document.getElementById("cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_ir_cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";

        prime_montant_03 = document.getElementById("prime_montant_03").value;
        document.getElementById("cell3_3").innerHTML = prime_montant_03 + " €";
        document.getElementById("tns_ir_cell3_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell3_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell3_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell3_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €";

        frais_par_match01 = document.getElementById("frais_par_match01").value;
        document.getElementById("cell10_1").innerHTML = frais_par_match01 + " €";
        document.getElementById("tns_ir_cell10_1").innerHTML = frais_par_match01 + " €";
        document.getElementById("tns_is_cell10_1").innerHTML = frais_par_match01 + " €";
        document.getElementById("sasu_ir_cell10_1").innerHTML = frais_par_match01 + " €";
        document.getElementById("sasu_is_cell10_1").innerHTML = frais_par_match01 + " €";

        frais_par_match02 = document.getElementById("frais_par_match02").value;
        document.getElementById("cell10_2").innerHTML = frais_par_match02 + " €";
        document.getElementById("tns_ir_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €";

        frais_par_match03 = document.getElementById("frais_par_match03").value;
        document.getElementById("cell10_3").innerHTML = frais_par_match03 + " €";
        document.getElementById("tns_ir_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €";

        nbre_matchs_01 = document.getElementById("nbre_matchs_01").value;
        document.getElementById("cell2_1").innerHTML = nbre_matchs_01;
        document.getElementById("tns_ir_cell2_1").innerHTML = nbre_matchs_01;
        document.getElementById("tns_is_cell2_1").innerHTML = nbre_matchs_01;
        document.getElementById("sasu_ir_cell2_1").innerHTML = nbre_matchs_01;
        document.getElementById("sasu_is_cell2_1").innerHTML = nbre_matchs_01;

        nbre_matchs_02 = document.getElementById("nbre_matchs_02").value;
        document.getElementById("cell2_2").innerHTML = nbre_matchs_02;
        document.getElementById("tns_ir_cell2_2").innerHTML = nbre_matchs_02;
        document.getElementById("tns_is_cell2_2").innerHTML = nbre_matchs_02;
        document.getElementById("sasu_ir_cell2_2").innerHTML = nbre_matchs_02;
        document.getElementById("sasu_is_cell2_2").innerHTML = nbre_matchs_02;

        nbre_matchs_03 = document.getElementById("nbre_matchs_03").value;
        document.getElementById("cell2_3").innerHTML = nbre_matchs_03;
        document.getElementById("tns_ir_cell2_3").innerHTML = nbre_matchs_03;
        document.getElementById("tns_is_cell2_3").innerHTML = nbre_matchs_03;
        document.getElementById("sasu_ir_cell2_3").innerHTML = nbre_matchs_03;
        document.getElementById("sasu_is_cell2_3").innerHTML = nbre_matchs_03;

        // Calcul des cotisations URSSAF
        cotisations_urssaf_par_match_01 = prime_montant_01 * (pourcentage_urssaf / 100);
        cotisations_urssaf_par_match_02 = prime_montant_02 * (pourcentage_urssaf / 100);
        cotisations_urssaf_par_match_03 = prime_montant_03 * (pourcentage_urssaf / 100);
    },


    // Mise à jour des valeurs affichées des sliders
    updateSliderValues: function () {
        document.getElementById("valeur_prime_01").textContent = document.getElementById("prime_montant_01").value;
        document.getElementById("valeur_prime_02").textContent = document.getElementById("prime_montant_02").value;
        document.getElementById("valeur_prime_03").textContent = document.getElementById("prime_montant_03").value;

        document.getElementById("valeur_frais_01").textContent = document.getElementById("frais_par_match01").value;
        document.getElementById("valeur_frais_02").textContent = document.getElementById("frais_par_match02").value;
        document.getElementById("valeur_frais_03").textContent = document.getElementById("frais_par_match03").value;

        document.getElementById("valeur_match_01").textContent = document.getElementById("nbre_matchs_01").value;
        document.getElementById("valeur_match_02").textContent = document.getElementById("nbre_matchs_02").value;
        document.getElementById("valeur_match_03").textContent = document.getElementById("nbre_matchs_03").value;


    },


    // Actualise le tableau historique de façon globable
    updateHistorique: function () {
        display.updateHistoriquePRK();
        display.updateHistoriqueVille();


    }
}; // EOF display



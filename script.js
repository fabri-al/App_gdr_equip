const pulsante = document.getElementById("aggiungi-riga");
const corpoTabella = document.querySelector("tbody");

const tipi = ["arma", "armatura", "pozione"];

// Nome con cui i dati vengono salvati nel browser
const CHIAVE = "equipaggiamento";

function creaSelect() {
    const select = document.createElement("select");

    const vuota = document.createElement("option");
    vuota.value = "";
    select.appendChild(vuota);

    tipi.forEach(tipo => {
        const opzione = document.createElement("option");
        opzione.value = tipo;
        opzione.textContent = tipo;
        select.appendChild(opzione);
    });

    return select;
}

function creaInput(tipo) {
    const input = document.createElement("input");
    input.type = tipo;
    return input;
}

function creaCella(elemento) {
    const cella = document.createElement("td");
    cella.appendChild(elemento);
    return cella;
}

function creaRiga() {
    const riga = document.createElement("tr");
    riga.appendChild(creaCella(creaSelect()));

    const quantita = creaInput("number");
    quantita.min = 0;
    quantita.value = 1;
    riga.appendChild(creaCella(quantita));

    for (let i = 0; i < 3; i++) {
        riga.appendChild(creaCella(creaInput("text")));
    }

    const peso = creaInput("number");
    peso.min = 0;
    peso.step = "0.05";
    peso.value = 0.05;
    riga.appendChild(creaCella(peso));

    return riga;
}

// Aggiunge una riga con il bottone e la restituisce
function aggiungiRiga() {
    const nuovaRiga = creaRiga();

    const cellaBottone = document.createElement("td");
    cellaBottone.appendChild(pulsante);
    nuovaRiga.appendChild(cellaBottone);

    corpoTabella.appendChild(nuovaRiga);
    return nuovaRiga;
}


// Legge tutti i campi della tabella e li salva nel browser
function salva() {
    const dati = [];

    corpoTabella.querySelectorAll("tr").forEach(riga => {
        const valori = [];

        // il bottone non è né select né input quindi viene saltato
        riga.querySelectorAll("select, input").forEach(campo => {
            valori.push(campo.value);
        });
        dati.push(valori);
    });

    localStorage.setItem(CHIAVE, JSON.stringify(dati));
}

// Ricrea le righe salvate e se non c'è nulla parte con una riga vuota
function ripristina() {
    let dati = [];

    try {
        dati = JSON.parse(localStorage.getItem(CHIAVE)) || [];
    } catch (errore) {
        dati = [];
    }

    if (!Array.isArray(dati) || dati.length === 0) {
        aggiungiRiga();
        return;
    }

    dati.forEach(valori => {
        const riga = aggiungiRiga();
        const campi = riga.querySelectorAll("select, input");

        valori.forEach((valore, i) => {
            if (campi[i]) {
                campi[i].value = valore;
            }
        });
    });
}

// Il bottone aggiunge una nuova riga e salva
pulsante.addEventListener("click", () => {
    aggiungiRiga();
    salva();
});

// Salva ogni volta che si modifica un campo
corpoTabella.addEventListener("input", salva);

// Quando si apre la pagina
ripristina();
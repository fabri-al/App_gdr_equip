const pulsante = document.getElementById("aggiungi-riga");
const corpoTabella = document.querySelector("tbody");

// Categorie del menu "Tipo": per aggiungerne una, scriverla qui
const tipi = ["arma", "armatura", "pozione"];

// Nome con cui i dati vengono salvati nel browser
const CHIAVE = "equipaggiamento";

function creaSelect() {
    const select = document.createElement("select");

    // L'opzione vuota fa partire ogni riga senza categoria scelta
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

// Crea una riga con i 6 campi (tipo, quantità, nome, descrizione, note, peso)
function creaRiga() {
    const riga = document.createElement("tr");
    riga.appendChild(creaCella(creaSelect()));

    const quantita = creaInput("number");
    quantita.min = 0;
    quantita.value = 1;
    riga.appendChild(creaCella(quantita));

    // Nome, descrizione e note: tre campi di testo
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

// Aggiunge una riga con i bottoni - e + e la restituisce.
// Il - è nuovo in ogni riga; il + è un solo elemento e, aggiungendolo
// alla nuova riga, si sposta lì (un elemento può stare in un solo posto)
function aggiungiRiga() {
    const nuovaRiga = creaRiga();
    const elimina = document.createElement("button");

    elimina.textContent = "-";
    elimina.className = "elimina";

    const cellaBottone = document.createElement("td");

    cellaBottone.appendChild(elimina);
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

        // i bottoni non sono né select né input, quindi vengono saltati
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
        // se il testo salvato è corrotto si riparte da una tabella vuota
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


// Un solo listener sul tbody (copre anche le righe create dopo):
// se si clicca il - si elimina la riga di quel bottone
corpoTabella.addEventListener("click", evento => {
    const elimina = evento.target.closest(".elimina");
    if (!elimina) return; // clic su altro: non fare nulla

    elimina.closest("tr").remove();

    // Il + sta nell'ultima riga: se è stata eliminata va rimesso
    const ultimaRiga = corpoTabella.lastElementChild;
    if (ultimaRiga) {
        ultimaRiga.lastElementChild.appendChild(pulsante);
    } else {
        // Non è rimasta nessuna riga: ne crea una vuota
        aggiungiRiga();
    }

    salva();
});

// Il + aggiunge una riga e salva
pulsante.addEventListener("click", () => {
    aggiungiRiga();
    salva();
});

// Un solo listener sul tbody: salva ogni volta che si modifica un campo
corpoTabella.addEventListener("input", salva);

// All'apertura ricostruisce la tabella dai dati salvati
ripristina();
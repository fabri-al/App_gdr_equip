# Equipaggiamento GDR

Pagina web per tenere traccia dell'equipaggiamento di un personaggio
di un gioco di ruolo. Funziona nel browser, senza server né account.

## Funzioni

- Tabella con: tipo, quantità, nome, descrizione, note e peso (Kg)
- Il bottone `+` aggiunge una riga
- Salva automaticamente nel browser (`localStorage`)

## Come usarla

Scaricare il progetto ed aprire `index.html` nel browser.

## File del progetto

- `index.html`: struttura della pagina
- `style.css`: aspetto della pagina
- `script.js`: creazione delle righe, salvataggio e ripristino

## Personalizzazione

Le categorie del menu "Tipo" sono nell'array `tipi` in `script.js`.

## Limiti

I dati restano nel browser in cui li hai scritti, cambiando browser
o dispositivo la tabella risulta vuota.

## Funazionalità ancora da implementare

- Bottone per eliminare le righe
- Trasformarla in PWA per usarla come app su desktop e Android
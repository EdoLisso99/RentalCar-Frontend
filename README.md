# RentalCar Frontend
## Progetto sviluppato durante il periodo di stage presso SI2001

### RentalCar consiste nella realizzazione di un sito web che emula il funzionamento di un concessionario d'auto, sviluppato utilizzando a FrontEnd il framework Angular e a BackEnd Spring Boot, avvalendosi di MySQL come Database, di Hibernate come ORM e di Spring Security per tutte le funzioni di autenticazione, autorizzazione e sicurezza del sito.

### La parte BackEnd del progetto è disponibile a questo indirizzo: https://github.com/EdoLisso99/RentalCar-Backend

Rentalcar essenzialmente permette ad una serie di utenti di prenotare uno o più mezzi esposti in vetrina, e di poter effettuare una serie di operazioni su di esse.
Le sezioni "utenti", "mezzi" e "prenotazioni" sono accessibili tramite dei bottoni presenti in cima alla schermata, che aprono le corrispettive schede associate.

Ogni utente e mezzo presenti nel DB hanno una serie di attributi, e tutte le prenotazioni approvate o rifiutate saranno salvate in uno storico. Un utente può avere al più una prenotazione all'attivo, ed ogni qualvolta si prenota un mezzo il sistema deve fare dei controlli per verificare che tale prenotazione non si sovrapponga con altre già approvate.

Un utente può avere un ruolo fra Customer ed Admin, con specifiche azioni e limitazioni per ognuno di essi. Un utente Customer può visualizzare e modificare solo i suoi dati anagrafici, è limitato a poter visualizzare e prenotare i mezzi esposti in vetrina e può visualizzare tutte le prenotazioni da lui effettuate, o eliminarle nel caso in cui esse non siano ancora state approvate/rifiutate dall'utente Admin.

L'utente Admin può visualizzare tutti gli utenti e i mezzi presenti nel DB, effettuando le operazioni CRUD (Creazione, Lettura, Aggiornamento e Rimozione).
Tutte le operazioni di creazione e aggiornamento sono controllate dal sistema, per prevenire l'immissione di valori illegali o di attacchi di SQL Injection.
Ogni qualvolta si rimuove un mezzo o un utente il sistema provvederà in automatico a rimuovere nello storico delle prenotazioni tutte le prenotazioni associate ad essi.
Un utente Admin non può prenotare in alcun modo nessun mezzo, ma può approvare o rifiutare tutte le prenotazioni effettuate dagli utenti Customer. Un Admin non può nemmeno cancellare sè stesso dal DB, ma può effettuarlo solo un'altro Admin.

Ogni utente presente sul DB, che sia Admin o Customer, all'apertura del sito deve immettere le sue credenziali nella pagina iniziale. Dopo essersi autenticato con successo l'utente potrà quindi usufruire delle funzionalità presenti nel sito stesso.

Data la vasta quantità di utenti, mezzi e prentoazioni disponibili, ogni pagina dispone di una barra di ricerca con la quale si possono cercare determinati elementi presenti nelle tabelle.

### Cartella src/app/components
In questa cartella sono presenti i due componenti riutilizzabili presenti nel progetto, ovvero il bottone e la tabella. Essi sono dei componenti costruiti ad hoc, che, dati in "ingresso" dei file di configurazione (locati in src/app/config), possono generare dei bottoni e delle tabelle completamente dinamici e riutilizzabili in tutto il progetto.

Un bottone è essenzialmente costituito da 5 parti:
- **customCssClass**: il nome della classe del framework Bootstrap da applicare al bottone 
- **text**: il testo contenuto all'interno del bottone
- **icon**: il nome dell'icona di FontAwesome da mostrare all'interno del bottone 
- **color**: il colore del testo presente all'interno del bottone
- **action** (opzionale): la funzione da eseguire al click del bottone

La tabella, invece, è costituita da 6 parti:
- **headers**: un array di headers, composto da due attributi, key e label, che stanno ad indicare i nomi delle colonne della tabella con le relative chiavi da visualizzare
- **order**: un array che indica come disporre gli elementi della colonna della tabella. Composto da due attributi, defaultColumn (colonna selezionata di default) e orderType (ascendente o discendente).
- **search**: indica per quali colonne cercare attraverso la barra di ricerca (ad esempio, non vogliamo che, mettendo inavvertitamente l'username o la password di un utente ci esca l'identità della persona associata).
- **pagination**: stabilisce le regole di paginazione. Composto da due attributi, itemPerPage e itemPerPageOptions, indicano rispettivamente il numero di elementi da visualizzare nella tabella di default e un array contenente una serie di opzioni per cambiare il valore di itemPerPage. Ad esempio, la visualizzazione di soli 10 elementi per tabella mi sta "stretta" e vorrei allargarla a 25 o 50 elementi per pagina.
- **actions**: array che rappresenta quali bottoni devono essere visualizzati alla fine della riga di una determinata tabella. Rispetto ai bottoni contengono un parametro aggiuntivo, hidden, che indica quando tale bottone deve essere visualizzato o meno. Ad esempio, un admin nella pagina utenti visualizza tutti i bottoni per cancellare ogni singolo elemento, ma non quello relativo al suo account altrimenti si cancellerebbe da solo.

### Cartella src/app/config
Come accennato nella sezione precedente contiene tutti i file di configurazione dei bottoni e delle tabelle

### Cartella src/app/pages
Contiene tutte le pagine che vengono visualizzate nell'applicazione. Le cartelle utenti, mezzi e prenotazioni contengono, inoltre, un'altra cartella, denominata "form-*nomeCartellaOrigine*", che serve a mostrare il form associato alla relativa classe, per la creazione o l'aggiornamento di utenti, mezzi e prenotazioni.

### Cartella src/app/services
Contiene tutti i servizi utilizzati all'interno dell'applicazione, suddivisi per categoria. 
Il servizio contenuto nella cartella "interceptor" serve, come da nome, ad intercettare ogni qualsiasi chiamata HTTP e ad applicare su di essa, il JWT Token (ottenuto dopo aver effettuato con successo il Login).

### Cartella src/app/util
Contiene due file, uno per tutte le funzioni di uso generale all'interno dell'applicazione, mentre l'altro contiene le interfacce dei principali componenti di RentalCar, ovvero Utente, Mezzo e Prenotazione.

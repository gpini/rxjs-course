import { Observable } from 'rxjs';

// HOT
const socket = new WebSocket('ws://someurl');
const hotSocket$ = new Observable((observer) => {
    socket.addEventListener('message', (e) => observer.next(e));
    return () => socket.close();
});
// :( La connessione esiste anche prima di fare subscribe
// :) La connessione non viene mai terminata perchè non si sa chi è in ascolto
// :) Viene creata una solo connessione indipendentemente dal numero di subscribe

// COLD
const coldSocket$ = new Observable((observer) => {
    const socket = new WebSocket('ws://someurl');
    socket.addEventListener('message', (e) => observer.next(e));
    return () => socket.close();
});
// :( Viene creata una connessione per ogni subscribe
// :) La connessione non viene creata finchè non si fa il primo subscribe
// :) La connessione viene distrutta all'unsubscribe

// COLD improved
const subject = new Subject();
const mainSub = hotSocket$.subscribe(
    x => subject,next(x),
    err => subject.error(err),
    () => subject.complete()
);
// const mainSub = hotSocket$.subscribe(subject);
let refs = 0;
const coldImprovedSocket$ = new Observable((observer) => {
    refs++;
    let sub = subject.subscribe(
        x => observer,next(x),
        err => observer.error(err),
        () => observer.complete()
    );
    // let sub = subject.subscribe(observer);
    return () => {
        refs--;
        if (refs === 0) mainSub.unsubscribe();
        sub.unsubscribe();
    };
});
// :) La connessione non viene creata finchè non si fa il primo subscribe
// :) La connessione viene distrutta all'unsubscribe dell'ultimo sottoscrittore
// :) Viene creata una solo connessione indipendentemente dal numero di subscribe

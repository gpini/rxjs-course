import { Observable } from 'rxjs';
import { apiPromise } from '../libs/async.js'

// Observable of, subscribe, complete
Observable.of(1).subscribe(
    x => console.log(x),
    err => console.log(`Error: e`),
    () => console.log('Completed')
)

// Observable create - con timeout
Observable.create(observer => {
    observer.next(0);
    setTimeout(() => {
        observer.next(1);
        observer.complete();
    }, 1000)
}).subscribe(
    x => console.log(x),
    err => console.log(`Error: e`),
    () => console.log('Completed')
)

// Observable create - error
Observable.create(observer => {
    observer.next(0);
    setTimeout(() => {
        observer.error('generic error')
    }, 1000)
}).subscribe(
    x => console.log(x),
    err => console.log(`Error: e`),
    () => console.log('Completed')
)

// Observable create - unsubscription
let subscription = Observable.create(observer => {
    observer.next(0);
    setTimeout(() => {
        observer.next(1);
        observer.complete();
    }, 1000)
}).subscribe(
    x => console.log(x),
    err => console.log(`Error: e`),
    () => console.log('Completed')
)
subscription.unsubscribe();

// Observable fromEvent - click su document
Observable.fromEvent(document, 'click').subscribe(
    x => console.log(x),
    err => console.log(`Error: e`),
    () => console.log('Completed')
)

// Observable fromPromise
Observable.fromPromise(apiPromise('http://localhost:3000/animals')).subscribe(
    x => console.log(x),
    err => console.log(`Error: e`),
    () => console.log('Completed')
)

// Observable interval + take
Observable.interval(1000).take(5).subscribe(
    x => console.log(x),
    err => console.log(`Error: e`),
    () => console.log('Completed')
)

// Observable timer
Observable.interval(5000, 100).subscribe(
    x => console.log(x),
    err => console.log(`Error: e`),
    () => console.log('Completed')
)

import { Observable } from 'rxjs';
import { apiObservable } from '../libs/async.js'

// TODO
window.onload = () => {
    let refresh$ = Observable.fromEvent(document.getElementById('refresh'), 'click').startWith(undefined)
    let stop$ = Observable.fromEvent(document.getElementById('stop'), 'click')

    let animals$ = refresh$
        // .mergeMap(str => {
        .exhaustMap(() => {
            return apiObservable('http://localhost:3000/animals')
                .retry(3)
                .takeUntil(stop$)
                .catch(() => Observable.of([]))
        })

    animals$.subscribe(
        animals => {
            let div = document.createElement('div');
            animals.forEach(animal => {
                let li = document.createElement('li');
                li.innerHTML = animal.name;
                div.appendChild(li);
            })
            document.getElementById('list').replaceWith(div);
        },
        err => console.log('err', err),
        () => console.log('complete')
    );
}

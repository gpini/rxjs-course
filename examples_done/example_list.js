import { Observable } from 'rxjs';
import { apiObservable } from '../libs/async.js'
import { setVisible } from '../libs/dom.js'

// refreshClick$ e stopClick$
// mergeMap e replaceWith
// exhaustMao
// takeUntil
// retry e catch
// startWith
// setError do e catch
// setProgress con finally

window.onload = () => {
    let refreshClick$ = Observable.fromEvent(document.getElementById('refresh'), 'click').startWith(undefined)
    let stopClick$ = Observable.fromEvent(document.getElementById('stop'), 'click')

    let replaceList = animals => {
        let ul = document.createElement('ul');
        animals.forEach(animal => {
            let li = document.createElement('li');
            li.innerHTML = animal.name;
            ul.appendChild(li);
        })
        let list = document.getElementById('list');
        list.innerHTML = '';
        list.appendChild(div);
    }

    let animals$ = refreshClick$
        // .mergeMap(str => {
        .exhaustMap(() => {
            setVisible('progress', true)
            return apiObservable('http://localhost:3000/animals')
                .retry(3)
                .takeUntil(stopClick$)
                .do(() => {
                    setVisible('error', false)
                })
                .finally(() => {
                    setVisible('progress', false)
                })
                .catch(() => {
                    setVisible('error', true)
                    return Observable.of([])
                })
        })

    animals$.subscribe(
        animals => {
            replaceList(animals);
        },
        err => console.log('err', err),
        () => console.log('complete')
    );
}

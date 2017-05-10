import { Observable } from 'rxjs';
import { apiObservable } from '../libs/async.js'

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

    let setError = isError => {
        let errorContainer = document.getElementById('error');
        if (isError) {
            errorContainer.innerHTML = 'Errore';
        } else {
            errorContainer.innerHTML = '';
        }
    }

    let setProgress = inProgress => {
        let progressContainer = document.getElementById('progress');
        if (inProgress) {
            progressContainer.style.display = 'block';
        } else {
            progressContainer.style.display = 'none';
        }
    }

    let replaceList = animals => {
        let div = document.createElement('div');
        animals.forEach(animal => {
            let li = document.createElement('li');
            li.innerHTML = animal.name;
            div.appendChild(li);
        })
        let list = document.getElementById('list');
        list.innerHTML = '';
        list.appendChild(div);
    }

    let animals$ = refreshClick$
        // .mergeMap(str => {
        .exhaustMap(() => {
            setProgress(true);
            return apiObservable('http://localhost:3000/animals')
                .retry(3)
                .takeUntil(stopClick$)
                .do(() => {
                    setError(false)
                })
                .finally(() => {
                    setProgress(false)
                })
                .catch(() => {
                    setError(true)
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

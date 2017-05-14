import { Observable } from 'rxjs';
import { apiObservable } from '../libs/async.js'
import { setVisible } from '../libs/dom.js'


let replaceList = animals => {
    let ul = document.createElement('ul');
    animals.forEach(animal => {
        let li = document.createElement('li');
        li.innerHTML = animal.name;
        ul.appendChild(li);
    })
    let list = document.getElementById('list');
    list.innerHTML = '';
    list.appendChild(ul);
}

window.onload = () => {
  setVisible('progress', false);
  let refreshClick$ = Observable.fromEvent(document.getElementById('refresh'), 'click')

  let stopClick$ = Observable.fromEvent(document.getElementById('stop'), 'click')

  refreshClick$.startWith(undefined).exhaustMap(() => {
    setVisible('progress', true);
    setVisible('error', false);
    return apiObservable('http://localhost:3000/animalss')
      .retry(1)
      .finally(() => {
        setVisible('progress', false);
      })
      .do(() => {
        setVisible('error', false);
      })
      .catch(() => {
        setVisible('error', true);
        return Observable.of([])
      })
      .takeUntil(stopClick$);
  })
  .subscribe(
    animals => {
      replaceList(animals)
    },
    error => console.log(error),
    () => console.log('Complete!')
  )
}

// refreshClick$ e stopClick$
// mergeMap e replaceList
// exhaustMap
// takeUntil
// startWith
// retry
// setProgress con finally
// setError do e catch

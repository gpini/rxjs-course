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
  
}

// refreshClick$ e stopClick$
// mergeMap e replaceList
// exhaustMap
// takeUntil
// startWith
// retry
// setProgress con finally
// setError do e catch

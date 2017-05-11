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
    list.appendChild(div);
}

window.onload = () => {

}

// refreshClick$ e stopClick$
// mergeMap e replaceWith
// exhaustMao
// takeUntil
// retry e catch
// startWith
// setError do e catch
// setProgress con finally

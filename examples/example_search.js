import { Observable } from 'rxjs';
import { apiObservable } from '../libs/async.js'

// onload fromEvent
// map target
// debounceTime
// RIVEDERE distinctUntilChanged o filter + pairwise + startsWith
// exhuastMap con chiamata api e map
// switchMap con test cancellazione
window.onload = () => {
    let input$ = Observable.fromEvent(document.getElementById('input'), 'keyup')
        .map(e => e.target.value)
        .debounceTime(500)
        .distinctUntilChanged()
        .exhaustMap(str => {
            return apiObservable('https://api.github.com/user/' + str)
        });

    input$.subscribe(str => console.log(str));
}

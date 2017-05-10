import { Observable } from 'rxjs';
import { apiObservable } from '../libs/async.js'

// onload fromEvent
// map target
// debounceTime
// RIVEDERE distinctUntilChanged o filter + pairwise + startsWith
// mergeMap con chiamata api e map
// switchMap con test cancellazione (si vede meglio con animals)
// catch e Observable.of('-')
window.onload = () => {
    let input$ = Observable.fromEvent(document.getElementById('input'), 'keyup')
        .map(e => e.target.value)
        .debounceTime(500)
        .distinctUntilChanged()

    let name$ = input$
        // .mergeMap(str => {
        .switchMap(str => {
            // 'http://localhost:3000/animals/'
            return apiObservable('https://api.github.com/users/' + str).catch(() => Observable.of('-'))
        })
        .map(response => response.name);

    name$.subscribe(
        name => {
            console.log('name', name);
            // document.getElementById('list').innerHTML  = name;
        },
        err => console.log('err', err),
        () => console.log('complete')
    );
}

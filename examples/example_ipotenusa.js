import { Observable } from 'rxjs';

// onload fromEvent x 2 con map
// combineLatest
// debounceTime e distinctUntilChanged
window.onload = () => {
    let input1$ = Observable.fromEvent(document.getElementById('input1'), 'keyup')
        .map(e => e.target.value)
        .debounceTime(500)
        .distinctUntilChanged()

    let input2$ = Observable.fromEvent(document.getElementById('input2'), 'keyup')
        .map(e => e.target.value)
        .debounceTime(500)
        .distinctUntilChanged()

    Observable.combineLatest(input1$, input2$).subscribe(([a, b]) => {
        let value = '';
        if (a && b) {
            value = Math.sqrt(a*a + b*b);
        }
        document.getElementById('output').innerHTML = value;
    });

}

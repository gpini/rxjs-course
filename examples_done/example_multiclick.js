import { Observable } from 'rxjs';
import { apiObservable } from '../libs/async.js'

// onload fromEvent
// buffer debounceTime map filter

window.onload = () => {
    let buttonClick$ = Observable.fromEvent(document.getElementById('button'), 'click');

    let multipleClick$ = buttonClick$
        .buffer(buttonClick$.debounceTime(300))
        .map(clicks => clicks.length)
        .filter(n => n > 1)

    multipleClick$.subscribe(n => {
        document.getElementById('clicks').innerHTML = n + ' click';
    })

}

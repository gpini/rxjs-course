import { api } from '../libs/async.js'
import { Promise } from 'bluebird';


Promise.config({
    // Enable cancellation
    cancellation: true,
});

export function apiPromise(url) {
	var promise = new Promise(function(resolve, reject, onCancel) {
		let xhr = api(url, function(response) {
			resolve(response);
		}, function(error) {
			reject(error);
		});
        onCancel(function() {
            xhr.abort();
        });
	});
	return promise;
}

// debounceTime
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// implementare il cancel è un bel problema, e aggiunge diverse righe di codice (e devo usare un'altra libreria)

window.onload = () => {
    let input;
    let promiseInProgress;

    let debouncedCall = debounce(() => {
        if (promiseInProgress) {
            promiseInProgress.cancel();
        }
        promiseInProgress = apiPromise('https://api.github.com/users/' + input)
        // promiseInProgress = apiPromise('http://localhost:3000/animals/' + input)
            .then(user => {
                document.getElementById('list').innerHTML  = user.name;
            })
            .catch(err => {
                document.getElementById('list').innerHTML  = '-';
            })
            .finally(() => {
                promiseInProgress = undefined;
            })
    }, 500)

    document.getElementById('input').addEventListener('keyup', e => {
        if (input !== e.target.value) { // distinctUntilChanged
            input = e.target.value;
            // debounceTime
            debouncedCall(input);
        }
    })

}

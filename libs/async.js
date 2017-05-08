export function api(url, onSuccess, onError) {
    // console.log('Start call to ' + url);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (this.readyState == 4) {
	    	if (this.status == 200 ) {
                // console.log('Response for ' + url);
				onSuccess(JSON.parse(this.responseText));
		    } else {
		    	onError(this.status);
                // console.log('Error on ' + url);
		    }
	    }
	};
	xhr.open("GET", url, true);
	xhr.send();
    return xhr;
}

export function apiPromise(url) {
	var promise = new Promise(function(resolve, reject) {
		api(url, function(response) {
			resolve(response);
		}, function(error) {
			reject(error);
		});
	});
	return promise;
}

export function apiObservable(url) {
    return Observable(observer => {
        const xhr = api(() => {
            observer.next()
            observer.complete()
        }, error => {
            observer.error()
        });
        // restituisce teardown logic (che viene effettuata nell'unsubscribe)
        return () => xhr.abort();
    });
}

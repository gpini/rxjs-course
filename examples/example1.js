// #0 Async function
function callApi(url, onSuccess, onError) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (this.readyState == 4) {
	    	if (this.status == 200 ) {
				  onSuccess(JSON.parse(this.responseText));
		    } else {
		    	onError(this.status);
		    }
	    }
	};
	xhr.timeout = 2000; // time in milliseconds
	xhr.open("GET", url, true);
	xhr.send();
}

// #1 Callbacks - success
callApi('http://localhost:3000/animals', function(response) {
	console.log('Success!', response);
}, function(error) {
	console.log('Error!', error);
});

// #1 Callbacks - error
callApi('http://localhost:3001/animals', function(response) {
	console.log('Success!', response);
}, function(error) {
	console.log('Error!', error);
});

// #2 Nested Callbacks
callApi('http://localhost:3000/animals', function(response) {
	var animals = response;
	if (animals[0] && animals[0].id) {
		callApi('http://localhost:3000/animals/' + animals[0].id, function(response) {
			var firstAnimal = response;
			console.log('Successfully get animal ' + firstAnimal.name);
		}, function(error) {
			console.log('Error!', error);
		});
	}
}, function(error) {
	console.log('Error!', error);
});

// #3 Promises
function apiPromise(url) {
	var promise = new Promise(function(resolve, reject) {
		callApi(url, function(response) {
			resolve(response);
		}, function(error) {
			reject(error);
		});
	});
	return promise;
}
apiPromise('http://localhost:3000/animals')
	.then(function(response) {
		console.log('Promise success!',response);
	})
	.catch(function(error) {
		console.log('Promise error!', error);
	})

// #4 Nested promises
apiPromise('http://localhost:3000/animals')
	.then(function(response) {
		var animals = response;
		if (animals[0] && animals[0].id) {
			return apiPromise('http://localhost:3000/animals/' + animals[0].id);
		} else {
			return Promise.reject('nested error');
		}
	})
	.then(function(response) {
		console.log('Promise success!', response);
	})
	.catch(function(error, id) {
		console.log('Promise error!', error);
	})

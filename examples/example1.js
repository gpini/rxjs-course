import {api, apiPromise} from '../libs/async.js'

// Callbacks - success
// api('http://localhost:3000/animals', function(response) {
// 	console.log('Success!', response);
// }, function(error) {
// 	console.log('Error!', error);
// });

// Callbacks - error
// api('http://localhost:3001/animals', function(response) {
// 	console.log('Success!', response);
// }, function(error) {
// 	console.log('Error!', error);
// });

// Nested Callbacks
// api('http://localhost:3000/animals',
// 	function(response) {
// 		var animals = response;
// 		api('http://localhost:3000/animals/' + animals[0].id,
//             function(response) {
//                 var firstAnimal = response;
//                 console.log('Successfully get animal ' + firstAnimal.name);
//             }, function(error) {
//                 console.log('Error!', error);
//             }
//         );
// 	}, function(error) {
// 			console.log('Error!', error);
// 	}
// );

// Promises
// apiPromise('http://localhost:3000/animals')
// 	.then(function(response) {
// 		console.log('Promise success!',response);
// 	})
// 	.catch(function(error) {
// 		console.log('Promise error!', error);
// 	})

// Nested promises - wrong way
// apiPromise('http://localhost:3000/animals')
// 	.then(function(response) {
// 		var animals = response;
// 		apiPromise('http://localhost:3000/animals/' + animals[0].id)
//             .then(function(response) {
//                 console.log('Promise success!', response);
//             })
//             .catch(function(error, id) {
//                 console.log('Promise error!', error);
//             })
// 	})
// 	.catch(function(error, id) {
// 		console.log('Promise error!', error);
// 	})

// Nested promises
// apiPromise('http://localhost:3000/animals')
// 	.then(function(response) {
// 		var animals = response;
// 		return apiPromise('http://localhost:3000/animals/' + animals[0].id);
// 	})
// 	.then(function(response) {
// 		console.log('Promise success!', response);
// 	})
// 	.catch(function(error, id) {
// 		console.log('Promise error!', error);
// 	})

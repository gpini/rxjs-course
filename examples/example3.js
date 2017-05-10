import { Observable } from 'rxjs';
import { apiPromise } from '../libs/async.js'

// map - interval + double
Observable.interval(1000).take(5)
    .map(x => 2 * x)
    .subscribe(
        x => console.log(x),
        err => console.log(`Error: e`),
        () => console.log('Completed')
    )

// map - fromPromise, getAnimalName(id)
let getAnimalName = id => Observable.fromPromise(apiPromise('http://localhost:3000/animals/' + id))
    .map(animal => animal.name)

getAnimalName(1)
    .subscribe(
        x => console.log(x),
        err => console.log(`Error: e`),
        () => console.log('Completed')
    )

// pluck - fromPromise, getAnimalName(id)
let getAnimalName2 = id => Observable.fromPromise(apiPromise('http://localhost:3000/animals/' + id))
    .pluck('name')

getAnimalName2(1)
    .subscribe(
        x => console.log(x),
        err => console.log(`Error: e`),
        () => console.log('Completed')
    )

// filter - interval
Observable.interval(1000).take(10)
    .filter(x => x < 4)

// first - interval
Observable.interval(1000).take(10)
    .first()



console.log('Hello');

setTimeout(function() {
    console.log('World')
}, 0);

console.log('Me');


function b() {
    console.log('World');
}

function a() {
    console.log('Hello');
    b();
}

setTimeout(function() {
    console.log('Hi')
}, 0);

a();



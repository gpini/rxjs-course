import './index.html'

// document.body.appendText('hello');
window.onload = () => {
    var elemDiv = document.createElement('div');
    elemDiv.style.cssText = 'width:100%;height:10%;background:rgb(192,192,192);';
    elemDiv.innerHTML = 'Added element with some data';
    window.document.body.appendChild(elemDiv, window.document.body.firstChild);
}

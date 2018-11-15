$(document).ready( function () {
    if(localStorage.getItem('items') === null){
        document.location.href = 'index.html';
    }
})
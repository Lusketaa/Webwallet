function loading() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    document.getElementsByClassName("container")[0].style.display = "flex";
}

window.onload = function() {
    window.setTimeout(loading, 0); // mudar para 3000 depois de alterar o projeto, apenas economizando tempo
}; 
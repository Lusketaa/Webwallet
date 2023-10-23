function loading() {
  document.getElementsByClassName("loading")[0].style.display = "none";
  document.getElementsByClassName("container")[0].style.display = "flex";
  document.getElementsByClassName("header")[0].style.position = "absolute";
}

window.onload = function () {
  window.setTimeout(loading, 3000); // mudar para 3000 depois de alterar o projeto, apenas economizando tempo
};

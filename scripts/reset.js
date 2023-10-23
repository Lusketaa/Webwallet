document.addEventListener("DOMContentLoaded", function () {
  // Obtém a referência do e-mail
  const emailInput = document.getElementById("recemail");
  const sendEmailButton = document.getElementById("sendEmailButton"); // ID adicionado ao botão

  sendEmailButton.addEventListener("click", function () {
    // Recupera o valor do campo de e-mail
    const email = emailInput.value;

    if (!isValidEmail(email)) {
      alert("Email inválido");
    } else {
      // Envia o e-mail de recuperação de senha
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then((response) => {
          alert("E-mail de recuperação de senha enviado com sucesso!");
          // Limpar o campo de e-mail
          emailInput.value = "";
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});

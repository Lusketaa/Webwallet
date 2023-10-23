firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "../home/home.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!isValidEmail(email)) {
      alert("Email inválido");
    } else if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres");
    } else if (password !== confirmPassword) {
      alert("As senhas não coincidem");
    } else {
      // Os dados estão corretos, você pode enviar o formulário ou executar outra ação aqui
      registrationForm.reset();
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Cadastro bem-sucedido!");
      window.location.href = "pages/home/home.html";
    })
    .catch((error) => {
      alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
  if (error.code == "auth/email-already-in-use") {
    return "Este e-mail já está em uso!";
  }
  return error.message;
}

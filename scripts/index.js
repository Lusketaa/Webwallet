alert("Seja bem-vindo a WebWallet versão 1.0, caso não queira se cadastrar em nossa aplicação, pode utilizar as credenciais abaixo para critério de teste: Email: teste@hotmail.com Senha: 123456");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.location.href = "pages/home/home.html";
  }
});

// Esconde e Mostra a senha
function showHide() {
  const password = document.getElementById("password");
  const icon = document.getElementById("icon");

  if (password.type === "password") {
    password.setAttribute("type", "text");
    icon.classList.add("hide");
  } else {
    password.setAttribute("type", "password");
    icon.classList.remove("hide");
  }
}

// Desbloqueia os botões de esqueceu sua senha e entrar
function validateFields() {
  const emailValid = isEmailValid();
  form.password().disabled = !emailValid;

  const passwordValid = isPasswordValid();
  form.loginButton().disabled = !emailValid || !passwordValid;
}

function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword(form.email().value, form.password().value)
    .then((response) => {
      window.location.href = "/pages/home/home.html";
    })
    .catch((error) => {
      alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
  if (error.code == "auth/invalid-login-credentials") {
    return "Usuário não encontrado";
  }
  return error.message;
}

// valida o email
function isEmailValid() {
  const email = form.email().value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

// valida a senha
function isPasswordValid() {
  const password = form.password().value;
  if (!password) {
    return false;
  }
  return true;
}

// função regular para validar os caracteres do email
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const form = {
  email: () => document.getElementById("email"),
  recemail: () => document.getElementById("recemail"),
  password: () => document.getElementById("password"),
  loginButton: () => document.getElementById("login-button"),
};

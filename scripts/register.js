function validarFormulario() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var confirmarSenha = document.getElementById('confirmarSenha').value;
    var erro = false;
    var mensagemErro = '';

    // Validação do email
    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (!email.match(emailRegex)) {
      erro = true;
      mensagemErro += 'Email inválido. ';
    }

    // Validação da senha
    if (senha.length < 6) {
      erro = true;
      mensagemErro += 'A senha deve ter pelo menos 6 caracteres. ';
    }

    // Validação da confirmação de senha
    if (senha !== confirmarSenha) {
      erro = true;
      mensagemErro += 'A confirmação de senha não corresponde à senha. ';
    }

    // Exibindo mensagens de erro, se houver
    if (erro) {
      alert(mensagemErro);
      return false;
    }
}



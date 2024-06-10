const Email = document.getElementById('inputLogin');
const Password = document.getElementById('inputPassword');
var login = document.getElementById('login');
var main = document.getElementById('main');

const sucess_email='seujoao';
const sucess_password=12345;

function validate(){
    if(Email.value===sucess_email && parseInt(Password.value)===sucess_password)
        ocultaLogin();
    else
        document.getElementById("wrong_alert").innerHTML="Usuário ou senha incorretos!";
        Email.value='';
        Password.value='';
}

function ocultaLogin(){
    login.style.display='none';
    main.style.display= 'block';
    header_login.style.display='block';
}
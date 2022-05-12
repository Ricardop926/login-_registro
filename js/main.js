
let urlDb = "https://cesde-f928b-default-rtdb.firebaseio.com/user.json";

//boton enviar registro
const btnEnviar = document.getElementById("bton-enviar");
//variables del formulario de registro
const nombreUser = document.getElementById("name");
const userName = document.getElementById("surname");
const documento = document.getElementById("document");
const direccion = document.getElementById("address");
const correo = document.getElementById("email");
const pass = document.getElementById("password");
const telefono = document.getElementById("phone");


//variables del formulario de login
const btnEnviarLogin = document.getElementById("bton-enviar-login");
//variables del formulario de login
const correoLogin = document.getElementById("correoLogin");
const passLogin = document.getElementById("passwordLogin");

//valido la url donde estou hubicado en este caso el pathname de la ruta
const pathname = window.location.pathname;
const ruta = "/login-_registro/login.html";

//funcion login
const login = (event) => {
    event.preventDefault();

    axios.get(urlDb)
        .then(function (response) {

            //ricardo@correo.com
            //1234

            const correo2 = response.data['-N1pmI1OzHCG3FOPLEOY'].mail;
            const pass2 = response.data['-N1pmI1OzHCG3FOPLEOY'].password;

            if(correoLogin.value == correo2 && passLogin.value == pass2){
                alert("datos correctos");
                window.location = "http://localhost:8000/login-_registro/home.html";
            }else{
                alert("datos incorrectos");
                correoLogin.value = "";
                passLogin.value = "";
            }

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

//funcion registro
const registro = (event) => {
    event.preventDefault(); //cancela el evento inicial submit del formulario, evitando la recarga de la pagina
    
    if(nombreUser.value == "" && pass.value == "" && correo.value == ""){
        alert("faltan datos por ingresar");
    }else{
        axios.post(urlDb,{
            address: direccion.value,
            document: documento.value,
            mail: correo.value,
            name: nombreUser.value,
            password: pass.value,
            phone: telefono.value,
            surname: userName.value
          })
          .then(function (response){
            alert("datos ingresados");
            console.log(response);
          })
          .catch(function (error){
            alert("los datos estan mal", error);
            console.log(error);
          });
    }
}


//valido la ruta y dependiendo de si estoy en login o registro me activa la funcion login o registro
if(pathname == ruta){
    btnEnviarLogin.addEventListener('click', login);
}else{
    btnEnviar.addEventListener('click', registro);
}

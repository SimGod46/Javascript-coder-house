// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

// @ts-check
//Simulador de becas universitarias
function ponderacion(resultado,puntajes){
    let total = 0;
    for(let i = 0; i < resultado.ponderacion.length ;i++){
        total += resultado.ponderacion[i] * puntajes[i];
    }
    return total;
}

function beca(resultado,puntaje){
    for(let i = 0; i<resultado.beca_puntaje.length; i++){
        if(puntaje>=resultado.beca_puntaje[i]){
            return resultado.beca_porcentaje[i];
        }
    }
    return 0;
}

/*Output condicional en base a los puntajes ingresados */
function mostrarResultado(carrera,lengua,mates,ciencia,nem,ranking){
    let resultado = datos_carreras.find((el)=> el.carrera_id === carrera);
    let ponderado = ponderacion(resultado,[nem,ranking,mates,lengua,ciencia]);
    let becaSimulada = beca(resultado,ponderado);
    resultadoDOM.innerHTML = `<p>Su puntaje ponderado es de: ${ponderado}</p><p>Su beca simulada cubre el ${becaSimulada}% de su carrera de <strong>${resultado.carrera}</strong></p>` ;
    
    /*Operador optimizado*/
    becaSimulada> 0 ? felicitacionDOM.innerHTML = "<h2>FELICITACIONES</h2><p>Tu puntaje simulado te hace elegible  para una beca, para más información visita la secciones de \"Financiamiento\"</p>" : felicitacionDOM.innerHTML = "";
}

/* Cuadro que verifica la identidad del usuario, solo existe el usuario admin con contraseña 12345 */
function cuadroLogin(){
    Swal.fire({
        title: 'Inicio de sesión',
        html:
        '<input id="usuario"    class="swal2-input" type="text" placeholder="Usuario">' +
        '<input id="contrasena" class="swal2-input" type="password" placeholder="Contraseña">',
        focusConfirm: false,
        preConfirm: () => {
            const formValues =  [document.getElementById('usuario').value, document.getElementById('contrasena').value];
              
            if(formValues[0] == "admin" && formValues[1] == "12345"){
                Swal.fire({
                title: 'Bienvenido',
                icon: 'success',
                confirmButtonText: 'Aceptar'
                });
                sessionStorage.setItem("usuario",formValues[0]);
                inicioSesion.innerHTML = `<a href="#">${sessionStorage.getItem("usuario")}</a>`;
            } else{
                Swal.fire({
                title: 'Error',
                text: 'credenciales no validas',
                icon: 'error',
                confirmButtonText: 'Aceptar'
                });
            }
        }
    });
}

/*Datos estandar para el calculo del puntaje, son constantes */
let datos_carreras =[
    {carrera_id:1, carrera: "Medicina"  , ponderacion: [.2, .15, .35, .2,  .1 ], beca_puntaje:[900, 800, 650], beca_porcentaje:[100, 95, 80]},
    {carrera_id:2, carrera: "Derecho"   , ponderacion: [.2, .2,  .1,  .25, .25], beca_puntaje:[800, 750, 650], beca_porcentaje:[90,  80, 70]},
    {carrera_id:3, carrera: "Ingeniería", ponderacion: [.1, .25, .2,  .1,  .2 ], beca_puntaje:[750, 700, 650], beca_porcentaje:[90,  85, 75]}
];

/* Utilización del session storage para almacenar examnes y/o ensayos anteriores realizados por la persona*/
let inicioSesion = document.getElementById("loginBtn");
inicioSesion.onclick = cuadroLogin;


/* Simulación del puntaje ponderado en base al formulario */
let resultadoDOM = document.getElementById("resultadoSimulacion");
let felicitacionDOM = document.querySelector("main section div #felicitacion");
let formularioPonderacion = document.getElementById("formSimulation");
formularioPonderacion.addEventListener("submit",(e)=>{e.preventDefault();
                                                      let formulario = e.target;
                                                      mostrarResultado(
                                                        /* Agregar una desestructurción o un spread (primer intento no funcionó ya que no se recupero el .value)*/
                                                        parseInt(formulario.children[0].value),
                                                        parseInt(formulario.children[1].value),
                                                        parseInt(formulario.children[2].value),
                                                        parseInt(formulario.children[3].value),
                                                        parseInt(formulario.children[4].value),
                                                        parseInt(formulario.children[5].value)); 
                                                    });
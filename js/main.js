// @ts-check
//Simulador de becas universitarias
function ponderacion(resultado,puntajes){
    let total = 0;
    for(let i = 0; i < resultado.ponderacion.length ;i++){
        total += resultado.ponderacion[i] * puntajes[i]
    }
    return total;
};

function beca(resultado,puntaje){
    for(let i = 0; i<resultado.beca_puntaje.length; i++){
        if(puntaje>=resultado.beca_puntaje[i]){
            return resultado.beca_porcentaje[i];
        }
    }
    return 0;
};

/*Output condicional en base a los puntajes ingresados */
function mostrarResultado(carrera,lengua,mates,ciencia,nem,ranking){
    let resultado = datos_carreras.find((el)=> el.carrera_id === carrera);
    let ponderado = ponderacion(resultado,[nem,ranking,mates,lengua,ciencia]);
    let beca_simulada = beca(resultado,ponderado);
    resultadoDOM.innerHTML = `<p>Su puntaje ponderado es de: ${ponderado}</p><p>Su beca simulada cubre el ${beca_simulada}% de su carrera de <strong>${resultado.carrera}</strong></p>` ;
    
    /*Operador optimizado*/
    beca_simulada> 0 ? felicitacionDOM.innerHTML = "<h2>FELICITACIONES</h2><p>Tu puntaje simulado te hace elegible  para una beca, para más información visita la secciones de \"Financiamiento\"</p>" : felicitacionDOM.innerHTML = "";
};

/*Datos estandar para el calculo del puntaje, son constantes */
let datos_carreras =[
    {carrera_id:1, carrera: "Medicina"  , ponderacion: [.2, .15, .35, .2,  .1 ], beca_puntaje:[900, 800, 650], beca_porcentaje:[100, 95, 80]},
    {carrera_id:2, carrera: "Derecho"   , ponderacion: [.2, .2,  .1,  .25, .25], beca_puntaje:[800, 750, 650], beca_porcentaje:[90,  80, 70]},
    {carrera_id:3, carrera: "Ingeniería", ponderacion: [.1, .25, .2,  .1,  .2 ], beca_puntaje:[750, 700, 650], beca_porcentaje:[90,  85, 75]}
];

/*Tarjeta de Log In como Pop Up en la pagina */
let tarjetaLogIn = document.createElement("div");
tarjetaLogIn.classList.add('enterCard');
tarjetaLogIn.innerHTML = "<div><p>Inicio de sesión</p></div><div><form id='loginCard'><input type='text' placeholder='usuario'><input type='submit' value='Aceptar'></form></div>";

/* Utilización del session storage para almacenar examnes y/o ensayos anteriores realizados por la persona*/
let inicioSesion = document.getElementById("loginBtn");
inicioSesion.onclick = () => {document.body.append(tarjetaLogIn);
                              let formularioSesion = document.getElementById("loginCard");
                              formularioSesion.addEventListener("submit",(e)=>{
                                e.preventDefault();
                                let formulario = e.target;
                                sessionStorage.setItem("usuario",formulario.children[0].value);
                                inicioSesion.innerHTML = `<a href="#">${sessionStorage.getItem("usuario")}</a>`;
                                let tarjeta = document.querySelector(".enterCard");
                                tarjeta.remove();
                              })
};

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
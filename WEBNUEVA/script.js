const CODIGO_CORRECTO = "68072320";
const fechaObjetivo = new Date("2025-11-10T20:56:00").getTime();

let intervalo = null;

function mostrarPantalla(num) {
  document.querySelectorAll(".pantalla").forEach(p => p.style.display = "none");
  const el = document.getElementById("pantalla" + num);
  if (el) el.style.display = "block";
}

function verificarCodigo() {
  const input = document.getElementById("codigoInput").value;
  if (input === CODIGO_CORRECTO) {
    mostrarPantalla(2);
    iniciarCuentaRegresiva();
  } else {
    alert("Contraseña incorrecta");
  }
}

function iniciarCuentaRegresiva() {
  const fechaInicio = Date.now();
  const tiempoTotal = fechaObjetivo - fechaInicio;
  const contadorElemento = document.getElementById("contador");
  const luna = document.getElementById("luna");
  const overlay = document.getElementById("oscurecer");

  if (intervalo) clearInterval(intervalo);

  // Si ya pasó la fecha, colocar luna y overlay sin transición
  if (tiempoTotal <= 0) {
    contadorElemento.innerText = "";
    if (luna) {
      luna.style.transition = "none"; // quitar animación
      luna.style.left = "50%";
      luna.style.transform = "translateX(-50%) rotate(0deg)";
    }
    if (overlay) overlay.style.opacity = "0.7";
    return;
  }

  // Función que actualiza cada segundo
  function actualizar() {
    const ahora = Date.now();
    const distancia = fechaObjetivo - ahora;

    if (distancia <= 0) {
      clearInterval(intervalo);
      contadorElemento.innerText = "";
      if (luna) {
        luna.style.transition = "none"; // quitar animación
        luna.style.left = "50%";
        luna.style.transform = "translateX(-50%) rotate(0deg)";
      }
      if (overlay) overlay.style.opacity = "0.7";
      return;
    }

    // calcular tiempo restante
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
    contadorElemento.innerText = `${dias}d ${horas}h ${minutos}m ${segundos}s`;

    // progreso de 0 a 1
    const progreso = 1 - distancia / tiempoTotal;

    // mover luna desde -30% hasta 50%
    const inicio = 0;
    const fin = 50;
    const nuevaPos = inicio + (fin - inicio) * progreso;

    if (luna) {
      // dejar transición por defecto definida en CSS
      luna.style.left = nuevaPos + "%";
      luna.style.transform = `translateX(-50%) rotate(${progreso * 360}deg)`; // ejemplo de giro
    }

    if (overlay) overlay.style.opacity = (0.7 * progreso).toString();
  }

  actualizar(); // ejecutar inmediatamente
  intervalo = setInterval(actualizar, 1000);
}



mostrarPantalla(1);

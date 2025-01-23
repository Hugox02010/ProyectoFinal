let mensaje = document.getElementById("mensaje");
let dropzone = document.getElementById("dropzone");
let tequila = document.getElementById("tequila");


tequila.addEventListener("dragstart", function () {
    mensaje.textContent = "Arrastrando la botella...";
});


dropzone.addEventListener("dragover", function (event) {
    event.preventDefault(); // Permite el drop
    dropzone.classList.add("dragover");
});


dropzone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropzone.classList.remove("dragover");
    mensaje.innerHTML = `
        ¡Felicidades, has ganado una botella!
        <a href="https://www.aamexico.org.mx/" target="_blank" style="color:blue; text-decoration:underline;">
            Da clic aquí para reclamarla.
        </a>
    `;
});


dropzone.addEventListener("dragleave", function () {
    dropzone.classList.remove("dragover");
});


function escalarImagen(event) {
    let imagen = event.target;
    imagen.style.transform = imagen.style.transform == "scale(1)" ? "scale(1.5)" : "scale(1)";
}


let imagenes = document.querySelectorAll(".botellaImagen");
imagenes.forEach(imagen => {
    imagen.addEventListener("click", escalarImagen);
});


let tequila2 = document.getElementById("tequila2");
let posicion1 = 10;
let direccion1 = "derecha";


function moverImagen() {
    let intervalo = setInterval(function() {

        if (direccion1 === "derecha" && posicion1 >= window.innerWidth - tequila2.offsetWidth) {
            direccion1 = "izquierda";
        } else if (direccion1 === "izquierda" && posicion1 <= 10) {
            direccion1 = "derecha";
        }


        if (direccion1 === "derecha") {
            posicion1++;
        } else {
            posicion1--;
        }

        tequila2.style.left = posicion1 + "px";
    }, 5);
}

window.onload = moverImagen;


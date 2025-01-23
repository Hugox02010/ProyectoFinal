import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyACdGSBO4ZVFBzy7blUsplKVpyOc4Um0uY",
    authDomain: "proyectofinal-1b0bf.firebaseapp.com",
    projectId: "proyectofinal-1b0bf",
    storageBucket: "proyectofinal-1b0bf.appspot.com",
    messagingSenderId: "303985839012",
    appId: "1:303985839012:web:d32a08d9719c664f0dcf31"
};

const app = initializeApp(firebaseConfig);

/* Inicialización de Firestore */
const db = getFirestore(app);
const botellasRef = collection(db, "botellas");
const botellasSelect = document.getElementById("botellasSelect");


async function cargarBotellas() {
    botellasSelect.innerHTML = '<option value="">---Seleccione una Botella---</option>';
    try {
        const querySnapshot = await getDocs(botellasRef);
        querySnapshot.forEach((doc) => {
            const botella = doc.data();
            const option = document.createElement("option");
            option.value = doc.id; // ID del documento
            option.text = botella.nombre || "Sin nombre";
            botellasSelect.add(option);
        });
    } catch (error) {
        console.error("No se pudo cargar la lista de botellas:", error);
        alert("Error al cargar la lista de botellas.");
    }
}


function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("tipo").value = "default";
    document.getElementById("contenido").value = "";
    document.getElementById("grado").value = "";
    botellasSelect.selectedIndex = 0;
}


function validarCampos() {
    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const tipo = document.getElementById("tipo").value;
    const contenido = parseInt(document.getElementById("contenido").value);
    const grado = parseFloat(document.getElementById("grado").value);

    if (!nombre || isNaN(precio) || tipo === "default" || isNaN(contenido) || isNaN(grado)) {
        alert("Por favor, completa toda la información.");
        return null;
    }

    return { nombre, precio, tipo, contenido, grado };
}


document.getElementById("registrar").addEventListener("click", async () => {
    const nuevaBotella = validarCampos();
    if (!nuevaBotella) return;

    try {
        const docRef = await addDoc(botellasRef, nuevaBotella);
        console.log("Botella registrada con ID:", docRef.id);
        alert("Botella registrada con éxito.");
        limpiarCampos();
        await cargarBotellas();
    } catch (error) {
        console.error("Error al registrar la botella:", error);
        alert("Error al registrar la botella.");
    }
});


botellasSelect.addEventListener("change", async () => {
    const botellaId = botellasSelect.value;

    if (botellaId) {
        try {
            const docRef = doc(db, "botellas", botellaId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const botella = docSnap.data();
                document.getElementById("nombre").value = botella.nombre || "";
                document.getElementById("precio").value = botella.precio || "";
                document.getElementById("tipo").value = botella.tipo || "default";
                document.getElementById("contenido").value = botella.contenido || "";
                document.getElementById("grado").value = botella.grado || "";
            } else {
                alert("El documento seleccionado no existe.");
            }
        } catch (error) {
            console.error("Error al cargar los datos de la botella:", error);
            alert("Error al cargar la información de la botella.");
        }
    } else {
        limpiarCampos();
    }
});


document.getElementById("actualizar").addEventListener("click", async () => {
    const botellaId = botellasSelect.value;
    if (!botellaId) {
        alert("Por favor, selecciona una botella.");
        return;
    }

    const botellaActualizada = validarCampos();
    if (!botellaActualizada) return;

    try {
        const botellaRef = doc(db, "botellas", botellaId);
        await updateDoc(botellaRef, botellaActualizada);
        console.log("Botella actualizada con éxito.");
        alert("Botella actualizada con éxito.");
        await cargarBotellas();
    } catch (error) {
        console.error("Error al actualizar la botella:", error);
        alert("Error al actualizar la botella.");
    }
});


document.getElementById("eliminar").addEventListener("click", async () => {
    const botellaId = botellasSelect.value;
    if (!botellaId) {
        alert("Por favor, selecciona una botella.");
        return;
    }

    try {
        await deleteDoc(doc(db, "botellas", botellaId));
        console.log("Botella eliminada con éxito.");
        alert("Botella eliminada con éxito.");
        limpiarCampos();
        await cargarBotellas();
    } catch (error) {
        console.error("Error al eliminar la botella:", error);
        alert("Error al eliminar la botella.");
    }
});


document.getElementById("limpiar").addEventListener("click", limpiarCampos);


cargarBotellas().then();




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


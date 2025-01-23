let salida = {
    historia_del_alcohol: {
        origen: undefined,
        desarrollo: undefined,
        expansion_en_europa: undefined,
        tipos_de_licor: {},
        primeros_licores: {},
        quienes_consumian_mas: {},
        consumo_actual: {}
    }
};

function cargarResumen() {
    fetch("resumen.json")
        .then(response => response.json())
        .then(function (datos) {
            salida.historia_del_alcohol.origen = datos.historia_del_alcohol.origen ?? "Información no disponible.";
            salida.historia_del_alcohol.desarrollo = datos.historia_del_alcohol.desarrollo ?? "Información no disponible.";
            salida.historia_del_alcohol.expansion_en_europa = datos.historia_del_alcohol.expansion_en_europa ?? "Información no disponible.";
            salida.historia_del_alcohol.tipos_de_licor = datos.historia_del_alcohol.tipos_de_licor ?? {};
            salida.historia_del_alcohol.primeros_licores = datos.historia_del_alcohol.primeros_licores ?? {};
            salida.historia_del_alcohol.quienes_consumian_mas = datos.historia_del_alcohol.quienes_consumian_mas ?? {};
            salida.historia_del_alcohol.consumo_actual = datos.historia_del_alcohol.consumo_actual ?? {};


            document.getElementById("origen").textContent = salida.historia_del_alcohol.origen;
            document.getElementById("desarrollo").textContent = salida.historia_del_alcohol.desarrollo;
            document.getElementById("expansion_europa").textContent = salida.historia_del_alcohol.expansion_en_europa;


            document.getElementById("tipos_de_licor").innerHTML = Object.keys(salida.historia_del_alcohol.tipos_de_licor).map(key => {
                return `<li><strong>${key}:</strong> ${salida.historia_del_alcohol.tipos_de_licor[key]}</li>`;
            }).join("");


            document.getElementById("primeros_licores").innerHTML = Object.keys(salida.historia_del_alcohol.primeros_licores).map(key => {
                return `<li><strong>${key}:</strong> ${salida.historia_del_alcohol.primeros_licores[key]}</li>`;
            }).join("");


            document.getElementById("quienes_consumian_mas").innerHTML = Object.keys(salida.historia_del_alcohol.quienes_consumian_mas).map(key => {
                return `<li><strong>${key}:</strong> ${salida.historia_del_alcohol.quienes_consumian_mas[key]}</li>`;
            }).join("");


            document.getElementById("consumo_actual").innerHTML = Object.keys(salida.historia_del_alcohol.consumo_actual).map(key => {
                return `<li><strong>${key}:</strong> ${salida.historia_del_alcohol.consumo_actual[key]}</li>`;
            }).join("");
        })
        .catch(error => console.log(`Error al cargar el recurso: ${error}`));
}


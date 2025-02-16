
// Opciones de subcategorías para cada tipo de material
const subcategorias = {
    Papel: ["Archivo", "Cartulina y/o plegadiza", "Kraf", "Revista", "Prensa"],
    Cartón: ["Cartón", "Tubo"],
    Plástico: ["PET transparente", "PET aceite", "PET café", "PET verde", "Transparente", "Policolor"],
    Metal: ["Alambre", "Aluminio olla", "Bronce", "Chatarra", "Clausen lata", "Cobre",],
    Pasta: ["Cajones de gaseosa/cerveza", "Canecas 5 galones", "Sillas Rimax", "Canastillas", "Ganchos de ropa", "Tarros de Límpido", "Envases de shampoo", "Envases de manteca", "Tarros de pintura", "Tubos de PVC",],
    Vídrio: ["Vidrio casco transparente limpio", "Vidrio casco transparente sucio", "Vidrio casco verde", "Vidrio casco café", "Vidrio casco azul",],
    RAEE: ["Computadores", "Teclados", "Mouse", "pantallas", "Luminarias", "Cables", "Registradoras", "Calculadoras", "Fax", "Maquinas de escribir"],
    Otros: ["Sacas", "Escritorios", "Archivadores", "Sillas"],
};

// Elementos del formulario
const tipoMaterialSelect = document.getElementById("tipoMaterial");
const subcategoriaSelect = document.getElementById("subcategoria");

// Actualizar subcategorías dinámicamente
tipoMaterialSelect.addEventListener("change", function () {
    const materialSeleccionado = tipoMaterialSelect.value;

    // Limpiar opciones anteriores
    subcategoriaSelect.innerHTML = '<option value="">Seleccione una subcategoría</option>';

    // Agregar nuevas opciones basadas en el material seleccionado
    if (materialSeleccionado && subcategorias[materialSeleccionado]) {
        subcategorias[materialSeleccionado].forEach((subcategoria) => {
            const option = document.createElement("option");
            option.value = subcategoria;
            option.textContent = subcategoria;
            subcategoriaSelect.appendChild(option);
        });
    }
});

// Autollenar el campo de fecha con formato "Mes Año"
document.addEventListener("DOMContentLoaded", function () {
    const fechaInput = document.getElementById("fecha");

    // Lista de meses en español
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const hoy = new Date();
    const mes = meses[hoy.getMonth()];
    const anio = hoy.getFullYear();
    const fechaFormateada = `${mes} ${anio}`;

    fechaInput.value = fechaFormateada;
});


// Manejar el envío del formulario
document.getElementById("registroForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evitar el envío tradicional del formulario

    // Recopilar los datos del formulario
    const formData = {
        empresa: document.getElementById("empresa").value,
        tipoMaterial: tipoMaterialSelect.value,
        subcategoria: subcategoriaSelect.value,
        peso: document.getElementById("peso").value,
        fecha: document.getElementById("fecha").value,
    };

    try {
        // Enviar los datos al Apps Script
        const response = await fetch("https://script.google.com/macros/s/AKfycbxnl58plTN7L9mD2Fqm3QzWHLAHCMQaiZEET8tiFYDHMTBWq0m_p_W_e9PPaCnLjiQ7/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json()
        console.log(result)


        if (result.success) {
            alert("¡Datos enviados exitosamente!");
            document.getElementById("registroForm").reset(); 
            subcategoriaSelect.innerHTML = '<option value="">Seleccione una subcategoría</option>';
        } else {
            alert("Error al enviar los datos " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor.");
    }
});

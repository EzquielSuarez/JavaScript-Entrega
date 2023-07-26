// //Simulación de compra de Sandwich
// let sandwiches = [
//     { nombre: "pollo", precio: 700 },
//     { nombre: "carne", precio: 800 },
//     { nombre: "vegetariano", precio: 550 }
//   ];
  
//   let ingredientesDisponibles = ["Jamon", "Lechuga", "Tomate","Mayonesa","Mostaza"];
  
//   let tipoSandwich = "";
//   let precioTotal = 0;
//   let ingredientesElegidos = [];
//   let agregarPapasFritas = false;
//   const cargoPapasFritas = 250; // Precio adicional por las papas fritas
  
//   //Agregar ingredientes al pedido
//   function agregarIngrediente(ingrediente) {
//     if (!isNaN(ingrediente)) {
//       let indiceIngrediente = parseInt(ingrediente);
//       if (indiceIngrediente >= 0 && indiceIngrediente < ingredientesDisponibles.length) {
//         ingredientesElegidos.push(ingredientesDisponibles[indiceIngrediente]);
//       } else {
//         alert("El número de ingrediente ingresado no es válido.");
//       }
//     } else {
//       if (ingredientesDisponibles.includes(ingrediente)) {
//         ingredientesElegidos.push(ingrediente);
//       } else {
//         alert("El ingrediente ingresado no está disponible.");
//       }
//     }
//   }
  
//   //Agregar papas fritas al pedido y sumar el cargo adicional al precio total
//   function agregarPapas() {
//     agregarPapasFritas = confirm("¿Deseas agregar papas fritas por un costo adicional de $" + cargoPapasFritas.toFixed(2) + "?" + ", " + "Si no desea seleccionar Cancelar");
//     if (agregarPapasFritas) {
//       precioTotal += cargoPapasFritas;
//     }
//   }
  
//   //Resumen de la compra
//   function mostrarResumenSandwich() {
//     let resumen = "Resumen de la compra:\n\n";
//     resumen += "Tipo de sándwich: " + tipoSandwich + "\n";
//     resumen += "Ingredientes: " + ingredientesElegidos.join(", ") + "\n";
//     resumen += "Papas fritas: " + (agregarPapasFritas ? "Sí" : "No") + "\n";
//     resumen += "Precio total: $" + precioTotal.toFixed(2);
//     alert(resumen);
//   }
  
//   //Mensaje de sándwich disponibles
//   let mensajeSandwiches = "Sándwich disponibles:\n";
//   for (let i = 0; i < sandwiches.length; i++) {
//     mensajeSandwiches += i + " -> " + sandwiches[i].nombre + " ($" + sandwiches[i].precio.toFixed(2) + ")\n";
//   }
  
//   let tipoSandwichValido = false;
//   while (!tipoSandwichValido) {
//     tipoSandwich = prompt("Seleccione el tipo de sándwich (número):  " + mensajeSandwiches);
//     if (!isNaN(tipoSandwich)) {
//       let indiceSandwich = parseInt(tipoSandwich);
//       if (indiceSandwich >= 0 && indiceSandwich < sandwiches.length) {
//         tipoSandwich = sandwiches[indiceSandwich].nombre;
//         precioTotal += sandwiches[indiceSandwich].precio;
//         tipoSandwichValido = true;
//       } else {
//         alert("Ingresado un numero de sándwich válido.");
//       }
//     } else {
//       alert("El tipo de sándwich ingresado no es válido.");
//     }
//   }
  
//   // Mensaje con los ingredientes disponibles
//   let mensajeIngredientes = "Ingredientes disponibles:\n";
//   for (let i = 0; i < ingredientesDisponibles.length; i++) {
//     mensajeIngredientes += i + " -> " + ingredientesDisponibles[i] + "\n";
//   }
  
//   let continuar = true;
//   while (continuar) {
//     let ingrediente = prompt("Ingrese los ingredientes que desea (o escriba 'esc' para finalizar):  " + mensajeIngredientes);
  
//     if (ingrediente.toLowerCase() === "esc") {
//       continuar = false;
//     } else {
//       agregarIngrediente(ingrediente);
//     }
//   }
  
//   agregarPapas();
//   mostrarResumenSandwich();










// Obtiene los datos guardados en el almacenamiento local (si existen)
let sandwichData = localStorage.getItem('sandwichData');
let ingredientData = localStorage.getItem('ingredientData');
let papasData = localStorage.getItem('papasData');

// Si no hay datos guardados, se inicializan con valores predeterminados
if (!sandwichData) {
  sandwichData = JSON.stringify([
    { nombre: 'pollo', precio: 700 },
    { nombre: 'carne', precio: 800 },
    { nombre: 'vegetariano', precio: 550 },
  ]);
  localStorage.setItem('sandwichData', sandwichData);
} else {
  sandwichData = JSON.parse(sandwichData);
}

if (!ingredientData) {
  ingredientData = JSON.stringify([
    { name: 'Jamon', precio: 1.5 },
    { name: 'Lechuga', precio: 0.8 },
    { name: 'Tomate', precio: 0.5 },
    { name: 'Mayonesa', precio: 0.7 },
    { name: 'Mostaza', precio: 0.6 }
  ]);
  localStorage.setItem('ingredientData', ingredientData);
} else {
  ingredientData = JSON.parse(ingredientData);
}

if (!papasData) {
  papasData = JSON.stringify({ agregarPapasFritas: false, cargoPapasFritas: 250 });
  localStorage.setItem('papasData', papasData);
} else {
  papasData = JSON.parse(papasData);
}

// Referencias a elementos del DOM
const sandwichSelect = document.getElementById('sandwich-select');
const ingredientList = document.getElementById('ingredient-list');
const papasCheckbox = document.getElementById('papas-checkbox');
const resumenButton = document.getElementById('resumen-button');
const resumenModal = document.getElementById('resumen-modal');
const resumenContent = document.getElementById('resumen-content');

// Crea las opciones del select para los tipos de sándwich
sandwichData.forEach((sandwich, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.text = sandwich.nombre + ' ($' + sandwich.precio.toFixed(2) + ')';
  sandwichSelect.appendChild(option);
});

// Crea las opciones de los ingredientes con precios
ingredientData.forEach((ingredient, index) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'ingredient';
  checkbox.value = index;

  const price = document.createElement('span');
  price.className = 'ingredient-price';
  price.textContent = '$' + ingredient.precio.toFixed(2);

  const label = document.createElement('label');
  label.textContent = ingredient.name;
  label.appendChild(checkbox);
  label.appendChild(price);

  const listItem = document.createElement('li');
  listItem.appendChild(label);
  ingredientList.appendChild(listItem);
});

// Actualiza la selección de las papas fritas
papasCheckbox.checked = papasData.agregarPapasFritas;

// Actualiza el precio total en el resumen modal
function updatePrecioTotal() {
  const sandwichIndex = sandwichSelect.value;
  const sandwichPrecio = sandwichData[sandwichIndex].precio;
  let precioTotal = sandwichPrecio;

  const ingredientCheckboxes = document.querySelectorAll('input[name="ingredient"]:checked');
  ingredientCheckboxes.forEach((checkbox) => {
    const ingredientIndex = checkbox.value;
    precioTotal += ingredientData[ingredientIndex].precio * 0.1; // Precio adicional del ingrediente (10% del precio del sándwich)
  });

  if (papasCheckbox.checked) {
    precioTotal += papasData.cargoPapasFritas;
  }

  resumenContent.textContent = 'Precio total: $' + precioTotal.toFixed(2);
}

// Event listener para detectar cambios en los ingredientes y las papas fritas
ingredientList.addEventListener('change', updatePrecioTotal);
papasCheckbox.addEventListener('change', updatePrecioTotal);

// Event listener para mostrar el resumen modal
resumenButton.addEventListener('click', () => {
  resumenModal.style.display = 'block';
});

// Event listener para cerrar el resumen modal
resumenModal.addEventListener('click', (event) => {
  if (event.target === resumenModal) {
    resumenModal.style.display = 'none';
  }
});

// Guarda los datos en el almacenamiento local al cerrar la ventana o actualizar la página
window.addEventListener('beforeunload', () => {
  const sandwichIndex = sandwichSelect.value;
  const agregarPapasFritas = papasCheckbox.checked;

  localStorage.setItem('sandwichData', JSON.stringify(sandwichData));
  localStorage.setItem('ingredientData', JSON.stringify(ingredientData));
  localStorage.setItem('papasData', JSON.stringify({ agregarPapasFritas, cargoPapasFritas: papasData.cargoPapasFritas }));
});
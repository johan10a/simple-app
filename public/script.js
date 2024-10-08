function searchProduct() {
  const searchValue = document
    .getElementById("productSearch")
    .value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    const name = product.getAttribute("data-name").toLowerCase();
    if (name.includes(searchValue)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function checkStock(productId, maxStock) {
  const productInput = document.getElementById(productId);
  const productError = document.getElementById(productId + "Error");
  if (productInput.value > maxStock) {
    productInput.value = maxStock;
    productError.innerText = "Cantidad ajustada al máximo disponible";
  } else {
    productError.innerText = "";
  }
}

function enableCalculateButton() {
  const citySelect = document.getElementById("citySelect").value;
  const calculateButton = document.getElementById("calculateButton");
  calculateButton.disabled = citySelect === "";
}

function calculateTotal() {
  const escobaPrice = 3500;
  const combo904Price = 55000;

  const escobaStock = 50;
  const combo904Stock = 50;

  const escobaQuantity = document.getElementById("escoba").value;
  const combo904Quantity = document.getElementById("combo904").value;

  const escobaTotal = escobaQuantity * escobaPrice;
  const combo904Total = combo904Quantity * combo904Price;

  const subtotal = escobaTotal + combo904Total;
  const iva = subtotal * 0.19;
  const totalSinDomicilio = subtotal + iva;

  // Calcular el costo del domicilio
  const citySelect = document.getElementById("citySelect").value;
  let domicilioCost = 0;

  if (citySelect === "cali") {
    domicilioCost = 3000;
  } else if (citySelect === "palmira") {
    domicilioCost = 4500;
  } else if (citySelect === "jamundi" || citySelect === "yumbo") {
    domicilioCost = 7000;
  }

  const totalConDomicilio = totalSinDomicilio + domicilioCost;

  document.getElementById("total").innerText = totalConDomicilio.toFixed(2);

  let summaryHtml =
    "<table><tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Total</th></tr>";
  if (escobaQuantity > 0) {
    summaryHtml += `<tr><td>Escoba</td><td>${escobaQuantity}</td><td>${escobaPrice}</td><td>${escobaTotal}</td></tr>`;
  }
  if (combo904Quantity > 0) {
    summaryHtml += `<tr><td>Combo 904</td><td>${combo904Quantity}</td><td>${combo904Price}</td><td>${combo904Total}</td></tr>`;
  }
  summaryHtml += `<tr><td colspan="3">Subtotal</td><td>${subtotal}</td></tr>`;
  summaryHtml += `<tr><td colspan="3">IVA (19%)</td><td>${iva.toFixed(
    2
  )}</td></tr>`;
  summaryHtml += `<tr><td colspan="3">Costo de Domicilio</td><td>${domicilioCost}</td></tr>`;
  summaryHtml += `<tr><td colspan="3"><strong>Total</strong></td><td><strong>${totalConDomicilio.toFixed(
    2
  )}</strong></td></tr>`;
  summaryHtml += "</table>";

  document.getElementById("summary").innerHTML = summaryHtml;

  const newEscobaStock = escobaStock - escobaQuantity;
  const newCombo904Stock = combo904Stock - combo904Quantity;

  let inventoryHtml = "<h2>Inventario Actualizado</h2>";
  inventoryHtml += `<p>Escoba: ${newEscobaStock} unidades disponibles</p>`;
  inventoryHtml += `<p>Combo 904: ${newCombo904Stock} unidades disponibles</p>`;

  document.getElementById("inventory").innerHTML = inventoryHtml;
}

console.log("====================================");
console.log("Connected");
console.log("====================================");

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse response as JSON
  })
  .then((data) => {
    // Update HTML elements with fetched data
    const product = data.product;
    document.getElementById("product-vendor").textContent = product.vendor;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById(
      "compare-at-price"
    ).innerHTML = `<strike>${product.compare_at_price}</strike>`;
    document.getElementById("para").innerHTML = product.description;

    // Update main image
    const mainImage = document.getElementById("main-image");
    mainImage.src = product.images[0].src;
    mainImage.alt = product.title;

    // Update thumbnail images
    const thumbnailContainer = document.getElementById("thumbnail-container");
    product.images.forEach((image) => {
      const thumbnail = document.createElement("img");
      thumbnail.src = image.src;
      thumbnail.alt = product.title;
      thumbnailContainer.appendChild(thumbnail);
    });

    // Update color options
    const colorContainer = document.getElementById("color");
    product.options
      .find((option) => option.name === "Color")
      .values.forEach((color, index) => {
        const colorButton = document.createElement("button");
        colorButton.textContent = Object.keys(color)[0];
        colorButton.style.backgroundColor = Object.values(color)[0];
        colorButton.addEventListener("click", () => {
          // Handle color selection
        });
        colorContainer.appendChild(colorButton);
      });

    // Update size options
    const sizeSelect = document.getElementById("size");
    product.options
      .find((option) => option.name === "Size")
      .values.forEach((size) => {
        const sizeOption = document.createElement("option");
        sizeOption.textContent = size;
        sizeSelect.appendChild(sizeOption);
      });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Function to increment the value of the counter input
function incrementValue() {
  const quantityInput = document.getElementById("quantity");
  let value = parseInt(quantityInput.value, 10);
  value = isNaN(value) ? 1 : value;
  quantityInput.value = value + 1;
}

// Function to decrement the value of the counter input
function decrementValue() {
  const quantityInput = document.getElementById("quantity");
  let value = parseInt(quantityInput.value, 10);
  value = isNaN(value) ? 1 : value;
  quantityInput.value = value - 1 < 1 ? 1 : value - 1;
}
function selectColor(colorNumber) {
  // Remove 'selected' class from all buttons
  var buttons = document.getElementsByClassName("colors");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("selected");
  }

  // Add 'selected' class to the clicked button
  var selectedButton = document.querySelector(".color" + colorNumber);
  selectedButton.parentElement.classList.add("selected");
}

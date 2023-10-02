document.addEventListener("DOMContentLoaded", function () {
  const Catalogo = document.getElementById("Catalogo");
  const DetallesDeLaPrenda = document.getElementById("DetallesDeLaPrenda");
  const Volver = document.querySelector(".volver");
  let Ropa;

  function MostrarPrenda(Prenda) {
    localStorage.setItem("PrendaElegida", JSON.stringify(Prenda));
    window.location.href = "details.html";
  }

  const ListadoDeRopa = async () => {
    try {
      const response = await fetch("productos.json");
      Ropa = await response.json();
      Catalogo.innerHTML = "";
      Ropa.forEach((Prenda) => {
        const PrendaDiv = document.createElement("div");
        PrendaDiv.classList.add("Prenda");
        PrendaDiv.innerHTML = `
                    <h3>${Prenda.nombre}</h3>
                    <img src="${Prenda.imagen}" alt="${
          Prenda.código
        }" style="max-width: 200px; height: auto;">
                    <button class="ver-detalle" data-Prenda='${JSON.stringify(
                      Prenda
                    )}'>Ver Detalles</button>
                `;
        const botonVerDetalle = PrendaDiv.querySelector(".ver-detalle");
        botonVerDetalle.addEventListener("click", () => {
          MostrarPrenda(Prenda);
        });
        Catalogo.appendChild(PrendaDiv);
      });
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  function convertirAEstrellas(puntuación) {
    const estrellasLlenas = puntuación.length;
    const estrellasVacias = 5 - estrellasLlenas;

    const estrellasHTML =
      '<span class="estrella-llena">★</span>'.repeat(estrellasLlenas) +
      '<span class="estrella-vacia">☆</span>'.repeat(estrellasVacias);

    return `<p class="puntuacion-estrellas">${estrellasHTML}</p>`;
  }

  const RopaDetallada = () => {
    const PrendaElegida = JSON.parse(localStorage.getItem("PrendaElegida"));

    if (PrendaElegida) {
      DetallesDeLaPrenda.innerHTML = `
                <h3>${PrendaElegida.nombre}</h3>
                <p>${PrendaElegida.detalle}</p>
                <p>${PrendaElegida.descripcion}</p>
                <p>${PrendaElegida.Talles}</p>
                <p>Precio: ${PrendaElegida.precio.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}</p>
                <img src="${PrendaElegida.imagen}" alt="${
        PrendaElegida.código
      }" style="max-width: 400px; height: auto;">
                <p>${convertirAEstrellas(PrendaElegida.puntuación)}</p>
            `;
      Volver.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    } else {
      window.location.href = "index.html";
    }
  };

  ListadoDeRopa();

  if (DetallesDeLaPrenda) {
    RopaDetallada();
  }
});

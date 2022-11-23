const carrito = document.querySelector("#carrito");
const contenedorCarrrito = document.querySelector("#lista-carrito tbody");
const listaCursosBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

let articuloCarrito = [];

cargarEventListener();

function cargarEventListener() {
  // Presionar el botón agregar carrito en el catalogo
  listaCursos.addEventListener("click", agregarCurso);

  //Eliminar cursos del carro
  carrito.addEventListener("click", eliminarcurso);

  listaCursosBtn.addEventListener("click", vaciarCarrito);
}

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado);
  }
}

//Eliminar cursos del carrito
function eliminarcurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    articuloCarrito = articuloCarrito.filter((curso) => {
      return curso.id !== cursoId;
    });

    carritoHTML();
  }
}

function leerDatosCursos(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisar si el curso ya existe en el carrito
  const existe = articuloCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursos = articuloCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });

    articuloCarrito = [...cursos];
  } else {
    //agregar curso a la lista
    articuloCarrito = [...articuloCarrito, infoCurso];
  }

  carritoHTML();
}

//Mostrar el Carritode compras en el HTML
function carritoHTML() {
  // Limpiar en el HTMl
  limpiarHTML();

  // Recorre el carrito y genera HTML
  articuloCarrito.map((curso) => {
    const row = document.createElement("tr");
    const { imagen, precio, titulo, cantidad, id } = curso;
    row.innerHTML = `
            <td>
                <img src="${imagen}" width = "100" />
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

    contenedorCarrrito.appendChild(row);
  });
}

function limpiarHTML() {
  while (contenedorCarrrito.firstChild) {
    contenedorCarrrito.removeChild(contenedorCarrrito.firstChild);
  }
}

function vaciarCarrito() {
  articuloCarrito.splice(0);

  carritoHTML();
}

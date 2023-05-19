const body = document.querySelector("body")
const container = document.querySelector(".container")
const titulo = document.querySelector(".titulo")

//CONSEGUIR TODOS LOS OBJETOS DESDE EL SERVIDOR
fetch('http://localhost:3000/')
.then(respuesta => respuesta.json())
.then(datos => {
    //LISTAR EN UN ARRAY TODOS LOS OBJETOS
    const productos = datos.products.slice(0)

    //PINTAR DATOS EN EL HTML
    titulo.innerHTML = "Product's list:(" + productos.length +")"
    productos.forEach(producto => {
        let prod = crearProducto(producto)
        cardComponente(prod)
    })
})
.catch(error => {console.error(error)
    crearElemento('div', ['alert', 'alert-danger'], body, [atributo1={llave: 'role', valor: 'alert'}], error, false)
});


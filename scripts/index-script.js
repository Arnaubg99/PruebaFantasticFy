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
        let imagen = "./assets/error.jpg"
        if(producto.image){
            imagen = producto.image.src
        }
        //GUARDAR EL PRECIO MAS BAJO
        let precioMin = producto.variants.reduce((minimo, actual) =>{
            if(Number(actual.price) < Number(minimo.price)){
                return actual
            }else{
                return minimo
            };
        })
        //CREAR OBJETO CON LOS DATOS NECESARIOS PARA CREAR UNA CARD
        let prod = crearProducto(producto.id, producto.title, imagen, precioMin)

        cardComponente(prod)
    })
})
.catch(error => {console.error(error)
    crearElemento('div', ['alert', 'alert-danger'], body, [atributo1={llave: 'role', valor: 'alert'}], error, false)
});


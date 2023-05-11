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
        let prod = {
            id: producto.id,
            titulo : producto.title,
            img: imagen,
            precio: precioMin,
        }
        cardComponente(prod)
    })
})
.catch(error => {console.error(error)
    crearElemento('div', ['alert', 'alert-danger'], body, [atributo1={llave: 'role', valor: 'alert'}], error)
});

//FUNCIONES
//FUNCION PARA CREAR UN COMPONENTE CARD
function cardComponente(producto){
    let card = crearElemento('div', ['card'], container)
    crearElemento('img', ['card-img'], card, [atributo1={llave: 'src', valor: producto.img}])
    let cardInfoWrap = crearElemento('div', ['card-info-wrap'], card)
    crearElemento('h2', ['card-titulo'], cardInfoWrap, undefined, producto.titulo.toUpperCase())
    crearElemento('p', ['card-precio'], cardInfoWrap, undefined, "Price(from): " + producto.precio.price + " $")
    crearElemento('a', ['card-enlace'], cardInfoWrap, [atributo1={llave: 'href', valor: "./product-page.html?"+ producto.id}], "more info ->")
}
//FUNCION PARA CREAR UN NUEVO ELEMENTO DE HTML, AÑADIR LAS CLASES, ATRIBUTOS Y TEXTO E INTRODUCIRLO EN OTRO ELEMENTO
function crearElemento(tipo, clases, elementoPadre, atributos, texto){
    let nuevoElemento = document.createElement(tipo)
    if(clases){
        clases.forEach(clase=>{
            nuevoElemento.classList.add(clase)
        })
    }
    if(atributos){
       atributos.forEach(atributo => {
        nuevoElemento.setAttribute(atributo.llave, atributo.valor)
       })
    }
    if(texto){
        nuevoElemento.innerHTML = texto
    }
    if(elementoPadre){
        elementoPadre.appendChild(nuevoElemento)
    }
    return nuevoElemento
}
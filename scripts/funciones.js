//FUNCION PARA AÑADIR LA IMAGEN SI ES UNA SOLA O CREAR UN CAROUSEL SI SON VARIAS
function crearImagenes(producto){
    if(producto.images.length<=1){
        let imagen = "./assets/error.jpg"
        if(producto.image){
            imagen = producto.image.src
        }
        let productoImagen = crearElemento('img', ['producto-imagen'], undefined, [atributo1={llave: 'src', valor: imagen}], undefined, true)
        return productoImagen
    }else{
        let productoCarouselImagenes = crearElemento('div', ['carousel', 'slide'], undefined, [atributo1={llave: 'id', valor: 'carousel'}], undefined, true)
        let carouselInner = crearElemento('div', ['carousel-inner'], productoCarouselImagenes, undefined, undefined, true)
        let claseActiveAplicada = false;
        producto.images.forEach(imagen=>{
            let carouselItem = crearElemento('div', ['carousel-item'], carouselInner, undefined, undefined, true)
            if(!claseActiveAplicada){
                carouselItem.classList.add('active')
                claseActiveAplicada = true
            }
            crearElemento('img', ['d-block', 'imagen-carousel'], carouselItem, [atributo1={llave: 'imagen-id',valor: imagen.id},atributo2={llave:'src', valor: imagen.src}], undefined, false)
        })
        let botonPrevio = crearElemento('button', ['carousel-control-prev'], productoCarouselImagenes, [atributo1={llave: 'type', valor: 'button'}, atributo2={llave: 'data-bs-target', valor: '#carousel'}, atributo3={llave: 'data-bs-slide', valor: 'prev'}], undefined, true)
        crearElemento('img', ['flecha'], botonPrevio, [atributo1={llave: 'src', valor:"./assets/flecha.png"}, atributo2={llave: 'aria-hidden', valor: 'true'}], undefined, false)
        let botonSiguiente = crearElemento('button', ['carousel-control-next'], productoCarouselImagenes, [atributo1={llave: 'type', valor: 'button'}, atributo2={llave: 'data-bs-target', valor: '#carousel'}, atributo3={llave: 'data-bs-slide', valor: 'next'}], undefined, true)
        crearElemento('img', ['flecha', 'flecha-inversa'], botonSiguiente, [atributo1={llave: 'src', valor:"./assets/flecha.png"}, atributo2={llave: 'aria-hidden', valor: 'true'}], undefined, false)
         return productoCarouselImagenes
    }
}

//FUNCION PARA CREAR UN NUEVO ELEMENTO DE HTML, AÑADIR LAS CLASES, ATRIBUTOS Y TEXTO E INTRODUCIRLO EN OTRO ELEMENTO
function crearElemento(tipo, clases, elementoPadre, atributos, texto, returnNecesario){
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
    if(returnNecesario){
        return nuevoElemento
    }
}

//FUNCION PARA CREAR UN COMPONENTE CARD
function cardComponente(producto){
    let card = crearElemento('div', ['card'], container, undefined, undefined, true)
    crearElemento('img', ['card-img'], card, [atributo1={llave: 'src', valor: producto.img}], undefined, false)
    let cardInfoWrap = crearElemento('div', ['card-info-wrap'], card, undefined, undefined, true)
    crearElemento('h2', ['card-titulo'], cardInfoWrap, undefined, producto.titulo.toUpperCase(), false)
    crearElemento('p', ['card-precio'], cardInfoWrap, undefined, "Price(from): " + producto.precio.price + " $", false)
    crearElemento('a', ['card-enlace'], cardInfoWrap, [atributo1={llave: 'href', valor: "./product-page.html?"+ producto.id}], "more info ->", false)
}
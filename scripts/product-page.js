const url = window.location.href;
const id = String(url.split("?").slice(1));
const body =document.querySelector("body")
const container = document.querySelector('.container')
const productoSelect = document.querySelector(".producto-select")
if(!id){
    crearElemento('div', ['alert', 'alert-danger'], body, [atributo1={llave: 'role', valor:'alert'}], 'No se ha encontrado la id del objeto.')
    container.style.display= 'none';
}else{
    //CONSEGUIR TODA LA INFORMACION DEL OBJETO SELECCIONADO DESDE EL SERVIDOR
    fetch('http://localhost:3000/'+id)
    .then(respuesta => respuesta.json())
    .then(producto => {
        //CREAR ELEMENTOS PRINCIPALES
        let productoContainer = crearElemento('div', ['producto-container'], container)
        let productoImagenWrap =  crearElemento('div', ['producto-imagen-wrap'], productoContainer)
        let productoInfoWrap = crearElemento('div', ['producto-info-wrap'], productoContainer)
        let productoTitulo = crearElemento('h1', ['producto-titulo'], productoInfoWrap)
        let productoInfoBody = crearElemento('div', ['producto-info-body'], productoInfoWrap)
        let productoDescripcion = crearElemento('p', ['producto-descripcion'], productoInfoBody)
        let productoPrecio = crearElemento('p', ['producto-precio'], productoInfoBody)
        let productoSelect = crearElemento('select', ['producto-select'], productoInfoBody)

        //PINTAR DATOS EN EL HTML
        document.title = producto.title
        productoTitulo.innerHTML = producto.title.toUpperCase()
        let productoImagen = crearImagenes(producto)
        productoImagenWrap.appendChild(productoImagen)
        if(producto.body_html){
            productoDescripcion.innerHTML = producto.body_html
        }else{
            productoDescripcion.innerHTML = "Product's description not found."
        }
        productoPrecio.innerHTML = producto.variants[0].price + " $"

        //AÑADIR TODAS LAS VARIANTES DENTRO DEL SELECT
        producto.options[0].values.forEach(variante => {
            crearElemento('option', undefined ,productoSelect, [atributo1={llave: 'value', valor: variante}], variante)
        });
        
        //LISTAR EN UN ARRAY TODAS LAS IMAGENES DE CAROUSEL
        const arrayImagenes =  [...document.querySelectorAll('.carousel-item')];
        productoSelect.addEventListener('change', function(){
            //CONSEGUIR ID DE IMAGEN SELECCIONADA
            let productoEncontrado = producto.variants.find(variante => variante.option1 === productoSelect.value);
            let idImagen = Number(productoEncontrado.image_id)
            productoPrecio.innerHTML = productoEncontrado.price + " $"
            if(producto.images.length>1){
                //RETIRAR CLASE ACTIVE A IMAGEN ACTUAL
                let imagenActivaBefore = arrayImagenes.find(img => 
                    img.classList.contains('active') === true);
                imagenActivaBefore.classList.remove('active')

                //AÑADIR CLASE ACTIVE A IMAGEN SELECCIONADA
                let imagenActivaAfter = arrayImagenes.find(img => 
                    Number(img.querySelector('.imagen-carousel').getAttribute('imagen-id')) === idImagen);
                imagenActivaAfter.classList.add('active')
            }
        })
    })
    .catch(error => {console.error(error)
        crearElemento('div', ['alert', 'alert-danger'], body, [atributo1={llave: 'role', valor:'alert'}], error)
    });
}


//FUNCIONES
//FUNCION PARA AÑADIR LA IMAGEN SI ES UNA SOLA O CREAR UN CAROUSEL SI SON VARIAS
function crearImagenes(producto){
    if(producto.images.length<=1){
        let imagen = "./assets/error.jpg"
        if(producto.image){
            imagen = producto.image.src
        }
        let productoImagen = crearElemento('img', ['producto-imagen'], undefined, [atributo1={llave: 'src', valor: imagen}])
        return productoImagen
    }else{
        let productoCarouselImagenes = crearElemento('div', ['carousel', 'slide'], undefined, [atributo1={llave: 'id', valor: 'carousel'}])
        let carouselInner = crearElemento('div', ['carousel-inner'], productoCarouselImagenes)
        let claseActiveAplicada = false;
        producto.images.forEach(imagen=>{
            let carouselItem = crearElemento('div', ['carousel-item'], carouselInner)
            if(!claseActiveAplicada){
                carouselItem.classList.add('active')
                claseActiveAplicada = true
            }
            crearElemento('img', ['d-block', 'imagen-carousel'], carouselItem, [atributo1={llave: 'imagen-id',valor: imagen.id},atributo2={llave:'src', valor: imagen.src} ])
        })
        let botonPrevio = crearElemento('button', ['carousel-control-prev'], productoCarouselImagenes, [atributo1={llave: 'type', valor: 'button'}, atributo2={llave: 'data-bs-target', valor: '#carousel'}, atributo3={llave: 'data-bs-slide', valor: 'prev'}])
        crearElemento('img', ['flecha'], botonPrevio, [atributo1={llave: 'src', valor:"./assets/flecha.png"}, atributo2={llave: 'aria-hidden', valor: 'true'}])
        let botonSiguiente = crearElemento('button', ['carousel-control-next'], productoCarouselImagenes, [atributo1={llave: 'type', valor: 'button'}, atributo2={llave: 'data-bs-target', valor: '#carousel'}, atributo3={llave: 'data-bs-slide', valor: 'next'}])
        crearElemento('img', ['flecha', 'flecha-inversa'], botonSiguiente, [atributo1={llave: 'src', valor:"./assets/flecha.png"}, atributo2={llave: 'aria-hidden', valor: 'true'}])
        return productoCarouselImagenes
    }
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

//EFECTO NIEVE 
//CODIGO DE https://editor.p5js.org/Jeff-Aporta/sketches/Rs6Kz3LUG
    const CANTIDAD_COPOS = 80
    let copos = []
    function setup() {
        createCanvas(windowWidth, windowHeight)
        for (let i = 0; i < CANTIDAD_COPOS; i++) {
            copo = new Copo()
            copo.y = random(height)
            copos.push(copo)
        }
    }
    function windowResized(){
        resizeCanvas(windowWidth, windowHeight)
    }
    function draw() {
        clear()
        for (const copo of copos) {
            copo.dibujar()
        }
    }
    function Copo() {
        this.x = random(width)
        this.y = 0
        this.dy = random(1, 6)
        this.dibujar = function () {
            stroke("white")
            strokeWeight(this.dy)
            point(this.x, this.y)
            this.x += random(-1, 1)
            this.y += this.dy
            if (this.y > height) {
                let i = copos.indexOf(this)
                copos.splice(i, 1)
                copos.push(new Copo())
            }
        }
    }


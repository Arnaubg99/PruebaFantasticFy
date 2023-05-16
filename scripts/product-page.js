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
        let productoContainer = crearElemento('div', ['producto-container'], container, undefined, undefined, true)
        let productoImagenWrap =  crearElemento('div', ['producto-imagen-wrap'], productoContainer, undefined, undefined, true)
        let productoInfoWrap = crearElemento('div', ['producto-info-wrap'], productoContainer, undefined, undefined, true)
        let productoTitulo = crearElemento('h1', ['producto-titulo'], productoInfoWrap, undefined, undefined, true)
        let productoInfoBody = crearElemento('div', ['producto-info-body'], productoInfoWrap, undefined, undefined, true)
        let productoDescripcion = crearElemento('p', ['producto-descripcion'], productoInfoBody, undefined, undefined, true)
        let productoPrecio = crearElemento('p', ['producto-precio'], productoInfoBody, undefined, undefined, true)
        let productoSelect = crearElemento('select', ['producto-select'], productoInfoBody, undefined, undefined, true)

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
            crearElemento('option', undefined ,productoSelect, [atributo1={llave: 'value', valor: variante}], variante, false)
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
        crearElemento('div', ['alert', 'alert-danger'], body, [atributo1={llave: 'role', valor:'alert'}], error, false)
    });
}

//FUNCIONES

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


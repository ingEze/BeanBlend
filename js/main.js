let productList = [];
let searchInput = document.querySelector('#search');

fetch('./products.json')
    .then(res => res.json())
    .then(data => {
        productList = data;
    })
    .catch(error => console.error('Error fetching products:', error));

searchInput.addEventListener('input', viewProducts);

function viewProducts() {
    let userSearch = searchInput.value.toLowerCase();
    let containerResults = document.querySelector('.results__container');
    containerResults.textContent = ''; // Limpiar el contenedor antes de mostrar los resultados

    let filteredProducts = productList.filter(product => {
        return product.name.toLowerCase().includes(userSearch);
    });

    if (userSearch === '') {
        return containerResults.style.display = 'none';
    }

    if (filteredProducts.length === 0) {
        containerResults.style.display = 'block';
        containerResults.innerHTML = '<p class="not__found"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>No results found</p>';
    } else {
        containerResults.style.display = 'block'
        filteredProducts.forEach(product => {
            let productElement = document.createElement('div');
            productElement.classList.add('results');
            productElement.innerHTML = `
                <div class="results__left">
                    <img src="${product.img}" alt="${product.name}" class="results__img">
                    <p>${product.name}</p>
                </div>
                <div class="results__price">
                    <p>${product.price}</p>
                </div>
            `;
            containerResults.appendChild(productElement);
        });
    }
}

//Scroll + add btn toTop
window.addEventListener('scroll', function() {
    let  heightWebsite = 
    this.document.documentElement.scrollHeight;
    let alturaVisible = 
    this.document.documentElement.clientHeight;
    let scrollUser = 
    this.document.documentElement.scrollTop;

    let porcentajeScroll = (scrollUser / (heightWebsite - alturaVisible)) * 100;

    if (porcentajeScroll > 5) {
        this.document.querySelector('.fa-arrow-up').style.display = 'flex';
    } else {
        this.document.querySelector('.fa-arrow-up').style.display = 'none';
    }

})

// navbar
const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.menu__icon');

document.querySelector('.navbar__menu').addEventListener('click', function(){

        if (!navbar.classList.contains('active')) {
            navbar.classList.add('active');
            menu.classList.toggle('fa-bars');
            menu.classList.toggle('fa-times-circle');
            menu.classList.add('active');
        } else {
            navbar.classList.remove('active');
            menu.classList.add('fa-bars');
            menu.classList.remove('fa-times-circle');
            document.querySelector('.results__container').style.display = 'none';
        }

    })
    
    
    // search
    
let searchIcon = document.querySelector('#searchIcon');
let cancelSearch = document.querySelector('.fa-x');
cancelSearch.style.display = 'none';
    

searchIcon.addEventListener('click', () => {
    if (!searchIcon.classList.contains('active')) {
        searchInput.classList.add('active');
        searchIcon.classList.add('active');
        cancelSearch.style.display = 'flex';
        cancelSearch.classList.add('active');
    }
})

cancelSearch.addEventListener('click', () => {
    if (cancelSearch) {
        searchInput.classList.remove('active');
        searchIcon.classList.remove('active');
        cancelSearch.style.display = 'none';
        document.querySelector('.results__container').style.display = 'none';
    }
})

if (window.innerWidth <= 1024) {
    let liHidden = document.querySelectorAll('.navbar__li.hidden');
    searchIcon.addEventListener('click',() => {
        if (searchIcon) {
            liHidden.forEach(li => {
                li.style.display = 'none'
            })
        }
    })

    cancelSearch.addEventListener('click', () => {
        if (cancelSearch) {
            liHidden.forEach(li => {
                li.style.display = 'flex';
            })
        }
    })

}

// hero 1

const images = document.querySelectorAll('.slide__img');
const prevButton = document.querySelector('.slide__arrow.left');
const nextButton = document.querySelector('.slide__arrow.right');
let currentIndex = 0;
let intervalId; // Variable para almacenar el ID del intervalo

// Función para iniciar el slide automático
function startSlideShow() {
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 6500);
}

function stopSlideShow() {
    clearInterval(intervalId);
}

// Función para reiniciar el slide automático después de 5 segundos de inactividad
function restartSlideShow() {
    setTimeout(startSlideShow, 5000); // Reiniciar después de 5 segundos
    stopSlideShow();
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    restartSlideShow(); 
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    restartSlideShow(); 
});
startSlideShow();


function showImage(index) {
    images.forEach((img, i) => {
        if (i === index) {
            img.style.display = 'flex';
        } else {
            img.style.display = 'none';
        }
    });
}

// hero2

let menuImage = document.querySelectorAll('.menu__card');
let menuPrevButton = document.querySelector('.menu__arrow.left');
let menuNextButton = document.querySelector('.menu__arrow.right');

menuPrevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + menuImage.length) % menuImage.length;
    menuShowImage(currentIndex);
})

menuNextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % menuImage.length;
    menuShowImage(currentIndex);
})

function menuShowImage(index) {
    menuImage.forEach((img, i) => {
        i === index ? img.style.display = 'flex' : img.style.display = 'none';
    })
}

// redireccion menu first btn
const btnMenu = document.querySelector('.btn--menu');

btnMenu.addEventListener('click', () => {
    location.href = 'pages/menu.html';
})
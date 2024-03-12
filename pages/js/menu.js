// Filter
const filterOption = document.querySelectorAll('.filter__option');
const cardsContainer = document.querySelector('#cards');
const filterSelect = document.querySelector('#filter');

let listCoffee = [];

fetch('../products.json')
    .then(res => res.json())
    .then(data => {
        listCoffee = data;
        viewList(listCoffee);
    })
    .catch(err => console.error('Error fetching products!', err));

// float

function viewList(coffeeArray) {
    cardsContainer.innerHTML = '';
    coffeeArray.forEach(coffee => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card__left">
                <img src=".${coffee.img}" alt="${coffee.name}" class="card__img">
                <p class="card__name">${coffee.name}</p>
            </div>
            <div class="card__right">
                <div class="card__price">
                    <p class="price">${coffee.price}</p>
                </div>
                <div class="add__product">
                    <i class="fa-solid fa-circle-plus" id="addProduct"></i>
                </div>
            </div> 
        `;
        cardsContainer.appendChild(card);

        const addProductButton = card.querySelector('.add__product');
        addProductButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Detener la propagación del evento para evitar que se ejecute la función en la tarjeta
        });

        card.addEventListener('click', () => {
            createCard(coffee);
            const floatContainer = document.querySelector('.float__container');
            const cancelFloat = document.querySelector('.float__cancel');
            const container = document.querySelector('.container');

            if (!container.classList.contains('hidden')) {
                container.classList.add('hidden');
                cancelFloat.classList.add('active');
                floatContainer.classList.add('active');
            }

            cancelFloat.addEventListener('click', () => {
                if (container.classList.contains('hidden')) {
                    container.classList.remove('hidden');
                    cancelFloat.classList.remove('active');
                    floatContainer.classList.remove('active');
                }
            });

        });
    });
}


function createCard(coffee) {
    const floatContainer = document.querySelector('.float__container');
        floatContainer.innerHTML = `
        <i class="fa-solid fa-circle-xmark float__cancel"></i>
        <img src=".${coffee.img}" alt="${coffee.name}" class="float__img">
        <h2 class="float__title">${coffee.name}</h2>
        <div class="float__info">
            <h4 class="float__price">${coffee.price}</h4>
            <p class="info">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, obcaecati.</p>
            <button class="float__btn">Add</button>
        </div>
        `;
    const cancelFloat = document.querySelector('.float__cancel');
    const container = document.querySelector('.container');

    if (!container.classList.contains('hidden')) {
        container.classList.add('hidden');
        cancelFloat.classList.add('active');
        floatContainer.classList.add('active');
    }

    cancelFloat.addEventListener('click', () => {
        if (container.classList.contains('hidden')) {
            container.classList.remove('hidden');
            cancelFloat.classList.remove('active');
            floatContainer.classList.remove('active');
        }
    });

    
}


// Agregar evento de cambio al menú desplegable
document.querySelector('#filter').addEventListener('change', function() {
    const selectedOption = this.value;
    let filteredCoffee = [];

    if (selectedOption === 'All') {
        filteredCoffee = listCoffee;
    } else {
        filteredCoffee = listCoffee.filter(coffee => coffee.type === selectedOption);
    }

    viewList(filteredCoffee);
});

viewList(listCoffee);

// search 
const searchInput = document.querySelector('#searchInput');
const searchIcon = document.querySelector('#searchIcon');
const cancelSeach = document.querySelector('.cancel__search');
cancelSeach.style.display = 'none';

searchIcon.addEventListener('click', () => {
    if (!searchIcon.classList.contains('active')) {
        searchIcon.classList.add('active');
        searchInput.classList.add('active');
        searchInput.focus();
        cancelSeach.style.display = 'block';
        cancelSeach.classList.add('active')
    }
})

cancelSeach.addEventListener('click', () => {
    if (cancelSeach.classList.contains('active')) {
        searchInput.value = '';
        searchIcon.classList.remove('active');
        searchInput.classList.remove('active');
        cancelSeach.style.display = 'none';
        cancelSeach.classList.remove('active');
        viewList(listCoffee);
    }
})

searchInput.addEventListener('input', search);

function search() {
    let userSearch = searchInput.value.toLowerCase();
    let results = cardsContainer;
    results.textContent = '';

    let filteredProducts = listCoffee.filter(product => {
        return product.name.toLowerCase().includes(userSearch);
    })

    if (userSearch === '') {
        return viewList(listCoffee);
    }

if (filteredProducts.length === 0) {
    results.innerHTML = '<p class="not__found"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>No results found</p>';
} else {
    filteredProducts.forEach(product => {
        let card = document.createElement('div');
        card.classList.add('card');

       

        card.innerHTML = `
            <div class="card__left">
            <img src=".${product.img}" alt="${product.name}" class="card__img">
            <p class="card__name">${product.name}</p>
        </div>
        <div class="card__right">
            <div class="card__price">
                <p class="price">${product.price}</p>
            </div>
            <div class="add__product">
                <i class="fa-solid fa-circle-plus" id="addProduct"></i>
            </div>
        </div> 
    `;
    cardsContainer.appendChild(card);

    card.addEventListener('click', function(e) {
        if (!e.target.closest('#addProduct')) {
            createCard(product);
        }
    })

})
}
}
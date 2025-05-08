const platformButtons = document.querySelectorAll('.platform');
const productCards = document.querySelectorAll('.card');
const noResultsMessage = document.querySelector('.no-results');
const searchInput = document.querySelector('.search-bar input');
const cartCountElement = document.getElementById('cart-count');
const cartButtons = document.querySelectorAll('.add-to-cart');
const miniaturas = document.querySelectorAll('.miniatura');
const imagenGrande = document.getElementById('imagenGrande');
const searchBar = document.querySelector('.search-bar');
const toggleButton = document.querySelector('.search-toggle');
let activePlatform = null;
let cartCount = 0;

function filterCards() {
  const searchValue = searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let anyVisible = false;

  productCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const platform = card.dataset.platform.toLowerCase();

    const matchesPlatform = !activePlatform || activePlatform === platform;
    const matchesSearch = title.includes(searchValue);

    if (matchesPlatform && matchesSearch) {
      card.style.display = '';
      anyVisible = true;
    } else {
      card.style.display = 'none';
    }
  });

  if (anyVisible) {
    noResultsMessage.style.display = 'none';
  } else {
    noResultsMessage.style.display = 'block';
  }
}

platformButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedPlatform = button.dataset.platform;

    if (activePlatform === selectedPlatform) {
      activePlatform = null;
      button.classList.remove('active');
    } else {
      activePlatform = selectedPlatform;
      platformButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
    }

    filterCards();
  });
});

searchInput.addEventListener('input', filterCards);

function addToCart() {
  cartCount++;
  cartCountElement.textContent = cartCount;
}

cartButtons.forEach(btn => {
  btn.addEventListener('click', addToCart);
});

function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

window.addEventListener("click", function (e) {
  const menu = document.getElementById("profileMenu");
  if (!e.target.closest(".profile-container")) {
    menu.style.display = "none";
  }
});

toggleButton.addEventListener('click', () => {
  searchBar.classList.toggle('active');
  if (searchBar.classList.contains('active')) {
    searchBar.querySelector('input').focus();
  }
});

miniaturas.forEach(miniatura => {
  miniatura.addEventListener('click', () => {
    const tempSrc = imagenGrande.src;
    imagenGrande.src = miniatura.src;
    miniatura.src = tempSrc;
  });
});


  const params = new URLSearchParams(window.location.search);
  const titulo = params.get('titulo');
  const precio = params.get('precio');

  if (titulo && precio) {
    document.querySelector('.pago-resumen-box p').textContent = titulo;
    document.querySelector('.pago-resumen-box strong').textContent = precio;
    document.querySelectorAll('.pago-resumen p strong')[1].textContent = precio;
  }

document.querySelectorAll('.card-button').forEach(boton => {
    boton.addEventListener('click', function() {
          
        if (this.textContent.trim().toLowerCase() === 'comprar') {
            
        const detalles = this.closest('.producto-detalles');
        const titulo = detalles.querySelector('h2').textContent;
        const precio = detalles.querySelector('.precio').textContent;
    
        const params = new URLSearchParams({
            titulo: titulo,
            precio: precio
        });
    
        window.location.href = `pago.html?${params.toString()}`;
        }
    });
});




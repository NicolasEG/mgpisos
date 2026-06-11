const loader = document.getElementById('loader');
const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

window.addEventListener('load', () => {

    setTimeout(() => {

        if(loader){
            loader.classList.add('hide');
        }

    }, 450);

});

/* =========================
   HEADER
========================= */

function updateHeader(){

    if(!header) return;

    if(window.scrollY > 40){
        header.classList.add('scrolled');
    }else{
        header.classList.remove('scrolled');
    }

}

window.addEventListener('scroll', updateHeader);
updateHeader();

/* =========================
   MENU MOBILE
========================= */

if(navToggle && mainNav){

    navToggle.addEventListener('click', () => {

        navToggle.classList.toggle('active');
        mainNav.classList.toggle('active');

    });

    document.querySelectorAll('.main-nav a').forEach(link => {

        link.addEventListener('click', () => {

            navToggle.classList.remove('active');
            mainNav.classList.remove('active');

        });

    });

}

/* =========================
   REVEAL SCROLL
========================= */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }

    });

},{
    threshold:.16
});

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

/* =========================
   HOVER 3D
========================= */

const cards = document.querySelectorAll(
    '.work-card, .service-item, .process-card, .service-card'
);

cards.forEach(card => {

    card.addEventListener('mousemove', e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rx = ((y / rect.height) - .5) * -5;
        const ry = ((x / rect.width) - .5) * 5;

        card.style.transform =
        `perspective(900px)
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        translateY(-4px)`;

    });

    card.addEventListener('mouseleave', () => {

        card.style.transform = '';

    });

});

/* =========================
   MODAL SERVICIOS
========================= */

const serviceCards = document.querySelectorAll('.service-card');

const serviceModal = document.getElementById('serviceModal');
const serviceTitle = document.getElementById('serviceTitle');
const serviceText = document.getElementById('serviceText');
const serviceClose = document.getElementById('serviceClose');

if(serviceCards.length){

    serviceCards.forEach(card => {

        card.addEventListener('click', () => {

            if(!serviceModal) return;

            serviceTitle.textContent = card.dataset.title;
            serviceText.textContent = card.dataset.text;

            serviceModal.classList.add('active');

            document.body.style.overflow = 'hidden';

        });

    });

}

if(serviceClose){

    serviceClose.addEventListener('click', () => {

        serviceModal.classList.remove('active');

        document.body.style.overflow = '';

    });

}

if(serviceModal){

    serviceModal.addEventListener('click', e => {

        if(e.target === serviceModal){

            serviceModal.classList.remove('active');

            document.body.style.overflow = '';

        }

    });

}

document.addEventListener('keydown', e => {

    if(e.key === 'Escape' && serviceModal?.classList.contains('active')){

        serviceModal.classList.remove('active');

        document.body.style.overflow = '';

    }

});

/* =========================
   CARRUSEL INFINITO
========================= */

const worksTrack = document.querySelector('.works-track');

if(worksTrack){

    worksTrack.innerHTML += worksTrack.innerHTML;

}

const btnWhatsapp = document.getElementById('btnWhatsapp');

if(btnWhatsapp){

    btnWhatsapp.addEventListener('click', () => {

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const consulta = document.getElementById('consulta').value;

        const mensaje =
`Hola, quisiera solicitar información.

Nombre: ${nombre}
Teléfono: ${telefono}
Email: ${email}

Consulta:
${consulta}`;

        const url =
`https://wa.me/5491140607822?text=${encodeURIComponent(mensaje)}`;

        window.open(url,'_blank');

    });

}
document.addEventListener("DOMContentLoaded", () => {
    const slides = [
        {
            image: "/img/ChatGPT%20Image%207%20de%20ago.%20de%202026,%2013_04_49.png",
            alt: "Imagem do carrossel 1"
        },
        {
            image: "/img/blocz-catch.jpg",
            alt: "Imagem do carrossel 2"
        },
        {
            image: "/img/6d1aaa5b-9d15-4c4e-9d3b-f72663e79a1d.jpg",
            alt: "Imagem do carrossel 3"
        },
        {
            image: "/img/blocz-catch.jpg",
            alt: "Imagem do carrossel 4"
        },
        {
            image: "/img/6d1aaa5b-9d15-4c4e-9d3b-f72663e79a1d.jpg",
            alt: "Imagem do carrossel 5"
        }
    ];

    const carouselImage = document.getElementById("carouselImage");
    const previousButton = document.getElementById("prevGame");
    const nextButton = document.getElementById("nextGame");
    const progress = document.getElementById("carouselProgress");

    let currentSlide = 0;
    let changing = false;

    function atualizarProgresso() {
        if (!progress || slides.length === 0) {
            return;
        }

        const percentual = 100 / slides.length;
        progress.style.width = `${percentual}%`;
        progress.style.transform = `translateX(${currentSlide * 100}%)`;
    }

    function mostrarSlide(index) {
        if (slides.length === 0 || changing) {
            return;
        }

        changing = true;

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }

        const slide = slides[index];
        carouselImage.classList.add("is-changing");

        setTimeout(() => {
            currentSlide = index;
            carouselImage.src = slide.image;
            carouselImage.alt = slide.alt;
            atualizarProgresso();

            requestAnimationFrame(() => {
                carouselImage.classList.remove("is-changing");
            });

            setTimeout(() => {
                changing = false;
            }, 350);
        }, 180);
    }

    function proximoSlide() {
        mostrarSlide(currentSlide + 1);
    }

    function slideAnterior() {
        mostrarSlide(currentSlide - 1);
    }

    previousButton.addEventListener("click", slideAnterior);
    nextButton.addEventListener("click", proximoSlide);

    document.addEventListener("keydown", (event) => {
        const elemento = document.activeElement;
        const digitando = elemento && (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA" || elemento.tagName === "SELECT");

        if (digitando) {
            return;
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            slideAnterior();
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            proximoSlide();
        }
    });

    let toqueInicialX = 0;
    let toqueFinalX = 0;

    carouselImage.addEventListener("touchstart", (event) => {
        toqueInicialX = event.changedTouches[0].screenX;
    }, { passive: true });

    carouselImage.addEventListener("touchend", (event) => {
        toqueFinalX = event.changedTouches[0].screenX;
        const distancia = toqueFinalX - toqueInicialX;

        if (distancia < -50) {
            proximoSlide();
        }

        if (distancia > 50) {
            slideAnterior();
        }
    }, { passive: true });

    if (slides.length > 0) {
        mostrarSlide(0);
    }
});


document.addEventListener("DOMContentLoaded", () => {

    /*
     * =====================================================
     * CONFIGURAÇÃO DOS JOGOS
     * =====================================================
     *
     * Para adicionar um novo jogo, basta adicionar
     * outro objeto dentro desta lista.
     */

    const games = [

        {
            title: "Bloc Catch",

            image: "/img/blocz-catch.jpg",

            description:
                "Use seu avatar para pegar blocos, " +
                "desviar das bombas e alcançar a maior " +
                "pontuação possível.",

            link: "/jogo"
        },


        {
            title: "Bloc Runner",

            image: "/img/blocz-catch.jpg",

            description:
                "Corra, desvie dos obstáculos e tente " +
                "chegar o mais longe possível.",

            link: "/jogo"
        },


        {
            title: "Bloc Puzzle",

            image: "/img/blocz-catch.jpg",

            description:
                "Monte as combinações certas e descubra " +
                "quanto tempo você consegue manter o ritmo.",

            link: "/jogo"
        }

    ];


    /*
     * =====================================================
     * ELEMENTOS
     * =====================================================
     */

    const image =
        document.getElementById("gameImage");

    const title =
        document.getElementById("gameTitle");

    const description =
        document.getElementById("gameDescription");

    const number =
        document.getElementById("gameNumber");

    const playButton =
        document.getElementById("playGame");

    const showcase =
        document.querySelector(".game-showcase");

    const previousButton =
        document.getElementById("prevGame");

    const nextButton =
        document.getElementById("nextGame");

    const indicators =
        document.querySelectorAll(".indicator");


    /*
     * =====================================================
     * ESTADO
     * =====================================================
     */

    let currentGame = 0;


    /*
     * =====================================================
     * ATUALIZAR JOGO
     * =====================================================
     */

    function updateGame(index) {

        currentGame = index;

        const game = games[currentGame];


        /*
         * Reinicia animação
         */

        showcase.classList.remove("change");

        void showcase.offsetWidth;

        showcase.classList.add("change");


        /*
         * Atualiza imagem
         */

        image.src = game.image;

        image.alt =
            `Capa do jogo ${game.title}`;


        /*
         * Atualiza informações
         */

        title.textContent =
            game.title;

        description.textContent =
            game.description;


        /*
         * Atualiza número
         */

        number.textContent =
            `JOGO ${String(currentGame + 1).padStart(2, "0")}`;


        /*
         * Atualiza link
         */

        playButton.href =
            game.link;


        /*
         * Atualiza indicadores
         */

        indicators.forEach(
            (indicator, indicatorIndex) => {

                indicator.classList.toggle(
                    "active",
                    indicatorIndex === currentGame
                );

            }
        );

    }


    /*
     * =====================================================
     * PRÓXIMO
     * =====================================================
     */

    function nextGame() {

        let next =
            currentGame + 1;


        if (next >= games.length) {

            next = 0;

        }


        updateGame(next);

    }


    /*
     * =====================================================
     * ANTERIOR
     * =====================================================
     */

    function previousGame() {

        let previous =
            currentGame - 1;


        if (previous < 0) {

            previous =
                games.length - 1;

        }


        updateGame(previous);

    }


    /*
     * =====================================================
     * EVENTOS
     * =====================================================
     */

    nextButton.addEventListener(
        "click",
        nextGame
    );


    previousButton.addEventListener(
        "click",
        previousGame
    );


    /*
     * Indicadores
     */

    indicators.forEach(
        (indicator) => {

            indicator.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            indicator.dataset.index
                        );

                    /*
                     * Só muda se o índice existir.
                     */

                    if (index < games.length) {

                        updateGame(index);

                    }

                }
            );

        }
    );


    /*
     * =====================================================
     * TECLADO
     * =====================================================
     */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "ArrowLeft") {

                previousGame();

            }


            if (event.key === "ArrowRight") {

                nextGame();

            }

        }
    );


    /*
     * =====================================================
     * INICIALIZAÇÃO
     * =====================================================
     */

    updateGame(0);

});
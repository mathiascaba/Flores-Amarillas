
/* =========================
   INTRO
========================= */

function openGift() {

    const intro = document.getElementById("intro");

    if (!intro) return;

    intro.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   STARS
========================= */

const starsContainer =
    document.getElementById("stars");

const isMobile =
    window.matchMedia("(max-width: 750px)").matches;


/*
    Menos estrellas en celulares
    para ahorrar recursos.
*/

const starCount =
    isMobile ? 80 : 150;


if (starsContainer) {

    for (let i = 0; i < starCount; i++) {

        const star =
            document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        star.style.animationDuration =
            2 + Math.random() * 4 + "s";

        starsContainer.appendChild(star);
    }
}


/* =========================
   FALLING PETALS
========================= */

const petalSymbols = [
    "🌼",
    "🌻",
    "💛",
    "✨",
    "🍂"
];

let petalInterval;

function createPetal() {

    const petal =
        document.createElement("div");

    petal.className = "petal";

    petal.textContent =
        petalSymbols[
            Math.floor(
                Math.random() *
                petalSymbols.length
            )
        ];

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.fontSize =
        10 + Math.random() * 18 + "px";

    petal.style.animationDuration =
        5 + Math.random() * 7 + "s";

    document.body.appendChild(petal);


    setTimeout(() => {

        petal.remove();

    }, 13000);
}


/*
    En PC: cada 450ms.
    En móvil: cada 900ms.
*/

petalInterval =
    setInterval(
        createPetal,
        isMobile ? 900 : 450
    );


/* =========================
   RELATIONSHIP COUNTER
========================= */

/*
    Fecha de inicio:

    18 de agosto de 2024

    Se crean los componentes manualmente
    para evitar problemas de zona horaria.
*/

const startDate =
    new Date(
        2024,
        7,
        18,
        0,
        0,
        0
    );


function getRelationshipTime(start, end) {

    let years =
        end.getFullYear() -
        start.getFullYear();

    let months =
        end.getMonth() -
        start.getMonth();

    let days =
        end.getDate() -
        start.getDate();

    let hours =
        end.getHours() -
        start.getHours();

    let minutes =
        end.getMinutes() -
        start.getMinutes();

    let seconds =
        end.getSeconds() -
        start.getSeconds();


    /* =========================
       SEGUNDOS
    ========================== */

    if (seconds < 0) {

        seconds += 60;

        minutes--;
    }


    /* =========================
       MINUTOS
    ========================== */

    if (minutes < 0) {

        minutes += 60;

        hours--;
    }


    /* =========================
       HORAS
    ========================== */

    if (hours < 0) {

        hours += 24;

        days--;
    }


    /* =========================
       DÍAS
    ========================== */

    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                end.getFullYear(),
                end.getMonth(),
                0
            );

        days +=
            previousMonth.getDate();
    }


    /* =========================
       MESES
    ========================== */

    if (months < 0) {

        months += 12;

        years--;
    }


    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}


/* =========================
   PLURALIZACIÓN
========================= */

function updateLabel(
    elementId,
    value,
    singular,
    plural
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) return;

    element.textContent =
        value === 1
            ? singular
            : plural;
}


/* =========================
   ACTUALIZAR CONTADOR
========================= */

function updateCounter() {

    const now =
        new Date();


    const time =
        getRelationshipTime(
            startDate,
            now
        );


    const years =
        document.getElementById("years");

    const months =
        document.getElementById("months");

    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    if (
        !years ||
        !months ||
        !days ||
        !hours ||
        !minutes ||
        !seconds
    ) {
        return;
    }


    /* =========================
       NÚMEROS
    ========================== */

    years.textContent =
        time.years;

    months.textContent =
        time.months;

    days.textContent =
        time.days;

    hours.textContent =
        String(time.hours)
            .padStart(2, "0");

    minutes.textContent =
        String(time.minutes)
            .padStart(2, "0");

    seconds.textContent =
        String(time.seconds)
            .padStart(2, "0");


    /* =========================
       ETIQUETAS
    ========================== */

    updateLabel(
        "years-label",
        time.years,
        "Año",
        "Años"
    );

    updateLabel(
        "months-label",
        time.months,
        "Mes",
        "Meses"
    );

    updateLabel(
        "days-label",
        time.days,
        "Día",
        "Días"
    );

    updateLabel(
        "hours-label",
        time.hours,
        "Hora",
        "Horas"
    );

    updateLabel(
        "minutes-label",
        time.minutes,
        "Minuto",
        "Minutos"
    );

    updateLabel(
        "seconds-label",
        time.seconds,
        "Segundo",
        "Segundos"
    );
}


/* =========================
   INICIAR CONTADOR
========================= */

updateCounter();

setInterval(
    updateCounter,
    1000
);


/* =========================
   MODAL
========================= */

const modal =
    document.getElementById(
        "letterModal"
    );


function openLetter() {

    if (!modal) return;

    modal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";
}


function closeLetter() {

    if (!modal) return;

    modal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";
}


if (modal) {

    modal.addEventListener(
        "click",
        function(e) {

            if (e.target === modal) {

                closeLetter();
            }
        }
    );
}


/* =========================
   ESCAPE
========================= */

document.addEventListener(
    "keydown",
    function(e) {

        if (e.key === "Escape") {

            closeLetter();
        }

    }
);


/* =========================
   PARALLAX
========================= */

/*
    El parallax solamente se ejecuta
    en dispositivos que realmente
    tienen mouse.

    En celular/tablet se desactiva.
*/

const canUseMouse =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


if (canUseMouse) {

    document.addEventListener(
        "mousemove",
        function(e) {

            const x =
                (
                    e.clientX /
                    window.innerWidth -
                    .5
                ) * 10;


            const y =
                (
                    e.clientY /
                    window.innerHeight -
                    .5
                ) * 10;


            document
                .querySelectorAll(
                    ".flower-wrapper"
                )
                .forEach(
                    flower => {

                        flower.style.transform =
                            `translate(${x}px, ${y}px)`;

                    }
                );

        }
    );
}


/* =========================
   REVEAL ANIMATION
========================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );
                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


document
    .querySelectorAll(
        ".timeline-item, .memory, .letter"
    )
    .forEach(
        element => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity .8s ease, transform .8s ease";

            observer.observe(
                element
            );

        }
    );


/* =========================
   LIMPIEZA AL SALIR
========================= */

window.addEventListener(
    "pagehide",
    function() {

        if (petalInterval) {

            clearInterval(
                petalInterval
            );
        }

    }
);


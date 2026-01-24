const player = document.getElementById('player');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const jumpBtn = document.getElementById('jumpBtn');

// Spillerens innstillinger
let pX = 50;         
let pY = 0;          
let vX = 0;          
let vY = 0;          
let isGrounded = false;

const gravity = 0.8;   
const jumpPower = -15; 
const speed = 6;       

// PLATTFORM-INNSTILLINGER (Må være like som i HTML/CSS)
// I din index.html står det: left: 100px, bottom: 80px, width: 150px
const platX = 100;
const platY = -76;  // Vi bruker minus fordi pY går nedover fra bakken
const platWidth = 150;

function update() {
    // 1. Bevegelse og tyngdekraft
    vY += gravity;
    pY += vY;
    pX += vX;

    // 2. Bakke-kollisjon
    if (pY >= 0) {
        pY = 0;
        vY = 0;
        isGrounded = true;
    } else {
        isGrounded = false;
    }

    // 3. Plattform-kollisjon (Den grønne streken)
    // Sjekker om spilleren er innenfor plattformens bredde
    if (pX + 30 > platX && pX < platX + platWidth) {
        // Sjekker om føttene treffer toppen av plattformen mens vi faller
        if (pY + 30 >= platY && pY + 30 <= platY + 20 && vY > 0) {
            pY = platY - 30; // Plasserer spilleren nøyaktig oppå
            vY = 0;
            isGrounded = true;
        }
    }

    // 4. Vegg-kollisjon (Hindre å gå ut av skjermen)
    if (pX < 0) pX = 0;
    if (pX > 570) pX = 570; 

    // 5. Oppdater grafikk
    player.style.transform = `translate(${pX}px, ${pY}px)`;

    requestAnimationFrame(update);
}

// KONTROLLER (Tastatur og Touch)
window.onkeydown = (e) => {
    if (e.key === "ArrowRight") vX = speed;
    if (e.key === "ArrowLeft") vX = -speed;
    if ((e.key === " " || e.key === "ArrowUp") && isGrounded) {
        vY = jumpPower;
        isGrounded = false;
    }
};

window.onkeyup = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") vX = 0;
};

leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); vX = -speed; }, {passive: false});
leftBtn.addEventListener('touchend', () => vX = 0);
rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); vX = speed; }, {passive: false});
rightBtn.addEventListener('touchend', () => vX = 0);
jumpBtn.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    if (isGrounded) { vY = jumpPower; isGrounded = false; } 
}, {passive: false});


update();



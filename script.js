const player = document.getElementById('player');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const jumpBtn = document.getElementById('jumpBtn');

// Spill-innstillinger
let pX = 50;         
let pY = 0;          
let vX = 0;          
let vY = 0;          
let isGrounded = false;

const gravity = 0.8;   
const jumpPower = -15; 
const speed = 6;       

function update() {
    // 1. Tyngdekraft og bevegelse
    vY += gravity;
    pY += vY;
    pX += vX;

    // 2. Hindre spilleren i å gå utenfor venstre/høyre vegg
    if (pX < 0) pX = 0;
    if (pX > 570) pX = 570; // 600px bredde minus spillerens 30px

    // 3. Bakke-kollisjon (pY = 0 er bunnen av containeren)
    if (pY >= 0) {
        pY = 0;
        vY = 0;
        isGrounded = true;
    } else {
        isGrounded = false;
    }

    // 4. Plattform-kollisjon (Den grønne boksen)
    // Plattformen er 150px bred (fra 200 til 350)
    // Den ligger 100px fra bunnen.
    if (pX + 30 > 200 && pX < 350) {
        // Sjekker om spillerens føtter er i høyde med plattformen (-100px)
        // og at vi er på vei nedover (vY > 0)
        if (pY + 30 >= -100 && pY + 30 <= -80 && vY > 0) {
            pY = -130; // 100px (høyde) + 30px (spiller høyde)
            vY = 0;
            isGrounded = true;
        }
    }

    // 5. Oppdater posisjon på skjermen
    player.style.transform = `translate(${pX}px, ${pY}px)`;

    requestAnimationFrame(update);
}

// --- KONTROLLER ---

// Tastatur
window.onkeydown = (e) => {
    if (e.key === "ArrowRight") vX = speed;
    if (e.key === "ArrowLeft") vX = -speed;
    if ((e.key === " " || e.key === "ArrowUp" || e.key === "w") && isGrounded) {
        vY = jumpPower;
    }
};

window.onkeyup = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") vX = 0;
};

// iPad Touch (Lagt til 'passive: false' for bedre respons)
leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); vX = -speed; }, {passive: false});
leftBtn.addEventListener('touchend', (e) => { e.preventDefault(); vX = 0; }, {passive: false});

rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); vX = speed; }, {passive: false});
rightBtn.addEventListener('touchend', (e) => { e.preventDefault(); vX = 0; }, {passive: false});

jumpBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (isGrounded) {
        vY = jumpPower;
    }
}, {passive: false});

update();

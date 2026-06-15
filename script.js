// หน้า Welcome
const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const mainPage = document.getElementById("mainPage");
// นับเวลาคบกัน
const timer = document.getElementById("timer");
// วันที่เริ่มคบกัน
const anniversaryDate = new Date("2026-05-15T00:00:00");
function updateTimer() {
    const now = new Date();
    let diff = now - anniversaryDate;
    // ถ้ายังไม่ถึงวันที่คบ
    if (diff < 0) {
        timer.innerHTML = "กำลังรอวันครบรอบของเรา 🎀💕";
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff %= (1000 * 60);
    const seconds = Math.floor(diff / 1000);
    timer.innerHTML =
        `${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`;
}
updateTimer();
setInterval(updateTimer, 1000);
// Popup เซอร์ไพรส์
const quizBtn = document.getElementById("quizBtn");
const popup = document.getElementById("surprisePopup");
const closePopup = document.getElementById("closePopup");
quizBtn.addEventListener("click", () => {
    popup.style.display = "flex";
});
closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});
// หัวใจลอย
function startHeartAnimation() {
    const heartsContainer = document.querySelector(".hearts");
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = ["💗", "💕", "🤍", "🎀"][
            Math.floor(Math.random() * 4)
        ];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize =
            Math.random() * 20 + 20 + "px";
        heart.style.animationDuration =
            Math.random() * 3 + 4 + "s";
        heartsContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 500);
}
// Q3 เลือกรูปจากคลัง
const favoritePhoto = document.getElementById("favoritePhoto");
const previewImage = document.getElementById("previewImage");
const photoText = document.getElementById("photoText");

favoritePhoto.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "block";

        photoText.innerHTML =
            "🥰 รูปที่เธอเลือกน่ารักมากเลย เค้าดีใจที่เธอชอบรูปนี้ 💕";
    }
});
// ===== Puzzle Love Game =====

const puzzlePage = document.getElementById("puzzlePage");
const puzzleBoard = document.getElementById("puzzleBoard");
const puzzlePopup = document.getElementById("puzzlePopup");
const continueBtn = document.getElementById("continueBtn");

let puzzleTiles = [];
let emptyIndex = 15;

// เปลี่ยนปุ่ม Start ให้ไปหน้า Puzzle ก่อน
startBtn.addEventListener("click", () => {
    welcome.classList.remove("active");
    puzzlePage.classList.add("active");

    createPuzzle();
});

// สร้าง Puzzle
function createPuzzle() {
    puzzleBoard.innerHTML = "";

    puzzleTiles = [...Array(15).keys()].map(i => i + 1);
    puzzleTiles.push(0);

    shufflePuzzle();

    renderPuzzle();
}

// สุ่ม Puzzle
function shufflePuzzle() {
    for (let i = puzzleTiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [puzzleTiles[i], puzzleTiles[j]] =
        [puzzleTiles[j], puzzleTiles[i]];
    }

    emptyIndex = puzzleTiles.indexOf(0);
}

// แสดง Puzzle
function renderPuzzle() {
    puzzleBoard.innerHTML = "";

    puzzleTiles.forEach((value, index) => {
        const tile = document.createElement("div");

        if (value === 0) {
            tile.classList.add("puzzle-tile", "empty-tile");
        } else {
            tile.classList.add("puzzle-tile");

            const row = Math.floor((value - 1) / 4);
            const col = (value - 1) % 4;

            tile.style.backgroundPosition =
                `${-(col * 25)}% ${-(row * 25)}%`;
        }

        tile.addEventListener("click", () => moveTile(index));

        puzzleBoard.appendChild(tile);
    });
}

// เลื่อนชิ้นส่วน
function moveTile(index) {
    const validMoves = [
        emptyIndex - 4,
        emptyIndex + 4,
        emptyIndex - 1,
        emptyIndex + 1
    ];

    // กันข้ามแถว
    if (
        (emptyIndex % 4 === 0 && index === emptyIndex - 1) ||
        (emptyIndex % 4 === 3 && index === emptyIndex + 1)
    ) {
        return;
    }

    if (validMoves.includes(index)) {
        [puzzleTiles[index], puzzleTiles[emptyIndex]] =
        [puzzleTiles[emptyIndex], puzzleTiles[index]];

        emptyIndex = index;

        renderPuzzle();

        checkWin();
    }
}

// ตรวจสอบว่าชนะหรือยัง
function checkWin() {
    for (let i = 0; i < 15; i++) {
        if (puzzleTiles[i] !== i + 1) {
            return;
        }
    }

    if (puzzleTiles[15] === 0) {
        puzzlePopup.style.display = "flex";
    }
}

// กดไปต่อหลังชนะ
continueBtn.addEventListener("click", () => {
    puzzlePopup.style.display = "none";

    puzzlePage.classList.remove("active");
    mainPage.classList.add("active");

    startHeartAnimation();
});
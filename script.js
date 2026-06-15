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

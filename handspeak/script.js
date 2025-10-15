document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
 modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});


  const buttons = document.querySelectorAll(".nav button");
  const sections = document.querySelectorAll(".content-section");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const sectionId = btn.getAttribute("data-section");
      sections.forEach(sec => sec.classList.add("hidden"));
      document.getElementById(sectionId).classList.remove("hidden");

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  
  const letters = ["ก","ข","ฃ","ค","ฅ","ฆ","ง","จ","ฉ","ช","ซ","ฌ","ญ","ฎ","ฏ","ฐ","ฑ","ฒ","ณ","ด","ต","ถ","ท","ธ","น","บ","ป","ผ","ฝ","พ","ฟ","ภ","ม","ย","ร","ล","ว","ศ","ษ","ส","ห","ฬ","อ","ฮ"];
  const letterList = document.getElementById("letterList");
  letters.forEach(letter => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = letter;
    card.addEventListener("click", () => {
      modalImg.src = `images/letters/${letter}.png`;
      modal.style.display = "flex";
    });
    letterList.appendChild(card);
  });

  
  const numbers = ["0","1","2","3","4","5","6","7","8","9"];
  const numberList = document.getElementById("numberList");
  numbers.forEach(num => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = num;
    card.addEventListener("click", () => {
      modalImg.src = `images/numbers/${num}.png`;
      modal.style.display = "flex";
    });
    numberList.appendChild(card);
  });


  const days = ["สวัสดี","ขอบคุณ","ขอโทษ","ไม่เป็นไร","ดีใจ","หมดแรง","ใช่","ไม่ใช่","พ่อ","แม่"];
  const dayList = document.getElementById("dayList");
  days.forEach(day => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = day;
    card.addEventListener("click", () => {
      modalImg.src = `images/days/${day}.png`;
      modal.style.display = "flex";
    });
    dayList.appendChild(card);
  });
//  แบบฝึกหัด //
const quizzes = {
  letters: [
    { question: "รูปภาพนี้ตรงกับตัวอักษรใด?", image: "images/letters/ก.png", options: ["ก","ข","ค"], answer: 0 },
    { question: "รูปภาพนี้ตรงกับตัวอักษรใด?", image: "images/letters/ข.png", options: ["ง","ข","ค"], answer: 1 },
    { question: "รูปภาพนี้ตรงกับตัวอักษรใด?", image: "images/letters/ต.png", options: ["ด","ต","ฒ"], answer: 1 },
    { question: "รูปภาพนี้ตรงกับตัวอักษรใด?", image: "images/letters/ป.png", options: ["บ","ษ","ป"], answer: 2 },
    { question: "รูปภาพนี้ตรงกับตัวอักษรใด?", image: "images/letters/ส.png", options: ["จ","ซ","ส"], answer: 2 }
  ],
  numbers: [
    { question: "ภาษามือเลขในภาพคือเลขอะไร?", image: "images/numbers/8.png", options: ["8","7","6"], answer: 0 },
    { question: "ภาษามือเลขในภาพคือเลขอะไร?", image: "images/numbers/5.png", options: ["4","3","5"], answer: 2 },
    { question: "ภาษามือเลขในภาพคือเลขอะไร?", image: "images/numbers/6.png", options: ["8","9","6"], answer: 2 },
    { question: "ภาษามือเลขในภาพคือเลขอะไร?", image: "images/numbers/0.png", options: ["0","1","2"], answer: 0 },
    { question: "ภาษามือเลขในภาพคือเลขอะไร?", image: "images/numbers/9.png", options: ["3","9","6"], answer: 1 }
  ],
  days: [
    { question: "ภาพภาษามือคำนี้คืออะไร??", image: "images/testday/ขอโทษ.png", options: ["สวัสดี","ขอโทษ","ขอบคุณ"], answer: 1 },
    { question: "ภาพภาษามือคำนี้คืออะไร??", image: "images/testday/ขอบคุณ.png", options: ["ขอบคุณ","อีกรอบ","ไม่เป็นไร"], answer: 0 },
    { question: "ภาพภาษามือคำนี้คืออะไร??", image: "images/testday/หมดแรง.png", options: ["หมดแรง","ไม่สบาย","ไม่พอใจ"], answer: 0 },
    { question: "ภาพภาษามือคำนี้คืออะไร??", image: "images/testday/พ่อ.png", options: ["แม่","พ่อ","พี่ชาย"], answer: 1 },
    { question: "ภาพภาษามือคำนี้คืออะไร??", image: "images/testday/ดีใจ.png", options: ["ดีใจ","พอใจ","ไม่เป็นไร"], answer: 0 }
  ]
};

let currentCategory = null;
let current = 0;
let score = 0;
let totalScore = 0;
const quizHistory = { letters: [], numbers: [], days: [] };

const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const latestScore = document.getElementById("latestScore");
const scoreList = document.getElementById("scoreList");

const quizImg = document.createElement("img");
quizImg.style.maxWidth = "150px";
quizImg.style.display = "block";
quizImg.style.margin = "10px auto";
optionsDiv.parentNode.insertBefore(quizImg, optionsDiv);

function chooseCategory() {
  questionText.textContent = "เลือกหมวดแบบฝึกหัด:";
  optionsDiv.innerHTML = "";
  quizImg.style.display = "none";

  ["letters","numbers","days"].forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent =
      cat === "letters" ? "ตัวอักษร" :
      cat === "numbers" ? "ตัวเลข" :
      "คำประจำวัน";
    btn.onclick = () => startQuiz(cat);
    optionsDiv.appendChild(btn);
  });

  latestScore.textContent = `คะแนนรวมทั้งหมด: ${totalScore}`;
  scoreList.innerHTML = "";
}

// เริ่ม คำถาม //
function startQuiz(category) {
  currentCategory = category;
  current = 0;
  score = 0;
  quizImg.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const questions = quizzes[currentCategory];
  if (current >= questions.length) {
    questionText.textContent = ` จบแบบฝึกหัดหมวด ${
      currentCategory === "letters" ? "ตัวอักษร" :
      currentCategory === "numbers" ? "ตัวเลข" : "คำประจำวัน"
    } คุณได้ ${score}/${questions.length} คะแนน`;

    totalScore += score;
    quizHistory[currentCategory].push(score);
    showScores(currentCategory);

    optionsDiv.innerHTML = "";
    quizImg.style.display = "none";

    const restart = document.createElement("button");
    restart.textContent = "เริ่มทำใหม่";
    restart.onclick = () => startQuiz(currentCategory);

    const back = document.createElement("button");
    back.textContent = "กลับไปเลือกหมวด";
    back.onclick = chooseCategory;

    optionsDiv.appendChild(restart);
    optionsDiv.appendChild(back);
    return;
  }

  const q = quizzes[currentCategory][current];
  questionText.textContent = q.question;
  quizImg.src = q.image;

  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });

  latestScore.textContent = `คะแนน: ${score}/${questions.length} | รวมทั้งหมด: ${totalScore}`;
}

function checkAnswer(i) {
  const q = quizzes[currentCategory][current];
  if (i === q.answer) {
    alert("✅ ตอบถูก!");
    score++;
  } else {
    alert("❌ ตอบผิด ลองข้อต่อไป!");
  }
  current++;
  loadQuestion();
}

function showScores(category) {
  scoreList.innerHTML = "";
  quizHistory[category].forEach((s,index)=>{
    const li = document.createElement("li");
    li.textContent = `ครั้งที่ ${index+1}: ${s} คะแนน`;
    scoreList.appendChild(li);
  });
  latestScore.textContent = `คะแนนรวมทั้งหมด: ${totalScore}`;
}

chooseCategory();

});


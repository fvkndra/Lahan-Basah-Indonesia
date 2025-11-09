// script.js - JavaScript untuk Kuis Lahan Basah

const quizData = [
    {
        question: "Berapa persen karbon tanah dunia yang disimpan oleh rawa gambut?",
        options: ["10%", "20%", "30%", "40%"],
        correct: 2
    },
    {
        question: "Kapan Hari Lahan Basah Sedunia diperingati?",
        options: ["2 Februari", "5 Juni", "22 April", "21 Maret"],
        correct: 0
    },
    {
        question: "Berapa luas lahan basah di Indonesia?",
        options: ["20 juta hektar", "30 juta hektar", "40 juta hektar", "50 juta hektar"],
        correct: 2
    },
    {
        question: "Apa fungsi utama hutan mangrove?",
        options: [
            "Sumber kayu bakar",
            "Pelindung pantai dari abrasi dan tsunami",
            "Tempat wisata",
            "Lahan pertanian"
        ],
        correct: 1
    },
    {
        question: "Berapa persen spesies dunia yang hidup di lahan basah?",
        options: ["20%", "30%", "40%", "50%"],
        correct: 2
    },
    {
        question: "Apa ancaman terbesar bagi lahan basah?",
        options: [
            "Hujan lebat",
            "Konversi lahan dan pencemaran",
            "Angin kencang",
            "Suhu dingin"
        ],
        correct: 1
    },
    {
        question: "Ekosistem lahan basah apa yang menjadi habitat orangutan?",
        options: [
            "Mangrove",
            "Sawah",
            "Hutan rawa gambut",
            "Danau dangkal"
        ],
        correct: 2
    },
    {
        question: "Apa manfaat lahan basah untuk pengelolaan air?",
        options: [
            "Membuat air lebih asin",
            "Mengontrol banjir dan menyimpan air",
            "Mengurangi curah hujan",
            "Mempercepat penguapan"
        ],
        correct: 1
    },
    {
        question: "Berapa persen lahan basah tropis dunia yang dimiliki Indonesia?",
        options: ["10%", "15%", "20%", "25%"],
        correct: 2
    },
    {
        question: "Apa yang dimaksud dengan restorasi lahan basah?",
        options: [
            "Mengubah lahan basah menjadi perumahan",
            "Pemulihan lahan basah yang rusak",
            "Mengeringkan lahan basah",
            "Membangun jalan di lahan basah"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const quizContent = document.getElementById('quiz-content');
const quizResult = document.getElementById('quiz-result');
const scoreDisplay = document.getElementById('score');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-btn');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Fungsi untuk memulai kuis
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    startBtn.style.display = 'none';
    loadQuestion();
}

// Fungsi untuk memuat pertanyaan
function loadQuestion() {
    answered = false;
    nextBtn.style.display = 'none';
    
    const question = quizData[currentQuestion];
    questionText.textContent = `Pertanyaan ${currentQuestion + 1} dari ${quizData.length}: ${question.question}`;
    
    optionsContainer.innerHTML = '';
    
    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressFill.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
    progressBar.appendChild(progressFill);
    optionsContainer.appendChild(progressBar);
    
    // Membuat tombol opsi jawaban
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

// Fungsi untuk memilih jawaban
function selectAnswer(selectedIndex) {
    if (answered) return;
    
    answered = true;
    const question = quizData[currentQuestion];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === question.correct) {
            button.classList.add('correct');
        }
        if (index === selectedIndex && selectedIndex !== question.correct) {
            button.classList.add('wrong');
        }
    });
    
    if (selectedIndex === question.correct) {
        score++;
    }
    
    nextBtn.style.display = 'inline-block';
}

// Fungsi untuk pertanyaan berikutnya
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Fungsi untuk menampilkan hasil
function showResult() {
    quizContent.style.display = 'none';
    quizResult.style.display = 'block';
    
    const percentage = (score / quizData.length) * 100;
    scoreDisplay.textContent = `${score} / ${quizData.length}`;
    
    let message = '';
    if (percentage === 100) {
        message = '🏆 Sempurna! Anda adalah ahli lahan basah!';
    } else if (percentage >= 80) {
        message = '🌟 Luar biasa! Pengetahuan Anda sangat baik!';
    } else if (percentage >= 60) {
        message = '👍 Bagus! Terus tingkatkan pengetahuan Anda!';
    } else if (percentage >= 40) {
        message = '📚 Cukup baik! Baca lagi materi di atas ya!';
    } else {
        message = '💪 Jangan menyerah! Pelajari lebih dalam tentang lahan basah!';
    }
    
    scoreMessage.textContent = message;
}

// Fungsi untuk mengulang kuis
function restartQuiz() {
    quizResult.style.display = 'none';
    quizContent.style.display = 'block';
    startBtn.style.display = 'inline-block';
    questionText.textContent = 'Pertanyaan akan muncul di sini';
    optionsContainer.innerHTML = '';
}
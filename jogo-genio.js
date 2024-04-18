document.addEventListener("DOMContentLoaded", function() {
    const timeDisplay = document.getElementById("time");
    const gameOverModal = document.getElementById("game-over-modal");
    const congratulationsModal = document.getElementById("congratulations-modal");
    const menuButton = document.getElementById("menu-button");
    const restartButton = document.getElementById("restart-button");
    const restartButton2 = document.getElementById("restart-button2")
    const startButton = document.getElementById("start-button");
    const cards = document.querySelectorAll(".card");

    let timeLeft = 30;
    let timer;
    let flippedCards = [];
    let matchedPairs = 0;

    function startGame() {
        startButton.remove();
        shuffleCards();
        flipAllCards();
        timer = setInterval(updateTime, 1000);
    }

    function updateTime() {
        timeLeft--;
        timeDisplay.textContent = `⌛${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showGameOverModal();
        }
    }

    function shuffleCards() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
            card.classList.remove("flipped", "matched");
            card.textContent = "MEMOJI";
        });
    }

    function flipCard() {
        if (!this.classList.contains("matched") && flippedCards.length < 2 && !flippedCards.includes(this)) {
            this.classList.add("flipped");
            this.textContent = this.getAttribute("data-emoji");
            flippedCards.push(this);
            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    function checkMatch() {
        let emoji1 = flippedCards[0].getAttribute("data-emoji");
        let emoji2 = flippedCards[1].getAttribute("data-emoji");
        if (emoji1 === emoji2) {
            flippedCards.forEach(card => {
                card.classList.add("matched");
            });
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === 6) { // Altere para o número correto de pares no modo Gênio
                clearInterval(timer);
                setTimeout(() => {
                    showCongratulationsModal();
                }, 250);
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.remove("flipped");
                    card.textContent = "MEMOJI";
                });
                flippedCards = [];
            }, 650);
        }
    }

    function flipAllCards() {
        cards.forEach(card => {
            card.addEventListener("click", flipCard);
        });
    }

    function showGameOverModal() {
        gameOverModal.style.display = "block";
    };

    function showCongratulationsModal() {
        congratulationsModal.style.display = "block";
    };

    menuButton.addEventListener("click", function() {
        window.location.href = "index.html";
    });

    restartButton.addEventListener("click", function() {
        window.location.reload();
    });

    restartButton2.addEventListener(
      "click", function() {
        window.location.reload();
      });

    startButton.addEventListener("click", startGame);
});

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 0. СКРЫТИЕ ПРЕЛОАДЕРА ПРИ ЗАГРУЗКЕ / ОБНОВЛЕНИИ
    // ==========================================
    const preloader = document.getElementById("site-preloader");
    if (preloader) {
        const hidePreloader = () => preloader.classList.add("preloader-hide");

        // Анимация счетчика процентов, синхронизирована с отрисовкой кольца
        const percentEl = document.getElementById("preloader-percent-value");
        if (percentEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const duration = 1250;
            const start = performance.now();
            const tickPercent = (now) => {
                const progress = Math.min(1, (now - start) / duration);
                percentEl.textContent = Math.round(progress * 100);
                if (progress < 1) requestAnimationFrame(tickPercent);
            };
            requestAnimationFrame(tickPercent);
        } else if (percentEl) {
            percentEl.textContent = "100";
        }

        // Небольшая пауза, чтобы анимация логотипа/кольца успела доиграть
        window.setTimeout(hidePreloader, 1500);
        // Подстраховка: если что-то пойдёт не так, прелоадер не залипнет навсегда
        window.setTimeout(hidePreloader, 3000);
    }

    // ==========================================
    // 0.5 ИНДИКАТОР ПРОГРЕССА СКРОЛЛА
    // ==========================================
    const progressBar = document.getElementById("scroll-progress-bar");
    if (progressBar) {
        const updateProgressBar = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        };
        window.addEventListener("scroll", updateProgressBar, { passive: true });
        updateProgressBar();
    }

    // ==========================================
    // 0.6 КНОПКА "НАВЕРХ"
    // ==========================================
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            backToTopBtn.classList.toggle("visible", window.scrollY > 500);
        }, { passive: true });
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==========================================
    // 0.7 RIPPLE-ЭФФЕКТ НА КНОПКАХ
    // ==========================================
    document.querySelectorAll(".action-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.4;
            const ripple = document.createElement("span");
            ripple.className = "ripple-el";
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            btn.appendChild(ripple);
            ripple.addEventListener("animationend", () => ripple.remove());
        });
    });

    // ==========================================
    // 1. МИНИМАЛИСТИЧНЫЙ КУРСОР-ТОЧКА
    // ==========================================
    const dot = document.querySelector(".custom-cursor-dot");

    if (dot && window.innerWidth > 768) {
        document.addEventListener("mousemove", (e) => {
            dot.style.opacity = "1";
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
        });
        document.addEventListener("mouseleave", () => {
            dot.style.opacity = "0";
        });
    }

    // ==========================================
    // 1.5 МОБИЛЬНОЕ МЕНЮ (БУРГЕР)
    // ==========================================
    const burgerToggle = document.getElementById("burger-toggle");
    const mobileNavOverlay = document.getElementById("mobile-nav-overlay");

    if (burgerToggle && mobileNavOverlay) {
        const closeMobileNav = () => {
            burgerToggle.classList.remove("active");
            mobileNavOverlay.classList.remove("open");
            burgerToggle.setAttribute("aria-expanded", "false");
        };

        burgerToggle.addEventListener("click", () => {
            const isOpen = mobileNavOverlay.classList.toggle("open");
            burgerToggle.classList.toggle("active", isOpen);
            burgerToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mobileNavOverlay.querySelectorAll(".mobile-nav-link").forEach(link => {
            link.addEventListener("click", closeMobileNav);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) closeMobileNav();
        });
    }

    // ==========================================
    // 2. АНИМАЦИЯ СКРОЛЛА (REVEAL)
    // ==========================================
    const revealTargets = document.querySelectorAll(".scroll-reveal");
    
    revealTargets.forEach(target => target.classList.add("js-prep"));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("scroll-reveal-active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    
    revealTargets.forEach(target => revealObserver.observe(target));

    // ==========================================
    // 3. ФИЛЬТРАЦИЯ КЕЙСОВ ПОРТФОЛИО
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioCards = document.querySelectorAll(".portfolio-item-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");
            portfolioCards.forEach(card => {
                const cat = card.getAttribute("data-category");
                if (filterValue === "all" || cat === filterValue) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });

    // ==========================================
    // 3.1 МАГНИТНЫЙ 3D-НАКЛОН КАРТОЧЕК ПОРТФОЛИО
    // ==========================================
    if (window.innerWidth > 900 && !window.matchMedia("(pointer: coarse)").matches) {
        portfolioCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.setProperty("--tiltX", `${(-y * 8).toFixed(2)}deg`);
                card.style.setProperty("--tiltY", `${(x * 8).toFixed(2)}deg`);
            });
            card.addEventListener("mouseleave", () => {
                card.style.setProperty("--tiltX", "0deg");
                card.style.setProperty("--tiltY", "0deg");
            });
        });
    }

    // ==========================================
    // 3.2 "ПОКАЗАТЬ ВСЕ ПРОЕКТЫ" (для будущих кейсов портфолио)
    // ==========================================
    const showAllBtn = document.getElementById("portfolio-show-all");
    const VISIBLE_BY_DEFAULT = 4;

    if (showAllBtn) {
        const cardsArray = Array.from(portfolioCards);
        const extraCards = cardsArray.slice(VISIBLE_BY_DEFAULT);

        if (extraCards.length > 0) {
            extraCards.forEach(card => card.classList.add("portfolio-extra-hidden"));
            showAllBtn.classList.remove("hidden");
            const countLabel = showAllBtn.querySelector(".show-all-count");
            if (countLabel) countLabel.textContent = `(+${extraCards.length})`;

            showAllBtn.addEventListener("click", () => {
                extraCards.forEach((card, i) => {
                    card.classList.remove("portfolio-extra-hidden");
                    card.classList.add("js-prep");
                    // Плавное каскадное появление новых карточек
                    requestAnimationFrame(() => {
                        setTimeout(() => card.classList.add("scroll-reveal-active"), i * 80);
                    });
                });
                showAllBtn.classList.add("hidden");
            });
        }
    }

    // ==========================================
    // 4. ДИНАМИЧЕСКИЙ КАЛЬКУЛЯТОР ЦЕН
    // ==========================================
    const tiles = document.querySelectorAll(".selector-tile");
    const checkTg = document.getElementById("addon-tg");
    const checkAnim = document.getElementById("addon-anim");
    const priceDisplay = document.getElementById("live-price-display");
    const tgText = document.getElementById("tg-addon-price-text");
    const animText = document.getElementById("anim-addon-price-text");

    let currentType = "landing"; 
    let currentTypeName = "Лендинг / Промо";

    tiles.forEach(tile => {
        tile.addEventListener("click", (e) => {
            if (e.target.classList.contains("tile-example-link")) return;

            tiles.forEach(t => t.classList.remove("active"));
            tile.classList.add("active");
            
            currentType = tile.getAttribute("data-type");
            currentTypeName = tile.querySelector("h4").textContent;
            
            // Умный сброс чекбоксов при смене типа (чтобы состояние из "Магазина" не залипало)
            if (currentType !== "store") {
                if (checkTg && checkTg.disabled) checkTg.checked = false;
                if (checkAnim && checkAnim.disabled) checkAnim.checked = false;
            }
            
            calculateTotal();
        });
    });

    if (checkTg) checkTg.addEventListener("change", calculateTotal);
    if (checkAnim) checkAnim.addEventListener("change", calculateTotal);

    function calculateTotal() {
        let basePrice = 750;
        
        if (currentType === "landing") {
            basePrice = 750;
            if (tgText) tgText.textContent = "+200 ₽";
            if (animText) animText.textContent = "+150 ₽";
            if (checkTg) checkTg.disabled = false;
            if (checkAnim) checkAnim.disabled = false;
            if (checkTg && checkTg.checked) basePrice += 200;
            if (checkAnim && checkAnim.checked) basePrice += 150;

        } else if (currentType === "store") {
            basePrice = 1250;
            if (tgText) tgText.textContent = "Включено";
            if (animText) animText.textContent = "Включено";
            if (checkTg) { checkTg.checked = true; checkTg.disabled = true; }
            if (checkAnim) { checkAnim.checked = true; checkAnim.disabled = true; }

        } else if (currentType === "service") {
            basePrice = 800;
            if (tgText) tgText.textContent = "+200 ₽";
            if (animText) animText.textContent = "+100 ₽";
            if (checkTg) checkTg.disabled = false;
            if (checkAnim) checkAnim.disabled = false;
            if (checkTg && checkTg.checked) basePrice += 200;
            if (checkAnim && checkAnim.checked) basePrice += 100;
        }
        
        if (priceDisplay) {
            priceDisplay.textContent = basePrice;
            const counterParent = priceDisplay.parentElement;
            if (counterParent) {
                counterParent.classList.remove("pulse-price");
                void counterParent.offsetWidth; // Сброс анимации через хак с Force Reflow
                counterParent.classList.add("pulse-price");
            }
        }
    }

    // Инициализация базового подсчета при старте
    calculateTotal();

    // ==========================================
    // 5. ИНТЕГРАЦИЯ И ОТПРАВКА В TELEGRAM API
    // ==========================================
    const feedbackForm = document.getElementById("portfolio-interactive-form");
    const successUI = document.getElementById("form-success-state");
    const submitButton = document.getElementById("form-submit-trigger");
    const spinner = submitButton ? submitButton.querySelector(".spinner") : null;
    const btnText = submitButton ? submitButton.querySelector(".btn-text") : null;

    // Гарантированно прячем окно успеха и показываем форму на старте
    if (successUI) successUI.classList.add("hidden");
    if (feedbackForm) {
        feedbackForm.classList.remove("hidden");
        feedbackForm.style.opacity = "1";
        feedbackForm.style.transition = "opacity 0.25s ease-in-out";
    }

    // Динамический сброс ошибок при вводе текста
    const setupInputReset = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", () => {
                el.classList.remove("invalid");
                const errorLabel = el.parentElement ? el.parentElement.querySelector(".custom-error-label") : null;
                if (errorLabel) errorLabel.style.display = "none";
            });
        }
    };
    setupInputReset("client_name");
    setupInputReset("client_contact");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Полная блокировка перезагрузки страницы

            const nameInput = document.getElementById("client_name");
            const contactInput = document.getElementById("client_contact");
            const commentInput = document.getElementById("client_task");

            let hasErrors = false;

            // Валидация Имени
            if (nameInput) {
                const value = nameInput.value.trim();
                const errorLabel = nameInput.parentElement ? nameInput.parentElement.querySelector(".custom-error-label") : null;
                if (value === "") {
                    hasErrors = true;
                    nameInput.classList.add("invalid");
                    if (errorLabel) {
                        errorLabel.textContent = "Пожалуйста, введите ваше имя";
                        errorLabel.style.display = "block";
                    }
                }
            }

            // Валидация Контакта
            if (contactInput) {
                const value = contactInput.value.trim();
                const errorLabel = contactInput.parentElement ? contactInput.parentElement.querySelector(".custom-error-label") : null;
                if (value === "") {
                    hasErrors = true;
                    contactInput.classList.add("invalid");
                    if (errorLabel) {
                        errorLabel.textContent = "Укажите контакт (Telegram или телефон) для связи";
                        errorLabel.style.display = "block";
                    }
                }
            }

            if (hasErrors) return;

            // Состояние загрузки на кнопке
            if (submitButton) {
                if (btnText) btnText.textContent = "Отправка спецификации ТЗ...";
                if (spinner) spinner.classList.remove("hidden");
                submitButton.style.pointerEvents = "none";
            }

            // Сбор данных
            const clientNameVal = nameInput ? nameInput.value.trim() : "Не определено";
            const clientContactVal = contactInput ? contactInput.value.trim() : "Не определено";
            const clientCommentVal = commentInput ? commentInput.value.trim() : "Не указаны";
            const totalPriceVal = priceDisplay ? priceDisplay.textContent : "750";

            let options = [];
            if (currentType === "store") {
                options.push("Telegram API (Включено)", "UI-Анимации (Включено)");
            } else {
                if (checkTg && checkTg.checked) options.push("Telegram API");
                if (checkAnim && checkAnim.checked) options.push("UI-Анимации");
            }
            const optionsText = options.length > 0 ? options.join(", ") : "Нет";

            // Структурированный шаблон сообщения для Telegram
            const textMessage = `
📝 СФОРМИРОВАНО НОВОЕ ТЗ
──────────────────
👤 Имя клиента: ${clientNameVal}
📞 Связь: ${clientContactVal}

🖥️ Спецификация сайта: ${currentTypeName}
⚙️ Выбранные опции: ${optionsText}
💬 Пожелания: ${clientCommentVal}

💵 Итоговая стоимость: ${totalPriceVal} ₽
──────────────────
📊 Заявка собрана через форму на сайте.
            `.trim();

            try {
                const response = await fetch("/api/send-telegram", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: textMessage })
                });

                if (response.ok) {
                    // Анимация исчезновения формы и плавное появление сообщения об успехе
                    feedbackForm.style.opacity = "0";
                    setTimeout(() => {
                        feedbackForm.classList.add("hidden");
                        if (successUI) {
                            successUI.classList.remove("hidden");
                            successUI.style.opacity = "0";
                            void successUI.offsetWidth;
                            successUI.style.transition = "opacity 0.3s ease-in-out";
                            successUI.style.opacity = "1";
                        }
                    }, 250);
                } else {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }

            } catch (error) {
                console.error("Ошибка отправки в Telegram:", error);
                if (submitButton) {
                    if (btnText) btnText.textContent = "Ошибка сети. Повторить?";
                    if (spinner) spinner.classList.add("hidden");
                    submitButton.style.pointerEvents = "auto";
                }
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const currentLang = () => document.documentElement.lang || "ru";

    // ==========================================
    // 1. ПРЕЛОАДЕР
    // ==========================================
    (function setupPreloader() {
        const preloader = document.getElementById("site-preloader");
        if (!preloader) return;

        const hero = document.querySelector(".hero-section");
        const hidePreloader = () => {
            preloader.classList.add("preloader-hide");
            if (hero) hero.classList.add("revealed");
        };

        const percentEl = document.getElementById("preloader-percent-value");
        const progressFill = document.getElementById("preloader-progress-fill");

        if (percentEl && !prefersReducedMotion) {
            const duration = 1200;
            const start = performance.now();
            const tickPercent = (now) => {
                const progress = Math.min(1, (now - start) / duration);
                const value = Math.round(progress * 100);
                percentEl.textContent = value;
                if (progressFill) progressFill.style.width = `${value}%`;
                if (progress < 1) requestAnimationFrame(tickPercent);
            };
            requestAnimationFrame(tickPercent);
        } else if (percentEl) {
            percentEl.textContent = "100";
            if (progressFill) progressFill.style.width = "100%";
        }

        window.setTimeout(hidePreloader, prefersReducedMotion ? 200 : 1350);
        window.setTimeout(hidePreloader, 3000); // подстраховка
    })();

    // ==========================================
    // 2. ИНДИКАТОР ПРОГРЕССА СКРОЛЛА
    // ==========================================
    (function setupScrollProgress() {
        const progressBar = document.getElementById("scroll-progress-bar");
        if (!progressBar) return;
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
        };
        window.addEventListener("scroll", update, { passive: true });
        update();
    })();

    // ==========================================
    // 3. ШАПКА: ФОН ПРИ СКРОЛЛЕ + АКТИВНЫЙ РАЗДЕЛ
    // ==========================================
    (function setupHeaderState() {
        const header = document.querySelector(".site-header");
        const backToTopBtn = document.getElementById("back-to-top");

        const onScroll = () => {
            const scrolled = window.scrollY > 40;
            if (header) header.classList.toggle("header-scrolled", scrolled);
            if (backToTopBtn) backToTopBtn.classList.toggle("visible", window.scrollY > 500);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        if (backToTopBtn) {
            backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
        }

        const navLinks = document.querySelectorAll(".nav-link-item[data-section]");
        const sections = Array.from(navLinks)
            .map(link => document.getElementById(link.dataset.section))
            .filter(Boolean);

        if (sections.length && navLinks.length) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach(link => {
                        link.classList.toggle("active-link", link.dataset.section === entry.target.id);
                    });
                });
            }, { rootMargin: "-45% 0px -50% 0px" });

            sections.forEach(section => sectionObserver.observe(section));
        }
    })();

    // ==========================================
    // 4. RIPPLE-ЭФФЕКТ НА КНОПКАХ
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
    // 5. КАСТОМНЫЙ КУРСОР (ТОЧКА + КОЛЬЦО)
    // ==========================================
    (function setupCursor() {
        const dot = document.querySelector(".custom-cursor-dot");
        const ring = document.querySelector(".custom-cursor-ring");
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!dot || !ring || !canHover) return;

        let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

        document.addEventListener("mousemove", (e) => {
            dot.style.opacity = "1";
            ring.style.opacity = "1";
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            targetX = e.clientX;
            targetY = e.clientY;
        });

        document.addEventListener("mouseleave", () => {
            dot.style.opacity = "0";
            ring.style.opacity = "0";
        });

        const animateRing = () => {
            ringX += (targetX - ringX) * 0.18;
            ringY += (targetY - ringY) * 0.18;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            requestAnimationFrame(animateRing);
        };
        requestAnimationFrame(animateRing);

        const interactiveSelector = "a, button, .selector-tile, .addon-checkbox-label, input, textarea";
        document.addEventListener("mouseover", (e) => {
            if (e.target.closest(interactiveSelector)) ring.classList.add("cursor-active");
        });
        document.addEventListener("mouseout", (e) => {
            if (e.target.closest(interactiveSelector)) ring.classList.remove("cursor-active");
        });
    })();

    // ==========================================
    // 6. МОБИЛЬНОЕ МЕНЮ
    // ==========================================
    (function setupMobileMenu() {
        const burgerToggle = document.getElementById("burger-toggle");
        const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
        if (!burgerToggle || !mobileNavOverlay) return;

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
    })();

    // ==========================================
    // 7. SCROLL-REVEAL ДЛЯ СЕКЦИЙ
    // ==========================================
    (function setupScrollReveal() {
        const revealTargets = document.querySelectorAll(".scroll-reveal");
        revealTargets.forEach(target => target.classList.add("js-prep"));

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("scroll-reveal-active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        revealTargets.forEach(target => revealObserver.observe(target));
    })();

    // ==========================================
    // 8. МОДАЛЬНОЕ ОКНО ПОРТФОЛИО
    // ==========================================
    (function setupPortfolioModal() {
        const openModalBtn = document.getElementById("open-portfolio-modal");
        const closeModalBtn = document.getElementById("close-portfolio-modal");
        const portfolioModal = document.getElementById("portfolio-modal");
        const modalBackdrop = portfolioModal ? portfolioModal.querySelector(".portfolio-modal-backdrop") : null;
        if (!portfolioModal) return;

        let cardsRevealed = false;
        const revealModalCards = () => {
            if (cardsRevealed) return;
            cardsRevealed = true;
            portfolioModal.querySelectorAll(".portfolio-item-card:not(.portfolio-extra-hidden)").forEach((card, i) => {
                setTimeout(() => card.classList.add("scroll-reveal-active"), i * 70);
            });
        };

        const openModal = () => {
            portfolioModal.classList.remove("hidden");
            document.body.classList.add("modal-open");
            revealModalCards();
        };
        const closeModal = () => {
            portfolioModal.classList.add("hidden");
            document.body.classList.remove("modal-open");
        };

        if (openModalBtn) openModalBtn.addEventListener("click", openModal);
        if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
        if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !portfolioModal.classList.contains("hidden")) closeModal();
        });
    })();

    // ==========================================
    // 9. ФИЛЬТРАЦИЯ ПОРТФОЛИО
    // ==========================================
    (function setupPortfolioFilter() {
        const filterButtons = document.querySelectorAll(".filter-btn");
        const portfolioCards = document.querySelectorAll(".portfolio-item-card");

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-selected", "false");
                });
                button.classList.add("active");
                button.setAttribute("aria-selected", "true");

                const filterValue = button.getAttribute("data-filter");
                portfolioCards.forEach(card => {
                    const cat = card.getAttribute("data-category");
                    card.classList.toggle("hide", !(filterValue === "all" || cat === filterValue));
                });
            });
        });
    })();

    // ==========================================
    // 10. "ПОКАЗАТЬ ВСЕ ПРОЕКТЫ"
    // ==========================================
    (function setupShowAllProjects() {
        const showAllBtn = document.getElementById("portfolio-show-all");
        const portfolioCards = document.querySelectorAll(".portfolio-item-card");
        const VISIBLE_BY_DEFAULT = 4;
        if (!showAllBtn) return;

        const extraCards = Array.from(portfolioCards).slice(VISIBLE_BY_DEFAULT);
        if (extraCards.length === 0) return;

        extraCards.forEach(card => card.classList.add("portfolio-extra-hidden"));
        showAllBtn.classList.remove("hidden");
        const countLabel = showAllBtn.querySelector(".show-all-count");
        if (countLabel) countLabel.textContent = `(+${extraCards.length})`;

        showAllBtn.addEventListener("click", () => {
            extraCards.forEach((card, i) => {
                card.classList.remove("portfolio-extra-hidden");
                card.classList.add("js-prep");
                requestAnimationFrame(() => {
                    setTimeout(() => card.classList.add("scroll-reveal-active"), i * 80);
                });
            });
            showAllBtn.classList.add("hidden");
        });
    })();

    // ==========================================
    // 11. КЛАВИАТУРНАЯ ДОСТУПНОСТЬ ДЛЯ ПЛИТОК ТИПА ПРОЕКТА
    // ==========================================
    document.querySelectorAll('.selector-tile[role="button"]').forEach(tile => {
        tile.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                tile.click();
            }
        });
    });

    // ==========================================
    // 12. КОНФИГУРАТОР ТЗ: ЦЕНЫ, ШАГИ, ОТПРАВКА В TELEGRAM
    // ==========================================
    (function setupConfigurator() {
        const form = document.getElementById("portfolio-interactive-form");
        if (!form) return;

        const tiles = document.querySelectorAll(".selector-tile");
        const checkTg = document.getElementById("addon-tg");
        const checkAnim = document.getElementById("addon-anim");
        const priceDisplay = document.getElementById("live-price-display");
        const priceDisplaySummary = document.getElementById("live-price-display-summary");
        const tgText = document.getElementById("tg-addon-price-text");
        const animText = document.getElementById("anim-addon-price-text");
        const summaryTypeValue = document.getElementById("summary-type-value");
        const summaryAddonsValue = document.getElementById("summary-addons-value");

        const PRICING = {
            landing: { base: 2000, tgAddon: 500, animAddon: 0, forcedAddons: false },
            service: { base: 2400, tgAddon: 500, animAddon: 0, forcedAddons: false },
            store: { base: 3200, tgAddon: 0, animAddon: 0, forcedAddons: true },
        };

        let currentType = "landing";
        let currentTotal = PRICING.landing.base;

        function t(key) {
            return typeof translate === "function" ? translate(key, currentLang()) : key;
        }

        function calculateTotal() {
            const config = PRICING[currentType] || PRICING.landing;
            let total = config.base;

            if (config.forcedAddons) {
                if (checkTg) { checkTg.checked = true; checkTg.disabled = true; }
                if (checkAnim) { checkAnim.checked = true; checkAnim.disabled = true; }
                if (tgText) tgText.textContent = t("addons.included");
                if (animText) animText.textContent = t("addons.included");
            } else {
                if (checkTg) checkTg.disabled = false;
                if (checkAnim) checkAnim.disabled = false;
                if (tgText) tgText.textContent = `+${config.tgAddon} ₽`;
                if (animText) animText.textContent = `+${config.animAddon} ₽`;
                if (checkTg && checkTg.checked) total += config.tgAddon;
                if (checkAnim && checkAnim.checked) total += config.animAddon;
            }

            currentTotal = total;

            [priceDisplay, priceDisplaySummary].forEach(el => {
                if (!el) return;
                el.textContent = total;
                const parent = el.parentElement;
                if (parent) {
                    parent.classList.remove("pulse-price");
                    void parent.offsetWidth;
                    parent.classList.add("pulse-price");
                }
            });

            if (summaryTypeValue) summaryTypeValue.textContent = t(`type.${currentType}.title`);
            if (summaryAddonsValue) {
                const activeAddons = [];
                if (checkTg && checkTg.checked) activeAddons.push(t("addons.tg.label"));
                if (checkAnim && checkAnim.checked) activeAddons.push(t("addons.anim.label"));
                summaryAddonsValue.textContent = activeAddons.length ? activeAddons.join(", ") : t("price.summaryNone");
            }
        }

        tiles.forEach(tile => {
            tile.addEventListener("click", (e) => {
                if (e.target.classList.contains("tile-example-link")) return;
                tiles.forEach(t2 => t2.classList.remove("active"));
                tile.classList.add("active");
                currentType = tile.getAttribute("data-type");

                if (!PRICING[currentType].forcedAddons) {
                    if (checkTg) checkTg.checked = false;
                    if (checkAnim) checkAnim.checked = false;
                }
                calculateTotal();
            });
        });

        if (checkTg) checkTg.addEventListener("change", calculateTotal);
        if (checkAnim) checkAnim.addEventListener("change", calculateTotal);
        document.addEventListener("languagechange", calculateTotal);

        calculateTotal();

        // ---------- STEP WIZARD ----------
        const steps = Array.from(form.querySelectorAll(".config-step"));
        const progressItems = Array.from(form.querySelectorAll(".wizard-progress-item"));
        const btnNext = form.querySelector(".wizard-btn-next");
        const btnBack = form.querySelector(".wizard-btn-back");
        const submitBtn = document.getElementById("form-submit-trigger");
        let activeStep = 1;
        const totalSteps = steps.length;

        function renderStep() {
            steps.forEach(step => {
                step.hidden = Number(step.dataset.step) !== activeStep;
            });
            progressItems.forEach(item => {
                const n = Number(item.dataset.stepIndicator);
                item.classList.toggle("active", n === activeStep);
                item.classList.toggle("completed", n < activeStep);
            });
            if (btnBack) btnBack.classList.toggle("hidden", activeStep === 1);
            if (btnNext) btnNext.classList.toggle("hidden", activeStep === totalSteps);
            if (submitBtn) submitBtn.classList.toggle("hidden", activeStep !== totalSteps);
        }

        function validateContactStep() {
            let valid = true;
            [["client_name", "form.name.error"], ["client_contact", "form.contact.error"]].forEach(([id, errKey]) => {
                const el = document.getElementById(id);
                if (!el) return;
                const errorLabel = el.parentElement ? el.parentElement.querySelector(".custom-error-label") : null;
                if (el.value.trim() === "") {
                    valid = false;
                    el.classList.add("invalid");
                    if (errorLabel) {
                        errorLabel.textContent = t(errKey);
                        errorLabel.style.display = "block";
                    }
                }
            });
            return valid;
        }

        if (btnNext) {
            btnNext.addEventListener("click", () => {
                if (activeStep < totalSteps) {
                    activeStep += 1;
                    renderStep();
                    calculateTotal();
                    form.closest(".contact-section")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
                }
            });
        }
        if (btnBack) {
            btnBack.addEventListener("click", () => {
                if (activeStep > 1) {
                    activeStep -= 1;
                    renderStep();
                }
            });
        }

        ["client_name", "client_contact"].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener("input", () => {
                el.classList.remove("invalid");
                const errorLabel = el.parentElement ? el.parentElement.querySelector(".custom-error-label") : null;
                if (errorLabel) errorLabel.style.display = "none";
            });
        });

        renderStep();

        // ---------- ОТПРАВКА В TELEGRAM ----------
        const successUI = document.getElementById("form-success-state");
        const spinner = submitBtn ? submitBtn.querySelector(".spinner") : null;
        const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;

        if (successUI) successUI.classList.add("hidden");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (!validateContactStep()) return;

            const nameVal = document.getElementById("client_name")?.value.trim() || "—";
            const contactVal = document.getElementById("client_contact")?.value.trim() || "—";
            const commentVal = document.getElementById("client_task")?.value.trim() || "Не указаны";

            let options = [];
            if (PRICING[currentType].forcedAddons) {
                options.push("Telegram API (включено)", "UI-анимации (включено)");
            } else {
                if (checkTg && checkTg.checked) options.push("Telegram API");
                if (checkAnim && checkAnim.checked) options.push("UI-анимации");
            }
            const optionsText = options.length ? options.join(", ") : "Нет";
            const typeNameRu = translate ? translate(`type.${currentType}.title`, "ru") : currentType;

            const textMessage = `
📝 СФОРМИРОВАНО НОВОЕ ТЗ
──────────────────
👤 Имя клиента: ${nameVal}
📞 Связь: ${contactVal}

🖥️ Спецификация сайта: ${typeNameRu}
⚙️ Выбранные опции: ${optionsText}
💬 Пожелания: ${commentVal}

💵 Итоговая стоимость: ${currentTotal} ₽
──────────────────
📊 Заявка собрана через форму на сайте (${currentLang() === "en" ? "EN" : "RU"} версия).
            `.trim();

            if (submitBtn) {
                if (btnText) btnText.textContent = t("submit.sending");
                if (spinner) spinner.classList.remove("hidden");
                submitBtn.style.pointerEvents = "none";
            }

            try {
                const response = await fetch("/api/send-telegram", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: textMessage }),
                });

                if (!response.ok) throw new Error(`Server responded with ${response.status}`);

                form.style.transition = "opacity 0.25s ease-in-out";
                form.style.opacity = "0";
                setTimeout(() => {
                    form.classList.add("hidden");
                    if (successUI) {
                        successUI.classList.remove("hidden");
                        successUI.style.opacity = "0";
                        void successUI.offsetWidth;
                        successUI.style.transition = "opacity 0.3s ease-in-out";
                        successUI.style.opacity = "1";
                    }
                }, 250);
            } catch (error) {
                console.error("Ошибка отправки в Telegram:", error);
                if (submitBtn) {
                    if (btnText) btnText.textContent = t("submit.error");
                    if (spinner) spinner.classList.add("hidden");
                    submitBtn.style.pointerEvents = "auto";
                }
            }
        });
    })();
});

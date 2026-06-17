document.addEventListener('DOMContentLoaded', () => {

    const PASSWORD = 'jannat';
    const overlay = document.getElementById('passwordOverlay');
    const mainContent = document.getElementById('mainContent');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMsg');
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('photoModal');
    const modalClose = document.querySelector('.modal-close');
    const ctaBtn = document.getElementById('ctaBtn');
    const ctaSection = document.getElementById('ctaSection');
    const nextHint = document.getElementById('nextHint');
    const cardsSection = document.getElementById('cardsSection');
    const cardsComplete = document.getElementById('cardsComplete');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.getElementById('progressText');
    const hero = document.getElementById('hero');
    const passBox = document.getElementById('passBox');
    const mainTitle = document.getElementById('mainTitle');
    const introOverlay = document.getElementById('introOverlay');
    const introName = document.getElementById('introName');
    const introNameEn = document.getElementById('introNameEn');
    const introSparkles = document.getElementById('introSparkles');
    const loveOverlay = document.getElementById('loveOverlay');
    const loveTextContainer = document.getElementById('loveTextContainer');
    const loveEmojiRow = document.getElementById('loveEmojiRow');
    const loveNextHint = document.getElementById('loveNextHint');

    const isMobile = window.innerWidth <= 768;

    // ========== INTRO ANIMATION ==========
    function startIntro() {
        const sparkleEmojis = ['✨','💜','🩷','🌸','⭐'];
        for (let i = 0; i < 20; i++) {
            const s = document.createElement('div');
            s.className = 'intro-sparkle';
            s.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
            s.style.left = Math.random() * 100 + '%';
            s.style.top = Math.random() * 100 + '%';
            s.style.fontSize = (0.6 + Math.random() * 1.2) + 'rem';
            s.style.animationDuration = (2 + Math.random() * 3) + 's';
            s.style.animationDelay = (Math.random() * 4) + 's';
            introSparkles.appendChild(s);
        }

        // Step 1: Show جَنات
        introName.classList.add('show');

        // Step 2: After 2.5s, fade it out and show Jannat
        setTimeout(() => {
            introName.classList.remove('show');
            introName.classList.add('fade');
            setTimeout(() => {
                introName.style.display = 'none';
                introNameEn.classList.add('show');
            }, 800);
        }, 2500);

        // Step 3: After 2.5s more, fade everything and show password
        setTimeout(() => {
            introNameEn.classList.remove('show');
            introNameEn.classList.add('fade');
            setTimeout(() => {
                introOverlay.classList.add('hidden');
                overlay.classList.remove('hidden');
                passBox.style.opacity = '1';
                passBox.style.transform = 'translateY(0)';
                setTimeout(() => passwordInput.focus(), 300);
            }, 800);
        }, 5000);

        // Also remove overlay after full 5.8s if still showing
        setTimeout(() => {
            introOverlay.style.opacity = '0';
        }, 5600);
    }

    // ========== BG PARTICLES (hearts & stars) ==========
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let particles = [];
    const particleCount = isMobile ? 30 : 70;
    const ptclShapes = ['heart','star','diamond'];
    const ptclColors = ['#8844c0','#b858a8','#d890b0','#a060d8','#c870b8','#e0a0c8'];

    class Particle {
        constructor() { this.reset(true); }
        reset(init) {
            this.x = Math.random() * W;
            this.y = init ? Math.random() * H : H + 20;
            this.size = 3 + Math.random() * (isMobile ? 4 : 7);
            this.speed = 0.2 + Math.random() * 0.5;
            this.wind = (Math.random() - 0.5) * 0.15;
            this.alpha = 0.1 + Math.random() * 0.2;
            this.color = ptclColors[Math.floor(Math.random() * ptclColors.length)];
            this.shape = ptclShapes[Math.floor(Math.random() * ptclShapes.length)];
            this.rot = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 1;
        }
        update() {
            this.y -= this.speed;
            this.x += this.wind;
            this.rot += this.rotSpeed;
            if (this.y < -30) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot * Math.PI / 180);
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            const s = this.size;

            if (this.shape === 'heart') {
                ctx.beginPath();
                ctx.moveTo(0, s * 0.5);
                ctx.bezierCurveTo(s * 0.8, -s * 0.3, s * 0.8, s * 0.8, 0, s);
                ctx.bezierCurveTo(-s * 0.8, s * 0.8, -s * 0.8, -s * 0.3, 0, s * 0.5);
                ctx.fill();
            } else if (this.shape === 'star') {
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const a = (i * 4 * Math.PI / 5) - Math.PI / 2;
                    const px = Math.cos(a) * s;
                    const py = Math.sin(a) * s;
                    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(0, -s);
                ctx.lineTo(s * 0.7, 0);
                ctx.lineTo(0, s);
                ctx.lineTo(-s * 0.7, 0);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animateParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ========== FLOATING SHAPES (password bg) ==========
    const shapeContainer = document.getElementById('shapeContainer');
    if (shapeContainer) {
        const shapeTypes = ['heart', 'star', 'diamond'];
        for (let i = 0; i < (isMobile ? 8 : 16); i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'float-shape';
            wrapper.style.setProperty('--x', (5 + Math.random() * 90) + '%');
            wrapper.style.setProperty('--s', (2 + Math.random() * 5) + '');
            wrapper.style.setProperty('--dur', (10 + Math.random() * 12) + 's');
            wrapper.style.setProperty('--d', (Math.random() * 8) + 's');

            const inner = document.createElement('i');
            inner.className = 'float-shape-inner ' + shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            wrapper.appendChild(inner);
            shapeContainer.appendChild(wrapper);
        }
    }

    // ========== PASSWORD ==========
    let isProcessingPassword = false;
    let flippedCount = 0;
    let cardsRevealed = false;

    function checkPassword() {
        if (isProcessingPassword) return;
        isProcessingPassword = true;

        if (passwordInput.value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
            sessionStorage.setItem('auth', 'true');

            passBox.style.transition = 'all 0.4s ease';
            passBox.style.borderColor = 'rgba(136, 68, 192, 0.6)';
            passBox.style.boxShadow = '0 0 60px rgba(136, 68, 192, 0.2)';
            passBox.style.transform = 'scale(1.03)';
            passBox.querySelector('.icon').textContent = '💜';

            setTimeout(() => {
                overlay.style.transition = 'opacity 0.5s ease';
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    overlay.style.opacity = '';
                    startLoveMessages();
                    isProcessingPassword = false;
                }, 500);
            }, 400);
        } else {
            errorMsg.classList.remove('hidden');
            passwordInput.value = '';
            passwordInput.focus();
            passBox.style.animation = 'none';
            void passBox.offsetHeight;
            passBox.style.animation = 'shake 0.4s ease';
            passBox.style.borderColor = 'rgba(231, 76, 60, 0.4)';
            setTimeout(() => {
                errorMsg.classList.add('hidden');
                passBox.style.animation = '';
                passBox.style.borderColor = '';
                isProcessingPassword = false;
            }, 2000);
        }
    }

    loginBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    // ========== AUTO-AUTH ==========
    if (sessionStorage.getItem('auth')) {
        introOverlay.classList.add('hidden');
        overlay.classList.add('hidden');
        mainContent.classList.remove('hidden');
        document.body.style.overflow = 'auto';
        startHeroAnimation();
        startCardsObserver();
    } else {
        // Start intro animation
        setTimeout(() => startIntro(), 300);
    }

    // ========== LOVE MESSAGES ==========
    function startLoveMessages() {
        loveOverlay.classList.remove('hidden');

        const loveLines = [
            { text: 'بحبك يا جَنات 🤍', delay: 500 },
            { text: 'بنوتي الجميلة 💜', delay: 2500 },
            { text: 'أنتِ كل حاجة جميلة في حياتي 🥺', delay: 4500 },
            { text: 'بموت فيكي ي مزتي 🫶', delay: 6500 },
            { text: 'وأنتِ أحلى وأجمل بنت في الدنيا 🌹', delay: 8500 },
            { text: 'كل لحظة معاكي أجمل من اللي قبلها 💗', delay: 10500 },
            { text: 'بعشقك مووت ي عمري 😘💜', delay: 12500 },
        ];

        const allEmojis = ['💜', '🌹', '🩷', '🥺', '🫶', '😘', '💗', '🌸', '✨', '😍'];

        function typeMessage(text, container, speed = 50) {
            return new Promise(resolve => {
                container.textContent = '';
                container.classList.add('show');
                let idx = 0;
                function type() {
                    if (idx < text.length) {
                        container.textContent += text[idx];
                        idx++;
                        setTimeout(type, speed);
                    } else {
                        resolve();
                    }
                }
                type();
            });
        }

        function showEmojisGradually(count) {
            return new Promise(resolve => {
                const shuffled = [...allEmojis].sort(() => Math.random() - 0.5);
                let shown = 0;
                function addOne() {
                    if (shown < count) {
                        const span = document.createElement('span');
                        span.className = 'show';
                        span.textContent = shuffled[shown % shuffled.length];
                        loveEmojiRow.appendChild(span);
                        shown++;
                        setTimeout(addOne, 300 + Math.random() * 400);
                    } else {
                        resolve();
                    }
                }
                addOne();
            });
        }

        async function runLoveSequence() {
            // Show each line with typewriter
            for (const line of loveLines) {
                await new Promise(r => setTimeout(r, line.delay - (loveLines.indexOf(line) > 0 ? loveLines[loveLines.indexOf(line) - 1].delay : 0)));
                const el = document.createElement('div');
                el.className = 'love-text';
                loveTextContainer.appendChild(el);
                await typeMessage(line.text, el, isMobile ? 60 : 45);
                // Add random emojis after each line
                await showEmojisGradually(2 + Math.floor(Math.random() * 3));
            }

            // After all messages, show pointing hint
            await new Promise(r => setTimeout(r, 1000));
            loveNextHint.classList.add('show');
        }

        runLoveSequence();

        loveNextHint.addEventListener('click', () => {
            loveOverlay.style.transition = 'opacity 0.5s ease';
            loveOverlay.style.opacity = '0';
            setTimeout(() => {
                loveOverlay.classList.add('hidden');
                loveOverlay.style.opacity = '';
                mainContent.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                startHeroAnimation();
                startCardsObserver();
            }, 500);
        });
    }

    // ========== FLOATING ROSES ==========
    function startFloatingRoses() {
        const emojis = ['🌹', '💜', '🌸', '🩷'];
        for (let i = 0; i < (isMobile ? 6 : 12); i++) {
            const el = document.createElement('div');
            el.className = 'rose-float';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.left = Math.random() * 100 + '%';
            el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
            el.style.animationDuration = (8 + Math.random() * 12) + 's';
            el.style.animationDelay = (Math.random() * 10) + 's';
            document.body.appendChild(el);
        }
    }

    // ========== HERO ==========
    function startHeroAnimation() {
        const heroContent = hero.querySelector('.hero-new-content');
        heroContent.style.animation = 'heroEntrance 0.8s ease forwards';
        setTimeout(() => typewriterEffect(), 400);
        startFloatingRoses();
        setTimeout(() => {
            nextHint.style.display = 'flex';
            nextHint.style.animation = 'fadeInUp 0.6s ease forwards';
            setTimeout(() => {
                nextHint.style.animation = 'fadeInUp 0.6s ease forwards, float 2s ease-in-out 0.6s infinite';
            }, 600);
        }, 2000);
        startConfetti();
    }

    function typewriterEffect() {
        const text = 'بحبك يا جنات 🤍🤍🤍';
        mainTitle.textContent = '';
        mainTitle.classList.add('typewriter');
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;
            span.style.animationDelay = i * 0.03 + 's';
            span.style.display = 'inline-block';
            span.style.animation = 'charFade 0.3s ease forwards';
            mainTitle.appendChild(span);
        });
    }

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `@keyframes charFade { from{opacity:0;transform:translateY(10px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }`;
    document.head.appendChild(styleSheet);

    // ========== CONFETTI ==========
    function startConfetti() {
        const cCanvas = document.createElement('canvas');
        cCanvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:998';
        document.body.appendChild(cCanvas);
        const cCtx = cCanvas.getContext('2d');
        let cW, cH, cPieces = [];
        const cCount = isMobile ? 30 : 50;

        function cResize() { cW = cCanvas.width = window.innerWidth; cH = cCanvas.height = window.innerHeight; }
        cResize();
        window.addEventListener('resize', cResize);

        class C {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * cW;
                this.y = Math.random() * cH - cH;
                this.w = 3 + Math.random() * 4;
                this.h = 2 + Math.random() * 3;
                this.c = ['#a060d8','#8844c0','#d890b0','#b870a8','#c870b8','#b858a8','#e0a0c8'][Math.floor(Math.random()*7)];
                this.s = 1 + Math.random() * 1.5;
                this.wind = (Math.random() - 0.5) * 0.3;
                this.r = Math.random() * 360;
                this.rs = (Math.random() - 0.5) * 3;
            }
            u() {
                this.y += this.s; this.x += this.wind; this.r += this.rs;
                if (this.y > cH + 20) this.reset();
            }
            d() {
                cCtx.save();
                cCtx.translate(this.x, this.y);
                cCtx.rotate(this.r * Math.PI / 180);
                cCtx.fillStyle = this.c;
                cCtx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
                cCtx.restore();
            }
        }

        for (let i = 0; i < cCount; i++) cPieces.push(new C());

        (function loop() {
            cCtx.clearRect(0, 0, cW, cH);
            cPieces.forEach(p => { p.u(); p.d(); });
            requestAnimationFrame(loop);
        })();
    }

    // ========== CARDS OBSERVER ==========
    function revealCards() {
        if (cardsRevealed) return;
        cardsRevealed = true;
        cardsSection.classList.add('visible');
        setTimeout(() => {
            cards.forEach((card, i) => {
                setTimeout(() => card.classList.add('visible'), i * 200);
            });
        }, 300);
    }

    function startCardsObserver() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !cardsRevealed) {
                revealCards();
                observer.unobserve(cardsSection);
            }
        }, { threshold: 0.05 });

        setTimeout(() => observer.observe(cardsSection), 500);

        const scrollCheck = () => {
            if (cardsRevealed) { window.removeEventListener('scroll', scrollCheck); return; }
            if (hero.getBoundingClientRect().bottom < window.innerHeight * 0.3) revealCards();
        };
        window.addEventListener('scroll', scrollCheck, { passive: true });
    }

    nextHint.addEventListener('click', () => {
        cardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (!cardsRevealed) revealCards();
    });

    // ========== CARDS FLIP ==========
    const cardClicked = new Set();
    let nextExpectedIndex = 0;

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const index = parseInt(this.dataset.index);

            if (this.classList.contains('flipped')) {
                if (cardClicked.has(index)) showFunnyModal(index);
                return;
            }

            if (index !== nextExpectedIndex) {
                showOrderWarning();
                return;
            }

            this.classList.add('flipped');
            flippedCount++;
            nextExpectedIndex++;
            updateProgress();

            const rect = this.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const sparkleCount = isMobile ? 3 : 6;
            for (let i = 0; i < sparkleCount; i++) {
                const s = document.createElement('div');
                s.textContent = '✨';
                s.style.cssText = `position:fixed;font-size:0.8rem;pointer-events:none;z-index:999;left:${cx}px;top:${cy}px;transition:all 0.6s ease;`;
                document.body.appendChild(s);
                const a = (i / sparkleCount) * Math.PI * 2;
                const d = 40 + Math.random() * 50;
                requestAnimationFrame(() => {
                    s.style.transform = `translate(${Math.cos(a)*d}px, ${Math.sin(a)*d}px) scale(0)`;
                    s.style.opacity = '0';
                });
                setTimeout(() => s.remove(), 700);
            }

            cardClicked.add(index);
            showModal(index);

            if (flippedCount === cards.length) setTimeout(onAllCardsFlipped, 1000);
        });
    });

    function showOrderWarning() {
        const modal = document.getElementById('photoModal');
        const frame = modal.querySelector('.modal-photo-frame');
        frame.innerHTML = `
            <div style="text-align:center;padding:2rem;">
                <div style="font-size:3rem;margin-bottom:0.8rem;">😒</div>
                <p style="font-size:1.2rem;font-weight:700;color:var(--text-primary);line-height:1.8;">
                    بدعل مستعجله ليه كدا ياروحي<br>
                    افتحي من بدايه 🫵😂
                </p>
            </div>
        `;
        modal.classList.remove('hidden');
    }

    function updateProgress() {
        const pct = (flippedCount / cards.length) * 100;
        progressFill.style.setProperty('--pct', pct + '%');
        progressText.textContent = `${flippedCount} / ${cards.length}`;
    }

    // ========== ALL FLIPPED ==========
    function onAllCardsFlipped() {
        cardsComplete.classList.remove('hidden');
        cardsComplete.style.animation = 'scaleIn 0.5s ease forwards';

        for (let i = 0; i < (isMobile ? 15 : 30); i++) {
            const e = document.createElement('div');
            e.textContent = ['🎉','🎊','✨','💫','⭐'][Math.floor(Math.random()*5)];
            e.style.cssText = `position:fixed;font-size:1.2rem;pointer-events:none;z-index:999;left:${40 + Math.random()*20}%;top:40%;transition:all 1.2s ease;`;
            document.body.appendChild(e);
            requestAnimationFrame(() => {
                e.style.transform = `translate(${(Math.random()-0.5)*300}px, ${-150 - Math.random()*200}px) scale(0)`;
                e.style.opacity = '0';
            });
            setTimeout(() => e.remove(), 1500);
        }

        setTimeout(() => {
            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-60px) scale(0.4)';
                }, i * 80);
            });

            setTimeout(() => {
                cardsSection.style.transition = 'all 0.5s ease';
                cardsSection.style.opacity = '0';
                setTimeout(() => {
                    cardsSection.classList.remove('visible');
                    cardsSection.classList.add('cards-section-hidden');
                    cardsSection.style.opacity = '';
                    showCTA();
                }, 500);
            }, cards.length * 80 + 400);
        }, 1500);
    }

    // ========== CTA ==========
    function showCTA() {
        ctaSection.classList.remove('hidden');
        setTimeout(() => {
            ctaSection.classList.add('visible');
            ctaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    ctaBtn.addEventListener('click', () => {
        ctaBtn.textContent = 'يلا بينا 😈';
        ctaBtn.style.transform = 'scale(0.9)';
        setTimeout(() => { window.location.href = 'page2.html'; }, 400);
    });

    // ========== MODAL ==========
    const photoTitles = ['صورتها الأولى 💗', 'صورتها التانية 🌷', 'صورتها التالتة 💜', 'صورتها الرابعة 🩷'];

    function showModal(index) {
        const frame = modal.querySelector('.modal-photo-frame');
        frame.style.animation = 'none';
        void frame.offsetHeight;
        const photoNum = index + 1;
        frame.innerHTML = `
            <img src="photo-${photoNum}.jpg" alt="${photoTitles[index]}"
                 onerror="this.outerHTML='<div style=\'display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:0.5rem;background:#0a0a0f;border-radius:14px;\'><span style=\'font-size:3rem;\'>🖼️</span><p style=\'color:var(--text-secondary);font-size:0.9rem;\'>الصورة مش موجودة</p></div>'">
        `;
        frame.style.animation = 'scaleIn 0.35s ease forwards';
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function showFunnyModal(index) {
        const frame = modal.querySelector('.modal-photo-frame');
        frame.style.animation = 'none';
        void frame.offsetHeight;
        frame.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;background:#0a0a0f;border-radius:14px;padding:2rem;">
                <span style="font-size:4rem;margin-bottom:0.5rem;">😂</span>
                <p style="font-size:1.4rem;font-weight:700;color:var(--accent-gold);margin-bottom:0.5rem;">خلاص ي مزتي 😂🫵</p>
            </div>
        `;
        frame.style.animation = 'scaleIn 0.35s ease forwards';
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.animation = 'fadeOut 0.2s ease forwards';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.style.animation = '';
            document.body.style.overflow = 'auto';
        }, 200);
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

});

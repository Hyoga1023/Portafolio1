document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    // Ajustar el tamaño del canvas al tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Caracteres para el efecto Matrix
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = characters.split('');

    const fontSize = 14;
    const columns = canvas.width/fontSize;

    // Array para las "gotas" de caracteres
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Función de dibujo
    function draw() {
        // Fondo semi-transparente para crear el efecto de desvanecimiento
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Color verde característico de Matrix
        ctx.fillStyle = '#009900';
        ctx.font = fontSize + 'px monospace';

        // Dibuja los caracteres
        for(let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reinicia la "gota" cuando llega al final o aleatoriamente
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Iniciar la animación del efecto Matrix
    function animateMatrix() {
        draw();
        requestAnimationFrame(animateMatrix);
    }
    animateMatrix();

    // Efecto de texto mejorado
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            this.originalText = el.innerText;
            this.update = this.update.bind(this);
            this.frameRequest = null;
            this.frame = 0;
            this.queue = [];
        }

        setText(newText) {
            const length = newText.length;
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                this.queue.push({
                    from: '',
                    to: newText[i],
                    start: Math.floor(Math.random() * 20) + (i * 3),
                    end: Math.floor(Math.random() * 20) + (i * 3) + 20,
                    char: ''
                });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            
            return new Promise(resolve => {
                this.resolve = resolve;
            });
        }

        update() {
            let complete = 0;
            const finalText = [];
        
            for (let i = 0; i < this.queue.length; i++) {
                const { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    finalText.push(to || ' ');
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        this.queue[i].char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                    finalText.push(this.queue[i].char);
                } else {
                    finalText.push(' ');
                }
            }

            this.el.textContent = finalText.join('');

            if (complete === this.queue.length) {
                // Restaurar el texto original sin efectos adicionales
                setTimeout(() => {
                    this.el.textContent = this.originalText;
                    if (typeof this.resolve === 'function') {
                        this.resolve();
                    }
                }, 100);
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }

    // Observador de intersección para activar animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase visible con un pequeño retraso
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 50);
                
                // Manejar diferentes tipos de elementos
                if (entry.target.classList.contains('scramble-text')) {
                    const fx = new TextScramble(entry.target);
                    fx.setText(entry.target.textContent);
                } 
                
                // Manejar tarjetas con múltiples elementos de texto
                if (entry.target.classList.contains('card')) {
                    entry.target.querySelectorAll('.scramble-text').forEach((text, index) => {
                        setTimeout(() => {
                            text.classList.add('visible');
                            const fx = new TextScramble(text);
                            fx.setText(text.textContent);
                        }, index * 200); // Delay escalonado para cada texto
                    });
                }
            }
        });
    }, {
        threshold: 0.1, // Reducir el umbral para activar antes
        rootMargin: '0px 0px -50px 0px' // Margen inferior para activar antes
    });

    // Observar elementos con efecto scramble
    document.querySelectorAll('.scramble-text, .card').forEach(el => {
        observer.observe(el);
    });

    // Añadir un fallback para elementos que no sean observados
    document.querySelectorAll('.scramble-text').forEach(el => {
        if (!el.classList.contains('visible')) {
            el.classList.add('visible');
            const fx = new TextScramble(el);
            fx.setText(el.textContent);
        }
    });
});
document.addEventListener('scroll', function () {
    const paragraphs = document.querySelectorAll('.matrix-paragraph');
    paragraphs.forEach(paragraph => {
        const rect = paragraph.getBoundingClientRect();
        console.log('Rect:', rect); // Verifica las coordenadas
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            console.log('Visible:', paragraph.innerText); // Verifica si entra aquí
            paragraph.style.opacity = 1;
            paragraph.style.transform = 'translateX(0)';
        } else {
            console.log('Not visible:', paragraph.innerText); // No entra en el viewport
        }
    });
});

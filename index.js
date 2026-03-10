addListeners();

function addListeners() {
    let mah = null;
    let herAnim = null;

    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster()
                .addMove(1000, {x: 100, y: 10})
                .addMove(1000, {x: 1000, y: 100})
                .addMove(1000, {x: -1000, y: 100})
                .play(block);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('fadeOut')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('moveAndHide')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            mah = animaster().moveAndHide(block, 5000);
        });

    document.getElementById('resetMoveAndHide')
        .addEventListener('click', function () {
            mah?.reset();
        });

    document.getElementById('resetMoveAndHide')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            mah?.stop();
        });

    document.getElementById('showAndHide')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 5000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            herAnim = animaster().heartBeating(block);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            herAnim?.stop();
        });

    document.getElementById('resetFadeIn')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().resetFadeIn(block);
        });
    document.getElementById('resetFadeOut')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().resetFadeOut(block);
        })
    document.getElementById('resetMoveAndScale')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().resetMoveAndScale(block);
        })
    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const element = document.getElementById('scaleBlock');
            const customAnimation = animaster()
                .addMove(200, {x: 40, y: 40})
                .addScale(800, 1.3)
                .addMove(200, {x: 80, y: 0})
                .addScale(800, 1)
                .addMove(200, {x: 40, y: -40})
                .addScale(800, 0.7)
                .addMove(200, {x: 0, y: 0})
                .addScale(800, 1);
            customAnimation.play(element);
        });
}

/**
 * Блок плавно появляется из прозрачного.
 * @param element — HTMLElement, который надо анимировать
 * @param duration — Продолжительность анимации в миллисекундах
 */

/**
 * Функция, передвигающая элемент
 * @param element — HTMLElement, который надо анимировать
 * @param duration — Продолжительность анимации в миллисекундах
 * @param translation — объект с полями x и y, обозначающими смещение блока
 */

/**
 * Функция, увеличивающая/уменьшающая элемент
 * @param element — HTMLElement, который надо анимировать
 * @param duration — Продолжительность анимации в миллисекундах
 * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
 */

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function animaster() {
    function move(element, duration, translation) {
        return this.addMove(duration, translation).play(element);
    }

    function fadeIn(element, duration) {
        return this.addFadeIn(duration).play(element);
    }

    function fadeOut(element, duration) {
        return this.addFadeOut(duration).play(element);
    }

    function scale(element, duration, ratio) {
        return this.addScale(duration, ratio).play(element);
    }

    function fadeInStep(element, duration) {
        element.style.transitionDuration =  `${duration}ms`;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function moveStep(element, duration, translation) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(translation, null);
    }

    function scaleStep(element, duration, ratio) {
        element.style.transitionDuration =  `${duration}ms`;
        element.style.transform = getTransform(null, ratio);
    }

    function fadeOutStep(element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function moveAndHide(element, duration) {
        const mo = duration * 2 / 5;
        const fin = duration * 3 / 5;

        moveStep(element, mo, { x: 100, y: 20 });

        const timeoutId = setTimeout(() => {
            fadeOutStep(element, fin);
        }, mo);

        return {
            stop() {
                clearTimeout(timeoutId);
            },
            reset() {
                clearTimeout(timeoutId);
                element.classList.remove('hide');
                element.classList.add('show');
                element.style.transform = null;
                element.style.transitionDuration = null;
            }
        };
    }

    function showAndHide(element, duration) {
        const tic = duration / 3;
        fadeInStep(element, tic);
        setTimeout(() => fadeOutStep(element, tic), tic * 2);
    }

    function heartBeating(element) {
        const tic = 500;
        let bet = false;

        scaleStep(element, tic, 1.4);

        const intervalId = setInterval(() => {
            bet = !bet;
            scaleStep(element, tic, bet ? 1 : 1.4);
        }, tic);

        return {
            stop() {
                clearInterval(intervalId);
            },
            reset() {
                clearInterval(intervalId);
                element.style.transform = null;
                element.style.transitionDuration = null;
            }
        };
    }



    function resetFadeIn(element) {
        element.classList.remove('show');
        element.classList.add('hide');
        element.style.transitionDuration = null;
    }

    function resetFadeOut(element) {
        element.classList.remove('hide');
        element.style.transitionDuration = null;
    }

    function resetMoveAndScale(element) {
        element.style.transform = null;
        element.style.transitionDuration = null;
    }

    function addMove(duration, translation) {
        this._step.push({
            type: 'move',
            duration: duration,
            arguments: translation
        });

        return this;
    }

    function addScale(duration, ratio) {
        this._step.push({
            type: 'scale',
            duration: duration,
            arguments: ratio
        });

        return this;
    }

    function addFadeIn(duration) {
        this._step.push({
            type: 'fadeIn',
            duration: duration,
            arguments: null
        })

        return this;
    }

    function addFadeOut(duration) {
        this._step.push({
            type: 'fadeOut',
            duration: duration,
            arguments: null
        })

        return this;
    }

    function play(element) {
        let passedTime = 0;
        for (const step of this._step) {
            setTimeout(() => {
                if (step.type === 'move') {
                    moveStep(element, step.duration, step.arguments);
                }

                if (step.type === 'scale') {
                    scaleStep(element, step.duration, step.arguments);
                }

                if (step.type === 'fadeIn') {
                    fadeInStep(element, step.duration);
                }

                if (step.type === 'fadeOut') {
                    fadeOutStep(element, step.duration);
                }
            }, passedTime);
            passedTime += step.duration;
        }
    }

    return {
        _step: [],
        addMove,
        addScale,
        addFadeIn,
        addFadeOut,
        play,
        fadeIn,
        move,
        scale,
        fadeOut,
        resetFadeIn,
        resetFadeOut,
        resetMoveAndScale,
        moveAndHide,
        showAndHide,
        heartBeating
    };
}
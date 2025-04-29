    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.header__nav-link');

    function setActiveLink() {
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - (window.innerHeight / 3)) currentSection = section.id;
        });

        navLinks.forEach(link => {
            link.classList.remove('header__nav-link--active');

            if (link.dataset.section === currentSection) {
                link.classList.add('header__nav-link--active');
            }
        });
    }

    setActiveLink();

    window.addEventListener('scroll', setActiveLink);

    class Menu {
        constructor(menuSelector, openButtonSelector, closeButtonSelector, classShow) {
            this.menu = document.querySelector(`.${menuSelector}`);
            this.classShow = classShow;
            this.openButton = document.querySelector(`.${openButtonSelector}`);
            this.closeButton = document.querySelector(`.${closeButtonSelector}`);
            this.init()
        }
        init() {
            this.openButton.addEventListener(('click'), this.open.bind(this));
            this.closeButton.addEventListener(('click'), this.close.bind(this));
            this.menu.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', this.close.bind(this));
            })
        }
        open() {
            this.menu.classList.add(this.classShow);
        }
        close() {
            this.menu.classList.remove(this.classShow);
        }
    }

    const menuData = {
        menuSelector: 'header__menu',
        openButtonSelector: 'header__open-menu-button',
        closeButtonSelector: 'header__close-menu-button',
        classShow: 'header__menu--show',
    }
    new Menu(menuData.menuSelector, menuData.openButtonSelector, menuData.closeButtonSelector, menuData.classShow);

    class Tabs {
        constructor({ buttonsSelector, contentsSelector, activeButtonClass, activeContentClass }) {
            this.buttons = document.querySelectorAll(buttonsSelector);
            this.contents = document.querySelectorAll(contentsSelector);
            this.activeButtonClass = activeButtonClass;
            this.activeContentClass = activeContentClass;
            this.init();
        }

        init() {
            this.buttons.forEach(btn =>
                btn.addEventListener("click", () => this.switchTab(btn))
            );
        }

        switchTab(button) {
            const targetId = button.dataset.tab;
            this.buttons.forEach(btn => btn.classList.remove(this.activeButtonClass));
            this.contents.forEach(c => c.classList.remove(this.activeContentClass));
            button.classList.add(this.activeButtonClass);
            document.getElementById(targetId).classList.add(this.activeContentClass);
        }
    }

    new Tabs({
        buttonsSelector: ".trade__tab-button",
        contentsSelector: ".trade__tab-content",
        activeButtonClass: "trade__tab-button--active",
        activeContentClass: "trade__tab-content--active"
    });

    class TradeSelect {
        constructor(el) {
            this.el = el;
            this.trigger = el.querySelector(".trade__select-trigger");
            this.icon = this.trigger.querySelector(".trade__currency-icon");
            this.label = this.trigger.querySelector("span");
            this.options = el.querySelector(".trade__select-options");
            this.input = el.querySelector('input[type="hidden"]');
            this.bind();
        }

        bind() {
            this.trigger.addEventListener("click", e => {
                e.stopPropagation();
                this.el.classList.toggle("trade__select--open");
            });

            this.options.querySelectorAll(".trade__select-option").forEach(opt => {
                opt.addEventListener("click", () => this.select(opt));
            });
        }

        select(opt) {
            this.input.value = opt.dataset.value;
            const icon = opt.querySelector(".trade__currency-icon");
            this.icon.src = icon.src;
            this.icon.alt = icon.alt;
            this.label.textContent = opt.querySelector("span").textContent.trim();
            this.el.classList.remove("trade__select--open");
        }

        static closeAll() {
            document.querySelectorAll(".trade__select--open")
                .forEach(el => el.classList.remove("trade__select--open"));
        }

        static init() {
            document.querySelectorAll(".trade__select")
                .forEach(el => new TradeSelect(el));
            document.addEventListener("click", TradeSelect.closeAll);
        }
    }

    TradeSelect.init();

    class Accordion {
        constructor(itemSelector, contentSelector = '.faq__question-content') {
            this.items = document.querySelectorAll(itemSelector);
            this.contentSelector = contentSelector;
            this.bindEvents();
        }

        bindEvents() {
            this.items.forEach(item => {
                item.addEventListener('click', () => this.toggleItem(item));
            });
        }

        toggleItem(clickedItem) {
            this.items.forEach(item => {
                const content = item.querySelector(this.contentSelector);
                if (item === clickedItem) {
                    const isActive = item.classList.contains('active');
                    if (isActive) {
                        item.classList.remove('active');
                        content.style.maxHeight = null;
                    } else {
                        item.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                } else {
                    item.classList.remove('active');
                    content.style.maxHeight = null;
                }
            });
        }
    }

  new Accordion('.faq__question');

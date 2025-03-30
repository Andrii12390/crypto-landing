
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
const menu = new Menu(menuData.menuSelector, menuData.openButtonSelector, menuData.closeButtonSelector, menuData.classShow);


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.timeline()
    .from(".hero__title", { opacity: 0, y: 30, duration: 0.8 })
    .from(".hero__description", { opacity: 0, y: 15, duration: 0.8 }, "-=0.4");

gsap.utils.toArray(".hero__icon-wrapper").forEach((icon, i) =>
    gsap.to(icon, {
        x: () => Math.random() * 10 - 5,
        y: () => 10 + Math.random() * 20,
        duration: () => 3 + Math.random() * 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.2
    })
);

const reveal = (sel, { start = "top 80%", delay = i => i * 0.2 } = {}) => {
    gsap.utils.toArray(sel).forEach((el, i) =>
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start,
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: delay(i),
            ease: "power2.out"
        })
    );
};

const section = (trigger, steps) => {
    const tl = gsap.timeline({
        scrollTrigger: { trigger, start: "top 75%", toggleActions: "play none none none", once: true }
    });
    steps.forEach(args => tl.from(...args));
};

reveal(".learn-crypto__benefit");
reveal(".learn-crypto__guide");
reveal(".footer__column", { start: "top 90%", delay: i => i * 0.1 });

section(".learn-crypto__inner", [
    [".learn-crypto__title", { opacity: 0, y: -30, duration: 0.8, ease: "power2.out" }],
    [".learn-crypto__description", { opacity: 0, y: -20, duration: 0.8, ease: "power2.out" }, "-=0.4"]
]);

section(".faq__inner", [
    [".faq__title", { opacity: 0, y: -30, duration: 0.8, ease: "power2.out" }],
    [".faq__text", { opacity: 0, y: -20, duration: 0.8, ease: "power2.out" }, "-=0.4"]
]);

section(".support__inner", [
    [".support__title", { opacity: 0, y: -30, duration: 0.6, ease: "power2.out" }],
    [".support__description", { opacity: 0, y: -20, duration: 0.6, ease: "power2.out" }, "-=0.4"],
    [".support__social-icon", { opacity: 0, scale: 0.5, stagger: 0.15, duration: 0.5, ease: "back.out(0.5)" }, "-=0.4"],
    [".support__form", { opacity: 0, x: 50, duration: 0.8, ease: "power2.out" }, "-=0.6"]
]);

section(".market__inner", [
    [".market__title", { opacity: 0, y: -30, duration: 0.8, ease: "power2.out" }]
]);

let lastY = 0;
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    const y = window.pageYOffset;
    header.classList[y > lastY && y > 100 ? "add" : "remove"]("hidden");
    lastY = y;
});

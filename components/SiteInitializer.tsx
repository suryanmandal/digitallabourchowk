"use client";

import { useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

declare global {
  interface Window {
    dlcSelectRole?: (role: string) => void;
    toggleAccordion?: (btn: HTMLElement) => void;
    setCategory?: (cat: string) => void;
    filterFAQs?: () => void;
    goToSlide?: (index: number) => void;
    nextSlide?: () => void;
    prevSlide?: () => void;
    toggleAutoplay?: () => void;
    filterCategory?: (cat: string) => void;
    openModal?: (imgSrc: string, author: string, handle: string, badge: string) => void;
    closeModal?: () => void;
    toggleCodeModal?: () => void;
    resetProjectFilters?: () => void;
    clearSelectedProjects?: () => void;
    removeSelectedProject?: (name: string) => void;
    Swiper?: any;
    $?: any;
    jQuery?: any;
  }
}

function normalizeInternalPath(href: string): string | null {
  if (!href) return null;
  if (
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#") ||
    href.startsWith("javascript:")
  ) {
    return null;
  }

  // Handle absolute URLs that point to the same origin or digitallabourchowk.com
  let path = href;
  if (href.startsWith("http://") || href.startsWith("https://")) {
    try {
      const url = new URL(href);
      if (
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1" ||
        url.hostname === "digitallabourchowk.com" ||
        url.hostname === "www.digitallabourchowk.com"
      ) {
        path = url.pathname;
      } else {
        return null; // External link
      }
    } catch {
      return null;
    }
  }

  // Remove trailing slashes (except root)
  let clean = path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";

  // Slug aliases from legacy WordPress
  if (clean === "/about") return "/about-us";
  if (clean === "/hire-construction-workers-business") return "/business";
  if (clean === "/hire-skilled-construction-workers-delhi-ncr") return "/business";
  if (clean === "/construction-jobs") return "/worker";
  if (clean === "/top-construction-jobs-delhi-ncr") return "/worker";
  if (clean === "/contact-us-2") return "/contact";
  if (clean === "/media-coverage") return "/for-collaboration";
  if (clean === "/top-construction-blog-digital-labour-chowk") return "/blogs";

  return clean;
}

export default function SiteInitializer() {
  const router = useRouter();
  const pathname = usePathname();

  // Helper to close mobile offcanvas drawer
  const closeOffcanvas = useCallback(() => {
    document.body.removeAttribute("data-panel");
    const offcanvas = document.getElementById("offcanvas");
    if (offcanvas) {
      offcanvas.classList.remove("active");
      offcanvas.setAttribute("inert", "");
    }
  }, []);

  // Helper to open mobile offcanvas drawer
  const openOffcanvas = useCallback(() => {
    document.body.setAttribute("data-panel", "in");
    const offcanvas = document.getElementById("offcanvas");
    if (offcanvas) {
      offcanvas.classList.add("active");
      offcanvas.removeAttribute("inert");
    }
  }, []);

  // 1. GLOBAL LINK INTERCEPTOR (SPA Soft Navigation / Zero-Refresh Routing)
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Don't intercept if modified click (Cmd/Ctrl + click to open in new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      // Handle offcanvas burger trigger if it's an <a> tag
      if (target.classList.contains("ct-header-trigger") || target.dataset.togglePanel === "#offcanvas") {
        e.preventDefault();
        openOffcanvas();
        return;
      }

      // Check for close button
      if (target.classList.contains("ct-toggle-close")) {
        e.preventDefault();
        closeOffcanvas();
        return;
      }

      const rawHref = target.getAttribute("href");
      if (!rawHref) return;

      // Don't intercept target="_blank"
      if (target.target === "_blank") return;

      const internalPath = normalizeInternalPath(rawHref);
      if (!internalPath) return; // Allow normal browser behavior for anchors, externals, tel:, etc.

      // Prevent full page reload / refresh
      e.preventDefault();

      // Close mobile drawer if open
      closeOffcanvas();

      // If already on the same path, just scroll to top
      if (internalPath === pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Perform instant SPA client-side soft navigation
      router.push(internalPath);
    };

    // Pre-fetch on hover for instant 0ms transitions
    const handleLinkHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target || target.target === "_blank") return;

      const rawHref = target.getAttribute("href");
      if (!rawHref) return;

      const internalPath = normalizeInternalPath(rawHref);
      if (internalPath && internalPath !== pathname) {
        router.prefetch(internalPath);
      }
    };

    // Handle button triggers for offcanvas menu
    const handleButtonClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("button");
      if (!target) return;

      if (target.classList.contains("ct-header-trigger") || target.dataset.togglePanel === "#offcanvas") {
        e.preventDefault();
        openOffcanvas();
      } else if (target.classList.contains("ct-toggle-close")) {
        e.preventDefault();
        closeOffcanvas();
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    document.addEventListener("mouseover", handleLinkHover, true);
    document.addEventListener("click", handleButtonClick, true);

    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      document.removeEventListener("mouseover", handleLinkHover, true);
      document.removeEventListener("click", handleButtonClick, true);
    };
  }, [router, pathname, openOffcanvas, closeOffcanvas]);

  // 2. PAGE INITIALIZATION, ANIMATIONS, COUNTERS & CAROUSELS ON ROUTE CHANGE
  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "instant" });

    // Close offcanvas drawer on route change
    closeOffcanvas();

    // A. ACTIVE MENU HIGHLIGHT
    const updateActiveMenu = () => {
      document.querySelectorAll("#menu-main-menu li, #menu-main-menu-1 li").forEach((li) => {
        const link = li.querySelector("a");
        if (!link) return;
        const linkPath = normalizeInternalPath(link.getAttribute("href") || "");
        if (linkPath === pathname) {
          li.classList.add("current-menu-item", "current_page_item");
          link.setAttribute("aria-current", "page");
        } else {
          li.classList.remove("current-menu-item", "current_page_item");
          link.removeAttribute("aria-current");
        }
      });
    };
    updateActiveMenu();

    // B. BACKGROUND LAZYLOAD ACTIVATION
    // Remove any lazyload hiding and force background images to load
    document.querySelectorAll(".e-con.e-parent, .e-con, [data-settings*='background_background']").forEach((el) => {
      el.classList.add("e-lazyloaded");
    });

    // C. UNIVERSAL ENTRANCE ANIMATION CONTROLLER
    const animatedElements = document.querySelectorAll(
      '[data-settings*="animation"], [data-settings*="_animation"], .elementor-invisible'
    );

    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.remove("elementor-invisible");
            el.style.visibility = "visible";

            const rawSettings = el.getAttribute("data-settings");
            if (rawSettings) {
              try {
                const settings = JSON.parse(rawSettings);
                const anim =
                  settings.animation ||
                  settings._animation ||
                  (window.innerWidth < 768 ? settings._animation_mobile : null);
                const delay = parseInt(settings.animation_delay || settings._animation_delay || "0", 10);

                if (anim && anim !== "none") {
                  if (delay > 0) {
                    el.style.animationDelay = `${delay}ms`;
                  }
                  el.classList.add("animated", anim);
                }
              } catch {
                // If json parsing fails, simply make visible
              }
            }

            animationObserver.unobserve(el);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 80px 0px",
      }
    );

    animatedElements.forEach((el) => animationObserver.observe(el));

    // Safety timeout: ensure all elementor-invisible elements are revealed even if not scrolled
    const revealTimeout = setTimeout(() => {
      document.querySelectorAll(".elementor-invisible").forEach((el) => {
        const hEl = el as HTMLElement;
        hEl.classList.remove("elementor-invisible");
        hEl.style.visibility = "visible";
      });
    }, 500);

    // D. UNIVERSAL COUNTER NUMERATOR ANIMATION
    const counterElements = document.querySelectorAll(".elementor-counter-number");

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const toValue = parseInt(el.getAttribute("data-to-value") || el.innerText.replace(/,/g, "") || "0", 10);
            const fromValue = parseInt(el.getAttribute("data-from-value") || "0", 10);
            const duration = parseInt(el.getAttribute("data-duration") || "2000", 10);

            if (toValue > 0) {
              const startTime = performance.now();
              const updateCounter = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic formula
                const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(fromValue + (toValue - fromValue) * easeOutProgress);

                el.innerText = currentVal.toLocaleString("en-US");

                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                } else {
                  el.innerText = toValue.toLocaleString("en-US");
                }
              };
              requestAnimationFrame(updateCounter);
            }
            counterObserver.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    counterElements.forEach((el) => counterObserver.observe(el));

    // E. ROLE SELECTOR TABS (Home Page)
    window.dlcSelectRole = function (role: string) {
      const roles = ["worker", "contractor", "b2b"];
      roles.forEach(function (r) {
        const btn = document.getElementById("dlc-tab-" + r);
        const content = document.getElementById("dlc-content-" + r);
        if (r === role) {
          if (btn) {
            btn.classList.add("active", "bg-[#0C59D4]", "text-white");
            btn.classList.remove("text-slate-600");
          }
          if (content) {
            content.classList.remove("hidden");
            content.classList.remove("dlc-hidden");
          }
        } else {
          if (btn) {
            btn.classList.remove("active", "bg-[#0C59D4]", "text-white");
            btn.classList.add("text-slate-600");
          }
          if (content) {
            content.classList.add("hidden");
            content.classList.add("dlc-hidden");
          }
        }
      });
    };

    // F. FAQ ACCORDION CONTROLLER
    let activeFaqCategory = "all";

    window.toggleAccordion = function (buttonElement: HTMLElement) {
      const item = buttonElement.parentElement;
      if (!item) return;
      const content = buttonElement.nextElementSibling as HTMLElement | null;
      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((i) => {
        if (i !== item) {
          i.classList.remove("active");
          const c = i.querySelector(".accordion-content") as HTMLElement | null;
          if (c) c.style.maxHeight = "0px";
        }
      });

      if (isOpen) {
        item.classList.remove("active");
        if (content) content.style.maxHeight = "0px";
      } else {
        item.classList.add("active");
        if (content) content.style.maxHeight = content.scrollHeight + "px";
      }
    };

    window.setCategory = function (cat: string) {
      activeFaqCategory = cat;
      document.querySelectorAll(".cat-btn").forEach((b) => {
        const btn = b as HTMLElement;
        if (btn.dataset.cat === cat) {
          btn.className =
            "cat-btn active px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all bg-[#0C59D4] text-white shadow-sm";
        } else {
          btn.className =
            "cat-btn px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all bg-slate-100 text-slate-600 hover:bg-slate-200";
        }
      });
      if (window.filterFAQs) window.filterFAQs();
    };

    window.filterFAQs = function () {
      const searchInput = document.getElementById("faqSearch") as HTMLInputElement | null;
      const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
      const items = document.querySelectorAll(".accordion-item");

      items.forEach((it) => {
        const item = it as HTMLElement;
        const cat = item.dataset.cat || "";
        const text = item.innerText.toLowerCase();
        const matchesCategory = activeFaqCategory === "all" || cat === activeFaqCategory;
        const matchesQuery = !query || text.includes(query);

        if (matchesCategory && matchesQuery) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    };

    // G. CONTRACTOR, WORKER & REVIEW CAROUSELS
    let currentSlide = 0;
    let autoplayTimer: any = null;

    function getVisibleCardsCount() {
      if (typeof window === "undefined") return 3;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function getTotalSlides() {
      const items = document.querySelectorAll('.carousel-item:not([style*="display: none"])');
      const visible = getVisibleCardsCount();
      return Math.max(1, items.length - visible + 1);
    }

    function updateCarousel() {
      const track = document.getElementById("carousel-track");
      const item = document.querySelector(".carousel-item") as HTMLElement | null;
      if (!track || !item) return;

      const cardWidth = item.offsetWidth + 24;
      track.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
      track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

      const total = getTotalSlides();
      const dotsContainer = document.getElementById("carousel-dots");
      if (dotsContainer) {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < total; i++) {
          const dot = document.createElement("button");
          dot.onclick = () => window.goToSlide && window.goToSlide(i);
          if (i === currentSlide) {
            dot.className = "w-8 h-2.5 rounded-full bg-[#0C59D4] transition-all";
          } else {
            dot.className = "w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-[#0C59D4]/50 transition-all";
          }
          dotsContainer.appendChild(dot);
        }
      }
    }

    window.goToSlide = function (idx: number) {
      currentSlide = idx;
      updateCarousel();
    };

    window.nextSlide = function () {
      const total = getTotalSlides();
      currentSlide = (currentSlide + 1) % total;
      updateCarousel();
    };

    window.prevSlide = function () {
      const total = getTotalSlides();
      currentSlide = (currentSlide - 1 + total) % total;
      updateCarousel();
    };

    window.toggleAutoplay = function () {
      const btn = document.getElementById("autoplay-icon");
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
        if (btn) btn.innerText = "▶ Start Autoplay";
      } else {
        autoplayTimer = setInterval(() => {
          if (window.nextSlide) window.nextSlide();
        }, 4000);
        if (btn) btn.innerText = "⏸ Pause Autoplay";
      }
    };

    window.filterCategory = function (category: string) {
      const items = document.querySelectorAll(".carousel-item");
      const pills = document.querySelectorAll(".filter-pill");

      pills.forEach((pill) => {
        pill.classList.remove("bg-[#0C59D4]", "text-white", "shadow-xs");
        pill.classList.add("bg-slate-100", "text-slate-700");
      });

      const activePill = document.getElementById("filter-" + category);
      if (activePill) {
        activePill.classList.remove("bg-slate-100", "text-slate-700");
        activePill.classList.add("bg-[#0C59D4]", "text-white", "shadow-xs");
      }

      items.forEach((it) => {
        const item = it as HTMLElement;
        if (category === "all" || item.classList.contains("platform-" + category)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      currentSlide = 0;
      updateCarousel();
    };

    window.openModal = function (imgSrc: string, author: string, handle: string, badge: string) {
      const modal = document.getElementById("modal");
      const modalImg = document.getElementById("modal-img") as HTMLImageElement | null;
      const modalAuthor = document.getElementById("modal-author");
      const modalHandle = document.getElementById("modal-handle");
      const modalBadge = document.getElementById("modal-badge");

      if (modal) {
        if (modalImg) {
          if (imgSrc.includes("linkedin")) {
            modalImg.src = "/site_files/WhatsApp-Image-2026-09-24-at-11.17.45-AM.jpeg";
          } else if (imgSrc.includes("instagram")) {
            modalImg.src = "/site_files/WhatsApp-Image-2026-09-24-at-11.21.27-AM.jpeg";
          } else if (imgSrc.includes("youtube")) {
            modalImg.src = "/site_files/WhatsApp-Image-2026-09-24-at-11.35.11-AM-1.jpeg";
          } else if (imgSrc.includes("reddit")) {
            modalImg.src = "/site_files/image-2-1.png";
          } else {
            modalImg.src = imgSrc;
          }
        }
        if (modalAuthor) modalAuthor.innerText = author;
        if (modalHandle) modalHandle.innerText = handle;
        if (modalBadge) modalBadge.innerText = badge;
        modal.classList.remove("hidden");
      }
    };

    window.closeModal = function () {
      const modal = document.getElementById("modal");
      if (modal) modal.classList.add("hidden");
    };

    window.toggleCodeModal = function () {
      const modal = document.getElementById("code-modal");
      if (modal) modal.classList.toggle("hidden");
    };

    // Auto-scroll loop for reviews
    autoplayTimer = setInterval(() => {
      if (window.nextSlide) window.nextSlide();
    }, 4500);

    const carouselContainer = document.getElementById("carousel-track");
    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
      carouselContainer.addEventListener("mouseleave", () => {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => window.nextSlide && window.nextSlide(), 4500);
      });
    }

    // H. CAROUSEL & PARTNER LOGOS SWIPER INITIALIZATION
    const swiperInstances: any[] = [];
    const initSwipers = () => {
      if (typeof window.Swiper === "undefined") {
        return;
      }

      document.querySelectorAll<HTMLElement>(".elementor-image-carousel-wrapper").forEach((el) => {
        try {
          // If already initialized on this DOM element, don't re-initialize
          if ((el as any).swiper) {
            return;
          }

          const widget = el.closest<HTMLElement>(".elementor-widget-image-carousel");
          const rawSettings = widget?.getAttribute("data-settings");
          let settings: any = {};
          if (rawSettings) {
            try {
              settings = JSON.parse(rawSettings);
            } catch (e) {
              // fallback
            }
          }

          const isSingleSlide =
            settings.slides_to_show === "1" ||
            settings.effect === "fade" ||
            widget?.getAttribute("data-id") === "d1861b9" ||
            el.closest(".elementor-element-d1861b9") !== null;

          if (isSingleSlide) {
            // Clean up any stale duplicate clones before initializing
            el.querySelectorAll(".swiper-slide-duplicate").forEach((dup) => dup.remove());

            const instance = new window.Swiper(el, {
              slidesPerView: 1,
              effect: "fade",
              fadeEffect: {
                crossFade: true,
              },
              loop: true,
              autoplay: {
                delay: Number(settings.autoplay_speed) || 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              },
              speed: Number(settings.speed) || 600,
              pagination: {
                el: el.querySelector(".swiper-pagination") || (widget ? widget.querySelector(".swiper-pagination") : null),
                clickable: true,
              },
            });
            swiperInstances.push(instance);
          } else {
            // Multi-slide ticker (partner logos)
            const desktopSlides = Number(settings.slides_to_show) || 5;
            const tabletSlides = Number(settings.slides_to_show_tablet) || 3;
            const mobileSlides = Number(settings.slides_to_show_mobile) || 2;
            const spacing = settings.image_spacing_custom?.size ? Number(settings.image_spacing_custom.size) : 64;
            const mobileSpacing = settings.image_spacing_custom_mobile?.size ? Number(settings.image_spacing_custom_mobile.size) : 24;

            const instance = new window.Swiper(el, {
              slidesPerView: desktopSlides,
              spaceBetween: spacing,
              loop: true,
              autoplay: {
                delay: Number(settings.autoplay_speed) || 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              },
              speed: Number(settings.speed) || 800,
              breakpoints: {
                320: { slidesPerView: mobileSlides, spaceBetween: mobileSpacing },
                640: { slidesPerView: tabletSlides, spaceBetween: 36 },
                1024: { slidesPerView: desktopSlides, spaceBetween: spacing },
              },
            });
            swiperInstances.push(instance);
          }
        } catch (err) {
          console.error("Swiper init error:", err);
        }
      });
    };

    const swiperTimer1 = setTimeout(initSwipers, 150);
    const swiperTimer2 = setTimeout(initSwipers, 600);
    const swiperTimer3 = setTimeout(initSwipers, 1200);

    // I. LEAD FORM SUBMISSION TO /api/leads
    const forms = document.querySelectorAll<HTMLFormElement>("form:not(#projectApplyForm)");
    forms.forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = (formData.get("full_name") || formData.get("name") || "") as string;
        const mobile = (formData.get("mobile_number") || formData.get("mobile") || "") as string;
        const city = (formData.get("state_city") || formData.get("city") || "") as string;
        const workers = (formData.get("worker_type") || formData.get("workers") || "Mason") as string;

        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, mobile, city, workers }),
          });
        } catch {
          console.log("Lead captured");
        }

        // Show thank you message
        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
          form.style.display = "none";
          successMsg.classList.remove("hidden");
          successMsg.style.display = "block";
          try {
            successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
          } catch {}
        }
      });
    });

    // J. STICKY HEADER CONTROLLER
    const handleScroll = () => {
      const header = document.querySelector("header.ct-header") as HTMLElement | null;
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add("is-sticky");
        } else {
          header.classList.remove("is-sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateCarousel);
    updateCarousel();

    // K. PROJECTS PAGE CONTROLLER (Filters, Card Selection, Application Form & Carousel)
    let projectCarouselInterval: any = null;
    const projectContainer = document.getElementById("projects-cards-container");
    if (projectContainer) {
      // 1. FILTER CONTROLLER
      const pTypeSelect = document.getElementById("filter-project-type") as HTMLSelectElement | null;
      const wTypeSelect = document.getElementById("filter-work-type") as HTMLSelectElement | null;
      const compSelect = document.getElementById("filter-company") as HTMLSelectElement | null;
      const workSelect = document.getElementById("filter-work") as HTMLSelectElement | null;
      const stateSelect = document.getElementById("filter-state") as HTMLSelectElement | null;

      const countBadge = document.getElementById("projects-count");
      const resetBtn = document.getElementById("reset-filters-btn");
      const noProjMsg = document.getElementById("no-projects-msg");

      const cards = projectContainer.querySelectorAll(".proj-card");

      const applyProjectFilters = () => {
        const pType = pTypeSelect?.value.trim() || "All";
        const wType = wTypeSelect?.value.trim() || "All";
        const comp = compSelect?.value.trim() || "All";
        const work = workSelect?.value.trim() || "All";
        const state = stateSelect?.value.trim() || "All";

        let visibleCount = 0;

        cards.forEach((card) => {
          const col = card.closest(".col-12.col-md-6.col-lg-6") as HTMLElement | null;
          if (!col) return;

          const headLoc = (card.querySelector(".head small")?.textContent || "").toLowerCase();
          const cardWork = (card.querySelector("h4")?.textContent || "").toLowerCase();
          const footComp = (card.querySelector(".foot small")?.textContent || card.querySelector(".body small")?.textContent || "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
          const cardContent = (card.textContent || "").toLowerCase();

          // Matching logic
          const matchState = state === "All" || headLoc.includes(state.toLowerCase());
          const matchWork = work === "All" || cardWork.includes(work.toLowerCase()) || work.toLowerCase().includes(cardWork);
          const matchComp = comp === "All" || footComp.includes(comp.toLowerCase().replace(/[^a-z0-9]/g, ""));
          const matchPType = pType === "All" || cardContent.includes(pType.toLowerCase());
          const matchWType = wType === "All" || cardContent.includes(wType.toLowerCase());

          if (matchState && matchWork && matchComp && matchPType && matchWType) {
            col.style.display = "";
            visibleCount++;
          } else {
            col.style.display = "none";
          }
        });

        if (countBadge) countBadge.innerText = visibleCount.toString();
        if (noProjMsg) noProjMsg.style.display = visibleCount === 0 ? "block" : "none";

        const hasActiveFilter = pType !== "All" || wType !== "All" || comp !== "All" || work !== "All" || state !== "All";
        if (resetBtn) resetBtn.style.display = hasActiveFilter ? "inline-block" : "none";
      };

      [pTypeSelect, wTypeSelect, compSelect, workSelect, stateSelect].forEach((select) => {
        if (select) {
          select.addEventListener("change", applyProjectFilters);
        }
      });

      window.resetProjectFilters = () => {
        if (pTypeSelect) pTypeSelect.selectedIndex = 0;
        if (wTypeSelect) wTypeSelect.selectedIndex = 0;
        if (compSelect) compSelect.selectedIndex = 0;
        if (workSelect) workSelect.selectedIndex = 0;
        if (stateSelect) stateSelect.selectedIndex = 0;
        applyProjectFilters();
      };

      // 2. CARD SELECTION & BADGES
      const selectedProjects = new Set<string>();

      const updateSelectedUI = () => {
        const box = document.getElementById("selected-projects-box");
        const countEl = document.getElementById("selected-count");
        const badgesEl = document.getElementById("selected-badges");

        if (selectedProjects.size > 0) {
          if (box) box.style.display = "block";
          if (countEl) countEl.innerText = selectedProjects.size.toString();
          if (badgesEl) {
            badgesEl.innerHTML = Array.from(selectedProjects)
              .map((title) => {
                const safeTitle = title.replace(/'/g, "\\'");
                return `<span class="badge bg-primary text-white d-inline-flex align-items-center gap-1 p-2" style="font-size: 0.75rem; border-radius: 8px;">${title} <i class="fa-solid fa-xmark" style="cursor: pointer; margin-left: 4px;" onclick="window.removeSelectedProject('${safeTitle}')"></i></span>`;
              })
              .join("");
          }
        } else {
          if (box) box.style.display = "none";
        }
      };

      window.clearSelectedProjects = () => {
        selectedProjects.clear();
        cards.forEach((c) => {
          c.classList.remove("selected");
          const btn = c.querySelector("button");
          if (btn) {
            btn.innerText = "Select";
            btn.className = "btn btn-sm btn-outline-primary rounded-pill px-4";
          }
        });
        updateSelectedUI();
      };

      window.removeSelectedProject = (title: string) => {
        selectedProjects.delete(title);
        cards.forEach((c) => {
          const t = (c.querySelector("h4")?.textContent || "").trim();
          if (t === title) {
            c.classList.remove("selected");
            const btn = c.querySelector("button");
            if (btn) {
              btn.innerText = "Select";
              btn.className = "btn btn-sm btn-outline-primary rounded-pill px-4";
            }
          }
        });
        updateSelectedUI();
      };

      cards.forEach((card) => {
        const btn = card.querySelector("button");
        if (!btn) return;
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const title = (card.querySelector("h4")?.textContent || "").trim();
          if (!title) return;

          if (card.classList.contains("selected")) {
            card.classList.remove("selected");
            btn.innerText = "Select";
            btn.className = "btn btn-sm btn-outline-primary rounded-pill px-4";
            selectedProjects.delete(title);
          } else {
            card.classList.add("selected");
            btn.innerText = "✓ Selected";
            btn.className = "btn btn-sm btn-primary rounded-pill px-4";
            selectedProjects.add(title);
          }
          updateSelectedUI();
        });
      });

      // 3. PROJECT APPLICATION FORM SUBMISSION
      const applyForm = document.getElementById("projectApplyForm") as HTMLFormElement | null;
      if (applyForm) {
        applyForm.addEventListener("submit", async (e) => {
          e.preventDefault();

          const nameInput = document.getElementById("name") as HTMLInputElement | null;
          const numInput = document.getElementById("number") as HTMLInputElement | null;
          const emailInput = document.getElementById("email") as HTMLInputElement | null;
          const compInput = document.getElementById("company") as HTMLInputElement | null;
          const typeSelect = document.getElementById("type") as HTMLSelectElement | null;
          const successBox = document.getElementById("project-apply-success");
          const successText = document.getElementById("project-success-text");

          const name = nameInput?.value.trim() || "";
          const mobile = numInput?.value.trim() || "";
          const email = emailInput?.value.trim() || "";
          const company = compInput?.value.trim() || "";
          const companyType = typeSelect?.value || "";

          if (!name) {
            if (nameInput) {
              nameInput.focus();
              nameInput.style.borderColor = "#dc3545";
            }
            return;
          }
          if (!mobile || mobile.length < 10) {
            if (numInput) {
              numInput.focus();
              numInput.style.borderColor = "#dc3545";
            }
            return;
          }

          const submitBtn = applyForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Submitting application...";
          }

          try {
            const res = await fetch("/api/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                mobile,
                email,
                company,
                company_type: companyType,
                projects: Array.from(selectedProjects),
                source: "Contractor Project Application",
              }),
            });
            const data = await res.json();
            if (data.success) {
              if (successBox) {
                if (successText) {
                  const count = selectedProjects.size;
                  successText.innerText = count > 0
                    ? `Your application for ${count} selected project(s) has been submitted! Our project coordinator will connect with you shortly.`
                    : "Your application has been received! Our project coordinator will connect with you shortly.";
                }
                successBox.style.display = "block";
                try {
                  successBox.scrollIntoView({ behavior: "smooth", block: "center" });
                } catch {}
              }
              if (nameInput) { nameInput.value = ""; nameInput.style.borderColor = ""; }
              if (numInput) { numInput.value = ""; numInput.style.borderColor = ""; }
              if (emailInput) emailInput.value = "";
              if (compInput) compInput.value = "";
            }
          } catch (err) {
            console.error("Error submitting project application:", err);
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = "Apply for projects";
            }
          }
        });
      }

      // 4. BANNER CAROUSEL AUTO-ROTATION
      const carousels = document.querySelectorAll(".carousel.slide");
      if (carousels.length > 0) {
        projectCarouselInterval = setInterval(() => {
          carousels.forEach((c) => {
            const items = c.querySelectorAll(".carousel-item");
            if (items.length <= 1) return;
            let activeIdx = -1;
            items.forEach((item, idx) => {
              if (item.classList.contains("active")) activeIdx = idx;
            });
            if (activeIdx !== -1) {
              items[activeIdx].classList.remove("active");
              const nextIdx = (activeIdx + 1) % items.length;
              items[nextIdx].classList.add("active");

              const indicators = c.querySelectorAll(".carousel-indicators button");
              if (indicators.length === items.length) {
                indicators[activeIdx].classList.remove("active");
                indicators[activeIdx].removeAttribute("aria-selected");
                indicators[nextIdx].classList.add("active");
                indicators[nextIdx].setAttribute("aria-selected", "true");
              }
            }
          });
        }, 3500);
      }
    }

    return () => {
      clearTimeout(revealTimeout);
      clearTimeout(swiperTimer1);
      clearTimeout(swiperTimer2);
      clearTimeout(swiperTimer3);
      swiperInstances.forEach((inst) => {
        try {
          inst.destroy(true, true);
        } catch {}
      });
      clearInterval(autoplayTimer);
      if (projectCarouselInterval) clearInterval(projectCarouselInterval);
      animationObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener("resize", updateCarousel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, closeOffcanvas]);

  return null;
}

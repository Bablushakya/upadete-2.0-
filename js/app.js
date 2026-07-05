/* ============================================================
   WEB COMPONENT: LotusDivider
   Renders the traditional Indian Kamal (Lotus) decorative
   divider used between major content blocks.
   ============================================================ */
class LotusDivider extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="divider-lotus">
                <div class="divider-lotus-line"></div>
                <div class="divider-lotus-center">
                    <svg class="w-3 h-3 text-gold" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2">
                        <path d="M6,1 L9,6 L6,11 L3,6 Z" fill="currentColor" fill-opacity="0.15"/>
                    </svg>
                    <svg class="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                        <path d="M12 3C12 3 15 7.5 15 12C15 16.5 13 19 12 19C11 19 9 16.5 9 12C9 7.5 12 3 12 3Z" fill="currentColor" fill-opacity="0.15" stroke-linejoin="round"/>
                        <path d="M12 9C9.5 9 6.5 11 6.5 14C6.5 17 9.5 18 11.5 16.5C12 16 12 14.5 12 14.5" stroke-linejoin="round"/>
                        <path d="M12 9C14.5 9 17.5 11 17.5 14C17.5 17 14.5 18 12.5 16.5C12 16 12 14.5 12 14.5" stroke-linejoin="round"/>
                        <path d="M5 19C8 20.5 16 20.5 19 19" stroke-linecap="round"/>
                    </svg>
                    <svg class="w-3 h-3 text-gold" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2">
                        <path d="M6,1 L9,6 L6,11 L3,6 Z" fill="currentColor" fill-opacity="0.15"/>
                    </svg>
                </div>
                <div class="divider-lotus-line"></div>
            </div>
        `;
    }
}
customElements.define('lotus-divider', LotusDivider);


/* ============================================================
   MAIN APPLICATION — DOMContentLoaded
   All interactive behaviors are initialized here after the
   DOM is fully parsed.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------
       DOM SELECTORS
       Cache all frequently-used elements up front.
       -------------------------------------------------------- */
    const sections            = document.querySelectorAll('section');
    const navLinks            = document.querySelectorAll('.nav-link');
    const mobileNavLinks      = document.querySelectorAll('nav.md\\:hidden a');
    const navSectionCounter   = document.getElementById('nav-section-counter');
    const navActiveIndicator  = document.getElementById('nav-active-indicator');
    const parallaxImages      = document.querySelectorAll('.parallax-img');
    const scrollRevealItems   = document.querySelectorAll('.reveal-on-scroll');


    /* --------------------------------------------------------
       STATE VARIABLES
       -------------------------------------------------------- */
    let activeSectionIndex    = 0;
    let isSectionTransitioning = false;

    // Scroll wheel overscroll accumulation (resistance engine)
    let overscrollDelta      = 0;
    let overscrollDecayTimer = null;
    const OVERSCROLL_THRESHOLD = 180; // px delta required to fire a section transition

    // Touch swipe state
    let swipeTouchStartY         = 0;
    let swipeTouchStartScrollTop = 0;
    let swipeTargetSection       = null;


    /* --------------------------------------------------------
       ITINERARY SCROLL REVEAL
       Observes .reveal-on-scroll elements inside the active
       section and adds .revealed when they enter the viewport.
       -------------------------------------------------------- */
    function checkScrollReveals() {
        const viewportHeight = window.innerHeight;
        scrollRevealItems.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight * 0.85 && rect.bottom > 0) {
                el.classList.add('revealed');
            }
        });
    }


    /* --------------------------------------------------------
       NAVIGATION SLIDER
       Moves the vertical accent bar in the desktop sidebar to
       align with the currently active nav link.
       -------------------------------------------------------- */
    function updateNavSlider(index) {
        const activeLink = document.querySelector(`[data-nav="${index}"]`);
        if (activeLink && navActiveIndicator) {
            const linkTop    = activeLink.offsetTop;
            const linkHeight = activeLink.offsetHeight;
            navActiveIndicator.style.top = `${linkTop + (linkHeight / 2) - 16}px`;
        }
    }


    /* --------------------------------------------------------
       SECTION SWITCHING
       Handles the cinematic transition between page sections.
       Applies exit animation on the outgoing section, then
       reveals the incoming section after the transition delay.
       -------------------------------------------------------- */
    function switchSection(nextIndex) {
        if (nextIndex === activeSectionIndex || isSectionTransitioning) return;
        isSectionTransitioning = true;

        const outgoingSection = sections[activeSectionIndex];
        const incomingSection = sections[nextIndex];

        // Clear any overscroll elastic transformations on the outgoing section
        outgoingSection.style.transform  = '';
        outgoingSection.style.transition = '';

        // Apply exit animation
        outgoingSection.classList.add('exit');
        outgoingSection.classList.remove('active');

        // Update desktop sidebar nav link states
        navLinks.forEach((link, idx) => {
            if (idx === nextIndex) {
                link.classList.remove('opacity-60', 'text-secondary');
                link.classList.add('text-primary-container');
            } else {
                link.classList.add('opacity-60', 'text-secondary');
                link.classList.remove('text-primary-container');
            }
        });

        // Update mobile bottom nav link states
        mobileNavLinks.forEach((link, idx) => {
            if (idx === nextIndex) {
                link.classList.remove('text-secondary', 'opacity-60');
                link.classList.add('text-primary-container');
            } else {
                link.classList.add('text-secondary', 'opacity-60');
                link.classList.remove('text-primary-container');
            }
        });

        // Update the "01 / 05" section counter in the sidebar
        if (navSectionCounter) {
            navSectionCounter.textContent = `0${nextIndex + 1}`;
        }
        updateNavSlider(nextIndex);

        // Wait for exit animation to complete, then reveal incoming section
        setTimeout(() => {
            outgoingSection.style.display = 'none';
            outgoingSection.classList.remove('exit');

            incomingSection.style.display = 'flex';

            // Reset scroll position for each newly revealed section
            incomingSection.scrollTop = 0;

            // Small rAF buffer ensures display:flex is registered before adding .active
            requestAnimationFrame(() => {
                incomingSection.classList.add('active');
                setTimeout(checkScrollReveals, 100);
            });

            activeSectionIndex = nextIndex;

            // Extra cooldown window to absorb trackpad momentum after transition
            setTimeout(() => {
                isSectionTransitioning = false;
            }, 300);
        }, 700);
    }


    /* --------------------------------------------------------
       NAVIGATION CLICK HANDLERS
       Desktop sidebar links, mobile bottom nav links, and
       the in-section "Continue reading" triggers.
       -------------------------------------------------------- */

    // Desktop sidebar nav
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const index = parseInt(link.getAttribute('data-nav'));
            switchSection(index);
        });
    });

    // Mobile bottom nav
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const index = parseInt(link.getAttribute('data-nav'));
            switchSection(index);
        });
    });

    // In-section "Continue reading" footer triggers
    document.querySelectorAll('.next-section-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const index = parseInt(trigger.getAttribute('data-next-target'));
            switchSection(index);
        });
    });


    /* --------------------------------------------------------
       PARALLAX EFFECT
       Subtle mouse-tracking parallax on .parallax-img elements
       in the Introduction hero section.
       -------------------------------------------------------- */
    window.addEventListener('mousemove', e => {
        const offsetX = (e.clientX - window.innerWidth  / 2) * 0.01;
        const offsetY = (e.clientY - window.innerHeight / 2) * 0.01;

        parallaxImages.forEach(img => {
            img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`;
        });
    });


    /* --------------------------------------------------------
       SCROLL WHEEL ENGINE
       Accumulates wheel delta at section boundaries to create
       a resistance effect before firing a section transition.
       Provides elastic visual feedback during accumulation.
       -------------------------------------------------------- */
    window.addEventListener('wheel', e => {
        if (isSectionTransitioning) return;

        const currentSection = sections[activeSectionIndex];
        if (!currentSection) return;

        const atTop    = currentSection.scrollTop === 0;
        const atBottom = Math.abs(
            currentSection.scrollHeight - currentSection.scrollTop - currentSection.clientHeight
        ) < 2;

        // Only intercept wheel events at the top/bottom boundaries
        if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) {
            e.preventDefault();

            // Reset accumulator if user reverses direction mid-gesture
            if (Math.sign(e.deltaY) !== Math.sign(overscrollDelta) && overscrollDelta !== 0) {
                overscrollDelta = 0;
                currentSection.style.transition = 'transform 200ms ease-out';
                currentSection.style.transform  = '';
                setTimeout(() => { currentSection.style.transition = ''; }, 200);
            }

            clearTimeout(overscrollDecayTimer);
            overscrollDelta += e.deltaY;

            // Visual elastic bounce feedback proportional to accumulated delta
            const pullDirection  = Math.sign(overscrollDelta);
            const pullPixels     = Math.min(25, Math.abs(overscrollDelta) / 8);
            currentSection.style.transition = 'none';
            currentSection.style.transform  = `translateY(${-pullDirection * pullPixels}px)`;

            // Fire section transition if threshold is reached
            if (overscrollDelta >= OVERSCROLL_THRESHOLD) {
                if (activeSectionIndex < sections.length - 1) {
                    switchSection(activeSectionIndex + 1);
                }
                overscrollDelta = 0;

            } else if (overscrollDelta <= -OVERSCROLL_THRESHOLD) {
                if (activeSectionIndex > 0) {
                    switchSection(activeSectionIndex - 1);
                }
                overscrollDelta = 0;

            } else {
                // Decay timer — snap back to resting state if user stops scrolling
                overscrollDecayTimer = setTimeout(() => {
                    currentSection.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
                    currentSection.style.transform  = '';
                    overscrollDelta = 0;
                    setTimeout(() => { currentSection.style.transition = ''; }, 300);
                }, 250);
            }

        } else {
            // User is scrolling within section content — clear the accumulator
            overscrollDelta = 0;
        }
    }, { passive: false });


    /* --------------------------------------------------------
       TOUCH SWIPE GESTURE
       Mobile swipe-up / swipe-down at section boundaries
       triggers the same section transition as the scroll engine.
       Provides elastic bounce visual feedback during gesture.
       -------------------------------------------------------- */
    const SWIPE_THRESHOLD = 80; // px of intentional swipe distance required

    window.addEventListener('touchstart', e => {
        if (isSectionTransitioning) return;
        swipeTouchStartY         = e.touches[0].clientY;
        swipeTargetSection       = sections[activeSectionIndex];
        if (swipeTargetSection) {
            swipeTouchStartScrollTop = swipeTargetSection.scrollTop;
        }
    }, { passive: true });

    window.addEventListener('touchmove', e => {
        if (isSectionTransitioning || !swipeTargetSection) return;

        const currentY = e.touches[0].clientY;
        const deltaY   = swipeTouchStartY - currentY; // positive = swipe up (scroll down)

        const atTop    = swipeTouchStartScrollTop === 0;
        const atBottom = swipeTouchStartScrollTop >= swipeTargetSection.scrollHeight - swipeTargetSection.clientHeight - 5;

        if (deltaY > 0 && atBottom) {
            // Elastic bounce at bottom boundary
            const pullAmount = Math.min(20, deltaY / 5);
            swipeTargetSection.style.transition = 'none';
            swipeTargetSection.style.transform  = `translateY(${-pullAmount}px)`;

        } else if (deltaY < 0 && atTop) {
            // Elastic bounce at top boundary
            const pullAmount = Math.min(20, -deltaY / 5);
            swipeTargetSection.style.transition = 'none';
            swipeTargetSection.style.transform  = `translateY(${pullAmount}px)`;

        } else {
            swipeTargetSection.style.transform = '';
        }
    }, { passive: true });

    window.addEventListener('touchend', e => {
        if (isSectionTransitioning || !swipeTargetSection) return;

        const currentY = e.changedTouches[0].clientY;
        const deltaY   = swipeTouchStartY - currentY;

        const atTop    = swipeTouchStartScrollTop === 0;
        const atBottom = swipeTouchStartScrollTop >= swipeTargetSection.scrollHeight - swipeTargetSection.clientHeight - 5;

        if (deltaY > SWIPE_THRESHOLD && atBottom && activeSectionIndex < sections.length - 1) {
            switchSection(activeSectionIndex + 1);

        } else if (deltaY < -SWIPE_THRESHOLD && atTop && activeSectionIndex > 0) {
            switchSection(activeSectionIndex - 1);

        } else {
            // Snap back to resting state — no transition fired
            swipeTargetSection.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
            swipeTargetSection.style.transform  = '';
            const sectionToReset = swipeTargetSection;
            setTimeout(() => { sectionToReset.style.transition = ''; }, 300);
        }

        swipeTargetSection = null;
    }, { passive: true });


    /* --------------------------------------------------------
       KEYBOARD NAVIGATION
       Space, PageDown, ArrowDown at bottom boundary → next section.
       PageUp, ArrowUp at top boundary → previous section.
       -------------------------------------------------------- */
    window.addEventListener('keydown', e => {
        if (isSectionTransitioning) return;

        const currentSection = sections[activeSectionIndex];
        if (!currentSection) return;

        const atTop    = currentSection.scrollTop === 0;
        const atBottom = Math.abs(
            currentSection.scrollHeight - currentSection.scrollTop - currentSection.clientHeight
        ) < 5;

        // Space (32), PageDown (34), ArrowDown (40) — navigate forward
        if ((e.keyCode === 32 || e.keyCode === 34 || e.keyCode === 40) && atBottom) {
            if (activeSectionIndex < sections.length - 1) {
                e.preventDefault();
                switchSection(activeSectionIndex + 1);
            }
        }
        // PageUp (33), ArrowUp (38) — navigate backward
        else if ((e.keyCode === 33 || e.keyCode === 38) && atTop) {
            if (activeSectionIndex > 0) {
                e.preventDefault();
                switchSection(activeSectionIndex - 1);
            }
        }
    });


    /* --------------------------------------------------------
       EXPERIENCE SCROLL STORYTELLING (Section 02)
       The Experience section uses a sticky layout with 4 steps.
       As the user scrolls through the 400vh scroll track, the
       active step text and image cross-fade accordingly.
       The progress indicator lines fill proportionally.
       -------------------------------------------------------- */
    const experienceSection  = document.getElementById('workshop');
    const experienceSteps    = document.querySelectorAll('.experience-step');
    const experienceImages   = document.querySelectorAll('.experience-image');
    const progressLineFills  = document.querySelectorAll('.progress-line-fill');
    const progressStepLabels = document.querySelectorAll('.progress-indicator-label');

    if (experienceSection) {
        experienceSection.addEventListener('scroll', () => {
            const scrollTop    = experienceSection.scrollTop;
            const clientHeight = experienceSection.clientHeight;

            // Each step occupies one clientHeight worth of scroll space
            const stepScrollHeight = clientHeight;
            let activeStepIndex = Math.floor(scrollTop / stepScrollHeight);
            activeStepIndex = Math.max(0, Math.min(3, activeStepIndex)); // Clamp to 0–3

            // Cross-fade experience step narrative text
            experienceSteps.forEach((step, idx) => {
                if (idx === activeStepIndex) {
                    step.classList.add('active');
                    step.classList.remove('opacity-0', 'translate-y-[20px]', 'pointer-events-none');
                } else {
                    step.classList.remove('active');
                    step.classList.add('opacity-0', 'translate-y-[20px]', 'pointer-events-none');
                }
            });

            // Cross-fade experience step images
            experienceImages.forEach((img, idx) => {
                if (idx === activeStepIndex) {
                    img.classList.add('active');
                    img.classList.remove('opacity-0', 'scale-105', 'pointer-events-none');
                } else {
                    img.classList.remove('active');
                    img.classList.add('opacity-0', 'scale-105', 'pointer-events-none');
                }
            });

            // Update progress label active styles
            progressStepLabels.forEach((label, idx) => {
                if (idx === activeStepIndex) {
                    label.classList.add('text-primary', 'font-bold');
                    label.classList.remove('text-secondary/40');
                } else {
                    label.classList.remove('text-primary', 'font-bold');
                    label.classList.add('text-secondary/40');
                }
            });

            // Fill progress lines proportionally to scroll position within each step
            progressLineFills.forEach((line, idx) => {
                if (idx < activeStepIndex) {
                    // Steps before the active one are fully filled
                    line.style.height = '100%';
                } else if (idx === activeStepIndex) {
                    // Active step fills proportionally
                    const stepScrollOffset  = scrollTop - (activeStepIndex * stepScrollHeight);
                    const fillPercent = Math.min(100, Math.max(0, (stepScrollOffset / stepScrollHeight) * 100));
                    line.style.height = `${fillPercent}%`;
                } else {
                    // Steps after the active one are empty
                    line.style.height = '0%';
                }
            });

            // Check for itinerary card reveal triggers while scrolling
            checkScrollReveals();
        });
    }


    /* --------------------------------------------------------
       FAQ ACCORDION
       Clicking a .faq-trigger opens/closes its parent .faq-item.
       Only one item can be open at a time.
       -------------------------------------------------------- */
    document.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const faqItem   = trigger.closest('.faq-item');
            const isAlreadyOpen = faqItem.classList.contains('active');

            // Close all open items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open the clicked item (unless it was already open)
            if (!isAlreadyOpen) {
                faqItem.classList.add('active');
            }
        });
    });


    /* --------------------------------------------------------
       MODAL SYSTEM
       Handles the Trip Application modal and Discovery Call modal.
       -------------------------------------------------------- */

    // Modal element references
    const applyModal = document.getElementById('apply-modal');
    const callModal  = document.getElementById('call-modal');
    const applyCard  = applyModal ? applyModal.querySelector('.transform') : null;
    const callCard   = callModal  ? callModal.querySelector('.transform')  : null;

    /**
     * Opens a modal by removing hidden/invisible states.
     * @param {HTMLElement} modal - The backdrop overlay element
     * @param {HTMLElement} card  - The modal card element inside the backdrop
     */
    function openModal(modal, card) {
        if (!modal || !card) return;
        modal.classList.remove('pointer-events-none', 'opacity-0');
        modal.classList.add('opacity-100');
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
        document.body.classList.add('overflow-hidden');
    }

    /**
     * Closes a modal by restoring hidden/invisible states.
     * @param {HTMLElement} modal - The backdrop overlay element
     * @param {HTMLElement} card  - The modal card element inside the backdrop
     */
    function closeModal(modal, card) {
        if (!modal || !card) return;
        card.classList.remove('scale-100', 'opacity-100');
        card.classList.add('scale-95', 'opacity-0');
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('overflow-hidden');
    }

    // Collect all elements that open the Apply modal
    const applyTriggerButtons = [
        document.getElementById('hero-apply-btn'),
        document.querySelector('.sidebar-cta'),
        document.querySelector('.mobile-apply-btn')
    ].filter(Boolean);

    applyTriggerButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openModal(applyModal, applyCard);
        });
    });

    // Collect all elements that open the Discovery Call modal
    const callTriggerButtons = [
        document.getElementById('hero-call-btn')
    ].filter(Boolean);

    callTriggerButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openModal(callModal, callCard);
        });
    });

    // Apply modal close triggers
    const closeApplyModalBtn  = document.getElementById('close-apply-modal');
    const cancelApplyModalBtn = document.getElementById('cancel-apply');
    if (closeApplyModalBtn)  closeApplyModalBtn.addEventListener('click',  () => closeModal(applyModal, applyCard));
    if (cancelApplyModalBtn) cancelApplyModalBtn.addEventListener('click', () => closeModal(applyModal, applyCard));

    // Discovery Call modal close triggers
    const closeCallModalBtn  = document.getElementById('close-call-modal');
    const cancelCallModalBtn = document.getElementById('cancel-call');
    if (closeCallModalBtn)  closeCallModalBtn.addEventListener('click',  () => closeModal(callModal, callCard));
    if (cancelCallModalBtn) cancelCallModalBtn.addEventListener('click', () => closeModal(callModal, callCard));

    // Close modals when clicking outside the card (backdrop click)
    if (applyModal) {
        applyModal.addEventListener('click', e => {
            if (e.target === applyModal) closeModal(applyModal, applyCard);
        });
    }
    if (callModal) {
        callModal.addEventListener('click', e => {
            if (e.target === callModal) closeModal(callModal, callCard);
        });
    }


    /* --------------------------------------------------------
       TOAST NOTIFICATION SYSTEM
       Renders a temporary toast message at the bottom-right
       of the viewport. Auto-dismisses after 5 seconds.
       -------------------------------------------------------- */

    /**
     * Displays a toast notification.
     * @param {string} message  - The message to display
     * @param {string} [type]   - 'success' (default) or 'error'
     */
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = [
            'flex items-center gap-3',
            'bg-white text-on-surface',
            'border border-outline-variant/30',
            'px-6 py-4 rounded-xl shadow-2xl',
            'transform translate-y-4 opacity-0',
            'transition-all duration-300',
            'pointer-events-auto max-w-sm'
        ].join(' ');

        const iconHTML = type === 'error'
            ? `<span class="material-symbols-outlined text-error">error</span>`
            : `<span class="material-symbols-outlined text-gold">check_circle</span>`;

        toast.innerHTML = `
            ${iconHTML}
            <div class="flex-grow">
                <p class="font-body-md text-sm leading-snug">${message}</p>
            </div>
            <button class="text-secondary/40 hover:text-primary transition-colors focus:outline-none ml-2">
                <span class="material-symbols-outlined text-lg">close</span>
            </button>
        `;

        // Manual dismiss on close button click
        toast.querySelector('button').addEventListener('click', () => {
            toast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => toast.remove(), 300);
        });

        toastContainer.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('opacity-0', 'translate-y-4');
        });

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }


    /* --------------------------------------------------------
       FORM VALIDATION UTILITIES
       -------------------------------------------------------- */

    /**
     * Validates that a text/tel/date input is not empty.
     * @param {HTMLInputElement} input      - The input element to validate
     * @param {HTMLElement|null} errorSpan  - The sibling error message element
     * @returns {boolean}
     */
    function validateRequiredInput(input, errorSpan) {
        if (!input) return false;
        if (!input.value.trim()) {
            input.classList.add('border-error');
            if (errorSpan) errorSpan.classList.remove('hidden');
            return false;
        }
        input.classList.remove('border-error');
        if (errorSpan) errorSpan.classList.add('hidden');
        return true;
    }

    /**
     * Validates that a <select> has a value selected.
     * @param {HTMLSelectElement} select    - The select element to validate
     * @param {HTMLElement|null} errorSpan  - The sibling error message element
     * @returns {boolean}
     */
    function validateRequiredSelect(select, errorSpan) {
        if (!select) return false;
        if (!select.value) {
            select.classList.add('border-error');
            if (errorSpan) errorSpan.classList.remove('hidden');
            return false;
        }
        select.classList.remove('border-error');
        if (errorSpan) errorSpan.classList.add('hidden');
        return true;
    }

    /**
     * Validates that an email input contains a valid email address.
     * @param {HTMLInputElement} input      - The email input element
     * @param {HTMLElement|null} errorSpan  - The sibling error message element
     * @returns {boolean}
     */
    function validateEmailInput(input, errorSpan) {
        if (!input) return false;
        const emailValue = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue || !emailRegex.test(emailValue)) {
            input.classList.add('border-error');
            if (errorSpan) errorSpan.classList.remove('hidden');
            return false;
        }
        input.classList.remove('border-error');
        if (errorSpan) errorSpan.classList.add('hidden');
        return true;
    }


    /* --------------------------------------------------------
       FORM SUBMISSION — TRIP APPLICATION FORM
       Validates, serializes, and persists to localStorage.
       -------------------------------------------------------- */
    const applyForm = document.getElementById('apply-form');

    if (applyForm) {
        applyForm.addEventListener('submit', e => {
            e.preventDefault();

            // Collect field references
            const nameInput      = document.getElementById('apply-name');
            const emailInput     = document.getElementById('apply-email');
            const phoneInput     = document.getElementById('apply-phone');
            const businessSelect = document.getElementById('apply-business-type');

            // Collect sibling error message elements
            const nameErr     = nameInput      ? nameInput.nextElementSibling      : null;
            const emailErr    = emailInput     ? emailInput.nextElementSibling     : null;
            const phoneErr    = phoneInput     ? phoneInput.nextElementSibling     : null;
            const businessErr = businessSelect ? businessSelect.nextElementSibling : null;

            // Run validation on all required fields
            let isFormValid = true;
            if (!validateRequiredInput(nameInput,      nameErr))     isFormValid = false;
            if (!validateEmailInput(emailInput,        emailErr))    isFormValid = false;
            if (!validateRequiredInput(phoneInput,     phoneErr))    isFormValid = false;
            if (!validateRequiredSelect(businessSelect, businessErr)) isFormValid = false;
            if (!isFormValid) return;

            // Serialize form data
            const applicationEntry = {
                id:                 Date.now(),
                name:               nameInput.value.trim(),
                email:              emailInput.value.trim(),
                phone:              phoneInput.value.trim(),
                business_type:      businessSelect.value,
                company_name:       document.getElementById('apply-company')    ? document.getElementById('apply-company').value.trim()    : '',
                sourcing_experience:document.getElementById('apply-experience') ? document.getElementById('apply-experience').value        : '',
                goals:              document.getElementById('apply-goals')      ? document.getElementById('apply-goals').value.trim()      : '',
                hearing_from:       document.getElementById('apply-hearing')    ? document.getElementById('apply-hearing').value.trim()    : '',
                created_at:         new Date().toISOString()
            };

            // Persist to localStorage
            const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
            existingApplications.unshift(applicationEntry);
            localStorage.setItem('applications', JSON.stringify(existingApplications));

            applyForm.reset();
            closeModal(applyModal, applyCard);
            showToast('Your trip application was submitted successfully! Kim will review it shortly.');
        });
    }


    /* --------------------------------------------------------
       FORM SUBMISSION — DISCOVERY CALL FORM
       Validates, serializes, and persists to localStorage.
       -------------------------------------------------------- */
    const callForm = document.getElementById('call-form');

    if (callForm) {
        callForm.addEventListener('submit', e => {
            e.preventDefault();

            // Collect field references
            const nameInput  = document.getElementById('call-name');
            const emailInput = document.getElementById('call-email');
            const phoneInput = document.getElementById('call-phone');
            const dateInput  = document.getElementById('call-date');
            const timeSelect = document.getElementById('call-time');

            // Collect sibling error message elements
            const nameErr  = nameInput  ? nameInput.nextElementSibling  : null;
            const emailErr = emailInput ? emailInput.nextElementSibling : null;
            const phoneErr = phoneInput ? phoneInput.nextElementSibling : null;
            const dateErr  = dateInput  ? dateInput.nextElementSibling  : null;
            const timeErr  = timeSelect ? timeSelect.nextElementSibling : null;

            // Run validation on all required fields
            let isFormValid = true;
            if (!validateRequiredInput(nameInput,  nameErr))  isFormValid = false;
            if (!validateEmailInput(emailInput,    emailErr)) isFormValid = false;
            if (!validateRequiredInput(phoneInput, phoneErr)) isFormValid = false;
            if (!validateRequiredInput(dateInput,  dateErr))  isFormValid = false;
            if (!validateRequiredSelect(timeSelect, timeErr)) isFormValid = false;
            if (!isFormValid) return;

            // Serialize form data
            const callEntry = {
                id:             Date.now(),
                name:           nameInput.value.trim(),
                email:          emailInput.value.trim(),
                phone:          phoneInput.value.trim(),
                company_name:   document.getElementById('call-company')   ? document.getElementById('call-company').value.trim()   : '',
                preferred_date: dateInput.value,
                preferred_time: timeSelect.value,
                questions:      document.getElementById('call-questions') ? document.getElementById('call-questions').value.trim() : '',
                created_at:     new Date().toISOString()
            };

            // Persist to localStorage
            const existingCalls = JSON.parse(localStorage.getItem('discovery_calls') || '[]');
            existingCalls.unshift(callEntry);
            localStorage.setItem('discovery_calls', JSON.stringify(existingCalls));

            callForm.reset();
            closeModal(callModal, callCard);
            showToast('Your discovery call was scheduled successfully! Check your inbox soon.');
        });
    }


    /* --------------------------------------------------------
       INITIAL SETUP
       Run on page load to position the nav slider correctly
       and check for any already-visible reveal items.
       -------------------------------------------------------- */
    updateNavSlider(0);

}); // end DOMContentLoaded

/**
 * 3D-GROUPE SARL - PUBLIC INTERACTION & DYNAMIC CMS RENDERER
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 3. Dynamic CMS Integration
    const store = window.cmsStore;
    if (store) {
        applyPageCustomizations(store);
        
        // Listen for live updates from admin
        window.addEventListener('cms_data_updated', () => {
            applyPageCustomizations(store);
        });
    }

    // 4. Contact Form Listener (Envoi direct vers Espace Admin)
    setupContactForm(store);
});

/**
 * Applique les modifications de contenu personnalisées depuis l'Espace Admin
 */
function applyPageCustomizations(store) {
    if (!store) return;

    // A. Site Info (Téléphones & Emails dans l'en-tête et le pied de page)
    const siteInfo = store.getSiteInfo();
    if (siteInfo) {
        document.querySelectorAll('.phone-item').forEach((el, index) => {
            const phone = index === 0 ? siteInfo.phone1 : (siteInfo.phone2 || siteInfo.phone1);
            if (phone) {
                el.textContent = phone;
                if (el.tagName === 'A') el.href = `tel:${phone.replace(/[^0-9+]/g, '')}`;
            }
        });

        document.querySelectorAll('.email-item').forEach(el => {
            if (siteInfo.email) {
                el.textContent = siteInfo.email;
                if (el.tagName === 'A') el.href = `mailto:${siteInfo.email}`;
            }
        });
    }

    // B. Page Metadata & Hero Customization
    const currentPath = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
    const isEn = window.location.pathname.includes('/en/');
    const filename = isEn ? `en/${currentPath}` : currentPath;
    
    const pageData = store.getPageByFilename ? store.getPageByFilename(filename) : null;
    if (pageData) {
        if (pageData.seoTitle && document.title) {
            document.title = pageData.seoTitle;
        }

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && pageData.seoDescription) {
            metaDesc.setAttribute('content', pageData.seoDescription);
        }

        // Hero Titles
        const heroH1 = document.querySelector('.hero-section h1, .services-hero h1, .about-hero-bg h1, .projects-hero-bg h1, .team-hero-bg h1, .contact-hero-bg h1, .methodology-hero-bg h1');
        if (heroH1 && pageData.heroTitle && !heroH1.getAttribute('data-customized')) {
            heroH1.textContent = pageData.heroTitle;
            heroH1.setAttribute('data-customized', 'true');
        }

        const heroSub = document.querySelector('.hero-subtitle, .lead-text');
        if (heroSub && pageData.heroSubtitle && !heroSub.getAttribute('data-customized')) {
            heroSub.textContent = pageData.heroSubtitle;
            heroSub.setAttribute('data-customized', 'true');
        }
    }
}

/**
 * Gestion du formulaire de contact avec routage direct vers l'espace Admin
 */
function setupContactForm(store) {
    const contactForm = document.querySelector('#contact-form') || document.querySelector('.js-contact-form') || document.querySelector('form.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Anti-spam honeypot
        const hp = contactForm.querySelector('input[name="website"]');
        if (hp && hp.value) return;

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const statusEl = contactForm.querySelector('.form-status') || createStatusElement(contactForm);

        const nameInput = contactForm.querySelector('#name') || contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('#email') || contactForm.querySelector('input[name="email"]');
        const phoneInput = contactForm.querySelector('#phone') || contactForm.querySelector('input[name="phone"]');
        const typeSelect = contactForm.querySelector('#type') || contactForm.querySelector('select[name="type"]');
        const messageInput = contactForm.querySelector('#message') || contactForm.querySelector('textarea[name="message"]');

        const senderName = nameInput ? nameInput.value.trim() : 'Visiteur Web';
        const senderEmail = emailInput ? emailInput.value.trim() : '';
        const senderPhone = phoneInput ? phoneInput.value.trim() : '';
        const projectType = typeSelect ? typeSelect.value : 'Projet';
        const messageText = messageInput ? messageInput.value.trim() : '';

        const isEn = document.documentElement.lang === 'en' || window.location.pathname.includes('/en/');

        if (!senderName || !senderEmail || !messageText) {
            showStatus(statusEl, isEn ? 'Please fill in all required fields.' : 'Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Bouton en cours de traitement
        const originalBtnText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = isEn ? 'Sending message...' : 'Envoi en cours...';
        }

        const msgData = {
            senderName,
            senderEmail,
            senderPhone,
            subject: `Demande : ${projectType}`,
            message: messageText,
            lang: isEn ? 'EN' : 'FR'
        };

        // 1. Sauvegarde dans l'Espace Admin (Store LocalStorage)
        try {
            if (window.cmsStore) {
                window.cmsStore.addMessage(msgData);
            } else {
                // Fallback stockage direct dans la clé CMS
                const raw = localStorage.getItem('3d_group_cms_data_v1');
                const parsed = raw ? JSON.parse(raw) : { messages: [] };
                if (!parsed.messages) parsed.messages = [];
                parsed.messages.unshift({
                    id: 'msg-' + Date.now(),
                    date: new Date().toLocaleString('fr-FR'),
                    status: 'Non lu',
                    ...msgData
                });
                localStorage.setItem('3d_group_cms_data_v1', JSON.stringify(parsed));
            }
        } catch (err) {
            console.warn("Stockage local message :", err);
        }

        // 2. Notification parallèle email (Web3Forms)
        try {
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: "e34ba85a-ca2c-4903-8d0b-b27b998cfbca", // Endpoint sécurisé
                    subject: `[3D-GROUPE] Nouveau message de ${senderName} (${projectType})`,
                    from_name: "3D-GROUPE SARL Site Web",
                    name: senderName,
                    email: senderEmail,
                    phone: senderPhone,
                    message: messageText,
                    project_type: projectType
                })
            }).catch(() => {});
        } catch (_) {}

        // 3. Message de confirmation
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
            contactForm.reset();

            const successMsg = isEn 
                ? 'Thank you! Your message has been sent directly to 3D-GROUPE SARL administration. We will get back to you shortly.'
                : 'Merci ! Votre message a bien été transmis à la direction de 3D-GROUPE SARL. Nous vous recontacterons très rapidement.';
            showStatus(statusEl, successMsg, 'success');
        }, 400);
    });
}

function createStatusElement(form) {
    const p = document.createElement('p');
    p.className = 'form-status';
    form.appendChild(p);
    return p;
}

function showStatus(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = `form-status ${type}`;
    el.style.display = 'block';
    if (type === 'success') {
        setTimeout(() => {
            el.style.display = 'none';
        }, 9000);
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

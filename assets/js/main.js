/**
 * 3D-GROUPE SARL - PUBLIC INTERACTION & DYNAMIC CMS RENDERER
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
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
        });
    }

    // 3. Dynamic CMS Integration
    const store = window.cmsStore;
    if (store) {
        renderDynamicContent(store);
        
        // Listen for live updates from admin
        window.addEventListener('cms_data_updated', () => {
            renderDynamicContent(store);
        });
    }

    // 4. Contact Form Listener
    setupContactForm(store);
});

function renderDynamicContent(store) {
    // A. Dynamic Site Info (Phones & Emails in Header & Footer)
    const siteInfo = store.getSiteInfo();
    if (siteInfo) {
        document.querySelectorAll('.phone-item').forEach((el, index) => {
            if (index === 0 && siteInfo.phone1) el.textContent = siteInfo.phone1;
            if (index === 1 && siteInfo.phone2) el.textContent = siteInfo.phone2;
        });

        document.querySelectorAll('.email-item').forEach(el => {
            if (siteInfo.email) el.textContent = siteInfo.email;
        });
    }

    // B. Dynamic Projects Renderer
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        const projects = store.getProjects();
        if (projects && projects.length > 0) {
            projectsGrid.innerHTML = projects.map(p => `
                <article class="project-card animate-fade-in">
                    <div class="project-image">
                        <img src="${p.image || 'assets/images/logo.png'}" alt="${escapeHtml(p.title)}" onerror="this.src='assets/images/logo.png'">
                    </div>
                    <div class="project-content">
                        <span class="project-tag">${escapeHtml(p.category || 'Foresterie')}</span>
                        <h3>${escapeHtml(p.title)}</h3>
                        ${p.surface ? `<p class="project-surface" style="font-weight:600; color:var(--color-primary, #16a34a); margin:0.2rem 0;">📐 Superficie: ${escapeHtml(p.surface)}</p>` : ''}
                        ${p.location ? `<p class="project-location" style="font-size:0.85rem; color:#64748b; margin-bottom:0.5rem;">📍 ${escapeHtml(p.location)}</p>` : ''}
                        <p style="font-size:0.9rem; line-height:1.4; color:#334155;">${escapeHtml(p.description || '')}</p>
                    </div>
                </article>
            `).join('');
        }
    }

    // C. Dynamic Services Renderer (if container present)
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        const services = store.getServices();
        if (services && services.length > 0) {
            servicesGrid.innerHTML = services.map(s => `
                <div class="service-card animate-fade-in" style="background:#fff; border-radius:12px; padding:1.5rem; box-shadow:0 4px 15px rgba(0,0,0,0.05); margin-bottom:1rem;">
                    <div style="font-size:2rem; margin-bottom:0.5rem;">${s.icon || '🌱'}</div>
                    <h3 style="color:#0f172a; margin-bottom:0.5rem;">${escapeHtml(s.title)}</h3>
                    <p style="color:#475569; font-size:0.95rem; margin-bottom:0.75rem;">${escapeHtml(s.summary || '')}</p>
                    <p style="color:#64748b; font-size:0.85rem; line-height:1.4;">${escapeHtml(s.description || '')}</p>
                </div>
            `).join('');
        }
    }
}

function setupContactForm(store) {
    const contactForm = document.querySelector('form.contact-form') || document.getElementById('contact-form');
    if (contactForm && store) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[name="name"]') || contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('input[name="email"]') || contactForm.querySelector('#email');
            const phoneInput = contactForm.querySelector('input[name="phone"]') || contactForm.querySelector('#phone');
            const subjectInput = contactForm.querySelector('input[name="subject"]') || contactForm.querySelector('#subject');
            const messageInput = contactForm.querySelector('textarea[name="message"]') || contactForm.querySelector('#message');

            const msgData = {
                senderName: nameInput ? nameInput.value.trim() : 'Visiteur Web',
                senderEmail: emailInput ? emailInput.value.trim() : 'non-specifie@mail.com',
                senderPhone: phoneInput ? phoneInput.value.trim() : '',
                subject: subjectInput ? subjectInput.value.trim() : 'Demande de renseignement',
                message: messageInput ? messageInput.value.trim() : ''
            };

            store.addMessage(msgData);

            contactForm.reset();
            alert("Merci ! Votre message a bien été transmis à l'équipe de 3D-GROUPE SARL. Nous vous recontacterons très rapidement.");
        });
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

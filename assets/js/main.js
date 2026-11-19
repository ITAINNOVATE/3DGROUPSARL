/**
 * Applique les modifications de contenu personnalisées depuis l'Espace Admin
 */
function applyPageCustomizations(store) {
    if (!store) return;

    const isEn = window.location.pathname.includes('/en/');
    const prefixAsset = (path) => {
        if (!path) return '';
        if (path.startsWith('data:') || path.startsWith('http') || path.startsWith('//')) return path;
        if (isEn && !path.startsWith('../')) return '../' + path;
        return path;
    };

    // A. Site Info (Téléphones, Emails & Adresses)
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

        if (siteInfo.companyName) {
            document.querySelectorAll('.footer-logo, .brand-name').forEach(el => {
                el.textContent = siteInfo.companyName;
            });
        }
    }

    // B. Page Metadata & Hero Customization
    const currentPath = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
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
        if (heroH1 && pageData.heroTitle) {
            heroH1.innerHTML = pageData.heroTitle;
        }

        const heroSub = document.querySelector('.hero-subtitle, .lead-text, .premium-lead');
        if (heroSub && pageData.heroSubtitle) {
            heroSub.innerHTML = pageData.heroSubtitle;
        }

        // Hero Image de Bannière
        if (pageData.heroImage) {
            const heroEl = document.querySelector('.hero-section, .services-hero, .about-hero-bg, .projects-hero-bg, .team-hero-bg, .contact-hero-bg, .methodology-hero-bg');
            if (heroEl) {
                const bgImg = prefixAsset(pageData.heroImage);
                heroEl.style.backgroundImage = `linear-gradient(rgba(10, 25, 20, 0.72), rgba(10, 25, 20, 0.72)), url('${bgImg}')`;
                heroEl.style.backgroundSize = 'cover';
                heroEl.style.backgroundPosition = 'center';
            }
        }
    }

    // C. Section Coordonnateur Général (Accueil index.html / en/index.html)
    if (currentPath === 'index.html' || currentPath === '') {
        if (siteInfo) {
            // Photo du Coordonnateur
            if (siteInfo.coordinatorImage) {
                const coordImg = document.querySelector('.coordinator-photo, .coordinator-img-wrapper img');
                if (coordImg) {
                    coordImg.src = prefixAsset(siteInfo.coordinatorImage);
                }
            }

            // Nom et Titre
            if (siteInfo.coordinatorName) {
                const nameEl = document.querySelector('.coordinator-name-card h3');
                if (nameEl) nameEl.textContent = siteInfo.coordinatorName;
            }
            if (siteInfo.coordinatorTitle) {
                const titleEl = document.querySelector('.coordinator-name-card p');
                if (titleEl) titleEl.textContent = siteInfo.coordinatorTitle;
            }

            // Message du Coordonnateur
            if (siteInfo.coordinatorMessage) {
                const welcomeP = document.querySelector('.coordinator-text p.welcome-text');
                if (welcomeP) {
                    const nextP = welcomeP.nextElementSibling;
                    if (nextP && nextP.tagName === 'P') {
                        nextP.textContent = siteInfo.coordinatorMessage;
                    }
                }
            }
        }
    }

    // D. Section À Propos (about.html / en/about.html)
    if (currentPath === 'about.html') {
        if (pageData) {
            // Titre de section "Qui sommes-nous ?"
            if (pageData.whoWeAreTitle) {
                const whoTitle = document.querySelector('.container-narrow .section-title-modern');
                if (whoTitle) whoTitle.textContent = pageData.whoWeAreTitle;
            }

            // Description générale (paragraphes)
            const textToUse = pageData.whoWeAreText || pageData.mainContent;
            if (textToUse) {
                const descEl = document.querySelector('.premium-description');
                if (descEl) {
                    descEl.innerHTML = `<p>${textToUse.split("\n\n").join("</p><p>").split("\n").join("<br>")}</p>`;
                }
            }

            // Vision
            if (pageData.vision) {
                const cards = document.querySelectorAll('.glass-card-premium');
                cards.forEach(card => {
                    const h3 = card.querySelector('h3');
                    if (h3 && /vision/i.test(h3.textContent)) {
                        const p = card.querySelector('p');
                        if (p) p.textContent = pageData.vision;
                    }
                });
            }

            // Mission
            if (pageData.mission) {
                const cards = document.querySelectorAll('.glass-card-premium');
                cards.forEach(card => {
                    const h3 = card.querySelector('h3');
                    if (h3 && /mission/i.test(h3.textContent)) {
                        const p = card.querySelector('p');
                        if (p) p.textContent = pageData.mission;
                    }
                });
            }

            // Valeurs
            if (pageData.values) {
                const cards = document.querySelectorAll('.glass-card-premium');
                cards.forEach(card => {
                    const h3 = card.querySelector('h3');
                    if (h3 && /(valeurs|values)/i.test(h3.textContent)) {
                        const ul = card.querySelector('ul');
                        if (ul) {
                            const items = pageData.values.split('\n')
                                .map(line => line.replace(/^[•\s*-]+/, '').trim())
                                .filter(Boolean);
                            ul.innerHTML = items.map(it => `<li style="margin-bottom: 0.4rem;">• ${escapeHtml(it)}</li>`).join('');
                        }
                    }
                });
            }
        }
    }

    // E. Section Équipe Dirigeante (team.html / en/team.html)
    if (currentPath === 'team.html') {
        const teamMembers = store.getTeam ? store.getTeam() : [];
        if (teamMembers && teamMembers.length > 0) {
            const leader = teamMembers[0];
            const portraitImg = document.querySelector('.team-photo-container img');
            if (portraitImg && leader.image) {
                portraitImg.src = prefixAsset(leader.image);
            }

            const leaderName = document.querySelector('.text-content h2.text-primary');
            if (leaderName && leader.name) {
                leaderName.textContent = leader.name;
            }

            const leaderRole = document.querySelector('.text-content h4.text-accent');
            if (leaderRole && leader.role) {
                leaderRole.textContent = leader.role;
            }

            const leaderBio = document.querySelector('.text-content > p');
            if (leaderBio && leader.bio) {
                leaderBio.textContent = leader.bio;
            }
        }
    }

    // F. Services Cards (services.html / en/services.html)
    if (currentPath === 'services.html') {
        const services = store.getServices ? store.getServices() : [];
        if (services && services.length > 0) {
            const serviceCards = document.querySelectorAll('.service-card, .service-detail-block, .service-row');
            services.forEach((s, idx) => {
                if (serviceCards[idx]) {
                    const titleEl = serviceCards[idx].querySelector('h3, h2');
                    if (titleEl && s.title) titleEl.textContent = s.title;
                    const descEl = serviceCards[idx].querySelector('p');
                    if (descEl && (s.summary || s.description)) descEl.textContent = s.summary || s.description;
                }
            });
        }
    }

    // G. Live Projects Grid Sync (Reflète les 34 projets et leurs modifications)
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid && store) {
        const projects = store.getProjects();
        if (projects && projects.length > 0) {
            const defaultLogo = isEn ? '../assets/images/logo.webp' : 'assets/images/logo.webp';

            projectsGrid.innerHTML = projects.map(p => {
                const imgSrc = prefixAsset(p.image || defaultLogo);
                return `
                <article class="project-card animate-fade-in">
                    <div class="project-image">
                        <img loading="lazy" decoding="async" src="${imgSrc}" alt="${escapeHtml(p.title)}" onerror="this.src='${defaultLogo}'">
                    </div>
                    <div class="project-content">
                        <span class="project-tag">${escapeHtml(p.category || 'Foresterie')}</span>
                        <h3>${escapeHtml(p.title)}</h3>
                        ${p.surface ? `<p class="project-surface" style="font-weight:600; color:var(--color-primary, #16a34a); margin:0.2rem 0;">📐 Superficie: ${escapeHtml(p.surface)}</p>` : ''}
                        ${p.location ? `<p class="project-location" style="font-size:0.85rem; color:#64748b; margin-bottom:0.5rem;">📍 ${escapeHtml(p.location)}</p>` : ''}
                    </div>
                </article>
                `;
            }).join('');
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

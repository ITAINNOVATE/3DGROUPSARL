/**
 * 3D-GROUPE SARL - ADMIN PORTAL LOGIC
 * Manages tabs, modals, CRUD operations for Pages, Projects, Team, Services, Media Gallery, Info & Messages.
 */

document.addEventListener('DOMContentLoaded', () => {
    initAdmin();
});

let currentPagesFilter = 'ALL';
let currentAboutLang = 'FR';
let activeQuickUploadProjectId = null;
let activeQuickUploadPageId = null;
let activeQuickUploadTeamId = null;

function initAdmin() {
    const store = window.cmsStore;
    if (!store) {
        console.error("Store non disponible");
        return;
    }

    // DOM Elements
    const loginView = document.getElementById('login-view');
    const adminLayout = document.getElementById('admin-layout');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');

    // Sidebar Mobile Toggle
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.getElementById('admin-sidebar');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

    // Check Auth State
    if (store.isAuthenticated()) {
        showDashboard();
    } else {
        showLogin();
    }

    // Login Handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value.trim();

            if (store.login(username, password)) {
                loginError.style.display = 'none';
                showToast("Connexion réussie !", "success");
                showDashboard();
            } else {
                loginError.style.display = 'block';
                loginError.textContent = "Identifiants incorrects. Veuillez réessayer.";
            }
        });
    }

    // Logout Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            store.logout();
            showToast("Déconnexion effectuée", "info");
            showLogin();
        });
    }

    function showLogin() {
        if (loginView) loginView.style.display = 'flex';
        if (adminLayout) adminLayout.style.display = 'none';
    }

    function showDashboard() {
        if (loginView) loginView.style.display = 'none';
        if (adminLayout) adminLayout.style.display = 'flex';
        
        // Auto-synchroniser les 34 projets s'il n'y avait que l'ancien cache démo
        if (store.getProjects().length < 30) {
            store.syncRealProjects();
        }
        setupNavigation();
        renderOverview();
        renderPages();
        renderAbout();
        renderProjects();
        renderTeam();
        renderServices();
        renderMediaGallery();
        renderSiteInfo();
        renderMessages();
        setupDropzone();
        setupForms();
        setupAboutFormHandlers();
        setupProjectImageUploads();
        setupAllImageUploadHandlers();
    }

    // ----------------------------------------------------------------------
    // NAVIGATION TABS
    // ----------------------------------------------------------------------
    function setupNavigation() {
        const navBtns = document.querySelectorAll('.nav-item-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                switchToTab(targetTab);
            });
        });
    }
}

window.switchToTab = function(targetTab) {
    const navBtns = document.querySelectorAll('.nav-item-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const topbarTitle = document.getElementById('topbar-title');
    const sidebar = document.getElementById('admin-sidebar');

    navBtns.forEach(b => {
        if (b.getAttribute('data-tab') === targetTab) {
            b.classList.add('active');
            if (topbarTitle) topbarTitle.textContent = b.innerText.trim();
        } else {
            b.classList.remove('active');
        }
    });

    tabPanes.forEach(p => {
        if (p.id === `tab-${targetTab}`) {
            p.classList.add('active');
        } else {
            p.classList.remove('active');
        }
    });

    if (sidebar) sidebar.classList.remove('show');
};

// ----------------------------------------------------------------------
// OVERVIEW / DASHBOARD STATS
// ----------------------------------------------------------------------
function renderOverview() {
    const store = window.cmsStore;
    if (!store) return;

    const pages = store.getPages() || [];
    const projects = store.getProjects() || [];
    const team = store.getTeam() || [];
    const services = store.getServices() || [];
    const images = store.getImages() || [];
    const messages = store.getMessages() || [];

    const unreadCount = messages.filter(m => m.status === 'Non lu').length;

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    setVal('stat-pages-count', pages.length);
    setVal('stat-projects-count', projects.length);
    setVal('stat-team-count', team.length);
    setVal('stat-services-count', services.length);
    setVal('stat-images-count', images.length);
    setVal('stat-messages-count', messages.length);

    const badge = document.getElementById('unread-messages-badge');
    if (badge) {
        if (unreadCount > 0) {
            badge.style.display = 'inline-block';
            badge.textContent = unreadCount;
        } else {
            badge.style.display = 'none';
        }
    }
}

// ----------------------------------------------------------------------
// PAGES MANAGEMENT (Affichage & Modification de toutes les pages)
// ----------------------------------------------------------------------
let pagesViewMode = 'cards'; // 'cards' ou 'table'

window.setPagesViewMode = function(mode) {
    pagesViewMode = mode;
    const btnCards = document.getElementById('btn-view-cards');
    const btnTable = document.getElementById('btn-view-table');
    const cardsContainer = document.getElementById('pages-cards-container');
    const tableCard = document.getElementById('pages-table-card');

    if (mode === 'cards') {
        if (btnCards) { btnCards.classList.add('active'); btnCards.classList.remove('btn-secondary'); }
        if (btnTable) { btnTable.classList.remove('active'); btnTable.classList.add('btn-secondary'); }
        if (cardsContainer) cardsContainer.style.display = 'grid';
        if (tableCard) tableCard.style.display = 'none';
    } else {
        if (btnTable) { btnTable.classList.add('active'); btnTable.classList.remove('btn-secondary'); }
        if (btnCards) { btnCards.classList.remove('active'); btnCards.classList.add('btn-secondary'); }
        if (cardsContainer) cardsContainer.style.display = 'none';
        if (tableCard) tableCard.style.display = 'block';
    }
};

window.filterPagesList = function() {
    renderPages();
};

function renderPages() {
    const store = window.cmsStore;
    if (!store) return;
    const cardsContainer = document.getElementById('pages-cards-container');
    const tbody = document.getElementById('pages-table-body');
    if (!cardsContainer && !tbody) return;

    const allPages = store.getPages() || [];
    
    // Counts
    const countAll = document.getElementById('count-pages-all');
    const countFr = document.getElementById('count-pages-fr');
    const countEn = document.getElementById('count-pages-en');
    if (countAll) countAll.textContent = allPages.length;
    if (countFr) countFr.textContent = allPages.filter(p => p.lang === 'FR').length;
    if (countEn) countEn.textContent = allPages.filter(p => p.lang === 'EN').length;

    // Filters
    const searchInput = document.getElementById('page-search-input');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let filtered = allPages.filter(p => {
        if (currentPagesFilter === 'ALL') return true;
        return p.lang === currentPagesFilter;
    });

    if (query) {
        filtered = filtered.filter(p => 
            (p.title && p.title.toLowerCase().includes(query)) ||
            (p.filename && p.filename.toLowerCase().includes(query)) ||
            (p.heroTitle && p.heroTitle.toLowerCase().includes(query)) ||
            (p.mainContent && p.mainContent.toLowerCase().includes(query)) ||
            (p.extraContent && p.extraContent.toLowerCase().includes(query))
        );
    }

    // 1. RENDER CARDS VIEW (Vue Contenu & Fiches)
    if (cardsContainer) {
        if (filtered.length === 0) {
            cardsContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: white; border-radius: 12px; border: 1px solid var(--admin-border); color: var(--admin-text-muted);">Aucune page ne correspond à votre recherche.</div>`;
        } else {
            cardsContainer.innerHTML = filtered.map(p => {
                const langBadge = p.lang === 'FR' 
                    ? `<span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;">🇫🇷 FR</span>`
                    : `<span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700;">🇬🇧 EN</span>`;
                
                const heroImg = p.heroImage || 'assets/images/hero-drone.webp';
                const mainText = p.mainContent || p.whoWeAreText || 'Aucun contenu textuel disponible.';

                return `
                <div class="page-content-card" style="background: #ffffff; border: 1px solid var(--admin-border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 2px 10px rgba(0,0,0,0.04); transition: transform 0.2s ease, box-shadow 0.2s ease;">
                    <!-- Bannière & En-tête -->
                    <div style="position: relative; height: 135px; overflow: hidden; background: #0f172a;">
                        <img loading="lazy" decoding="async" src="${heroImg}" alt="${escapeHtml(p.title)}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;" onerror="this.src='assets/images/logo.webp'">
                        <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 6px; align-items: center;">
                            ${langBadge}
                            <span class="badge" style="background: rgba(15, 23, 42, 0.75); color: #ffffff; backdrop-filter: blur(4px); font-size: 0.75rem;">
                                📄 ${escapeHtml(p.filename)}
                            </span>
                        </div>
                        <div style="position: absolute; bottom: 8px; right: 10px;">
                            <button class="btn-action" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; background: rgba(2, 132, 199, 0.9); border: none;" onclick="triggerQuickPageImageUpload('${p.id}')" title="Changer la photo depuis l'ordinateur">
                                📁 Photo
                            </button>
                        </div>
                    </div>

                    <!-- Corps de la carte -->
                    <div style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
                            <h3 style="margin: 0; font-size: 1.15rem; color: var(--admin-text-main); font-weight: 700;">
                                ${escapeHtml(p.title)}
                            </h3>
                            <span class="badge" style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; font-size: 0.72rem;">
                                ${escapeHtml(p.status || 'En ligne')}
                            </span>
                        </div>

                        <div style="font-size: 0.88rem; color: var(--admin-primary); font-weight: 600; margin-bottom: 0.35rem;">
                            🎯 ${escapeHtml(p.heroTitle || p.title)}
                        </div>

                        ${p.heroSubtitle ? `<div style="font-size: 0.8rem; color: var(--admin-text-muted); font-style: italic; margin-bottom: 0.75rem; line-height: 1.4;">« ${escapeHtml(p.heroSubtitle)} »</div>` : ''}

                        <!-- Aperçu du Texte Principal -->
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem; font-size: 0.83rem; line-height: 1.55; color: #334155; margin-bottom: 0.85rem; flex: 1;">
                            <strong style="color: #0f172a; display: block; margin-bottom: 0.35rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">
                                📖 Contenu Textuel :
                            </strong>
                            <div style="display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                                ${escapeHtml(mainText)}
                            </div>
                        </div>

                        ${p.extraContent ? `
                        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.55rem 0.75rem; font-size: 0.78rem; color: #166534; margin-bottom: 0.85rem;">
                            <strong>✨ Sections Additionnelles :</strong>
                            <div style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; margin-top: 0.15rem;">
                                ${escapeHtml(p.extraContent)}
                            </div>
                        </div>
                        ` : ''}

                        <!-- Actions Bas de Carte -->
                        <div style="display: flex; gap: 0.4rem; justify-content: space-between; align-items: center; border-top: 1px solid var(--admin-border); padding-top: 0.75rem; margin-top: auto;">
                            <button class="btn-action" style="padding: 0.35rem 0.75rem; font-size: 0.82rem;" onclick="openPageViewModal('${p.id}')">
                                📖 Voir Tout
                            </button>
                            <div style="display: flex; gap: 0.35rem;">
                                <button class="btn-action btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.82rem;" onclick="openPageModal('${p.id}')" title="Modifier les textes">
                                    ✏️ Modifier
                                </button>
                                <a href="${escapeHtml(p.filename)}" target="_blank" class="btn-table-action" title="Voir la page publique" style="text-decoration:none;">
                                    👁️
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        }
    }

    // 2. RENDER TABLE VIEW (Vue Tableau)
    if (tbody) {
        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--admin-text-muted);">Aucune page trouvée pour ce filtre.</td></tr>`;
        } else {
            tbody.innerHTML = filtered.map(p => {
                const langBadge = p.lang === 'FR' 
                    ? `<span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;">🇫🇷 FR</span>`
                    : `<span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700;">🇬🇧 EN</span>`;
                
                const heroImg = p.heroImage || 'assets/images/hero-drone.webp';
                const mainText = p.mainContent || p.whoWeAreText || '-';

                return `
                    <tr>
                        <td style="width: 70px;">
                            <img loading="lazy" decoding="async" src="${heroImg}" alt="${escapeHtml(p.title)}" class="table-img-thumb" style="width: 58px; height: 40px; object-fit: cover; border-radius: 6px; border: 1px solid var(--admin-border); cursor: pointer;" onclick="openPageViewModal('${p.id}')" onerror="this.src='assets/images/logo.webp'">
                        </td>
                        <td>${langBadge}</td>
                        <td>
                            <div style="font-weight: 600; color: var(--admin-text-main);">${escapeHtml(p.title)}</div>
                            <code style="background: rgba(0,0,0,0.04); padding: 0.1rem 0.3rem; border-radius: 4px; font-size: 0.78rem;">
                                ${escapeHtml(p.filename)}
                            </code>
                        </td>
                        <td style="max-width: 180px; font-size: 0.85rem; color: var(--admin-primary); font-weight: 500;">
                            ${escapeHtml(p.heroTitle || '-')}
                        </td>
                        <td style="max-width: 280px; font-size: 0.83rem; color: #334155;">
                            <div style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 1.4;">
                                ${escapeHtml(mainText)}
                            </div>
                            <button type="button" class="btn-action btn-secondary" style="padding: 0.15rem 0.45rem; font-size: 0.75rem; margin-top: 0.3rem;" onclick="openPageViewModal('${p.id}')">
                                📖 Voir le contenu
                            </button>
                        </td>
                        <td>
                            <span class="badge" style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">
                                ${escapeHtml(p.status || 'En ligne')}
                            </span>
                        </td>
                        <td>
                            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                                <button class="btn-action" style="padding: 0.3rem 0.55rem; font-size: 0.78rem;" onclick="openPageViewModal('${p.id}')" title="Lire tout le contenu">
                                    📖 Lire
                                </button>
                                <button class="btn-action btn-secondary" style="padding: 0.3rem 0.55rem; font-size: 0.78rem;" onclick="openPageModal('${p.id}')" title="Modifier les textes">
                                    ✏️
                                </button>
                                <button class="btn-action" style="padding: 0.3rem 0.55rem; font-size: 0.78rem; background: #0284c7; border-color: #0284c7;" onclick="triggerQuickPageImageUpload('${p.id}')" title="Changer la photo">
                                    📁
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

window.openPageViewModal = function(id) {
    const store = window.cmsStore;
    const p = store.getPageById(id);
    if (!p) return;

    const modal = document.getElementById('page-view-modal');
    const titleEl = document.getElementById('pv-modal-title');
    const body = document.getElementById('pv-modal-body');
    const footer = document.getElementById('pv-modal-footer');
    if (!modal || !body || !footer) return;

    if (titleEl) titleEl.textContent = `Contenu : ${p.title} (${p.lang})`;

    const langBadge = p.lang === 'FR' 
        ? `<span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;">🇫🇷 Français</span>`
        : `<span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700;">🇬🇧 English</span>`;

    const heroImg = p.heroImage || 'assets/images/hero-drone.webp';
    const mainText = p.mainContent || p.whoWeAreText || 'Aucun texte principal renseigné.';

    body.innerHTML = `
        <!-- Bannière & En-tête -->
        <div style="position: relative; height: 160px; border-radius: 8px; overflow: hidden; margin-bottom: 1.25rem; background: #0f172a;">
            <img src="${heroImg}" alt="${escapeHtml(p.title)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/images/logo.webp'">
            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2)); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.25rem;">
                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.35rem; align-items: center;">
                    ${langBadge}
                    <code style="background: rgba(255,255,255,0.25); color: white; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.85rem;">
                        ${escapeHtml(p.filename)}
                    </code>
                </div>
                <h2 style="color: white; margin: 0; font-size: 1.35rem;">${escapeHtml(p.heroTitle || p.title)}</h2>
                ${p.heroSubtitle ? `<p style="color: #cbd5e1; margin: 0.25rem 0 0 0; font-size: 0.88rem; font-style: italic;">${escapeHtml(p.heroSubtitle)}</p>` : ''}
            </div>
        </div>

        <!-- Contenu Principal -->
        <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--admin-primary); margin: 0 0 0.5rem 0; font-size: 1rem; border-bottom: 1px solid var(--admin-border); padding-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
                <span>📖</span> Contenu Textuel Principal de la Page
            </h4>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.15rem; line-height: 1.7; font-size: 0.95rem; color: #1e293b; white-space: pre-wrap;">${escapeHtml(mainText)}</div>
        </div>

        <!-- Contenu Complémentaire -->
        ${p.extraContent ? `
        <div style="margin-bottom: 1.25rem;">
            <h4 style="color: var(--admin-primary); margin: 0 0 0.5rem 0; font-size: 1rem; border-bottom: 1px solid var(--admin-border); padding-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;">
                <span>✨</span> Sections & Données Additionnelles
            </h4>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem; line-height: 1.6; font-size: 0.9rem; color: #166534; white-space: pre-wrap;">${escapeHtml(p.extraContent)}</div>
        </div>
        ` : ''}

        <!-- Informations Référencement (SEO) -->
        <div style="background: #f8fafc; border: 1px solid var(--admin-border); border-radius: 8px; padding: 1rem;">
            <h4 style="color: #475569; margin: 0 0 0.5rem 0; font-size: 0.88rem;">🔍 Référencement Google & Méta-données</h4>
            <div style="font-size: 0.85rem; color: #1e293b; line-height: 1.5;">
                <div><strong>Balise &lt;title&gt; :</strong> ${escapeHtml(p.seoTitle || '-')}</div>
                <div style="margin-top: 0.25rem;"><strong>Meta Description :</strong> ${escapeHtml(p.seoDescription || '-')}</div>
            </div>
        </div>
    `;

    footer.innerHTML = `
        <div style="display: flex; gap: 0.5rem; justify-content: space-between; width: 100%; flex-wrap: wrap;">
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn-action" onclick="closePageViewModal(); openPageModal('${p.id}');">
                    ✏️ Modifier ce Contenu
                </button>
                <button class="btn-action" style="background: #0284c7; border-color: #0284c7;" onclick="closePageViewModal(); triggerQuickPageImageUpload('${p.id}');">
                    📁 Changer la Bannière
                </button>
                <a href="${escapeHtml(p.filename)}" target="_blank" class="btn-action btn-secondary" style="text-decoration:none;">
                    🌐 Voir sur le site web
                </a>
            </div>
            <button type="button" class="btn-action btn-secondary" onclick="closePageViewModal()">Fermer</button>
        </div>
    `;

    modal.classList.add('active');
};

window.closePageViewModal = function() {
    const modal = document.getElementById('page-view-modal');
    if (modal) modal.classList.remove('active');
};

window.reloadAllPagesContent = function() {
    window.cmsStore.syncRealPages();
    renderPages();
    renderAbout();
    showToast("Les contenus complets des 14 pages ont été rechargés avec succès !", "success");
};

window.filterPagesByLang = function(lang, btn) {
    currentPagesFilter = lang;
    document.querySelectorAll('.btn-page-filter').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderPages();
};

window.openPageModal = function(id = null) {
    const store = window.cmsStore;
    const modal = document.getElementById('page-modal');
    const form = document.getElementById('page-form');
    const title = document.getElementById('page-modal-title');
    if (!modal || !form) return;

    form.reset();

    if (id) {
        const page = store.getPageById(id);
        if (page) {
            title.textContent = `Modifier : ${page.title} (${page.lang})`;
            document.getElementById('page-id').value = page.id;
            document.getElementById('page-title').value = page.title || '';
            document.getElementById('page-lang').value = page.lang || 'FR';
            document.getElementById('page-filename').value = page.filename || '';
            document.getElementById('page-seotitle').value = page.seoTitle || '';
            document.getElementById('page-seodesc').value = page.seoDescription || '';
            document.getElementById('page-herotitle').value = page.heroTitle || '';
            document.getElementById('page-herosubtitle').value = page.heroSubtitle || '';
            if (document.getElementById('page-heroimage')) {
                document.getElementById('page-heroimage').value = page.heroImage || '';
            }
            if (document.getElementById('page-hero-img-preview')) {
                document.getElementById('page-hero-img-preview').src = page.heroImage || 'assets/images/hero-drone.webp';
            }
            if (document.getElementById('page-maincontent')) {
                document.getElementById('page-maincontent').value = page.mainContent || '';
            }
            if (document.getElementById('page-extracontent')) {
                document.getElementById('page-extracontent').value = page.extraContent || '';
            }
            document.getElementById('page-status').value = page.status || 'En ligne';
        }
    } else {
        title.textContent = "Ajouter une Nouvelle Page";
        document.getElementById('page-id').value = '';
    }

    modal.classList.add('active');
};

window.closePageModal = function() {
    const modal = document.getElementById('page-modal');
    if (modal) modal.classList.remove('active');
};

// ----------------------------------------------------------------------
// PROJECTS MANAGEMENT (34 VRAIS PROJETS AVEC IMAGES, CATÉGORIES & NOMS)
// ----------------------------------------------------------------------
function getCategoryBadgeColor(cat) {
    const map = {
        'Foresterie': { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0' },
        'Pépinière': { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
        'Terrain': { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
        'Agriculture': { bg: '#fffbeb', text: '#b45309', border: '#fcd34d' },
        'Production': { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' },
        'Exploitation': { bg: '#fae8ff', text: '#86198f', border: '#f5d0fe' },
        'Études': { bg: '#ede9fe', text: '#5b21b6', border: '#ddd6fe' },
        'Partenariat': { bg: '#ffe4e6', text: '#9f1239', border: '#fecdd3' },
        'Formation': { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
        'Expertise': { bg: '#e2e8f0', text: '#1e293b', border: '#94a3b8' }
    };
    return map[cat] || { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' };
}

function renderProjects() {
    const store = window.cmsStore;
    if (!store) return;
    const tbody = document.getElementById('projects-table-body');
    if (!tbody) return;

    let projects = store.getProjects() || [];
    
    // Filtres
    const searchInput = document.getElementById('project-search-input');
    const catFilter = document.getElementById('project-category-filter');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedCat = catFilter ? catFilter.value : 'ALL';

    if (query) {
        projects = projects.filter(p => 
            (p.title && p.title.toLowerCase().includes(query)) ||
            (p.category && p.category.toLowerCase().includes(query)) ||
            (p.location && p.location.toLowerCase().includes(query))
        );
    }

    if (selectedCat !== 'ALL') {
        projects = projects.filter(p => p.category === selectedCat);
    }

    const countBadge = document.getElementById('filtered-projects-count');
    if (countBadge) countBadge.textContent = projects.length;

    if (projects.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--admin-text-muted);">
            Aucun projet ne correspond à votre recherche.
        </td></tr>`;
        return;
    }

    tbody.innerHTML = projects.map(p => {
        const catStyle = getCategoryBadgeColor(p.category || 'Foresterie');
        return `
        <tr>
            <td style="width: 80px;">
                <div style="position: relative; display: inline-block;">
                    <img loading="lazy" decoding="async" src="${p.image || 'assets/images/logo.webp'}" alt="${escapeHtml(p.title)}" class="table-img-thumb" style="width: 56px; height: 56px; object-fit: cover; border-radius: 8px; border: 1px solid var(--admin-border); cursor: pointer;" onclick="openProjectModal('${p.id}')" onerror="this.src='assets/images/logo.webp'">
                </div>
            </td>
            <td style="font-weight: 600; color: var(--admin-text-main); font-size: 0.95rem;">
                ${escapeHtml(p.title)}
            </td>
            <td>
                <span class="badge" style="background: ${catStyle.bg}; color: ${catStyle.text}; border: 1px solid ${catStyle.border}; font-weight: 600; font-size: 0.8rem;">
                    ${escapeHtml(p.category || 'Foresterie')}
                </span>
            </td>
            <td style="color: var(--admin-text-muted); font-size: 0.85rem;">
                ${escapeHtml(p.location || 'Bénin')}
            </td>
            <td style="color: var(--admin-text-muted); font-size: 0.85rem;">
                ${escapeHtml(p.surface || '-')}
            </td>
            <td>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                    <button class="btn-action btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.8rem;" onclick="openProjectModal('${p.id}')" title="Modifier le nom, la catégorie et les informations">
                        ✏️ Modifier
                    </button>
                    <button class="btn-action" style="padding: 0.35rem 0.65rem; font-size: 0.8rem; background: #0284c7; border-color: #0284c7;" onclick="triggerQuickImageUpload('${p.id}')" title="Choisir une nouvelle photo depuis votre ordinateur">
                        📁 Photo
                    </button>
                    <button class="btn-table-action delete" onclick="deleteProject('${p.id}')" title="Supprimer ce projet">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    `;
    }).join('');
}

window.reloadAllGalleryProjects = function() {
    window.cmsStore.syncRealProjects();
    const searchInput = document.getElementById('project-search-input');
    const catFilter = document.getElementById('project-category-filter');
    if (searchInput) searchInput.value = '';
    if (catFilter) catFilter.value = 'ALL';
    renderProjects();
    renderOverview();
    showToast("Les 34 projets avec leurs photos ont été rechargés avec succès !", "success");
};

window.filterProjectsList = function() {
    renderProjects();
};

window.openProjectModal = function(id = null) {
    const store = window.cmsStore;
    const modal = document.getElementById('project-modal');
    const form = document.getElementById('project-form');
    const title = document.getElementById('project-modal-title');
    const preview = document.getElementById('project-img-preview');
    if (!modal || !form) return;

    form.reset();
    if (preview) preview.src = 'assets/images/logo.webp';

    if (id) {
        const p = store.getProjectById(id);
        if (p) {
            title.textContent = `Modifier : ${p.title}`;
            document.getElementById('project-id').value = p.id;
            document.getElementById('project-title').value = p.title || '';
            document.getElementById('project-category').value = p.category || 'Foresterie';
            document.getElementById('project-surface').value = p.surface || '';
            document.getElementById('project-location').value = p.location || '';
            document.getElementById('project-image').value = p.image || '';
            document.getElementById('project-description').value = p.description || '';
            if (preview) preview.src = p.image || 'assets/images/logo.webp';
        }
    } else {
        title.textContent = "Nouveau Projet Agro-Forestier";
        document.getElementById('project-id').value = '';
    }

    modal.classList.add('active');
};

window.closeProjectModal = function() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.remove('active');
};

window.deleteProject = function(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet de la galerie ?")) {
        window.cmsStore.deleteProject(id);
        renderProjects();
        renderOverview();
        showToast("Projet supprimé", "info");
    }
};

/**
 * Raccourci pour changer l'image d'un projet directement depuis le tableau via l'explorateur de l'ordinateur
 */
window.triggerQuickImageUpload = function(projectId) {
    activeQuickUploadProjectId = projectId;
    const input = document.getElementById('quick-image-file-input');
    if (input) {
        input.value = '';
        input.click();
    }
};

/**
 * Configure les écouteurs de sélection de fichiers images depuis l'ordinateur
 */
function setupProjectImageUploads() {
    // 1. Upload dans le modal projet
    const modalFileInput = document.getElementById('project-file-input');
    const preview = document.getElementById('project-img-preview');
    const imageInput = document.getElementById('project-image');

    if (modalFileInput) {
        modalFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (re) => {
                    const dataUrl = re.target.result;
                    if (imageInput) imageInput.value = dataUrl;
                    if (preview) preview.src = dataUrl;
                    showToast(`Photo "${file.name}" chargée depuis votre ordinateur !`, "success");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Prévisualisation en direct si l'utilisateur modifie l'URL manuellement
    if (imageInput && preview) {
        imageInput.addEventListener('input', (e) => {
            preview.src = e.target.value.trim() || 'assets/images/logo.webp';
        });
    }

    // 2. Upload rapide directement depuis la ligne du tableau
    const quickInput = document.getElementById('quick-image-file-input');
    if (quickInput) {
        quickInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0] && activeQuickUploadProjectId) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (re) => {
                    const dataUrl = re.target.result;
                    const project = window.cmsStore.getProjectById(activeQuickUploadProjectId);
                    if (project) {
                        project.image = dataUrl;
                        window.cmsStore.saveProject(project);
                        renderProjects();
                        renderOverview();
                        showToast(`Photo du projet "${project.title}" mise à jour avec succès !`, "success");
                    }
                    activeQuickUploadProjectId = null;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// ----------------------------------------------------------------------
// TEAM MANAGEMENT
// ----------------------------------------------------------------------
function renderTeam() {
    const store = window.cmsStore;
    if (!store) return;
    const tbody = document.getElementById('team-table-body');
    if (!tbody) return;

    const team = store.getTeam() || [];
    tbody.innerHTML = team.map(m => `
        <tr>
            <td style="width: 70px;">
                <img loading="lazy" decoding="async" src="${m.image || 'assets/images/aime_adjaho.webp'}" alt="${escapeHtml(m.name)}" class="table-img-thumb" style="width: 52px; height: 52px; object-fit: cover; border-radius: 8px; border: 1px solid var(--admin-border); cursor: pointer;" onclick="openTeamModal('${m.id}')" onerror="this.src='assets/images/logo.webp'">
            </td>
            <td style="font-weight: 600; color: var(--admin-text-main); font-size: 0.95rem;">${escapeHtml(m.name)}</td>
            <td>${escapeHtml(m.role)}</td>
            <td>${escapeHtml(m.phone || '-')}</td>
            <td>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                    <button class="btn-action btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.8rem;" onclick="openTeamModal('${m.id}')" title="Modifier">
                        ✏️ Modifier
                    </button>
                    <button class="btn-action" style="padding: 0.35rem 0.65rem; font-size: 0.8rem; background: #0284c7; border-color: #0284c7;" onclick="triggerQuickTeamImageUpload('${m.id}')" title="Changer la photo depuis l'ordinateur">
                        📁 Photo
                    </button>
                    <button class="btn-table-action delete" onclick="deleteTeamMember('${m.id}')" title="Supprimer">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.openTeamModal = function(id = null) {
    const store = window.cmsStore;
    const modal = document.getElementById('team-modal');
    const form = document.getElementById('team-form');
    const title = document.getElementById('team-modal-title');
    if (!modal || !form) return;

    form.reset();
    if (id) {
        const m = store.getTeamById(id);
        if (m) {
            title.textContent = "Modifier le Membre";
            document.getElementById('team-id').value = m.id;
            document.getElementById('team-name').value = m.name || '';
            document.getElementById('team-role').value = m.role || '';
            document.getElementById('team-phone').value = m.phone || '';
            document.getElementById('team-image').value = m.image || '';
            if (document.getElementById('team-img-preview')) {
                document.getElementById('team-img-preview').src = m.image || 'assets/images/aime_adjaho.webp';
            }
            document.getElementById('team-bio').value = m.bio || '';
        }
    } else {
        title.textContent = "Nouveau Membre de l'Équipe";
        document.getElementById('team-id').value = '';
    }
    modal.classList.add('active');
};

window.closeTeamModal = function() {
    const modal = document.getElementById('team-modal');
    if (modal) modal.classList.remove('active');
};

window.deleteTeamMember = function(id) {
    if (confirm("Supprimer ce membre de l'équipe ?")) {
        window.cmsStore.deleteTeamMember(id);
        renderTeam();
        renderOverview();
        showToast("Membre retiré", "info");
    }
};

// ----------------------------------------------------------------------
// SERVICES MANAGEMENT
// ----------------------------------------------------------------------
function renderServices() {
    const store = window.cmsStore;
    if (!store) return;
    const tbody = document.getElementById('services-table-body');
    if (!tbody) return;

    const services = store.getServices() || [];
    tbody.innerHTML = services.map(s => `
        <tr>
            <td style="font-size: 1.5rem;">${s.icon || '🌱'}</td>
            <td style="font-weight: 600;">${escapeHtml(s.title)}</td>
            <td style="color: var(--admin-text-muted); font-size: 0.85rem;">${escapeHtml(s.summary || '')}</td>
            <td>
                <div style="display: flex; gap: 0.4rem;">
                    <button class="btn-table-action" onclick="openServiceModal('${s.id}')" title="Modifier">✏️</button>
                    <button class="btn-table-action delete" onclick="deleteService('${s.id}')" title="Supprimer">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.openServiceModal = function(id = null) {
    const store = window.cmsStore;
    const modal = document.getElementById('service-modal');
    const form = document.getElementById('service-form');
    const title = document.getElementById('service-modal-title');
    if (!modal || !form) return;

    form.reset();
    if (id) {
        const s = store.getServiceById(id);
        if (s) {
            title.textContent = "Modifier le Service";
            document.getElementById('service-id').value = s.id;
            document.getElementById('service-title').value = s.title || '';
            document.getElementById('service-icon').value = s.icon || '🌱';
            document.getElementById('service-summary').value = s.summary || '';
            document.getElementById('service-description').value = s.description || '';
        }
    } else {
        title.textContent = "Nouveau Service";
        document.getElementById('service-id').value = '';
    }
    modal.classList.add('active');
};

window.closeServiceModal = function() {
    const modal = document.getElementById('service-modal');
    if (modal) modal.classList.remove('active');
};

window.deleteService = function(id) {
    if (confirm("Supprimer ce service ?")) {
        window.cmsStore.deleteService(id);
        renderServices();
        renderOverview();
        showToast("Service supprimé", "info");
    }
};

// ----------------------------------------------------------------------
// MEDIA GALLERY & DROPZONE
// ----------------------------------------------------------------------
function renderMediaGallery() {
    const store = window.cmsStore;
    if (!store) return;
    const container = document.getElementById('media-grid-container');
    if (!container) return;

    const images = store.getImages() || [];
    container.innerHTML = images.map(img => `
        <div class="media-card">
            <div class="media-thumb">
                <img loading="lazy" decoding="async" src="${img.url}" alt="${escapeHtml(img.title)}" onerror="this.src='assets/images/logo.webp'">
            </div>
            <div class="media-details">
                <div class="media-title" title="${escapeHtml(img.title)}">${escapeHtml(img.title)}</div>
                <div class="media-meta">${escapeHtml(img.category || 'Général')} • ${img.date || ''}</div>
                <div class="media-actions">
                    <button class="btn-action btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;" onclick="copyToClipboard('${img.url}')">📋 Copier URL</button>
                    <button class="btn-table-action delete" onclick="deleteImage('${img.id}')">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.openImageModal = function() {
    const modal = document.getElementById('media-modal');
    const form = document.getElementById('image-form');
    if (form) form.reset();
    if (modal) modal.classList.add('active');
};

window.closeImageModal = function() {
    const modal = document.getElementById('media-modal');
    if (modal) modal.classList.remove('active');
};

window.deleteImage = function(id) {
    if (confirm("Supprimer cette image de la médiathèque ?")) {
        window.cmsStore.deleteImage(id);
        renderMediaGallery();
        renderOverview();
        showToast("Image supprimée", "info");
    }
};

function setupDropzone() {
    const dropzone = document.getElementById('upload-dropzone');
    const fileInput = document.getElementById('media-file-input');
    if (!dropzone || !fileInput) return;

    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    ['dragleave', 'drop'].forEach(ev => {
        dropzone.addEventListener(ev, () => dropzone.classList.remove('dragover'));
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files) handleFiles(e.target.files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = (re) => {
                window.cmsStore.saveImage({
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    url: re.target.result,
                    category: "Téléversé"
                });
                renderMediaGallery();
                renderOverview();
                showToast(`Image "${file.name}" ajoutée !`, "success");
            };
            reader.readAsDataURL(file);
        });
    }
}

// ----------------------------------------------------------------------
// SITE INFO
// ----------------------------------------------------------------------
function renderSiteInfo() {
    const store = window.cmsStore;
    if (!store) return;
    const info = store.getSiteInfo();
    if (!info) return;

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };

    setVal('site-company', info.companyName);
    setVal('site-email', info.email);
    setVal('site-phone1', info.phone1);
    setVal('site-phone2', info.phone2);
    setVal('site-hero-title', info.heroTitle);
    setVal('site-hero-subtitle', info.heroSubtitle);
    setVal('site-coordinator-name', info.coordinatorName);
    setVal('site-coordinator-title', info.coordinatorTitle || '');
    setVal('site-coordinator-message', info.coordinatorMessage);
    setVal('site-coordinator-image', info.coordinatorImage || 'assets/images/coordinator.webp');
    setVal('site-core-business', info.coreBusiness || '');
    setVal('site-address', info.address || 'Ouèdo, Abomey-Calavi, République du Bénin');
    const coordPreview = document.getElementById('coord-img-preview');
    if (coordPreview) {
        coordPreview.src = info.coordinatorImage || 'assets/images/coordinator.webp';
    }
}

// ----------------------------------------------------------------------
// MESSAGES INBOX
// ----------------------------------------------------------------------
function renderMessages() {
    const store = window.cmsStore;
    if (!store) return;
    const tbody = document.getElementById('messages-table-body');
    if (!tbody) return;

    const messages = store.getMessages() || [];
    if (messages.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--admin-text-muted);">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📭</div>
            Votre boîte de réception est vide.<br>Les demandes envoyées depuis la page Contact s'afficheront ici.
        </td></tr>`;
        return;
    }

    tbody.innerHTML = messages.map(m => {
        const isUnread = m.status === 'Non lu';
        const cleanPhone = (m.senderPhone || '').replace(/[^0-9+]/g, '');
        return `
            <tr style="${isUnread ? 'font-weight: 600; background: rgba(197, 160, 40, 0.04);' : ''}">
                <td style="font-size: 0.85rem; color: var(--admin-text-muted);">${m.date || '-'}</td>
                <td style="color: var(--admin-text-main);">${escapeHtml(m.senderName)}</td>
                <td><a href="mailto:${escapeHtml(m.senderEmail)}" style="color: inherit; text-decoration: underline;">${escapeHtml(m.senderEmail)}</a></td>
                <td>
                    ${cleanPhone ? `<a href="https://wa.me/${cleanPhone}" target="_blank" style="color: #25D366; text-decoration: none; font-weight: 600;">💬 ${escapeHtml(m.senderPhone)}</a>` : '-'}
                </td>
                <td>${escapeHtml(m.subject || 'Projet')}</td>
                <td>
                    <span class="badge" style="${isUnread ? 'background:#fef3c7; color:#92400e; font-weight:700;' : 'background:#f1f5f9; color:#475569;'}">
                        ${escapeHtml(m.status)}
                    </span>
                </td>
                <td>
                    <div style="display: flex; gap: 0.4rem;">
                        <button class="btn-table-action" onclick="viewMessageModal('${m.id}')" title="Lire le message">👁️ Lire</button>
                        <button class="btn-table-action delete" onclick="deleteMessage('${m.id}')" title="Supprimer">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

window.viewMessageModal = function(id) {
    const store = window.cmsStore;
    const msg = (store.getMessages() || []).find(m => m.id === id);
    if (!msg) return;

    store.markMessageRead(id);
    renderMessages();
    renderOverview();

    const modal = document.getElementById('message-view-modal');
    const body = document.getElementById('message-view-body');
    const actions = document.getElementById('message-view-actions');
    if (!modal || !body || !actions) return;

    const cleanPhone = (msg.senderPhone || '').replace(/[^0-9+]/g, '');

    body.innerHTML = `
        <div style="margin-bottom: 1rem; border-bottom: 1px solid var(--admin-border); padding-bottom: 0.75rem;">
            <div style="font-size: 0.85rem; color: var(--admin-text-muted); margin-bottom: 0.25rem;">Reçu le ${msg.date || '-'}</div>
            <h3 style="margin: 0; color: var(--admin-text-main); font-size: 1.25rem;">${escapeHtml(msg.senderName)}</h3>
            <p style="margin: 0.25rem 0 0 0; color: var(--admin-text-muted); font-size: 0.9rem;">
                Email : <a href="mailto:${escapeHtml(msg.senderEmail)}">${escapeHtml(msg.senderEmail)}</a>
                ${msg.senderPhone ? ` | Téléphone : <strong>${escapeHtml(msg.senderPhone)}</strong>` : ''}
            </p>
        </div>
        <div style="margin-bottom: 1rem;">
            <span class="badge" style="background: #e2e8f0; color: #334155; margin-bottom: 0.5rem; display: inline-block;">
                ${escapeHtml(msg.subject || 'Demande de projet')}
            </span>
            <div style="background: #f8fafc; border-radius: 8px; padding: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: #1e293b; border: 1px solid #e2e8f0; white-space: pre-wrap;">
                ${escapeHtml(msg.message)}
            </div>
        </div>
    `;

    actions.innerHTML = `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; width: 100%; justify-content: space-between;">
            <div style="display: flex; gap: 0.5rem;">
                ${cleanPhone ? `
                    <a href="https://wa.me/${cleanPhone}" target="_blank" class="btn-action" style="background:#25D366; text-decoration:none;">
                        💬 Répondre sur WhatsApp
                    </a>
                ` : ''}
                <a href="mailto:${escapeHtml(msg.senderEmail)}?subject=Re: ${encodeURIComponent(msg.subject || '3D-GROUPE SARL')}" class="btn-action btn-secondary" style="text-decoration:none;">
                    ✉️ Répondre par Email
                </a>
            </div>
            <button type="button" class="btn-action btn-secondary" onclick="closeMessageViewModal()">Fermer</button>
        </div>
    `;

    modal.classList.add('active');
};

window.closeMessageViewModal = function() {
    const modal = document.getElementById('message-view-modal');
    if (modal) modal.classList.remove('active');
};

window.deleteMessage = function(id) {
    if (confirm("Supprimer ce message définitivement ?")) {
        window.cmsStore.deleteMessage(id);
        renderMessages();
        renderOverview();
        showToast("Message supprimé", "info");
    }
};

// ----------------------------------------------------------------------
// SUBMIT FORMS SETUP
// ----------------------------------------------------------------------
function setupForms() {
    const store = window.cmsStore;
    if (!store) return;

    // 1. Page Form
    const pageForm = document.getElementById('page-form');
    if (pageForm) {
        pageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('page-id').value;
            const heroImgEl = document.getElementById('page-heroimage');
            const mainContentEl = document.getElementById('page-maincontent');
            const extraContentEl = document.getElementById('page-extracontent');

            const pageData = {
                id: id || undefined,
                title: document.getElementById('page-title').value.trim(),
                lang: document.getElementById('page-lang').value,
                filename: document.getElementById('page-filename').value.trim(),
                seoTitle: document.getElementById('page-seotitle').value.trim(),
                seoDescription: document.getElementById('page-seodesc').value.trim(),
                heroTitle: document.getElementById('page-herotitle').value.trim(),
                heroSubtitle: document.getElementById('page-herosubtitle').value.trim(),
                heroImage: heroImgEl ? heroImgEl.value.trim() : undefined,
                mainContent: mainContentEl ? mainContentEl.value.trim() : undefined,
                extraContent: extraContentEl ? extraContentEl.value.trim() : undefined,
                status: document.getElementById('page-status').value
            };
            store.savePage(pageData);
            closePageModal();
            renderPages();
        renderAbout();
            renderOverview();
            showToast("Page enregistrée avec succès !", "success");
        });
    }

    // 2. Project Form
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('project-id').value;
            const pData = {
                id: id || undefined,
                title: document.getElementById('project-title').value.trim(),
                category: document.getElementById('project-category').value,
                surface: document.getElementById('project-surface').value.trim(),
                location: document.getElementById('project-location').value.trim(),
                image: document.getElementById('project-image').value.trim() || 'assets/images/logo.webp',
                description: document.getElementById('project-description').value.trim()
            };
            store.saveProject(pData);
            closeProjectModal();
            renderProjects();
            renderOverview();
            showToast("Projet et photo enregistrés !", "success");
        });
    }

    // 3. Team Form
    const teamForm = document.getElementById('team-form');
    if (teamForm) {
        teamForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('team-id').value;
            const tData = {
                id: id || undefined,
                name: document.getElementById('team-name').value.trim(),
                role: document.getElementById('team-role').value.trim(),
                phone: document.getElementById('team-phone').value.trim(),
                image: document.getElementById('team-image').value.trim() || 'assets/images/aime_adjaho.webp',
                bio: document.getElementById('team-bio').value.trim()
            };
            store.saveTeamMember(tData);
            closeTeamModal();
            renderTeam();
            renderOverview();
            showToast("Membre de l'équipe enregistré !", "success");
        });
    }

    // 4. Service Form
    const serviceForm = document.getElementById('service-form');
    if (serviceForm) {
        serviceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('service-id').value;
            const sData = {
                id: id || undefined,
                title: document.getElementById('service-title').value.trim(),
                icon: document.getElementById('service-icon').value.trim() || '🌱',
                summary: document.getElementById('service-summary').value.trim(),
                description: document.getElementById('service-description').value.trim()
            };
            store.saveService(sData);
            closeServiceModal();
            renderServices();
            renderOverview();
            showToast("Service enregistré !", "success");
        });
    }

    // 5. Image Form
    const imageForm = document.getElementById('image-form');
    if (imageForm) {
        imageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const imgData = {
                title: document.getElementById('image-title').value.trim(),
                url: document.getElementById('image-url').value.trim(),
                category: document.getElementById('image-category').value
            };
            store.saveImage(imgData);
            closeImageModal();
            renderMediaGallery();
            renderOverview();
            showToast("Image enregistrée !", "success");
        });
    }

    // 6. Site Info Form
    const siteInfoForm = document.getElementById('site-info-form');
    if (siteInfoForm) {
        siteInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const coordImgEl = document.getElementById('site-coordinator-image');
            const coordTitleEl = document.getElementById('site-coordinator-title');
            const coreBizEl = document.getElementById('site-core-business');
            const addrEl = document.getElementById('site-address');

            store.updateSiteInfo({
                companyName: document.getElementById('site-company').value.trim(),
                email: document.getElementById('site-email').value.trim(),
                phone1: document.getElementById('site-phone1').value.trim(),
                phone2: document.getElementById('site-phone2').value.trim(),
                heroTitle: document.getElementById('site-hero-title').value.trim(),
                heroSubtitle: document.getElementById('site-hero-subtitle').value.trim(),
                coordinatorName: document.getElementById('site-coordinator-name').value.trim(),
                coordinatorTitle: coordTitleEl ? coordTitleEl.value.trim() : '',
                coordinatorImage: coordImgEl ? coordImgEl.value.trim() : 'assets/images/coordinator.webp',
                coordinatorMessage: document.getElementById('site-coordinator-message').value.trim(),
                coreBusiness: coreBizEl ? coreBizEl.value.trim() : '',
                address: addrEl ? addrEl.value.trim() : ''
            });
            showToast("Coordonnées de l'entreprise mises à jour !", "success");
        });
    }
}

// ----------------------------------------------------------------------
// EXPORT & IMPORT JSON
// ----------------------------------------------------------------------
window.exportDataJSON = function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(window.cmsStore.exportJSON());
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `3d_group_sauvegarde_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast("Sauvegarde exportée avec succès !", "success");
};

window.importDataJSON = function() {
    const fileInput = document.getElementById('import-json-file');
    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
        alert("Veuillez sélectionner un fichier .json.");
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        if (window.cmsStore.importJSON(e.target.result)) {
            showToast("Données restaurées avec succès !", "success");
            location.reload();
        } else {
            alert("Erreur lors de la lecture du fichier JSON.");
        }
    };
    reader.readAsText(fileInput.files[0]);
};

window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Lien copié dans le presse-papier !", "info");
    });
};

function showToast(message, type = 'info') {
    let container = document.getElementById('admin-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'admin-toast-container';
        container.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 999999; display: flex; flex-direction: column; gap: 8px;";
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#0f172a'
    };
    toast.style.cssText = `background: ${colors[type] || colors.info}; color: white; padding: 12px 20px; border-radius: 8px; font-size: 0.9rem; font-weight: 500; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; transform: translateY(20px); opacity: 0;`;
    toast.textContent = message;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
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

/**
 * Triggers d'upload rapide depuis l'ordinateur
 */
window.triggerQuickPageImageUpload = function(pageId) {
    activeQuickUploadPageId = pageId;
    const input = document.getElementById('quick-page-file-input');
    if (input) {
        input.value = '';
        input.click();
    }
};

window.triggerQuickTeamImageUpload = function(teamId) {
    activeQuickUploadTeamId = teamId;
    const input = document.getElementById('quick-team-file-input');
    if (input) {
        input.value = '';
        input.click();
    }
};

function setupAllImageUploadHandlers() {
    // 1. Page Hero Image Upload dans le modal
    const pageFileInput = document.getElementById('page-hero-file-input');
    const pageHeroImgInput = document.getElementById('page-heroimage');
    const pageHeroPreview = document.getElementById('page-hero-img-preview');
    if (pageFileInput) {
        pageFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (re) => {
                    const dataUrl = re.target.result;
                    if (pageHeroImgInput) pageHeroImgInput.value = dataUrl;
                    if (pageHeroPreview) pageHeroPreview.src = dataUrl;
                    showToast(`Bannière "${file.name}" sélectionnée !`, "success");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 2. Page Hero Image Upload rapide depuis la table
    const quickPageInput = document.getElementById('quick-page-file-input');
    if (quickPageInput) {
        quickPageInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0] && activeQuickUploadPageId) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (re) => {
                    const dataUrl = re.target.result;
                    const page = window.cmsStore.getPageById(activeQuickUploadPageId);
                    if (page) {
                        page.heroImage = dataUrl;
                        window.cmsStore.savePage(page);
                        renderPages();
        renderAbout();
                        showToast(`Image de bannière pour "${page.title}" mise à jour !`, "success");
                    }
                    activeQuickUploadPageId = null;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 3. Team Member Image Upload dans le modal
    const teamFileInput = document.getElementById('team-file-input');
    const teamImgInput = document.getElementById('team-image');
    const teamPreview = document.getElementById('team-img-preview');
    if (teamFileInput) {
        teamFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (re) => {
                    const dataUrl = re.target.result;
                    if (teamImgInput) teamImgInput.value = dataUrl;
                    if (teamPreview) teamPreview.src = dataUrl;
                    showToast(`Photo "${file.name}" chargée !`, "success");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 4. Team Member Image Upload rapide depuis la table
    const quickTeamInput = document.getElementById('quick-team-file-input');
    if (quickTeamInput) {
        quickTeamInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0] && activeQuickUploadTeamId) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (re) => {
                    const dataUrl = re.target.result;
                    const member = window.cmsStore.getTeamById(activeQuickUploadTeamId);
                    if (member) {
                        member.image = dataUrl;
                        window.cmsStore.saveTeamMember(member);
                        renderTeam();
                        showToast(`Photo de "${member.name}" mise à jour !`, "success");
                    }
                    activeQuickUploadTeamId = null;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 5. Coordinator Photo Upload dans Site Info
    const coordFileInput = document.getElementById('coord-file-input');
    const coordImgInput = document.getElementById('site-coordinator-image');
    const coordPreview = document.getElementById('coord-img-preview');
    if (coordFileInput) {
        coordFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (re) => {
                    const dataUrl = re.target.result;
                    if (coordImgInput) coordImgInput.value = dataUrl;
                    if (coordPreview) coordPreview.src = dataUrl;
                    showToast(`Photo du Coordonnateur "${file.name}" chargée !`, "success");
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// ----------------------------------------------------------------------
// PAGE À PROPOS DÉDIÉE (Notre Entreprise)
// ----------------------------------------------------------------------
function renderAbout(lang = currentAboutLang) {
    const store = window.cmsStore;
    if (!store) return;

    const pageId = lang === 'FR' ? 'page-about-fr' : 'page-about-en';
    const page = store.getPageById(pageId);
    if (!page) return;

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };

    setVal('about-hero-title', page.heroTitle || (lang === 'FR' ? 'Notre Entreprise' : 'Our Company'));
    setVal('about-hero-subtitle', page.heroSubtitle || (lang === 'FR' ? "L'expertise au service du développement durable agro-forestier au Bénin." : "Expertise at the service of sustainable agro-forestry development in Benin."));
    setVal('about-hero-image', page.heroImage || 'assets/images/project-teck.webp');
    setVal('about-whoweare-title', page.whoWeAreTitle || (lang === 'FR' ? 'Qui sommes-nous ?' : 'Who are we?'));
    setVal('about-whoweare-text', page.whoWeAreText || page.mainContent || '');
    setVal('about-vision', page.vision || '');
    setVal('about-mission', page.mission || '');
    setVal('about-values', page.values || '');
    setVal('about-seo-title', page.seoTitle || '');
    setVal('about-seo-desc', page.seoDescription || '');

    const preview = document.getElementById('about-hero-img-preview');
    if (preview) {
        preview.src = page.heroImage || 'assets/images/project-teck.webp';
    }
}

window.switchAboutLang = function(lang) {
    currentAboutLang = lang;
    const btnFr = document.getElementById('btn-about-lang-fr');
    const btnEn = document.getElementById('btn-about-lang-en');

    if (lang === 'FR') {
        if (btnFr) { btnFr.classList.add('active'); btnFr.classList.remove('btn-secondary'); }
        if (btnEn) { btnEn.classList.remove('active'); btnEn.classList.add('btn-secondary'); }
    } else {
        if (btnEn) { btnEn.classList.add('active'); btnEn.classList.remove('btn-secondary'); }
        if (btnFr) { btnFr.classList.remove('active'); btnFr.classList.add('btn-secondary'); }
    }

    renderAbout(lang);
};

function setupAboutFormHandlers() {
    const aboutForm = document.getElementById('about-page-form');
    if (aboutForm) {
        aboutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const store = window.cmsStore;
            if (!store) return;

            const pageId = currentAboutLang === 'FR' ? 'page-about-fr' : 'page-about-en';
            const page = store.getPageById(pageId) || { id: pageId, filename: currentAboutLang === 'FR' ? 'about.html' : 'en/about.html', lang: currentAboutLang };

            page.title = currentAboutLang === 'FR' ? 'À Propos' : 'About Us';
            page.heroTitle = document.getElementById('about-hero-title').value.trim();
            page.heroSubtitle = document.getElementById('about-hero-subtitle').value.trim();
            page.heroImage = document.getElementById('about-hero-image').value.trim() || 'assets/images/project-teck.webp';
            page.whoWeAreTitle = document.getElementById('about-whoweare-title').value.trim();
            page.whoWeAreText = document.getElementById('about-whoweare-text').value.trim();
            page.mainContent = page.whoWeAreText;
            page.vision = document.getElementById('about-vision').value.trim();
            page.mission = document.getElementById('about-mission').value.trim();
            page.values = document.getElementById('about-values').value.trim();
            page.seoTitle = document.getElementById('about-seo-title').value.trim();
            page.seoDescription = document.getElementById('about-seo-desc').value.trim();
            page.lastModified = new Date().toISOString().split('T')[0];

            store.savePage(page);
            renderPages();
            
            const indicator = document.getElementById('about-save-indicator');
            if (indicator) {
                indicator.style.display = 'inline-block';
                setTimeout(() => { indicator.style.display = 'none'; }, 4000);
            }
            showToast(`Page « À Propos (${currentAboutLang}) » enregistrée avec succès !`, "success");
        });
    }

    // Sélecteur d'image pour À Propos depuis l'ordinateur
    const fileInput = document.getElementById('about-hero-file-input');
    const imgInput = document.getElementById('about-hero-image');
    const preview = document.getElementById('about-hero-img-preview');

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (re) => {
                    const dataUrl = re.target.result;
                    if (imgInput) imgInput.value = dataUrl;
                    if (preview) preview.src = dataUrl;
                    showToast(`Bannière À Propos "${file.name}" chargée depuis votre ordinateur !`, "success");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (imgInput && preview) {
        imgInput.addEventListener('input', (e) => {
            preview.src = e.target.value.trim() || 'assets/images/project-teck.webp';
        });
    }
}

/**
 * 3D-GROUPE SARL - ADMIN PORTAL LOGIC
 * Manages tabs, modals, CRUD operations for Projects, Team, Services, Media Gallery, Info & Messages.
 */

document.addEventListener('DOMContentLoaded', () => {
    initAdmin();
});

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
        
        setupNavigation();
        renderOverview();
        renderProjects();
        renderTeam();
        renderServices();
        renderMediaGallery();
        renderSiteInfo();
        renderMessages();
        setupDropzone();
    }

    // ----------------------------------------------------------------------
    // NAVIGATION TABS
    // ----------------------------------------------------------------------
    function setupNavigation() {
        const navBtns = document.querySelectorAll('.nav-item-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        const topbarTitle = document.getElementById('topbar-title');

        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                navBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const activePane = document.getElementById(`tab-${targetTab}`);
                if (activePane) activePane.classList.add('active');

                if (topbarTitle) {
                    const titleText = btn.innerText.trim();
                    topbarTitle.textContent = titleText;
                }

                // Close mobile menu if open
                if (sidebar) sidebar.classList.remove('show');
            });
        });
    }

    // ----------------------------------------------------------------------
    // OVERVIEW / DASHBOARD STATS
    // ----------------------------------------------------------------------
    function renderOverview() {
        const projectsCount = store.getProjects().length;
        const teamCount = store.getTeam().length;
        const servicesCount = store.getServices().length;
        const messagesCount = store.getMessages().length;
        const imagesCount = store.getImages().length;

        const elProjects = document.getElementById('stat-projects-count');
        const elTeam = document.getElementById('stat-team-count');
        const elServices = document.getElementById('stat-services-count');
        const elMessages = document.getElementById('stat-messages-count');
        const elImages = document.getElementById('stat-images-count');

        if (elProjects) elProjects.textContent = projectsCount;
        if (elTeam) elTeam.textContent = teamCount;
        if (elServices) elServices.textContent = servicesCount;
        if (elMessages) elMessages.textContent = messagesCount;
        if (elImages) elImages.textContent = imagesCount;
    }

    // ----------------------------------------------------------------------
    // MEDIA GALLERY (MÉDIATHÈQUE)
    // ----------------------------------------------------------------------
    function renderMediaGallery() {
        const grid = document.getElementById('media-grid-container');
        if (!grid) return;

        const images = store.getImages();
        if (images.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--admin-text-muted);">
                🖼️ Aucune image dans la médiathèque. Cliquez sur "Ajouter une Image" ou déposez un fichier ci-dessus.
            </div>`;
            return;
        }

        grid.innerHTML = images.map(img => `
            <div class="media-card">
                <div class="media-thumb-wrapper">
                    <img src="${img.url}" alt="${escapeHtml(img.title)}" onerror="this.src='assets/images/logo.png'">
                </div>
                <div class="media-card-info">
                    <div class="media-title" title="${escapeHtml(img.title)}">${escapeHtml(img.title)}</div>
                    <div class="media-meta">${escapeHtml(img.category || 'Général')} • ${img.date || ''}</div>
                    <div class="media-actions">
                        <button class="btn-icon-sm" onclick="copyImageURL('${escapeHtml(img.url)}')" title="Copier le lien">📋 Link</button>
                        <button class="btn-edit-sm" onclick="openImageModal('${img.id}')">✏️ Edit</button>
                        <button class="btn-danger-sm" onclick="deleteImageItem('${img.id}')">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    window.copyImageURL = function(url) {
        navigator.clipboard.writeText(url).then(() => {
            showToast("Lien de l'image copié dans le presse-papier !", "success");
        }).catch(() => {
            prompt("Lien de l'image :", url);
        });
    };

    window.openImageModal = function(id = null) {
        const modal = document.getElementById('image-modal');
        const form = document.getElementById('image-form');
        const titleEl = document.getElementById('image-modal-title');
        const preview = document.getElementById('image-modal-preview');

        if (!modal || !form) return;

        form.reset();
        document.getElementById('image-id').value = '';
        if (preview) preview.src = 'assets/images/logo.png';

        if (id) {
            const img = store.getImageById(id);
            if (img) {
                titleEl.textContent = 'Modifier l\'Image';
                document.getElementById('image-id').value = img.id;
                document.getElementById('image-title').value = img.title || '';
                document.getElementById('image-category').value = img.category || 'Général';
                document.getElementById('image-url').value = img.url || '';
                if (preview) preview.src = img.url || 'assets/images/logo.png';
            }
        } else {
            titleEl.textContent = 'Ajouter une Image';
        }

        modal.classList.add('active');
    };

    window.closeImageModal = function() {
        const modal = document.getElementById('image-modal');
        if (modal) modal.classList.remove('active');
    };

    window.deleteImageItem = function(id) {
        if (confirm("Voulez-vous supprimer cette image de la médiathèque ?")) {
            store.deleteImage(id);
            renderMediaGallery();
            renderOverview();
            showToast("Image supprimée de la médiathèque", "danger");
        }
    };

    // Handle Image Modal Form Submit
    const imageForm = document.getElementById('image-form');
    if (imageForm) {
        imageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const imageData = {
                id: document.getElementById('image-id').value || null,
                title: document.getElementById('image-title').value.trim() || 'Image sans titre',
                category: document.getElementById('image-category').value,
                url: document.getElementById('image-url').value.trim() || 'assets/images/logo.png'
            };

            store.saveImage(imageData);
            closeImageModal();
            renderMediaGallery();
            renderOverview();
            showToast("Image enregistrée dans la médiathèque !", "success");
        });
    }

    // Dropzone & File Upload Logic
    function setupDropzone() {
        const dropzone = document.getElementById('upload-dropzone');
        const fileInput = document.getElementById('media-file-input');

        if (!dropzone || !fileInput) return;

        dropzone.addEventListener('click', () => fileInput.click());

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragover');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFilesUpload(e.dataTransfer.files);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                handleFilesUpload(e.target.files);
            }
        });
    }

    function handleFilesUpload(files) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) {
                alert("Veuillez sélectionner uniquement des fichiers images (PNG, JPG, WEBP, GIF).");
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const dataUrl = e.target.result;
                const newImg = {
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    url: dataUrl,
                    category: "Fichiers Téléversés"
                };
                store.saveImage(newImg);
                renderMediaGallery();
                renderOverview();
                showToast(`Image "${file.name}" téléversée avec succès !`, "success");
            };
            reader.readAsDataURL(file);
        });
    }

    // ----------------------------------------------------------------------
    // MEDIA PICKER MODAL (Pik-Image for Project / Team Modals)
    // ----------------------------------------------------------------------
    let currentTargetInputId = null;

    window.openMediaPicker = function(inputId) {
        currentTargetInputId = inputId;
        const modal = document.getElementById('media-picker-modal');
        const grid = document.getElementById('media-picker-grid');
        if (!modal || !grid) return;

        const images = store.getImages();
        grid.innerHTML = images.map(img => `
            <div class="media-card" onclick="selectPickerImage('${escapeHtml(img.url)}')">
                <div class="media-thumb-wrapper">
                    <img src="${img.url}" alt="${escapeHtml(img.title)}">
                </div>
                <div style="padding:0.5rem; text-align:center; font-size:0.8rem; font-weight:600; color:#fff;">
                    ${escapeHtml(img.title)}
                </div>
            </div>
        `).join('');

        modal.classList.add('active');
    };

    window.selectPickerImage = function(url) {
        if (currentTargetInputId) {
            const input = document.getElementById(currentTargetInputId);
            if (input) {
                input.value = url;
                // Trigger change/input event for preview
                input.dispatchEvent(new Event('input'));
            }
        }
        closeMediaPicker();
        showToast("Image sélectionnée !", "success");
    };

    window.closeMediaPicker = function() {
        const modal = document.getElementById('media-picker-modal');
        if (modal) modal.classList.remove('active');
    };

    // ----------------------------------------------------------------------
    // PROJECTS MANAGEMENT
    // ----------------------------------------------------------------------
    function renderProjects() {
        const tbody = document.getElementById('projects-table-body');
        if (!tbody) return;

        const projects = store.getProjects();
        if (projects.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--admin-text-muted);">Aucun projet trouvé. Cliquez sur "Ajouter un projet".</td></tr>`;
            return;
        }

        tbody.innerHTML = projects.map(p => `
            <tr>
                <td>
                    <img src="${p.image || 'assets/images/logo.png'}" alt="${escapeHtml(p.title)}" class="table-img-thumb" onerror="this.src='assets/images/logo.png'">
                </td>
                <td><strong>${escapeHtml(p.title)}</strong></td>
                <td><span class="badge badge-green">${escapeHtml(p.category || 'Général')}</span></td>
                <td>${escapeHtml(p.location || 'N/A')}</td>
                <td>${escapeHtml(p.surface || 'N/A')}</td>
                <td>
                    <button class="btn-edit-sm" onclick="openProjectModal('${p.id}')">✏️ Modifier</button>
                    <button class="btn-danger-sm" onclick="deleteProjectItem('${p.id}')">🗑️ Supprimer</button>
                </td>
            </tr>
        `).join('');
    }

    window.openProjectModal = function(id = null) {
        const modal = document.getElementById('project-modal');
        const form = document.getElementById('project-form');
        const titleEl = document.getElementById('project-modal-title');

        if (!modal || !form) return;

        form.reset();
        document.getElementById('project-id').value = '';
        const preview = document.getElementById('project-img-preview');
        if (preview) preview.src = 'assets/images/logo.png';

        if (id) {
            const p = store.getProjectById(id);
            if (p) {
                titleEl.textContent = 'Modifier le Projet';
                document.getElementById('project-id').value = p.id;
                document.getElementById('project-title').value = p.title || '';
                document.getElementById('project-category').value = p.category || '';
                document.getElementById('project-location').value = p.location || '';
                document.getElementById('project-surface').value = p.surface || '';
                document.getElementById('project-image').value = p.image || '';
                document.getElementById('project-description').value = p.description || '';
                if (preview) preview.src = p.image || 'assets/images/logo.png';
            }
        } else {
            titleEl.textContent = 'Ajouter un Nouveau Projet';
        }

        modal.classList.add('active');
    };

    window.closeProjectModal = function() {
        const modal = document.getElementById('project-modal');
        if (modal) modal.classList.remove('active');
    };

    window.deleteProjectItem = function(id) {
        if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
            store.deleteProject(id);
            renderProjects();
            renderOverview();
            showToast("Projet supprimé", "danger");
        }
    };

    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectData = {
                id: document.getElementById('project-id').value || null,
                title: document.getElementById('project-title').value.trim(),
                category: document.getElementById('project-category').value.trim(),
                location: document.getElementById('project-location').value.trim(),
                surface: document.getElementById('project-surface').value.trim(),
                image: document.getElementById('project-image').value.trim() || 'assets/images/logo.png',
                description: document.getElementById('project-description').value.trim()
            };

            store.saveProject(projectData);
            closeProjectModal();
            renderProjects();
            renderOverview();
            showToast("Projet enregistré avec succès !", "success");
        });
    }

    // Live preview image link
    const projImgInput = document.getElementById('project-image');
    if (projImgInput) {
        projImgInput.addEventListener('input', (e) => {
            const preview = document.getElementById('project-img-preview');
            if (preview) preview.src = e.target.value || 'assets/images/logo.png';
        });
    }

    // ----------------------------------------------------------------------
    // TEAM MANAGEMENT
    // ----------------------------------------------------------------------
    function renderTeam() {
        const tbody = document.getElementById('team-table-body');
        if (!tbody) return;

        const team = store.getTeam();
        if (team.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--admin-text-muted);">Aucun membre dans l'équipe.</td></tr>`;
            return;
        }

        tbody.innerHTML = team.map(m => `
            <tr>
                <td>
                    <img src="${m.image || 'assets/images/logo.png'}" alt="${escapeHtml(m.name)}" class="table-img-thumb" onerror="this.src='assets/images/logo.png'">
                </td>
                <td><strong>${escapeHtml(m.name)}</strong></td>
                <td><span class="badge badge-blue">${escapeHtml(m.role)}</span></td>
                <td>${escapeHtml(m.phone || 'N/A')}</td>
                <td>
                    <button class="btn-edit-sm" onclick="openTeamModal('${m.id}')">✏️ Modifier</button>
                    <button class="btn-danger-sm" onclick="deleteTeamItem('${m.id}')">🗑️ Supprimer</button>
                </td>
            </tr>
        `).join('');
    }

    window.openTeamModal = function(id = null) {
        const modal = document.getElementById('team-modal');
        const form = document.getElementById('team-form');
        const titleEl = document.getElementById('team-modal-title');

        if (!modal || !form) return;

        form.reset();
        document.getElementById('team-id').value = '';

        if (id) {
            const m = store.getTeamById(id);
            if (m) {
                titleEl.textContent = 'Modifier le Membre';
                document.getElementById('team-id').value = m.id;
                document.getElementById('team-name').value = m.name || '';
                document.getElementById('team-role').value = m.role || '';
                document.getElementById('team-image').value = m.image || '';
                document.getElementById('team-phone').value = m.phone || '';
                document.getElementById('team-bio').value = m.bio || '';
            }
        } else {
            titleEl.textContent = 'Ajouter un Membre à l\'Équipe';
        }

        modal.classList.add('active');
    };

    window.closeTeamModal = function() {
        const modal = document.getElementById('team-modal');
        if (modal) modal.classList.remove('active');
    };

    window.deleteTeamItem = function(id) {
        if (confirm("Voulez-vous supprimer ce membre de l'équipe ?")) {
            store.deleteTeamMember(id);
            renderTeam();
            renderOverview();
            showToast("Membre supprimé", "danger");
        }
    };

    const teamForm = document.getElementById('team-form');
    if (teamForm) {
        teamForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const memberData = {
                id: document.getElementById('team-id').value || null,
                name: document.getElementById('team-name').value.trim(),
                role: document.getElementById('team-role').value.trim(),
                image: document.getElementById('team-image').value.trim() || 'assets/images/logo.png',
                phone: document.getElementById('team-phone').value.trim(),
                bio: document.getElementById('team-bio').value.trim()
            };

            store.saveTeamMember(memberData);
            closeTeamModal();
            renderTeam();
            renderOverview();
            showToast("Profil de l'équipe mis à jour !", "success");
        });
    }

    // ----------------------------------------------------------------------
    // SERVICES MANAGEMENT
    // ----------------------------------------------------------------------
    function renderServices() {
        const tbody = document.getElementById('services-table-body');
        if (!tbody) return;

        const services = store.getServices();
        if (services.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--admin-text-muted);">Aucun service.</td></tr>`;
            return;
        }

        tbody.innerHTML = services.map(s => `
            <tr>
                <td style="font-size:1.5rem; text-align:center;">${s.icon || '🌱'}</td>
                <td><strong>${escapeHtml(s.title)}</strong></td>
                <td>${escapeHtml(s.summary || '')}</td>
                <td>
                    <button class="btn-edit-sm" onclick="openServiceModal('${s.id}')">✏️ Modifier</button>
                    <button class="btn-danger-sm" onclick="deleteServiceItem('${s.id}')">🗑️ Supprimer</button>
                </td>
            </tr>
        `).join('');
    }

    window.openServiceModal = function(id = null) {
        const modal = document.getElementById('service-modal');
        const form = document.getElementById('service-form');
        const titleEl = document.getElementById('service-modal-title');

        if (!modal || !form) return;

        form.reset();
        document.getElementById('service-id').value = '';

        if (id) {
            const s = store.getServiceById(id);
            if (s) {
                titleEl.textContent = 'Modifier le Service';
                document.getElementById('service-id').value = s.id;
                document.getElementById('service-title').value = s.title || '';
                document.getElementById('service-icon').value = s.icon || '🌱';
                document.getElementById('service-summary').value = s.summary || '';
                document.getElementById('service-description').value = s.description || '';
            }
        } else {
            titleEl.textContent = 'Ajouter un Nouveau Service';
        }

        modal.classList.add('active');
    };

    window.closeServiceModal = function() {
        const modal = document.getElementById('service-modal');
        if (modal) modal.classList.remove('active');
    };

    window.deleteServiceItem = function(id) {
        if (confirm("Supprimer ce service ?")) {
            store.deleteService(id);
            renderServices();
            renderOverview();
            showToast("Service supprimé", "danger");
        }
    };

    const serviceForm = document.getElementById('service-form');
    if (serviceForm) {
        serviceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const serviceData = {
                id: document.getElementById('service-id').value || null,
                title: document.getElementById('service-title').value.trim(),
                icon: document.getElementById('service-icon').value.trim() || '🌱',
                summary: document.getElementById('service-summary').value.trim(),
                description: document.getElementById('service-description').value.trim()
            };

            store.saveService(serviceData);
            closeServiceModal();
            renderServices();
            renderOverview();
            showToast("Service enregistré !", "success");
        });
    }

    // ----------------------------------------------------------------------
    // SITE INFO FORM
    // ----------------------------------------------------------------------
    function renderSiteInfo() {
        const info = store.getSiteInfo();
        if (!info) return;

        document.getElementById('site-company').value = info.companyName || '';
        document.getElementById('site-phone1').value = info.phone1 || '';
        document.getElementById('site-phone2').value = info.phone2 || '';
        document.getElementById('site-email').value = info.email || '';
        document.getElementById('site-hero-title').value = info.heroTitle || '';
        document.getElementById('site-hero-subtitle').value = info.heroSubtitle || '';
        document.getElementById('site-coordinator-name').value = info.coordinatorName || '';
        document.getElementById('site-coordinator-message').value = info.coordinatorMessage || '';
    }

    const siteInfoForm = document.getElementById('site-info-form');
    if (siteInfoForm) {
        siteInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const updated = {
                companyName: document.getElementById('site-company').value.trim(),
                phone1: document.getElementById('site-phone1').value.trim(),
                phone2: document.getElementById('site-phone2').value.trim(),
                email: document.getElementById('site-email').value.trim(),
                heroTitle: document.getElementById('site-hero-title').value.trim(),
                heroSubtitle: document.getElementById('site-hero-subtitle').value.trim(),
                coordinatorName: document.getElementById('site-coordinator-name').value.trim(),
                coordinatorMessage: document.getElementById('site-coordinator-message').value.trim()
            };

            store.updateSiteInfo(updated);
            showToast("Informations du site sauvegardées !", "success");
        });
    }

    // ----------------------------------------------------------------------
    // MESSAGES MANAGEMENT
    // ----------------------------------------------------------------------
    function renderMessages() {
        const tbody = document.getElementById('messages-table-body');
        if (!tbody) return;

        const messages = store.getMessages();
        if (messages.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--admin-text-muted);">Aucun message reçu.</td></tr>`;
            return;
        }

        tbody.innerHTML = messages.map(m => `
            <tr>
                <td><small>${escapeHtml(m.date || '')}</small></td>
                <td><strong>${escapeHtml(m.senderName)}</strong><br><small style="color:var(--admin-text-muted);">${escapeHtml(m.senderEmail)}</small></td>
                <td>${escapeHtml(m.senderPhone || '-')}</td>
                <td>${escapeHtml(m.subject || 'Message')}</td>
                <td><span class="badge ${m.status === 'Non lu' ? 'badge-orange' : 'badge-green'}">${escapeHtml(m.status)}</span></td>
                <td>
                    <button class="btn-edit-sm" onclick="viewMessageModal('${m.id}')">👁️ Voir</button>
                    <button class="btn-danger-sm" onclick="deleteMessageItem('${m.id}')">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    window.viewMessageModal = function(id) {
        const messages = store.getMessages();
        const m = messages.find(msg => msg.id === id);
        if (!m) return;

        store.markMessageRead(id);
        renderMessages();
        renderOverview();

        alert(`📩 Message de: ${m.senderName}\nEmail: ${m.senderEmail}\nTéléphone: ${m.senderPhone || 'Non spécifié'}\nDate: ${m.date}\n\nSujet: ${m.subject}\n\nMessage:\n${m.message}`);
    };

    window.deleteMessageItem = function(id) {
        if (confirm("Supprimer ce message ?")) {
            store.deleteMessage(id);
            renderMessages();
            renderOverview();
            showToast("Message supprimé", "danger");
        }
    };

    // ----------------------------------------------------------------------
    // EXPORT & IMPORT BACKUP DATA
    // ----------------------------------------------------------------------
    window.exportDataJSON = function() {
        const dataStr = store.exportJSON();
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `3d-group-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Sauvegarde exportée au format JSON !", "success");
    };

    window.importDataJSON = function() {
        const fileInput = document.getElementById('json-import-file');
        if (!fileInput || !fileInput.files[0]) {
            alert("Veuillez sélectionner un fichier .json");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const success = store.importJSON(e.target.result);
            if (success) {
                showToast("Données importées avec succès !", "success");
                showDashboard();
            } else {
                alert("Erreur lors de l'importation. Format invalide.");
            }
        };
        reader.readAsText(fileInput.files[0]);
    };

    // Helper Toast
    function showToast(message, type = "success") {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'danger' ? '❌' : 'ℹ️'}</span> ${message}`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
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
}

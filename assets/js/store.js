/**
 * Data Store for 3D-GROUPE SARL CMS
 * Manages central data state with LocalStorage persistence and fallback defaults.
 */

const STORAGE_KEY = '3d_group_cms_data_v1';
const AUTH_KEY = '3d_group_admin_auth';

// Default initial dataset
const INITIAL_DATA = {
    siteInfo: {
        companyName: "3D-GROUPE SARL",
        fullName: "Défi pour le Développement Durable Groupe SARL",
        phone1: "+229 01 62 09 87 50",
        phone2: "+229 01 41 56 63 11",
        email: "aimeadjaho2012@gmail.com",
        address: "Cotonou & Régions Agricoles, Bénin",
        heroTitle: "Du foncier, passant par l'exploitation à l'exportation",
        heroSubtitle: "Conception, Structuration et Mise en œuvre de projets agro-pasto-forestiers à forte valeur ajoutée",
        coordinatorName: "Mawougnon Aimé ADJAHO",
        coordinatorTitle: "Coordonnateur Général de 3D-Group SARL",
        coordinatorMessage: "Entrepreneurs, investisseurs et collectivités, nous vous accompagnons pas à pas pour faire de vos projets fonciers et agricoles des réussites durables et hautement rentables au Bénin."
    },
    images: [
        {
            id: "img-1",
            title: "Logo Officiel 3D-GROUPE",
            url: "assets/images/logo.png",
            category: "Branding",
            date: "2026-08-14"
        },
        {
            id: "img-2",
            title: "Plantation de Teck",
            url: "assets/images/project-teck.jpg",
            category: "Foresterie",
            date: "2026-08-14"
        },
        {
            id: "img-3",
            title: "Mawougnon Aimé ADJAHO - Portrait",
            url: "assets/images/aime_adjaho.jpg",
            category: "Équipe",
            date: "2026-08-14"
        },
        {
            id: "img-4",
            title: "Coordonnateur sur le Terrain",
            url: "assets/images/coordinator.jpg",
            category: "Équipe",
            date: "2026-08-14"
        }
    ],
    projects: [
        {
            id: "proj-1",
            title: "Plantation de Teck à Forte Valeur",
            category: "Foresterie",
            location: "Zè / Atlantique, Bénin",
            surface: "50 Hectares",
            image: "assets/images/project-teck.jpg",
            description: "Aménagement foncier et reboisement en teck de haute qualité pour la production de bois d'œuvre et la restauration écologique.",
            status: "En exploitation",
            date: "2023-05-15"
        },
        {
            id: "proj-2",
            title: "Verger d'Anacardier Bio & Agroforesterie",
            category: "Agro-Pastoral",
            location: "Borgou, Bénin",
            surface: "120 Hectares",
            image: "assets/images/coordinator.jpg",
            description: "Culture intensive d'anacarde intégrée à l'élevage et aux cultures vivrières intercalaires pour une rentabilité optimale.",
            status: "En cours",
            date: "2023-11-20"
        },
        {
            id: "proj-3",
            title: "Filière Ananas Pain de Sucre & Export",
            category: "Agriculture",
            location: "Allada / Atlantique, Bénin",
            surface: "35 Hectares",
            image: "assets/images/logo.png",
            description: "Production d'ananas de qualité supérieure respectant les normes phytosanitaires d'exportation vers la sous-région et l'Europe.",
            status: "Actif",
            date: "2024-01-10"
        }
    ],
    team: [
        {
            id: "member-1",
            name: "Mawougnon Aimé ADJAHO",
            role: "Coordonnateur Général & Consultant Senior",
            image: "assets/images/aime_adjaho.jpg",
            bio: "Entrepreneur et Consultant Agricoles; Gestionnaire/Coach en Initiation et Investissement Agricole. Président du RAF-LTA Bénin.",
            phone: "+229 01 62 09 87 50",
            email: "aimeadjaho2012@gmail.com"
        },
        {
            id: "member-2",
            name: "Dr. Pascal K. KOUKPO",
            role: "Directeur des Opérations Forestières",
            image: "assets/images/coordinator.jpg",
            bio: "Ingénieur Agronome Spécialiste en Sylviculture et Restauration des Sols Dégradés avec plus de 15 ans d'expérience.",
            phone: "+229 01 41 56 63 11",
            email: "ops@3d-groupe.bj"
        }
    ],
    services: [
        {
            id: "serv-1",
            title: "Securisation & Aménagement Foncier",
            icon: "🌱",
            summary: "Acquisition sécurisée, délimitation, bornage et valorisation juridique et technique des terres agricoles.",
            description: "Accompagnement complet pour sécuriser votre patrimoine foncier et éviter les litiges d'exploitation au Bénin."
        },
        {
            id: "serv-2",
            title: "Conduite & Gestion d'Exploitations",
            icon: "🚜",
            summary: "Management opérationnel des plantations forestières et fermes agro-pastorales.",
            description: "Mise en place d'itinéraires techniques performants, recrutement des équipes de terrain et suivi rigoureux du rendement."
        },
        {
            id: "serv-3",
            title: "Commercialisation & Exportation",
            icon: "📦",
            summary: "Mise en relation avec les acheteurs et certification pour l'exportation des produits.",
            description: "Valorisation de votre production sur les marchés nationaux et internationaux avec respect des exigences normatives."
        },
        {
            id: "serv-4",
            title: "Conseil, Études & Business Plan",
            icon: "📊",
            summary: "Études de faisabilité technico-économique et montage de dossiers d'investissement.",
            description: "Élaboration de plans d'affaires bancables et accompagnement dans la recherche de financements."
        }
    ],
    messages: [
        {
            id: "msg-1",
            senderName: "Jean-Paul MENDOZA",
            senderEmail: "jp.mendoza@invest-agri.com",
            senderPhone: "+229 97 00 00 11",
            subject: "Demande d'accompagnement sur 20 Ha",
            message: "Bonjour, je souhaite acquérir et aménager 20 Hectares de teck dans la région d'Allada. Merci de me recontacter.",
            date: "2026-08-10 14:30",
            status: "Non lu"
        }
    ]
};

// Data Store Class
class DataStore {
    constructor() {
        this.data = this.loadData();
    }

    loadData() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return {
                    siteInfo: { ...INITIAL_DATA.siteInfo, ...(parsed.siteInfo || {}) },
                    images: parsed.images || INITIAL_DATA.images,
                    projects: parsed.projects || INITIAL_DATA.projects,
                    team: parsed.team || INITIAL_DATA.team,
                    services: parsed.services || INITIAL_DATA.services,
                    messages: parsed.messages || INITIAL_DATA.messages
                };
            }
        } catch (e) {
            console.error("Erreur de chargement du stockage local", e);
        }
        this.saveData(INITIAL_DATA);
        return INITIAL_DATA;
    }

    saveData(newData) {
        this.data = newData || this.data;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
            window.dispatchEvent(new CustomEvent('cms_data_updated', { detail: this.data }));
        } catch (e) {
            console.error("Erreur lors de la sauvegarde", e);
        }
    }

    // Images CRUD
    getImages() { return this.data.images || []; }
    getImageById(id) { return (this.data.images || []).find(img => img.id === id); }
    saveImage(imageData) {
        if (!this.data.images) this.data.images = [];
        if (imageData.id) {
            const index = this.data.images.findIndex(img => img.id === imageData.id);
            if (index !== -1) {
                this.data.images[index] = { ...this.data.images[index], ...imageData };
            }
        } else {
            imageData.id = 'img-' + Date.now();
            imageData.date = new Date().toISOString().split('T')[0];
            this.data.images.unshift(imageData);
        }
        this.saveData();
        return imageData;
    }
    deleteImage(id) {
        if (!this.data.images) return;
        this.data.images = this.data.images.filter(img => img.id !== id);
        this.saveData();
    }

    // Projects CRUD
    getProjects() { return this.data.projects; }
    getProjectById(id) { return this.data.projects.find(p => p.id === id); }
    saveProject(project) {
        if (project.id) {
            const index = this.data.projects.findIndex(p => p.id === project.id);
            if (index !== -1) {
                this.data.projects[index] = { ...this.data.projects[index], ...project };
            }
        } else {
            project.id = 'proj-' + Date.now();
            project.date = new Date().toISOString().split('T')[0];
            this.data.projects.unshift(project);
        }
        this.saveData();
        return project;
    }
    deleteProject(id) {
        this.data.projects = this.data.projects.filter(p => p.id !== id);
        this.saveData();
    }

    // Team CRUD
    getTeam() { return this.data.team; }
    getTeamById(id) { return this.data.team.find(m => m.id === id); }
    saveTeamMember(member) {
        if (member.id) {
            const index = this.data.team.findIndex(m => m.id === member.id);
            if (index !== -1) {
                this.data.team[index] = { ...this.data.team[index], ...member };
            }
        } else {
            member.id = 'member-' + Date.now();
            this.data.team.push(member);
        }
        this.saveData();
        return member;
    }
    deleteTeamMember(id) {
        this.data.team = this.data.team.filter(m => m.id !== id);
        this.saveData();
    }

    // Services CRUD
    getServices() { return this.data.services; }
    getServiceById(id) { return this.data.services.find(s => s.id === id); }
    saveService(service) {
        if (service.id) {
            const index = this.data.services.findIndex(s => s.id === service.id);
            if (index !== -1) {
                this.data.services[index] = { ...this.data.services[index], ...service };
            }
        } else {
            service.id = 'serv-' + Date.now();
            this.data.services.push(service);
        }
        this.saveData();
        return service;
    }
    deleteService(id) {
        this.data.services = this.data.services.filter(s => s.id !== id);
        this.saveData();
    }

    // Site Info CRUD
    getSiteInfo() { return this.data.siteInfo; }
    updateSiteInfo(info) {
        this.data.siteInfo = { ...this.data.siteInfo, ...info };
        this.saveData();
    }

    // Contact Messages
    getMessages() { return this.data.messages; }
    addMessage(msg) {
        const newMsg = {
            id: 'msg-' + Date.now(),
            date: new Date().toLocaleString('fr-FR'),
            status: 'Non lu',
            ...msg
        };
        this.data.messages.unshift(newMsg);
        this.saveData();
        return newMsg;
    }
    markMessageRead(id) {
        const msg = this.data.messages.find(m => m.id === id);
        if (msg) {
            msg.status = 'Lu';
            this.saveData();
        }
    }
    deleteMessage(id) {
        this.data.messages = this.data.messages.filter(m => m.id !== id);
        this.saveData();
    }

    // Auth methods
    isAuthenticated() {
        return localStorage.getItem(AUTH_KEY) === 'true';
    }
    login(username, password) {
        if ((username === 'admin' || username === 'aimeadjaho2012@gmail.com') && password === '3dgroup2026') {
            localStorage.setItem(AUTH_KEY, 'true');
            return true;
        }
        return false;
    }
    logout() {
        localStorage.removeItem(AUTH_KEY);
    }

    // Export & Import
    exportJSON() {
        return JSON.stringify(this.data, null, 2);
    }
    importJSON(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            if (parsed.siteInfo && parsed.projects) {
                this.saveData(parsed);
                return true;
            }
        } catch (e) {
            console.error("Format JSON invalide", e);
        }
        return false;
    }

    resetToDefault() {
        this.saveData(INITIAL_DATA);
    }
}

// Global Singleton Instance
window.cmsStore = new DataStore();

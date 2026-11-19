/**
 * Data Store for 3D-GROUPE SARL CMS
 * Manages central data state with LocalStorage persistence and fallback defaults.
 */

const STORAGE_KEY = '3d_group_cms_data_v2';
const AUTH_KEY = '3d_group_admin_auth';

// Nettoyer l'ancien cache obsolète v1 pour forcer le chargement des 34 projets
try {
    if (localStorage.getItem('3d_group_cms_data_v1')) {
        localStorage.removeItem('3d_group_cms_data_v1');
    }
} catch(e) {}


// Default initial dataset
const INITIAL_DATA = {
    siteInfo: {
        companyName: "3D-GROUPE SARL",
        fullName: "Défi pour le Développement Durable Groupe SARL",
        phone1: "+229 01 62 09 87 50",
        phone2: "+229 01 41 56 63 11",
        email: "aimeadjaho2012@gmail.com",
        address: "Ouèdo, Abomey-Calavi, République du Bénin",
        heroTitle: "Du foncier, passant par l'exploitation à l'exportation",
        heroSubtitle: "Conception, Structuration et Mise en œuvre de projets agro-pasto-forestiers à forte valeur ajoutée",
        coordinatorName: "Mawougnon Aimé ADJAHO",
        coordinatorTitle: "Coordonnateur Général de 3D-GROUPE SARL",
        coordinatorMessage: "Entrepreneurs, investisseurs et collectivités, nous vous accompagnons pas à pas pour faire de vos projets fonciers et agricoles des réussites durables et hautement rentables au Bénin."
    },
    pages: [
        {
            id: "page-home-fr",
            filename: "index.html",
            lang: "FR",
            title: "Accueil",
            seoTitle: "3D-GROUPE SARL | Projets Agro-Pasto-Forestiers",
            seoDescription: "Défi pour le Développement Durable Groupe SARL (3D-GROUPE SARL). Expert en projets agricoles et forestiers durables au Bénin.",
            heroTitle: "Du foncier, passant par l'exploitation à l'exportation",
            heroSubtitle: "Conception, Structuration et Mise en œuvre de projets agro-pasto-forestiers à forte valeur ajoutée",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-about-fr",
            filename: "about.html",
            lang: "FR",
            title: "À Propos",
            seoTitle: "À Propos | 3D-GROUPE SARL",
            seoDescription: "Présentation de 3D-GROUPE SARL, notre mission, vision et engagements durables au Bénin.",
            heroTitle: "Notre Entreprise",
            heroSubtitle: "Une équipe d'experts dédiée au développement d'un secteur agricole et forestier moderne et rentable.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-services-fr",
            filename: "services.html",
            lang: "FR",
            title: "Nos Services",
            seoTitle: "Nos Services | 3D-GROUPE SARL",
            seoDescription: "Découvrez notre chaîne complète de services : acquisition foncière, aménagement, sylviculture et valorisation.",
            heroTitle: "Nos Services Clés",
            heroSubtitle: "Un accompagnement intégré clé en main du foncier jusqu'à l'exportation.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-methodology-fr",
            filename: "methodology.html",
            lang: "FR",
            title: "Méthodologie",
            seoTitle: "Notre Méthodologie | 3D-GROUPE SARL",
            seoDescription: "Découvrez la démarche rigoureuse en 6 étapes de 3D-GROUPE SARL pour sécuriser et rentabiliser vos projets.",
            heroTitle: "Notre Démarche Méthodologique",
            heroSubtitle: "De l'analyse stratégique initiale jusqu'à l'exportation : une méthodologie éprouvée en 6 jalons clés.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-projects-fr",
            filename: "projects.html",
            lang: "FR",
            title: "Réalisations",
            seoTitle: "Nos Réalisations | 3D-GROUPE SARL",
            seoDescription: "Galerie de nos projets agro-forestiers : plantations de teck, vergers, pépinières et sécurisation foncière.",
            heroTitle: "Nos Réalisations",
            heroSubtitle: "Découvrez nos projets forestiers et agricoles à travers le Bénin.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-team-fr",
            filename: "team.html",
            lang: "FR",
            title: "Équipe",
            seoTitle: "Notre Équipe | 3D-GROUPE SARL",
            seoDescription: "Direction générale, consultants et experts techniques de 3D-GROUPE SARL.",
            heroTitle: "Notre Équipe",
            heroSubtitle: "Une expertise reconnue au service du développement durable.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-contact-fr",
            filename: "contact.html",
            lang: "FR",
            title: "Contact",
            seoTitle: "Contactez-nous | 3D-GROUPE SARL",
            seoDescription: "Contactez 3D-GROUPE SARL pour discuter de votre projet agricole ou foncier au Bénin.",
            heroTitle: "Contactez-nous",
            heroSubtitle: "Discutons de votre projet et trouvons ensemble les meilleures solutions.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        // English Version
        {
            id: "page-home-en",
            filename: "en/index.html",
            lang: "EN",
            title: "Home",
            seoTitle: "3D-GROUPE SARL | Agro-Forestry Projects",
            seoDescription: "Sustainable agro-forestry and land investment specialist in Benin.",
            heroTitle: "From land acquisition to harvest and export",
            heroSubtitle: "Design, Structuring, and Execution of high-yield agro-forestry ventures",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-about-en",
            filename: "en/about.html",
            lang: "EN",
            title: "About Us",
            seoTitle: "About Us | 3D-GROUPE SARL",
            seoDescription: "About 3D-GROUPE SARL, our mission, vision and commitments in Benin.",
            heroTitle: "About Our Company",
            heroSubtitle: "A team of proven experts committed to high-return, sustainable forestry.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-services-en",
            filename: "en/services.html",
            lang: "EN",
            title: "Our Services",
            seoTitle: "Our Services | 3D-GROUPE SARL",
            seoDescription: "Full value-chain services: land banking, plantation management, timber export.",
            heroTitle: "Key Services",
            heroSubtitle: "Integrated turn-key solutions for investors and institutions.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-methodology-en",
            filename: "en/methodology.html",
            lang: "EN",
            title: "Methodology",
            seoTitle: "Our Methodology | 3D-GROUPE SARL",
            seoDescription: "Discover 3D-GROUPE SARL's 6-step rigorous framework for sustainable investments.",
            heroTitle: "Our Methodological Framework",
            heroSubtitle: "From strategic land feasibility to global timber export: a proven, end-to-end framework.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-projects-en",
            filename: "en/projects.html",
            lang: "EN",
            title: "Projects",
            seoTitle: "Our Projects | 3D-GROUPE SARL",
            seoDescription: "Gallery of agroforestry projects across Benin.",
            heroTitle: "Our Realizations",
            heroSubtitle: "Explore our successful forestry and agricultural investments across Benin.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-team-en",
            filename: "en/team.html",
            lang: "EN",
            title: "Team",
            seoTitle: "Our Team | 3D-GROUPE SARL",
            seoDescription: "Meet the executive and technical experts of 3D-GROUPE SARL.",
            heroTitle: "Our Team",
            heroSubtitle: "Recognized field expertise driving sustainable agro-forestry forward.",
            status: "En ligne",
            lastModified: "2026-11-19"
        },
        {
            id: "page-contact-en",
            filename: "en/contact.html",
            lang: "EN",
            title: "Contact",
            seoTitle: "Contact Us | 3D-GROUPE SARL",
            seoDescription: "Contact 3D-GROUPE SARL to discuss your agricultural investment project in Benin.",
            heroTitle: "Contact Us",
            heroSubtitle: "Let's discuss your project and architect optimal technical solutions together.",
            status: "En ligne",
            lastModified: "2026-11-19"
        }
    ],
    images: [
        {
            id: "img-1",
            title: "Logo Officiel 3D-GROUPE",
            url: "assets/images/logo.webp",
            category: "Branding",
            date: "2026-11-19"
        },
        {
            id: "img-2",
            title: "Plantation de Teck",
            url: "assets/images/project-teck.webp",
            category: "Foresterie",
            date: "2026-11-19"
        },
        {
            id: "img-3",
            title: "Mawougnon Aimé ADJAHO - Portrait",
            url: "assets/images/aime_adjaho.webp",
            category: "Équipe",
            date: "2026-11-19"
        },
        {
            id: "img-4",
            title: "Coordonnateur sur le Terrain",
            url: "assets/images/coordinator.webp",
            category: "Équipe",
            date: "2026-11-19"
        }
    ],
    projects: [
        {
                "id": "proj-1",
                "title": "Plantation de Teck",
                "category": "Foresterie",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-teck.webp",
                "description": "Réalisation et suivi technique de projet - Plantation de Teck",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-2",
                "title": "Capital Foncier",
                "category": "Études",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-foncier-new.webp",
                "description": "Réalisation et suivi technique de projet - Capital Foncier",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-3",
                "title": "Valorisation de Bois",
                "category": "Exploitation",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-valorisation.webp",
                "description": "Réalisation et suivi technique de projet - Valorisation de Bois",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-4",
                "title": "Opération de repiquage",
                "category": "Pépinière",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-travaux.webp",
                "description": "Réalisation et suivi technique de projet - Opération de repiquage",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-5",
                "title": "Planches de pépinières",
                "category": "Production",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-pepiniere-1.webp",
                "description": "Réalisation et suivi technique de projet - Planches de pépinières",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-6",
                "title": "Culture Vivrière (Maïs)",
                "category": "Agriculture",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-mais-2.webp",
                "description": "Réalisation et suivi technique de projet - Culture Vivrière (Maïs)",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-7",
                "title": "Jeunes Plants de Lauriers",
                "category": "Foresterie",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-feuilles.webp",
                "description": "Réalisation et suivi technique de projet - Jeunes Plants de Lauriers",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-8",
                "title": "Jeunes Plants d'Orangers",
                "category": "Pépinière",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-pepiniere-2.webp",
                "description": "Réalisation et suivi technique de projet - Jeunes Plants d'Orangers",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-9",
                "title": "Lancement campagne de Reboisement /Rotary 2025",
                "category": "Partenariat",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_1.webp",
                "description": "Réalisation et suivi technique de projet - Lancement campagne de Reboisement /Rotary 2025",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-10",
                "title": "Mise en terre de plants",
                "category": "Terrain",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_2.webp",
                "description": "Réalisation et suivi technique de projet - Mise en terre de plants",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-11",
                "title": "Opération de reboisement",
                "category": "Technique",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_3.webp",
                "description": "Réalisation et suivi technique de projet - Opération de reboisement",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-12",
                "title": "Action de mise en terre",
                "category": "Environnement",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_5.webp",
                "description": "Réalisation et suivi technique de projet - Action de mise en terre",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-13",
                "title": "Controle technique sur le terrain",
                "category": "Expertise",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_6.webp",
                "description": "Réalisation et suivi technique de projet - Controle technique sur le terrain",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-14",
                "title": "Travail d'Équipe Solidaire",
                "category": "Communauté",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_7.webp",
                "description": "Réalisation et suivi technique de projet - Travail d'Équipe Solidaire",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-15",
                "title": "Visite de Site Partenariale",
                "category": "Partenariat",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_8.webp",
                "description": "Réalisation et suivi technique de projet - Visite de Site Partenariale",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-16",
                "title": "Engagement Communautaire",
                "category": "Engagement",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_9.webp",
                "description": "Réalisation et suivi technique de projet - Engagement Communautaire",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-17",
                "title": "Formation Pratique",
                "category": "Formation",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_10.webp",
                "description": "Réalisation et suivi technique de projet - Formation Pratique",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-18",
                "title": "Visite de site de pépinière",
                "category": "Production",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_11.webp",
                "description": "Réalisation et suivi technique de projet - Visite de site de pépinière",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-19",
                "title": "Prospection Forestière",
                "category": "Terrain",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_12.webp",
                "description": "Réalisation et suivi technique de projet - Prospection Forestière",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-20",
                "title": "Expertise Technique",
                "category": "Expertise",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_13.webp",
                "description": "Réalisation et suivi technique de projet - Expertise Technique",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-21",
                "title": "Formation et Encadrement",
                "category": "Formation",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_14.webp",
                "description": "Réalisation et suivi technique de projet - Formation et Encadrement",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-22",
                "title": "Consultation Terrain",
                "category": "Conseil",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_15.webp",
                "description": "Réalisation et suivi technique de projet - Consultation Terrain",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-23",
                "title": "Jeunes plants de teck en pépinière",
                "category": "Production",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-upload-1.webp",
                "description": "Réalisation et suivi technique de projet - Jeunes plants de teck en pépinière",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-24",
                "title": "Stock de Bois de Teck",
                "category": "Exploitation",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-upload-2.webp",
                "description": "Réalisation et suivi technique de projet - Stock de Bois de Teck",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-25",
                "title": "Plantations de bananiers plantin",
                "category": "Terrain",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-upload-3.webp",
                "description": "Réalisation et suivi technique de projet - Plantations de bananiers plantin",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-26",
                "title": "Billes de Teck",
                "category": "Industrie",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-upload-4.webp",
                "description": "Réalisation et suivi technique de projet - Billes de Teck",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-27",
                "title": "Plantation de Bananiers",
                "category": "Agriculture",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-upload-5.webp",
                "description": "Réalisation et suivi technique de projet - Plantation de Bananiers",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-28",
                "title": "Opération de requetage pour système Agro-Forestier",
                "category": "Terrain",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-requetage-final.webp",
                "description": "Réalisation et suivi technique de projet - Opération de requetage pour système Agro-Forestier",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-29",
                "title": "Site de production de pépinière de jeunes plans forestiers (Teck et Gmelina)",
                "category": "Production",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_upload_7.webp",
                "description": "Réalisation et suivi technique de projet - Site de production de pépinière de jeunes plans forestiers (Teck et Gmelina)",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-30",
                "title": "Jeunes plans de Gmelina arborea",
                "category": "Production",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project_upload_8.webp",
                "description": "Réalisation et suivi technique de projet - Jeunes plans de Gmelina arborea",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-31",
                "title": "Opération de délimitation",
                "category": "Terrain",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-delimitation.webp",
                "description": "Réalisation et suivi technique de projet - Opération de délimitation",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-32",
                "title": "Opération de prises de mesures",
                "category": "Terrain",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-mesures.webp",
                "description": "Réalisation et suivi technique de projet - Opération de prises de mesures",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-33",
                "title": "Plantations de cocotiers",
                "category": "Agriculture",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-cocotiers.webp",
                "description": "Réalisation et suivi technique de projet - Plantations de cocotiers",
                "status": "Réalisé",
                "date": "2024-01-01"
        },
        {
                "id": "proj-34",
                "title": "Opération de mise en terre d'un jeune plan de teck",
                "category": "Foresterie",
                "location": "Bénin",
                "surface": "",
                "image": "assets/images/project-teck-jeune.webp",
                "description": "Réalisation et suivi technique de projet - Opération de mise en terre d'un jeune plan de teck",
                "status": "Réalisé",
                "date": "2024-01-01"
        }
],
    team: [
        {
            id: "member-1",
            name: "Mawougnon Aimé ADJAHO",
            role: "Coordonnateur Général & Consultant Senior",
            image: "assets/images/aime_adjaho.webp",
            bio: "Entrepreneur et Consultant Agricole; Spécialiste en investissement agro-forestier et sécurisation foncière. Président du RAF-LTA Bénin.",
            phone: "+229 01 62 09 87 50",
            email: "aimeadjaho2012@gmail.com"
        }
    ],
    services: [
        {
            id: "serv-1",
            title: "Sécurisation & Aménagement Foncier",
            icon: "🌱",
            summary: "Acquisition sécurisée, délimitation, bornage et valorisation juridique et technique des terres agricoles.",
            description: "Accompagnement complet pour sécuriser votre patrimoine foncier et éviter les litiges d'exploitation au Bénin."
        },
        {
            id: "serv-2",
            title: "Installation & Gestion de Plantations",
            icon: "🌲",
            summary: "Mise en place et management opérationnel des plantations forestières et fruitières.",
            description: "Itinéraires techniques performants, trouaison, piquetage, suivi sylvicole rigoureux et monitoring par drone."
        },
        {
            id: "serv-3",
            title: "Exploitation Forestière & Exportation",
            icon: "🚢",
            summary: "Coupe raisonnée, transformation locale et mise en relation directe avec les acheteurs internationaux.",
            description: "Valorisation optimale de vos bois d'œuvre sur les marchés nationaux et internationaux dans le respect des normes."
        },
        {
            id: "serv-4",
            title: "Ingénierie de Projet & Business Plan",
            icon: "📊",
            summary: "Études de faisabilité technico-économique et montage de dossiers d'investissement bancables.",
            description: "Élaboration de plans d'affaires complets, modélisation de rentabilité et accompagnement pour levées de capitaux."
        }
    ],
    messages: []
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
                const parsed = JSON.parse(stored.replace(/(assets\/images\/[^"]+?)\.(?:jpe?g|png)"/gi, '$1.webp"'));
                return {
                    siteInfo: { ...INITIAL_DATA.siteInfo, ...(parsed.siteInfo || {}) },
                    pages: parsed.pages && parsed.pages.length > 0 ? parsed.pages : INITIAL_DATA.pages,
                    images: parsed.images || INITIAL_DATA.images,
                    projects: (parsed.projects && parsed.projects.length >= 30) ? parsed.projects : INITIAL_DATA.projects,
                    team: parsed.team && parsed.team.length > 0 ? parsed.team : INITIAL_DATA.team,
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

    // ==========================================
    // PAGES CRUD (Gestion de toutes les pages)
    // ==========================================
    getPages() {
        return this.data.pages || INITIAL_DATA.pages;
    }

    getPageById(id) {
        return (this.data.pages || INITIAL_DATA.pages).find(p => p.id === id);
    }

    getPageByFilename(filename) {
        const clean = filename.replace(/^\//, '');
        return (this.data.pages || INITIAL_DATA.pages).find(p => p.filename === clean || p.filename.endsWith(clean));
    }

    savePage(pageData) {
        if (!this.data.pages) this.data.pages = [...INITIAL_DATA.pages];
        pageData.lastModified = new Date().toISOString().split('T')[0];

        if (pageData.id) {
            const index = this.data.pages.findIndex(p => p.id === pageData.id);
            if (index !== -1) {
                this.data.pages[index] = { ...this.data.pages[index], ...pageData };
            } else {
                this.data.pages.push(pageData);
            }
        } else {
            pageData.id = 'page-' + Date.now();
            this.data.pages.push(pageData);
        }
        this.saveData();
        return pageData;
    }

    deletePage(id) {
        if (!this.data.pages) return;
        this.data.pages = this.data.pages.filter(p => p.id !== id);
        this.saveData();
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
    getMessages() { return this.data.messages || []; }
    addMessage(msg) {
        if (!this.data.messages) this.data.messages = [];
        const newMsg = {
            id: 'msg-' + Date.now(),
            date: new Date().toLocaleString('fr-FR', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit'
            }),
            status: 'Non lu',
            ...msg
        };
        this.data.messages.unshift(newMsg);
        this.saveData();
        return newMsg;
    }
    markMessageRead(id) {
        const msg = (this.data.messages || []).find(m => m.id === id);
        if (msg) {
            msg.status = 'Lu';
            this.saveData();
        }
    }
    deleteMessage(id) {
        if (!this.data.messages) return;
        this.data.messages = this.data.messages.filter(m => m.id !== id);
        this.saveData();
    }

    // Auth methods
    isAuthenticated() {
        return localStorage.getItem(AUTH_KEY) === 'true';
    }
    login(username, password) {
        const u = (username || '').trim().toLowerCase();
        const p = (password || '').trim();
        if ((u === 'admin' || u === 'aimeadjaho2012@gmail.com') && (p === '3dgroup2026' || p === '3DGROUP2026')) {
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
            if (parsed.siteInfo && (parsed.projects || parsed.pages)) {
                this.saveData(parsed);
                return true;
            }
        } catch (e) {
            console.error("Format JSON invalide", e);
        }
        return false;
    }


    syncRealProjects() {
        this.data.projects = JSON.parse(JSON.stringify(INITIAL_DATA.projects));
        this.saveData();
        return this.data.projects;
    }

    resetToDefault() {
        this.saveData(INITIAL_DATA);
    }
}

// Global Singleton Instance
window.cmsStore = new DataStore();

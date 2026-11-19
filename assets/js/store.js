/**
 * Data Store for 3D-GROUPE SARL CMS
 * Manages central data state with LocalStorage persistence and fallback defaults.
 */

const STORAGE_KEY = '3d_group_cms_data_v2';
const AUTH_KEY = '3d_group_admin_auth';

// Nettoyer l'ancien cache obsolète v1
try {
    if (localStorage.getItem('3d_group_cms_data_v1')) {
        localStorage.removeItem('3d_group_cms_data_v1');
    }
} catch(e) {}

// Master initial dataset
const INITIAL_DATA = {
    "siteInfo": {
        "companyName": "3D-GROUPE SARL",
        "fullName": "Défi pour le Développement Durable Groupe SARL",
        "phone1": "+229 01 62 09 87 50",
        "phone2": "+229 01 41 56 63 11",
        "email": "aimeadjaho2012@gmail.com",
        "address": "Ouèdo, Abomey-Calavi, République du Bénin",
        "heroTitle": "Du foncier, passant par l'exploitation à l'exportation",
        "heroSubtitle": "Conception, Structuration et Mise en œuvre de projets agro-pasto-forestiers à forte valeur ajoutée",
        "coordinatorName": "Mawougnon Aimé ADJAHO",
        "coordinatorTitle": "Coordonnateur Général de 3D-GROUPE SARL",
        "coordinatorImage": "assets/images/coordinator.webp",
        "coordinatorMessage": "Bienvenue chez 3D-GROUPE SARL. Là où la terre, l’expertise et la vision d’investissement se rencontrent pour donner naissance à des projets agro-pasto-forestiers durables et créateurs de valeur.",
        "coreBusiness": "Nous intervenons sur toute la chaîne de valeur des projets agroforestiers, avec un accent particulier sur la production forestière (bois d’oeuvre, bois de service, plantations industrielles). Notre rôle consiste à transformer une vision d’investissement en un projet concret, techniquement fiable, juridiquement sécurisé et économiquement rentable."
    },
    "pages": [
        {
            "id": "page-home-fr",
            "filename": "index.html",
            "lang": "FR",
            "title": "Accueil",
            "seoTitle": "3D-GROUPE SARL | Projets Agro-Pasto-Forestiers",
            "seoDescription": "Défi pour le Développement Durable Groupe SARL (3D-GROUPE SARL). Expert en projets agricoles et forestiers durables au Bénin.",
            "heroTitle": "Du foncier, passant par l'exploitation à l'exportation",
            "heroSubtitle": "Conception, Structuration et Mise en œuvre de projets agro-pasto-forestiers à forte valeur ajoutée",
            "heroImage": "assets/images/hero-drone.webp",
            "mainContent": "Bienvenue chez 3D-GROUPE SARL. Là où la terre, l’expertise et la vision d’investissement se rencontrent pour donner naissance à des projets agro-pasto-forestiers durables et créateurs de valeur.",
            "extraContent": "De l’identification et la sécurisation du foncier à la réalisation opérationnelle sur le terrain, notre approche globale transforme les opportunités en projets concrets, viables et porteurs d’impact durable pour les territoires et les communautés.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-about-fr",
            "filename": "about.html",
            "lang": "FR",
            "title": "À Propos",
            "seoTitle": "À Propos | 3D-GROUPE SARL",
            "seoDescription": "Présentation de 3D-GROUPE SARL, notre mission, vision et engagements durables au Bénin.",
            "heroTitle": "Notre Entreprise",
            "heroSubtitle": "Une expertise reconnue au service du développement durable.",
            "heroImage": "assets/images/project-teck.webp",
            "mainContent": "3D-GROUPE SARL est une entreprise spécialisée dans l'ingénierie, la structuration et la conduite opérationnelle de projets agro-pasto-forestiers durables en République du Bénin.",
            "extraContent": "Notre Vision : Être le partenaire de référence en Afrique de l'Ouest pour la valorisation durable du capital foncier et forestier, en conjuguant rentabilité pour les investisseurs et impact écologique positif.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-services-fr",
            "filename": "services.html",
            "lang": "FR",
            "title": "Nos Services",
            "seoTitle": "Nos Services | 3D-GROUPE SARL",
            "seoDescription": "Découvrez notre chaîne complète de services : acquisition foncière, aménagement, sylviculture et valorisation.",
            "heroTitle": "Nos Services",
            "heroSubtitle": "Une expertise complète pour sécuriser et rentabiliser vos investissements agro-forestiers.",
            "heroImage": "assets/images/header-services.webp",
            "mainContent": "À 3D-GROUPE SARL, nous mettons à votre disposition une expertise complète pour concevoir, sécuriser et mettre en œuvre des projets agro-pasto-forestiers performants et durables.",
            "extraContent": "Nos 5 domaines clés : Conception et études de faisabilité, Sécurisation foncière, Installation et conduite de plantations, Exploitation et valorisation de bois, Accompagnement des unités de transformation.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-methodology-fr",
            "filename": "methodology.html",
            "lang": "FR",
            "title": "Méthodologie",
            "seoTitle": "Notre Méthodologie | 3D-GROUPE SARL",
            "seoDescription": "Découvrez la démarche rigoureuse en 6 étapes de 3D-GROUPE SARL pour sécuriser et rentabiliser vos projets.",
            "heroTitle": "Notre Démarche Méthodologique",
            "heroSubtitle": "De l'analyse stratégique initiale jusqu'à l'exportation : une méthodologie éprouvée en 6 jalons clés.",
            "heroImage": "assets/images/project-delimitation.webp",
            "mainContent": "Un accompagnement structuré en 6 jalons clés : Diagnostic agro-écologique, Sécurisation foncière contradictoire, Ingénierie financière bancable, Planting aux normes sylvicoles, Conduite et suivi par drone, Exploitation et export sans intermédiaire.",
            "extraContent": "Chaque étape est validée par des livrables concrets garantissant la sécurité des capitaux investis et l'excellence opérationnelle sur le terrain.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-projects-fr",
            "filename": "projects.html",
            "lang": "FR",
            "title": "Réalisations",
            "seoTitle": "Nos Réalisations | 3D-GROUPE SARL",
            "seoDescription": "Galerie de nos projets agro-forestiers : plantations de teck, vergers, pépinières et sécurisation foncière.",
            "heroTitle": "Nos Réalisations",
            "heroSubtitle": "Découvrez nos projets forestiers et agricoles à travers le Bénin.",
            "heroImage": "assets/images/header-projects.webp",
            "mainContent": "À 3D-GROUPE SARL, nos réalisations témoignent de notre expertise et de notre engagement en faveur d’un développement agricole et forestier durable.",
            "extraContent": "Plus de 30 chantiers menés à bien : plantations de teck à haute valeur marchande, pépinières certifiées, parcelles d'anacardier et périmètres agroforestiers sécurisés.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-team-fr",
            "filename": "team.html",
            "lang": "FR",
            "title": "Équipe",
            "seoTitle": "Notre Équipe | 3D-GROUPE SARL",
            "seoDescription": "Direction générale, consultants et experts techniques de 3D-GROUPE SARL.",
            "heroTitle": "L'Équipe Dirigeante",
            "heroSubtitle": "Une expertise reconnue au service du développement durable.",
            "heroImage": "assets/images/header-team.webp",
            "mainContent": "Une équipe de praticiens chevronnés combinant rigueur agronomique, maîtrise du droit foncier béninois et vision stratégique d'investissement.",
            "extraContent": "Direction assurée par Mawougnon Aimé ADJAHO, Coordonnateur Général, Président du RAF-LTA Bénin et membre actif des réseaux d'entrepreneurs d'Afrique de l'Ouest.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-contact-fr",
            "filename": "contact.html",
            "lang": "FR",
            "title": "Contact",
            "seoTitle": "Contactez-nous | 3D-GROUPE SARL",
            "seoDescription": "Contactez 3D-GROUPE SARL pour discuter de votre projet agricole ou foncier au Bénin.",
            "heroTitle": "Contactez-nous",
            "heroSubtitle": "Discutons de votre projet et trouvons ensemble les meilleures solutions.",
            "heroImage": "assets/images/hero-bg.webp",
            "mainContent": "Siège : Ouèdo, Abomey-Calavi, République du Bénin. Téléphones : +229 01 62 09 87 50 / +229 01 41 56 63 11. Email officiel : aimeadjaho2012@gmail.com.",
            "extraContent": "Discutez directement avec nos consultants via WhatsApp ou complétez le formulaire de demande de projet pour un retour sous 24h ouvrées.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-home-en",
            "filename": "en/index.html",
            "lang": "EN",
            "title": "Home",
            "seoTitle": "3D-GROUPE SARL | Agro-Forestry Projects",
            "seoDescription": "Sustainable agro-forestry and land investment specialist in Benin.",
            "heroTitle": "From land acquisition to harvest and export",
            "heroSubtitle": "Design, Structuring, and Execution of high-yield agro-forestry ventures",
            "heroImage": "../assets/images/hero-drone.webp",
            "mainContent": "Welcome to 3D-GROUPE SARL. Where land tenure, agronomic excellence and investment vision converge to create high-value, sustainable agro-forestry projects.",
            "extraContent": "From tenure securitization to field operations, our integrated methodology turns African land opportunities into bankable, resilient agricultural assets.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-about-en",
            "filename": "en/about.html",
            "lang": "EN",
            "title": "About Us",
            "seoTitle": "About Us | 3D-GROUPE SARL",
            "seoDescription": "About 3D-GROUPE SARL, our mission, vision and commitments in Benin.",
            "heroTitle": "About Our Company",
            "heroSubtitle": "A team of proven experts committed to high-return, sustainable forestry.",
            "heroImage": "../assets/images/project-teck.webp",
            "mainContent": "3D-GROUPE SARL is a premier engineering and operations firm dedicated to structuring and managing sustainable agro-forestry investments in Benin.",
            "extraContent": "Our Vision: To become West Africa's leading benchmark in responsible land development and commercial timber cultivation.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-services-en",
            "filename": "en/services.html",
            "lang": "EN",
            "title": "Our Services",
            "seoTitle": "Our Services | 3D-GROUPE SARL",
            "seoDescription": "Full value-chain services: land banking, plantation management, timber export.",
            "heroTitle": "Our Services",
            "heroSubtitle": "Integrated turn-key solutions to secure and maximize your agro-forestry investments.",
            "heroImage": "../assets/images/header-services.webp",
            "mainContent": "We provide investors and institutions with complete end-to-end management: project design, land title verification, seedling supply, planting, and export connection.",
            "extraContent": "5 Core Competencies: Project Engineering & Business Planning, Land Securitization, Plantation Setup & Stewardship, Timber Harvesting & Processing, Sawmill Advisory.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-methodology-en",
            "filename": "en/methodology.html",
            "lang": "EN",
            "title": "Methodology",
            "seoTitle": "Our Methodology | 3D-GROUPE SARL",
            "seoDescription": "Discover 3D-GROUPE SARL's 6-step rigorous framework for sustainable investments.",
            "heroTitle": "Our Methodological Framework",
            "heroSubtitle": "From strategic land feasibility to global timber export: a proven, end-to-end framework.",
            "heroImage": "../assets/images/project-delimitation.webp",
            "mainContent": "A rigorous 6-stage execution framework: Agro-ecological Feasibility, Tenure Securitization, Financial Structuring, Field Planting Operations, Drone Monitoring, Global Export Off-take.",
            "extraContent": "Every milestone is verified with auditable technical deliverables, guaranteeing investor capital security and high timber survival rates.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-projects-en",
            "filename": "en/projects.html",
            "lang": "EN",
            "title": "Projects",
            "seoTitle": "Our Projects | 3D-GROUPE SARL",
            "seoDescription": "Gallery of agroforestry projects across Benin.",
            "heroTitle": "Our Realizations",
            "heroSubtitle": "Explore our successful forestry and agricultural investments across Benin.",
            "heroImage": "../assets/images/header-projects.webp",
            "mainContent": "3D-GROUPE SARL's track record illustrates our technical rigor and deep commitment to productive, sustainable forestry assets.",
            "extraContent": "Over 30 field realizations: high-grade teak plantations, certified nurseries, cashew orchards, and legally cleared emphyteutic leases.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-team-en",
            "filename": "en/team.html",
            "lang": "EN",
            "title": "Team",
            "seoTitle": "Our Team | 3D-GROUPE SARL",
            "seoDescription": "Meet the executive and technical experts of 3D-GROUPE SARL.",
            "heroTitle": "Leadership & Technical Team",
            "heroSubtitle": "Recognized field expertise driving sustainable agro-forestry forward.",
            "heroImage": "../assets/images/header-team.webp",
            "mainContent": "A multidisciplinary team combining agronomic rigor, cadastral legal expertise, and investment management acumen.",
            "extraContent": "Led by Mawougnon Aimé ADJAHO, Managing Director, President of RAF-LTA Benin, and seasoned coach in agricultural entrepreneurship.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-contact-en",
            "filename": "en/contact.html",
            "lang": "EN",
            "title": "Contact",
            "seoTitle": "Contact Us | 3D-GROUPE SARL",
            "seoDescription": "Contact 3D-GROUPE SARL to discuss your agricultural investment project in Benin.",
            "heroTitle": "Contact Us",
            "heroSubtitle": "Let's discuss your project and architect optimal technical solutions together.",
            "heroImage": "../assets/images/hero-bg.webp",
            "mainContent": "Headquarters: Ouèdo, Abomey-Calavi, Republic of Benin. Phone: +229 01 62 09 87 50 / +229 01 41 56 63 11. Official Email: aimeadjaho2012@gmail.com.",
            "extraContent": "Reach our senior consultants via WhatsApp or submit your project inquiry online for a response within 24 business hours.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        }
    ],
    "services": [
        {
            "id": "serv-1",
            "title": "Conception, planification et rédaction de projets",
            "icon": "📐",
            "summary": "Élaboration de projets agro-pasto-forestiers sur mesure, études techniques, économiques et dossiers bancables.",
            "description": "Nous intervenons dès l'amont pour formaliser votre vision d'investissement : études de faisabilité agro-écologique, modélisation financière pluriannuelle, plans d'affaires bancables et sécurisation de toutes les démarches administratives."
        },
        {
            "id": "serv-2",
            "title": "Foncier : acquisition, location ou sécurisation du capital terre",
            "icon": "📍",
            "summary": "Identification de terres propices, négociation et sécurisation juridique intégrale (titres, baux, TF).",
            "description": "Prospection ciblée dans les bassins agroécologiques les plus favorables, enquêtes de commodo/incommodo, levés topographiques contradictoires et obtention des actes officiels pour une exploitation sans aucun litige."
        },
        {
            "id": "serv-3",
            "title": "Installation et gestion des plantations forestières et fruitières",
            "icon": "🌲",
            "summary": "Reboisement et valorisation des essences à haute valeur économique (teck, gmelina, anacarde).",
            "description": "Préparation mécanisée ou manuelle des sols, fourniture de plants certifiés vigoureux, mise en terre aux normes sylvicoles strictes, pare-feux, élagage et suivi sanitaire régulier avec cartographie par drone."
        },
        {
            "id": "serv-4",
            "title": "Exploitation forestière et valorisation",
            "icon": "🪵",
            "summary": "Aménagement, coupe raisonnée, cubage et commercialisation pour le marché local et l'exportation.",
            "description": "Optimisation des rendements de vos parcelles matures : planification des coupes à blanc ou d'éclaircie, cubage rigoureux, transformation en billes/sciages et mise en relation directe avec les acheteurs industriels internationaux."
        },
        {
            "id": "serv-5",
            "title": "Accompagnement des entreprises de transformation (Scieries étrangères)",
            "icon": "🏭",
            "summary": "Appui technique, juridique et logistique pour les industriels du bois s'installant au Bénin.",
            "description": "Assistance clé en main pour l'implantation d'unités de sciage : mise en conformité administrative, accès prioritaire à des ressources forestières certifiées, structuration de chaînes d'approvisionnement fiables et recrutement d'équipes locales."
        }
    ],
    "team": [
        {
            "id": "member-1",
            "name": "Mawougnon Aimé ADJAHO",
            "role": "Coordonnateur Général de 3D-Group SARL",
            "image": "assets/images/aime_adjaho.webp",
            "phone": "+229 01 62 09 87 50",
            "email": "aimeadjaho2012@gmail.com",
            "bio": "Entrepreneur et Consultant Agricoles; Gestionnaire/Coach en Initiation et Investissement Agricole. Président du RAF-LTA Bénin, Secrétaire Général de la CJES Bénin et membre actif du Rotary Club Cotonou Rive Gauche. Expert en structuration de projets agro-forestiers et gestion durable des ressources naturelles au Bénin."
        }
    ],
    "projects": [
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
    "images": [
        {
            "id": "img-1",
            "title": "Logo Officiel 3D-GROUPE",
            "url": "assets/images/logo.webp",
            "category": "Branding",
            "date": "2026-11-19"
        },
        {
            "id": "img-2",
            "title": "Plantation de Teck",
            "url": "assets/images/project-teck.webp",
            "category": "Foresterie",
            "date": "2026-11-19"
        },
        {
            "id": "img-3",
            "title": "Mawougnon Aimé ADJAHO - Portrait",
            "url": "assets/images/aime_adjaho.webp",
            "category": "Équipe",
            "date": "2026-11-19"
        },
        {
            "id": "img-4",
            "title": "Coordonnateur sur le Terrain",
            "url": "assets/images/coordinator.webp",
            "category": "Équipe",
            "date": "2026-11-19"
        }
    ],
    "messages": []
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
                
                // Merge intelligent pour préserver les modifications utilisateurs tout en garantissant la complétude des données
                const pages = (parsed.pages && parsed.pages.length >= 14) 
                    ? parsed.pages 
                    : INITIAL_DATA.pages.map(initP => {
                        const existing = (parsed.pages || []).find(p => p.id === initP.id || p.filename === initP.filename);
                        return existing ? { ...initP, ...existing } : initP;
                    });

                const services = (parsed.services && parsed.services.length >= 5) 
                    ? parsed.services 
                    : INITIAL_DATA.services.map(initS => {
                        const existing = (parsed.services || []).find(s => s.id === initS.id || s.title === initS.title);
                        return existing ? { ...initS, ...existing } : initS;
                    });

                const team = (parsed.team && parsed.team.length >= 1) 
                    ? parsed.team 
                    : INITIAL_DATA.team;

                const projects = (parsed.projects && parsed.projects.length >= 30) 
                    ? parsed.projects 
                    : INITIAL_DATA.projects;

                return {
                    siteInfo: { ...INITIAL_DATA.siteInfo, ...(parsed.siteInfo || {}) },
                    pages: pages,
                    images: parsed.images && parsed.images.length > 0 ? parsed.images : INITIAL_DATA.images,
                    projects: projects,
                    team: team,
                    services: services,
                    messages: parsed.messages || []
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
    // PAGES CRUD
    // ==========================================
    getPages() {
        return this.data.pages || INITIAL_DATA.pages;
    }

    getPageById(id) {
        return (this.data.pages || INITIAL_DATA.pages).find(p => p.id === id);
    }

    getPageByFilename(filename) {
        if (!filename) return null;
        const clean = filename.replace(/^\//, '').replace(/^[.\/]+/, '');
        const pages = this.data.pages || INITIAL_DATA.pages;
        return pages.find(p => {
            const pclean = p.filename.replace(/^\//, '');
            return pclean === clean || clean.endsWith(pclean) || pclean.endsWith(clean);
        });
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

    // ==========================================
    // IMAGES CRUD
    // ==========================================
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

    // ==========================================
    // PROJECTS CRUD
    // ==========================================
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
            this.data.projects.unshift(project);
        }
        this.saveData();
        return project;
    }
    deleteProject(id) {
        this.data.projects = this.data.projects.filter(p => p.id !== id);
        this.saveData();
    }

    // ==========================================
    // TEAM CRUD
    // ==========================================
    getTeam() { return this.data.team || INITIAL_DATA.team; }
    getTeamById(id) { return (this.data.team || []).find(t => t.id === id); }
    saveTeamMember(member) {
        if (!this.data.team) this.data.team = [...INITIAL_DATA.team];
        if (member.id) {
            const index = this.data.team.findIndex(t => t.id === member.id);
            if (index !== -1) {
                this.data.team[index] = { ...this.data.team[index], ...member };
            }
        } else {
            member.id = 'team-' + Date.now();
            this.data.team.push(member);
        }
        this.saveData();
        return member;
    }
    deleteTeamMember(id) {
        if (!this.data.team) return;
        this.data.team = this.data.team.filter(t => t.id !== id);
        this.saveData();
    }

    // ==========================================
    // SERVICES CRUD
    // ==========================================
    getServices() { return this.data.services || INITIAL_DATA.services; }
    getServiceById(id) { return (this.data.services || []).find(s => s.id === id); }
    saveService(service) {
        if (!this.data.services) this.data.services = [...INITIAL_DATA.services];
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
        if (!this.data.services) return;
        this.data.services = this.data.services.filter(s => s.id !== id);
        this.saveData();
    }

    // ==========================================
    // SITE INFO CRUD
    // ==========================================
    getSiteInfo() { return this.data.siteInfo || INITIAL_DATA.siteInfo; }
    updateSiteInfo(info) {
        this.data.siteInfo = { ...this.data.siteInfo, ...info };
        this.saveData();
    }

    // ==========================================
    // CONTACT MESSAGES
    // ==========================================
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

    // ==========================================
    // AUTHENTICATION
    // ==========================================
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

    // ==========================================
    // EXPORT / IMPORT / RESET
    // ==========================================
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

    syncRealPages() {
        this.data.pages = JSON.parse(JSON.stringify(INITIAL_DATA.pages));
        this.saveData();
        return this.data.pages;
    }

    syncRealServices() {
        this.data.services = JSON.parse(JSON.stringify(INITIAL_DATA.services));
        this.saveData();
        return this.data.services;
    }

    syncRealTeam() {
        this.data.team = JSON.parse(JSON.stringify(INITIAL_DATA.team));
        this.saveData();
        return this.data.team;
    }

    syncRealAll() {
        this.saveData(JSON.parse(JSON.stringify(INITIAL_DATA)));
        return this.data;
    }

    resetToDefault() {
        this.saveData(INITIAL_DATA);
    }
}

// Global Singleton Instance
window.cmsStore = new DataStore();

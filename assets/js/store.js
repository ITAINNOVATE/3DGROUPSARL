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
            "seoTitle": "3D-GROUPE SARL | Projets Agro-Pasto-Forestiers au Bénin",
            "seoDescription": "Défi pour le Développement Durable Groupe SARL (3D-GROUPE SARL). Expert en conception, structuration et exploitation de projets agro-forestiers au Bénin.",
            "heroTitle": "Du foncier, passant par l'exploitation à l'exportation",
            "heroSubtitle": "Conception, Structuration et Mise en œuvre de projets agro-pasto-forestiers à forte valeur ajoutée",
            "heroImage": "assets/images/hero-drone.webp",
            "mainContent": "Bienvenue chez 3D-GROUPE SARL.\n\nLà où la terre, l’expertise et la vision d’investissement se rencontrent pour donner naissance à des projets agro-pasto-forestiers durables et créateurs de valeur.\n\nConvaincus que l’agriculture et la foresterie constituent des leviers majeurs de développement économique et environnemental, nous accompagnons investisseurs, institutions et entrepreneurs dans la conception, la structuration et la mise en œuvre d’initiatives solides, responsables et performantes.\n\nDe l’identification et la sécurisation du foncier à la réalisation opérationnelle sur le terrain, notre approche globale transforme les opportunités en projets concrets, viables et porteurs d’impact durable pour les territoires et les communautés.",
            "extraContent": "Notre Cœur de Métier : Nous intervenons sur toute la chaîne de valeur des projets agroforestiers, avec un accent particulier sur la production forestière (bois d’œuvre, bois de service, plantations industrielles). Notre rôle consiste à transformer une vision d’investissement en un projet concret, techniquement fiable, juridiquement sécurisé et économiquement rentable.\n\nNos 4 Domaines Stratégiques : Sécurisation Foncière & Cadastrale, Ingénierie & Faisabilité de Projets, Installation de Plantations Forestières & Fruitières, Exploitation & Exportation de Bois d'Œuvre.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-about-fr",
            "filename": "about.html",
            "lang": "FR",
            "title": "À Propos",
            "seoTitle": "Notre Entreprise | 3D-GROUPE SARL",
            "seoDescription": "Présentation de 3D-GROUPE SARL, notre mission, vision, engagements et valeurs pour le développement agro-forestier durable au Bénin.",
            "heroTitle": "Notre Entreprise",
            "heroSubtitle": "L'expertise au service du développement durable agro-forestier au Bénin.",
            "heroImage": "assets/images/project-teck.webp",
            "whoWeAreTitle": "Qui sommes-nous ?",
            "whoWeAreText": "3D-GROUPE SARL est une entreprise spécialisée dans la conception, la structuration et la mise en œuvre de projets agro-pasto-forestiers à forte valeur ajoutée.\n\nNous accompagnons les investisseurs et passionnés de l’agro-business dans le développement de projets rentables, durables et juridiquement sécurisés, grâce à une maîtrise complète de la chaîne de valeur.\n\nNotre approche repose sur l'identification et la sécurisation du foncier, la structuration technique et financière, ainsi que la valorisation finale des ressources.\n\nForts d'une expertise locale approfondie, nous transformons vos idées d'investissement en actifs concrets porteurs d'un impact économique, social et environnemental durable au Bénin.",
            "mainContent": "3D-GROUPE SARL est une entreprise spécialisée dans la conception, la structuration et la mise en œuvre de projets agro-pasto-forestiers à forte valeur ajoutée.\n\nNous accompagnons les investisseurs et passionnés de l’agro-business dans le développement de projets rentables, durables et juridiquement sécurisés, grâce à une maîtrise complète de la chaîne de valeur.\n\nNotre approche repose sur l'identification et la sécurisation du foncier, la structuration technique et financière, ainsi que la valorisation finale des ressources.\n\nForts d'une expertise locale approfondie, nous transformons vos idées d'investissement en actifs concrets porteurs d'un impact économique, social et environnemental durable au Bénin.",
            "vision": "Devenir la référence en Afrique de l'Ouest pour le développement agro-forestier durable, conciliant performance et écologie.",
            "mission": "Transformer des opportunités foncières en actifs productifs sécurisés par une expertise technique et stratégique de pointe.",
            "values": "• Expertise & Rigueur\n• Durabilité Environnementale\n• Transparence & Intégrité\n• Engagement Partenarial",
            "extraContent": "Notre Vision : Devenir la référence en Afrique de l'Ouest pour le développement agro-forestier durable, conciliant performance et écologie.\n\nNotre Mission : Transformer des opportunités foncières en actifs productifs sécurisés par une expertise technique et stratégique de pointe.\n\nNos Valeurs Fondatrices : Expertise & Rigueur, Durabilité Environnementale, Transparence & Intégrité, Engagement Partenarial.\n\nInformations Légales : RCCM RB/ABC/23B 7047 | IFU 3202393787802 | Siège : Ouèdo, Abomey-Calavi, Bénin.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-services-fr",
            "filename": "services.html",
            "lang": "FR",
            "title": "Nos Services",
            "seoTitle": "Nos Services & Domaines d'Intervention | 3D-GROUPE SARL",
            "seoDescription": "Découvrez notre chaîne complète de prestations : ingénierie de projet, acquisition et sécurisation foncière, gestion des plantations, exploitation forestière et exportation.",
            "heroTitle": "Nos Domaines d'Intervention",
            "heroSubtitle": "De l'identification du foncier à la valorisation commerciale : une chaîne intégrée de prestations à haute valeur ajoutée.",
            "heroImage": "assets/images/service-foncier.webp",
            "mainContent": "Chez 3D-GROUPE SARL, nous mettons à votre disposition une expertise complète pour concevoir, structurer et réaliser vos investissements agro-pasto-forestiers en toute sérénité.\n\nNos 5 Domaines d'Intervention Majeurs :\n1. Conception, planification et rédaction de projets agro-forestiers sur mesure, études technico-économiques et dossiers d'investissement bancables.\n2. Foncier : acquisition, location, délimitation contradictoire et sécurisation juridique intégrale du capital terre.\n3. Installation et conduite opérationnelle de plantations forestières (teck, melina) et fruitières (anacardier, agrumes) avec monitoring moderne.\n4. Exploitation forestière raisonnée, cubage certifié et valorisation du bois d'œuvre sur les marchés nationaux et internationaux.\n5. Accompagnement stratégique des entreprises de transformation du bois (scieries étrangères et nationales) pour leur approvisionnement régulier et conforme.",
            "extraContent": "Méthodologie d'Intervention Agile : Diagnostic agro-écologique approfondi, Sécurisation juridique notariale, Planification pluriannuelle rigoureuse, Management de chantier de pépinière et de trouaison, Monitoring continu de croissance végétale.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-methodology-fr",
            "filename": "methodology.html",
            "lang": "FR",
            "title": "Méthodologie",
            "seoTitle": "Notre Méthodologie Agile en 6 Étapes | 3D-GROUPE SARL",
            "seoDescription": "Découvrez la démarche rigoureuse en 6 jalons de 3D-GROUPE SARL pour sécuriser, optimiser et rentabiliser vos projets agro-forestiers au Bénin.",
            "heroTitle": "Notre Démarche Méthodologique",
            "heroSubtitle": "Un cadre d'exécution rigoureux et éprouvé en 6 étapes pour sécuriser et rentabiliser vos investissements agro-forestiers.",
            "heroImage": "assets/images/project-plantule.webp",
            "mainContent": "Notre méthodologie garantit une maîtrise technique, financière et légale à chaque étape de votre investissement :\n\nÉtape 1 : Diagnostic & Faisabilité Agro-Écologique\nÉtude pédologique, analyse de la fertilité des sols, pluviométrie, cartographie GPS haute précision et évaluation du potentiel économique.\n\nÉtape 2 : Sécurisation Foncière & Audit Juridique\nEnquête de voisinage contradictoire, vérification des titres fonciers auprès de l'ANDF, bornage géomètre-expert et formalisation légale.\n\nÉtape 3 : Ingénierie & Modélisation Financière\nPlan d'affaires pluriannuel, dimensionnement des intrants, calendrier cultural, projection du retour sur investissement (ROI) et business plan bancable.\n\nÉtape 4 : Déploiement & Travaux Opérationnels\nPréparation mécanisée ou manuelle des sols, trouaison calibrée, fourniture de plants certifiés à haute vigueur et piquetage géométrique.\n\nÉtape 5 : Conduite Sylvicole & Monitoring par Drone\nSurveillance phytosanitaire régulière, élagage formateur, désherbage sélectif, pare-feux de protection et suivi aérien régulier par drone.\n\nÉtape 6 : Récolte, Exploitation & Débouchés Commerciaux\nCoupe raisonnée, cubage certifié, transformation locale ou mise en relation directe avec les acheteurs et scieries à l'exportation.",
            "extraContent": "Livrables Fournis : Rapport d'audit foncier certifié, Plan d'aménagement forestier (PAF), Modèle financier sur 10-25 ans, Attestations de bornage contradictoire, Rapports de monitoring trimestriels.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-projects-fr",
            "filename": "projects.html",
            "lang": "FR",
            "title": "Réalisations",
            "seoTitle": "Nos Réalisations & Projets sur le Terrain | 3D-GROUPE SARL",
            "seoDescription": "Explorez la galerie de nos 34 projets agro-pasto-forestiers réalisés à travers le Bénin : plantations de teck, vergers d'anacardiers, pépinières certifiées et domaines agricoles.",
            "heroTitle": "Nos Réalisations",
            "heroSubtitle": "Découvrez nos 34 projets forestiers et agricoles documentés sur le terrain à travers les départements du Bénin.",
            "heroImage": "assets/images/project-teck.webp",
            "mainContent": "À 3D-GROUPE SARL, nos réalisations concrètes sur le terrain témoignent de notre savoir-faire opérationnel et de notre engagement pour l'excellence agro-forestière.\n\nPlus de 34 projets documentés en images et données de terrain :\n• Plantations industrielles de Teck (Tectona grandis) à forte valeur d'exportation (Zè, Allada, Plateau, Zou)\n• Vergers agro-écologiques d'Anacardier à haut rendement (Borgou, Donga, Collines)\n• Pépinières sylvicoles et fruitières certifiées produisant des plants à germination garantie\n• Domaines de maraîchage moderne et d'ananas Pain de Sucre destinés aux circuits d'exportation\n• Sécurisation foncière contradictoire de domaines ruraux de 10 à plus de 500 hectares.",
            "extraContent": "Chiffres Clés : 34+ projets actifs, plus de 1 200 hectares aménagés et sécurisés, plus de 500 000 arbres plantés avec succès au Bénin.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-team-fr",
            "filename": "team.html",
            "lang": "FR",
            "title": "Équipe",
            "seoTitle": "Notre Équipe Dirigeante & Experts | 3D-GROUPE SARL",
            "seoDescription": "Découvrez l'équipe dirigeante et les experts de 3D-GROUPE SARL, sous la direction de M. Mawougnon Aimé ADJAHO, Coordonnateur Général.",
            "heroTitle": "Notre Équipe Dirigeante",
            "heroSubtitle": "Une équipe d'experts et de praticiens chevronnés au service de la rentabilité et de la durabilité de vos projets.",
            "heroImage": "assets/images/aime_adjaho.webp",
            "mainContent": "Mawougnon Aimé ADJAHO - Coordonnateur Général de 3D-GROUPE SARL.\n\nEntrepreneur et Consultant Agricoles, Gestionnaire/Coach en Initiation et Investissement Agricole, M. ADJAHO dirige 3D-GROUPE SARL avec une vision axée sur l'excellence technique, la rigueur juridique et la valorisation durable du capital terre.\n\nResponsabilités et Engagements Institutionnels :\n• Président du RAF-LTA Bénin (Réseau des Agronomes Formés dans les Lycées Techniques Agricoles du Bénin)\n• Secrétaire Général de la CJES Bénin et membre actif de la CJES-AFRICA (Confédération des Jeunes Entreprises et Startups du Bénin)\n• Rotarien : Membre engagé du Rotary Club Cotonou Rive Gauche\n• Expert reconnu en structuration de projets agro-forestiers et gestion des ressources naturelles.",
            "extraContent": "Notre Réseau d'Experts : Ingénieurs agronomes, experts géomètres-topographes, juristes fonciers, techniciens forestiers et opérateurs de drones de monitoring travaillant en synergie sur le terrain.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-contact-fr",
            "filename": "contact.html",
            "lang": "FR",
            "title": "Contact",
            "seoTitle": "Contactez-nous | 3D-GROUPE SARL",
            "seoDescription": "Prenez contact avec 3D-GROUPE SARL pour étudier votre projet foncier ou agricole au Bénin. Formulaire direct, WhatsApp, téléphone et email.",
            "heroTitle": "Contactez-nous",
            "heroSubtitle": "Discutons de votre projet d'investissement agro-forestier et bâtissons ensemble une solution rentable et sécurisée.",
            "heroImage": "assets/images/project-teck.webp",
            "mainContent": "Siège Social : Ouèdo, Commune d'Abomey-Calavi, République du Bénin.\n\nCoordonnées Téléphoniques :\n• Téléphone 1 : +229 01 62 09 87 50 (Appels & WhatsApp direct)\n• Téléphone 2 : +229 01 41 56 63 11\n\nCourriel Professionnel :\n• Email : aimeadjaho2012@gmail.com\n\nHoraires d'Ouverture : Du Lundi au Vendredi de 08h00 à 18h00 | Samedi de 09h00 à 14h00.",
            "extraContent": "Formulaire de Contact en Ligne : Remplissez le formulaire sécurisé pour transmettre directement vos demandes de projets fonciers, devis d'aménagement de plantations ou consultations agro-forestières.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-home-en",
            "filename": "en/index.html",
            "lang": "EN",
            "title": "Home",
            "seoTitle": "3D-GROUPE SARL | High-Value Agro-Pasto-Forestry Projects in Benin",
            "seoDescription": "Défi pour le Développement Durable Groupe SARL (3D-GROUPE SARL). Pioneer in structuring, securing and executing sustainable agro-forestry investments in Benin.",
            "heroTitle": "From land acquisition through management to global export",
            "heroSubtitle": "Design, Structuring, and Implementation of High Value-Added Agro-Pasto-Forestry Projects",
            "heroImage": "assets/images/hero-drone.webp",
            "mainContent": "Welcome to 3D-GROUPE SARL.\n\nWhere land tenure, agronomic excellence, and investment vision come together to create sustainable, high-yield agro-pasto-forestry assets.\n\nFirmly convinced that agriculture and forestry represent the primary engines of economic prosperity and environmental regeneration in West Africa, we assist institutional investors, corporations, and diaspora entrepreneurs in structuring profitable, fully certified ventures.",
            "extraContent": "Core Business: We operate across the entire value chain of agro-forestry investments, emphasizing industrial timber production (teak, melina), fruit orchards (cashew), and certified land registration.\n\nOur 4 Strategic Areas: Land Securitization & Cadastral Demarcation, Project Engineering & Feasibility, Plantation Establishment & Management, Timber Harvesting & International Trade.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-about-en",
            "filename": "en/about.html",
            "lang": "EN",
            "title": "About Us",
            "seoTitle": "Our Company | 3D-GROUPE SARL",
            "seoDescription": "Presentation of 3D-GROUPE SARL, our vision, mission, and sustainable commitments for West African forestry and agriculture.",
            "heroTitle": "Our Company",
            "heroSubtitle": "Expertise at the service of sustainable agro-forestry development in Benin.",
            "heroImage": "assets/images/project-teck.webp",
            "whoWeAreTitle": "Who are we?",
            "whoWeAreText": "3D-GROUPE SARL is a company specializing in the design, structuring, and implementation of high value-added agro-pasto-forestry projects.\n\nWe support investors and agro-business enthusiasts in the development of profitable, sustainable, and legally secure projects, thanks to full mastery of the value chain.\n\nOur approach is based on the identification and securing of land, technical and financial structuring, as well as the final valuation of resources.\n\nWith deep local expertise, we transform your investment ideas into concrete assets that carry a lasting economic, social, and environmental impact in Benin.",
            "mainContent": "3D-GROUPE SARL is a company specializing in the design, structuring, and implementation of high value-added agro-pasto-forestry projects.\n\nWe support investors and agro-business enthusiasts in the development of profitable, sustainable, and legally secure projects, thanks to full mastery of the value chain.\n\nOur approach is based on the identification and securing of land, technical and financial structuring, as well as the final valuation of resources.\n\nWith deep local expertise, we transform your investment ideas into concrete assets that carry a lasting economic, social, and environmental impact in Benin.",
            "vision": "To become the West African reference for sustainable agro-forestry development, reconciling performance and ecology.",
            "mission": "To transform land opportunities into productive assets secured by cutting-edge technical and strategic expertise.",
            "values": "• Expertise & Rigor\n• Environmental Sustainability\n• Transparency & Integrity\n• Partner Engagement",
            "extraContent": "Our Vision: To become the West African reference for sustainable agro-forestry development, reconciling high profitability with environmental stewardship.\n\nOur Mission: To transform rural land opportunities into productive, bankable assets secured by rigorous technical standards.\n\nCore Values: Professionalism & Rigor, Environmental Responsibility, Integrity & Transparency, Long-term Partnership.\n\nCorporate Identity: RCCM RB/ABC/23B 7047 | IFU 3202393787802 | Head office: Ouèdo, Abomey-Calavi, Republic of Benin.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-services-en",
            "filename": "en/services.html",
            "lang": "EN",
            "title": "Our Services",
            "seoTitle": "Our Services & Key Capabilities | 3D-GROUPE SARL",
            "seoDescription": "Discover our integrated service offerings: project feasibility, land tenure securitization, high-density plantation establishment, timber harvesting and export.",
            "heroTitle": "Our Services",
            "heroSubtitle": "From cadastral title verification through plantation management to international trade.",
            "heroImage": "assets/images/service-foncier.webp",
            "mainContent": "At 3D-GROUPE SARL, we provide end-to-end expertise for designing, executing, and scaling your agro-pasto-forestry investments in complete security.\n\nOur 5 Key Intervention Domains:\n1. Tailored Project Design, Planning & Bankable Investment Feasibility Studies.\n2. Land Tenure Acquisition, Leasehold Management & Cadastral Boundary Securitization.\n3. Installation and Field Management of Forest Plantations (Teak) and High-Yield Orchards (Cashew).\n4. Sustainable Timber Harvesting, Certified Log Scaling and Domestic/International Sales.\n5. Advisory Services & Supply Chain Securitization for Foreign and Domestic Sawmills.",
            "extraContent": "Agile Delivery Process: Initial Soil & Climate Audit, Notarial Land Title Clearance, Multi-Year Operational Roadmap, Field Earthworks & High-Vigor Planting, Systematic Drone-Assisted Tree Monitoring.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-methodology-en",
            "filename": "en/methodology.html",
            "lang": "EN",
            "title": "Methodology",
            "seoTitle": "Our 6-Step Agile Methodology | 3D-GROUPE SARL",
            "seoDescription": "Explore our proven 6-stage structured framework for derisking and maximizing ROI across forestry and agriculture projects in Benin.",
            "heroTitle": "Our Execution Methodology",
            "heroSubtitle": "A structured 6-stage delivery framework designed to guarantee technical excellence, legal security, and superior returns.",
            "heroImage": "assets/images/project-plantule.webp",
            "mainContent": "Our proven 6-step framework delivers full control and operational predictability:\n\nStep 1: Agro-Ecological Feasibility & Soil Diagnostics\nIn-depth soil profiling, chemical fertility analysis, micro-climate review, and GIS-based property mapping.\n\nStep 2: Land Securitization & Legal Audit\nPublic inquiry, boundary consensus with local stakeholders, certified surveyor staking, and formal title registration.\n\nStep 3: Engineering, Financial Modeling & Business Plan\nMulti-year pro forma cash flow projections, input dimensioning, ROI timeline, and bank-grade business planning.\n\nStep 4: Operational Field Deployment\nGround clearing, soil preparation, planting hole excavations, and transplanting of certified nursery stock.\n\nStep 5: Silvicultural Stewardship & Drone Monitoring\nSystematic pruning, firebreak maintenance, disease surveillance, and regular orthomosaic drone surveys.\n\nStep 6: Sustainable Harvesting & Global Market Access\nCertified timber volume scaling, controlled logging, and structured delivery to industrial processors and export buyers.",
            "extraContent": "Standard Deliverables: Certified Property Audit, Multi-Decade Forest Management Plan, Long-Term Financial Model, Topographic Cadastral Maps, Quarterly Drone Monitoring Reports.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-projects-en",
            "filename": "en/projects.html",
            "lang": "EN",
            "title": "Projects",
            "seoTitle": "Track Record & Field Realizations | 3D-GROUPE SARL",
            "seoDescription": "Explore our 34 field projects spanning teak plantations, cashew orchards, certified tree nurseries, and agricultural estates across Benin.",
            "heroTitle": "Our Realizations",
            "heroSubtitle": "Explore 34 active and documented agricultural and forestry projects throughout Benin.",
            "heroImage": "assets/images/project-teck.webp",
            "mainContent": "At 3D-GROUPE SARL, our documented field realizations reflect our operational excellence and strict dedication to high-yield sustainable agriculture.\n\nOver 34 Documented Field Projects:\n• High-value Industrial Teak Plantations (Tectona grandis) in Zè, Allada, Plateau, Zou\n• Climate-smart Organic Cashew Orchards in Borgou, Donga, Collines\n• Certified silvicultural tree nurseries producing vigorous disease-free seedlings\n• Commercial sugarloaf pineapple cultivation oriented toward export supply chains\n• Rural land acquisitions and titling covering properties from 10 to over 500 hectares.",
            "extraContent": "Key Figures: 34+ active sites, 1,200+ managed and titled hectares, 500,000+ trees successfully planted.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-team-en",
            "filename": "en/team.html",
            "lang": "EN",
            "title": "Team",
            "seoTitle": "Leadership & Technical Team | 3D-GROUPE SARL",
            "seoDescription": "Meet the leadership team and senior technical experts behind 3D-GROUPE SARL, led by General Coordinator Mawougnon Aimé ADJAHO.",
            "heroTitle": "Our Leadership Team",
            "heroSubtitle": "Recognized technical experts and seasoned practitioners committed to maximizing project value and sustainability.",
            "heroImage": "assets/images/aime_adjaho.webp",
            "mainContent": "Mawougnon Aimé ADJAHO - General Coordinator of 3D-GROUPE SARL.\n\nAgricultural Entrepreneur, Technical Consultant, and Investment Coach, Mr. ADJAHO directs 3D-GROUPE SARL with a forward-looking vision rooted in operational precision and sustainable resource stewardship.\n\nInstitutional Leadership & Memberships:\n• President of RAF-LTA Benin (Network of Agronomists Trained in Agricultural Technical Colleges of Benin)\n• Secretary General of CJES Benin & Active Member of CJES-AFRICA (Confederation of Young Enterprises and Startups)\n• Rotarian: Active Member of Rotary Club Cotonou Rive Gauche\n• Recognized Expert in agro-forestry project structuring and environmental management in Benin.",
            "extraContent": "Multidisciplinary Team: Agronomists, licensed surveyors, real estate lawyers, certified foresters, and licensed drone pilots working cohesively on all client estates.",
            "status": "En ligne",
            "lastModified": "2026-11-19"
        },
        {
            "id": "page-contact-en",
            "filename": "en/contact.html",
            "lang": "EN",
            "title": "Contact",
            "seoTitle": "Contact Us | 3D-GROUPE SARL",
            "seoDescription": "Get in touch with 3D-GROUPE SARL to discuss your land or agricultural project in Benin. Direct WhatsApp, phone, email, and online inquiry form.",
            "heroTitle": "Contact Us",
            "heroSubtitle": "Let's discuss your agro-forestry investment and engineer a tailored, highly profitable solution.",
            "heroImage": "assets/images/project-teck.webp",
            "mainContent": "Headquarters: Ouèdo, Abomey-Calavi Municipality, Republic of Benin.\n\nTelephone Numbers:\n• Primary Phone: +229 01 62 09 87 50 (Direct Call & WhatsApp)\n• Secondary Phone: +229 01 41 56 63 11\n\nCorporate Email:\n• Email: aimeadjaho2012@gmail.com\n\nOffice Hours: Monday through Friday from 08:00 to 18:00 | Saturday from 09:00 to 14:00.",
            "extraContent": "Online Inquiry Form: Submit your investment specifications directly through our contact portal to receive a detailed feasibility assessment and proposal.",
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
                
                // Merge intelligent pour garantir que tous les textes riches sont toujours présents
                const pages = INITIAL_DATA.pages.map(initP => {
                    const existing = (parsed.pages || []).find(p => p.id === initP.id || p.filename === initP.filename);
                    if (!existing) return initP;
                    return {
                        ...initP,
                        ...existing,
                        mainContent: (existing.mainContent && existing.mainContent.length > 120) ? existing.mainContent : initP.mainContent,
                        extraContent: (existing.extraContent && existing.extraContent.length > 80) ? existing.extraContent : initP.extraContent,
                        heroTitle: existing.heroTitle || initP.heroTitle,
                        heroSubtitle: existing.heroSubtitle || initP.heroSubtitle,
                        heroImage: existing.heroImage || initP.heroImage
                    };
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

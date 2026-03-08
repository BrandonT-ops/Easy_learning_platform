import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'fr' | 'en';

const TRANSLATIONS = {
  fr: {
    nav: { home: 'Accueil', about: 'À propos', programs: 'Programmes', contact: 'Contact', cta: 'Test de placement' },
    langSwitch: 'EN',
    hero: {
      badge: 'Cours débutant le 6 Avril 2026',
      title: 'Boostez votre avenir',
      titleHighlight: "avec l'anglais !",
      description: "L'anglais ne s'apprend pas… il se pratique. Plonge dans un environnement dynamique où tu parles et échanges à chaque séance.",
      ctaPrimary: 'Test de placement gratuit',
      ctaSecondary: 'Voir les programmes',
      socialProof: '2 premières séances offertes',
      socialProofSub: 'pour démarrer en confiance',
    },
    offerCard: {
      title: 'Notre offre',
      price: '15 000 FCFA',
      pricePer: '/ mois',
      freeSessions: '2 premières séances offertes',
      startDate: 'Début des cours : 6 Avril 2026',
      whatsapp: "S'inscrire via WhatsApp",
      levelsTitle: 'Niveaux disponibles',
      levels: [
        { name: 'Débutant', duration: '3 mois', highlight: false },
        { name: 'Intermédiaire', duration: '4 mois', highlight: true },
        { name: 'Avancé', duration: '5 mois', highlight: false },
      ],
      placement: 'Test de placement gratuit inclus — 20 min',
    },
    stats: [
      { value: '15 000 FCFA', label: 'Par mois' },
      { value: '2', label: 'Séances offertes' },
      { value: '3', label: 'Niveaux' },
      { value: '6 Avril', label: 'Début des cours' },
    ],
    whyChoose: {
      heading: 'Pourquoi choisir Talkr by Easy Learning ?',
      sub: "Tout ce dont tu as besoin pour maîtriser l'anglais, 100% en ligne.",
    },
    features: [
      { title: 'Améliore rapidement ton niveau', description: "Progresse vite grâce à des leçons structurées conçues pour te faire évoluer d'un niveau à l'autre avec confiance.", icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
      { title: 'Parle avec aisance et confiance', description: "Parle avec plus d'aisance et de confiance — chaque séance est construite autour de vraies conversations.", icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
      { title: 'Activités interactives en ligne', description: 'Pratique en ligne avec des activités interactives — exercices, prise de parole et retours en direct.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { title: 'Communauté motivée', description: "Intègre une communauté motivée et progresse chaque semaine aux côtés d'apprenants qui partagent tes objectifs.", icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
      { title: '2 premières séances offertes', description: "Les 2 premières séances sont entièrement gratuites — commence en confiance, sans engagement avant d'être prêt(e).", icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
      { title: '15 000 FCFA / mois', description: "Un tarif mensuel abordable à 15 000 FCFA — une formation en anglais professionnelle qui rentre dans ton budget.", icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    ],
    howItWorks: {
      heading: 'Comment ça marche ?',
      sub: 'Commence ton parcours en 3 étapes simples.',
      steps: [
        { number: '1', title: 'Passe le test de placement', description: "Réalise notre test de placement gratuit pour évaluer ton niveau d'anglais actuel." },
        { number: '2', title: 'Choisis ton programme', description: 'En fonction de tes résultats, sélectionne le programme adapté à ton niveau et tes objectifs.' },
        { number: '3', title: 'Commence à apprendre en ligne', description: "Accède à tes cours depuis n'importe quel appareil. Étudie avec des séances en direct et des retours d'experts." },
      ],
    },
    programs: {
      heading: 'Nos programmes',
      sub: 'Des programmes structurés pour une progression mesurable.',
      viewAll: 'Voir tous les programmes',
      levels: [
        { code: '1', name: 'Débutant', description: 'Apprends les bases de la communication quotidienne.', duration: '3 mois' },
        { code: '2', name: 'Intermédiaire', description: 'Gère la plupart des situations du quotidien.', duration: '4 mois' },
        { code: '3', name: 'Avancé', description: "Exprime tes idées avec précision et aisance.", duration: '5 mois' },
      ],
    },
    cta: {
      title: "Ici, tu ne mémorises pas l'anglais.",
      subtitle: 'Tu le vis. Tu le pratiques. Tu le maîtrises.',
      description: '2 premières séances offertes pour démarrer en confiance. Inscriptions ouvertes — cours débutant le 6 avril 2026.',
      primary: 'Test de placement',
      secondary: "S'inscrire",
    },
    footer: {
      tagline: "L'anglais ne s'apprend pas… il se pratique. Apprends où tu veux, à ton rythme. Cours débutant le 6 Avril 2026.",
      quickLinks: 'Liens rapides',
      links: { home: 'Accueil', about: 'À propos', programs: 'Programmes', test: 'Test de placement', contact: 'Contact' },
      legal: 'Légal',
      legalLinks: { privacy: 'Politique de confidentialité', terms: "Conditions d'utilisation", data: 'Politique de données' },
      rights: 'Tous droits réservés.',
    },
    about: {
      breadcrumb: 'À propos',
      title: 'À propos de Talkr by Easy Learning',
      description: "Une école d'anglais en ligne où l'anglais ne s'apprend pas… il se pratique. Une école dynamique centrée sur la conversation et la pratique réelle.",
      missionTitle: 'Notre Mission',
      mission: "Rendre l'anglais accessible à tous grâce à un environnement d'apprentissage en ligne dynamique, axé sur la pratique. Chez Talkr by Easy Learning, l'anglais ne se mémorise pas — il se vit, se pratique et se maîtrise à travers de vraies interactions à chaque séance.",
      visionTitle: 'Notre Vision',
      vision: "Devenir la référence de l'apprentissage de l'anglais en ligne pour les apprenants francophones — reconnue pour la confiance et l'aisance que nos étudiants acquièrent. Nous imaginons un monde où la langue n'est jamais un obstacle à l'opportunité.",
      methodologyHeading: 'Notre méthode pédagogique',
      methodologySub: "Fondée sur des principes d'acquisition du langage éprouvés, notre méthode garantit une progression constante.",
      methodology: [
        { title: 'Approche communicative', description: 'Accent sur les compétences pratiques à travers des scénarios réels et des échanges significatifs.', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
        { title: 'Apprentissage par tâches', description: "Réalise des tâches authentiques qui nécessitent l'utilisation de la langue, en développant des compétences réelles dès le premier jour.", icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { title: 'Évaluation par niveaux', description: 'Des évaluations régulières garantissent une progression mesurable à chaque niveau.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { title: 'Feedback personnalisé', description: "Retours individuels sur les exercices d'écriture et d'expression orale de la part d'instructeurs qualifiés.", icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
      ],
      onlineHeading: "Conçu pour l'apprentissage en ligne",
      onlineDesc: "Chaque aspect de notre plateforme a été conçu spécifiquement pour les apprenants en ligne.",
      onlinePoints: [
        { title: 'Progression hebdomadaire structurée', description: 'Des objectifs clairs et des jalons hebdomadaires te maintiennent sur la bonne voie.' },
        { title: 'Séances en direct et enregistrées', description: "Participe aux cours en direct ou regarde les enregistrements à l'heure qui te convient." },
        { title: 'Exercices interactifs', description: "Engage-toi avec des activités conçues pour les environnements d'apprentissage numérique." },
        { title: 'Support dédié', description: "Accède au support de l'instructeur par messagerie et lors de séances programmées." },
      ],
      onlineStats: [
        { label: 'Taille moyenne des classes', value: '8–12 étudiants' },
        { label: 'Séances en direct par semaine', value: '2–4 par niveau' },
        { label: 'Disponibilité du support', value: 'Lun–Ven, 9h–18h' },
        { label: 'Accès à la plateforme', value: '24h/24 7j/7' },
        { label: 'Certificat à la fin', value: 'Oui' },
      ],
      ctaTitle: "Commence ton parcours d'apprentissage",
      ctaSub: 'Passe notre test de placement gratuit et trouve le bon programme pour toi.',
    },
    programsPage: {
      breadcrumb: 'Programmes',
      title: "Programmes d'anglais",
      description: "Trois niveaux structurés pour te faire progresser du débutant à l'avancé. Chaque niveau s'appuie sur le précédent.",
      skillsHeading: 'Compétences travaillées',
      outcomesHeading: 'Résultats attendus',
      overviewHeading: 'Aperçu du programme',
      checkLevel: 'Vérifier mon niveau',
      ctaHeading: "Pas sûr(e) de ton niveau ?",
      ctaSub: 'Passe notre test de placement gratuit — il dure 20–30 minutes et couvre toutes les compétences.',
      ctaPrimary: 'Test de placement gratuit',
      ctaSecondary: "S'inscrire",
      programs: [
        {
          code: '1', name: 'Débutant', duration: '3 mois',
          description: "Une introduction à l'anglais pour les débutants complets. Tu développeras la capacité à te présenter, poser et répondre à des questions sur des informations personnelles.",
          skills: ['Vocabulaire de base (500+ mots)', 'Présent simple', 'Présentations et salutations', 'Chiffres, dates et heures', 'Objets du quotidien'],
          outcomes: ['Te présenter et présenter les autres', 'Remplir des formulaires simples', 'Comprendre des phrases parlées basiques', 'Écrire de courts messages personnels'],
        },
        {
          code: '2', name: 'Intermédiaire', duration: '4 mois',
          description: "Développe la capacité à gérer la plupart des situations du quotidien et à produire un texte cohérent sur des sujets familiers.",
          skills: ['Structures de phrases complexes', "Expression d'opinions", 'Narration et description', 'Contextes professionnels', 'Lecture de textes authentiques'],
          outcomes: ['Gérer la plupart des situations de voyage', 'Décrire des expériences et des événements', "Exprimer des opinions sur des sujets abstraits", 'Écrire des lettres et messages personnels'],
        },
        {
          code: '3', name: 'Avancé', duration: '5 mois',
          description: "Exprime des idées avec aisance et précision. Ce niveau avancé se concentre sur l'anglais académique, professionnel et spécialisé.",
          skills: ['Structures grammaticales avancées', 'Rédaction académique et professionnelle', 'Compréhension orale complexe', 'Débat et argumentation', 'Vocabulaire nuancé'],
          outcomes: ['Comprendre des textes complexes', 'Communiquer avec fluidité', 'Produire un texte clair et détaillé', 'Participer activement à des discussions professionnelles'],
        },
      ],
    },
  },
  en: {
    nav: { home: 'Home', about: 'About', programs: 'Programs', contact: 'Contact', cta: 'Placement Test' },
    langSwitch: 'FR',
    hero: {
      badge: 'Courses starting April 6, 2026',
      title: 'Boost your future',
      titleHighlight: 'with English!',
      description: "English isn't learned… it's practiced. Dive into a dynamic environment where you speak and exchange every single session.",
      ctaPrimary: 'Free Placement Test',
      ctaSecondary: 'View Programs',
      socialProof: '2 first sessions free',
      socialProofSub: 'to start with confidence',
    },
    offerCard: {
      title: 'Our Offer',
      price: '15,000 FCFA',
      pricePer: '/ month',
      freeSessions: '2 first sessions free',
      startDate: 'Starting: April 6, 2026',
      whatsapp: 'Register via WhatsApp',
      levelsTitle: 'Available Levels',
      levels: [
        { name: 'Beginner', duration: '3 months', highlight: false },
        { name: 'Intermediate', duration: '4 months', highlight: true },
        { name: 'Advanced', duration: '5 months', highlight: false },
      ],
      placement: 'Free placement test included — 20 min',
    },
    stats: [
      { value: '15,000 FCFA', label: 'Per Month' },
      { value: '2', label: 'Free Sessions' },
      { value: '3', label: 'Levels' },
      { value: 'April 6', label: 'Course Start' },
    ],
    whyChoose: {
      heading: 'Why Choose Talkr by Easy Learning?',
      sub: 'Everything you need to master English, delivered 100% online.',
    },
    features: [
      { title: 'Improve your level quickly', description: 'Progress rapidly through structured lessons designed to move you confidently from one level to the next.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
      { title: 'Speak with ease and confidence', description: "Speak with more ease and confidence — every session is built around real conversation and active practice.", icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
      { title: 'Interactive online activities', description: 'Practice online with interactive activities — exercises, speaking tasks, and live feedback every session.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { title: 'Motivated community', description: 'Join a motivated community and progress every week alongside learners who share your goals and energy.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
      { title: '2 first sessions free', description: "The first 2 sessions are completely free — start with confidence, no commitment until you're ready to enroll.", icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
      { title: '15,000 FCFA / month', description: 'Affordable monthly pricing at 15,000 FCFA — professional English training that fits your budget.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    ],
    howItWorks: {
      heading: 'How It Works',
      sub: 'Start your English learning journey in three simple steps.',
      steps: [
        { number: '1', title: 'Take the Placement Test', description: 'Complete our free placement test to assess your current English level.' },
        { number: '2', title: 'Choose Your Program', description: 'Based on your results, select the program that matches your level and goals.' },
        { number: '3', title: 'Start Learning Online', description: 'Access your classes from any device. Study with live sessions and expert feedback.' },
      ],
    },
    programs: {
      heading: 'Our Programs',
      sub: 'Structured programs for measurable progress.',
      viewAll: 'View All Programs',
      levels: [
        { code: '1', name: 'Beginner', description: 'Learn the basics of everyday communication.', duration: '3 months' },
        { code: '2', name: 'Intermediate', description: 'Handle most everyday situations with confidence.', duration: '4 months' },
        { code: '3', name: 'Advanced', description: 'Express ideas with precision and fluency.', duration: '5 months' },
      ],
    },
    cta: {
      title: "Here, you don't memorize English.",
      subtitle: 'You live it. You practice it. You master it.',
      description: '2 first sessions free to start with confidence. Registrations open — courses starting April 6, 2026.',
      primary: 'Placement Test',
      secondary: 'Register Now',
    },
    footer: {
      tagline: "English isn't learned… it's practiced. Learn from anywhere, at your own pace. Courses starting April 6, 2026.",
      quickLinks: 'Quick Links',
      links: { home: 'Home', about: 'About Us', programs: 'Programs', test: 'Placement Test', contact: 'Contact' },
      legal: 'Legal',
      legalLinks: { privacy: 'Privacy Policy', terms: 'Terms of Service', data: 'Data Usage Policy' },
      rights: 'All rights reserved.',
    },
    about: {
      breadcrumb: 'About',
      title: 'About Talkr by Easy Learning',
      description: "A dynamic online English school where English isn't learned… it's practiced. Built around conversation and real practice.",
      missionTitle: 'Our Mission',
      mission: "To make English accessible to everyone through a dynamic, practice-based online learning environment. At Talkr by Easy Learning, English is not memorized — it is lived, practiced, and mastered through real interaction every session.",
      visionTitle: 'Our Vision',
      vision: "To be the go-to online English learning platform for French-speaking learners — recognized for the confidence and fluency our students gain. We envision a world where language is never a barrier to opportunity.",
      methodologyHeading: 'Our Teaching Methodology',
      methodologySub: 'Grounded in research-backed language acquisition principles, our methodology ensures consistent progress.',
      methodology: [
        { title: 'Communicative Approach', description: 'Focus on practical communication skills through real-world scenarios and meaningful interaction.', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
        { title: 'Task-Based Learning', description: 'Complete authentic tasks that require language use, building real-world competence from day one.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { title: 'Level-Based Assessment', description: 'Regular assessments ensure measurable progress at each level.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { title: 'Personalized Feedback', description: 'Individual feedback on writing and speaking exercises from qualified English language instructors.', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
      ],
      onlineHeading: 'Built for Online Learning',
      onlineDesc: "Every aspect of our platform has been designed specifically for online learners.",
      onlinePoints: [
        { title: 'Structured Weekly Progress', description: 'Clear learning objectives and weekly milestones keep you on track.' },
        { title: 'Live and Recorded Sessions', description: 'Attend live classes or watch recordings at a time that suits you.' },
        { title: 'Interactive Exercises', description: 'Engage with activities designed for digital learning environments.' },
        { title: 'Dedicated Support', description: 'Access instructor support through messaging and scheduled sessions.' },
      ],
      onlineStats: [
        { label: 'Average class size', value: '8–12 students' },
        { label: 'Live sessions per week', value: '2–4 per level' },
        { label: 'Support availability', value: 'Mon–Fri, 9am–6pm' },
        { label: 'Platform access', value: '24 / 7' },
        { label: 'Certificate upon completion', value: 'Yes' },
      ],
      ctaTitle: 'Start Your Learning Journey',
      ctaSub: 'Take our free placement test and find the right program for you.',
    },
    programsPage: {
      breadcrumb: 'Programs',
      title: 'English Programs',
      description: 'Three structured levels to take you from beginner to advanced. Each level builds systematically on the previous.',
      skillsHeading: 'Skills Covered',
      outcomesHeading: 'Expected Outcomes',
      overviewHeading: 'Program Overview',
      checkLevel: 'Check My Level',
      ctaHeading: 'Not Sure Which Level?',
      ctaSub: 'Take our free placement test — it takes 20–30 minutes and covers all skills.',
      ctaPrimary: 'Take Free Placement Test',
      ctaSecondary: 'Register Now',
      programs: [
        {
          code: '1', name: 'Beginner', duration: '3 months',
          description: "An introduction to English for complete beginners. You will develop the ability to introduce yourself, ask and answer questions about personal details.",
          skills: ['Basic vocabulary (500+ words)', 'Simple present tense', 'Introductions and greetings', 'Numbers, dates, and time', 'Classroom and everyday objects'],
          outcomes: ['Introduce yourself and others', 'Fill in simple forms', 'Understand basic spoken phrases', 'Write short personal messages'],
        },
        {
          code: '2', name: 'Intermediate', duration: '4 months',
          description: 'Develop the ability to handle most everyday situations and produce connected text on familiar topics. A major milestone in language development.',
          skills: ['Complex sentence structures', 'Opinion expression', 'Narrative and description', 'Work and professional contexts', 'Reading authentic texts'],
          outcomes: ['Handle most travel situations', 'Describe experiences and events', 'Express opinions on abstract topics', 'Write personal letters and messages'],
        },
        {
          code: '3', name: 'Advanced', duration: '5 months',
          description: 'Express ideas fluently, spontaneously, and with precision. This level focuses on academic, professional, and specialized language use.',
          skills: ['Advanced grammar structures', 'Academic and professional writing', 'Complex listening comprehension', 'Debate and argumentation', 'Nuanced vocabulary'],
          outcomes: ['Understand complex texts', 'Communicate fluently with native speakers', 'Produce clear, detailed text on complex subjects', 'Participate actively in professional discussions'],
        },
      ],
    },
  },
} as const;

export type AppTranslations = typeof TRANSLATIONS.fr;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _lang = signal<Lang>('fr');
  readonly lang = this._lang.asReadonly();
  readonly t = computed(() => TRANSLATIONS[this._lang()]);

  toggle() {
    this._lang.update(l => (l === 'fr' ? 'en' : 'fr'));
  }

  isFrench() {
    return this._lang() === 'fr';
  }
}

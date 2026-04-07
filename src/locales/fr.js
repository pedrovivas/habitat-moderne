import { LogOut } from "lucide-react";
import PrivacyPolicy from "../PrivacyPolicy";

export const fr = {
  nav: {
    home: "Accueil",
    apartments: "Nos appartements",
    contact: "Nous joindre",
    LogOut: "Déconnexion",
  },
  footer: {
    text: "Tous droits réservés.",
    privacyPolicy: "Politique de confidentialité",
  },
  home: {
    title: "Habitat Moderne inc. | Accueil",
    metaDescription:
      "Entreprise familiale de gestion immobilière solidement établie à Montréal depuis 1965.",
    h1: "Habitat Moderne inc.",
    intro:
      "Entreprise familiale de gestion immobilière solidement établie à Montréal depuis 1965.",
    cta: "Voir nos appartements",
    content: [
      "Nous vous offrons des logements rénovés avec goût à des prix raisonnables.",
      "Depuis le tout début de l'entreprise, nos bureaux sont situés au 3572, rue Wellington, à Verdun.",
      "Une structure à taille humaine privilégiant la stabilité et l'expérience de notre personnel administratif et de notre équipe d'entretien vous offrent un service courtois et personnalisé.",
      "Si vous cherchez à vous loger, n'hésitez pas à visiter nos appartements.",
    ],
  },
  apartmentsListing: {
    title: "Habitat Moderne Inc. - Appartements à louer à Montréal",
    metaDescription:
      "Découvrez nos appartements rénovés avec goût à Verdun et à travers Montréal.",
    titleLoading: "Chargement... | Habitat Moderne inc.",
    titleError: "Erreur de chargement | Habitat Moderne inc.",
    loadingMessage: "Chargement en cours...",
    errorMessage: "Erreur de connexion",
    errorCta: "Réessayer",
    h1: "Appartements disponibles",
    noApartmentsMessage: "Aucun appartement disponible.",
  },
  apartmentDetails: {
    backToListing: "Retour à la liste des appartements",
    rooms: "Chambres",
    bathrooms: "Salle de bains",
    sqft: "pi²",
    month: "mois",
    description: "Description",
    inclusions: "Inclusions et commodités",
    apartment: "app.",
  },
  apartmentForm: {
    predefinedTags: [
      { id: "heated", label: "Chauffé" },
      { id: "hot_water", label: "Eau chaude" },
      { id: "stove", label: "Cuisinière" },
      { id: "fridge", label: "Frigo" },
      { id: "garage", label: "Garage disponible" },
      { id: "parking", label: "Stationnement disponible" },
      { id: "elevator", label: "Ascenseur" },
      { id: "handicap_ramp", label: "Rampe d’accès handicapé" },
      { id: "ac", label: "Air climatisée" },
      { id: "storage", label: "Rangement" },
      { id: "washer_dryer_hookups", label: "Installation laveuse-sécheuse" },
      { id: "laundry_onsite", label: "Buanderie sur place" },
      { id: "dishwasher_hookups", label: "Installation lave-vaisselle" },
      { id: "concierge", label: "Concierge sur place" },
      { id: "intercom", label: "Intercom" },
    ],
  },
  form: {
    h3: "Demande d'information",
    emailSendSuccess: "Email envoyé au propriétaire !",
    fullName: {
      label: "Nom complet",
      placeholder: "Votre nom complet",
      error: "Veuillez entrer votre nom complet",
    },
    email: {
      label: "Courriel",
      placeholder: "Votre adresse courriel",
      error: "Veuillez entrer une adresse courriel valide.",
    },
    phone: {
      label: "Téléphone",
      placeholder: "Votre numéro de téléphone",
    },
    contactMethod: {
      label: "Méthode de contact préférée",
      placeholder: "Choisir une option",
      error: "Veuillez sélectionner une méthode de contact.",
    },
    message: {
      label: "Message (Optionnel)",
      placeholder: "Écrivez votre message ici...",
    },
    cta: "Envoyer",
  },

  contactUs: {
    title:
      "Nous joindre | Habitat Moderne inc. - Gestion immobilière à Montréal",
    metaDescription:
      "Besoin d'un logement ? Pour nous joindre ou visiter un appartement, contactez l'équipe d'Habitat Moderne à Montréal. Un service humain et personnalisé depuis 1965.",
    phone: "Téléphone",
    email: "Courriel",
    administration: "Administration",
    rental: "Location",
    fax: "Télécopieur",
  },
  privacyPolicy: {
    title: "Politique de Confidentialité | Habitat Moderne inc.",
    metaDescription:
      "Consultez la politique de confidentialité d'Habitat Moderne inc. Découvrez comment nous protégeons vos renseignements personnels conformément aux lois en vigueur.",
    h1: "Politique de Confidentialité",
    h2: "Loi 25 : la protection des renseignements personnels une priorité",
    content:
      "Habitat Moderne Inc. mets tout en œuvre pour protéger les données personnelles recueillies afin de vous offrir un service de la plus haute qualité tout en observant la réglementation en vigueur. Nos politiques de confidentialité de l'information personnelle, ainsi que nos conditions d'utilisation ont été mises à jour afin de refléter les nouveautés et exigences de la loi 25. Veuillez adresser un courriel à info@habitatmoderne.com pour toute plaintes et/ou pour plus de détails sur notre politique et pratique encadrant la gouvernance à l'égard des renseignements personnels.",
  },
  notFound: {
    title: "Page introuvable | Habitat Moderne inc.",
    metaDescription: "Cette page n'existe pas.",
    h2: "Oups ! Page introuvable.",
    content:
      "Il semble que l'appartement ou la page que vous recherchez n'existe plus ou a été déplacée.",
  },
};

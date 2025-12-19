# 🏠 Spécification Détaillée - Page d'Accueil (Home)

**Mobile League Manager (MLM) - Page d'accueil MVP**

---

## 📋 Table des matières

- [🏠 Spécification Détaillée - Page d'accueil (Home)](#-spécification-détaillée---page-daccueil-home)
  - [📋 Table des matières](#-table-des-matières)
  - [🎯 Objectifs de la page d'accueil](#-objectifs-de-la-page-daccueil)
  - [👤 Deux versions de la page](#-deux-versions-de-la-page)
  - [🎨 Structure globale de la page](#-structure-globale-de-la-page)
  - [🔝 Section 1 : Header / Navigation](#-section-1--header--navigation)
    - [Version Non-Connecté](#version-non-connecté)
    - [Version Connecté](#version-connecté)
  - [🌟 Section 2 : Hero Section (Section Principale)](#-section-2--hero-section-section-principale)
    - [Version Non-Connecté](#version-non-connecté-1)
    - [Version Connecté](#version-connecté-1)
  - [📊 Section 3 : Statistiques en Temps Réel](#-section-3--statistiques-en-temps-réel)
  - [🎮 Section 4 : Jeux Supportés](#-section-4--jeux-supportés)
  - [🏆 Section 5 : Tournois à la Une](#-section-5--tournois-à-la-une)
    - [Version Non-Connecté](#version-non-connecté-2)
    - [Version Connecté](#version-connecté-2)
  - [📖 Section 6 : Comment ça marche ?](#-section-6--comment-ça-marche-)
  - [💰 Section 7 : Système de Pièces MLM](#-section-7--système-de-pièces-mlm)
  - [✨ Section 8 : Avantages de la Plateforme](#-section-8--avantages-de-la-plateforme)
  - [🎯 Section 9 : Call-to-Action Final](#-section-9--call-to-action-final)
    - [Version Non-Connecté](#version-non-connecté-3)
    - [Version Connecté](#version-connecté-3)
  - [📱 Section 10 : Footer](#-section-10--footer)
  - [📱 Comportement Responsive](#-comportement-responsive)
    - [Desktop (≥ 1024px)](#desktop--1024px)
    - [Tablet (768px - 1023px)](#tablet-768px---1023px)
    - [Mobile (≤ 767px)](#mobile--767px)
  - [🎨 Design System](#-design-system)
    - [Palette de Couleurs](#palette-de-couleurs)
    - [Typographie](#typographie)
    - [Espacement](#espacement)
    - [Animations](#animations)
  - [🔄 Intégrations API](#-intégrations-api)
  - [🪙 Performance et Optimisations](#-performance-et-optimisations)
  - [♿ Accessibilité](#-accessibilité)
  - [📐 Maquettes ASCII Complètes](#-maquettes-ascii-complètes)
    - [Version Desktop - Non Connecté](#version-desktop---non-connecté)
    - [Version Desktop - Connecté](#version-desktop---connecté)
    - [Version Mobile - Non Connecté](#version-mobile---non-connecté)

---

## 🎯 Objectifs de la page d'accueil

La page d'accueil doit :

1. **Attirer** : Captiver immédiatement l'attention des joueurs de football mobile
2. **Informer** : Expliquer clairement ce qu'est MLM et comment ça fonctionne
3. **Convertir** : Inciter les visiteurs à s'inscrire et créer leur profil
4. **Engager** : Pour les utilisateurs connectés, les diriger vers les tournois et leur profil
5. **Rassurer** : Montrer la crédibilité avec des statistiques et témoignages

---

## 👤 Deux versions de la page

La page d'accueil se comporte différemment selon l'état d'authentification :

| État | Version | Objectif Principal |
|------|---------|-------------------|
| **Non connecté** | Version Publique | Acquisition - Inciter à l'inscription |
| **Connecté** | Version Dashboard | Engagement - Diriger vers l'action (tournois, profil) |

---

## 🎨 Structure globale de la page

La page est composée de 10 sections principales :

```
┌─────────────────────────────────────────────────────┐
│  1. Header / Navigation                              │
├─────────────────────────────────────────────────────┤
│  2. Hero Section (Section Principale)                │
├─────────────────────────────────────────────────────┤
├─────────────────────────────────────────────────────┤
│  4. Jeux Supportés                                   │
├─────────────────────────────────────────────────────┤
│  5. Tournois à la Une                                │
├─────────────────────────────────────────────────────┤
│  6. Comment ça marche ?                              │
├─────────────────────────────────────────────────────┤
│  7. Système de Pièces MLM                            │
├─────────────────────────────────────────────────────┤
│  8. Avantages de la Plateforme                       │
├─────────────────────────────────────────────────────┤
│  9. Call-to-Action Final                             │
├─────────────────────────────────────────────────────┤
│  10. Footer                                          │
└─────────────────────────────────────────────────────┘
```

---

## 🔝 Section 1 : Header / Navigation

### Version Non-Connecté

```
┌────────────────────────────────────────────────────────────┐
│  [⚽ MLM Logo]        Tournois   Comment ça marche   FAQ    │
│                                                             │
│                      [Se connecter] [S'inscrire →]         │
└────────────────────────────────────────────────────────────┘
```

**Éléments :**

- **Logo MLM** (gauche) : Cliquable, retour à l'accueil
- **Menu de navigation** (centre) :
  - Tournois (ancre vers section #5)
  - Comment ça marche (ancre vers section #6)
  - FAQ (lien vers page FAQ)
- **Boutons d'action** (droite) :
  - **Se connecter** : Bouton secondaire (outline), ouvre modal de connexion
  - **S'inscrire** : Bouton primaire (plein), ouvre modal d'inscription

**Style :**
- Fond : Blanc avec ombre légère (shadow-sm)
- Position : Sticky top (reste visible au scroll)
- Hauteur : 72px desktop, 64px mobile
- Z-index : 1000

**Comportement :**
- Scroll : Le header devient semi-transparent avec backdrop-blur au scroll
- Mobile : Menu burger (hamburger icon) qui ouvre drawer latéral

---

### Version Connecté

```
┌────────────────────────────────────────────────────────────────────┐
│  [⚽ MLM Logo]   Tournois   Mes Matchs   Classement   [🔔3]  [👤]   │
└────────────────────────────────────────────────────────────────────┘
```

**Éléments :**

- **Logo MLM** (gauche)
- **Menu de navigation** (centre) :
  - Tournois (lien vers /tournaments)
  - Mes Matchs (lien vers /my-matches)
  - Classement (lien vers /leaderboard)
- **Actions utilisateur** (droite) :
  - **Icône Notifications** [🔔] : Badge avec nombre de notifications non lues
  - **Avatar utilisateur** [👤] : Photo de profil, dropdown menu au clic

**Dropdown Menu Avatar :**
```
┌─────────────────────────────┐
│ Mon Profil                  │
│ Mon Portefeuille (12.5 🪙)  │
│ Mes Tournois                │
│ Paramètres                  │
│ ────────────────            │
│ Se déconnecter              │
└─────────────────────────────┘
```

---

## 🌟 Section 2 : Hero Section (Section Principale)

### Version Non-Connecté

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                    │
│         ⚽ Organisez et Participez à des Tournois                  │
│            de Football Mobile Automatisés                         │
│                                                                    │
│    E-football • FC Mobile • Dream League Soccer                   │
│                                                                    │
│  Créez des tournois, affrontez des joueurs, gagnez des récompenses│
│         Format Suisse automatique - Pas d'élimination             │
│                                                                    │
│              [🚀 Commencer Gratuitement →]                        │
│                 (10 pièces offertes à l'inscription)              │
│                                                                    │
│    [Illustration : Joueurs + Trophée + Screenshots de jeux]       │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

- **Titre principal** (H1) : "Organisez et Participez à des Tournois de Football Mobile Automatisés"
  - Taille : 48px desktop, 32px mobile
  - Police : Bold
  - Couleur : Bleu foncé (#1e293b)

- **Sous-titre** : Liste des jeux supportés
  - Taille : 20px
  - Couleur : Gris moyen (#64748b)
  - Séparateur : Points (•)

- **Description** : Proposition de valeur
  - Taille : 18px
  - 2 lignes maximum
  - Couleur : Gris (#475569)

- **CTA Principal** : Bouton "Commencer Gratuitement"
  - Couleur : Gradient vert (#10b981 → #059669)
  - Taille : Large (padding 16px 32px)
  - Icône : Fusée 🚀
  - Animation : Pulse légère

- **Bonus Info** : Texte sous le CTA
  - "(10 pièces offertes à l'inscription)"
  - Taille : 14px
  - Couleur : Vert (#059669)
  - Icône : 🪙

- **Illustration** : Image hero
  - Position : Droite (desktop), dessous (mobile)
  - Format : SVG ou PNG optimisé
  - Contenu : Personnages jouant + trophée + écrans de jeu

**Style :**
- Fond : Gradient subtil bleu clair → blanc
- Padding : 120px vertical desktop, 80px mobile
- Alignement : Centre (texte) + Image droite (desktop)

**Action CTA :**
- Clic → Ouvre modal d'inscription avec choix :
  - OAuth (Google, Apple, Facebook)
  - Magic Link (Email)

---

### Version Connecté

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                    │
│         👋 Bon retour, [Nom du joueur] !                          │
│                                                                    │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ 💰 Solde         │  │ 🏆 Tournois      │  │ ⚔️ Matchs       │ │
│  │ 12.5 pièces      │  │ 3 en cours       │  │ 2 en attente    │ │
│  │ [Recharger]      │  │ [Voir tout]      │  │ [Jouer →]       │ │
│  └──────────────────┘  └──────────────────┘  └─────────────────┘ │
│                                                                    │
│         [🎯 Rejoindre un nouveau tournoi →]                       │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

- **Message de bienvenue** : "Bon retour, [Nom] !"
  - Taille : 36px
  - Couleur : Bleu foncé
  - Personnalisé avec le nom du joueur

- **3 Cartes de statistiques rapides** :

  **1. Carte Solde**
  - Icône : 💰
  - Titre : "Solde"
  - Valeur : Nombre de pièces (API: GET /wallet/balance)
  - Bouton : "Recharger" (Phase 2, désactivé en MVP avec tooltip)

  **2. Carte Tournois**
  - Icône : 🏆
  - Titre : "Tournois"
  - Valeur : Nombre de tournois en cours (API: GET /my/registrations?status=active)
  - Bouton : "Voir tout" → Redirige vers /my-tournaments

  **3. Carte Matchs**
  - Icône : ⚔️
  - Titre : "Matchs"
  - Valeur : Nombre de matchs en attente de résultat (API: GET /matches/my/pending)
  - Bouton : "Jouer →" → Redirige vers /my-matches/pending
  - Badge rouge si matchs en attente

- **CTA Principal** : "Rejoindre un nouveau tournoi"
  - Couleur : Bleu primaire
  - Taille : Large
  - Icône : 🎯
  - Action : Redirige vers /tournaments/registering

**Style :**
- Fond : Blanc
- Padding : 80px vertical
- Layout : Grid 3 colonnes (desktop), stack (mobile)
- Cartes : Ombre légère, hover effet

---

## 📊 Section 3 : Statistiques en Temps Réel

```
┌───────────────────────────────────────────────────────────────────┐
│              Mobile League Manager en Chiffres                    │
│                                                                    │
│    ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌──────────┐  │
│    │   1,234   │   │    87     │   │   456     │   │  15,678  │  │
│    │  Joueurs  │   │ Tournois  │   │  Matchs   │   │  Pièces  │  │
│    │  Actifs   │   │ En Cours  │   │  Joués    │   │Distribués│  │
│    └───────────┘   └───────────┘   └───────────┘   └──────────┘  │
└───────────────────────────────────────────────────────────────────┘
```

**Éléments :**

4 compteurs animés affichant :

1. **Joueurs Actifs**
   - API : `GET /api/stats/players`
   - Format : Nombre avec séparateur de milliers
   - Icône : 👥

2. **Tournois En Cours**
   - API : `GET /api/stats/tournaments`
   - Format : Nombre entier
   - Icône : 🏆

3. **Matchs Joués**
   - API : `GET /api/stats/matches`
   - Format : Nombre avec séparateur de milliers
   - Icône : ⚽

4. **Pièces Distribuées**
   - API : `GET /api/stats/coins`
   - Format : Nombre avec séparateur de milliers
   - Icône : 🪙

**Style :**
- Fond : Gradient bleu (#1e40af → #3b82f6)
- Couleur texte : Blanc
- Padding : 80px vertical
- Animation : CountUp effect (nombres qui montent au scroll)
- Layout : Grid 4 colonnes (desktop), 2x2 (mobile)

**Comportement :**
- Les nombres s'animent (comptent de 0 à la valeur) quand la section entre dans le viewport
- Mise à jour automatique toutes les 30 secondes (non-connecté) ou 10 secondes (connecté)

---

## 🎮 Section 4 : Jeux Supportés

```
┌───────────────────────────────────────────────────────────────────┐
│                   Jeux Supportés                                  │
│                                                                    │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│   │ [Logo E-foot]│    │ [Logo FC Mob]│    │  [Logo DLS]  │       │
│   │              │    │              │    │              │       │
│   │  E-football  │    │  FC Mobile   │    │Dream League  │       │
│   │              │    │              │    │   Soccer     │       │
│   │  125 joueurs │    │  89 joueurs  │    │  67 joueurs  │       │
│   └──────────────┘    └──────────────┘    └──────────────┘       │
│                                                                    │
│        Quel que soit votre jeu préféré, nous vous accueillons !   │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

3 cartes représentant les jeux supportés :

1. **E-football**
   - Logo officiel du jeu
   - Nom : "E-football"
   - Statistique : Nombre de joueurs inscrits (API dynamique)
   - Couleur thème : Bleu (#2563eb)

2. **FC Mobile**
   - Logo officiel
   - Nom : "FC Mobile"
   - Statistique : Nombre de joueurs
   - Couleur thème : Rouge (#dc2626)

3. **Dream League Soccer**
   - Logo officiel
   - Nom : "Dream League Soccer"
   - Statistique : Nombre de joueurs
   - Couleur thème : Vert (#16a34a)

**Style :**
- Fond : Blanc ou gris très clair (#f8fafc)
- Padding : 100px vertical
- Titre section : 32px, centré, bold
- Cartes :
  - Ombre légère
  - Border radius : 16px
  - Hover : Élévation + bordure colorée selon le jeu
  - Transition : 300ms
- Layout : Grid 3 colonnes (desktop), stack (mobile)

**Comportement :**
- Hover sur carte : Légère rotation et élévation
- Au clic (utilisateur connecté) : Filtre les tournois par jeu

---

## 🏆 Section 5 : Tournois à la Une

### Version Non-Connecté

```
┌───────────────────────────────────────────────────────────────────┐
│                  Tournois Populaires                              │
│                                                                    │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────┐│
│  │ 🏆 Coupe d'Afrique │  │ ⚽ Champions League│  │ 🎮 Weekend   ││
│  │    E-football      │  │     FC Mobile      │  │    Cup       ││
│  │                    │  │                    │  │              ││
│  │ 💰 5 pièces        │  │ 💰 10 pièces       │  │ 💰 3 pièces  ││
│  │ 👥 24/32 joueurs   │  │ 👥 16/16 COMPLET   │  │ 👥 8/16      ││
│  │ 📅 Dans 2 jours    │  │ 📅 Demain 14h      │  │ 📅 Dans 5h   ││
│  │                    │  │                    │  │              ││
│  │ [S'inscrire]       │  │ [Liste d'attente]  │  │ [S'inscrire] ││
│  └────────────────────┘  └────────────────────┘  └──────────────┘│
│                                                                    │
│              [Voir tous les tournois →]                           │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

Affiche les 3 tournois les plus populaires ou à venir :

**API : `GET /tournaments/registering?limit=3`**

Chaque carte de tournoi contient :

- **Nom du tournoi** (H3)
- **Jeu** : Badge avec nom du jeu (efootball, fc_mobile, dls)
- **Prix d'inscription** : Icône 🪙 + nombre de pièces
- **Participants** : Icône 👥 + "X/Y joueurs"
  - Si complet : Badge "COMPLET" + bouton "Liste d'attente"
- **Date de début** : Icône 📅 + format relatif ("Dans X jours", "Demain à Xh")
- **Bouton d'action** :
  - Non connecté : "S'inscrire" → Ouvre modal de connexion
  - Tournoi complet : "Liste d'attente"

**Style :**
- Fond : Gris clair (#f1f5f9)
- Padding : 100px vertical
- Cartes :
  - Fond : Blanc
  - Ombre : shadow-md
  - Border radius : 12px
  - Hover : shadow-lg + translation Y -4px
- Layout : Grid 3 colonnes (desktop), scroll horizontal (mobile)

**Comportement :**
- Bouton "S'inscrire" (non connecté) :
  - Clic → Modal de connexion s'ouvre
  - Message : "Connectez-vous pour rejoindre ce tournoi"
- Bouton "Voir tous les tournois" :
  - Redirige vers /tournaments (page publique)

---

### Version Connecté

```
┌───────────────────────────────────────────────────────────────────┐
│                  Tournois Recommandés Pour Vous                   │
│                                                                    │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────┐│
│  │ 🏆 Coupe d'Afrique │  │ ⚽ Champions League│  │ 🎮 Weekend   ││
│  │    E-football      │  │     FC Mobile      │  │    Cup       ││
│  │ ✅ Votre jeu !     │  │                    │  │ ✅ Votre jeu!││
│  │                    │  │                    │  │              ││
│  │ 💰 5 pièces ✓      │  │ 💰 10 pièces       │  │ 💰 3 pièces ✓││
│  │ 👥 24/32 joueurs   │  │ 👥 16/16 COMPLET   │  │ 👥 8/16      ││
│  │ 📅 Dans 2 jours    │  │ 📅 Demain 14h      │  │ 📅 Dans 5h   ││
│  │                    │  │                    │  │              ││
│  │ [Rejoindre →]      │  │ [Voir détails]     │  │ [Rejoindre →]││
│  └────────────────────┘  └────────────────────┘  └──────────────┘│
│                                                                    │
│              [Explorer tous les tournois →]                       │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

Affiche 3 tournois recommandés selon les critères :
1. Jeux que le joueur a dans son profil (priorité)
2. Prix d'inscription ≤ solde du joueur
3. Places disponibles
4. Popularité

**API : `GET /tournaments/registering?recommended=true&limit=3`**

Différences vs version non-connecté :

- **Badge "Votre jeu !"** : Si le tournoi correspond à un jeu du joueur
- **Indicateur de solde** : Checkmark ✓ si le joueur a assez de pièces
- **Boutons d'action** :
  - Assez de pièces + places : "Rejoindre →" (bouton primaire)
  - Pas assez de pièces : "Recharger" (Phase 2, désactivé en MVP avec tooltip)
  - Complet : "Voir détails"
- **Pré-remplissage** : Si le joueur a un GameAccount pour ce jeu, le dropdown est pré-sélectionné

**Comportement :**
- Clic sur "Rejoindre" :
  - Vérification du solde côté client
  - Si OK : Ouvre modal de confirmation avec sélection du GameAccount
  - Si insuffisant : Message d'erreur "Solde insuffisant"
- Clic sur "Voir détails" :
  - Redirige vers `/tournaments/{id}`

---

## 📖 Section 6 : Comment ça marche ?

```
┌───────────────────────────────────────────────────────────────────┐
│                   Comment Ça Marche ?                             │
│                                                                    │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌───────┐│
│   │    1     │      │    2     │      │    3     │      │   4   ││
│   │    📝    │  →   │    ✅    │  →   │    🏆    │  →   │  💰   ││
│   │          │      │          │      │          │      │       ││
│   │Inscrivez │      │ Complétez│      │Participez│      │Gagnez ││
│   │  -vous   │      │   votre  │      │    aux   │      │  des  ││
│   │gratuite- │      │   profil │      │ tournois │      │récom- ││
│   │   ment   │      │          │      │          │      │penses ││
│   │          │      │          │      │          │      │       ││
│   │OAuth ou  │      │10 pièces │      │  Format  │      │Créditées││
│   │  Email   │      │offertes! │      │  Suisse  │      │automati-││
│   │          │      │          │      │          │      │quement ││
│   └──────────┘      └──────────┘      └──────────┘      └───────┘│
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

4 étapes illustrées avec icônes et explications :

**Étape 1 : Inscrivez-vous gratuitement**
- Icône : 📝
- Titre : "Inscrivez-vous gratuitement"
- Description : "Connexion rapide avec Google, Apple, Facebook ou Email"
- Détails :
  - "Sans mot de passe"
  - "En 30 secondes"

**Étape 2 : Complétez votre profil**
- Icône : ✅
- Titre : "Complétez votre profil"
- Description : "Ajoutez vos informations et comptes de jeu"
- Détails :
  - "WhatsApp, Pays, Ville"
  - "Screenshots de vos équipes"
  - "10 pièces offertes après validation !"

**Étape 3 : Participez aux tournois**
- Icône : 🏆
- Titre : "Participez aux tournois"
- Description : "Rejoignez des tournois Format Suisse automatisés"
- Détails :
  - "Aucune élimination"
  - "Tout le monde joue toutes les rondes"
  - "Appariements automatiques"

**Étape 4 : Gagnez des récompenses**
- Icône : 💰
- Titre : "Gagnez des récompenses"
- Description : "Les gains sont crédités automatiquement dans votre portefeuille"
- Détails :
  - "Distribution automatique"
  - "Utilisez vos pièces pour d'autres tournois"

**Style :**
- Fond : Blanc
- Padding : 120px vertical
- Titre section : 36px, centré
- Layout :
  - Desktop : 4 colonnes avec flèches entre chaque
  - Mobile : Stack vertical avec flèches vers le bas
- Cartes :
  - Padding : 32px
  - Border : 2px solid #e2e8f0
  - Border radius : 12px
  - Hover : Border bleue + ombre

**Animations :**
- Au scroll : Apparition progressive des étapes (fade-in avec delay)
- Flèches : Animation pulse

---

## 💰 Section 7 : Système de Pièces MLM

```
┌───────────────────────────────────────────────────────────────────┐
│                  Système de Pièces MLM                            │
│                                                                    │
│           🪙 1 Pièce MLM = 500 FCFA                               │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │   🎁 10 PIÈCES OFFERTES                                    │  │
│  │   à l'inscription après validation de votre profil          │  │
│  │                                                             │  │
│  │   Soit 5,000 FCFA de crédit pour commencer !               │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│   💡 Comment utiliser vos pièces ?                                │
│                                                                    │
│   ✓ Participer aux tournois                                       │
│   ✓ Gagner des récompenses                                        │
│   ✓ Réinvestir dans d'autres compétitions                         │
│                                                                    │
│   ⚠️ MVP : Recharge et retrait disponibles en Phase 2             │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

- **Taux de conversion** : "1 Pièce MLM = 500 FCFA"
  - Icône : 🪙
  - Taille : 28px
  - Couleur : Bleu primaire
  - Bold

- **Encadré bonus** : Mise en avant du bonus de bienvenue
  - Fond : Gradient vert (#dcfce7 → #bbf7d0)
  - Border : 2px solid #16a34a
  - Icône : 🎁
  - Titre : "10 PIÈCES OFFERTES"
  - Sous-titre : "à l'inscription après validation de votre profil"
  - Valeur en FCFA : "Soit 5,000 FCFA de crédit pour commencer !"

- **Section "Comment utiliser"** :
  - Liste à puces avec checkmarks ✓
  - 3 points d'utilisation

- **Note MVP** :
  - Icône : ⚠️
  - Texte : "MVP : Recharge et retrait disponibles en Phase 2"
  - Style : Italique, gris moyen
  - Taille : 14px

**Style :**
- Fond : Gris très clair (#fafafa)
- Padding : 100px vertical
- Centré
- Max-width : 800px

---

## ✨ Section 8 : Avantages de la Plateforme

```
┌───────────────────────────────────────────────────────────────────┐
│                Pourquoi Choisir MLM ?                             │
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │      🪙      │  │      🤖      │  │      🛡️      │           │
│  │              │  │              │  │              │           │
│  │   Rapide     │  │   Automatisé │  │   Sécurisé   │           │
│  │              │  │              │  │              │           │
│  │ Inscription  │  │  Appariements│  │  Validation  │           │
│  │ en 30 sec.   │  │  et calculs  │  │  des profils │           │
│  │ Sans mot de  │  │  automatiques│  │  Modération  │           │
│  │    passe     │  │              │  │   active     │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │      🎮      │  │      🏆      │  │      💎      │           │
│  │              │  │              │  │              │           │
│  │  Multi-Jeux  │  │Format Suisse │  │   Gratuit    │           │
│  │              │  │              │  │              │           │
│  │  E-football  │  │Pas d'élimina-│  │10 pièces à   │           │
│  │  FC Mobile   │  │tion, tout le │  │l'inscription │           │
│  │     DLS      │  │monde participe│  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

6 cartes d'avantages :

**1. Rapide 🪙**
- Titre : "Rapide"
- Points :
  - "Inscription en 30 secondes"
  - "Sans mot de passe"
  - "Connexion sociale"

**2. Automatisé 🤖**
- Titre : "Automatisé"
- Points :
  - "Appariements automatiques"
  - "Calcul des tours"
  - "Distribution des gains"

**3. Sécurisé 🛡️**
- Titre : "Sécurisé"
- Points :
  - "Validation des profils"
  - "Modération active"
  - "Preuves screenshots"

**4. Multi-Jeux 🎮**
- Titre : "Multi-Jeux"
- Points :
  - "E-football"
  - "FC Mobile"
  - "Dream League Soccer"

**5. Format Suisse 🏆**
- Titre : "Format Suisse"
- Points :
  - "Pas d'élimination"
  - "Tout le monde joue"
  - "Classement équitable"

**6. Gratuit 💎**
- Titre : "Gratuit"
- Points :
  - "10 pièces à l'inscription"
  - "Pas de frais cachés"
  - "Commencez immédiatement"

**Style :**
- Fond : Blanc
- Padding : 100px vertical
- Layout : Grid 3x2 (desktop), 2x3 (tablet), stack (mobile)
- Cartes :
  - Padding : 24px
  - Border : 1px solid #e2e8f0
  - Border radius : 12px
  - Icône : 48px en haut
  - Titre : 20px bold
  - Points : Liste à puces, 14px
  - Hover : Ombre + légère élévation

---

## 🎯 Section 9 : Call-to-Action Final

### Version Non-Connecté

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                    │
│              Prêt à Rejoindre la Communauté ?                     │
│                                                                    │
│       Des milliers de joueurs s'affrontent déjà sur MLM           │
│              Inscrivez-vous et recevez 10 pièces !                │
│                                                                    │
│              [🚀 Créer mon compte gratuitement]                   │
│                                                                    │
│              Déjà inscrit ? [Se connecter →]                      │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

- **Titre** : "Prêt à Rejoindre la Communauté ?"
  - Taille : 36px
  - Bold
  - Couleur : Blanc

- **Description** : 2 lignes
  - Taille : 18px
  - Couleur : Blanc/opacité 90%

- **CTA Principal** : "Créer mon compte gratuitement"
  - Couleur : Blanc avec texte bleu
  - Taille : Extra large
  - Icône : 🚀
  - Action : Ouvre modal d'inscription

- **Lien secondaire** : "Déjà inscrit ? Se connecter"
  - Couleur : Blanc
  - Underline au hover
  - Action : Ouvre modal de connexion

**Style :**
- Fond : Gradient bleu (#1e40af → #3b82f6)
- Padding : 120px vertical
- Texte centré
- Couleur texte : Blanc

---

### Version Connecté

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                    │
│              Prêt pour votre prochain tournoi ?                   │
│                                                                    │
│         Rejoignez une compétition et montrez vos talents !        │
│                                                                    │
│              [🏆 Explorer les tournois disponibles]               │
│                                                                    │
│              Ou [créer votre propre tournoi →]                    │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

- **Titre** : "Prêt pour votre prochain tournoi ?"
- **Description** : Message d'encouragement
- **CTA Principal** : "Explorer les tournois disponibles"
  - Action : Redirige vers /tournaments/registering
- **Lien secondaire** : "créer votre propre tournoi"
  - Visible seulement si `user.role === 'organizer' || user.role === 'admin'`
  - Action : Redirige vers /tournaments/create

**Style :**
- Fond : Gradient vert (#059669 → #10b981)
- Autres styles identiques à la version non-connecté

---

## 📱 Section 10 : Footer

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                    │
│  [⚽ MLM Logo]                                                     │
│                                                                    │
│  La plateforme de référence pour les tournois de football mobile  │
│                                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ Plateforme  │  │   Légal     │  │   Social    │              │
│  │             │  │             │  │             │              │
│  │ À propos    │  │ CGU         │  │ Facebook    │              │
│  │ Comment ça  │  │ Politique   │  │ Twitter     │              │
│  │   marche    │  │   de conf.  │  │ Instagram   │              │
│  │ FAQ         │  │ Mentions    │  │ WhatsApp    │              │
│  │ Contact     │  │   légales   │  │             │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                    │
│  ────────────────────────────────────────────────────────────────  │
│                                                                    │
│  © 2025 Mobile League Manager. Tous droits réservés.              │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

**Contenu :**

- **Logo + Slogan** (haut)
- **3 colonnes de liens** :

  **Colonne 1 : Plateforme**
  - À propos
  - Comment ça marche
  - FAQ
  - Contact

  **Colonne 2 : Légal**
  - CGU (Conditions Générales d'Utilisation)
  - Politique de confidentialité
  - Mentions légales

  **Colonne 3 : Social**
  - Facebook (icône + lien)
  - Twitter (icône + lien)
  - Instagram (icône + lien)
  - WhatsApp (icône + lien)

- **Copyright** (bas)

**Style :**
- Fond : Bleu foncé (#1e293b)
- Couleur texte : Gris clair (#94a3b8)
- Couleur liens : Blanc au hover
- Padding : 64px vertical
- Layout : Grid 3 colonnes (desktop), stack (mobile)

---

## 📱 Comportement Responsive

### Desktop (≥ 1024px)

- **Header** : Menu horizontal complet
- **Hero** : Texte gauche + Image droite
- **Statistiques** : Grid 4 colonnes
- **Jeux** : Grid 3 colonnes
- **Tournois** : Grid 3 colonnes
- **Comment ça marche** : 4 colonnes avec flèches horizontales
- **Avantages** : Grid 3x2
- **Footer** : 3 colonnes

### Tablet (768px - 1023px)

- **Header** : Menu horizontal condensé
- **Hero** : Texte centré + Image dessous
- **Statistiques** : Grid 2x2
- **Jeux** : Grid 3 colonnes (plus petites)
- **Tournois** : Scroll horizontal
- **Comment ça marche** : 2x2 grid avec flèches verticales
- **Avantages** : Grid 2x3
- **Footer** : 3 colonnes (plus serrées)

### Mobile (≤ 767px)

- **Header** :
  - Logo + Menu burger
  - Drawer latéral pour navigation
- **Hero** :
  - Stack vertical
  - Image réduite ou cachée
  - CTA pleine largeur
- **Statistiques** : Grid 2x2, taille réduite
- **Jeux** : Stack vertical ou scroll horizontal
- **Tournois** : Scroll horizontal (snap scroll)
- **Comment ça marche** : Stack vertical avec flèches vers le bas
- **Avantages** : Stack vertical
- **Footer** : Stack vertical

**Breakpoints :**
```css
/* Mobile */
@media (max-width: 767px) { ... }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }
```

---

## 🎨 Design System

### Palette de Couleurs

**Couleurs Principales :**
```css
--primary-blue: #3b82f6;
--primary-blue-dark: #1e40af;
--primary-blue-light: #60a5fa;

--secondary-green: #10b981;
--secondary-green-dark: #059669;
--secondary-green-light: #34d399;

--accent-red: #ef4444;
--accent-yellow: #f59e0b;
```

**Couleurs Neutres :**
```css
--gray-50: #f8fafc;
--gray-100: #f1f5f9;
--gray-200: #e2e8f0;
--gray-300: #cbd5e1;
--gray-400: #94a3b8;
--gray-500: #64748b;
--gray-600: #475569;
--gray-700: #334155;
--gray-800: #1e293b;
--gray-900: #0f172a;
```

**Couleurs Sémantiques :**
```css
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Typographie

**Familles de police :**
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Poppins', 'Inter', sans-serif;
```

**Échelle typographique :**
```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
--text-5xl: 48px;
```

**Poids de police :**
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Espacement

**Échelle d'espacement :**
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Animations

**Transitions :**
```css
--transition-fast: 150ms ease-in-out;
--transition-base: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;
```

**Animations communes :**
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Count Up (pour les statistiques) */
@keyframes countUp {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 🔄 Intégrations API

**Endpoints utilisés par la page d'accueil :**

### Version Non-Connecté

```typescript
// Statistiques globales
GET /api/stats/players    // Nombre de joueurs actifs
GET /api/stats/tournaments // Nombre de tournois en cours
GET /api/stats/matches    // Nombre de matchs joués
GET /api/stats/coins      // Pièces distribuées

// Tournois populaires
GET /api/tournaments/registering?limit=3&sort=popularity
```

### Version Connecté

```typescript
// User data (auto-load au chargement)
GET /api/user  // Informations utilisateur + wallet + profile

// Dashboard cards
GET /api/wallet/balance           // Solde du portefeuille
GET /api/my/registrations?status=active  // Tournois en cours
GET /api/matches/my/pending       // Matchs en attente

// Tournois recommandés
GET /api/tournaments/registering?recommended=true&limit=3

// Statistiques globales (mêmes endpoints)
GET /api/stats/players
GET /api/stats/tournaments
GET /api/stats/matches
GET /api/stats/coins
```

**Rafraîchissement des données :**

- **Statistiques globales** : Toutes les 30 secondes (polling)
- **User wallet** : Toutes les 10 secondes si connecté
- **Tournois** : Toutes les 20 secondes
- **Notifications** : WebSocket ou polling 5 secondes (si implémenté)

**Gestion d'erreur :**

```typescript
// Exemple de gestion d'erreur
try {
  const response = await fetch('/api/tournaments/registering?limit=3');
  if (!response.ok) {
    throw new Error('Failed to fetch tournaments');
  }
  const data = await response.json();
  setTournaments(data.tournaments);
} catch (error) {
  console.error('Error:', error);
  // Afficher message d'erreur utilisateur
  showToast('Erreur de chargement des tournois', 'error');
  // Fallback: afficher données en cache ou skeleton
}
```

---

## 🪙 Performance et Optimisations

**1. Images**
- Format : WebP avec fallback JPEG/PNG
- Lazy loading : `loading="lazy"` sur toutes les images non-critiques
- Responsive images : `srcset` avec plusieurs tailles
- Optimisation : Compression (TinyPNG, ImageOptim)

**2. Fonts**
- Préchargement des fonts critiques :
  ```html
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  ```
- Font-display: swap
- Subset de caractères (latin uniquement si pas de langues exotiques)

**3. Code**
- Code splitting : Séparer bundle par route
- Tree shaking : Éliminer le code inutilisé
- Minification : CSS, JS
- Compression : Gzip/Brotli sur le serveur

**4. Rendering**
- Critical CSS : Inline dans `<head>`
- Defer/Async pour scripts non-critiques
- Intersection Observer pour animations au scroll
- Debounce/Throttle pour événements scroll/resize

**5. Caching**
- Service Worker : Cache assets statiques
- API responses : Cache avec TTL approprié
- LocalStorage : Stocker préférences utilisateur

**Metrics cibles :**
- **LCP (Largest Contentful Paint)** : < 2.5s
- **FID (First Input Delay)** : < 100ms
- **CLS (Cumulative Layout Shift)** : < 0.1
- **Time to Interactive** : < 3.5s

---

## ♿ Accessibilité

**1. Sémantique HTML**
```html
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main">
<section aria-labelledby="tournaments-heading">
  <h2 id="tournaments-heading">Tournois Populaires</h2>
</section>
<footer role="contentinfo">
```

**2. Contrastes**
- Ratio minimum : 4.5:1 pour texte normal
- Ratio minimum : 3:1 pour texte large (≥ 18px)
- Vérifier avec outils (WebAIM, Lighthouse)

**3. Navigation clavier**
- Tous les éléments interactifs accessibles au Tab
- Focus visible : outline bleu sur focus
- Skip links : "Aller au contenu principal"
- Ordre de tabulation logique

**4. ARIA**
```html
<!-- Boutons -->
<button aria-label="Fermer" aria-pressed="false">

<!-- Liens -->
<a href="/tournaments" aria-current="page">Tournois</a>

<!-- Notifications -->
<div role="alert" aria-live="polite">
  Tournoi inscrit avec succès !
</div>

<!-- Loading states -->
<div role="status" aria-busy="true" aria-label="Chargement...">
```

**5. Alternatives textuelles**
```html
<!-- Images décoratives -->
<img src="hero.jpg" alt="" role="presentation">

<!-- Images informatives -->
<img src="efootball-logo.png" alt="Logo E-football">

<!-- Icônes avec texte -->
<span aria-hidden="true">🏆</span>
<span class="sr-only">Tournoi</span>
```

**6. Responsive et Zoom**
- Zoom jusqu'à 200% sans perte de fonctionnalité
- Pas de scroll horizontal en mobile
- Touch targets ≥ 44x44px

---

## 📐 Maquettes ASCII Complètes

### Version Desktop - Non Connecté

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  [⚽ MLM Logo]              Tournois   Comment ça marche   FAQ                 │
│                                                  [Se connecter] [S'inscrire →] │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│   ┌─────────────────────────────────────────┐  ┌────────────────────────────┐ │
│   │                                         │  │                            │ │
│   │  ⚽ Organisez et Participez à des       │  │   [Illustration Hero]      │ │
│   │     Tournois de Football Mobile        │  │                            │ │
│   │            Automatisés                  │  │   Joueurs + Trophée +      │ │
│   │                                         │  │   Screenshots de jeux      │ │
│   │  E-football • FC Mobile • DLS           │  │                            │ │
│   │                                         │  │                            │ │
│   │  Créez des tournois, affrontez des     │  │                            │ │
│   │  joueurs, gagnez des récompenses       │  │                            │ │
│   │  Format Suisse - Pas d'élimination     │  │                            │ │
│   │                                         │  │                            │ │
│   │    [🚀 Commencer Gratuitement →]       │  │                            │ │
│   │    (10 pièces offertes à l'inscription)│  │                            │ │
│   │                                         │  │                            │ │
│   └─────────────────────────────────────────┘  └────────────────────────────┘ │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                      Mobile League Manager en Chiffres                         │
│                                                                                 │
│   ┌───────────┐     ┌───────────┐     ┌───────────┐     ┌───────────┐        │
│   │   1,234   │     │    87     │     │    456    │     │  15,678   │        │
│   │ 👥 Joueurs│     │ 🏆 Tournois│     │ ⚽ Matchs │     │ 🪙 Pièces │        │
│   │   Actifs  │     │  En Cours │     │   Joués   │     │Distribués │        │
│   └───────────┘     └───────────┘     └───────────┘     └───────────┘        │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                               Jeux Supportés                                   │
│                                                                                 │
│   ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐     │
│   │  [Logo E-foot]   │     │  [Logo FC Mob]   │     │   [Logo DLS]     │     │
│   │                  │     │                  │     │                  │     │
│   │   E-football     │     │    FC Mobile     │     │ Dream League     │     │
│   │                  │     │                  │     │     Soccer       │     │
│   │  125 joueurs     │     │   89 joueurs     │     │   67 joueurs     │     │
│   └──────────────────┘     └──────────────────┘     └──────────────────┘     │
│                                                                                 │
│         Quel que soit votre jeu préféré, nous vous accueillons !               │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                           Tournois Populaires                                  │
│                                                                                 │
│  ┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐       │
│  │ 🏆 Coupe d'Afrique│   │ ⚽ Champions League│   │ 🎮 Weekend Cup    │       │
│  │    E-football     │   │     FC Mobile     │   │    DLS            │       │
│  │                   │   │                   │   │                   │       │
│  │ 💰 5 pièces       │   │ 💰 10 pièces      │   │ 💰 3 pièces       │       │
│  │ 👥 24/32 joueurs  │   │ 👥 16/16 COMPLET  │   │ 👥 8/16 joueurs   │       │
│  │ 📅 Dans 2 jours   │   │ 📅 Demain 14h     │   │ 📅 Dans 5h        │       │
│  │                   │   │                   │   │                   │       │
│  │  [S'inscrire →]   │   │ [Liste d'attente] │   │  [S'inscrire →]   │       │
│  └───────────────────┘   └───────────────────┘   └───────────────────┘       │
│                                                                                 │
│                      [Voir tous les tournois →]                                │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                          Comment Ça Marche ?                                   │
│                                                                                 │
│  ┌─────────┐       ┌─────────┐       ┌─────────┐       ┌─────────┐           │
│  │    1    │   →   │    2    │   →   │    3    │   →   │    4    │           │
│  │   📝    │       │   ✅    │       │   🏆    │       │   💰    │           │
│  │         │       │         │       │         │       │         │           │
│  │Inscrivez│       │Complétez│       │Participez│      │ Gagnez  │           │
│  │  -vous  │       │  votre  │       │   aux   │       │   des   │           │
│  │gratuite-│       │  profil │       │ tournois│       │récom-   │           │
│  │  ment   │       │         │       │         │       │ penses  │           │
│  │         │       │10 pièces│       │ Format  │       │Créditées│           │
│  │OAuth ou │       │offertes!│       │ Suisse  │       │automati-│           │
│  │  Email  │       │         │       │         │       │quement  │           │
│  └─────────┘       └─────────┘       └─────────┘       └─────────┘           │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                         Système de Pièces MLM                                  │
│                                                                                 │
│                      🪙 1 Pièce MLM = 500 FCFA                                 │
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                          │ │
│  │   🎁 10 PIÈCES OFFERTES                                                 │ │
│  │   à l'inscription après validation de votre profil                      │ │
│  │                                                                          │ │
│  │   Soit 5,000 FCFA de crédit pour commencer !                            │ │
│  │                                                                          │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│   💡 Comment utiliser vos pièces ?                                             │
│   ✓ Participer aux tournois                                                    │
│   ✓ Gagner des récompenses                                                     │
│   ✓ Réinvestir dans d'autres compétitions                                      │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                         Pourquoi Choisir MLM ?                                 │
│                                                                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐                         │
│  │     🪙      │   │     🤖      │   │     🛡️      │                         │
│  │   Rapide    │   │  Automatisé │   │  Sécurisé   │                         │
│  │Inscription  │   │ Appariements│   │ Validation  │                         │
│  │ en 30 sec   │   │ automatiques│   │des profils  │                         │
│  └─────────────┘   └─────────────┘   └─────────────┘                         │
│                                                                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐                         │
│  │     🎮      │   │     🏆      │   │     💎      │                         │
│  │ Multi-Jeux  │   │Format Suisse│   │   Gratuit   │                         │
│  │ E-football  │   │Pas d'élimi- │   │10 pièces à  │                         │
│  │  FC Mobile  │   │   nation    │   │l'inscription│                         │
│  └─────────────┘   └─────────────┘   └─────────────┘                         │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                   Prêt à Rejoindre la Communauté ?                             │
│                                                                                 │
│            Des milliers de joueurs s'affrontent déjà sur MLM                   │
│                 Inscrivez-vous et recevez 10 pièces !                          │
│                                                                                 │
│                 [🚀 Créer mon compte gratuitement]                             │
│                                                                                 │
│                 Déjà inscrit ? [Se connecter →]                                │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│  [⚽ MLM Logo]                                                                  │
│  La plateforme de référence pour les tournois de football mobile               │
│                                                                                 │
│  ┌────────────┐       ┌────────────┐       ┌────────────┐                    │
│  │Plateforme  │       │   Légal    │       │   Social   │                    │
│  │            │       │            │       │            │                    │
│  │À propos    │       │ CGU        │       │ Facebook   │                    │
│  │Comment ça  │       │ Politique  │       │ Twitter    │                    │
│  │  marche    │       │   de conf. │       │ Instagram  │                    │
│  │FAQ         │       │ Mentions   │       │ WhatsApp   │                    │
│  │Contact     │       │  légales   │       │            │                    │
│  └────────────┘       └────────────┘       └────────────┘                    │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                 │
│  © 2025 Mobile League Manager. Tous droits réservés.                           │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

---

### Version Desktop - Connecté

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  [⚽ MLM Logo]        Tournois   Mes Matchs   Classement       [🔔3]  [👤]     │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                    👋 Bon retour, Jonas Kamdem !                               │
│                                                                                 │
│  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐      │
│  │ 💰 Solde           │  │ 🏆 Tournois        │  │ ⚔️ Matchs          │      │
│  │                    │  │                    │  │                    │      │
│  │   12.5 pièces      │  │   3 en cours       │  │ 🔴 2 en attente    │      │
│  │                    │  │                    │  │                    │      │
│  │  [Recharger ⚠️]    │  │   [Voir tout →]    │  │   [Jouer →]        │      │
│  └────────────────────┘  └────────────────────┘  └────────────────────┘      │
│                                                                                 │
│                    [🎯 Rejoindre un nouveau tournoi →]                         │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                      Mobile League Manager en Chiffres                         │
│                                                                                 │
│   ┌───────────┐     ┌───────────┐     ┌───────────┐     ┌───────────┐        │
│   │   1,234   │     │    87     │     │    456    │     │  15,678   │        │
│   │ 👥 Joueurs│     │ 🏆 Tournois│     │ ⚽ Matchs │     │ 🪙 Pièces │        │
│   │   Actifs  │     │  En Cours │     │   Joués   │     │Distribués │        │
│   └───────────┘     └───────────┘     └───────────┘     └───────────┘        │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│                      Tournois Recommandés Pour Vous                            │
│                                                                                 │
│  ┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐       │
│  │ 🏆 Coupe d'Afrique│   │ ⚽ Champions League│   │ 🎮 Weekend Cup    │       │
│  │    E-football     │   │     FC Mobile     │   │    E-football     │       │
│  │ ✅ Votre jeu !    │   │                   │   │ ✅ Votre jeu !    │       │
│  │                   │   │                   │   │                   │       │
│  │ 💰 5 pièces ✓     │   │ 💰 10 pièces ✗    │   │ 💰 3 pièces ✓     │       │
│  │ 👥 24/32 joueurs  │   │ 👥 16/16 COMPLET  │   │ 👥 8/16 joueurs   │       │
│  │ 📅 Dans 2 jours   │   │ 📅 Demain 14h     │   │ 📅 Dans 5h        │       │
│  │                   │   │                   │   │                   │       │
│  │  [Rejoindre →]    │   │  [Voir détails]   │   │  [Rejoindre →]    │       │
│  └───────────────────┘   └───────────────────┘   └───────────────────┘       │
│                                                                                 │
│                   [Explorer tous les tournois →]                               │
└────────────────────────────────────────────────────────────────────────────────┘

[... Sections Jeux Supportés, Comment ça marche, Système de Pièces, Avantages ...]

┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                   Prêt pour votre prochain tournoi ?                           │
│                                                                                 │
│            Rejoignez une compétition et montrez vos talents !                  │
│                                                                                 │
│                 [🏆 Explorer les tournois disponibles]                         │
│                                                                                 │
│                 Ou [créer votre propre tournoi →]                              │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘

[... Footer identique ...]
```

---

### Version Mobile - Non Connecté

```
┌──────────────────────────────┐
│  [☰]  ⚽ MLM    [S'inscrire] │
└──────────────────────────────┘

┌──────────────────────────────┐
│                               │
│    ⚽ Organisez et            │
│    Participez à des Tournois  │
│    de Football Mobile         │
│                               │
│    E-football • FC Mobile     │
│    Dream League Soccer        │
│                               │
│    Créez, affrontez, gagnez   │
│    Format Suisse automatique  │
│                               │
│  [🚀 Commencer Gratuitement] │
│  (10 pièces offertes)         │
│                               │
│   [Illustration réduite]      │
│                               │
└──────────────────────────────┘

┌──────────────────────────────┐
│  MLM en Chiffres              │
│                               │
│  ┌───────┐    ┌───────┐      │
│  │ 1,234 │    │  87   │      │
│  │👥     │    │🏆     │      │
│  │Joueurs│    │Tournoi│      │
│  └───────┘    └───────┘      │
│                               │
│  ┌───────┐    ┌───────┐      │
│  │  456  │    │15,678 │      │
│  │⚽     │    │🪙     │      │
│  │Matchs │    │Pièces │      │
│  └───────┘    └───────┘      │
└──────────────────────────────┘

┌──────────────────────────────┐
│  Jeux Supportés               │
│                               │
│  ┌─────────────────────────┐ │
│  │ [Logo] E-football       │ │
│  │ 125 joueurs             │ │
│  └─────────────────────────┘ │
│                               │
│  ┌─────────────────────────┐ │
│  │ [Logo] FC Mobile        │ │
│  │ 89 joueurs              │ │
│  └─────────────────────────┘ │
│                               │
│  ┌─────────────────────────┐ │
│  │ [Logo] Dream League     │ │
│  │ 67 joueurs              │ │
│  └─────────────────────────┘ │
└──────────────────────────────┘

┌──────────────────────────────┐
│  Tournois Populaires          │
│                               │
│  ← [Scroll Horizontal] →     │
│  ┌────────┬────────┬────────┐│
│  │Coupe   │Champ.  │Weekend ││
│  │d'Afriq.│League  │Cup     ││
│  │💰5     │💰10    │💰3     ││
│  │👥24/32 │👥COMPLET│👥8/16  ││
│  │[S'insc]│[Liste] │[S'insc]││
│  └────────┴────────┴────────┘│
│                               │
│  [Voir tous →]                │
└──────────────────────────────┘

┌──────────────────────────────┐
│  Comment Ça Marche ?          │
│                               │
│  ┌────────┐                   │
│  │   📝   │ 1. Inscrivez-vous │
│  └────────┘ OAuth ou Email    │
│       ↓                        │
│  ┌────────┐                   │
│  │   ✅   │ 2. Complétez      │
│  └────────┘ profil: 10 pièces!│
│       ↓                        │
│  ┌────────┐                   │
│  │   🏆   │ 3. Participez     │
│  └────────┘ Format Suisse     │
│       ↓                        │
│  ┌────────┐                   │
│  │   💰   │ 4. Gagnez         │
│  └────────┘ Récompenses auto  │
└──────────────────────────────┘

┌──────────────────────────────┐
│  Système de Pièces MLM        │
│                               │
│  🪙 1 Pièce = 500 FCFA        │
│                               │
│  ┌──────────────────────────┐│
│  │ 🎁 10 PIÈCES OFFERTES   ││
│  │ à l'inscription          ││
│  │ Soit 5,000 FCFA !        ││
│  └──────────────────────────┘│
│                               │
│  💡 Utilisation :             │
│  ✓ Tournois                   │
│  ✓ Récompenses                │
│  ✓ Réinvestissement           │
└──────────────────────────────┘

┌──────────────────────────────┐
│  Pourquoi MLM ?               │
│                               │
│  ┌──────┐  ┌──────┐          │
│  │  🪙  │  │  🤖  │          │
│  │Rapide│  │ Auto │          │
│  └──────┘  └──────┘          │
│                               │
│  ┌──────┐  ┌──────┐          │
│  │ 🛡️  │  │  🎮  │          │
│  │Sécur.│  │Multi │          │
│  └──────┘  └──────┘          │
│                               │
│  ┌──────┐  ┌──────┐          │
│  │  🏆  │  │  💎  │          │
│  │Suisse│  │Grat. │          │
│  └──────┘  └──────┘          │
└──────────────────────────────┘

┌──────────────────────────────┐
│                               │
│  Prêt à Rejoindre ?           │
│                               │
│  Inscrivez-vous et            │
│  recevez 10 pièces !          │
│                               │
│  [🚀 Créer mon compte]        │
│                               │
│  [Se connecter →]             │
│                               │
└──────────────────────────────┘

┌──────────────────────────────┐
│  [⚽ MLM Logo]                │
│                               │
│  Plateforme                   │
│  • À propos                   │
│  • Comment ça marche          │
│  • FAQ                        │
│  • Contact                    │
│                               │
│  Légal                        │
│  • CGU                        │
│  • Politique de conf.         │
│  • Mentions légales           │
│                               │
│  Social                       │
│  • Facebook                   │
│  • Twitter                    │
│  • Instagram                  │
│  • WhatsApp                   │
│                               │
│  © 2025 MLM                   │
└──────────────────────────────┘
```

---

## 🎯 Conclusion

Cette page d'accueil est conçue pour :

✅ **Convertir** les visiteurs en utilisateurs inscrits
✅ **Engager** les utilisateurs connectés vers l'action
✅ **Informer** clairement sur le fonctionnement de la plateforme
✅ **Rassurer** avec des statistiques et preuves sociales
✅ **Optimiser** pour la performance et l'accessibilité

**Prochaines étapes :**
1. Créer les composants Angular (Hero, TournamentCard, StatsCounter, etc.)
2. Implémenter les appels API avec gestion d'erreur et loading states
3. Ajouter les animations au scroll (Intersection Observer)
4. Tester la responsivité sur tous les devices
5. Optimiser les performances (Lighthouse score > 90)
6. Valider l'accessibilité (WCAG 2.1 AA)

---

**Document créé le** : 2025-12-18
**Version** : 1.0 MVP
**Auteur** : Claude Code pour Mobile League Manager

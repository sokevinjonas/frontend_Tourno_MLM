# ❓ Spécification Détaillée - Page FAQ (Foire Aux Questions)

**Mobile League Manager (MLM) - Page FAQ MVP**

---

## 📋 Table des matières

- [❓ Spécification Détaillée - Page FAQ (Foire Aux Questions)](#-spécification-détaillée---page-faq-foire-aux-questions)
  - [📋 Table des matières](#-table-des-matières)
  - [🎯 Objectifs de la page FAQ](#-objectifs-de-la-page-faq)
  - [🎨 Structure globale de la page](#-structure-globale-de-la-page)
  - [🔝 Section 1 : Header](#-section-1--header)
  - [🌟 Section 2 : Hero Section](#-section-2--hero-section)
  - [🔍 Section 3 : Barre de Recherche](#-section-3--barre-de-recherche)
  - [📂 Section 4 : Navigation par Catégories](#-section-4--navigation-par-catégories)
  - [📖 Section 5 : Questions et Réponses](#-section-5--questions-et-réponses)
    - [🎮 Catégorie 1 : Débuter sur MLM](#-catégorie-1--débuter-sur-mlm)
    - [👤 Catégorie 2 : Profil et Compte](#-catégorie-2--profil-et-compte)
    - [🏆 Catégorie 3 : Tournois](#-catégorie-3--tournois)
    - [⚽ Catégorie 4 : Matchs et Résultats](#-catégorie-4--matchs-et-résultats)
    - [💰 Catégorie 5 : Pièces MLM et Wallet](#-catégorie-5--pièces-mlm-et-wallet)
    - [🎯 Catégorie 6 : Format Suisse](#-catégorie-6--format-suisse)
    - [🛡️ Catégorie 7 : Sécurité et Modération](#-catégorie-7--sécurité-et-modération)
    - [🔧 Catégorie 8 : Problèmes Techniques](#-catégorie-8--problèmes-techniques)
  - [💬 Section 6 : Contact et Support](#-section-6--contact-et-support)
  - [📱 Section 7 : Footer](#-section-7--footer)
  - [🎨 Design et Comportement](#-design-et-comportement)
    - [Palette de Couleurs](#palette-de-couleurs)
    - [Typographie](#typographie)
    - [Animations](#animations)
    - [Accordéon - Comportement](#accordéon---comportement)
  - [📱 Comportement Responsive](#-comportement-responsive)
    - [Desktop (≥ 1024px)](#desktop--1024px)
    - [Tablet (768px - 1023px)](#tablet-768px---1023px)
    - [Mobile (≤ 767px)](#mobile--767px)
  - [🔍 Fonctionnalité de Recherche](#-fonctionnalité-de-recherche)
  - [🪙 Intégration Technique](#-intégration-technique)
  - [♿ Accessibilité](#-accessibilité)
  - [📐 Maquette ASCII Complète](#-maquette-ascii-complète)
    - [Version Desktop](#version-desktop)
    - [Version Mobile](#version-mobile)
  - [📊 Métriques et Analytiques](#-métriques-et-analytiques)
  - [🔄 Mises à Jour de la FAQ](#-mises-à-jour-de-la-faq)

---

## 🎯 Objectifs de la page FAQ

La page FAQ doit :

1. **Répondre rapidement** : Permettre aux utilisateurs de trouver des réponses sans contacter le support
2. **Réduire la friction** : Anticiper les questions avant l'inscription et pendant l'utilisation
3. **Éduquer** : Expliquer le fonctionnement du Format Suisse et des pièces MLM
4. **Rassurer** : Clarifier la sécurité, la modération et la validation des profils
5. **Convertir** : Lever les objections des visiteurs hésitants

---

## 🎨 Structure globale de la page

La page est composée de 7 sections principales :

```
┌─────────────────────────────────────────────────────┐
│  1. Header / Navigation                              │
├─────────────────────────────────────────────────────┤
│  2. Hero Section                                     │
├─────────────────────────────────────────────────────┤
│  3. Barre de Recherche                               │
├─────────────────────────────────────────────────────┤
│  4. Navigation par Catégories (Pills)                │
├─────────────────────────────────────────────────────┤
│  5. Questions et Réponses (Accordéon)                │
│     - Débuter sur MLM                                │
│     - Profil et Compte                               │
│     - Tournois                                       │
│     - Matchs et Résultats                            │
│     - Pièces MLM et Wallet                           │
│     - Format Suisse                                  │
│     - Sécurité et Modération                         │
│     - Problèmes Techniques                           │
├─────────────────────────────────────────────────────┤
│  6. Contact et Support                               │
├─────────────────────────────────────────────────────┤
│  7. Footer                                           │
└─────────────────────────────────────────────────────┘
```

---

## 🔝 Section 1 : Header

Identique à la page d'accueil (voir [PAGE_HOME_SPECIFICATION.md](PAGE_HOME_SPECIFICATION.md))

```
┌────────────────────────────────────────────────────────────┐
│  [⚽ MLM Logo]        Tournois   Comment ça marche   FAQ    │
│                                                             │
│                      [Se connecter] [S'inscrire →]         │
└────────────────────────────────────────────────────────────┘
```

**Navigation active** : L'item "FAQ" doit être visuellement marqué comme actif (couleur primaire, soulignement).

---

## 🌟 Section 2 : Hero Section

```
┌───────────────────────────────────────────────────────────┐
│                                                            │
│                  ❓ Questions Fréquentes                  │
│                                                            │
│         Trouvez rapidement des réponses à vos questions   │
│              sur Mobile League Manager                    │
│                                                            │
└───────────────────────────────────────────────────────────┘
```

**Éléments :**

- **Titre principal** (H1) : "Questions Fréquentes"
  - Taille : 42px desktop, 32px mobile
  - Police : Bold
  - Couleur : Bleu foncé (#1e293b)
  - Icône : ❓

- **Sous-titre** : "Trouvez rapidement des réponses à vos questions sur Mobile League Manager"
  - Taille : 18px
  - Couleur : Gris moyen (#64748b)

**Style :**
- Fond : Gradient bleu clair (#eff6ff → #ffffff)
- Padding : 80px vertical desktop, 60px mobile
- Alignement : Centré

---

## 🔍 Section 3 : Barre de Recherche

```
┌───────────────────────────────────────────────────────────┐
│                                                            │
│   ┌────────────────────────────────────────────────────┐  │
│   │  🔍 Rechercher une question...                     │  │
│   └────────────────────────────────────────────────────┘  │
│                                                            │
│   Populaire : Comment m'inscrire ? • Format Suisse •      │
│               Pièces MLM • Validation profil              │
│                                                            │
└───────────────────────────────────────────────────────────┘
```

**Éléments :**

- **Input de recherche** :
  - Largeur : 100% (max 600px)
  - Hauteur : 56px
  - Placeholder : "Rechercher une question..."
  - Icône : 🔍 (gauche)
  - Border radius : 28px (pill shape)
  - Ombre : shadow-md
  - Focus : Border bleue + shadow plus prononcée

- **Tags populaires** (cliquables) :
  - "Comment m'inscrire ?"
  - "Format Suisse"
  - "Pièces MLM"
  - "Validation profil"
  - Au clic : Scroll vers la question correspondante

**Fonctionnalité :**
- Recherche en temps réel (debounce 300ms)
- Filtre les questions par titre et contenu
- Affiche uniquement les questions correspondantes
- Si aucun résultat : Affiche message "Aucune question trouvée" + lien vers contact

**Style :**
- Fond : Blanc
- Padding : 40px vertical
- Centré

---

## 📂 Section 4 : Navigation par Catégories

```
┌───────────────────────────────────────────────────────────┐
│                                                            │
│  [🎮 Débuter]  [👤 Profil]  [🏆 Tournois]  [⚽ Matchs]   │
│  [💰 Wallet]  [🎯 Format Suisse]  [🛡️ Sécurité]  [🔧]    │
│                                                            │
└───────────────────────────────────────────────────────────┘
```

**Éléments :**

8 boutons de catégories (pills) :

1. **🎮 Débuter** - Questions pour nouveaux utilisateurs
2. **👤 Profil** - Compte, validation, game accounts
3. **🏆 Tournois** - Inscription, création, gestion
4. **⚽ Matchs** - Soumission résultats, litiges
5. **💰 Wallet** - Pièces MLM, transactions
6. **🎯 Format Suisse** - Explication du système
7. **🛡️ Sécurité** - Modération, anti-triche
8. **🔧 Technique** - Problèmes courants, bugs

**Comportement :**
- Clic sur catégorie → Scroll smooth vers la section correspondante
- Catégorie active : Fond bleu primaire, texte blanc
- Catégories inactives : Fond gris clair, texte gris foncé
- Sticky au scroll (reste visible en haut de page)

**Style :**
- Fond : Blanc
- Border bottom : 1px solid #e2e8f0
- Padding : 20px vertical
- Layout : Flex wrap (horizontal desktop, wrap mobile)
- Sticky position : top 72px (sous le header)
- Z-index : 999

---

## 📖 Section 5 : Questions et Réponses

**Format général** : Accordéon

Chaque catégorie contient plusieurs questions sous forme d'accordéon.

```
┌────────────────────────────────────────────────────────┐
│  📂 Catégorie                                          │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ ▶ Question 1 ?                                   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ ▼ Question 2 ?                                   │ │
│  ├──────────────────────────────────────────────────┤ │
│  │ Réponse détaillée ici...                         │ │
│  │                                                  │ │
│  │ - Point 1                                        │ │
│  │ - Point 2                                        │ │
│  │                                                  │ │
│  │ [En savoir plus →]                               │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ ▶ Question 3 ?                                   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

### 🎮 Catégorie 1 : Débuter sur MLM

**ID** : `#debuter`

---

**Q1.1 : Qu'est-ce que Mobile League Manager (MLM) ?**

**Réponse** :
Mobile League Manager (MLM) est une plateforme qui permet aux joueurs de jeux de football mobile (E-football, FC Mobile, Dream League Soccer) d'organiser et de participer à des tournois automatisés.

**Caractéristiques principales :**
- Format Suisse : Tout le monde joue toutes les rondes, pas d'élimination
- Inscription sans mot de passe (OAuth ou Magic Link)
- Système de pièces MLM (1 pièce = 500 FCFA)
- 10 pièces offertes à l'inscription
- Validation des profils par modérateurs
- Résolution automatique ou manuelle des matchs

[En savoir plus sur la page d'accueil →]

---

**Q1.2 : Comment créer un compte sur MLM ?**

**Réponse** :
L'inscription est rapide et **sans mot de passe** :

**Méthode 1 : OAuth (Recommandée)**
1. Cliquez sur "S'inscrire" dans le header
2. Choisissez votre méthode :
   - 🔵 Google
   - ⚫ Apple
   - 🔵 Facebook
3. Autorisez l'accès
4. Vous êtes connecté automatiquement !

**Méthode 2 : Magic Link (Email)**
1. Cliquez sur "S'inscrire"
2. Saisissez votre email
3. Cliquez sur "Recevoir un lien de connexion"
4. Vérifiez votre boîte email
5. Cliquez sur le lien (valable 15 minutes)
6. Vous êtes connecté !

**Après la première connexion :**
- Complétez votre profil (WhatsApp, Pays, Ville)
- Ajoutez vos comptes de jeu avec screenshots
- Attendez la validation par un modérateur
- Recevez 10 pièces gratuites !

[Créer mon compte maintenant →]

---

**Q1.3 : Quels jeux sont supportés ?**

**Réponse** :
MLM supporte actuellement **3 jeux de football mobile** :

1. **⚽ E-football (eFootball PES)**
   - Version mobile de Konami
   - Modes PvP supportés

2. **🎮 FC Mobile (EA Sports)**
   - Anciennement FIFA Mobile
   - EA Sports FC Mobile

3. **🏆 Dream League Soccer**
   - First Touch Games
   - Mode multijoueur

**Important :** Vous devez avoir un compte dans au moins un de ces jeux pour participer aux tournois. Les screenshots de votre équipe in-game sont obligatoires lors de la validation du profil.

---

**Q1.4 : Est-ce gratuit de s'inscrire ?**

**Réponse** :
**Oui, l'inscription est 100% gratuite !**

**Ce que vous recevez gratuitement :**
- ✅ Création de compte (0 FCFA)
- ✅ 10 pièces MLM offertes après validation du profil (valeur : 5,000 FCFA)
- ✅ Accès à tous les tournois publics
- ✅ Support communautaire

**Les seuls frais :**
- 💰 Frais d'inscription aux tournois (variables selon le tournoi)
  - Exemples : 3 pièces, 5 pièces, 10 pièces
  - Ces frais constituent le prize pool redistribué aux gagnants

**Note MVP :** La recharge et le retrait de pièces ne sont pas encore disponibles dans cette version. Vous ne pouvez utiliser que vos 10 pièces de départ et vos gains de tournois.

---

**Q1.5 : Combien de temps prend la validation du profil ?**

**Réponse** :
**En général : 24 à 48 heures**

**Processus de validation :**

1. **Vous soumettez votre profil** :
   - Informations personnelles (WhatsApp, Pays, Ville)
   - Au moins 1 compte de jeu avec screenshot

2. **Un modérateur examine** :
   - Vérifie que le screenshot est lisible
   - Vérifie que les informations sont cohérentes
   - Valide ou rejette le profil

3. **Vous recevez une notification** :
   - ✅ **Validé** : 10 pièces sont ajoutées à votre wallet automatiquement
   - ❌ **Rejeté** : Raison du rejet fournie, vous pouvez modifier et resoumettre

**Astuce :** Pour une validation rapide, assurez-vous que :
- Le screenshot est **clair et lisible**
- Votre pseudo in-game est **visible**
- Votre équipe/statistiques sont **visibles**
- Le numéro WhatsApp est **valide**

**Pendant l'attente :**
- Vous pouvez explorer la plateforme
- Vous pouvez consulter les tournois
- Vous **ne pouvez pas vous inscrire** aux tournois (profil non validé)

---

### 👤 Catégorie 2 : Profil et Compte

**ID** : `#profil`

---

**Q2.1 : Pourquoi dois-je ajouter mon numéro WhatsApp ?**

**Réponse** :
Le numéro WhatsApp est **obligatoire** pour plusieurs raisons :

**1. Communication rapide**
- Les organisateurs peuvent vous contacter pour les détails des matchs
- Vous recevez des rappels importants (horaires de match, litiges)
- Coordination avec les adversaires

**2. Vérification d'identité**
- Limite les faux comptes
- Améliore la sécurité de la plateforme

**3. Résolution de litiges**
- Si un match est disputé, le modérateur peut vous contacter
- Preuve de participation réelle

**Confidentialité :**
- Votre numéro n'est **jamais partagé publiquement**
- Seuls les organisateurs de tournois auxquels vous participez peuvent le voir
- Les modérateurs y ont accès uniquement pour résolution de litiges

**Format accepté :** +237XXXXXXXXX (avec indicatif pays)

---

**Q2.2 : Puis-je ajouter plusieurs comptes de jeu ?**

**Réponse** :
**Oui, vous pouvez ajouter jusqu'à 3 comptes de jeu** (un par jeu supporté) :

- 1 compte E-football
- 1 compte FC Mobile
- 1 compte Dream League Soccer

**Avantages :**
- Participez à des tournois sur différents jeux
- Plus de flexibilité dans les inscriptions
- Recevez des recommandations de tournois personnalisées

**Comment ajouter un compte :**
1. Allez dans "Mes Comptes de Jeu"
2. Cliquez sur "+ Ajouter un compte"
3. Sélectionnez le jeu
4. Entrez votre pseudo in-game
5. Uploadez un screenshot de votre équipe/profil
6. Cliquez sur "Enregistrer"

**Important :** Chaque nouveau compte de jeu nécessite une **re-validation** par un modérateur avant de pouvoir être utilisé dans les tournois.

---

**Q2.3 : Mon profil a été rejeté, que faire ?**

**Réponse** :
**Ne vous inquiétez pas, c'est normal !** Les profils sont parfois rejetés pour des raisons simples.

**Raisons courantes de rejet :**
- ❌ Screenshot flou ou illisible
- ❌ Pseudo in-game non visible
- ❌ Screenshot ne correspond pas au jeu déclaré
- ❌ Informations personnelles incomplètes
- ❌ Numéro WhatsApp invalide

**Que faire :**
1. **Consultez la raison du rejet** :
   - Allez dans "Mon Profil"
   - Lisez attentivement le message du modérateur

2. **Corrigez le problème** :
   - Prenez un nouveau screenshot (clair, bonne résolution)
   - Assurez-vous que votre pseudo est visible
   - Vérifiez vos informations

3. **Resoumettez votre profil** :
   - Cliquez sur "Modifier et Resoumettre"
   - Uploadez le nouveau screenshot
   - Validez

**Astuce :** Prenez le screenshot en plein jour avec une bonne luminosité d'écran !

---

**Q2.4 : Puis-je changer mon numéro WhatsApp après validation ?**

**Réponse** :
**Oui, mais une nouvelle validation sera nécessaire.**

**Procédure :**
1. Allez dans "Mon Profil"
2. Cliquez sur "Modifier"
3. Changez votre numéro WhatsApp
4. Cliquez sur "Enregistrer"
5. **Important :** Votre profil repasse en statut "En attente de validation"
6. Un modérateur devra re-valider votre profil

**Pendant la re-validation :**
- Vous **ne pourrez plus vous inscrire** à de nouveaux tournois
- Vos inscriptions actuelles restent valides
- Vos matchs en cours ne sont pas affectés

**Délai :** 24-48h pour la re-validation

---

**Q2.5 : Comment supprimer mon compte ?**

**Réponse** :
Pour supprimer votre compte, contactez le support via l'adresse email : **support@mlm-platform.com**

**Informations à fournir :**
- Votre email de connexion
- Raison de la suppression (optionnel)

**Ce qui sera supprimé :**
- Vos informations personnelles
- Vos comptes de jeu
- Votre historique de matchs
- Vos transactions

**Important :**
- ⚠️ Le solde de votre wallet sera **perdu** (pas de remboursement en MVP)
- ⚠️ Cette action est **irréversible**
- ⚠️ Vous ne pourrez plus participer aux tournois en cours

**Délai de traitement :** 7 jours ouvrés

---

### 🏆 Catégorie 3 : Tournois

**ID** : `#tournois`

---

**Q3.1 : Comment m'inscrire à un tournoi ?**

**Réponse** :
**Prérequis avant inscription :**
1. ✅ Profil validé par un modérateur
2. ✅ Compte de jeu correspondant au tournoi
3. ✅ Solde suffisant dans votre wallet (≥ frais d'inscription)
4. ✅ Places disponibles dans le tournoi

**Étapes d'inscription :**
1. Allez dans "Tournois"
2. Filtrez par jeu si nécessaire (E-football, FC Mobile, DLS)
3. Cliquez sur un tournoi qui vous intéresse
4. Consultez les détails (frais, prize pool, règles)
5. Cliquez sur "S'inscrire"
6. **Sélectionnez le compte de jeu** à utiliser (si vous en avez plusieurs)
7. Confirmez l'inscription
8. Les frais sont **déduits automatiquement** de votre wallet
9. Vous recevez une confirmation ✅

**Après inscription :**
- Vous apparaissez dans la liste des participants
- Vous recevez des notifications sur le tournoi
- Attendez que l'organisateur démarre le tournoi

**Important :** Une fois inscrit, vous ne pouvez **pas annuler** l'inscription si le tournoi a déjà commencé. Vous pouvez vous retirer uniquement pendant la période d'inscription.

---

**Q3.2 : Qu'est-ce que le Format Suisse ?**

**Réponse** :
Le **Format Suisse** est un système de tournoi unique où **personne n'est éliminé** !

**Principe :**
- Tout le monde joue **toutes les rondes**
- Les joueurs sont appariés selon leur score actuel
- Nombre de rondes = **N = ⌈log₂(P)⌉** où P = nombre de participants
  - 8 joueurs → 3 rondes
  - 16 joueurs → 4 rondes
  - 32 joueurs → 5 rondes

**Comment ça marche :**

**Ronde 1 :**
- Appariement **aléatoire**
- Tout le monde joue

**Rondes suivantes :**
- Les joueurs avec le **même score** s'affrontent
- Exemple : Ceux à 6 points jouent ensemble, ceux à 3 points aussi
- **Pas de rematch** : Vous ne jouez jamais 2 fois contre le même adversaire
- Si nombre impair de joueurs → 1 joueur reçoit un **bye** (victoire automatique)

**Système de points :**
- Victoire : **3 points**
- Nul : **1 point**
- Défaite : **0 point**

**Classement final :**
Basé sur le total de points accumulés. En cas d'égalité :
1. Nombre de victoires
2. Différence de buts
3. Buts marqués

**Avantages :**
- ✅ Équitable : Même les perdants jouent toutes les rondes
- ✅ Compétitif : Vous jouez contre des joueurs de votre niveau
- ✅ Rapide : Nombre de rondes logarithmique

[En savoir plus sur le Format Suisse →]

---

**Q3.3 : Combien coûte l'inscription à un tournoi ?**

**Réponse** :
**Le coût varie selon le tournoi**, fixé par l'organisateur.

**Exemples de tarifs courants :**
- **Tournoi amateur** : 2-3 pièces (1,000-1,500 FCFA)
- **Tournoi standard** : 5 pièces (2,500 FCFA)
- **Tournoi premium** : 10 pièces (5,000 FCFA)
- **Tournoi gratuit** : 0 pièces (rare)

**Prize Pool :**
Le prize pool est constitué de la somme des frais d'inscription :
- 16 joueurs × 5 pièces = **80 pièces** de prize pool

**Distribution typique :**
- 🥇 1er : 50% (40 pièces)
- 🥈 2e : 30% (24 pièces)
- 🥉 3e : 20% (16 pièces)

**Important :**
- Les frais sont **déduits immédiatement** de votre wallet à l'inscription
- Si vous vous **retirez** avant le début, les frais sont **remboursés**
- Si le tournoi est **annulé**, remboursement automatique

---

**Q3.4 : Puis-je créer mes propres tournois ?**

**Réponse** :
**Oui, si vous avez le rôle "Organisateur".**

**Comment devenir Organisateur :**
Contactez un administrateur via **support@mlm-platform.com** avec :
- Votre profil MLM
- Motivation (pourquoi vous souhaitez organiser des tournois)
- Expérience (si applicable)

**Une fois approuvé, vous pouvez :**
1. Créer des tournois
2. Définir les paramètres :
   - Jeu (E-football, FC Mobile, DLS)
   - Nombre max de participants
   - Frais d'inscription
   - Distribution des prix
   - Dates et règles
3. Gérer les inscriptions
4. Démarrer le tournoi (génération automatique des rondes)
5. Suivre la progression

**Responsabilités :**
- Communiquer avec les participants
- S'assurer du bon déroulement
- Respecter les horaires annoncés
- Répondre aux questions des joueurs

**Avantages :**
- Badge Organisateur 🔵
- Visibilité dans la communauté
- Possibilité de créer des tournois personnalisés

---

**Q3.5 : Que se passe-t-il si je ne joue pas un match ?**

**Réponse** :
**Ne pas jouer un match a des conséquences graves :**

**1. Forfait automatique**
- Votre adversaire gagne **3-0 par forfait**
- Vous recevez **0 point**
- Le match est marqué comme "Forfait" dans votre historique

**2. Impact sur le classement**
- Vous perdez des positions dans le leaderboard
- Votre ratio Victoires-Défaites est affecté

**3. Sanctions possibles** (en cas de forfaits répétés)
- ⚠️ Avertissement du modérateur
- ⚠️ Suspension temporaire (1-7 jours)
- ⚠️ Bannissement (cas extrêmes)

**4. Réputation**
- Les organisateurs peuvent voir votre historique de forfaits
- Peut impacter votre acceptation dans des tournois futurs

**Comment éviter le forfait :**
- Vérifiez les horaires avant de vous inscrire
- Activez les notifications
- Communiquez avec votre adversaire via WhatsApp
- Si empêchement : Contactez l'organisateur **avant** le match

**Important :** Les forfaits intentionnels pour manipuler le classement sont **strictement interdits** et peuvent entraîner un bannissement permanent.

---

**Q3.6 : Puis-je me retirer d'un tournoi après inscription ?**

**Réponse** :
**Oui, mais avec conditions :**

**Avant le début du tournoi (Status: "Inscriptions ouvertes")**
- ✅ Retrait possible
- ✅ Remboursement **complet** des frais d'inscription
- ✅ Aucune pénalité

**Comment se retirer :**
1. Allez dans "Mes Inscriptions"
2. Trouvez le tournoi concerné
3. Cliquez sur "Se retirer"
4. Confirmez
5. Les pièces sont **recréditées immédiatement** dans votre wallet

**Après le début du tournoi (Status: "En cours")**
- ❌ Retrait **impossible**
- ❌ Pas de remboursement
- Vous devez jouer tous vos matchs ou recevoir des forfaits

**Exception :**
Si le tournoi est **annulé par l'organisateur**, remboursement automatique quel que soit le statut.

---

### ⚽ Catégorie 4 : Matchs et Résultats

**ID** : `#matchs`

---

**Q4.1 : Comment soumettre le résultat d'un match ?**

**Réponse** :
**Après avoir joué votre match, suivez ces étapes :**

1. **Prenez un screenshot du résultat final**
   - Assurez-vous que les scores sont **clairement visibles**
   - Incluez les pseudos des 2 joueurs si possible
   - Format : JPEG, PNG (max 5MB)

2. **Allez dans "Mes Matchs"**
   - Onglet "À Jouer"
   - Trouvez le match concerné

3. **Cliquez sur "Soumettre résultat"**

4. **Remplissez le formulaire :**
   - Votre score : [_]
   - Score adversaire : [_]
   - Screenshot : Uploadez votre image
   - Commentaire (optionnel)

5. **Validez**

**Délai :** Vous avez **24 heures après l'horaire prévu** du match pour soumettre le résultat.

**Ce qui se passe ensuite :**

**Scénario 1 : Vous êtes le premier**
- Message : "En attente de la soumission de votre adversaire"
- Statut match : "En attente"

**Scénario 2 : Scores concordent**
- Exemple : Vous : 3-1, Adversaire : 1-3 ✅
- **Validation automatique**
- Points ajoutés au classement immédiatement
- Match marqué comme "Terminé"

**Scénario 3 : Scores divergent**
- Exemple : Vous : 3-1, Adversaire : 2-2 ❌
- **Litige créé**
- Envoi à un modérateur
- Vous recevez une notification quand le modérateur tranche

---

**Q4.2 : Que se passe-t-il si les résultats ne correspondent pas ?**

**Réponse** :
**Un litige est créé automatiquement.**

**Processus de résolution :**

1. **Détection automatique**
   - Le système détecte que les scores ne concordent pas
   - Match status → "Disputé"
   - Notification envoyée aux 2 joueurs et au modérateur

2. **Examen par un modérateur**
   - Le modérateur consulte les **2 screenshots**
   - Analyse les preuves
   - Détermine le score correct

3. **Décision du modérateur**
   - Le modérateur entre le score final
   - Les points sont attribués
   - Match status → "Terminé"
   - Les 2 joueurs sont notifiés

**Délai de résolution :** 24-72 heures

**Critères du modérateur :**
- Clarté des screenshots
- Cohérence des preuves
- Historique des joueurs (si litiges répétés)

**Important :**
- ⚠️ Soumettre un faux résultat intentionnellement = **Bannissement**
- ⚠️ Screenshot modifié/photoshoppé = **Bannissement permanent**
- ✅ Erreur de bonne foi = Pas de pénalité

**Conseil :** Prenez TOUJOURS un screenshot clair du résultat final, même si vous perdez !

---

**Q4.3 : Puis-je contester une décision de modérateur ?**

**Réponse** :
**Non, les décisions des modérateurs sont finales dans le MVP.**

**Pourquoi :**
- Les modérateurs sont formés et neutres
- Ils examinent les preuves factuelles (screenshots)
- Contestations multiples ralentiraient trop les tournois

**Si vous pensez qu'il y a une erreur :**
1. Assurez-vous d'avoir fourni un screenshot **clair**
2. Vérifiez que vous n'avez pas fait d'erreur de saisie
3. Si vraie erreur manifeste : Contactez **support@mlm-platform.com**

**Sanctions pour abus :**
- Contester systématiquement sans raison = Avertissement
- Harcèlement de modérateurs = Suspension

**Futur (Phase 2+) :**
Un système d'appel pourra être mis en place avec panel de 3 modérateurs.

---

**Q4.4 : Combien de temps ai-je pour jouer un match ?**

**Réponse** :
**Délai standard : 24 heures** après l'horaire programmé.

**Exemple :**
- Match programmé : 25 Déc 2024, 15:00
- Délai de jeu : Jusqu'au 26 Déc 2024, 15:00
- Délai de soumission : Jusqu'au 26 Déc 2024, 15:00

**Flexibilité :**
- Vous pouvez jouer **avant** l'horaire programmé si les 2 joueurs sont d'accord
- Coordonnez-vous via WhatsApp avec votre adversaire

**Si le délai expire :**
- **Aucun résultat soumis** → Double forfait (0-0, 0 point chacun)
- **1 seul résultat soumis** → Victoire par forfait pour celui qui a soumis (3-0)
- **2 résultats soumis** → Traitement normal (validation auto ou litige)

**Prolongation :**
Si problème technique majeur, contactez l'organisateur qui peut accorder un délai supplémentaire.

---

**Q4.5 : Où voir l'historique de mes matchs ?**

**Réponse** :
Allez dans **"Mes Matchs"** depuis le menu principal.

**2 onglets disponibles :**

**1. À Jouer**
- Matchs programmés à venir
- Matchs en attente de résultat
- Statut : ⏳ En attente, 🟢 En cours

**2. Historique**
- Tous vos matchs terminés
- Infos affichées :
  - Tournoi
  - Adversaire
  - Score
  - Résultat (Victoire ✅ / Nul 🟡 / Défaite ❌)
  - Date

**Filtres disponibles :**
- Par tournoi
- Par jeu
- Par résultat (V-N-D)
- Par date

**Détails d'un match :**
Cliquez sur un match pour voir :
- Screenshots soumis
- Commentaires
- Horaire exact
- Ronde du tournoi

---

### 💰 Catégorie 5 : Pièces MLM et Wallet

**ID** : `#wallet`

---

**Q5.1 : Qu'est-ce qu'une pièce MLM ?**

**Réponse** :
La **pièce MLM** est la monnaie virtuelle de la plateforme Mobile League Manager.

**Valeur :**
- **1 pièce MLM = 500 FCFA**

**Utilisations :**
- ✅ S'inscrire aux tournois
- ✅ Recevoir des gains de tournois
- ✅ Participer à l'économie de la plateforme

**Avantages :**
- Transactions instantanées
- Pas de frais de conversion
- Système sécurisé

**Note MVP :**
- ❌ Pas de recharge possible (Phase 2)
- ❌ Pas de retrait vers Mobile Money (Phase 2)
- ✅ Vous utilisez vos 10 pièces de départ + gains de tournois

---

**Q5.2 : Comment obtenir des pièces MLM ?**

**Réponse** :
**3 façons d'obtenir des pièces dans le MVP :**

**1. Bonus de bienvenue (10 pièces)**
- Offert **automatiquement** après validation de votre profil
- Valeur : 5,000 FCFA
- Utilisable immédiatement

**2. Gagner des tournois**
- Participez aux tournois
- Classez-vous dans le top 3
- Recevez votre part du prize pool
- Crédit automatique dans votre wallet

**3. Cadeau d'un administrateur** (rare)
- Pour contribution exceptionnelle
- Événements spéciaux
- Bug bounty

**Futur (Phase 2) :**
- Recharge via Mobile Money (MTN, Orange)
- Recharge via Carte bancaire
- Parrainages

---

**Q5.3 : Comment recharger mon wallet ?**

**Réponse** :
**❌ La recharge n'est pas disponible dans le MVP.**

Cette fonctionnalité sera ajoutée en **Phase 2** avec :
- 💳 Mobile Money (MTN Money, Orange Money, Moov Money)
- 💳 Carte bancaire (Visa, Mastercard)
- 💳 Crypto-monnaies (Bitcoin, USDT)

**Pour l'instant :**
- Utilisez vos 10 pièces de départ
- Gagnez des tournois pour augmenter votre solde
- Participez à des tournois gratuits ou low-cost

**Besoin urgent de pièces ?**
Contactez un administrateur qui peut créditer votre compte manuellement (cas exceptionnels).

---

**Q5.4 : Comment retirer mes gains ?**

**Réponse** :
**❌ Le retrait n'est pas disponible dans le MVP.**

**Raisons :**
- Focus sur l'expérience de jeu d'abord
- Éviter les complexités réglementaires initiales
- Tester l'économie du système

**Phase 2 (à venir) :**
- Retrait vers Mobile Money
- Seuil minimum : 20 pièces (10,000 FCFA)
- Frais de retrait : 5%
- Délai : 24-48h

**En attendant :**
- Vos gains s'accumulent dans votre wallet
- Utilisez-les pour participer à d'autres tournois
- Construisez votre bankroll

---

**Q5.5 : Où voir l'historique de mes transactions ?**

**Réponse** :
Allez dans **"Mon Wallet"** depuis le menu.

**Sections disponibles :**

**1. Solde actuel**
- Affichage en pièces MLM
- Conversion en FCFA

**2. Statistiques**
- Total crédité (toutes les entrées)
- Total débité (toutes les sorties)
- Nombre de transactions

**3. Historique**
Liste complète de toutes vos transactions :

**Colonnes :**
- Type (Crédit ✅ / Débit ❌)
- Montant (+ ou -)
- Raison
  - "Bonus de bienvenue"
  - "Inscription tournoi: [Nom]"
  - "Prix tournoi: [Nom] - 1er place"
  - "Remboursement: [Nom]"
- Date et heure

**Filtres :**
- Par type (Crédit / Débit)
- Par raison
- Par période (7j, 30j, tout)

**Export :**
Vous pouvez exporter votre historique en PDF ou CSV (Phase 2).

---

### 🎯 Catégorie 6 : Format Suisse

**ID** : `#format-suisse`

---

**Q6.1 : Pourquoi le Format Suisse et pas l'élimination directe ?**

**Réponse** :
**Le Format Suisse est plus équitable et inclusif :**

**Avantages vs Élimination Directe :**

**Format Suisse ✅**
- Tout le monde joue **toutes les rondes**
- Même si vous perdez, vous continuez
- Vous jouez contre des adversaires de votre niveau
- Plus de matchs = Plus d'expérience
- Classement basé sur la performance globale

**Élimination Directe ❌**
- 1 défaite = Vous êtes éliminé
- 50% des joueurs sortent à chaque ronde
- Vous payez mais jouez potentiellement 1 seul match
- Matchs déséquilibrés (pro vs débutant)
- Chance/malchance peut dominer le skill

**Exemple concret :**

Tournoi à 16 joueurs :

**Format Suisse :**
- 4 rondes pour tout le monde
- 64 matchs au total
- Chacun joue 4 matchs garantis
- Frais : 5 pièces → 4 matchs = 1.25 pièce/match

**Élimination Directe :**
- 4 rondes
- 15 matchs au total
- 8 joueurs jouent 1 match, 4 jouent 2, 2 jouent 3, 1 joue 4
- Frais : 5 pièces → 50% chance de jouer 1 seul match = 5 pièces/match

**Conclusion :** Format Suisse = Meilleur rapport qualité/prix et plus équitable !

---

**Q6.2 : Comment fonctionne l'appariement dans le Format Suisse ?**

**Réponse** :
**L'appariement évolue ronde par ronde :**

**Ronde 1 : Appariement aléatoire**
- Les joueurs sont mélangés
- Appariement totalement aléatoire
- Exemple :
  - ProGamer123 vs ElitePlayer
  - ChampionX vs MasterPro
  - Etc.

**Rondes 2+ : Appariement par score**

**Principe :**
1. Les joueurs sont **triés par points**
2. Joueurs avec **même score** sont appariés ensemble
3. **Pas de rematch** : On évite les adversaires déjà affrontés
4. Si nombre impair → 1 joueur a un **bye** (victoire 3-0)

**Exemple Ronde 2 (après ronde 1) :**

```
Classement après R1:
1. ProGamer123 - 3 pts
2. ChampionX - 3 pts
3. ElitePlayer - 3 pts
4. MasterPro - 1 pt (nul)
5. PlayerFive - 1 pt (nul)
6. Rookie - 0 pt
7. Beginner - 0 pt

Appariements R2:
- ProGamer123 vs ChampionX (tous deux 3 pts)
- ElitePlayer vs Bye (3 pts, nombre impair)
- MasterPro vs PlayerFive (tous deux 1 pt)
- Rookie vs Beginner (tous deux 0 pt)
```

**Algorithme intelligent :**
- Si 2 joueurs même score ont déjà joué ensemble → On prend le suivant
- Priorité aux joueurs n'ayant pas eu de bye
- Minimise les écarts de score dans les appariements

---

**Q6.3 : Combien de rondes dans un tournoi Suisse ?**

**Réponse** :
**Le nombre de rondes est calculé automatiquement** selon la formule :

**N = ⌈log₂(P)⌉**

Où :
- N = Nombre de rondes
- P = Nombre de participants
- ⌈ ⌉ = Arrondi supérieur

**Tableau de référence :**

| Participants | Formule | Rondes |
|--------------|---------|--------|
| 4 joueurs | ⌈log₂(4)⌉ | 2 rondes |
| 8 joueurs | ⌈log₂(8)⌉ | 3 rondes |
| 12 joueurs | ⌈log₂(12)⌉ | 4 rondes |
| 16 joueurs | ⌈log₂(16)⌉ | 4 rondes |
| 24 joueurs | ⌈log₂(24)⌉ | 5 rondes |
| 32 joueurs | ⌈log₂(32)⌉ | 5 rondes |
| 64 joueurs | ⌈log₂(64)⌉ | 6 rondes |

**Pourquoi cette formule ?**
- Garantit assez de rondes pour séparer les meilleurs joueurs
- Évite trop de rondes (fatigue, durée)
- Optimum mathématique pour un classement juste

**Durée totale :**
Si chaque ronde prend 24h (match + soumission) :
- 16 joueurs → 4 rondes → 4 jours
- 32 joueurs → 5 rondes → 5 jours

---

**Q6.4 : Qu'est-ce qu'un "bye" ?**

**Réponse** :
Un **bye** est une victoire automatique donnée à un joueur quand le nombre de participants est **impair**.

**Exemple :**
- Tournoi à 13 joueurs
- Ronde 2 : 13 est impair
- 1 joueur ne peut pas être apparié
- Ce joueur reçoit un **bye**

**Conséquences d'un bye :**
- ✅ Victoire automatique **3-0**
- ✅ **+3 points** ajoutés au classement
- ✅ Pas de match à jouer cette ronde
- ✅ Vous passez directement à la ronde suivante

**Attribution du bye :**
Priorité aux joueurs qui :
1. N'ont **jamais eu de bye** dans ce tournoi
2. Ont le **score le plus bas** actuellement (équité)

**Avantage ou désavantage ?**

**Avantage :**
- 3 points gratuits
- Pas de risque de perdre

**Désavantage :**
- Pas de différence de buts (tiebreaker)
- Moins d'expérience de jeu

**Important :** Un joueur ne peut **jamais recevoir 2 byes** dans le même tournoi (sauf si vraiment impossible).

---

**Q6.5 : Comment sont départagés les joueurs à égalité de points ?**

**Réponse** :
Si plusieurs joueurs terminent avec le **même nombre de points**, le départage se fait selon cet ordre :

**1. Nombre de victoires**
- Celui qui a le plus de victoires est mieux classé
- Exemple :
  - Joueur A : 10 pts (3V-1N-0D)
  - Joueur B : 10 pts (2V-4N-0D)
  - **Joueur A** est devant (3 > 2 victoires)

**2. Différence de buts**
- Si toujours égalité, on regarde (Buts marqués - Buts encaissés)
- Exemple :
  - Joueur A : +5 (15 buts pour, 10 contre)
  - Joueur B : +3 (12 buts pour, 9 contre)
  - **Joueur A** est devant

**3. Buts marqués**
- Si toujours égalité, on regarde le total de buts marqués
- Exemple :
  - Joueur A : 15 buts marqués
  - Joueur B : 12 buts marqués
  - **Joueur A** est devant

**4. Confrontation directe** (si applicable)
- Si les 2 joueurs se sont affrontés, le vainqueur est devant

**5. Tirage au sort** (cas extrême)
- Si vraiment tout est égal, tirage au sort par le système

**Exemple complet :**

```
Classement final (3 joueurs à 12 pts):

1. ProGamer123 - 12 pts (4V-0N-1D) - +8 buts - 20 buts
2. ChampionX - 12 pts (4V-0N-1D) - +8 buts - 18 buts
3. ElitePlayer - 12 pts (3V-3N-0D) - +5 buts - 17 buts

Départage:
- Tous 12 pts → Regarde victoires
- Pro et Champion: 4V > Elite: 3V → Elite 3e
- Pro vs Champion: Même victoires → Regarde diff buts
- Pro et Champion: +8 identique → Regarde buts marqués
- Pro: 20 > Champion: 18 → Pro 1er, Champion 2e
```

---

### 🛡️ Catégorie 7 : Sécurité et Modération

**ID** : `#securite`

---

**Q7.1 : Comment MLM lutte contre la triche ?**

**Réponse** :
MLM a mis en place **plusieurs mesures anti-triche** :

**1. Validation des profils**
- ✅ Screenshot du jeu obligatoire
- ✅ Vérification manuelle par modérateurs
- ✅ Numéro WhatsApp vérifié
- ⚠️ Faux comptes détectés et bannis

**2. Screenshots obligatoires**
- Chaque match nécessite un screenshot du résultat
- Modérateurs comparent en cas de litige
- Screenshots modifiés = Bannissement permanent

**3. Système de réputation** (Phase 2)
- Historique de forfaits visible
- Historique de litiges visible
- Organisateurs peuvent refuser des joueurs à risque

**4. Détection de patterns suspects**
- Victoires trop faciles répétées
- Scores irréalistes (10-0 systématiquement)
- Collaboration entre joueurs
- Algorithme de détection automatique

**5. Modération active**
- Équipe de modérateurs formés
- Réponse aux signalements sous 24h
- Enquêtes sur comportements suspects

**6. Sanctions graduées**
- Avertissement (1ère infraction mineure)
- Suspension temporaire (7-30 jours)
- Bannissement permanent (triche avérée)

**Comment signaler une triche ?**
- Email : **report@mlm-platform.com**
- Fournissez : Pseudo, tournoi, match, preuves

---

**Q7.2 : Que faire si je soupçonne un adversaire de tricher ?**

**Réponse** :
**Suivez cette procédure :**

**Pendant le match :**
1. **Prenez des screenshots** :
   - Écran de jeu
   - Résultat final
   - Tout comportement suspect

2. **Jouez normalement** :
   - Ne quittez pas le match
   - Terminez le match
   - Soumettez votre résultat honnête

**Après le match :**
3. **Soumettez votre résultat avec screenshot**

4. **Signalez le comportement** :
   - Email : **report@mlm-platform.com**
   - Objet : "Signalement triche - [Tournoi] - [Adversaire]"
   - Contenu :
     - Nom du tournoi
     - Pseudo de l'adversaire
     - Ronde / Match ID
     - Description du comportement suspect
     - Screenshots joints

**Ce qui se passe ensuite :**
- Un modérateur examine le signalement (24-48h)
- Enquête approfondie si nécessaire
- Sanctions si triche avérée
- Vous êtes notifié du résultat

**Types de triche courants :**
- Utilisation de hacks/mods
- Screenshot modifié (Photoshop)
- Collaboration entre joueurs
- Multi-comptes (1 personne = plusieurs comptes)
- Déconnexion intentionnelle

**Important :**
- ⚠️ Signalements abusifs répétés = Sanction
- ✅ Soyez honnête et fournissez des preuves

---

**Q7.3 : Mes données personnelles sont-elles sécurisées ?**

**Réponse** :
**Oui, MLM prend la sécurité de vos données très au sérieux.**

**Données collectées :**
- Email (authentification)
- Nom (profil)
- Numéro WhatsApp (communication)
- Pays, Ville (localisation générale)
- Pseudos in-game (compétition)
- Screenshots (validation)

**Sécurité technique :**
- ✅ **HTTPS** : Toutes les connexions chiffrées
- ✅ **Tokens sécurisés** : Laravel Sanctum
- ✅ **Hash** : Données sensibles hashées
- ✅ **Serveurs sécurisés** : Infrastructure protégée
- ✅ **Backups réguliers** : Données sauvegardées

**Confidentialité :**
- ❌ Votre email **n'est jamais partagé**
- ❌ Votre WhatsApp **n'est pas public**
- ❌ Vos données **ne sont jamais vendues**
- ✅ Seuls organisateurs de vos tournois voient WhatsApp
- ✅ Seuls modérateurs ont accès complet (pour validation)

**Conformité :**
- Respect du RGPD (Règlement Général sur la Protection des Données)
- Droit à l'oubli : Vous pouvez demander suppression totale
- Droit d'accès : Vous pouvez exporter vos données

**En cas de fuite de données :**
- Notification immédiate à tous les utilisateurs
- Rapport aux autorités compétentes
- Mesures correctives transparentes

---

**Q7.4 : Puis-je être banni de la plateforme ?**

**Réponse** :
**Oui, en cas de violation des Conditions Générales d'Utilisation (CGU).**

**Raisons de bannissement :**

**Bannissement permanent (immédiat) :**
- 🚫 Triche avérée (hacks, mods)
- 🚫 Screenshot modifié/falsifié
- 🚫 Multi-comptes (plusieurs comptes pour 1 personne)
- 🚫 Harcèlement, insultes, menaces
- 🚫 Manipulation de résultats (collusion)

**Suspension temporaire (7-30 jours) :**
- ⚠️ Forfaits répétés sans justification
- ⚠️ Comportement antisportif
- ⚠️ Spam, publicité non autorisée
- ⚠️ Non-respect des horaires répété

**Avertissement (sans bannissement) :**
- ⚠️ 1er forfait
- ⚠️ Retard mineur
- ⚠️ Erreur de soumission de résultat

**Procédure :**
1. **Détection** : Modérateur ou système détecte violation
2. **Enquête** : Examen des preuves
3. **Notification** : Vous recevez un email expliquant la raison
4. **Sanction** : Avertissement, suspension ou bannissement
5. **Appel** (Phase 2) : Possibilité de contester (cas sérieux)

**Conséquences du bannissement :**
- ❌ Impossible de se connecter
- ❌ Perte du solde wallet (pas de remboursement)
- ❌ Retrait de tous les tournois en cours
- ❌ Suppression du classement/historique

**Comment éviter le bannissement :**
- Respectez les règles
- Jouez honnêtement
- Communiquez respectueusement
- Signalez les bugs au lieu de les exploiter

---

**Q7.5 : Qui sont les modérateurs et comment sont-ils choisis ?**

**Réponse** :
Les **modérateurs** sont des membres de la communauté sélectionnés pour faire respecter les règles.

**Rôles des modérateurs :**
- ✅ Valider les profils des nouveaux joueurs
- ✅ Résoudre les litiges de matchs
- ✅ Examiner les signalements de triche
- ✅ Sanctionner les violations des CGU
- ✅ Aider les utilisateurs en difficulté

**Critères de sélection :**
- Membre actif de la communauté (>3 mois)
- Historique propre (aucune sanction)
- Bonne réputation (pas de litiges)
- Impartialité et neutralité
- Disponibilité (minimum 5h/semaine)

**Formation :**
- Guide des modérateurs
- Études de cas
- Période probatoire (1 mois)
- Supervision par administrateurs

**Éthique :**
- ⚠️ Modérateur ne peut **jamais** modérer ses propres matchs
- ⚠️ Conflits d'intérêts déclarés obligatoirement
- ⚠️ Abus de pouvoir = Retrait immédiat du rôle

**Devenir modérateur :**
Envoyez votre candidature à **moderator@mlm-platform.com** avec :
- Votre profil MLM
- Motivation
- Disponibilité

**Rémunération :**
- 🪙 Pièces MLM bonus mensuelles
- 🏅 Badge Modérateur 🛡️
- 🎁 Accès anticipé aux nouvelles fonctionnalités

---

### 🔧 Catégorie 8 : Problèmes Techniques

**ID** : `#technique`

---

**Q8.1 : Je n'ai pas reçu l'email de Magic Link, que faire ?**

**Réponse** :
**Suivez ces étapes de dépannage :**

**1. Vérifiez votre dossier Spam/Courrier indésirable**
- L'email peut avoir été filtré
- Cherchez "Mobile League Manager" ou "noreply@mlm-platform.com"

**2. Vérifiez l'adresse email saisie**
- Retournez sur la page de connexion
- Resaisissez votre email correctement
- Cliquez à nouveau sur "Recevoir un lien"

**3. Attendez 2-3 minutes**
- L'envoi peut prendre quelques minutes
- Rafraîchissez votre boîte de réception

**4. Essayez avec un autre email**
- Utilisez Gmail, Outlook ou Yahoo (plus fiables)
- Évitez les emails professionnels (peuvent bloquer)

**5. Utilisez OAuth à la place**
- Plus rapide et plus fiable
- Google, Apple ou Facebook
- Pas besoin d'email

**Si le problème persiste :**
Contactez le support : **support@mlm-platform.com** avec :
- L'email que vous avez essayé
- Heure de la tentative
- Screenshot de la page (si possible)

**Délai de réponse :** 24h

---

**Q8.2 : Le lien Magic Link a expiré, que faire ?**

**Réponse** :
Les liens Magic Link **expirent après 15 minutes** pour des raisons de sécurité.

**Solution simple :**
1. Retournez sur [https://mlm-platform.com/login](https://mlm-platform.com/login)
2. Saisissez à nouveau votre email
3. Cliquez sur "Recevoir un lien de connexion"
4. Un **nouveau lien** sera envoyé
5. Cliquez dessus dans les **15 minutes**

**Astuce :** Gardez la page de connexion ouverte pendant que vous vérifiez votre email.

**Alternative :** Utilisez OAuth (Google, Apple, Facebook) pour éviter ce problème à l'avenir.

---

**Q8.3 : Je ne peux pas uploader de screenshot, pourquoi ?**

**Réponse** :
**Vérifications à effectuer :**

**1. Taille du fichier**
- Maximum : **5 MB**
- Si trop grand : Compressez avec TinyPNG ou similar
- Ou prenez un nouveau screenshot avec qualité réduite

**2. Format du fichier**
- Formats acceptés : **JPEG (.jpg), PNG (.png)**
- Formats refusés : GIF, BMP, WEBP, HEIC
- Si HEIC (iPhone) : Convertissez en JPEG

**3. Connexion internet**
- Vérifiez que vous êtes bien connecté
- Essayez sur WiFi plutôt que données mobiles
- Upload peut échouer si connexion instable

**4. Navigateur**
- Essayez sur un autre navigateur (Chrome, Firefox, Safari)
- Videz le cache : Ctrl+Shift+Delete
- Désactivez bloqueurs de publicité (peuvent bloquer uploads)

**5. Permissions**
- Sur mobile : Autorisez l'accès aux photos
- Paramètres → MLM → Photos → Autoriser

**Comment compresser un screenshot :**
- En ligne : [TinyPNG.com](https://tinypng.com)
- Windows : Paint → Enregistrer sous → Qualité 85%
- Mac : Aperçu → Exporter → Qualité 85%
- Mobile : Apps "Photo Compress" (Play Store/App Store)

**Si le problème persiste :**
Support : **support@mlm-platform.com** avec :
- Taille du fichier
- Format du fichier
- Navigateur utilisé
- Message d'erreur exact

---

**Q8.4 : Mon solde wallet ne se met pas à jour, que faire ?**

**Réponse** :
**Essayez d'abord ces solutions :**

**1. Rafraîchissez la page**
- Appuyez sur F5 (PC) ou Cmd+R (Mac)
- Ou tirez vers le bas sur mobile

**2. Videz le cache**
- Ctrl+Shift+Delete (PC) / Cmd+Shift+Delete (Mac)
- Sélectionnez "Images et fichiers en cache"
- Cliquez sur "Effacer les données"
- Rechargez la page

**3. Déconnectez-vous et reconnectez-vous**
- Cliquez sur votre avatar → Déconnexion
- Reconnectez-vous
- Le solde devrait se mettre à jour

**4. Vérifiez l'historique des transactions**
- Allez dans "Mon Wallet" → Onglet "Historique"
- Vérifiez si la transaction apparaît
- Si oui : Le solde est à jour, c'est juste l'affichage qui buggait

**Délai normal de mise à jour :**
- **Immédiat** : Inscription tournoi, gains
- **< 5 min** : Remboursements
- **< 24h** : Ajouts manuels par admin

**Si le problème persiste après 24h :**
Contactez le support : **support@mlm-platform.com** avec :
- Votre email de compte
- Transaction concernée (ex: "Gain tournoi X")
- Date et heure approximative
- Screenshot du wallet actuel

---

**Q8.5 : L'application est lente ou bug, comment l'améliorer ?**

**Réponse** :
**Optimisations recommandées :**

**1. Connexion internet**
- ✅ WiFi stable (recommandé)
- ✅ 4G/5G avec bon signal
- ❌ Évitez 3G/2G (trop lent)

**2. Navigateur**
- **Navigateurs recommandés :**
  - Chrome (version récente)
  - Firefox (version récente)
  - Safari (macOS/iOS)
  - Edge (Windows)
- **À éviter :** Internet Explorer, vieux navigateurs

**3. Nettoyage**
- Videz le cache régulièrement
- Fermez les onglets inutiles
- Redémarrez le navigateur

**4. Device**
- Minimum 2 GB RAM
- Libérez de l'espace disque (>500 MB libre)
- Fermez applications en arrière-plan

**5. Extensions de navigateur**
- Désactivez bloqueurs de pub (peuvent casser la page)
- Désactivez VPN (peuvent ralentir)

**Mode Performance (si toujours lent) :**
- Désactivez les animations : Paramètres → Accessibilité → Réduire animations
- Utilisez mode sombre : Consomme moins de ressources

**Si vraiment inutilisable :**
- Essayez sur un autre device
- Contactez support : **support@mlm-platform.com**
- Précisez : Device, navigateur, version, problème exact

---

**Q8.6 : Comment signaler un bug ?**

**Réponse** :
**Merci de nous aider à améliorer MLM !**

**Email :** **bugs@mlm-platform.com**

**Informations à fournir :**

**1. Description du bug**
- Que faisiez-vous ? (ex: "Je soumettais un résultat de match")
- Qu'est-ce qui s'est passé ? (ex: "La page s'est bloquée")
- Qu'attendiez-vous ? (ex: "Confirmation de soumission")

**2. Étapes pour reproduire**
- Détaillez comment reproduire le bug
- Exemple :
  1. Aller dans "Mes Matchs"
  2. Cliquer sur "Soumettre résultat"
  3. Uploader screenshot
  4. Cliquer sur "Valider"
  5. → La page freeze

**3. Informations techniques**
- Navigateur : Chrome 120
- Device : iPhone 14, Windows 11 PC, etc.
- Date et heure : 25/12/2024 14:30
- URL de la page : /matches/123/submit

**4. Screenshots/Vidéos**
- Screenshot de l'erreur
- Vidéo du bug (si possible)
- Console JavaScript (F12 → Console)

**Priorisation :**
- 🔴 Critique (bloque utilisation) : Réponse < 24h
- 🟠 Majeur (fonctionnalité cassée) : Réponse < 48h
- 🟡 Mineur (cosmétique) : Réponse < 7j

**Récompense :**
- Bugs critiques trouvés : 10-50 pièces MLM offertes !
- Programme Bug Bounty officiel (Phase 2)

---

## 💬 Section 6 : Contact et Support

```
┌───────────────────────────────────────────────────────────┐
│                                                            │
│           Vous n'avez pas trouvé de réponse ?             │
│                                                            │
│               Contactez notre équipe support              │
│                                                            │
│  ┌────────────────────┐  ┌────────────────────┐          │
│  │ 📧 Email           │  │ 💬 WhatsApp        │          │
│  │                    │  │                    │          │
│  │ support@mlm-       │  │ +237 XXX XXX XXX   │          │
│  │ platform.com       │  │                    │          │
│  │                    │  │ Lun-Sam: 9h-18h    │          │
│  │ [Nous écrire]      │  │ [Ouvrir WhatsApp]  │          │
│  └────────────────────┘  └────────────────────┘          │
│                                                            │
│  Délai de réponse: 24-48h                                 │
│                                                            │
└───────────────────────────────────────────────────────────┘
```

**Éléments :**

- **Titre** : "Vous n'avez pas trouvé de réponse ?"
  - Taille : 28px
  - Centré

- **Sous-titre** : "Contactez notre équipe support"

- **2 cartes de contact** :

  **Carte 1 : Email**
  - Icône : 📧
  - Titre : "Email"
  - Adresse : support@mlm-platform.com
  - Bouton : "Nous écrire" (ouvre client email)

  **Carte 2 : WhatsApp**
  - Icône : 💬
  - Titre : "WhatsApp"
  - Numéro : +237 XXX XXX XXX
  - Horaires : Lun-Sam: 9h-18h
  - Bouton : "Ouvrir WhatsApp" (ouvre WhatsApp avec numéro pré-rempli)

- **Note** : "Délai de réponse: 24-48h"
  - Taille : 14px
  - Couleur : Gris moyen

**Style :**
- Fond : Gradient bleu clair (#eff6ff → #dbeafe)
- Padding : 80px vertical
- Centré
- Cartes : Fond blanc, ombre légère

---

## 📱 Section 7 : Footer

Identique à la page d'accueil (voir [PAGE_HOME_SPECIFICATION.md](PAGE_HOME_SPECIFICATION.md))

---

## 🎨 Design et Comportement

### Palette de Couleurs

Identique à la page d'accueil :

```css
--primary-blue: #3b82f6;
--secondary-green: #10b981;
--neutral-gray: #64748b;
--background: #f8fafc;
--text: #1e293b;
```

### Typographie

```css
--font-primary: 'Inter', sans-serif;
--font-heading: 'Poppins', 'Inter', sans-serif;
```

### Animations

**Accordéon :**
```css
.accordion-item {
  transition: all 300ms ease-in-out;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 400ms ease-in-out;
}

.accordion-content.open {
  max-height: 1000px; /* Ajuster selon contenu */
}
```

**Icône accordéon :**
```css
.accordion-icon {
  transition: transform 300ms ease;
}

.accordion-icon.open {
  transform: rotate(90deg);
}
```

### Accordéon - Comportement

**État initial :**
- Toutes les questions sont **fermées**
- Seul le titre de la question est visible
- Icône : ▶ (chevron right)

**Au clic sur une question :**
- La question cliquée **s'ouvre** avec animation smooth
- La réponse **glisse vers le bas** (slide down)
- Icône tourne : ▶ → ▼ (chevron down)
- Les autres questions restent fermées (ou se ferment si accordéon exclusif)

**Accordéon exclusif vs multiple :**

**Exclusif** (recommandé) :
- 1 seule question ouverte à la fois
- Ouvrir une nouvelle ferme l'ancienne
- Plus propre visuellement

**Multiple** :
- Plusieurs questions peuvent être ouvertes simultanément
- Permet de comparer les réponses
- Peut être long sur mobile

**→ Recommandation : Exclusif**

**Deep linking :**
- URL avec ancre : `/faq#q1.2`
- Scroll automatique vers la question
- Question s'ouvre automatiquement
- Utilisé pour les tags populaires

---

## 📱 Comportement Responsive

### Desktop (≥ 1024px)

```
┌─────────────────────────────────────────┐
│  Header (sticky)                        │
├─────────────────────────────────────────┤
│  Hero Section                           │
├─────────────────────────────────────────┤
│  Recherche (centrée, max-width 600px)   │
├─────────────────────────────────────────┤
│  Catégories (horizontal, sticky)        │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │ Q&R Accordéon                     │  │
│  │ (max-width 900px, centré)         │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│  Contact                                │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

- Navigation catégories : Horizontal, 1 ligne
- Accordéon : Max-width 900px, centré
- Contact : 2 cartes côte à côte

### Tablet (768px - 1023px)

- Navigation catégories : Horizontal, wrap sur 2 lignes si nécessaire
- Accordéon : Full width avec padding 40px
- Contact : 2 cartes côte à côte (plus étroites)

### Mobile (≤ 767px)

```
┌───────────────────┐
│  Header (burger)  │
├───────────────────┤
│  Hero             │
├───────────────────┤
│  Recherche        │
├───────────────────┤
│  Catégories       │
│  (scroll horiz.)  │
├───────────────────┤
│  Q&R Accordéon    │
│  (full width)     │
├───────────────────┤
│  Contact (stack)  │
├───────────────────┤
│  Footer (stack)   │
└───────────────────┘
```

- Header : Menu burger
- Hero : Titre plus petit (32px)
- Recherche : Full width
- Navigation catégories : **Scroll horizontal** (swipe)
  - Pills en ligne
  - Snap scroll
  - Flèches gauche/droite
- Accordéon : Full width, padding 20px
- Contact : Stack vertical (email en haut, WhatsApp en bas)

---

## 🔍 Fonctionnalité de Recherche

**Input :**
```html
<input
  type="text"
  placeholder="Rechercher une question..."
  [(ngModel)]="searchQuery"
  (input)="onSearch()"
>
```

**Logique de recherche :**
```typescript
onSearch(): void {
  const query = this.searchQuery.toLowerCase().trim();

  if (query === '') {
    // Afficher toutes les questions
    this.filteredFAQs = this.allFAQs;
    return;
  }

  // Recherche dans titre et contenu
  this.filteredFAQs = this.allFAQs.filter(faq =>
    faq.question.toLowerCase().includes(query) ||
    faq.answer.toLowerCase().includes(query) ||
    faq.category.toLowerCase().includes(query)
  );

  // Si aucun résultat
  if (this.filteredFAQs.length === 0) {
    this.showNoResults = true;
  }
}
```

**Affichage "Aucun résultat" :**
```
┌────────────────────────────────────────┐
│  ❌ Aucune question trouvée            │
│                                        │
│  Essayez avec des mots-clés différents│
│  ou contactez notre support            │
│                                        │
│  [Contacter le support →]              │
└────────────────────────────────────────┘
```

**Debounce :** 300ms pour éviter trop d'appels

**Highlight des résultats :**
- Mots recherchés surlignés en jaune dans les résultats
- Utiliser pipe Angular ou regex

---

## 🪙 Intégration Technique

**Structure de données :**
```typescript
interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  related: string[]; // IDs de questions liées
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  questions: FAQItem[];
}
```

**Exemple :**
```typescript
const faqData: FAQCategory[] = [
  {
    id: 'debuter',
    name: 'Débuter sur MLM',
    icon: '🎮',
    questions: [
      {
        id: 'q1.1',
        category: 'debuter',
        question: "Qu'est-ce que Mobile League Manager (MLM) ?",
        answer: "Mobile League Manager (MLM) est une plateforme...",
        tags: ['plateforme', 'introduction', 'mlm'],
        related: ['q1.2', 'q3.1']
      },
      // ...
    ]
  },
  // ...
];
```

**Component Angular :**
```typescript
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  categories: FAQCategory[] = faqData;
  activeCategory: string = '';
  searchQuery: string = '';
  filteredFAQs: FAQItem[] = [];
  openedQuestionId: string | null = null;

  ngOnInit() {
    // Check for deep link (ex: /faq#q1.2)
    const hash = window.location.hash.substring(1);
    if (hash) {
      this.scrollToQuestion(hash);
      this.openQuestion(hash);
    }
  }

  toggleQuestion(questionId: string) {
    if (this.openedQuestionId === questionId) {
      this.openedQuestionId = null; // Ferme
    } else {
      this.openedQuestionId = questionId; // Ouvre
    }
  }

  scrollToCategory(categoryId: string) {
    this.activeCategory = categoryId;
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToQuestion(questionId: string) {
    const element = document.getElementById(questionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
```

---

## ♿ Accessibilité

**1. Accordéon accessible :**
```html
<button
  class="accordion-header"
  [attr.aria-expanded]="isOpen"
  [attr.aria-controls]="'answer-' + question.id"
  (click)="toggleQuestion(question.id)">
  {{ question.question }}
</button>

<div
  [id]="'answer-' + question.id"
  class="accordion-content"
  [attr.aria-hidden]="!isOpen"
  role="region">
  {{ question.answer }}
</div>
```

**2. Navigation clavier :**
- Tab : Navigue entre les questions
- Enter/Space : Ouvre/ferme la question active
- Esc : Ferme toutes les questions

**3. Skip links :**
```html
<a href="#main-content" class="skip-link">
  Aller au contenu principal
</a>
```

**4. ARIA labels :**
```html
<nav aria-label="Catégories FAQ">
  <button aria-label="Catégorie: Débuter sur MLM">
    🎮 Débuter
  </button>
</nav>
```

---

## 📐 Maquette ASCII Complète

### Version Desktop

```
┌────────────────────────────────────────────────────────────────────────────┐
│  [⚽ MLM Logo]          Tournois   Comment ça marche   FAQ                 │
│                                              [Se connecter] [S'inscrire →] │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                       ❓ Questions Fréquentes                              │
│                                                                             │
│          Trouvez rapidement des réponses à vos questions                   │
│                 sur Mobile League Manager                                  │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ┌──────────────────────────────────────────────────────────────────┐   │
│    │  🔍 Rechercher une question...                                   │   │
│    └──────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│    Populaire : Comment m'inscrire ? • Format Suisse • Pièces MLM •         │
│                Validation profil                                           │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  [🎮 Débuter]  [👤 Profil]  [🏆 Tournois]  [⚽ Matchs]  [💰 Wallet]       │
│  [🎯 Format Suisse]  [🛡️ Sécurité]  [🔧 Technique]                        │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  📂 Débuter sur MLM                                                        │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ ▼ Q1.1 : Qu'est-ce que Mobile League Manager (MLM) ?              │   │
│  ├────────────────────────────────────────────────────────────────────┤   │
│  │                                                                    │   │
│  │ Mobile League Manager (MLM) est une plateforme qui permet aux     │   │
│  │ joueurs de jeux de football mobile (E-football, FC Mobile, Dream  │   │
│  │ League Soccer) d'organiser et de participer à des tournois        │   │
│  │ automatisés.                                                       │   │
│  │                                                                    │   │
│  │ Caractéristiques principales :                                    │   │
│  │ - Format Suisse : Tout le monde joue toutes les rondes           │   │
│  │ - Inscription sans mot de passe (OAuth ou Magic Link)            │   │
│  │ - Système de pièces MLM (1 pièce = 500 FCFA)                     │   │
│  │ - 10 pièces offertes à l'inscription                             │   │
│  │                                                                    │   │
│  │ [En savoir plus sur la page d'accueil →]                          │   │
│  │                                                                    │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ ▶ Q1.2 : Comment créer un compte sur MLM ?                        │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ ▶ Q1.3 : Quels jeux sont supportés ?                              │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ ▶ Q1.4 : Est-ce gratuit de s'inscrire ?                           │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ ▶ Q1.5 : Combien de temps prend la validation du profil ?         │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  📂 Profil et Compte                                                       │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ ▶ Q2.1 : Pourquoi dois-je ajouter mon numéro WhatsApp ?           │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  [... autres questions ...]                                                │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘

[... Autres catégories ...]

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│              Vous n'avez pas trouvé de réponse ?                           │
│                                                                             │
│                  Contactez notre équipe support                            │
│                                                                             │
│   ┌───────────────────────────┐    ┌───────────────────────────┐          │
│   │ 📧 Email                  │    │ 💬 WhatsApp               │          │
│   │                           │    │                           │          │
│   │ support@mlm-platform.com  │    │ +237 XXX XXX XXX          │          │
│   │                           │    │                           │          │
│   │ [Nous écrire]             │    │ [Ouvrir WhatsApp]         │          │
│   └───────────────────────────┘    └───────────────────────────┘          │
│                                                                             │
│   Délai de réponse: 24-48h                                                 │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘

[... Footer identique à page d'accueil ...]
```

---

### Version Mobile

```
┌───────────────────────┐
│  [☰]  ⚽ MLM          │
└───────────────────────┘

┌───────────────────────┐
│                        │
│    ❓ Questions        │
│      Fréquentes        │
│                        │
│   Trouvez rapidement   │
│   des réponses         │
│                        │
└───────────────────────┘

┌───────────────────────┐
│  ┌──────────────────┐ │
│  │ 🔍 Rechercher... │ │
│  └──────────────────┘ │
│                        │
│  Comment m'inscrire ?  │
│  Format Suisse         │
│  Pièces MLM            │
└───────────────────────┘

┌───────────────────────┐
│ ← [Catégories] →      │
│ [🎮][👤][🏆][⚽][💰] │
└───────────────────────┘

┌───────────────────────┐
│ 📂 Débuter sur MLM     │
│                        │
│ ┌────────────────────┐│
│ │▼ Qu'est-ce que MLM?││
│ ├────────────────────┤│
│ │Mobile League...    ││
│ │                    ││
│ │[En savoir plus →]  ││
│ └────────────────────┘│
│                        │
│ ┌────────────────────┐│
│ │▶ Comment créer un  ││
│ │  compte ?          ││
│ └────────────────────┘│
│                        │
│ ┌────────────────────┐│
│ │▶ Quels jeux ?      ││
│ └────────────────────┘│
└───────────────────────┘

[... Autres sections ...]

┌───────────────────────┐
│  Pas de réponse ?      │
│                        │
│  ┌──────────────────┐ │
│  │ 📧 Email         │ │
│  │ support@mlm...   │ │
│  │ [Écrire]         │ │
│  └──────────────────┘ │
│                        │
│  ┌──────────────────┐ │
│  │ 💬 WhatsApp      │ │
│  │ +237 XXX...      │ │
│  │ [Ouvrir]         │ │
│  └──────────────────┘ │
└───────────────────────┘

[... Footer ...]
```

---

## 📊 Métriques et Analytiques

**Trackings recommandés :**

1. **Questions les plus consultées**
   - Top 10 questions ouvertes
   - Aide à identifier les pain points

2. **Recherches sans résultat**
   - Liste des termes recherchés qui n'ont rien trouvé
   - Identifier les FAQ manquantes

3. **Catégories les plus visitées**
   - Quelle catégorie est la plus consultée
   - Optimiser l'ordre des catégories

4. **Taux de clic "Contact support"**
   - Mesure l'efficacité de la FAQ
   - Objectif : < 10% (90% trouvent réponse dans FAQ)

5. **Temps passé sur la page**
   - Mesure l'engagement
   - Détecte si FAQ est trop longue

**Outils :**
- Google Analytics
- Hotjar (heatmaps)
- Custom tracking events

---

## 🔄 Mises à Jour de la FAQ

**Fréquence :** Mensuelle ou selon besoins

**Processus :**
1. Analyser les questions support récurrentes
2. Identifier les nouvelles FAQ nécessaires
3. Rédiger les Q&R
4. Valider avec équipe
5. Publier et notifier (si changement majeur)

**Versioning :**
- Ajouter "Mis à jour le : [Date]" en bas de page
- Changelog des FAQ (interne)

---

**Document créé le** : 2025-12-18
**Version** : 1.0 MVP
**Auteur** : Claude Code pour Mobile League Manager
**Dernière mise à jour** : 2025-12-18

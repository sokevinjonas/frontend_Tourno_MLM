# 🏗️ ARCHITECTURE FRONTEND - Mobile League Manager (MLM)

## 📊 Vue d'ensemble

**Framework:** Angular 21 (Standalone Components)
**Styling:** Tailwind CSS v4
**Pattern:** Feature-based architecture with lazy loading
**State Management:** Signal-based

---

## 📁 Structure des dossiers

```
src/app/
├── core/                           # Services singleton, guards, interceptors
│   ├── guards/                     # Guards de protection des routes
│   │   ├── auth.guard.ts          # Vérifie si l'utilisateur est connecté
│   │   ├── role.guard.ts          # Guard générique basé sur les rôles
│   │   ├── player.guard.ts        # Protection routes joueur
│   │   ├── organizer.guard.ts     # Protection routes organisateur
│   │   ├── moderator.guard.ts     # Protection routes modérateur
│   │   ├── referee.guard.ts       # Protection routes arbitre
│   │   └── admin.guard.ts         # Protection routes admin
│   │
│   ├── interceptors/              # Intercepteurs HTTP
│   │   ├── auth.interceptor.ts    # Ajoute le token JWT aux requêtes
│   │   ├── error.interceptor.ts   # Gestion globale des erreurs HTTP
│   │   └── loading.interceptor.ts # Gestion du loader global
│   │
│   ├── services/                  # Services métier
│   │   ├── auth.service.ts        # Authentification (OAuth, Magic Link)
│   │   ├── user.service.ts        # Gestion utilisateurs et profils
│   │   ├── tournament.service.ts  # Gestion des tournois
│   │   ├── match.service.ts       # Gestion des matchs
│   │   ├── payment.service.ts     # Paiements Mobile Money
│   │   ├── notification.service.ts # Notifications
│   │   ├── websocket.service.ts   # WebSocket pour temps réel
│   │   └── storage.service.ts     # LocalStorage/SessionStorage
│   │
│   ├── models/                    # Interfaces et types
│   │   ├── user.model.ts          # User, Profile, GameProfile
│   │   ├── tournament.model.ts    # Tournament, TournamentConfig
│   │   ├── match.model.ts         # Match, MatchResult
│   │   ├── division.model.ts      # Division, Season
│   │   ├── payment.model.ts       # Payment, Transaction
│   │   ├── notification.model.ts  # Notification
│   │   └── enums.ts               # UserRole, TournamentStatus, etc.
│   │
│   └── index.ts                   # Barrel exports
│
├── shared/                        # Composants, directives, pipes réutilisables
│   ├── components/                # Composants partagés
│   │   ├── tournament-card/       # Carte de tournoi
│   │   ├── match-card/            # Carte de match
│   │   ├── user-avatar/           # Avatar avec badge de rôle
│   │   ├── bracket-visualization/ # Visualisation bracket tournoi
│   │   ├── notification-bell/     # Cloche de notifications
│   │   ├── chat-widget/           # Widget de chat temps réel
│   │   ├── payment-modal/         # Modal de paiement
│   │   ├── confirmation-dialog/   # Dialog de confirmation
│   │   ├── loading-spinner/       # Spinner de chargement
│   │   └── empty-state/           # État vide (liste vide)
│   │
│   ├── directives/
│   │   ├── has-role.directive.ts  # *hasRole="['admin', 'moderator']"
│   │   └── tooltip.directive.ts   # Directive tooltip
│   │
│   ├── pipes/
│   │   ├── time-ago.pipe.ts       # "Il y a 2 heures"
│   │   ├── currency-fcfa.pipe.ts  # Format monétaire FCFA
│   │   └── game-name.pipe.ts      # Nom du jeu formaté
│   │
│   └── index.ts
│
├── layout/                        # Composants de layout
│   ├── header/                    # Header (menu principal)
│   ├── footer/                    # Footer
│   └── sidebar/                   # Sidebar (mobile)
│
├── features/                      # Modules fonctionnels (lazy-loaded)
│   ├── public/                    # Pages publiques (non authentifiées)
│   ├── auth/                      # Authentification
│   ├── player/                    # Pages joueur
│   ├── organizer/                 # Pages organisateur
│   ├── moderator/                 # Pages modérateur
│   ├── referee/                   # Pages arbitre
│   └── admin/                     # Pages administrateur
│
├── app.ts                         # Composant root
├── app.routes.ts                  # Routes principales
└── app.config.ts                  # Configuration app

src/
├── environments/
│   ├── environment.ts             # Config production
│   └── environment.development.ts # Config développement
├── index.html
├── main.ts
└── styles.css
```

---

## 🗺️ MAPPING COMPLET DES ROUTES

### 🌍 PUBLIC (Non authentifié)

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | `home.component.ts` | Page d'accueil publique |
| `/login` | `login.component.ts` | Page de connexion (OAuth + Magic Link) |
| `/register` | `register.component.ts` | Page d'inscription (redirection OAuth) |
| `/tournaments` | `tournaments.component.ts` | Liste des tournois publics |
| `/divisions` | `divisions.component.ts` | Explication système divisions |
| `/rankings` | `rankings.component.ts` | Classements publics (Top 100) |

**Fichier de routes:** `features/public/public.routes.ts`

---

### 🔐 AUTHENTIFICATION

| Route | Composant | Description | Guard |
|-------|-----------|-------------|-------|
| `/auth/verify` | `verify.component.ts` | Vérification Magic Link token | - |
| `/auth/complete-profile` | `complete-profile.component.ts` | Complétion profil après inscription | `auth.guard` |

**Fichier de routes:** `features/auth/auth.routes.ts`

---

### 🎮 PLAYER (Joueur connecté)

| Route | Composant | Description | Guard |
|-------|-----------|-------------|-------|
| `/home` | `dashboard.component.ts` | Dashboard joueur | `player.guard` |
| `/tournaments` | `tournaments.component.ts` | Liste tournois disponibles | `player.guard` |
| `/tournaments/:id` | `tournament-detail.component.ts` | Détails d'un tournoi | `player.guard` |
| `/my-matches` | `my-matches.component.ts` | Mes matchs (à jouer, terminés) | `player.guard` |
| `/matches/:id/submit` | `match-submit.component.ts` | Soumettre résultat match | `player.guard` |
| `/my-teams` | `my-teams.component.ts` | Mes équipes/pseudos par jeu | `player.guard` |
| `/profile` | `profile.component.ts` | Mon profil utilisateur | `player.guard` |
| `/history` | `history.component.ts` | Historique (tournois, matchs, transactions) | `player.guard` |
| `/settings` | `settings.component.ts` | Paramètres du compte | `player.guard` |
| `/become-organizer` | `become-organizer.component.ts` | Devenir organisateur | `player.guard` |

**Fichier de routes:** `features/player/player.routes.ts`

---

### 🏆 ORGANIZER (Organisateur)

| Route | Composant | Description | Guard |
|-------|-----------|-------------|-------|
| `/organizer/dashboard` | `dashboard.component.ts` | Dashboard organisateur | `organizer.guard` |
| `/organizer/tournaments` | `tournaments.component.ts` | Mes tournois créés | `organizer.guard` |
| `/organizer/create-tournament` | `create-tournament.component.ts` | Créer un nouveau tournoi | `organizer.guard` |
| `/organizer/tournaments/:id` | `tournament-detail.component.ts` | Détails tournoi (gestion) | `organizer.guard` |
| `/organizer/stats` | `stats.component.ts` | Mes statistiques et revenus | `organizer.guard` |
| `/organizer/certification` | `certification.component.ts` | Demande certification (niveau 1) | `organizer.guard` |

**Fichier de routes:** `features/organizer/organizer.routes.ts`

---

### 🛡️ MODERATOR (Modérateur)

| Route | Composant | Description | Guard |
|-------|-----------|-------------|-------|
| `/moderator/dashboard` | `dashboard.component.ts` | Dashboard modération | `moderator.guard` |
| `/moderator/complaints` | `complaints.component.ts` | Liste des plaintes | `moderator.guard` |
| `/moderator/complaints/:id` | `complaint-detail.component.ts` | Détails d'une plainte | `moderator.guard` |
| `/moderator/validations` | `validations.component.ts` | Demandes certification organisateurs | `moderator.guard` |
| `/moderator/validations/:id` | `validation-detail.component.ts` | Détails demande certification | `moderator.guard` |

**Fichier de routes:** `features/moderator/moderator.routes.ts`

---

### ⚖️ REFEREE (Arbitre)

| Route | Composant | Description | Guard |
|-------|-----------|-------------|-------|
| `/referee/dashboard` | `dashboard.component.ts` | Dashboard arbitre | `referee.guard` |
| `/referee/disputes` | `disputes.component.ts` | Liste des litiges | `referee.guard` |
| `/referee/disputes/:id` | `dispute-detail.component.ts` | Détails litige avec décision | `referee.guard` |
| `/referee/history` | `history.component.ts` | Historique décisions arbitrage | `referee.guard` |

**Fichier de routes:** `features/referee/referee.routes.ts`

---

### 👑 ADMIN (Administrateur)

| Route | Composant | Description | Guard |
|-------|-----------|-------------|-------|
| `/admin/dashboard` | `dashboard.component.ts` | Dashboard admin (vue d'ensemble) | `admin.guard` |
| `/admin/users` | `users.component.ts` | Gestion des utilisateurs | `admin.guard` |
| `/admin/users/:id` | `user-detail.component.ts` | Détails utilisateur (modifier rôles) | `admin.guard` |
| `/admin/tournaments` | `tournaments.component.ts` | Supervision tous les tournois | `admin.guard` |
| `/admin/finances` | `finances.component.ts` | Finances (revenus, commissions) | `admin.guard` |
| `/admin/stats` | `stats.component.ts` | Statistiques plateforme | `admin.guard` |

**Fichier de routes:** `features/admin/admin.routes.ts`

---

## 🔐 GUARDS (Protection des routes)

### `auth.guard.ts`
Vérifie si l'utilisateur est connecté. Redirige vers `/login` sinon.

### `role.guard.ts`
Guard générique qui vérifie si l'utilisateur a un rôle spécifique.

### Guards spécifiques par rôle
- `player.guard.ts` → Vérifie rôle `PLAYER`
- `organizer.guard.ts` → Vérifie rôle `ORGANIZER`
- `moderator.guard.ts` → Vérifie rôle `MODERATOR`
- `referee.guard.ts` → Vérifie rôle `REFEREE`
- `admin.guard.ts` → Vérifie rôle `ADMIN`

---

## 🧩 COMPOSANTS RÉUTILISABLES (Shared)

| Composant | Fichier | Description |
|-----------|---------|-------------|
| TournamentCard | `tournament-card.component.ts` | Carte d'affichage tournoi |
| MatchCard | `match-card.component.ts` | Carte d'affichage match |
| UserAvatar | `user-avatar.component.ts` | Avatar utilisateur avec badge rôle |
| BracketVisualization | `bracket-visualization.component.ts` | Visualisation bracket tournoi |
| NotificationBell | `notification-bell.component.ts` | Cloche notifications + dropdown |
| ChatWidget | `chat-widget.component.ts` | Widget de chat temps réel |
| PaymentModal | `payment-modal.component.ts` | Modal paiement Mobile Money |
| ConfirmationDialog | `confirmation-dialog.component.ts` | Dialog de confirmation |
| LoadingSpinner | `loading-spinner.component.ts` | Spinner de chargement |
| EmptyState | `empty-state.component.ts` | État vide (liste vide) |

---

## 🎯 DIRECTIVES

| Directive | Fichier | Usage |
|-----------|---------|-------|
| HasRole | `has-role.directive.ts` | `*hasRole="['admin']"` |
| Tooltip | `tooltip.directive.ts` | `[tooltip]="'Info'"` |

---

## 🔧 PIPES

| Pipe | Fichier | Usage |
|------|---------|-------|
| TimeAgo | `time-ago.pipe.ts` | `{{ date \| timeAgo }}` → "Il y a 2h" |
| CurrencyFCFA | `currency-fcfa.pipe.ts` | `{{ amount \| currencyFcfa }}` → "1 000 FCFA" |
| GameName | `game-name.pipe.ts` | `{{ gameId \| gameName }}` → "E-football" |

---

## 🌐 SERVICES PRINCIPAUX

| Service | Responsabilité |
|---------|---------------|
| `auth.service.ts` | Authentification (OAuth, Magic Link, JWT) |
| `user.service.ts` | Gestion profil utilisateur, rôles |
| `tournament.service.ts` | CRUD tournois, inscriptions |
| `match.service.ts` | Soumission résultats, litiges |
| `payment.service.ts` | Paiements Mobile Money, recharges MLC |
| `notification.service.ts` | Notifications in-app, emails |
| `websocket.service.ts` | WebSocket pour chat, mises à jour temps réel |
| `storage.service.ts` | LocalStorage/SessionStorage wrapper |

---

## 📦 MODELS PRINCIPAUX

### `user.model.ts`
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  country: string;
  phone?: string;
  mlmRank: number;
  mlcBalance: number;
  organizerBadge?: OrganizerBadge;
}

enum UserRole {
  PLAYER = 'PLAYER',
  ORGANIZER = 'ORGANIZER',
  MODERATOR = 'MODERATOR',
  REFEREE = 'REFEREE',
  ADMIN = 'ADMIN'
}
```

### `tournament.model.ts`
```typescript
interface Tournament {
  id: string;
  name: string;
  game: GameType;
  organizerId: string;
  startDate: Date;
  maxParticipants: number;
  entryFee: number; // en MLC
  prizePool: number;
  status: TournamentStatus;
  format: TournamentFormat;
  visibility: 'PUBLIC' | 'PRIVATE';
}
```

### `match.model.ts`
```typescript
interface Match {
  id: string;
  tournamentId: string;
  player1Id: string;
  player2Id: string;
  scheduledDate: Date;
  status: MatchStatus;
  result?: MatchResult;
}
```

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ Structure créée (95 fichiers TypeScript)
2. ⏳ Implémenter les routes dans `app.routes.ts`
3. ⏳ Configurer les guards
4. ⏳ Implémenter les services core
5. ⏳ Développer les composants shared
6. ⏳ Implémenter les pages feature par feature
7. ⏳ Configuration PWA
8. ⏳ Tests unitaires et e2e

---

## 📝 NOTES

- **Lazy Loading:** Toutes les features sont lazy-loadées pour optimiser les performances
- **Standalone Components:** Pas de modules NgModule, uniquement des standalone components
- **Signal-based:** Utilisation des signals Angular pour la réactivité
- **Tailwind CSS:** Styling avec Tailwind v4
- **Responsive:** Mobile-first design (breakpoints: <768px, 768-1024px, >1024px)
- **PWA:** Progressive Web App avec service worker
- **i18n:** Préparé pour l'internationalisation (FR/EN)

---

**Créé le:** 2024-12-18
**Version:** 1.0 MVP
**Angular:** 21.0.0

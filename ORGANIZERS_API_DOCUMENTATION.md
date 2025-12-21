# 📚 Documentation API - Système d'Organisateurs

## Vue d'ensemble

Le système d'organisateurs permet aux joueurs de découvrir, suivre et interagir avec les organisateurs de tournois. Chaque organisateur possède un profil enrichi avec badges, bio, liens sociaux, statistiques et système de vérification.

## 🔑 Concepts clés

### Types de badges
- `certified` - Organisateur certifié (officiel) - Attribué sans vérification
- `verified` - Organisateur vérifié - Requiert vérification de documents et contrat signé
- `partner` - Partenaire de la plateforme - Requiert vérification de documents et contrat signé
- `null` - Aucun badge

**Note:** Les badges `verified` et `partner` nécessitent tous deux les mêmes documents (identité + contrat). La différence réside dans le niveau de partenariat et les avantages associés.

### Statuts de vérification
- `null` - Aucune demande de vérification
- `attente` - Demande en attente de validation
- `valider` - Demande validée (badge attribué)
- `rejeter` - Demande rejetée

### Organisateur en vedette (`is_featured`)
Les organisateurs marqués comme "featured" apparaissent en priorité dans les listes et sur la page d'accueil.

---

## 📡 Endpoints API

### 1. Obtenir la liste des organisateurs

**Endpoint:** `GET /api/organizers`

**Authentification:** Non requise (Public)

**Query Parameters:**
| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `featured` | boolean | Non | Filtrer uniquement les organisateurs en vedette |
| `badge` | string | Non | Filtrer par type de badge (`certified`, `verified`, `partner`) |
| `sort` | string | Non | Trier par nombre de followers (`followers`) ou par date (`latest`) |

**Exemples de requêtes:**
```typescript
// Tous les organisateurs
GET /api/organizers

// Organisateurs en vedette seulement
GET /api/organizers?featured=true

// Organisateurs certifiés
GET /api/organizers?badge=certified

// Triés par nombre de followers
GET /api/organizers?sort=followers
```

**Réponse (200 OK):**
```json
{
  "organizers": [
    {
      "id": 10,
      "name": "Tourno Official",
      "badge": "certified",
      "tournaments": 42,
      "followers": 12500,
      "avatar": "T",
      "is_featured": true,
      "bio": "Organisation officielle de tournois MLM...",
      "social_links": {
        "twitter": "https://twitter.com/tourno_mlm",
        "discord": "https://discord.gg/tourno"
      }
    }
  ],
  "total": 1
}
```

---

### 2. Obtenir les détails d'un organisateur

**Endpoint:** `GET /api/organizers/{id}`

**Authentification:** Non requise (Public)

**Réponse (200 OK):**
```json
{
  "organizer": {
    "id": 10,
    "name": "Tourno Official",
    "email": "organizer1@mlm.com",
    "badge": "certified",
    "tournaments": 42,
    "followers": 12500,
    "avatar": "T",
    "is_featured": true,
    "bio": "Organisation officielle de tournois MLM...",
    "social_links": {
      "twitter": "https://twitter.com/tourno_mlm",
      "discord": "https://discord.gg/tourno"
    },
    "recent_tournaments": [...]
  }
}
```

---

### 3. Vérifier si l'utilisateur connecté est organisateur

**Endpoint:** `GET /api/organizers/check-if-organizer`

**Authentification:** ✅ Requise (Bearer Token)

**Exemple de requête:**
```typescript
GET /api/organizers/check-if-organizer
Authorization: Bearer {token}
```

**Réponse (200 OK) - Organisateur avec badge verified:**
```json
{
  "is_organizer": true,
  "role": "organizer",
  "badge": "verified",
  "status": "valider"
}
```

**Réponse (200 OK) - Organisateur avec demande en attente:**
```json
{
  "is_organizer": true,
  "role": "organizer",
  "badge": null,
  "status": "attente"
}
```

**Réponse (200 OK) - Joueur:**
```json
{
  "is_organizer": false,
  "role": "player",
  "badge": null,
  "status": null
}
```

---

### 4. Devenir organisateur (Upgrade)

**Endpoint:** `POST /api/organizers/upgrade`

**Authentification:** ✅ Requise (Bearer Token)

**Corps de la requête:** Aucun

**Réponse (200 OK):**
```json
{
  "message": "User upgraded to organizer successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "organizer"
  },
  "organizer_profile": {
    "id": 1,
    "display_name": "John Doe",
    "avatar_initial": "J",
    "is_featured": false
  }
}
```

**Réponse (400 Bad Request):**
```json
{
  "message": "User is already an organizer"
}
```

---

### 5. Soumettre une demande de vérification

**Endpoint:** `POST /api/organizers/verification/submit`

**Authentification:** ✅ Requise (Bearer Token) - Organisateurs uniquement

**Corps de la requête:**
```json
{
  "badge_type": "verified",
  "nature_document": "cnib",
  "doc_recto": "https://storage.example.com/documents/cnib_recto.jpg",
  "doc_verso": "https://storage.example.com/documents/cnib_verso.jpg",
  "contrat_signer": "https://storage.example.com/contracts/contract_signed.pdf"
}
```

**Validation:**
| Champ | Type | Valeurs acceptées |
|-------|------|-------------------|
| `badge_type` | enum | `verified`, `partner` |
| `nature_document` | enum | `cnib`, `permis`, `passport` |
| `doc_recto` | string | URL du document recto |
| `doc_verso` | string | URL du document verso |
| `contrat_signer` | string | URL du contrat signé |

**Réponse (200 OK):**
```json
{
  "message": "Verification request submitted successfully",
  "verification": {
    "nature_document": "cnib",
    "status": "attente",
    "requested_badge": "verified"
  }
}
```

**Réponse (400 Bad Request):**
```json
{
  "message": "You already have a pending verification request"
}
```

**Réponse (403 Forbidden):**
```json
{
  "message": "Only organizers can submit verification requests"
}
```

---

### 6. Obtenir les demandes en attente (Modérateurs)

**Endpoint:** `GET /api/organizers/verification/pending`

**Authentification:** ✅ Requise (Bearer Token) - Modérateurs/Admin uniquement

**Réponse (200 OK):**
```json
{
  "verifications": [
    {
      "id": 5,
      "organizer": {
        "id": 15,
        "name": "Elite Gaming",
        "email": "elite@gaming.com"
      },
      "nature_document": "cnib",
      "doc_recto": "https://storage.example.com/documents/cnib_recto.jpg",
      "doc_verso": "https://storage.example.com/documents/cnib_verso.jpg",
      "contrat_signer": "https://storage.example.com/contracts/contract.pdf",
      "status": "attente",
      "rejection_reason": null,
      "processed_by": null,
      "submitted_at": "2025-12-20 23:45:00"
    }
  ],
  "total": 1
}
```

**Réponse (403 Forbidden):**
```json
{
  "message": "Unauthorized. Moderators only."
}
```

---

### 7. Valider une demande de vérification (Modérateurs)

**Endpoint:** `POST /api/organizers/verification/{id}/validate`

**Authentification:** ✅ Requise (Bearer Token) - Modérateurs/Admin uniquement

**Corps de la requête:**
```json
{
  "badge": "verified"
}
```

**Validation:**
| Champ | Type | Valeurs acceptées |
|-------|------|-------------------|
| `badge` | enum | `verified`, `partner` |

**Réponse (200 OK):**
```json
{
  "message": "Verification request validated successfully",
  "organizer_profile": {
    "id": 5,
    "display_name": "Elite Gaming",
    "badge": "verified",
    "status": "valider",
    "processed_by": {
      "id": 2,
      "name": "Moderator John"
    }
  }
}
```

**Réponse (404 Not Found):**
```json
{
  "message": "Organizer profile not found"
}
```

---

### 8. Rejeter une demande de vérification (Modérateurs)

**Endpoint:** `POST /api/organizers/verification/{id}/reject`

**Authentification:** ✅ Requise (Bearer Token) - Modérateurs/Admin uniquement

**Corps de la requête:**
```json
{
  "rejection_reason": "Les documents fournis ne sont pas valides ou sont expirés."
}
```

**Validation:**
| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `rejection_reason` | string | Non | Raison du rejet (max 500 caractères) |

**Réponse (200 OK):**
```json
{
  "message": "Verification request rejected",
  "rejection_reason": "Les documents fournis ne sont pas valides ou sont expirés.",
  "processed_by": {
    "id": 2,
    "name": "Moderator John"
  }
}
```

---

### 9. Suivre/Ne plus suivre un organisateur

**Endpoint:** `POST /api/organizers/{id}/follow`

**Authentification:** ✅ Requise (Bearer Token)

**Corps de la requête:** Aucun

**Réponse - Abonnement réussi (200 OK):**
```json
{
  "message": "Organizer followed successfully",
  "is_following": true,
  "followers_count": 12501
}
```

**Réponse - Désabonnement réussi (200 OK):**
```json
{
  "message": "Organizer unfollowed successfully",
  "is_following": false,
  "followers_count": 12500
}
```

**Réponse (400 Bad Request) - Auto-follow:**
```json
{
  "message": "You cannot follow yourself"
}
```

---

### 10. Vérifier si l'utilisateur suit un organisateur

**Endpoint:** `GET /api/organizers/{id}/check-following`

**Authentification:** ✅ Requise (Bearer Token)

**Réponse (200 OK):**
```json
{
  "is_following": true
}
```

---

### 11. Obtenir mes abonnements (organisateurs suivis)

**Endpoint:** `GET /api/organizers/my/following`

**Authentification:** ✅ Requise (Bearer Token)

**Réponse (200 OK):**
```json
{
  "following": [
    {
      "id": 10,
      "name": "Tourno Official",
      "badge": "certified",
      "tournaments": 42,
      "followers": 12500,
      "avatar": "T",
      "is_featured": true
    }
  ],
  "total": 1
}
```

---

## 📊 Types TypeScript complets

```typescript
// types/organizer.ts

export type BadgeType = 'certified' | 'verified' | 'partner' | null;
export type VerificationStatus = 'attente' | 'valider' | 'rejeter' | null;
export type DocumentType = 'cnib' | 'permis' | 'passport';

export interface SocialLinks {
  twitter?: string;
  discord?: string;
  [key: string]: string | undefined;
}

export interface Organizer {
  id: number;
  name: string;
  badge: BadgeType;
  tournaments: number;
  followers: number;
  avatar: string;
  is_featured: boolean;
  bio?: string;
  social_links?: SocialLinks;
}

export interface OrganizerDetails extends Organizer {
  email: string;
  recent_tournaments: Tournament[];
}

export interface OrganizerCheckResponse {
  is_organizer: boolean;
  role: 'player' | 'organizer' | 'moderator' | 'admin';
  badge: BadgeType;
  status: VerificationStatus;
}

export interface UpgradeToOrganizerResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  organizer_profile: {
    id: number;
    display_name: string;
    avatar_initial: string;
    is_featured: boolean;
  };
}

export interface VerificationRequest {
  badge_type: 'verified' | 'partner';
  nature_document: DocumentType;
  doc_recto: string;
  doc_verso: string;
  contrat_signer: string;
}

export interface VerificationResponse {
  message: string;
  verification: {
    nature_document: DocumentType;
    status: string;
    requested_badge: string;
  };
}

export interface PendingVerification {
  id: number;
  organizer: {
    id: number;
    name: string;
    email: string;
  };
  nature_document: DocumentType;
  doc_recto: string;
  doc_verso: string;
  contrat_signer: string;
  status: string;
  rejection_reason: string | null;
  processed_by: {
    id: number;
    name: string;
  } | null;
  submitted_at: string;
}

export interface ValidateVerificationRequest {
  badge: 'verified' | 'partner';
}

export interface RejectVerificationRequest {
  rejection_reason?: string;
}

export interface FollowResponse {
  message: string;
  is_following: boolean;
  followers_count: number;
}

export interface FollowingStatus {
  is_following: boolean;
}

export interface MyFollowingResponse {
  following: Organizer[];
  total: number;
}
```

---

## 🎨 Exemples d'intégration Frontend

### Vérifier le statut d'organisateur

```typescript
const checkOrganizerStatus = async (token: string): Promise<OrganizerCheckResponse> => {
  const response = await fetch('/api/organizers/check-if-organizer', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
};

// Utilisation dans un composant React
const OrganizerBadge: React.FC = () => {
  const [status, setStatus] = useState<OrganizerCheckResponse | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    checkOrganizerStatus(token).then(setStatus);
  }, [token]);

  if (!status?.is_organizer) return null;

  return (
    <div>
      {status.badge && <Badge type={status.badge} />}
      {status.status === 'attente' && (
        <span>Vérification en attente...</span>
      )}
      {status.status === 'rejeter' && (
        <span>Demande rejetée</span>
      )}
    </div>
  );
};
```

### Soumettre une demande de vérification

```typescript
const submitVerification = async (
  token: string,
  data: VerificationRequest
): Promise<VerificationResponse> => {
  const response = await fetch('/api/organizers/verification/submit', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit verification');
  }

  return response.json();
};

// Utilisation dans un formulaire
const VerificationForm: React.FC = () => {
  const [formData, setFormData] = useState<VerificationRequest>({
    badge_type: 'verified',
    nature_document: 'cnib',
    doc_recto: '',
    doc_verso: '',
    contrat_signer: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await submitVerification(authToken, formData);
      toast.success('Demande soumise avec succès!');
    } catch (error) {
      toast.error('Erreur lors de la soumission');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={formData.badge_type}
        onChange={(e) => setFormData({...formData, badge_type: e.target.value})}
      >
        <option value="verified">Vérifié</option>
        <option value="partner">Partenaire</option>
      </select>

      <select
        value={formData.nature_document}
        onChange={(e) => setFormData({...formData, nature_document: e.target.value})}
      >
        <option value="cnib">CNIB</option>
        <option value="permis">Permis de conduire</option>
        <option value="passport">Passeport</option>
      </select>

      {/* Upload fields for documents */}

      <button type="submit">Soumettre la demande</button>
    </form>
  );
};
```

### Panel de modération (Modérateurs)

```typescript
const ModerationPanel: React.FC = () => {
  const [pendingVerifications, setPendingVerifications] = useState<PendingVerification[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchPendingVerifications(token).then(data => {
      setPendingVerifications(data.verifications);
    });
  }, [token]);

  const handleValidate = async (id: number, badge: 'verified' | 'partner') => {
    const response = await fetch(`/api/organizers/verification/${id}/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ badge }),
    });

    if (response.ok) {
      toast.success('Demande validée!');
      // Refresh list
    }
  };

  const handleReject = async (id: number, reason: string) => {
    const response = await fetch(`/api/organizers/verification/${id}/reject`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rejection_reason: reason }),
    });

    if (response.ok) {
      toast.success('Demande rejetée');
      // Refresh list
    }
  };

  return (
    <div>
      <h2>Demandes de vérification en attente ({pendingVerifications.length})</h2>
      {pendingVerifications.map(verification => (
        <VerificationCard
          key={verification.id}
          verification={verification}
          onValidate={handleValidate}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};
```

---

## 🔐 Gestion de l'authentification

### Headers requis pour les endpoints protégés

```typescript
const API_BASE_URL = '/api';

// Intercepteur pour ajouter automatiquement le token
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
};
```

---

## ⚠️ Gestion des erreurs

### Codes d'erreur possibles

| Code | Description | Action recommandée |
|------|-------------|-------------------|
| 200 | Succès | - |
| 400 | Requête invalide | Vérifier les données envoyées |
| 401 | Non authentifié | Rediriger vers la page de connexion |
| 403 | Non autorisé | Vérifier les permissions de l'utilisateur |
| 404 | Ressource non trouvée | Afficher un message d'erreur |
| 500 | Erreur serveur | Réessayer ou contacter le support |

---

## 📝 Notes importantes

1. **Badge certified**: Attribué automatiquement, ne nécessite pas de vérification
2. **Badges verified/partner**: Nécessitent tous deux la soumission de documents (identité + contrat signé) et validation par modérateur
3. **Documents requis pour verified et partner**:
   - Document d'identité (recto + verso) : CNIB, permis de conduire ou passeport
   - Contrat signé avec la plateforme
4. **Différence verified vs partner**: Les deux nécessitent les mêmes documents, mais offrent des niveaux de partenariat différents
5. **Statuts de vérification**: Permettent de suivre le processus de validation (attente → valider/rejeter)
6. **Traçabilité**: Chaque validation/rejet est enregistré avec l'ID du modérateur qui a traité la demande
7. **Auto-follow prevention**: Un utilisateur ne peut pas suivre son propre profil

---

## 🚀 Workflow complet

### Pour devenir organisateur vérifié:

1. **Créer un compte** et se connecter
2. **Devenir organisateur** via `POST /api/organizers/upgrade`
3. **Soumettre une demande** via `POST /api/organizers/verification/submit`
4. **Attendre la validation** d'un modérateur
5. **Recevoir le badge** verified ou partner une fois validé

### Pour les modérateurs:

1. **Consulter les demandes** via `GET /api/organizers/verification/pending`
2. **Examiner les documents** fournis
3. **Valider** via `POST /api/organizers/verification/{id}/validate` ou **Rejeter** via `POST /api/organizers/verification/{id}/reject`
4. Le système enregistre automatiquement qui a traité la demande

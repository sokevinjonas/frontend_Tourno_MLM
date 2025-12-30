
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  related: string[];
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  questions: FAQItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faq.component.html',
  styles: [`
    .accordion-content {
      transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
    }
    .accordion-content.open {
      max-height: 1000px; /* Large enough to fit content */
      opacity: 1;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class FaqComponent implements OnInit {
  activeCategory: string = 'debuter';
  searchQuery: string = '';
  showNoResults: boolean = false;
  openedQuestionId: string | null = null;
  filteredCategories: FAQCategory[] = [];

  // Icons using simple emojis based on spec, or SVGs if preferred. 
  // Spec mentions Emoji in Hero/Categories but generic "Icons" in header.
  // Using emojis for categories as per spec visualization.
  
  categories: FAQCategory[] = [
    {
      id: 'debuter',
      name: 'Débuter',
      icon: '🎮',
      questions: [
        {
          id: 'q1.1',
          category: 'debuter',
          question: "Qu'est-ce que G4MEPRO AFRICA (GAP) ?",
          answer: `<p>G4MEPRO AFRICA (GAP) est une plateforme qui permet aux joueurs de jeux de football mobile (E-football, FC Mobile, Dream League Soccer) d'organiser et de participer à des tournois automatisés.</p>
                   <p class="mt-2 font-bold">Caractéristiques principales :</p>
                   <ul class="list-disc pl-5 mt-1 space-y-1">
                     <li>Format Suisse : Tout le monde joue toutes les rondes, pas d'élimination</li>
                     <li>Inscription sans mot de passe (OAuth ou Magic Link)</li>
                     <li>Système de Pièces GAP (1 pièce = 500 FCFA)</li>
                     <li>10 Pièces GAP offertes à l'inscription</li>
                   </ul>`,
          tags: ['gap', 'intro', 'plateforme'],
          related: []
        },
        {
          id: 'q1.2',
          category: 'debuter',
          question: "Comment créer un compte sur G4MEPRO AFRICA (GAP) ?",
          answer: `<p>L'inscription est rapide et <strong>sans mot de passe</strong>.</p>
                   <p class="mt-2 text-blue-400 font-bold">Méthode 1 : OAuth (Recommandée)</p>
                   <ol class="list-decimal pl-5 mt-1 space-y-1">
                     <li>Cliquez sur "S'inscrire"</li>
                     <li>Choisissez Google, Apple ou Facebook</li>
                     <li>Vous êtes connecté !</li>
                   </ol>
                   <p class="mt-2 text-blue-400 font-bold">Méthode 2 : Magic Link</p>
                   <ol class="list-decimal pl-5 mt-1 space-y-1">
                     <li>Entrez votre email</li>
                     <li>Cliquez sur le lien reçu par email</li>
                   </ol>`,
          tags: ['inscription', 'compte', 'oauth'],
          related: []
        },
        {
          id: 'q1.3',
          category: 'debuter',
          question: "Quels jeux sont supportés ?",
          answer: `<p>G4MEPRO AFRICA (GAP) supporte actuellement <strong>3 jeux majeurs</strong> :</p>
                   <ul class="list-disc pl-5 mt-2 space-y-1">
                     <li>⚽ <strong>E-football</strong> (Konami)</li>
                     <li>🎮 <strong>FC Mobile</strong> (EA Sports)</li>
                     <li>🏆 <strong>Dream League Soccer</strong> (DLS)</li>
                   </ul>
                   <p class="mt-2 text-sm text-slate-400"><i>Note : Vous devez fournir un screenshot de votre profil in-game pour valider votre compte.</i></p>`,
          tags: ['jeux', 'efootball', 'fc mobile', 'dls'],
          related: []
        },
        {
          id: 'q1.4',
          category: 'debuter',
          question: "Est-ce gratuit de s'inscrire ?",
          answer: `<p><strong>Oui, l'inscription est 100% gratuite !</strong></p>
                   <p class="mt-2">Vous recevez même <strong>10 Pièces GAP offertes</strong> (valeur 5,000 FCFA) après validation de votre profil.</p>
                   <p class="mt-2">Les seuls frais sont les frais d'entrée aux tournois, qui constituent le prize pool.</p>`,
          tags: ['gratuit', 'prix', 'inscription'],
          related: []
        },
        {
          id: 'q1.5',
          category: 'debuter',
          question: "Combien de temps prend la validation du profil ?",
          answer: `<p>En général : <strong>24 à 48 heures</strong>.</p>
                   <p class="mt-2">Un modérateur vérifie manuellement vos screenshots et informations pour garantir la sécurité de la plateforme.</p>
                   <p class="mt-2 text-green-400">✅ Une fois validé, vous recevez vos 10 Pièces GAP gratuites.</p>`,
          tags: ['validation', 'profil', 'temps'],
          related: []
        }
      ]
    },
    {
      id: 'profil',
      name: 'Profil',
      icon: '👤',
      questions: [
        {
           id: 'q2.1',
           category: 'profil',
           question: "Pourquoi dois-je ajouter mon numéro WhatsApp ?",
           answer: `<p>Le numéro WhatsApp est <strong>obligatoire</strong> pour faciliter l'organisation des matchs.</p>
                    <ul class="list-disc pl-5 mt-2 space-y-1">
                      <li>Communication rapide avec vos adversaires</li>
                      <li>Résolution des litiges par les modérateurs</li>
                      <li>Notifications importantes</li>
                    </ul>
                    <p class="mt-2 text-sm text-slate-400">Votre numéro n'est jamais rendu public, il est visible uniquement par vos adversaires actifs.</p>`,
           tags: ['whatsapp', 'contact', 'profil'],
           related: []
        },
        {
           id: 'q2.2',
           category: 'profil',
           question: "Puis-je avoir plusieurs comptes de jeu ?",
           answer: `<p>Oui, vous pouvez ajouter jusqu'à <strong>3 comptes</strong> (un par jeu supporté).</p>
                    <p class="mt-2">Cela vous permet de participer à des tournois sur E-football, FC Mobile et DLS avec le même profil G4MEPRO AFRICA (GAP).</p>`,
           tags: ['multicompte', 'jeux'],
           related: []
        }
      ]
    },
    {
      id: 'tournois',
      name: 'Tournois',
      icon: '🏆',
      questions: [
         {
           id: 'q3.1',
           category: 'tournois',
           question: "Comment m'inscrire à un tournoi ?",
           answer: `<ol class="list-decimal pl-5 space-y-2">
                      <li>Avoir un profil validé ✅</li>
                      <li>Avoir un solde suffisant 💰</li>
                      <li>Aller dans la rubrique "Tournois"</li>
                      <li>Choisir un tournoi et cliquer sur "S'inscrire"</li>
                      <li>Confirmer le compte de jeu à utiliser</li>
                    </ol>
                    <p class="mt-2">Les frais sont déduits automatiquement de votre wallet.</p>`,
           tags: ['inscription', 'tournoi'],
           related: []
         },
         {
           id: 'q3.2',
           category: 'tournois',
           question: "Qu'est-ce que le Format Suisse ?",
           answer: `<p>C'est un format de tournoi où <strong>personne n'est éliminé !</strong></p>
                    <p class="mt-2">Tout le monde joue toutes les rondes (généralement 4 ou 5). À chaque ronde, vous affrontez un adversaire ayant le même nombre de points que vous.</p>
                    <p class="mt-2">Victoire = 3 pts, Nul = 1 pt, Défaite = 0 pt.</p>`,
           tags: ['format', 'suisse', 'règles'],
           related: []
         }
      ]
    },
    {
       id: 'matchs',
       name: 'Matchs',
       icon: '⚽',
       questions: [
         {
            id: 'q4.1',
            category: 'matchs',
            question: "Comment soumettre un résultat ?",
            answer: `<p>Une fois le match terminé :</p>
                     <ol class="list-decimal pl-5 mt-2 space-y-1">
                       <li>Prenez un screenshot du score final</li>
                       <li>Allez dans "Mes Matchs"</li>
                       <li>Cliquez sur "Soumettre résultat"</li>
                       <li>Entrez le score et uploadez la photo</li>
                     </ol>`,
            tags: ['resultat', 'score', 'screenshot'],
            related: []
         }
       ]
    },
    {
       id: 'wallet',
       name: 'Wallet',
       icon: '💰',
       questions: [
         {
           id: 'q5.1',
           category: 'wallet',
           question: "Qu'est-ce qu'une Pièces GAP ?",
           answer: `<p>La monnaie virtuelle de la plateforme. <strong>1 pièce = 500 FCFA</strong>.</p>
                    <p class="mt-1">Elles servent à payer les frais d'inscription. Les gains des tournois sont aussi versés en Pièces GAP.</p>`,
           tags: ['piece', 'monnaie', 'valeur'],
           related: []
         },
         {
            id: 'q5.2',
            category: 'wallet',
            question: "Comment recharger mon compte ?",
            answer: `<p>Pour la version actuelle (MVP), la recharge par Mobile Money n'est <strong>pas encore disponible</strong>.</p>
                     <p class="mt-2">Vous devez utiliser vos 10 pièces de bienvenue et vos gains de tournois pour participer.</p>`,
            tags: ['recharge', 'paiement'],
            related: []
         }
       ]
    },
    {
       id: 'securite',
       name: 'Sécurité',
       icon: '🛡️',
       questions: [
          {
             id: 'q7.1',
             category: 'securite',
             question: "Comment signalez un tricheur ?",
             answer: `<p>Si vous suspectez une triche, envoyez un email à <strong>report@gap-platform.com</strong> avec :</p>
                      <ul class="list-disc pl-5 mt-1">
                        <li>Le pseudo du joueur</li>
                        <li>Le tournoi et le match concerné</li>
                        <li>Des preuves (screenshots, vidéos)</li>
                      </ul>
                      <p class="mt-2 text-red-400">Toute triche avérée entraîne un bannissement permanent.</p>`,
             tags: ['triche', 'signalement', 'ban'],
             related: []
          }
       ]
    },
    {
      id: 'technique',
      name: 'Technique',
      icon: '🔧',
      questions: [
         {
           id: 'q8.1',
           category: 'technique',
           question: "Lien Magic Link expiré ou non reçu ?",
           answer: `<p>Vérifiez vos spams. Si le lien a expiré (validité 15 min), retournez sur la page de connexion pour en demander un nouveau.</p>
                    <p class="mt-2">Pour plus de fiabilité, nous recommandons d'utiliser la connexion via Google ou Facebook.</p>`,
           tags: ['connexion', 'email', 'bug'],
           related: []
         }
      ]
    }
  ];

  constructor(
      private sanitizer: DomSanitizer,
      private location: Location
  ) {}

  ngOnInit() {
    this.filteredCategories = this.categories;
    // Simple mock of deep linking scroll logic
    // In real app might use ActivatedRoute fragment
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();
    
    if (!query) {
      this.filteredCategories = this.categories;
      this.showNoResults = false;
      this.activeCategory = 'debuter'; // Reset to first
      return;
    }

    // Filter categories that contain matching questions
    // This creates a "Search Results" view effectively where we specific questions match
    // Alternatively, we can show a flat list of matching questions.
    // Let's stick to showing categories but filtering their questions
    
    // Actually, a better UX for search is often to show a flat list of results regardless of category
    // But to keep structure simple let's filter the categories to only show ones with hits
    
    const matchingCats: FAQCategory[] = [];
    
    this.categories.forEach(cat => {
       const matchingQuestions = cat.questions.filter(q => 
          q.question.toLowerCase().includes(query) || 
          q.answer.toLowerCase().includes(query) ||
          q.tags.some(t => t.includes(query))
       );
       
       if (matchingQuestions.length > 0) {
          matchingCats.push({
             ...cat,
             questions: matchingQuestions
          });
       }
    });

    this.filteredCategories = matchingCats;
    this.showNoResults = matchingCats.length === 0;
    
    // Auto-expand if few results? 
    // For now keep standard behavior
    if (matchingCats.length > 0) {
       this.activeCategory = matchingCats[0].id; // Switch to first matching category
       // Optionally open the first question or all results
    }
  }

  toggleQuestion(id: string) {
    if (this.openedQuestionId === id) {
      this.openedQuestionId = null;
    } else {
      this.openedQuestionId = id;
    }
  }

  scrollToCategory(catId: string) {
    this.activeCategory = catId;
    this.searchQuery = ''; // Clear search when navigating manually
    this.filteredCategories = this.categories; // Reset filters
    
    // In a real implementation this would scroll the user to the section
    // For this design where "Pills" filter the view, it just sets activeCategory.
    // The visual design implies "Navigation" creates a scroll-spy effect or just tab switching.
    // Based on "Sticky header" and "Scroll smooth" description, it's a long scroll page.
    setTimeout(() => {
        const el = document.getElementById(catId);
        if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, 50);
  }
}

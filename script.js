/* ============================================================
   ORANGE MONEY ANALYZER — script.js
   Analyse 100 % locale des relevés PDF Orange Money.
   Aucune donnée n'est envoyée sur un serveur.
   Outil indépendant — sans aucune affiliation avec Orange.
   ============================================================ */

if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

/* ============================================================
   I18N
   ============================================================ */
const I18N = {
  fr: {
    'brand.tagline': 'Reprenez le contrôle de votre argent.',
    'privacy': '🔒 100 % local — vos données ne quittent pas votre navigateur',
    'upload.title': 'Glissez votre relevé Orange Money (PDF) ici',
    'upload.or': 'ou',
    'upload.browse': 'cliquez pour parcourir',
    'upload.files': 'vos fichiers',
    'upload.hint': 'Format accepté : .pdf — Traitement instantané, rien n\'est téléversé',
    'btn.demo': '🧪 Charger un exemple de démo',
    'btn.reset': '♻️ Réinitialiser',
    'insights.title': '💡 Analyse automatique',
    'stats.title': '📐 Statistiques descriptives des dépenses',
    'filters.title': '🎛️ Filtres',
    'filters.search': 'Recherche',
    'filters.searchPlaceholder': 'Ex : 000000000, Woyofal, Retrait…',
    'filters.category': 'Catégorie',
    'filters.categoryAll': 'Toutes les catégories',
    'filters.type': 'Type d\'opération',
    'filters.typeAll': 'Toutes',
    'filters.typeOut': 'Dépenses uniquement',
    'filters.typeIn': 'Entrées uniquement',
    'filters.period': 'Période',
    'filters.periodAll': 'Toutes les périodes',
    'filters.clear': 'Effacer les filtres',

    'nav.home': '🏠 Accueil',
    'nav.about': 'ℹ️ À propos',
    'nav.contact': '✉️ Contact',
    'nav.disclaimer': '⚠️ Disclaimer',

    'section.overview': '📌 Vue d\'ensemble',
    'section.detailed': '🔍 Analyse détaillée',
    'section.tables': '📋 Tableaux détaillés',

    'charts.categories': '🍩 Répartition des dépenses par catégorie',
    'charts.monthly': '📊 Entrées vs Dépenses par mois',
    'charts.balance': '📈 Évolution du solde cumulé',
    'charts.cumulative': '💰 Dépenses cumulées vs Entrées cumulées',
    'charts.catEvolution': '📚 Évolution des catégories par mois (empilé)',
    'charts.daily': '🗓️ Dépenses quotidiennes',
    'charts.weekOfMonth': '📆 Dépenses par semaine du mois',
    'charts.hourly': '🕐 Répartition horaire des transactions',
    'charts.amountDist': '📊 Distribution des montants (histogramme)',
    'charts.top': '🏪 Top 8 des destinataires / marchands',
    'charts.avgTicket': '🎫 Ticket moyen par catégorie',
    'charts.monthlyRatio': '⚖️ Taux d\'épargne mensuel',
    'chart.in': 'Entrées',
    'chart.out': 'Dépenses',
    'chart.balance': 'Solde cumulé',
    'chart.cumIn': 'Entrées cumulées',
    'chart.cumOut': 'Dépenses cumulées',
    'chart.topSpent': 'Total dépensé',
    'chart.avgTicket': 'Ticket moyen',
    'chart.weekLabel': 'Semaine',
    'chart.savingsRate': 'Taux d\'épargne',
    'chart.transactions': 'Nombre de transactions',

    'monthly.title': '📋 Comparaison mensuelle',
    'monthly.month': 'Mois',
    'monthly.in': 'Entrées',
    'monthly.out': 'Dépenses',
    'monthly.net': 'Solde',
    'monthly.ops': 'Opérations',
    'monthly.avg': 'Dépense moy.',

    'top10.title': '🔝 Top 10 des plus grosses dépenses',
    'top10.date': 'Date',
    'top10.label': 'Libellé',
    'top10.category': 'Catégorie',
    'top10.amount': 'Montant',

    'topDays.title': '🔥 Top 5 des journées les plus dépensières',
    'topDays.date': 'Date',
    'topDays.count': 'Nb transactions',
    'topDays.total': 'Total dépensé',
    'topDays.avg': 'Moyenne / transaction',

    'recurring.title': '🔁 Paiements récurrents détectés',
    'recurring.name': 'Bénéficiaire / Marchand',
    'recurring.count': 'Occurrences',
    'recurring.avg': 'Montant moyen',
    'recurring.total': 'Total cumulé',
    'recurring.empty': 'Aucun paiement récurrent détecté sur cette période.',

    'tx.title': '🧾 Détail des transactions',
    'tx.export': '⬇️ Exporter en CSV',
    'tx.date': 'Date',
    'tx.label': 'Libellé',
    'tx.category': 'Catégorie',
    'tx.amount': 'Montant',

    'kpi.in': 'Entrées',
    'kpi.out': 'Dépenses',
    'kpi.net': 'Solde net',
    'kpi.tx': 'Transactions',
    'kpi.avg': 'Dépense moyenne',
    'kpi.max': 'Plus grosse dépense',
    'kpi.ops': 'opérations',
    'kpi.inSel': 'dans la sélection',
    'kpi.perOut': 'par opération sortante',
    'kpi.onFiltered': 'sur la période filtrée',
    'kpi.netSub': 'Entrées − Dépenses',

    'stats.median': 'Médiane',
    'stats.medianSub': '50% au-dessus / en-dessous',
    'stats.q1': '1er quartile (P25)',
    'stats.q1Sub': '25% des dépenses en dessous',
    'stats.q3': '3e quartile (P75)',
    'stats.q3Sub': '75% des dépenses en dessous',
    'stats.p90': '90e percentile',
    'stats.p90Sub': '10% des dépenses au-dessus',
    'stats.iqr': 'Écart interquartile',
    'stats.iqrSub': 'P75 − P25',
    'stats.std': 'Écart-type',
    'stats.stdSub': 'Dispersion des montants',
    'stats.mode': 'Montant le plus fréquent',
    'stats.modeSub': 'Valeur récurrente',
    'stats.merchants': 'Marchands distincts',
    'stats.merchantsSub': 'Bénéficiaires uniques',
    'stats.count': 'Nb de dépenses',
    'stats.countSub': 'Transactions sortantes',

    'insights.empty': 'Aucune transaction pour les filtres actuels.',
    'insights.topCat': 'Catégorie la plus dépensière',
    'insights.topMonth': 'Mois le plus dépensier',
    'insights.topCp': 'Destinataire / marchand le plus fréquent',
    'insights.biggest': 'Plus grosse dépense',
    'insights.dailyAvg': 'Moyenne quotidienne de dépenses',
    'insights.topHour': 'Heure la plus active',
    'insights.median': 'Dépense médiane',
    'insights.savings': 'Taux d\'épargne global',
    'insights.concentration': 'Concentration des dépenses',
    'insights.over': 'sur',
    'insights.day': 'jour(s)',
    'insights.ops': 'opérations',
    'insights.on': 'le',
    'insights.ofTopMerchants': 'sur les 3 premiers marchands',

    'status.reading': '📖 Lecture du PDF en cours…',
    'status.success': '✅ {n} transactions analysées avec succès.',
    'status.demo': '🧪 Démo chargée : {n} transactions fictives.',
    'status.noTx': 'Aucune transaction Orange Money détectée dans ce PDF.',
    'status.notPdf': 'Veuillez sélectionner un fichier PDF.',
    'status.pdfError': 'Erreur lors de la lecture du PDF : ',
    'status.noExport': 'Aucune transaction à exporter.',

    'about.title': 'ℹ️ À propos de Orange Money Analyzer',
    'about.intro': 'Orange Money Analyzer est un outil d\'analyse indépendant conçu pour vous aider à mieux comprendre vos relevés de transactions mobile money.',
    'about.purpose': 'Notre objectif est de fournir une visualisation claire et détaillée de vos habitudes de dépenses, sans jamais compromettre votre vie privée.',
    'about.features': 'Fonctionnalités principales',
    'about.f1': '📄 Analyse locale de fichiers PDF — aucune donnée envoyée sur un serveur',
    'about.f2': '📊 Graphiques interactifs (catégories, tendances mensuelles, distribution horaire)',
    'about.f3': '📐 Statistiques descriptives avancées (médiane, quartiles, écart-type)',
    'about.f4': '🔍 Détection automatique des paiements récurrents',
    'about.f5': '🌍 Interface multilingue (Français / Anglais)',
    'about.f6': '⬇️ Export CSV des transactions filtrées',
    'about.independent': 'Outil indépendant',
    'about.independentText': 'Orange Money Analyzer est un outil indépendant. Il n\'est ni développé, ni édité, ni affilié, ni approuvé, ni sponsorisé par Orange, Orange Money, ni par aucune de leurs filiales ou partenaires.',

    'contact.title': '✉️ Contact',
    'contact.intro': 'Pour toute question, suggestion ou signalement de bug, vous pouvez nous contacter :',
    'contact.email': 'Email',
    'contact.bugs': 'Rapports de bugs',
    'contact.suggestions': 'Suggestions',
    'contact.note': '🔒 Aucun fichier PDF ne doit être envoyé par email. Toutes les analyses sont effectuées localement dans votre navigateur.',

    'disclaimer.title': '⚠️ Avertissement & mentions légales',
    'disclaimer.section1.title': '1. Outil indépendant',
    'disclaimer.section1.text': 'Orange Money Analyzer est un outil indépendant. Il n\'est ni développé, ni édité, ni affilié, ni approuvé, ni sponsorisé par Orange, Orange Money, ni par aucune de leurs filiales ou partenaires. Les marques et logos cités appartiennent à leurs propriétaires respectifs et sont mentionnés uniquement à titre descriptif.',
    'disclaimer.section2.title': '2. Exclusion de responsabilité',
    'disclaimer.section2.text': 'L\'utilisateur est seul responsable des données qu\'il importe dans cet outil. L\'éditeur ne saurait être tenu responsable de toute erreur, omission, inexactitude, perte de données, ou conséquence directe ou indirecte résultant de l\'utilisation de ce site. Cet outil ne constitue en aucun cas un conseil financier, fiscal ou juridique.',
    'disclaimer.section3.title': '3. Confidentialité',
    'disclaimer.section3.text': 'Aucun fichier, aucune donnée et aucun résultat ne sont transmis à un serveur. Tout le traitement est effectué localement, dans votre navigateur.',
    'disclaimer.section4.title': '4. Propriété intellectuelle',
    'disclaimer.section4.text': 'Tous droits réservés. Toutes les marques, logos, noms de produits et services, ainsi que tous les liens externes mentionnés sur ce site, appartiennent à leurs propriétaires légitimes respectifs. Leur mention est purement descriptive et ne constitue en aucun cas une affiliation, un partenariat ou une approbation.',

    'footer.title': '⚠️ Avertissement & mentions légales',
    'footer.independent': '<strong>Orange Money Analyzer est un outil indépendant.</strong> Il n\'est ni développé, ni édité, ni affilié, ni approuvé, ni sponsorisé par <strong>Orange</strong>, <strong>Orange Money</strong>, ni par aucune de leurs filiales ou partenaires. Les marques et logos cités appartiennent à leurs propriétaires respectifs et sont mentionnés uniquement à titre descriptif.',
    'footer.responsibility': '<strong>Exclusion de responsabilité :</strong> l\'utilisateur est seul responsable des données qu\'il importe dans cet outil. L\'éditeur ne saurait être tenu responsable de toute erreur, omission, inexactitude, perte de données, ou conséquence directe ou indirecte résultant de l\'utilisation de ce site. Cet outil ne constitue en aucun cas un conseil financier, fiscal ou juridique.',
    'footer.privacy': '<strong>Confidentialité :</strong> aucun fichier, aucune donnée et aucun résultat ne sont transmis à un serveur. Tout le traitement est effectué localement, dans votre navigateur.',
    'footer.trademarks': '<strong>Marques et liens :</strong> toutes les marques, logos, noms de produits et services, ainsi que tous les liens externes mentionnés sur ce site, appartiennent à leurs propriétaires légitimes respectifs. Leur mention est purement descriptive et ne constitue en aucun cas une affiliation, un partenariat ou une approbation.',
    'footer.countries.title': '🌍 Pays où Orange Money est présent',
    'footer.countries.note': 'Orange Money est disponible dans 17 pays d\'Afrique et du Moyen-Orient. Cette liste est fournie à titre indicatif et peut évoluer.',
    'footer.copy': '© Orange Money Analyzer — Tous droits réservés. Outil d\'analyse indépendant. Aucune affiliation avec Orange.',
    'footer.copy2': 'Toutes les marques et tous les liens mentionnés appartiennent à leurs propriétaires légitimes respectifs.',

    'weekdays': ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    'months': ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'],
    'locale': 'fr-FR'
  },
  en: {
    'brand.tagline': 'Take back control of your money.',
    'privacy': '🔒 100 % local — your data never leaves your browser',
    'upload.title': 'Drop your Orange Money statement (PDF) here',
    'upload.or': 'or',
    'upload.browse': 'click to browse',
    'upload.files': 'your files',
    'upload.hint': 'Accepted format: .pdf — Instant processing, nothing is uploaded',
    'btn.demo': '🧪 Load demo data',
    'btn.reset': '♻️ Reset',
    'insights.title': '💡 Automatic insights',
    'stats.title': '📐 Descriptive statistics on spending',
    'filters.title': '🎛️ Filters',
    'filters.search': 'Search',
    'filters.searchPlaceholder': 'e.g. 000000000, Woyofal, Withdrawal…',
    'filters.category': 'Category',
    'filters.categoryAll': 'All categories',
    'filters.type': 'Operation type',
    'filters.typeAll': 'All',
    'filters.typeOut': 'Expenses only',
    'filters.typeIn': 'Income only',
    'filters.period': 'Period',
    'filters.periodAll': 'All periods',
    'filters.clear': 'Clear filters',

    'nav.home': '🏠 Home',
    'nav.about': 'ℹ️ About',
    'nav.contact': '✉️ Contact',
    'nav.disclaimer': '⚠️ Disclaimer',

    'section.overview': '📌 Overview',
    'section.detailed': '🔍 Detailed analysis',
    'section.tables': '📋 Detailed tables',

    'charts.categories': '🍩 Spending breakdown by category',
    'charts.monthly': '📊 Income vs Expenses per month',
    'charts.balance': '📈 Cumulative balance over time',
    'charts.cumulative': '💰 Cumulative spending vs cumulative income',
    'charts.catEvolution': '📚 Category evolution per month (stacked)',
    'charts.daily': '🗓️ Daily spending',
    'charts.weekOfMonth': '📆 Spending by week of month',
    'charts.hourly': '🕐 Transactions by hour of day',
    'charts.amountDist': '📊 Amount distribution (histogram)',
    'charts.top': '🏪 Top 8 recipients / merchants',
    'charts.avgTicket': '🎫 Average ticket by category',
    'charts.monthlyRatio': '⚖️ Monthly savings rate',
    'chart.in': 'Income',
    'chart.out': 'Expenses',
    'chart.balance': 'Cumulative balance',
    'chart.cumIn': 'Cumulative income',
    'chart.cumOut': 'Cumulative spending',
    'chart.topSpent': 'Total spent',
    'chart.avgTicket': 'Average ticket',
    'chart.weekLabel': 'Week',
    'chart.savingsRate': 'Savings rate',
    'chart.transactions': 'Number of transactions',

    'monthly.title': '📋 Monthly comparison',
    'monthly.month': 'Month',
    'monthly.in': 'Income',
    'monthly.out': 'Expenses',
    'monthly.net': 'Net',
    'monthly.ops': 'Operations',
    'monthly.avg': 'Avg. expense',

    'top10.title': '🔝 Top 10 largest expenses',
    'top10.date': 'Date',
    'top10.label': 'Label',
    'top10.category': 'Category',
    'top10.amount': 'Amount',

    'topDays.title': '🔥 Top 5 highest-spending days',
    'topDays.date': 'Date',
    'topDays.count': 'No. transactions',
    'topDays.total': 'Total spent',
    'topDays.avg': 'Average / transaction',

    'recurring.title': '🔁 Detected recurring payments',
    'recurring.name': 'Recipient / Merchant',
    'recurring.count': 'Occurrences',
    'recurring.avg': 'Average amount',
    'recurring.total': 'Total',
    'recurring.empty': 'No recurring payment detected in this period.',

    'tx.title': '🧾 Transaction details',
    'tx.export': '⬇️ Export to CSV',
    'tx.date': 'Date',
    'tx.label': 'Label',
    'tx.category': 'Category',
    'tx.amount': 'Amount',

    'kpi.in': 'Income',
    'kpi.out': 'Expenses',
    'kpi.net': 'Net balance',
    'kpi.tx': 'Transactions',
    'kpi.avg': 'Average expense',
    'kpi.max': 'Largest expense',
    'kpi.ops': 'operations',
    'kpi.inSel': 'in selection',
    'kpi.perOut': 'per outgoing operation',
    'kpi.onFiltered': 'on filtered period',
    'kpi.netSub': 'Income − Expenses',

    'stats.median': 'Median',
    'stats.medianSub': '50% above / below',
    'stats.q1': '1st quartile (P25)',
    'stats.q1Sub': '25% of expenses below',
    'stats.q3': '3rd quartile (P75)',
    'stats.q3Sub': '75% of expenses below',
    'stats.p90': '90th percentile',
    'stats.p90Sub': '10% of expenses above',
    'stats.iqr': 'Interquartile range',
    'stats.iqrSub': 'P75 − P25',
    'stats.std': 'Std. deviation',
    'stats.stdSub': 'Dispersion of amounts',
    'stats.mode': 'Most frequent amount',
    'stats.modeSub': 'Recurring value',
    'stats.merchants': 'Distinct merchants',
    'stats.merchantsSub': 'Unique recipients',
    'stats.count': 'Number of expenses',
    'stats.countSub': 'Outgoing transactions',

    'insights.empty': 'No transactions match the current filters.',
    'insights.topCat': 'Top spending category',
    'insights.topMonth': 'Top spending month',
    'insights.topCp': 'Most frequent recipient / merchant',
    'insights.biggest': 'Largest expense',
    'insights.dailyAvg': 'Average daily spending',
    'insights.topHour': 'Busiest hour',
    'insights.median': 'Median expense',
    'insights.savings': 'Overall savings rate',
    'insights.concentration': 'Spending concentration',
    'insights.over': 'over',
    'insights.day': 'day(s)',
    'insights.ops': 'operations',
    'insights.on': 'on',
    'insights.ofTopMerchants': 'on top 3 merchants',

    'status.reading': '📖 Reading PDF…',
    'status.success': '✅ {n} transactions analyzed successfully.',
    'status.demo': '🧪 Demo loaded: {n} fictional transactions.',
    'status.noTx': 'No Orange Money transaction detected in this PDF.',
    'status.notPdf': 'Please select a PDF file.',
    'status.pdfError': 'Error reading PDF: ',
    'status.noExport': 'No transaction to export.',

    'about.title': 'ℹ️ About Orange Money Analyzer',
    'about.intro': 'Orange Money Analyzer is an independent analysis tool designed to help you better understand your mobile money transaction statements.',
    'about.purpose': 'Our goal is to provide a clear and detailed visualization of your spending habits, without ever compromising your privacy.',
    'about.features': 'Main features',
    'about.f1': '📄 Local PDF analysis — no data sent to any server',
    'about.f2': '📊 Interactive charts (categories, monthly trends, hourly distribution)',
    'about.f3': '📐 Advanced descriptive statistics (median, quartiles, standard deviation)',
    'about.f4': '🔍 Automatic detection of recurring payments',
    'about.f5': '🌍 Multilingual interface (French / English)',
    'about.f6': '⬇️ CSV export of filtered transactions',
    'about.independent': 'Independent tool',
    'about.independentText': 'Orange Money Analyzer is an independent tool. It is not developed, published, affiliated with, endorsed or sponsored by Orange, Orange Money, or any of their subsidiaries or partners.',

    'contact.title': '✉️ Contact',
    'contact.intro': 'For any question, suggestion or bug report, you can contact us:',
    'contact.email': 'Email',
    'contact.bugs': 'Bug reports',
    'contact.suggestions': 'Suggestions',
    'contact.note': '🔒 No PDF file should be sent by email. All analyses are performed locally in your browser.',

    'disclaimer.title': '⚠️ Disclaimer & legal notice',
    'disclaimer.section1.title': '1. Independent tool',
    'disclaimer.section1.text': 'Orange Money Analyzer is an independent tool. It is not developed, published, affiliated with, endorsed or sponsored by Orange, Orange Money, or any of their subsidiaries or partners. All trademarks and logos mentioned belong to their respective owners and are used for descriptive purposes only.',
    'disclaimer.section2.title': '2. Disclaimer of liability',
    'disclaimer.section2.text': 'The user is solely responsible for the data they import into this tool. The publisher cannot be held liable for any error, omission, inaccuracy, data loss, or direct or indirect consequence resulting from the use of this site. This tool does not constitute financial, tax or legal advice.',
    'disclaimer.section3.title': '3. Privacy',
    'disclaimer.section3.text': 'No file, no data and no result is transmitted to any server. All processing is performed locally, in your browser.',
    'disclaimer.section4.title': '4. Intellectual property',
    'disclaimer.section4.text': 'All rights reserved. All trademarks, logos, product and service names, as well as all external links mentioned on this site, belong to their respective legitimate owners. Their mention is purely descriptive and does not constitute any affiliation, partnership or endorsement.',

    'footer.title': '⚠️ Disclaimer & legal notice',
    'footer.independent': '<strong>Orange Money Analyzer is an independent tool.</strong> It is not developed, published, affiliated with, endorsed or sponsored by <strong>Orange</strong>, <strong>Orange Money</strong>, or any of their subsidiaries or partners. All trademarks and logos mentioned belong to their respective owners and are used for descriptive purposes only.',
    'footer.responsibility': '<strong>Disclaimer of liability:</strong> the user is solely responsible for the data they import into this tool. The publisher cannot be held liable for any error, omission, inaccuracy, data loss, or direct or indirect consequence resulting from the use of this site. This tool does not constitute financial, tax or legal advice.',
    'footer.privacy': '<strong>Privacy:</strong> no file, no data and no result is transmitted to any server. All processing is performed locally, in your browser.',
    'footer.trademarks': '<strong>Trademarks and links:</strong> all trademarks, logos, product and service names, as well as all external links mentioned on this site, belong to their respective legitimate owners. Their mention is purely descriptive and does not constitute any affiliation, partnership or endorsement.',
    'footer.countries.title': '🌍 Countries where Orange Money is available',
    'footer.countries.note': 'Orange Money is available in 17 countries in Africa and the Middle East. This list is provided for information purposes and may change.',
    'footer.copy': '© Orange Money Analyzer — All rights reserved. Independent analysis tool. Not affiliated with Orange.',
    'footer.copy2': 'All trademarks and links mentioned belong to their respective legitimate owners.',

    'weekdays': ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    'months': ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    'locale': 'en-GB'
  }
};

const CAT_TRANSLATIONS = {
  fr: {
    'Pass Illimix / Forfait': 'Pass Illimix / Forfait',
    'Transfert international': 'Transfert international',
    "Transfert d'argent": "Transfert d'argent",
    'Virement Orange Money': 'Virement Orange Money',
    'Woyofal (électricité)': 'Woyofal (électricité)',
    'Paiement de facture': 'Paiement de facture',
    'Paiement marchand': 'Paiement marchand',
    'Retrait': 'Retrait',
    'Dépôt': 'Dépôt',
    'Autre': 'Autre'
  },
  en: {
    'Pass Illimix / Forfait': 'Illimix Pass / Plan',
    'Transfert international': 'International transfer',
    "Transfert d'argent": 'Money transfer',
    'Virement Orange Money': 'Orange Money transfer',
    'Woyofal (électricité)': 'Woyofal (electricity)',
    'Paiement de facture': 'Bill payment',
    'Paiement marchand': 'Merchant payment',
    'Retrait': 'Withdrawal',
    'Dépôt': 'Deposit',
    'Autre': 'Other'
  }
};

let currentLang = 'fr';
function t(key) { return (I18N[currentLang] && I18N[currentLang][key]) || key; }
function catLabel(cat) { return (CAT_TRANSLATIONS[currentLang] && CAT_TRANSLATIONS[currentLang][cat]) || cat; }
function wdName(i) { return I18N[currentLang].weekdays[i]; }
function monthShort(i) { return I18N[currentLang].months[i]; }

/* ============================================================
   PAYS ORANGE MONEY
   ============================================================ */
const COUNTRIES = [
  'Botswana', 'Burkina Faso', 'Cameroun', 'République Centrafricaine',
  'Côte d\'Ivoire', 'République Démocratique du Congo', 'Égypte',
  'Guinée', 'Guinée-Bissau', 'Liberia', 'Madagascar', 'Mali',
  'Maurice', 'Niger', 'Sénégal', 'Sierra Leone', 'Tunisie'
];

/* ============================================================
   ÉTAT
   ============================================================ */
let allTransactions = [];
let filteredTransactions = [];
const charts = {};

/* ============================================================
   DOM
   ============================================================ */
const fileInput      = document.getElementById('fileInput');
const dropzone       = document.getElementById('dropzone');
const statusEl       = document.getElementById('status');
const errorBox       = document.getElementById('errorBox');
const dashboard      = document.getElementById('dashboard');
const loadDemoBtn    = document.getElementById('loadDemoBtn');
const resetBtn       = document.getElementById('resetBtn');
const refreshBtn     = document.getElementById('refreshBtn');
const datetimeEl     = document.getElementById('datetime');
const langButtons    = document.querySelectorAll('.lang-btn');
const pageNavBtns    = document.querySelectorAll('.page-nav-btn');

const kpiGrid        = document.getElementById('kpiGrid');
const insightsList   = document.getElementById('insightsList');
const statsGrid      = document.getElementById('statsGrid');

const searchInput    = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const filterType     = document.getElementById('filterType');
const filterMonth    = document.getElementById('filterMonth');
const clearFilters   = document.getElementById('clearFilters');

const txCount         = document.getElementById('txCount');
const txBody          = document.getElementById('txBody');
const monthlyTableBody = document.getElementById('monthlyTableBody');
const top10Body       = document.getElementById('top10Body');
const topDaysBody     = document.getElementById('topDaysBody');
const recurringBody   = document.getElementById('recurringBody');
const exportCsv       = document.getElementById('exportCsv');
const countriesGrid   = document.getElementById('countriesGrid');

/* ============================================================
   UTILITAIRES
   ============================================================ */
function fmt(n) {
  const v = Math.round(Math.abs(n));
  return (n < 0 ? '- ' : '') + v.toLocaleString('fr-FR').replace(/\u202F/g, ' ') + ' F';
}
function fmtShort(n) {
  const abs = Math.abs(n);
  if (abs >= 1000000) return (n/1000000).toFixed(1).replace('.', ',') + ' M';
  if (abs >= 1000)    return Math.round(n/1000) + ' k';
  return String(Math.round(n));
}
function monthKey(d) { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0'); }
function dayKey(d)   { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
function monthLabel(key) {
  const parts = key.split('-');
  return monthShort(parseInt(parts[1],10)-1) + ' ' + parts[0];
}
function formatDate(d) {
  return String(d.getDate()).padStart(2,'0') + '/' +
         String(d.getMonth()+1).padStart(2,'0') + '/' +
         d.getFullYear() + ' ' +
         String(d.getHours()).padStart(2,'0') + ':' +
         String(d.getMinutes()).padStart(2,'0');
}
function formatDayShort(d) {
  return String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0');
}
function formatDayLong(d) {
  return wdName(d.getDay()) + ' ' + String(d.getDate()).padStart(2,'0') + '/' +
         String(d.getMonth()+1).padStart(2,'0') + '/' + d.getFullYear();
}
function setStatus(msg) {
  if (!msg) { statusEl.classList.add('hidden'); statusEl.textContent = ''; return; }
  statusEl.textContent = msg;
  statusEl.classList.remove('hidden');
}
function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.remove('hidden');
  setTimeout(function() { errorBox.classList.add('hidden'); }, 6000);
}
function percentile(sortedArr, p) {
  if (!sortedArr.length) return 0;
  if (sortedArr.length === 1) return sortedArr[0];
  const idx = (sortedArr.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sortedArr[lo];
  const w = idx - lo;
  return sortedArr[lo] * (1 - w) + sortedArr[hi] * w;
}

/* ============================================================
   DATE / HEURE
   ============================================================ */
function updateDateTime() {
  const now = new Date();
  const locale = I18N[currentLang].locale || 'fr-FR';
  datetimeEl.textContent = now.toLocaleString(locale, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

/* ============================================================
   LANGUE
   ============================================================ */
function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const val = t(el.getAttribute('data-i18n'));
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
  langButtons.forEach(function(b) { b.classList.toggle('active', b.dataset.lang === lang); });
  renderCountries();
  updateDateTime();
  if (allTransactions.length) { populateFilters(); applyFilters(); }
}

/* ============================================================
   PAGES
   ============================================================ */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  pageNavBtns.forEach(function(b) {
    b.classList.toggle('active', b.dataset.page === pageId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   PAYS
   ============================================================ */
function renderCountries() {
  if (!countriesGrid) return;
  countriesGrid.innerHTML = COUNTRIES.map(function(c) {
    return '<div class="country-item">' + c + '</div>';
  }).join('');
}

/* ============================================================
   CATÉGORISATION
   ============================================================ */
const KNOWN_PREFIXES = [
  'Achat pass Illimix', 'Achat pass FibreMax',
  "Transfert d'argent", 'Virement vers OM',
  'Paiement marchand', 'Paiement Woyofal', 'Paiement Facture',
  'Transfert international', 'Retrait', 'Dépôt', 'Depot'
];

function cleanLabel(raw) {
  let s = raw.replace(/\s+/g, ' ').trim();
  s = s.replace(/^[\d\s]+F\s+/i, '').trim();
  let chosen = null, chosenIdx = -1;
  for (let i = 0; i < KNOWN_PREFIXES.length; i++) {
    const p = KNOWN_PREFIXES[i];
    const idx = s.lastIndexOf(p);
    if (idx > chosenIdx) { chosenIdx = idx; chosen = p; }
  }
  if (chosen && chosenIdx >= 0) s = s.slice(chosenIdx).trim();
  s = s.replace(/^[-–—\s]+/, '').trim();
  return s || 'Transaction';
}

function categorize(label) {
  const l = label.toLowerCase();
  if (l.indexOf('pass illimix') !== -1 || l.indexOf('pass fibre') !== -1) return 'Pass Illimix / Forfait';
  if (l.indexOf('transfert international') !== -1)  return 'Transfert international';
  if (l.indexOf("transfert d'argent") !== -1)       return "Transfert d'argent";
  if (l.indexOf('virement vers om') !== -1)         return 'Virement Orange Money';
  if (l.indexOf('woyofal') !== -1)                  return 'Woyofal (électricité)';
  if (l.indexOf('paiement facture') !== -1 || l.indexOf('facture') !== -1) return 'Paiement de facture';
  if (l.indexOf('paiement marchand') !== -1)        return 'Paiement marchand';
  if (l.indexOf('retrait') !== -1)                  return 'Retrait';
  if (l.indexOf('dépôt') !== -1 || l.indexOf('depot') !== -1) return 'Dépôt';
  return 'Autre';
}

function counterpartyKey(tx) {
  const m = tx.label.match(/(\d{3,})$/);
  if (m) {
    if (/^paiement marchand/i.test(tx.label))   return 'Marchand ' + m[1];
    if (/^transfert d'argent/i.test(tx.label)) return 'Bénéf. ' + m[1];
    if (/woyofal/i.test(tx.label))              return 'Woyofal';
    if (/facture/i.test(tx.label))              return 'Facture ' + m[1];
    return m[1];
  }
  return tx.label;
}

/* ============================================================
   EXTRACTION PDF
   ============================================================ */
async function extractPdfText(buffer) {
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;
  let full = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const linesMap = new Map();
    content.items.forEach(function(item) {
      const y = Math.round(item.transform[5]);
      if (!linesMap.has(y)) linesMap.set(y, []);
      linesMap.get(y).push({ x: item.transform[4], str: item.str });
    });
    const sortedY = Array.from(linesMap.keys()).sort(function(a, b) { return b - a; });
    full += '\n' + sortedY.map(function(y) {
      return linesMap.get(y)
        .sort(function(a, b) { return a.x - b.x; })
        .map(function(it) { return it.str; })
        .join(' ');
    }).join('\n');
  }
  return full;
}

/* ============================================================
   PARSING
   ============================================================ */
const TX_REGEX =
  /([\s\S]+?)\s+(\d{2}\/\d{2}\/\d{4})\s*à\s*(\d{2}:\d{2})\s*([+\-])\s*([\d\s\u00A0\u202F]+?)\s*F/g;

function parseTransactions(text) {
  const clean = text
    .replace(/[\u00A0\u202F]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, ' ');

  const txs = [];
  let m;
  TX_REGEX.lastIndex = 0;

  while ((m = TX_REGEX.exec(clean)) !== null) {
    const label = cleanLabel(m[1]);
    const dateStr = m[2];
    const timeStr = m[3];
    const sign = m[4];
    const amount = parseInt(m[5].replace(/\s/g, ''), 10);
    if (!isFinite(amount) || amount <= 0) continue;

    const dparts = dateStr.split('/').map(Number);
    const tparts = timeStr.split(':').map(Number);
    const date = new Date(dparts[2], dparts[1] - 1, dparts[0], tparts[0], tparts[1]);
    if (isNaN(date.getTime())) continue;

    const labelObj = { label: label };
    txs.push({
      label: label,
      date: date,
      dateStr: dateStr,
      timeStr: timeStr,
      sign: sign,
      amount: sign === '-' ? -amount : amount,
      absAmount: amount,
      category: categorize(label),
      counterparty: counterpartyKey(labelObj),
      type: sign === '-' ? 'out' : 'in'
    });
  }

  txs.sort(function(a, b) { return a.date - b.date; });
  let bal = 0;
  txs.forEach(function(tx) { bal += tx.amount; tx.balance = bal; });
  return txs;
}

/* ============================================================
   CHARGEMENT
   ============================================================ */
async function handleFile(file) {
  if (!file) return;
  if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') {
    showError(t('status.notPdf')); return;
  }
  setStatus(t('status.reading'));
  errorBox.classList.add('hidden');

  try {
    const buffer = await file.arrayBuffer();
    const text = await extractPdfText(buffer);
    const txs = parseTransactions(text);

    if (txs.length === 0) {
      setStatus('');
      showError(t('status.noTx'));
      return;
    }

    allTransactions = txs;
    onDataLoaded();
    setStatus(t('status.success').replace('{n}', txs.length));
    setTimeout(function() { setStatus(''); }, 3500);
  } catch (e) {
    console.error(e);
    setStatus('');
    showError(t('status.pdfError') + (e.message || e));
  }
}

function onDataLoaded() {
  populateFilters();
  resetBtn.classList.remove('hidden');
  dashboard.classList.remove('hidden');
  applyFilters();
  setTimeout(function() {
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function populateFilters() {
  const prevCat   = filterCategory.value;
  const prevMonth = filterMonth.value;

  const cats = Array.from(new Set(allTransactions.map(function(tx) { return tx.category; }))).sort();
  filterCategory.innerHTML =
    '<option value="all">' + t('filters.categoryAll') + '</option>' +
    cats.map(function(c) { return '<option value="' + c + '">' + catLabel(c) + '</option>'; }).join('');

  const months = Array.from(new Set(allTransactions.map(function(tx) { return monthKey(tx.date); }))).sort().reverse();
  filterMonth.innerHTML =
    '<option value="all">' + t('filters.periodAll') + '</option>' +
    months.map(function(m) { return '<option value="' + m + '">' + monthLabel(m) + '</option>'; }).join('');

  if (Array.from(filterCategory.options).some(function(o) { return o.value === prevCat; })) filterCategory.value = prevCat;
  if (Array.from(filterMonth.options).some(function(o) { return o.value === prevMonth; }))  filterMonth.value = prevMonth;
}

/* ============================================================
   FILTRES
   ============================================================ */
function applyFilters() {
  const q     = searchInput.value.trim().toLowerCase();
  const cat   = filterCategory.value;
  const type  = filterType.value;
  const month = filterMonth.value;

  filteredTransactions = allTransactions.filter(function(tx) {
    if (q && tx.label.toLowerCase().indexOf(q) === -1) return false;
    if (cat !== 'all' && tx.category !== cat) return false;
    if (type === 'out' && tx.amount >= 0) return false;
    if (type === 'in'  && tx.amount < 0)  return false;
    if (month !== 'all' && monthKey(tx.date) !== month) return false;
    return true;
  });

  renderAll();
}

/* ============================================================
   RENDU GLOBAL
   ============================================================ */
function renderAll() {
  renderKpis();
  renderStats();
  renderInsights();
  renderCharts();
  renderTopDaysTable();
  renderMonthlyTable();
  renderTop10Table();
  renderRecurringTable();
  renderTransactionsTable();
}

/* ============================================================
   KPI
   ============================================================ */
function renderKpis() {
  const txs = filteredTransactions;
  const ins  = txs.filter(function(tx) { return tx.amount > 0; })
                  .reduce(function(s, tx) { return s + tx.amount; }, 0);
  const outs = txs.filter(function(tx) { return tx.amount < 0; })
                  .reduce(function(s, tx) { return s + Math.abs(tx.amount); }, 0);
  const net  = ins - outs;
  const outCount = txs.filter(function(tx) { return tx.amount < 0; }).length;
  const inCount  = txs.filter(function(tx) { return tx.amount > 0; }).length;
  const avgOut = outCount ? outs / outCount : 0;
  const maxOut = txs.filter(function(tx) { return tx.amount < 0; })
                    .reduce(function(m, tx) { return Math.abs(tx.amount) > m ? Math.abs(tx.amount) : m; }, 0);

  kpiGrid.innerHTML =
    '<div class="kpi in"><div class="kpi-label">' + t('kpi.in') + '</div><div class="kpi-value in">' + fmt(ins) + '</div><div class="kpi-sub">' + inCount + ' ' + t('kpi.ops') + '</div></div>' +
    '<div class="kpi out"><div class="kpi-label">' + t('kpi.out') + '</div><div class="kpi-value out">' + fmt(outs) + '</div><div class="kpi-sub">' + outCount + ' ' + t('kpi.ops') + '</div></div>' +
    '<div class="kpi"><div class="kpi-label">' + t('kpi.net') + '</div><div class="kpi-value ' + (net >= 0 ? 'in' : 'out') + '">' + fmt(net) + '</div><div class="kpi-sub">' + t('kpi.netSub') + '</div></div>' +
    '<div class="kpi"><div class="kpi-label">' + t('kpi.tx') + '</div><div class="kpi-value">' + txs.length + '</div><div class="kpi-sub">' + t('kpi.inSel') + '</div></div>' +
    '<div class="kpi"><div class="kpi-label">' + t('kpi.avg') + '</div><div class="kpi-value">' + fmt(avgOut) + '</div><div class="kpi-sub">' + t('kpi.perOut') + '</div></div>' +
    '<div class="kpi"><div class="kpi-label">' + t('kpi.max') + '</div><div class="kpi-value out">' + fmt(maxOut) + '</div><div class="kpi-sub">' + t('kpi.onFiltered') + '</div></div>';
}

/* ============================================================
   STATISTIQUES DESCRIPTIVES
   ============================================================ */
function renderStats() {
  if (!statsGrid) return;
  const outs = filteredTransactions
    .filter(function(tx) { return tx.amount < 0; })
    .map(function(tx) { return Math.abs(tx.amount); })
    .sort(function(a, b) { return a - b; });

  if (outs.length === 0) {
    statsGrid.innerHTML = '<div class="stat-item"><div class="stat-label">—</div><div class="stat-value">—</div></div>';
    return;
  }

  const median = percentile(outs, 0.5);
  const q1     = percentile(outs, 0.25);
  const q3     = percentile(outs, 0.75);
  const p90    = percentile(outs, 0.90);
  const mean   = outs.reduce(function(a, b) { return a + b; }, 0) / outs.length;
  const variance = outs.reduce(function(a, b) { return a + Math.pow(b - mean, 2); }, 0) / outs.length;
  const std    = Math.sqrt(variance);
  const iqr    = q3 - q1;

  const freq = {};
  outs.forEach(function(v) { freq[v] = (freq[v] || 0) + 1; });
  let mode = outs[0], modeCount = 0;
  Object.keys(freq).forEach(function(k) {
    const v = Number(k);
    if (freq[k] > modeCount) { mode = v; modeCount = freq[k]; }
  });

  const distinctMerchants = new Set(
    filteredTransactions.filter(function(tx) { return tx.amount < 0; })
                        .map(function(tx) { return tx.counterparty; })
  ).size;

  statsGrid.innerHTML =
    '<div class="stat-item"><div class="stat-label">' + t('stats.median') + '</div><div class="stat-value">' + fmt(median) + '</div><div class="stat-sub">' + t('stats.medianSub') + '</div></div>' +
    '<div class="stat-item"><div class="stat-label">' + t('stats.q1') + '</div><div class="stat-value">' + fmt(q1) + '</div><div class="stat-sub">' + t('stats.q1Sub') + '</div></div>' +
    '<div class="stat-item"><div class="stat-label">' + t('stats.q3') + '</div><div class="stat-value">' + fmt(q3) + '</div><div class="stat-sub">' + t('stats.q3Sub') + '</div></div>' +
    '<div class="stat-item"><div class="stat-label">' + t('stats.iqr') + '</div><div class="stat-value">' + fmt(iqr) + '</div><div class="stat-sub">' + t('stats.iqrSub') + '</div></div>' +
    '<div class="stat-item"><div class="stat-label">' + t('stats.p90') + '</div><div class="stat-value">' + fmt(p90) + '</div><div class="stat-sub">' + t('stats.p90Sub') + '</div></div>' +
    '<div class="stat-item"><div class="stat-label">' + t('stats.std') + '</div><div class="stat-value">' + fmt(std) + '</div><div class="stat-sub">' + t('stats.stdSub') + '</div></div>' +
    '<div class="stat-item"><div class="stat-label">' + t('stats.mode') + '</div><div class="stat-value">' + fmt(mode) + '</div><div class="stat-sub">' + modeCount + '× ' + t('insights.ops') + '</div></div>' +
    '<div class="stat-item"><div class="stat-label">' + t('stats.merchants') + '</div><div class="stat-value">' + distinctMerchants + '</div><div class="stat-sub">' + t('stats.merchantsSub') + '</div></div>' +
    '<div class="stat-item"><div class="stat-label">' + t('stats.count') + '</div><div class="stat-value">' + outs.length + '</div><div class="stat-sub">' + t('stats.countSub') + '</div></div>';
}

/* ============================================================
   INSIGHTS
   ============================================================ */
function renderInsights() {
  const txs = filteredTransactions;
  const list = [];

  if (txs.length === 0) {
    insightsList.innerHTML = '<li>' + t('insights.empty') + '</li>';
    return;
  }

  const catMap = {};
  txs.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
    catMap[tx.category] = (catMap[tx.category] || 0) + Math.abs(tx.amount);
  });
  const topCat = Object.entries(catMap).sort(function(a, b) { return b[1] - a[1]; })[0];
  if (topCat) list.push(t('insights.topCat') + ' : <strong>' + catLabel(topCat[0]) + '</strong> — <strong>' + fmt(topCat[1]) + '</strong>.');

  const monthMap = {};
  txs.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
    const k = monthKey(tx.date);
    monthMap[k] = (monthMap[k] || 0) + Math.abs(tx.amount);
  });
  const topMonth = Object.entries(monthMap).sort(function(a, b) { return b[1] - a[1]; })[0];
  if (topMonth) list.push(t('insights.topMonth') + ' : <strong>' + monthLabel(topMonth[0]) + '</strong> — <strong>' + fmt(topMonth[1]) + '</strong>.');

  const cpMap = {};
  txs.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
    cpMap[tx.counterparty] = (cpMap[tx.counterparty] || 0) + 1;
  });
  const topCp = Object.entries(cpMap).sort(function(a, b) { return b[1] - a[1]; })[0];
  if (topCp && topCp[1] > 1) list.push(t('insights.topCp') + ' : <strong>' + topCp[0] + '</strong> (' + topCp[1] + ' ' + t('insights.ops') + ').');

  const biggest = txs.filter(function(tx) { return tx.amount < 0; })
    .sort(function(a, b) { return Math.abs(b.amount) - Math.abs(a.amount); })[0];
  if (biggest) list.push(t('insights.biggest') + ' : <strong>' + fmt(Math.abs(biggest.amount)) + '</strong> — ' + biggest.label + ' ' + t('insights.on') + ' ' + formatDate(biggest.date) + '.');

  const outsArr = txs.filter(function(tx) { return tx.amount < 0; })
    .map(function(tx) { return Math.abs(tx.amount); })
    .sort(function(a, b) { return a - b; });
  if (outsArr.length) {
    const med = percentile(outsArr, 0.5);
    list.push(t('insights.median') + ' : <strong>' + fmt(med) + '</strong>.');
  }

  const days = new Set(txs.map(function(tx) { return tx.date.toDateString(); })).size;
  const outs = txs.filter(function(tx) { return tx.amount < 0; })
                  .reduce(function(s, tx) { return s + Math.abs(tx.amount); }, 0);
  if (days > 0) list.push(t('insights.dailyAvg') + ' : <strong>' + fmt(outs / days) + '</strong> ' + t('insights.over') + ' ' + days + ' ' + t('insights.day') + '.');

  const ins = txs.filter(function(tx) { return tx.amount > 0; })
                .reduce(function(s, tx) { return s + tx.amount; }, 0);
  if (ins > 0) {
    const rate = ((ins - outs) / ins) * 100;
    list.push(t('insights.savings') + ' : <strong>' + rate.toFixed(1).replace('.', ',') + ' %</strong> (' + fmt(ins - outs) + ').');
  }

  const cpAmt = {};
  txs.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
    cpAmt[tx.counterparty] = (cpAmt[tx.counterparty] || 0) + Math.abs(tx.amount);
  });
  const top3 = Object.entries(cpAmt).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 3);
  const top3Sum = top3.reduce(function(s, entry) { return s + entry[1]; }, 0);
  if (outs > 0 && top3.length > 0) {
    const pct = (top3Sum / outs) * 100;
    list.push(t('insights.concentration') + ' : <strong>' + pct.toFixed(1).replace('.', ',') + ' %</strong> ' + t('insights.ofTopMerchants') + '.');
  }

  const hourMap = new Array(24).fill(0);
  txs.forEach(function(tx) { hourMap[tx.date.getHours()]++; });
  let topHour = { i: 0, v: 0 };
  hourMap.forEach(function(v, i) { if (v > topHour.v) topHour = { i: i, v: v }; });
  if (topHour.v > 0) {
    list.push(t('insights.topHour') + ' : <strong>' + String(topHour.i).padStart(2,'0') + 'h00</strong> (' + topHour.v + ' ' + t('insights.ops') + ').');
  }

  insightsList.innerHTML = list.map(function(i) { return '<li>' + i + '</li>'; }).join('');
}

/* ============================================================
   GRAPHIQUES
   ============================================================ */
const PALETTE = [
  '#ff7900','#e56a00','#ff9a3c','#c45800','#ffb870',
  '#d68c45','#ff8c42','#a0522d','#ffd6a8','#8b5e3c',
  '#f4a261','#e76f51'
];

function destroyChart(key) {
  if (charts[key]) {
    try { charts[key].destroy(); } catch (e) { /* noop */ }
    delete charts[key];
  }
}

function safeChart(key, canvasId, config) {
  destroyChart(key);
  const el = document.getElementById(canvasId);
  if (!el) return;
  try { charts[key] = new Chart(el, config); }
  catch (e) { console.error('Erreur graphique "' + key + '":', e); }
}

function renderCharts() {
  const txs = filteredTransactions;

  /* 1. Doughnut catégories */
  {
    const catMap = {};
    txs.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
      catMap[tx.category] = (catMap[tx.category] || 0) + Math.abs(tx.amount);
    });
    const catKeys = Object.keys(catMap);
    safeChart('cat', 'chartCategories', {
      type: 'doughnut',
      data: {
        labels: catKeys.map(catLabel),
        datasets: [{
          data: catKeys.map(function(k) { return catMap[k]; }),
          backgroundColor: catKeys.map(function(_, i) { return PALETTE[i % PALETTE.length]; }),
          borderColor: '#fff', borderWidth: 3, hoverOffset: 8
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '62%',
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12, padding: 12, font: { size: 11.5 } } },
          tooltip: { callbacks: { label: function(ctx) {
            const total = ctx.dataset.data.reduce(function(a, b) { return a + b; }, 0);
            const pct = total ? ((ctx.parsed / total) * 100).toFixed(1) : 0;
            return ' ' + ctx.label + ' : ' + fmt(ctx.parsed) + ' (' + pct + '%)';
          } } }
        }
      }
    });
  }

  /* 2. Barres Entrées vs Dépenses */
  {
    const mMap = {};
    txs.forEach(function(tx) {
      const k = monthKey(tx.date);
      if (!mMap[k]) mMap[k] = { in: 0, out: 0 };
      if (tx.amount > 0) mMap[k].in += tx.amount;
      else               mMap[k].out += Math.abs(tx.amount);
    });
    const mKeys = Object.keys(mMap).sort();
    safeChart('monthly', 'chartMonthly', {
      type: 'bar',
      data: {
        labels: mKeys.map(monthLabel),
        datasets: [
          { label: t('chart.in'),  data: mKeys.map(function(k) { return mMap[k].in; }),  backgroundColor: '#2e9e5b', borderRadius: 6, maxBarThickness: 34 },
          { label: t('chart.out'), data: mKeys.map(function(k) { return mMap[k].out; }), backgroundColor: '#ff7900', borderRadius: 6, maxBarThickness: 34 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11.5 } } },
          tooltip: { callbacks: { label: function(ctx) { return ' ' + ctx.dataset.label + ' : ' + fmt(ctx.parsed.y); } } }
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: '#f3e9dc' }, ticks: { callback: function(v) { return fmtShort(v); } } }
        }
      }
    });
  }

  /* 3. Solde cumulé */
  {
    safeChart('balance', 'chartBalance', {
      type: 'line',
      data: {
        labels: txs.map(function(tx) { return formatDayShort(tx.date); }),
        datasets: [{
          label: t('chart.balance'),
          data: txs.map(function(tx) { return tx.balance; }),
          borderColor: '#ff7900',
          backgroundColor: 'rgba(255,121,0,0.12)',
          fill: true, tension: 0.25, pointRadius: 2, pointHoverRadius: 5, borderWidth: 2.5
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function(ctx) { return ' ' + t('chart.balance') + ' : ' + fmt(ctx.parsed.y); } } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { autoSkip: true, maxTicksLimit: 10, maxRotation: 0, font: { size: 10.5 } } },
          y: { grid: { color: '#f3e9dc' }, ticks: { callback: function(v) { return fmtShort(v); } } }
        }
      }
    });
  }

  /* 4. Cumulés */
  {
    let cumIn = 0, cumOut = 0;
    const cumInArr = [], cumOutArr = [], labels = [];
    txs.forEach(function(tx) {
      if (tx.amount > 0) cumIn += tx.amount;
      else               cumOut += Math.abs(tx.amount);
      cumInArr.push(cumIn);
      cumOutArr.push(cumOut);
      labels.push(formatDayShort(tx.date));
    });
    safeChart('cumulative', 'chartCumulative', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { label: t('chart.cumOut'), data: cumOutArr, borderColor: '#e14b4b', backgroundColor: 'rgba(225,75,75,0.10)', fill: true, tension: 0.25, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2.5 },
          { label: t('chart.cumIn'),  data: cumInArr,  borderColor: '#2e9e5b', backgroundColor: 'rgba(46,158,91,0.10)', fill: true, tension: 0.25, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2.5 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11.5 } } },
          tooltip: { callbacks: { label: function(ctx) { return ' ' + ctx.dataset.label + ' : ' + fmt(ctx.parsed.y); } } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { autoSkip: true, maxTicksLimit: 10, maxRotation: 0, font: { size: 10.5 } } },
          y: { beginAtZero: true, grid: { color: '#f3e9dc' }, ticks: { callback: function(v) { return fmtShort(v); } } }
        }
      }
    });
  }

  /* 5. Stacked bar catégories par mois */
  {
    const mMap = {};
    txs.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
      const k = monthKey(tx.date);
      if (!mMap[k]) mMap[k] = {};
      mMap[k][tx.category] = (mMap[k][tx.category] || 0) + Math.abs(tx.amount);
    });
    const mKeys = Object.keys(mMap).sort();
    const allCats = Array.from(new Set(txs.filter(function(tx) { return tx.amount < 0; }).map(function(tx) { return tx.category; })));
    const datasets = allCats.map(function(cat, i) {
      return {
        label: catLabel(cat),
        data: mKeys.map(function(k) { return mMap[k][cat] || 0; }),
        backgroundColor: PALETTE[i % PALETTE.length],
        borderRadius: 4, stack: 'stack1', maxBarThickness: 46
      };
    });
    safeChart('catEvolution', 'chartCatEvolution', {
      type: 'bar',
      data: { labels: mKeys.map(monthLabel), datasets: datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, padding: 10, font: { size: 11 } } },
          tooltip: { callbacks: { label: function(ctx) { return ' ' + ctx.dataset.label + ' : ' + fmt(ctx.parsed.y); } } }
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, beginAtZero: true, grid: { color: '#f3e9dc' }, ticks: { callback: function(v) { return fmtShort(v); } } }
        }
      }
    });
  }

  /* 6. Dépenses quotidiennes */
  {
    const outs = txs.filter(function(tx) { return tx.amount < 0; });
    if (outs.length === 0) {
      safeChart('daily', 'chartDaily', { type: 'bar', data: { labels: [], datasets: [] }, options: { responsive: true, maintainAspectRatio: false } });
    } else {
      let minT = Infinity, maxT = -Infinity;
      outs.forEach(function(tx) { const x = tx.date.getTime(); if (x < minT) minT = x; if (x > maxT) maxT = x; });
      const dayMap = {};
      const cur = new Date(minT); cur.setHours(0,0,0,0);
      const end = new Date(maxT); end.setHours(0,0,0,0);
      while (cur <= end) { dayMap[dayKey(cur)] = 0; cur.setDate(cur.getDate() + 1); }
      outs.forEach(function(tx) { const k = dayKey(tx.date); if (dayMap[k] !== undefined) dayMap[k] += Math.abs(tx.amount); });
      const dayKeys = Object.keys(dayMap).sort();
      const labels = dayKeys.map(function(k) { const parts = k.split('-'); return parts[2] + '/' + parts[1]; });
      const values = dayKeys.map(function(k) { return dayMap[k]; });
      const maxV = Math.max.apply(null, values.concat([1]));
      const bg = values.map(function(v) { const a = 0.25 + (v / maxV) * 0.75; return 'rgba(255, 121, 0, ' + a.toFixed(3) + ')'; });
      safeChart('daily', 'chartDaily', {
        type: 'bar',
        data: { labels: labels, datasets: [{ label: t('chart.out'), data: values, backgroundColor: bg, borderColor: '#e56a00', borderWidth: 1, borderRadius: 4, maxBarThickness: 26 }] },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { title: function(items) { return '📅 ' + items[0].label; }, label: function(ctx) { return ' ' + fmt(ctx.parsed.y); } } } },
          scales: { x: { grid: { display: false }, ticks: { autoSkip: true, maxTicksLimit: 20, maxRotation: 0, font: { size: 10 } } }, y: { beginAtZero: true, grid: { color: '#f3e9dc' }, ticks: { callback: function(v) { return fmtShort(v); } } } }
        }
      });
    }
  }

  /* 7. Semaine du mois */
  {
    const outs = txs.filter(function(tx) { return tx.amount < 0; });
    const weeks = [0, 0, 0, 0, 0];
    outs.forEach(function(tx) { const day = tx.date.getDate(); const w = Math.min(Math.floor((day - 1) / 7), 4); weeks[w] += Math.abs(tx.amount); });
    const labels = [t('chart.weekLabel') + ' 1 (01-07)', t('chart.weekLabel') + ' 2 (08-14)', t('chart.weekLabel') + ' 3 (15-21)', t('chart.weekLabel') + ' 4 (22-28)', t('chart.weekLabel') + ' 5 (29-31)'];
    const maxV = Math.max.apply(null, weeks.concat([1]));
    safeChart('weekOfMonth', 'chartWeekOfMonth', {
      type: 'bar',
      data: { labels: labels, datasets: [{ label: t('chart.out'), data: weeks, backgroundColor: weeks.map(function(v) { const a = 0.3 + (v / maxV) * 0.7; return 'rgba(255, 121, 0, ' + a.toFixed(3) + ')'; }), borderColor: '#e56a00', borderWidth: 1, borderRadius: 6, maxBarThickness: 44 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { return ' ' + fmt(ctx.parsed.y); } } } },
        scales: { x: { grid: { display: false }, ticks: { font: { size: 10.5 } } }, y: { beginAtZero: true, grid: { color: '#f3e9dc' }, ticks: { callback: function(v) { return fmtShort(v); } } } }
      }
    });
  }

  /* 8. Répartition horaire */
  {
    const hours = new Array(24).fill(0);
    const hoursAmt = new Array(24).fill(0);
    txs.forEach(function(tx) { const h = tx.date.getHours(); hours[h]++; hoursAmt[h] += Math.abs(tx.amount); });
    const labels = hours.map(function(_, i) { return String(i).padStart(2,'0') + 'h'; });
    const maxV = Math.max.apply(null, hours.concat([1]));
    safeChart('hourly', 'chartHourly', {
      type: 'bar',
      data: { labels: labels, datasets: [{ label: t('kpi.tx'), data: hours, backgroundColor: hours.map(function(v) { const a = 0.25 + (v / maxV) * 0.75; return 'rgba(255, 121, 0, ' + a.toFixed(3) + ')'; }), borderColor: '#e56a00', borderWidth: 1, borderRadius: 4, maxBarThickness: 18 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { const h = ctx.dataIndex; return ' ' + ctx.parsed.y + ' ' + t('insights.ops') + ' — ' + fmt(hoursAmt[h]); } } } },
        scales: { x: { grid: { display: false }, ticks: { font: { size: 10 }, autoSkip: false, maxRotation: 0 } }, y: { beginAtZero: true, grid: { color: '#f3e9dc' }, ticks: { precision: 0 } } }
      }
    });
  }

  /* 9. Distribution des montants */
  {
    const ranges = [
      { min: 0,     max: 500,      label: '< 500 F' },
      { min: 500,   max: 1000,     label: '500 – 1 000 F' },
      { min: 1000,  max: 2500,     label: '1 000 – 2 500 F' },
      { min: 2500,  max: 5000,     label: '2 500 – 5 000 F' },
      { min: 5000,  max: 10000,    label: '5 000 – 10 000 F' },
      { min: 10000, max: 25000,    label: '10 000 – 25 000 F' },
      { min: 25000, max: 50000,    label: '25 000 – 50 000 F' },
      { min: 50000, max: Infinity, label: '≥ 50 000 F' }
    ];
    const counts = ranges.map(function() { return 0; });
    const totals = ranges.map(function() { return 0; });
    txs.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
      const v = Math.abs(tx.amount);
      for (let i = 0; i < ranges.length; i++) {
        if (v >= ranges[i].min && v < ranges[i].max) { counts[i]++; totals[i] += v; break; }
      }
    });
    const labels = ranges.map(function(r) { return r.label; });
    const maxV = Math.max.apply(null, counts.concat([1]));
    safeChart('amountDist', 'chartAmountDist', {
      type: 'bar',
      data: { labels: labels, datasets: [{ label: t('chart.transactions'), data: counts, backgroundColor: counts.map(function(v) { const a = 0.3 + (v / maxV) * 0.7; return 'rgba(255, 121, 0, ' + a.toFixed(3) + ')'; }), borderColor: '#e56a00', borderWidth: 1, borderRadius: 6, maxBarThickness: 40 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { const i = ctx.dataIndex; return ' ' + ctx.parsed.y + ' ' + t('insights.ops') + ' — ' + fmt(totals[i]); } } } },
        scales: { x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 30 } }, y: { beginAtZero: true, grid: { color: '#f3e9dc' }, ticks: { precision: 0 } } }
      }
    });
  }

  /* 10. Top 8 destinataires */
  {
    const cpMap = {};
    txs.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) { cpMap[tx.counterparty] = (cpMap[tx.counterparty] || 0) + Math.abs(tx.amount); });
    const top = Object.entries(cpMap).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 8);
    safeChart('top', 'chartTop', {
      type: 'bar',
      data: { labels: top.map(function(e) { return e[0]; }), datasets: [{ label: t('chart.topSpent'), data: top.map(function(e) { return e[1]; }), backgroundColor: top.map(function(_, i) { return PALETTE[i % PALETTE.length]; }), borderRadius: 6, maxBarThickness: 26 }] },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { return ' ' + fmt(ctx.parsed.x); } } } },
        scales: { x: { beginAtZero: true, grid: { color: '#f3e9dc' }, ticks: { callback: function(v) { return fmtShort(v); } } }, y: { grid: { display: false }, ticks: { font: { size: 11 } } } }
      }
    });
  }

  /* 11. Taux d'épargne mensuel */
  {
    const mMap = {};
    txs.forEach(function(tx) {
      const k = monthKey(tx.date);
      if (!mMap[k]) mMap[k] = { in: 0, out: 0 };
      if (tx.amount > 0) mMap[k].in += tx.amount;
      else               mMap[k].out += Math.abs(tx.amount);
    });
    const mKeys = Object.keys(mMap).sort();
    const rates = mKeys.map(function(k) { const m = mMap[k]; if (m.in <= 0) return null; return ((m.in - m.out) / m.in) * 100; });
    const values = rates.map(function(r) { return r === null ? 0 : r; });
    const colors = rates.map(function(r) { if (r === null) return '#cccccc'; return r >= 0 ? 'rgba(46,158,91,0.75)' : 'rgba(225,75,75,0.75)'; });
    safeChart('monthlyRatio', 'chartMonthlyRatio', {
      type: 'bar',
      data: { labels: mKeys.map(monthLabel), datasets: [{ label: t('chart.savingsRate'), data: values, backgroundColor: colors, borderColor: '#ffffff', borderWidth: 1, borderRadius: 6, maxBarThickness: 40 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { const i = ctx.dataIndex; if (rates[i] === null) return ' — (pas d\'entrées)'; return ' ' + t('chart.savingsRate') + ' : ' + rates[i].toFixed(1).replace('.', ',') + ' %'; } } } },
        scales: { x: { grid: { display: false } }, y: { grid: { color: '#f3e9dc' }, ticks: { callback: function(v) { return v + ' %'; } } } }
      }
    });
  }

  /* 12. Ticket moyen par catégorie */
  {
    const catStats = {};
    txs.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
      if (!catStats[tx.category]) catStats[tx.category] = { total: 0, count: 0 };
      catStats[tx.category].total += Math.abs(tx.amount);
      catStats[tx.category].count++;
    });
    const sorted = Object.entries(catStats).map(function(e) { return [e[0], e[1].total / e[1].count]; }).sort(function(a, b) { return b[1] - a[1]; });
    safeChart('avgTicket', 'chartAvgTicket', {
      type: 'bar',
      data: { labels: sorted.map(function(e) { return catLabel(e[0]); }), datasets: [{ label: t('chart.avgTicket'), data: sorted.map(function(e) { return e[1]; }), backgroundColor: sorted.map(function(_, i) { return PALETTE[i % PALETTE.length]; }), borderRadius: 6, maxBarThickness: 26 }] },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { return ' ' + fmt(ctx.parsed.x); } } } },
        scales: { x: { beginAtZero: true, grid: { color: '#f3e9dc' }, ticks: { callback: function(v) { return fmtShort(v); } } }, y: { grid: { display: false }, ticks: { font: { size: 11 } } } }
      }
    });
  }
}

/* ============================================================
   TOP 5 JOURNÉES
   ============================================================ */
function renderTopDaysTable() {
  const map = {};
  filteredTransactions.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
    const k = dayKey(tx.date);
    if (!map[k]) map[k] = { date: tx.date, total: 0, count: 0 };
    map[k].total += Math.abs(tx.amount);
    map[k].count++;
  });
  const rows = Object.keys(map).map(function(k) { return map[k]; }).sort(function(a, b) { return b.total - a.total; }).slice(0, 5);
  if (rows.length === 0) { topDaysBody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#8a7a6b;padding:18px">—</td></tr>'; return; }
  topDaysBody.innerHTML = rows.map(function(r, i) {
    const avg = r.count ? r.total / r.count : 0;
    return '<tr><td class="num" style="font-weight:800;color:#c45800">' + (i+1) + '</td><td style="white-space:nowrap"><strong>' + formatDayLong(r.date) + '</strong></td><td class="num">' + r.count + '</td><td class="num amt-out">' + fmt(r.total) + '</td><td class="num">' + fmt(avg) + '</td></tr>';
  }).join('');
}

/* ============================================================
   TABLEAU MENSUEL
   ============================================================ */
function renderMonthlyTable() {
  const map = {};
  filteredTransactions.forEach(function(tx) {
    const k = monthKey(tx.date);
    if (!map[k]) map[k] = { in: 0, out: 0, count: 0, outCount: 0 };
    if (tx.amount > 0) map[k].in += tx.amount;
    else { map[k].out += Math.abs(tx.amount); map[k].outCount++; }
    map[k].count++;
  });
  const keys = Object.keys(map).sort().reverse();
  if (keys.length === 0) { monthlyTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#8a7a6b;padding:18px">—</td></tr>'; return; }
  monthlyTableBody.innerHTML = keys.map(function(k) {
    const m = map[k];
    const net = m.in - m.out;
    const avg = m.outCount ? m.out / m.outCount : 0;
    return '<tr><td><strong>' + monthLabel(k) + '</strong></td><td class="num amt-in">' + fmt(m.in) + '</td><td class="num amt-out">' + fmt(m.out) + '</td><td class="num ' + (net >= 0 ? 'amt-in' : 'amt-out') + '">' + fmt(net) + '</td><td class="num">' + m.count + '</td><td class="num">' + fmt(avg) + '</td></tr>';
  }).join('');
}

/* ============================================================
   TOP 10 DÉPENSES
   ============================================================ */
function renderTop10Table() {
  const top = filteredTransactions.filter(function(tx) { return tx.amount < 0; }).sort(function(a, b) { return Math.abs(b.amount) - Math.abs(a.amount); }).slice(0, 10);
  if (top.length === 0) { top10Body.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#8a7a6b;padding:18px">—</td></tr>'; return; }
  top10Body.innerHTML = top.map(function(tx, i) {
    return '<tr><td class="num" style="font-weight:800;color:#c45800">' + (i+1) + '</td><td style="white-space:nowrap">' + formatDate(tx.date) + '</td><td>' + tx.label + '</td><td><span class="cat-tag">' + catLabel(tx.category) + '</span></td><td class="num amt-out">' + fmt(Math.abs(tx.amount)) + '</td></tr>';
  }).join('');
}

/* ============================================================
   PAIEMENTS RÉCURRENTS
   ============================================================ */
function renderRecurringTable() {
  const map = {};
  filteredTransactions.filter(function(tx) { return tx.amount < 0; }).forEach(function(tx) {
    if (!map[tx.counterparty]) map[tx.counterparty] = { name: tx.counterparty, amounts: [] };
    map[tx.counterparty].amounts.push(Math.abs(tx.amount));
  });
  const recurring = Object.keys(map).map(function(k) { return map[k]; }).filter(function(r) { return r.amounts.length >= 3; }).map(function(r) {
    const total = r.amounts.reduce(function(a, b) { return a + b; }, 0);
    return { name: r.name, count: r.amounts.length, avg: total / r.amounts.length, total: total };
  }).sort(function(a, b) { return b.count - a.count; }).slice(0, 15);
  if (recurring.length === 0) { recurringBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#8a7a6b;padding:18px">' + t('recurring.empty') + '</td></tr>'; return; }
  recurringBody.innerHTML = recurring.map(function(r) {
    return '<tr><td><strong>' + r.name + '</strong></td><td class="num">' + r.count + '</td><td class="num">' + fmt(r.avg) + '</td><td class="num amt-out">' + fmt(r.total) + '</td></tr>';
  }).join('');
}

/* ============================================================
   TABLEAU TRANSACTIONS
   ============================================================ */
function renderTransactionsTable() {
  const txs = filteredTransactions.slice().reverse();
  txCount.textContent = txs.length;
  if (txs.length === 0) { txBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#8a7a6b;padding:18px">—</td></tr>'; return; }
  txBody.innerHTML = txs.map(function(tx) {
    return '<tr><td style="white-space:nowrap">' + formatDate(tx.date) + '</td><td>' + tx.label + '</td><td><span class="cat-tag">' + catLabel(tx.category) + '</span></td><td class="num ' + (tx.amount >= 0 ? 'amt-in' : 'amt-out') + '">' + fmt(tx.amount) + '</td></tr>';
  }).join('');
}

/* ============================================================
   EXPORT CSV
   ============================================================ */
function exportToCsv() {
  const txs = filteredTransactions;
  if (txs.length === 0) { showError(t('status.noExport')); return; }
  const header = ['Date','Heure','Libellé','Catégorie','Contrepartie','Type','Montant (F)'];
  const rows = txs.map(function(tx) {
    return [tx.dateStr, tx.timeStr, tx.label, catLabel(tx.category), tx.counterparty, tx.amount >= 0 ? 'Entrée' : 'Dépense', tx.amount];
  });
  const csv = [header].concat(rows).map(function(r) {
    return r.map(function(v) { return '"' + String(v).replace(/"/g,'""') + '"'; }).join(';');
  }).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'orange-money-analyse-' + new Date().toISOString().slice(0,10) + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================================================
   RESET
   ============================================================ */
function resetAll() {
  allTransactions = [];
  filteredTransactions = [];
  Object.keys(charts).forEach(destroyChart);
  dashboard.classList.add('hidden');
  resetBtn.classList.add('hidden');
  fileInput.value = '';
  searchInput.value = '';
  filterType.value = 'all';
  setStatus('');
  errorBox.classList.add('hidden');
}

/* ============================================================
   ÉVÉNEMENTS
   ============================================================ */
fileInput.addEventListener('change', function(e) {
  const f = e.target.files && e.target.files[0];
  if (f) handleFile(f);
});
['dragenter','dragover'].forEach(function(ev) {
  dropzone.addEventListener(ev, function(e) { e.preventDefault(); dropzone.classList.add('dragover'); });
});
['dragleave','drop'].forEach(function(ev) {
  dropzone.addEventListener(ev, function(e) { e.preventDefault(); dropzone.classList.remove('dragover'); });
});
dropzone.addEventListener('drop', function(e) {
  const f = e.dataTransfer.files && e.dataTransfer.files[0];
  if (f) handleFile(f);
});
[searchInput, filterCategory, filterType, filterMonth].forEach(function(el) {
  el.addEventListener('input', applyFilters);
  el.addEventListener('change', applyFilters);
});
clearFilters.addEventListener('click', function() {
  searchInput.value = '';
  filterCategory.value = 'all';
  filterType.value = 'all';
  filterMonth.value = 'all';
  applyFilters();
});
loadDemoBtn.addEventListener('click', function() {
  allTransactions = parseTransactions(DEMO_TEXT);
  onDataLoaded();
  setStatus(t('status.demo').replace('{n}', allTransactions.length));
  setTimeout(function() { setStatus(''); }, 3000);
});
resetBtn.addEventListener('click', resetAll);
exportCsv.addEventListener('click', exportToCsv);
refreshBtn.addEventListener('click', function() { window.location.reload(); });
langButtons.forEach(function(btn) {
  btn.addEventListener('click', function() { applyLanguage(btn.dataset.lang); });
});
pageNavBtns.forEach(function(btn) {
  btn.addEventListener('click', function() { showPage(btn.dataset.page); });
});

/* ============================================================
   INITIALISATION
   ============================================================ */
applyLanguage('fr');
renderCountries();
updateDateTime();
setInterval(updateDateTime, 1000);

/* ============================================================
   DONNÉES DE DÉMONSTRATION — 100 % FICTIVES
   Ces données sont entièrement inventées et ne correspondent à
   aucune personne, entreprise ou transaction réelle.
   Les identifiants (000000000) sont volontairement neutres et
   servent uniquement à illustrer le fonctionnement du site.
   ============================================================ */
const DEMO_TEXT = `
Achat pass FibreMax 05/03/2026 à 14:22- 3 200 F
Transfert d'argent 000000000 05/03/2026 à 10:15- 8 500 F
Virement vers OM 05/03/2026 à 09:48+ 12 400 F
Transfert d'argent 000000000 04/03/2026 à 18:30- 2 000 F
Transfert d'argent 000000000 04/03/2026 à 16:45- 1 800 F
Paiement marchand 000000000 04/03/2026 à 11:20- 2 100 F
Transfert d'argent 000000000 04/03/2026 à 07:10- 12 000 F
Virement vers OM 04/03/2026 à 07:05+ 11 800 F
Paiement marchand 000000000 03/03/2026 à 15:40- 1 500 F
Paiement marchand 000000000 03/03/2026 à 13:10- 8 900 F
Paiement marchand 000000000 03/03/2026 à 12:30- 750 F
Paiement marchand 000000000 03/03/2026 à 10:05- 22 000 F
Transfert d'argent 000000000 03/03/2026 à 06:50- 1 500 F
Virement vers OM 03/03/2026 à 06:15+ 26 500 F
Paiement marchand 000000000 02/03/2026 à 12:10- 1 800 F
Transfert d'argent 000000000 01/03/2026 à 20:15- 2 200 F
Paiement marchand 000000000 01/03/2026 à 19:50- 1 900 F
Transfert d'argent 000000000 01/03/2026 à 19:30- 20 000 F
Virement vers OM 01/03/2026 à 18:00+ 26 500 F
Transfert d'argent 000000000 01/03/2026 à 14:20- 9 000 F
Transfert d'argent 000000000 01/03/2026 à 11:45- 4 000 F
Paiement marchand 000000000 01/03/2026 à 11:30- 11 500 F
Virement vers OM 01/03/2026 à 10:00+ 26 500 F
Paiement marchand 000000000 28/02/2026 à 10:15- 1 800 F
Achat pass FibreMax 27/02/2026 à 16:30- 3 200 F
Retrait 27/02/2026 à 10:20- 1 500 F
Transfert d'argent 000000000 27/02/2026 à 09:15- 2 500 F
Paiement marchand 000000000 27/02/2026 à 09:00- 13 000 F
Virement vers OM 27/02/2026 à 08:45+ 19 200 F
Transfert d'argent 000000000 26/02/2026 à 19:30- 11 000 F
Transfert d'argent 000000000 26/02/2026 à 12:30- 5 500 F
Virement vers OM 26/02/2026 à 12:15+ 19 200 F
Paiement marchand 000000000 26/02/2026 à 08:00- 7 200 F
Paiement marchand 000000000 25/02/2026 à 21:30- 3 000 F
Paiement marchand 000000000 25/02/2026 à 21:15- 3 000 F
Virement vers OM 25/02/2026 à 21:00+ 13 500 F
Retrait 25/02/2026 à 11:00- 2 500 F
Retrait 25/02/2026 à 10:45- 1 500 F
Paiement marchand 000000000 25/02/2026 à 09:00- 11 000 F
Virement vers OM 25/02/2026 à 08:30+ 11 800 F
Paiement Facture 000000000 24/02/2026 à 20:15- 16 500 F
Paiement Woyofal 000000000 24/02/2026 à 20:00- 5 200 F
Paiement marchand 000000000 24/02/2026 à 12:00- 2 500 F
Virement vers OM 24/02/2026 à 10:15+ 26 500 F
Paiement marchand 000000000 24/02/2026 à 09:00- 6 800 F
Transfert d'argent 000000000 23/02/2026 à 18:45- 2 200 F
Transfert d'argent 000000000 23/02/2026 à 17:30- 13 000 F
Virement vers OM 23/02/2026 à 17:15+ 13 500 F
Paiement marchand 000000000 23/02/2026 à 13:00- 6 000 F
Transfert d'argent 000000000 23/02/2026 à 11:15- 2 500 F
Paiement marchand 000000000 23/02/2026 à 11:00- 11 000 F
Transfert d'argent 000000000 23/02/2026 à 10:30- 2 500 F
Virement vers OM 23/02/2026 à 09:00+ 26 500 F
Transfert d'argent 000000000 22/02/2026 à 21:00- 16 000 F
Virement vers OM 22/02/2026 à 20:45+ 18 500 F
Achat pass FibreMax 22/02/2026 à 20:00- 1 800 F
Paiement marchand 000000000 21/02/2026 à 05:30- 5 500 F
Virement vers OM 20/02/2026 à 14:15+ 9 200 F
Dépôt 20/02/2026 à 14:00+ 72 000 F
Virement vers OM 19/02/2026 à 14:30+ 74 000 F
Paiement marchand 000000000 19/02/2026 à 08:00- 52 000 F
Paiement marchand 000000000 17/02/2026 à 08:30- 26 500 F
Virement vers OM 17/02/2026 à 08:15+ 26 500 F
Paiement marchand 000000000 15/02/2026 à 09:30- 16 200 F
Virement vers OM 15/02/2026 à 09:15+ 16 200 F
Achat pass FibreMax 12/02/2026 à 20:30- 1 800 F
Dépôt 12/02/2026 à 20:15+ 1 800 F
Dépôt 12/02/2026 à 20:15+ 1 800 F
Paiement marchand 000000000 12/02/2026 à 09:00- 27 000 F
Transfert international 11/02/2026 à 18:00+ 27 000 F
Paiement marchand 000000000 10/02/2026 à 11:00- 8 500 F
Virement vers OM 10/02/2026 à 10:15+ 9 200 F
Paiement marchand 000000000 09/02/2026 à 09:15- 11 000 F
Virement vers OM 09/02/2026 à 09:00+ 11 800 F
Paiement marchand 000000000 08/02/2026 à 13:30- 7 200 F
Transfert d'argent 000000000 08/02/2026 à 12:15- 125 000 F
Transfert d'argent 000000000 08/02/2026 à 12:10- 250 F
Virement vers OM 08/02/2026 à 11:00+ 103 000 F
Paiement marchand 000000000 06/02/2026 à 20:00- 12 800 F
Retrait 06/02/2026 à 10:00- 4 200 F
Virement vers OM 06/02/2026 à 08:30+ 16 200 F
Paiement marchand 000000000 05/02/2026 à 18:30- 1 200 F
Paiement marchand 000000000 05/02/2026 à 14:15- 215 000 F
Virement vers OM 15/01/2026 à 15:00+ 32 000 F
Paiement marchand 000000000 15/01/2026 à 11:30- 650 F
Paiement marchand 000000000 15/01/2026 à 11:15- 2 100 F
Transfert d'argent 000000000 15/01/2026 à 10:30- 1 500 F
Paiement marchand 000000000 14/01/2026 à 11:30- 700 F
Transfert d'argent 000000000 14/01/2026 à 10:00- 2 500 F
Paiement marchand 000000000 13/01/2026 à 11:15- 4 500 F
Paiement marchand 000000000 13/01/2026 à 11:00- 650 F
Retrait 13/01/2026 à 10:45- 31 000 F
Virement vers OM 12/01/2026 à 18:00+ 52 000 F
Paiement marchand 000000000 12/01/2026 à 17:45- 16 500 F
Achat pass FibreMax 12/01/2026 à 04:00- 3 200 F
Dépôt 11/01/2026 à 16:30+ 3 500 F
Paiement marchand 000000000 11/01/2026 à 10:00- 9 800 F
Virement vers OM 10/01/2026 à 21:00+ 48 000 F
Paiement marchand 000000000 10/01/2026 à 11:15- 750 F
Retrait 09/01/2026 à 09:30- 27 000 F
Paiement marchand 000000000 08/01/2026 à 10:00- 750 F
Paiement marchand 000000000 08/01/2026 à 09:45- 10 500 F
Virement vers OM 07/01/2026 à 13:00+ 48 000 F
Retrait 05/01/2026 à 09:15- 1 500 F
Achat pass FibreMax 04/01/2026 à 19:30- 3 200 F
Paiement marchand 000000000 04/01/2026 à 11:00- 750 F
Paiement marchand 000000000 02/01/2026 à 09:30- 700 F
Paiement marchand 000000000 02/01/2026 à 09:15- 31 000 F
Paiement marchand 000000000 01/01/2026 à 11:30- 750 F
Retrait 01/01/2026 à 11:15- 1 500 F
Paiement marchand 000000000 31/12/2025 à 12:30- 3 800 F
Paiement marchand 000000000 31/12/2025 à 12:15- 700 F
Paiement Woyofal 000000000 30/12/2025 à 14:30- 4 800 F
Paiement marchand 000000000 30/12/2025 à 12:00- 750 F
Paiement marchand 000000000 30/12/2025 à 11:45- 7 200 F
Paiement Facture 000000000 29/12/2025 à 18:30- 15 500 F
Retrait 29/12/2025 à 10:30- 1 500 F
Paiement marchand 000000000 29/12/2025 à 10:15- 750 F
Retrait 29/12/2025 à 09:45- 55 000 F
Transfert d'argent 000000000 28/12/2025 à 11:30- 1 500 F
Paiement marchand 000000000 28/12/2025 à 11:15- 750 F
Paiement marchand 000000000 28/12/2025 à 11:00- 5 800 F
Achat pass FibreMax 27/12/2025 à 18:00- 3 200 F
Paiement marchand 000000000 27/12/2025 à 12:15- 8 000 F
Retrait 27/12/2025 à 10:30- 1 500 F
Paiement marchand 000000000 26/12/2025 à 18:30- 15 000 F
Paiement marchand 000000000 26/12/2025 à 10:00- 2 500 F
Paiement marchand 000000000 26/12/2025 à 09:45- 2 800 F
Paiement marchand 000000000 25/12/2025 à 11:30- 800 F
Retrait 25/12/2025 à 09:45- 1 500 F
Retrait 23/12/2025 à 12:00- 1 500 F
Achat pass FibreMax 21/12/2025 à 14:00- 3 200 F
Paiement marchand 000000000 21/12/2025 à 11:30- 1 200 F
Retrait 21/12/2025 à 10:00- 110 000 F
Virement vers OM 20/12/2025 à 20:30+ 108 000 F
Retrait 17/12/2025 à 10:00- 1 500 F
Achat pass FibreMax 14/12/2025 à 16:00- 3 200 F
Paiement marchand 000000000 14/12/2025 à 15:00- 55 000 F
Virement vers OM 14/12/2025 à 14:45+ 52 000 F
Achat pass FibreMax 10/12/2025 à 08:00- 2 000 F
Paiement marchand 000000000 09/12/2025 à 22:30- 18 000 F
Virement vers OM 09/12/2025 à 22:15+ 32 000 F
`;

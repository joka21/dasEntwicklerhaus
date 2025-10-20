import { LearningPhaseData } from '@/types/ai-literacy'

export const learningPhases: LearningPhaseData[] = [
  // Phase 1: Bewusstsein schaffen
  {
    title: 'Bewusstsein schaffen',
    introduction:
      'KI ist überall. In deinem Handy. Auf Netflix. Im Spam-Filter. Nur merkst du es meist nicht. Diese Phase zeigt dir, was KI wirklich ist. Keine Buzzwords. Keine Angstmache. Sondern: Was kann sie? Was nicht? Und wo steckt sie schon drin?',
    learningGoals: [
      'Verstehen, was Künstliche Intelligenz ist und was sie nicht ist',
      'KI-Systeme im Alltag erkennen und einordnen können',
      'Unterschied zwischen schwacher und starker KI verstehen',
      'Realistische Erwartungen an KI-Technologien entwickeln',
      'Chancen und Risiken von KI kritisch bewerten können',
    ],
    interactiveTasks: [
      {
        title: 'Wo begegnet dir KI im Alltag?',
        description:
          'Überlege dir drei konkrete Situationen aus deinem Alltag, in denen du bereits (bewusst oder unbewusst) mit KI-Systemen interagierst.',
        prompt: 'Beschreibe die Situationen und erkläre, warum es sich dabei um KI handelt.',
        feedback:
          'Großartig! KI steckt in viel mehr Anwendungen als wir denken: Sprachassistenten, Empfehlungssysteme bei Netflix oder Amazon, Rechtschreibkorrektur, Gesichtserkennung im Smartphone, Navigation und viele mehr. Das Bewusstsein dafür zu schärfen ist der erste Schritt.',
        sampleAnswer:
          'Beispiel: Mein Smartphone schlägt mir beim Tippen Wörter vor (Predictive Text). Netflix empfiehlt mir Serien basierend auf meinem Sehverhalten. Mein E-Mail-Programm filtert Spam automatisch heraus.',
      },
      {
        title: 'KI vs. Mensch: Was kann KI besser?',
        description:
          'Denke über die Stärken und Schwächen von KI nach. In welchen Bereichen ist KI dem Menschen überlegen? Wo hat der Mensch klare Vorteile?',
        prompt: 'Liste jeweils 3 Bereiche auf, in denen KI besser ist und 3, in denen Menschen besser sind.',
        feedback:
          'Sehr gut reflektiert! KI ist hervorragend bei: großen Datenmengen analysieren, Muster erkennen, repetitive Aufgaben. Menschen sind besser bei: Kreativität, Empathie, ethischen Entscheidungen, Kontextverständnis, komplexer Kommunikation.',
        sampleAnswer:
          'KI besser: Große Datenmengen analysieren, Schachspielen, Bilderkennung. Menschen besser: Kreative Problemlösung, emotionale Intelligenz, ethische Abwägungen.',
      },
    ],
    practiceExamples: [
      {
        icon: '🏥',
        title: 'Medizinische Diagnostik',
        category: 'Gesundheitswesen',
        situation:
          'Radiologen müssen täglich hunderte Röntgenbilder auf Anomalien untersuchen – eine zeitaufwändige und ermüdende Aufgabe, bei der Details übersehen werden können.',
        solution:
          'KI-Systeme analysieren Röntgen-, CT- und MRT-Bilder und markieren verdächtige Bereiche. Der Arzt prüft diese Vorschläge und trifft die finale Diagnose. Die KI dient als "zweite Meinung".',
        benefits: [
          'Frühere Erkennung von Tumoren und Krankheiten',
          'Entlastung der Ärzte bei Routineaufgaben',
          'Weniger übersehene Details',
          'Schnellere Diagnosen möglich',
        ],
      },
      {
        icon: '🚗',
        title: 'Autonomes Fahren',
        category: 'Mobilität',
        situation:
          'Verkehrsunfälle sind häufig auf menschliches Versagen zurückzuführen: Müdigkeit, Ablenkung, langsame Reaktionszeit.',
        solution:
          'Selbstfahrende Autos nutzen KI, um die Umgebung in Echtzeit zu erfassen, Hindernisse zu erkennen und vorausschauend zu fahren. Sensoren und Kameras liefern kontinuierlich Daten.',
        benefits: [
          'Potenziell weniger Unfälle durch präzisere Reaktionen',
          'Mehr Mobilität für Menschen ohne Führerschein',
          'Optimierter Verkehrsfluss und weniger Staus',
          'Zeit im Auto kann produktiv genutzt werden',
        ],
      },
      {
        icon: '🌾',
        title: 'Präzisionslandwirtschaft',
        category: 'Landwirtschaft',
        situation:
          'Landwirte müssen große Flächen bewirtschaften und dabei Dünger und Pestizide effizient einsetzen, um Kosten zu sparen und die Umwelt zu schonen.',
        solution:
          'KI-gestützte Drohnen und Sensoren analysieren den Zustand von Pflanzen, Bodenfeuchtigkeit und Schädlingsbefall. Die Systeme empfehlen präzise, wo wie viel Dünger oder Wasser benötigt wird.',
        benefits: [
          'Reduzierung von Düngemittel und Pestiziden',
          'Höhere Ernteerträge durch optimale Pflege',
          'Umweltschonung durch gezielten Einsatz',
          'Kostenersparnis für Landwirte',
        ],
      },
    ],
    quizQuestions: [
      {
        question: 'Was ist der Hauptunterschied zwischen schwacher und starker KI?',
        options: [
          'Schwache KI ist langsamer als starke KI',
          'Schwache KI löst spezifische Aufgaben, starke KI hätte menschenähnliche Intelligenz',
          'Schwache KI arbeitet ohne Internet, starke KI benötigt es',
          'Schwache KI ist günstiger in der Entwicklung',
        ],
        correctAnswer: 1,
        explanation:
          'Schwache (oder enge) KI ist auf spezifische Aufgaben spezialisiert (z.B. Bilderkennung). Starke KI würde generelle, menschenähnliche Intelligenz besitzen – existiert aber noch nicht.',
      },
      {
        question: 'Welche Aussage über heutige KI-Systeme ist korrekt?',
        options: [
          'KI kann eigenständig denken und fühlen',
          'KI lernt aus Daten und Mustern, hat aber kein Bewusstsein',
          'KI ist in allen Bereichen dem Menschen überlegen',
          'KI braucht keine menschliche Überwachung mehr',
        ],
        correctAnswer: 1,
        explanation:
          'Heutige KI-Systeme sind sehr leistungsfähig im Mustererkennen und Lernen aus Daten, haben aber kein Bewusstsein, keine Emotionen und keine eigenständige Intelligenz.',
      },
      {
        question: 'Warum ist es wichtig, sich mit KI zu beschäftigen?',
        options: [
          'Nur für IT-Experten relevant',
          'KI wird bald alle Jobs ersetzen',
          'KI beeinflusst zunehmend unseren Alltag und Beruf',
          'Es ist nur ein vorübergehender Trend',
        ],
        correctAnswer: 2,
        explanation:
          'KI hat bereits großen Einfluss auf unseren Alltag und wird in vielen Berufsfeldern wichtiger. Ein grundlegendes Verständnis hilft, KI sinnvoll zu nutzen und kritisch zu hinterfragen.',
      },
    ],
  },

  // Phase 2: Grundlagen verstehen
  {
    title: 'Grundlagen verstehen',
    introduction:
      'Wie lernt so eine KI eigentlich? Warum braucht sie Daten? Und was sind neuronale Netze? Keine Sorge – du musst kein Programmierer sein. Es geht nur darum, das Prinzip zu verstehen. Damit du weißt, warum KI manchmal brillant ist. Und manchmal daneben liegt.',
    learningGoals: [
      'Grundprinzipien von Machine Learning verstehen',
      'Unterschied zwischen überwachtem und unüberwachtem Lernen kennen',
      'Bedeutung von Trainingsdaten für KI-Qualität erkennen',
      'Begriffe wie neuronale Netze, Deep Learning und Algorithmen einordnen',
      'Typische KI-Fehlerquellen und Bias verstehen',
    ],
    interactiveTasks: [
      {
        title: 'Wie lernt eine KI?',
        description:
          'Stell dir vor, du sollst einer KI beibringen, Katzen von Hunden zu unterscheiden. Beschreibe in eigenen Worten, wie dieser Lernprozess funktionieren könnte.',
        prompt: 'Erkläre den Prozess Schritt für Schritt – ohne Fachbegriffe.',
        feedback:
          'Perfekt! Eine KI lernt durch Beispiele: Man zeigt ihr tausende Bilder von Katzen und Hunden (mit Beschriftung), die KI erkennt Muster (Ohrenform, Größe, etc.) und kann dann neue Bilder einordnen. Je mehr gute Beispiele, desto besser das Ergebnis.',
        sampleAnswer:
          'Ich würde der KI viele Bilder von Katzen und Hunden zeigen und ihr sagen, welches Tier auf jedem Bild ist. Die KI merkt sich Merkmale wie Ohren, Schnauze, Größe. Nach vielen Beispielen kann sie neue Bilder selbst zuordnen.',
      },
      {
        title: 'Warum sind Daten so wichtig?',
        description:
          'Trainingsdaten sind die Grundlage jeder KI. Was passiert, wenn die Daten unvollständig, fehlerhaft oder einseitig sind?',
        prompt: 'Beschreibe ein konkretes Beispiel, wo schlechte Daten zu Problemen führen könnten.',
        feedback:
          'Genau richtig! Schlechte oder einseitige Daten führen zu verzerrten Ergebnissen (Bias). Beispiel: Eine Bewerbungs-KI, die nur auf Männer trainiert wurde, diskriminiert Frauen. Datenqualität ist entscheidend!',
        sampleAnswer:
          'Wenn eine KI für Hautkrebs-Erkennung nur mit Bildern von heller Haut trainiert wurde, kann sie bei dunkler Haut versagen. Die Daten müssen vielfältig und repräsentativ sein.',
      },
    ],
    practiceExamples: [
      {
        icon: '📧',
        title: 'Spam-Filter im E-Mail-Programm',
        category: 'Kommunikation',
        situation:
          'Täglich erhalten wir dutzende unerwünschte E-Mails (Spam), die unseren Posteingang verstopfen und Zeit kosten.',
        solution:
          'E-Mail-Programme nutzen Machine Learning, um Spam zu erkennen. Die KI wird mit tausenden Beispielen von Spam und echten E-Mails trainiert und lernt typische Merkmale: verdächtige Absender, bestimmte Wörter, Links, Formatierungen.',
        benefits: [
          'Automatische Filterung von 99% des Spams',
          'Zeitersparnis und weniger Ablenkung',
          'Schutz vor Phishing und Betrugsversuchen',
          'Filter lernt kontinuierlich dazu',
        ],
      },
      {
        icon: '🎵',
        title: 'Musik-Empfehlungen bei Spotify',
        category: 'Entertainment',
        situation:
          'Bei Millionen verfügbarer Songs ist es schwer, neue Musik zu entdecken, die dem eigenen Geschmack entspricht.',
        solution:
          'Spotify nutzt KI-Algorithmen, die dein Hörverhalten analysieren: Welche Genres, Künstler, Stimmungen bevorzugst du? Die KI vergleicht dich mit ähnlichen Nutzern und empfiehlt Songs, die diese ebenfalls mögen (Collaborative Filtering).',
        benefits: [
          'Personalisierte Musikentdeckung ohne Aufwand',
          'Entdeckung von Künstlern, die man sonst nie gefunden hätte',
          'Playlists passen sich dem Kontext an (Sport, Entspannung, etc.)',
          'Ständig neue, passende Empfehlungen',
        ],
      },
      {
        icon: '💬',
        title: 'Chatbots im Kundenservice',
        category: 'Kundenservice',
        situation:
          'Unternehmen erhalten tausende Kundenanfragen täglich – viele davon sind Standardfragen, die schnell beantwortet werden könnten.',
        solution:
          'KI-gestützte Chatbots verstehen natürliche Sprache (Natural Language Processing) und können häufige Fragen sofort beantworten: Öffnungszeiten, Tracking-Infos, Rücksendungen. Bei komplexen Fragen leiten sie an Menschen weiter.',
        benefits: [
          '24/7 Verfügbarkeit ohne Wartezeiten',
          'Sofortige Antworten auf Standardfragen',
          'Entlastung des menschlichen Supports für komplexe Fälle',
          'Kosteneffizienter Service',
        ],
      },
    ],
    quizQuestions: [
      {
        question: 'Was ist "überwachtes Lernen" (Supervised Learning)?',
        options: [
          'KI wird von Menschen ständig kontrolliert',
          'KI lernt aus Daten mit bekannten, richtigen Antworten',
          'KI arbeitet nur unter Aufsicht',
          'KI überwacht andere Systeme',
        ],
        correctAnswer: 1,
        explanation:
          'Beim überwachten Lernen trainiert die KI mit Daten, die bereits beschriftet sind (z.B. Bilder mit "Katze" oder "Hund"). Sie lernt, die richtigen Zuordnungen selbst zu treffen.',
      },
      {
        question: 'Was passiert, wenn Trainingsdaten einseitig sind?',
        options: [
          'Die KI lernt schneller',
          'Die KI entwickelt Vorurteile (Bias) und liefert unfaire Ergebnisse',
          'Die KI funktioniert besser',
          'Es hat keine Auswirkung',
        ],
        correctAnswer: 1,
        explanation:
          'Einseitige Trainingsdaten führen zu Bias: Die KI übernimmt Verzerrungen und kann diskriminierende Entscheidungen treffen. Vielfältige, repräsentative Daten sind essentiell.',
      },
      {
        question: 'Was ist ein neuronales Netz?',
        options: [
          'Ein physisches Netzwerk von Computern',
          'Ein mathematisches Modell, das dem menschlichen Gehirn nachempfunden ist',
          'Ein soziales Netzwerk für KI-Entwickler',
          'Eine neue Art von Internet',
        ],
        correctAnswer: 1,
        explanation:
          'Neuronale Netze sind mathematische Modelle mit künstlichen "Neuronen", die in Schichten organisiert sind. Sie ahmen grob nach, wie das menschliche Gehirn Informationen verarbeitet.',
      },
    ],
  },

  // Phase 3: Anwendung im Arbeitsalltag
  {
    title: 'Anwendung im Arbeitsalltag',
    introduction:
      'Jetzt wird es konkret. Wie nutzt du KI im Job? Egal ob Marketing, Verwaltung oder kreative Arbeit – es gibt Tools, die dir Zeit sparen. Diese Phase zeigt dir, welche. Und wie du sie richtig einsetzt. Damit KI dein Assistent wird. Nicht dein Ersatz.',
    learningGoals: [
      'KI-Tools für verschiedene Arbeitsbereiche kennenlernen',
      'Effektive Prompts für KI-Assistenten schreiben',
      'KI zur Automatisierung von Routineaufgaben nutzen',
      'Kreativität durch KI-Unterstützung steigern',
      'Grenzen und Fallstricke im praktischen Einsatz erkennen',
    ],
    interactiveTasks: [
      {
        title: 'Dein erster KI-Prompt',
        description:
          'Prompts sind Anweisungen an KI-Systeme wie ChatGPT. Formuliere einen Prompt für eine konkrete Aufgabe aus deinem Arbeitsalltag.',
        prompt:
          'Schreibe einen Prompt, der klar, spezifisch und hilfreich ist. Beispiel: "Fasse die wichtigsten Punkte dieser E-Mail zusammen und schlage eine professionelle Antwort vor."',
        feedback:
          'Super! Gute Prompts sind konkret, enthalten Kontext und beschreiben das gewünschte Format. Je klarer deine Anweisung, desto besser das Ergebnis. Experimentiere und verfeinere deine Prompts!',
        sampleAnswer:
          'Erstelle eine Tagesordnung für ein 1-stündiges Teammeeting zum Thema "Produktlaunch Q2". Beginne mit einer kurzen Begrüßung, plane 15 Minuten für jeden Hauptpunkt und reserviere 10 Minuten für offene Fragen.',
      },
      {
        title: 'Welche Aufgaben kann KI für dich übernehmen?',
        description:
          'Überlege, welche wiederkehrenden oder zeitaufwändigen Aufgaben in deinem Job durch KI unterstützt werden könnten.',
        prompt:
          'Liste 3 konkrete Aufgaben auf und beschreibe, wie KI dabei helfen könnte.',
        feedback:
          'Ausgezeichnet! KI kann besonders bei repetitiven, datenintensiven oder kreativen Aufgaben unterstützen: Texte zusammenfassen, Daten analysieren, Ideen generieren, Code schreiben, Übersetzungen, Design-Entwürfe und vieles mehr.',
        sampleAnswer:
          '1. Meeting-Protokolle schreiben: KI kann Aufnahmen transkribieren und strukturieren. 2. Social-Media-Posts erstellen: KI generiert Textvarianten und Bildideen. 3. Datenanalyse: KI erkennt Trends in Verkaufszahlen.',
      },
    ],
    practiceExamples: [
      {
        icon: '✍️',
        title: 'Content-Erstellung im Marketing',
        category: 'Marketing',
        situation:
          'Marketing-Teams müssen ständig neue Inhalte produzieren: Blog-Artikel, Social-Media-Posts, E-Mail-Kampagnen, Produktbeschreibungen – oft unter Zeitdruck.',
        solution:
          'KI-Tools wie ChatGPT, Jasper oder Copy.ai generieren Textentwürfe, Überschriften-Varianten und Content-Ideen. Marketer geben Briefing und Tonalität vor, die KI liefert Vorschläge, die dann verfeinert werden.',
        benefits: [
          'Schnellere Content-Produktion',
          'Überwindung von Schreibblockaden',
          'Mehr Zeit für strategische Planung',
          'A/B-Testing verschiedener Textversionen',
        ],
      },
      {
        icon: '📊',
        title: 'Datenanalyse und Reporting',
        category: 'Business Intelligence',
        situation:
          'Unternehmen sammeln riesige Datenmengen, aber manuelle Analyse ist zeitaufwändig und fehleranfällig. Wichtige Trends werden übersehen.',
        solution:
          'KI-gestützte Analytics-Tools (z.B. Tableau, Power BI mit KI-Features) erkennen automatisch Muster, Anomalien und Trends. Sie erstellen verständliche Visualisierungen und predictive Modelle für Prognosen.',
        benefits: [
          'Schnellere Insights aus komplexen Datenmengen',
          'Frühzeitiges Erkennen von Problemen und Chancen',
          'Automatisierte, aktuelle Reports',
          'Datenbasierte Entscheidungen treffen',
        ],
      },
      {
        icon: '👨‍💼',
        title: 'Recruiting und Bewerbermanagement',
        category: 'Personalwesen',
        situation:
          'HR-Abteilungen erhalten hunderte Bewerbungen für eine Stelle. Das Sichten und Vorsortieren kostet enorm viel Zeit.',
        solution:
          'KI-Recruiting-Tools scannen Lebensläufe, extrahieren relevante Informationen und gleichen sie mit Stellenanforderungen ab. Sie schlagen passende Kandidaten vor. Menschen treffen die finale Entscheidung.',
        benefits: [
          'Zeitersparnis bei der Vorauswahl',
          'Objektive Bewertung nach definierten Kriterien',
          'Schnelleres Feedback an Bewerber',
          'Fokus auf persönliche Gespräche mit Top-Kandidaten',
        ],
      },
    ],
    quizQuestions: [
      {
        question: 'Was macht einen guten KI-Prompt aus?',
        options: [
          'Möglichst kurz und vage halten',
          'Klar, spezifisch und mit Kontext versehen',
          'Komplizierte Fachbegriffe verwenden',
          'Immer nur ein Wort schreiben',
        ],
        correctAnswer: 1,
        explanation:
          'Gute Prompts sind klar, spezifisch und enthalten Kontext. Sie beschreiben das gewünschte Ergebnis und Format. Je präziser deine Anweisung, desto besser die KI-Antwort.',
      },
      {
        question: 'Welche Aufgaben eignen sich BESONDERS für KI-Unterstützung?',
        options: [
          'Emotionale, zwischenmenschliche Gespräche',
          'Repetitive, datenbasierte oder kreative Brainstorming-Aufgaben',
          'Ethische Grundsatzentscheidungen',
          'Aufgaben, die körperliche Anwesenheit erfordern',
        ],
        correctAnswer: 1,
        explanation:
          'KI eignet sich besonders für repetitive Aufgaben, Datenanalyse, Ideengenerierung und Entwürfe. Emotionale Intelligenz, Ethik und physische Aufgaben bleiben menschliche Domänen.',
      },
      {
        question: 'Was solltest du bei KI-generierten Inhalten immer tun?',
        options: [
          'Sie ungeprüft übernehmen',
          'Sie komplett neu schreiben',
          'Sie prüfen, anpassen und auf Fakten überprüfen',
          'Sie ignorieren',
        ],
        correctAnswer: 2,
        explanation:
          'KI-Inhalte sind Entwürfe, keine fertigen Lösungen. Prüfe sie immer auf Richtigkeit, Relevanz und Tonalität. KI kann Fakten erfinden ("Halluzinationen") – menschliche Kontrolle ist essentiell.',
      },
    ],
  },

  // Phase 4: Ethik & Verantwortung
  {
    title: 'Ethik & Verantwortung',
    introduction:
      'KI ist mächtig. Und mit Macht kommt Verantwortung. Diese Phase zeigt dir: Welche Risiken gibt es? Wie schützt du Daten? Wann diskriminiert KI? Und was kannst du dagegen tun? Damit KI Menschen hilft. Nicht schadet.',
    learningGoals: [
      'Ethische Herausforderungen von KI verstehen',
      'Datenschutz und Privatsphäre bei KI-Nutzung beachten',
      'Bias und Diskriminierung in KI-Systemen erkennen',
      'Transparenz und Nachvollziehbarkeit von KI-Entscheidungen einfordern',
      'Verantwortungsvollen KI-Einsatz im eigenen Umfeld praktizieren',
    ],
    interactiveTasks: [
      {
        title: 'Ethisches Dilemma: Autonome Waffen',
        description:
          'KI kann in Waffensystemen eingesetzt werden, die eigenständig Ziele auswählen und angreifen. Ist das ethisch vertretbar?',
        prompt:
          'Formuliere deine Position und begründe sie. Berücksichtige verschiedene Perspektiven.',
        feedback:
          'Ein schwieriges Thema! Viele Experten warnen vor autonomen Waffen: Fehlentscheidungen, keine menschliche Kontrolle, Eskalationsrisiken. Andere argumentieren mit Präzision und Soldatenschutz. Wichtig ist: KI-Ethik erfordert gesellschaftliche Debatte.',
        sampleAnswer:
          'Ich sehe das kritisch: Entscheidungen über Leben und Tod sollten nicht von Maschinen getroffen werden. KI kann Zivilisten nicht von Kombattanten unterscheiden und hat kein moralisches Urteilsvermögen. Es braucht internationale Verbote.',
      },
      {
        title: 'Datenschutz im KI-Alltag',
        description:
          'Überlege dir drei Situationen, in denen die Nutzung von KI-Tools Datenschutz-Fragen aufwirft.',
        prompt:
          'Beschreibe die Situationen und erkläre, warum Datenschutz hier wichtig ist.',
        feedback:
          'Sehr wichtig! Bei KI-Tools müssen wir uns fragen: Welche Daten werden verarbeitet? Wo werden sie gespeichert? Wer hat Zugriff? Sensible Daten (Gesundheit, Finanzen, personenbezogene Infos) verdienen besonderen Schutz.',
        sampleAnswer:
          '1. ChatGPT für Kundendaten nutzen: Persönliche Infos könnten im Training landen. 2. Gesichtserkennungs-Apps: Biometrische Daten sind besonders sensibel. 3. Gesundheits-KI: Diagnosen müssen vertraulich bleiben.',
      },
    ],
    practiceExamples: [
      {
        icon: '⚖️',
        title: 'Faire Kreditvergabe',
        category: 'Finanzwesen',
        situation:
          'Banken nutzen KI, um Kreditanträge zu bewerten. Aber: Wenn die Trainingsdaten historische Diskriminierung widerspiegeln, wird die KI unfair.',
        solution:
          'Verantwortungsvolle KI-Entwicklung: Diverse, repräsentative Daten verwenden. Regelmäßige Bias-Tests durchführen. Transparenz schaffen: Warum wurde ein Antrag abgelehnt? Menschen treffen die finale Entscheidung.',
        benefits: [
          'Fairere Kreditvergabe für alle Bevölkerungsgruppen',
          'Vertrauen in automatisierte Systeme',
          'Einhaltung rechtlicher Vorgaben (AGG, DSGVO)',
          'Vermeidung von Reputationsschäden',
        ],
      },
      {
        icon: '🔒',
        title: 'Datenschutzkonforme KI-Nutzung',
        category: 'Datenschutz',
        situation:
          'Ein Unternehmen möchte KI für Kundenservice nutzen, aber Kundendaten sind sensibel und unterliegen der DSGVO.',
        solution:
          'Datenschutz by Design: KI-Systeme nur mit anonymisierten/pseudonymisierten Daten trainieren. On-Premise oder EU-Cloud verwenden. Klare Datenschutzerklärung. Kunden über KI-Einsatz informieren und Opt-out ermöglichen.',
        benefits: [
          'DSGVO-konform arbeiten, Bußgelder vermeiden',
          'Kundenvertrauen durch Transparenz stärken',
          'Ethischer Umgang mit persönlichen Daten',
          'Wettbewerbsvorteil durch verantwortungsvolle Praxis',
        ],
      },
      {
        icon: '🧑‍⚕️',
        title: 'Medizinische KI mit Transparenz',
        category: 'Gesundheitswesen',
        situation:
          'KI-Systeme schlagen Diagnosen und Behandlungen vor. Ärzte und Patienten müssen nachvollziehen können, wie die KI zu ihren Schlüssen kommt.',
        solution:
          'Explainable AI (XAI): KI-Systeme liefern nicht nur Ergebnisse, sondern auch Erklärungen (z.B. "Diese Bildregion ist auffällig"). Ärzte können die Logik prüfen. Patienten werden über KI-Einsatz aufgeklärt und stimmen zu.',
        benefits: [
          'Vertrauen in KI-gestützte Medizin',
          'Ärzte können Vorschläge kritisch prüfen',
          'Patientenautonomie und informierte Entscheidungen',
          'Früherkennung von KI-Fehlern',
        ],
      },
    ],
    quizQuestions: [
      {
        question: 'Was ist "Bias" in KI-Systemen?',
        options: [
          'Ein technischer Fehler im Code',
          'Verzerrungen und Vorurteile, die aus einseitigen Trainingsdaten entstehen',
          'Eine besonders schnelle KI',
          'Ein neues KI-Modell',
        ],
        correctAnswer: 1,
        explanation:
          'Bias sind Verzerrungen in KI-Systemen, die aus einseitigen oder diskriminierenden Trainingsdaten entstehen. Sie führen zu unfairen Ergebnissen für bestimmte Gruppen.',
      },
      {
        question: 'Welches Prinzip ist für verantwortungsvolle KI zentral?',
        options: [
          'KI sollte möglichst schnell sein',
          'KI sollte transparent, fair und nachvollziehbar sein',
          'KI sollte ohne menschliche Kontrolle arbeiten',
          'KI sollte möglichst günstig sein',
        ],
        correctAnswer: 1,
        explanation:
          'Verantwortungsvolle KI basiert auf Transparenz (wie funktioniert sie?), Fairness (keine Diskriminierung) und Nachvollziehbarkeit (Entscheidungen können erklärt werden).',
      },
      {
        question: 'Was solltest du vor der Nutzung von KI-Tools mit sensiblen Daten tun?',
        options: [
          'Einfach loslegen, ist ja nur Software',
          'Datenschutz-Richtlinien prüfen und DSGVO-Konformität sicherstellen',
          'Alle Daten öffentlich machen',
          'Nichts, KI ist immer sicher',
        ],
        correctAnswer: 1,
        explanation:
          'Bei sensiblen Daten (personenbezogene, geschäftliche, medizinische Infos) musst du Datenschutz beachten: Wo werden Daten verarbeitet? Wer hat Zugriff? DSGVO-Konformität prüfen!',
      },
    ],
  },
]

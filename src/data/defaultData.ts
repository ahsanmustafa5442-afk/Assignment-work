import { SiteData } from '../types.ts';

// High-quality, reliable Unsplash images with academic context
export const CAT_AVATAR_DEFAULT = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80";

export const DEFAULT_SITE_DATA: SiteData = {
  contact: {
    brandName: "Kashaf Mustafa Academic Writing",
    ownerName: "Kashaf Mustafa",
    whatsappDisplay: "03445337130",
    whatsappInternational: "923445337130",
    email: "KashafMustafa130@gmail.com",
    serviceHours: "Monday – Saturday, 9:00 AM – 10:00 PM (PKT)",
    location: "Pakistan (Serving University & College Students Worldwide)"
  },
  hero: {
    headline: "Professional Assignment Support for University Students",
    subtitle: "Academic writing assistance, proofreading, editing, research support, reports and presentations — organized with care and attention to detail.",
    profileImage: CAT_AVATAR_DEFAULT,
    heroImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=80",
    badge: "Specialized Academic & University Support"
  },
  about: {
    title: "About Kashaf Mustafa",
    ownerName: "Kashaf Mustafa",
    intro: "I provide independent, personalized academic support and editorial assistance specifically designed for university and college students facing rigorous course requirements.",
    description: "Navigating university-level assignments requires thorough literature synthesis, analytical coherence, adherence to strict departmental formatting guidelines, and spotless citation style. I collaborate closely with undergraduate and postgraduate students to refine their draft arguments, clarify scholarly language, format complex tables and appendices, and verify Harvard or APA referencing accuracy.\n\nAll support is conducted with strict confidentiality, fast communication on WhatsApp, and an unwavering commitment to educational integrity.",
    skills: [
      "Academic Proofreading & Syntax Refinement",
      "Harvard & APA 7th Edition Citation Formatting",
      "Business & Strategic Management Analysis",
      "Environmental & Applied Science Lab Reports",
      "Computer Science Research Summaries & Review",
      "Executive PowerPoint Slide Deck Formatting",
      "Word & PDF Professional Document Typesetting",
      "Methodology Outlines & Secondary Research Organization"
    ],
    education: "", // Intentionally left blank as requested until owner supplies real information
    ethicsStatement: "Services are provided solely as academic tutoring, editorial guidance, proofreading, document formatting, and source organization to support students in mastering their curriculum and improving their own scholarly submissions."
  },
  services: [
    {
      id: "srv-1",
      title: "University Assignment Support",
      category: "Assignment Help",
      description: "Comprehensive guidance on understanding assignment prompts, structuring arguments, developing logical paragraph transitions, and meeting academic rubric criteria.",
      deliverables: [
        "Prompt deconstruction & rubric alignment",
        "Section-by-section outline development",
        "Critical analysis & argument flow guidance",
        "Adherence to academic writing conventions"
      ],
      examplePrice: "Starting from PKR 2,500",
      iconName: "GraduationCap",
      published: true
    },
    {
      id: "srv-2",
      title: "Essay Writing Guidance and Editing",
      category: "Essay & Writing",
      description: "In-depth editorial feedback on argumentative, narrative, analytical, and comparative essays across humanities, social sciences, and business subjects.",
      deliverables: [
        "Thesis statement refinement",
        "Evidence integration & critical commentary",
        "Introduction & conclusion reinforcement",
        "Clarity and tone enhancement"
      ],
      examplePrice: "Starting from PKR 1,800",
      iconName: "FileText",
      published: true
    },
    {
      id: "srv-3",
      title: "Business Management Reports",
      category: "Business & Management",
      description: "Structured support for business case studies, SWOT / PESTLE frameworks, strategic recommendations, organizational behavior, and corporate governance papers.",
      deliverables: [
        "Executive summary structuring",
        "Framework application (PESTLE, SWOT, Porter's 5)",
        "Strategic recommendation matrices",
        "Corporate case analysis structure"
      ],
      examplePrice: "Starting from PKR 3,000",
      iconName: "Briefcase",
      published: true
    },
    {
      id: "srv-4",
      title: "Marketing Research Reports",
      category: "Marketing",
      description: "Assistance with market segmentation analysis, consumer behavior reports, digital marketing campaign evaluations, and 4Ps / 7Ps marketing mix reviews.",
      deliverables: [
        "Consumer persona and journey mapping",
        "Competitor benchmarking tables",
        "Market trend synthesis & secondary research",
        "Marketing strategy recommendations"
      ],
      examplePrice: "Starting from PKR 3,000",
      iconName: "TrendingUp",
      published: true
    },
    {
      id: "srv-5",
      title: "Computer Science Reports & Research Summaries",
      category: "Technology",
      description: "Review and synthesis of technical literature, algorithmic comparisons, software engineering lifecycle summaries, and cybersecurity review reports.",
      deliverables: [
        "Technical literature synthesis & taxonomy",
        "Pseudocode / architecture diagram formatting",
        "Comparative evaluation matrix of algorithms",
        "Discussion of limitations & future work"
      ],
      examplePrice: "Starting from PKR 3,500",
      iconName: "Cpu",
      published: true
    },
    {
      id: "srv-6",
      title: "Environmental Science Reports",
      category: "Science",
      description: "Assistance with environmental impact studies, climate policy literature reviews, sustainability audits, and ecological data presentation.",
      deliverables: [
        "Environmental data table formatting",
        "Policy & protocol reference integration",
        "Sustainability framework alignment (UN SDGs)",
        "Scientific abstract & methodology review"
      ],
      examplePrice: "Starting from PKR 3,000",
      iconName: "Leaf",
      published: true
    },
    {
      id: "srv-7",
      title: "Proofreading and Grammar Correction",
      category: "Editing",
      description: "Meticulous line-by-line review targeting grammatical errors, punctuation, awkward phrasing, word redundancy, and spelling inconsistencies.",
      deliverables: [
        "Correction of grammar, syntax, & punctuation",
        "Elimination of repetitive sentence structures",
        "Standardization of UK or US English spelling",
        "Clean, publication-ready submission text"
      ],
      examplePrice: "Starting from PKR 1,200",
      iconName: "CheckCircle2",
      published: true
    },
    {
      id: "srv-8",
      title: "Academic Language Editing",
      category: "Editing",
      description: "Elevating the scholarly register of student drafts, eliminating informal colloquialisms, and enhancing formal vocabulary and authoritative phrasing.",
      deliverables: [
        "Transition to formal academic voice",
        "Hedging language & cautious scholarly claims",
        "Discipline-specific vocabulary enrichment",
        "Enhanced readability and cohesion"
      ],
      examplePrice: "Starting from PKR 1,500",
      iconName: "PenTool",
      published: true
    },
    {
      id: "srv-9",
      title: "Harvard Referencing Assistance",
      category: "Referencing",
      description: "Detailed verification and formatting of in-text author-date citations and end-of-text reference lists in accordance with institutional Harvard guidelines.",
      deliverables: [
        "Verification of in-text author-date citations",
        "Alphabetical bibliography compilation",
        "Correction of journal, book, and web source entries",
        "Cross-referencing check for missing citations"
      ],
      examplePrice: "Starting from PKR 1,000",
      iconName: "BookOpen",
      published: true
    },
    {
      id: "srv-10",
      title: "APA Referencing Assistance (7th Edition)",
      category: "Referencing",
      description: "Precision formatting for APA 7th edition referencing: title pages, headings, in-text citations, DOIs, URLs, and reference list hanging indents.",
      deliverables: [
        "APA 7th edition title page & heading levels",
        "DOI and permalink verification",
        "Multiple author citation rules (et al.)",
        "Hanging indent and font styling"
      ],
      examplePrice: "Starting from PKR 1,000",
      iconName: "Bookmark",
      published: true
    },
    {
      id: "srv-11",
      title: "PowerPoint Presentation Design",
      category: "Presentation",
      description: "High-impact academic and university presentation slide decks with clean typography, structured visual hierarchy, and concise speaker-point summaries.",
      deliverables: [
        "Custom branded 16:9 modern slide layouts",
        "Concise bullet point synthesis from assignments",
        "Visual charts, graphs, and conceptual diagrams",
        "Editable PowerPoint (.pptx) & PDF formats"
      ],
      examplePrice: "Starting from PKR 2,000",
      iconName: "Presentation",
      published: true
    },
    {
      id: "srv-12",
      title: "Word and PDF Document Formatting",
      category: "Formatting",
      description: "Professional document layout including automated Table of Contents, List of Figures, page numbers, margins, headers/footers, and clear typography.",
      deliverables: [
        "Automated dynamic Table of Contents",
        "Consistent heading hierarchy (H1, H2, H3)",
        "Headers, footers, and Roman/Arabic page numbers",
        "Standardized margins (1 inch) and line spacing (1.5 / 2.0)"
      ],
      examplePrice: "Starting from PKR 1,200",
      iconName: "FileCheck",
      published: true
    },
    {
      id: "srv-13",
      title: "Study Notes & Educational Summaries",
      category: "Study Guides",
      description: "Distillation of lengthy academic textbooks, lecture slides, and journal papers into concise revision bullet points, flash summaries, and concept maps.",
      deliverables: [
        "Key term definitions & formula glossaries",
        "Bullet-point chapter summaries",
        "Concept comparison tables",
        "Exam preparation revision sheets"
      ],
      examplePrice: "Starting from PKR 1,500",
      iconName: "ListTodo",
      published: true
    },
    {
      id: "srv-14",
      title: "Research Organization & Source Assistance",
      category: "Research",
      description: "Methodical identification, organization, and literature matrix compilation of peer-reviewed journal articles for university research proposals.",
      deliverables: [
        "Annotated bibliography matrix",
        "Peer-reviewed journal search organization",
        "Key finding extraction & theme clustering",
        "Literature gap identification notes"
      ],
      examplePrice: "Starting from PKR 2,800",
      iconName: "Search",
      published: true
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "University Assignment Document Layout",
      category: "Assignments",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80",
      description: "Typeset academic submission with verified margins, structured subsections, and formal scholarly diction.",
      published: true
    },
    {
      id: "gal-2",
      title: "Essays & Printed Research Reports",
      category: "Essays",
      imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
      description: "Hardcopy essay drafts reviewed for thesis coherence, evidence integration, and academic tone.",
      published: true
    },
    {
      id: "gal-3",
      title: "Peer-Reviewed Journal Papers & Reference Lists",
      category: "Research",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
      description: "Rigorous citation alignment cross-checked against peer-reviewed journals and university libraries.",
      published: true
    },
    {
      id: "gal-4",
      title: "Students Studying with Laptops",
      category: "Study Sessions",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
      description: "Active university student study desk with collaborative digital workflow and assignment drafting.",
      published: true
    },
    {
      id: "gal-5",
      title: "Business & Marketing Strategic Analysis",
      category: "Reports",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      description: "Financial performance graphs, market segmentation tables, and executive strategy presentations.",
      published: true
    },
    {
      id: "gal-6",
      title: "Computer Science Study Materials & Code Review",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
      description: "Software engineering architecture notes, algorithm comparisons, and technical literature analysis.",
      published: true
    },
    {
      id: "gal-7",
      title: "Environmental Science Field Project Summary",
      category: "Science",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
      description: "Ecological data analysis, carbon emission figures, and environmental policy research drafts.",
      published: true
    },
    {
      id: "gal-8",
      title: "Academic Reference Books & Library Stationery",
      category: "Research",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80",
      description: "Classic university library reference collection used for source corroboration and citation checks.",
      published: true
    },
    {
      id: "gal-9",
      title: "PowerPoint Academic Presentation Deck",
      category: "Presentations",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80",
      description: "High-contrast, professional university presentation slides ready for faculty thesis defenses.",
      published: true
    },
    {
      id: "gal-10",
      title: "Document Editing & Syntax Proofreading",
      category: "Editing",
      imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=80",
      description: "Detailed red-line annotations identifying grammatical fixes and vocabulary enhancements.",
      published: true
    },
    {
      id: "gal-11",
      title: "Structured Study Notes & Notebook Planning",
      category: "Study Guides",
      imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80",
      description: "Mind-mapped module summaries and exam revision guides formatted for rapid student retention.",
      published: true
    },
    {
      id: "gal-12",
      title: "Professional Scholar Study Desk",
      category: "Study Sessions",
      imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",
      description: "Organized workspace equipped for high-focus academic proofreading and student project consultations.",
      published: true
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Business Management Assignment: Sustainable Supply Chains",
      category: "Business Management",
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
      objective: "Demonstrate strategic evaluation of carbon-neutral logistics networks in European manufacturing.",
      shortDescription: "A structured business report analyzing supply chain vulnerabilities, circular economy adoption, and risk mitigation strategies.",
      sampleHeadings: [
        "1. Executive Summary & Problem Scope",
        "2. Literature Review: Triple Bottom Line in Logistics",
        "3. PESTLE & Porter's Five Forces Evaluation",
        "4. Strategic Recommendations & Implementation Timeline",
        "5. Risk Assessment & Contingency Matrix"
      ],
      sampleExcerpt: "Modern supply chain optimization necessitates balancing cost-efficiency with environmental stewardship. As European regulatory frameworks enforce strict Scope 3 emissions reporting, manufacturing firms must transition from traditional linear distribution models to closed-loop circular systems. Our strategic assessment reveals that integrating IoT sensor-driven route optimization reduces freight fuel consumption by 14.8% while maintaining delivery timeliness.",
      formattingHighlights: [
        "Executive Summary highlighted with formal callouts",
        "Standardized PESTLE analytical matrix",
        "Numbered subsection hierarchy",
        "Harvard author-date referencing format"
      ],
      citationStyle: "Harvard Cite-Them-Right",
      wordCountSample: "3,200 words (Sample Excerpt)",
      published: true
    },
    {
      id: "proj-2",
      title: "Marketing Research Report: Digital Banking Consumer Adoption",
      category: "Marketing Research",
      coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
      objective: "Evaluate the psychological and demographic barriers affecting FinTech app adoption among Generation X consumers.",
      shortDescription: "An empirical marketing research report combining secondary surveys, perceptual mapping, and targeted promotional strategies.",
      sampleHeadings: [
        "1. Industry Overview: FinTech Market Penetration",
        "2. Theoretical Framework: Technology Acceptance Model (TAM)",
        "3. Survey Data Analysis & Perceptual Mapping",
        "4. Marketing Mix (7Ps) Repositioning Strategy",
        "5. Ethical Implications of AI Customer Profiling"
      ],
      sampleExcerpt: "While Gen Z users adopt mobile-first banking seamlessly, consumers aged 45-60 exhibit notable hesitation primarily rooted in perceived cybersecurity vulnerability. Applying Davis's Technology Acceptance Model (TAM), perceived ease of use (PEOU) only translates to actual adoption when paired with transparent multi-factor authentication protocols and human-assisted customer support.",
      formattingHighlights: [
        "TAM theoretical framework diagram",
        "Comparative consumer demographics table",
        "Strategic 7Ps marketing matrix",
        "APA 7th edition citation style"
      ],
      citationStyle: "APA 7th Edition",
      wordCountSample: "2,850 words (Sample Excerpt)",
      published: true
    },
    {
      id: "proj-3",
      title: "Environmental Science Essay: Urban Microclimate Mitigation",
      category: "Environmental Science",
      coverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80",
      objective: "Assess the thermodynamic efficacy of green roofs and permeable pavements in combating the urban heat island (UHI) effect.",
      shortDescription: "A scientific essay reviewing empirical thermal imaging data, urban forestry, and architectural sustainability benchmarks.",
      sampleHeadings: [
        "1. Introduction: Thermodynamic Realities of Dense Cities",
        "2. Biophysical Mechanisms of Vegetative Cooling",
        "3. Comparative Analysis: Extensive Green Roofs vs. Cool Pavements",
        "4. Municipal Policy & Urban Planning Guidelines",
        "5. Conclusion & Research Horizon"
      ],
      sampleExcerpt: "Dense urban centers with high albedo surfaces act as heat reservoirs, elevating localized ambient temperatures by up to 4.2°C compared to surrounding peri-urban zones. Vegetative roof coverings introduce evapotranspirative cooling mechanisms that lower surface temperatures by an average of 12°C during peak solar irradiance, significantly decreasing HVAC building energy consumption.",
      formattingHighlights: [
        "Thermodynamic formula formatting",
        "Scientific units (SI standards)",
        "Metric comparative charts",
        "Harvard academic citation format"
      ],
      citationStyle: "Harvard Academic",
      wordCountSample: "2,400 words (Sample Excerpt)",
      published: true
    },
    {
      id: "proj-4",
      title: "Computer Science Research Summary: Algorithmic Fairness",
      category: "Computer Science",
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
      objective: "Synthesize contemporary machine learning literature regarding bias mitigation in automated credit-scoring classifiers.",
      shortDescription: "A literature review summary analyzing demographic parity, equalized odds, and fairness-aware loss functions in supervised models.",
      sampleHeadings: [
        "1. Abstract & Mathematical Scope",
        "2. Mathematical Definitions of Fairness (Demographic Parity vs. Equalized Odds)",
        "3. Pre-processing, In-processing, and Post-processing Interventions",
        "4. Trade-off Analysis: Predictive Accuracy vs. Fairness Guarantees",
        "5. Ethical Guidelines for Autonomous Financial Systems"
      ],
      sampleExcerpt: "Algorithmic decision-making in financial credit scoring frequently perpetuates historical socioeconomic disparities encoded in training datasets. Imposing demographic parity often penalizes overall model accuracy (F1-score); consequently, researchers favor equalized odds constraints which enforce statistical independence between predicted outcomes and protected attributes conditional on the true label.",
      formattingHighlights: [
        "Mathematical notation and LaTeX equations",
        "Algorithm categorization comparative table",
        "IEEE / ACM citation style conventions",
        "Concise technical research taxonomy"
      ],
      citationStyle: "IEEE Reference Format",
      wordCountSample: "2,600 words (Sample Excerpt)",
      published: true
    },
    {
      id: "proj-5",
      title: "Academic Essay: Corporate Governance & Stakeholder Theory",
      category: "Academic Essay",
      coverImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80",
      objective: "Critically evaluate Milton Friedman's shareholder primacy against Edward Freeman's stakeholder value maximization.",
      shortDescription: "A high-scoring university essay exploring contemporary ESG mandates, fiduciary responsibilities, and corporate accountability.",
      sampleHeadings: [
        "1. Introduction: The Evolving Purpose of the Corporation",
        "2. The Shareholder Primacy Paradigm: Strengths & Vulnerabilities",
        "3. Freeman's Stakeholder Theory in 21st Century Practice",
        "4. Institutional Investor Demands and ESG Mandates",
        "5. Conclusion: Towards Polycentric Governance"
      ],
      sampleExcerpt: "The traditional assertion that a corporation's sole social responsibility is to increase its profits overlooks the profound systemic externalities generated by unregulated industrial activity. Contemporary corporate law across OECD nations increasingly reflects the reality that long-term shareholder value is inextricably linked with environmental sustainability, employee welfare, and community trust.",
      formattingHighlights: [
        "Clear thesis statement and logical topic sentences",
        "Balanced counterarguments and critical synthesis",
        "Flawless Harvard in-text citation styling",
        "Double-spaced 12pt Times New Roman academic standard"
      ],
      citationStyle: "Harvard (Cite Them Right)",
      wordCountSample: "2,500 words (Sample Excerpt)",
      published: true
    },
    {
      id: "proj-6",
      title: "APA-Style Research Paper: Cognitive Load in Remote Learning",
      category: "Research Paper",
      coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
      objective: "Investigate how asynchronous video lecture segmentation influences working memory retention in undergraduate psychology students.",
      shortDescription: "A fully structured APA 7th edition empirical paper with title page, abstract, methodology, results, and discussion.",
      sampleHeadings: [
        "1. Title Page & Structured Abstract",
        "2. Introduction & Cognitive Load Theory Foundations",
        "3. Method: Participants, Apparatus, and Experimental Design",
        "4. Results: ANOVA Retention Scores and Self-Reported Fatigue",
        "5. Discussion: Instructional Design Implications"
      ],
      sampleExcerpt: "Cognitive Load Theory posits that working memory capacity is strictly limited when processing novel instructional stimuli. In an experimental cohort of N=140 undergraduates, micro-segmented video modules (5–7 minutes) yielded statistically significant improvements in delayed recall tasks compared to contiguous 45-minute lectures (F(1, 138) = 8.42, p < .01), without increasing overall study duration.",
      formattingHighlights: [
        "APA 7th Edition Student Title Page formatting",
        "Running head and page number in header",
        "Statistical test reporting standard (APA 7th)",
        "Hanging indent reference list with active DOIs"
      ],
      citationStyle: "APA 7th Edition",
      wordCountSample: "3,400 words (Sample Excerpt)",
      published: true
    },
    {
      id: "proj-7",
      title: "University Presentation Deck: Renewable Energy Feasibility",
      category: "PowerPoint Deck",
      coverImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
      objective: "Design an executive academic presentation analyzing solar microgrid feasibility for semi-arid agricultural communities.",
      shortDescription: "A 15-slide master slide deck formatted with high-contrast typography, data visuals, economic projections, and speaker notes.",
      sampleHeadings: [
        "Slide 1: Executive Title & Thesis Overview",
        "Slide 3: Energy Deficit & Irrigation Demand Curves",
        "Slide 6: Photovoltaic Sizing & Capital Expenditure Breakdown",
        "Slide 10: Levelized Cost of Electricity (LCOE) Comparisons",
        "Slide 14: Conclusion, Policy Subsidies & Questions"
      ],
      sampleExcerpt: "Slide 8 Speaker Notes: 'When reviewing the Levelized Cost of Electricity, notice that decentralized solar arrays demonstrate a payback threshold of 4.2 years under current tariff structures. This makes off-grid agricultural solar pumping viable even without heavy governmental subsidies.'",
      formattingHighlights: [
        "16:9 widescreen layout with professional visual balance",
        "Custom charts replacing text-heavy slides",
        "Integrated academic references per slide footer",
        "Exported as vector PDF and editable PPTX"
      ],
      citationStyle: "Chicago Manual of Style (Notes & Slides)",
      wordCountSample: "15 Slides + Detailed Speaker Notes",
      published: true
    },
    {
      id: "proj-8",
      title: "Business Case Study: Turnaround Strategy for Omnichannel Retail",
      category: "Case Study",
      coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
      objective: "Evaluate strategic operational restructuring, inventory turnaround, and digital storefront integration for a legacy department store.",
      shortDescription: "An in-depth business case analysis utilizing financial ratios, inventory velocity metrics, and strategic workforce realignment.",
      sampleHeadings: [
        "1. Company Background & Market Shock Analysis",
        "2. Financial Ratio Diagnosis (Current Ratio, ROE, Inventory Turnover)",
        "3. Strategic Alternatives Matrix (Cost Leadership vs. Niche Curation)",
        "4. Preferred Turnaround Roadmap & 18-Month Cash Flow Plan",
        "5. Risk Mitigation & Stakeholder Buy-in"
      ],
      sampleExcerpt: "The retailer's deteriorating operating margin was primarily triggered by a 42% surplus in slow-moving inventory across regional brick-and-mortar outlets. Implementing unified inventory tracking and fulfilling regional e-commerce shipments directly from physical retail floors reduces warehouse overhead by 28% and recuperates lost operating margin within four quarters.",
      formattingHighlights: [
        "Comprehensive financial ratio calculation tables",
        "Color-coded strategic decision matrix",
        "Gantt-style 18-month execution milestones",
        "Harvard Business School case format standards"
      ],
      citationStyle: "Harvard Business School Format",
      wordCountSample: "3,100 words (Sample Excerpt)",
      published: true
    }
  ],
  pricing: [
    {
      id: "price-1",
      title: "Proofreading & Grammar Review",
      startingPricePKR: 1200,
      description: "Line-by-line editorial examination for students who have written their draft and require thorough language and syntax polishing.",
      features: [
        "Grammar, punctuation & typo corrections",
        "Sentence flow & awkward phrasing refinement",
        "UK / US spelling consistency check",
        "Quick 24 to 48-hour typical turnaround"
      ],
      popular: false,
      published: true
    },
    {
      id: "price-2",
      title: "Document & Reference Formatting",
      startingPricePKR: 1500,
      description: "Complete structural typesetting to match strict university submission requirements and department style sheets.",
      features: [
        "Harvard, APA 7th, or IEEE citation alignment",
        "Automated Table of Contents & List of Figures",
        "Margins, line spacing, headers & page numbering",
        "Clean, ready-to-submit Word (.docx) & PDF files"
      ],
      popular: true,
      published: true
    },
    {
      id: "price-3",
      title: "Research Support & Outlines",
      startingPricePKR: 2500,
      description: "Assistance with breaking down complex university assignment briefs, literature reviews, and building coherent argument frameworks.",
      features: [
        "Assignment brief and rubric deconstruction",
        "Literature search strategy & source clustering",
        "Detailed section-by-section outline structure",
        "Critical analysis guidance and suggestions"
      ],
      popular: false,
      published: true
    },
    {
      id: "price-4",
      title: "Comprehensive Report Assistance",
      startingPricePKR: 3500,
      description: "Holistic support for extensive business, environmental, or computer science reports and case study analysis.",
      features: [
        "Structure planning & methodology alignment",
        "Framework formatting (SWOT, PESTLE, TAM)",
        "Data table, chart & appendix styling",
        "Thorough proofreading & citation verification"
      ],
      popular: false,
      published: true
    },
    {
      id: "price-5",
      title: "PowerPoint Slide Deck Design",
      startingPricePKR: 2000,
      description: "Professional slide deck creation from your research paper or assignment notes for university defenses and presentations.",
      features: [
        "Clean 16:9 modern academic slide layout",
        "Concise synthesis of complex paragraphs into bullets",
        "Visual diagrams, icons & comparative tables",
        "Speaker notes integration for your rehearsal"
      ],
      popular: false,
      published: true
    },
    {
      id: "price-6",
      title: "Custom Project Quotation",
      startingPricePKR: 0,
      description: "Have a unique dissertation chapter, urgent deadline, or specialized subject? Inquire directly for a fair customized quote.",
      features: [
        "Tailored to your specific word count & rubric",
        "Flexible milestone check-ins",
        "Direct WhatsApp communication with Kashaf",
        "Zero hidden fees; transparent pricing agreed upfront"
      ],
      popular: false,
      published: true
    }
  ],
  processSteps: [
    {
      number: 1,
      title: "Send Project Requirements",
      description: "Share your assignment brief, rubric, word count, deadline, and existing draft or notes via WhatsApp or email.",
      icon: "MessageSquareQuote"
    },
    {
      number: 2,
      title: "Confirm Scope, Deadline & Budget",
      description: "We review the prompt together, clarify your specific objectives, and agree on a clear scope, schedule, and fair PKR price.",
      icon: "CheckSquare"
    },
    {
      number: 3,
      title: "Receive Formal Quotation",
      description: "You receive an exact quotation and delivery timeline. Work commences promptly upon mutual confirmation.",
      icon: "Receipt"
    },
    {
      number: 4,
      title: "Review Scope & Feedback Process",
      description: "Receive draft sections or formatted work for your review, with dedicated time for clarifying adjustments and student questions.",
      icon: "FileSearch"
    },
    {
      number: 5,
      title: "Receive Agreed Deliverables",
      description: "Receive your clean, impeccably formatted, and properly referenced final documents ready for your university submission.",
      icon: "Award"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What specific academic support services do you provide?",
      answer: "I assist university and college students with proofreading, academic language editing, Harvard and APA referencing formatting, structure outlining, business and scientific report formatting, study summaries, and PowerPoint presentation design. My goal is to help you present your own scholarly thoughts clearly, coherently, and in full compliance with your university's guidelines.",
      published: true
    },
    {
      id: "faq-2",
      question: "How do I request a quotation for my assignment?",
      answer: "Simply click any 'Contact on WhatsApp' or 'Inquire on WhatsApp' button on this website, or fill out the Project Inquiry form. Send over your assignment brief, topic, approximate word count, and required deadline. I will review the requirements and provide a clear quotation in Pakistani Rupees (PKR) with estimated completion time.",
      published: true
    },
    {
      id: "faq-3",
      question: "Which referencing and citation styles do you support?",
      answer: "I specialize in Harvard (Cite Them Right, standard UK/Australian variants), APA 7th Edition, IEEE for computer science and engineering, and Chicago style. This includes author-date in-text citations, DOI verification, page citations for direct quotes, and fully alphabetized reference lists with hanging indents.",
      published: true
    },
    {
      id: "faq-4",
      question: "What is your revision and feedback policy?",
      answer: "Clear communication is key to academic success. After receiving your draft, you can ask questions or request adjustments within the agreed scope to ensure it matches your supervisor's rubric. Minor formatting and phrasing adjustments are addressed promptly.",
      published: true,
      needsReview: true
    },
    {
      id: "faq-5",
      question: "How fast can you complete an urgent project?",
      answer: "Standard turnaround depends on the word count and depth of the assignment. Typically, proofreading and formatting take 24 to 48 hours, while in-depth reports require 3 to 5 days. For urgent requests, please contact me directly on WhatsApp with your exact deadline to confirm immediate availability.",
      published: true
    },
    {
      id: "faq-6",
      question: "Is my personal information and assignment kept confidential?",
      answer: "Yes, 100%. All student documents, assignment prompts, research data, and conversations are handled with strict privacy. Your files are never shared with third parties or published as public samples.",
      published: true
    },
    {
      id: "faq-7",
      question: "How are prices calculated?",
      answer: "Prices are quoted in Pakistani Rupees (PKR) and are determined by assignment length (word count), technical complexity of the subject, required turnaround time, and the level of assistance needed (e.g., standard proofreading vs. comprehensive report formatting).",
      published: true
    },
    {
      id: "faq-8",
      question: "Do you guarantee grades or academic outcomes?",
      answer: "No legitimate academic specialist can or should guarantee specific letter grades, as final marks depend entirely on university examiners, overall course performance, and institutional grading criteria. What I do guarantee is diligent attention to detail, strict compliance with your provided rubric, and professional academic polish.",
      published: true
    },
    {
      id: "faq-9",
      question: "What is the best way to contact you?",
      answer: "WhatsApp (+92 344 5337130) is the fastest and most reliable way to get in touch for quick responses, voice notes, and file sharing. You can also reach me via email at KashafMustafa130@gmail.com.",
      published: true
    }
  ],
  lastUpdated: new Date().toISOString()
};

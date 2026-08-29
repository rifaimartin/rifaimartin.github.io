export const profileData = {
  name: "Muhammad Rifai",
  preferredName: "Rifai Martin",
  title: "Squad Lead & IT Middleware Engineer",
  tagline: "Squad Lead & Distributed Banking Middleware Architect",
  subTagline: "Leading engineering squads at BCA Digital — architecting high-throughput national transfer switches (BI-FAST, RTGS, SKN), multi-biller payment gateways, QRIS multi-switchers, and event-driven microservices orchestrated on Kubernetes (K8s) handling millions of daily transactions.",
  location: "Jakarta, Indonesia",
  status: "Squad Lead & IT Middleware Engineer at BCA Digital",
  flightNumber: "RM-2026",
  gate: "GATE 01 (BCA DIGITAL)",
  seat: "1A (PROD)",
  class: "First Class Middleware",
  boardingTime: "08:30 WIB",
  
  socials: [
    { label: "GitHub", url: "https://github.com/rifaimartin", username: "@rifaimartin" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/rifai-martin/", username: "rifai-martin" },
    { label: "Email", url: "mailto:rifaimartinjham@gmail.com", username: "rifaimartinjham@gmail.com" },
    { label: "Website", url: "https://rifaimartin.github.io", username: "rifaimartin.github.io" }
  ],

  experiences: [
    {
      id: "bca-digital",
      company: "PT Bank Digital BCA (BCA Digital)",
      companyShort: "BCA DIGITAL",
      role: "Squad Lead & IT Middleware Engineer",
      period: "Mar 2021 — Present (5 yrs 6 mos)",
      year: "2021",
      route: "CGK → PROD",
      location: "Central Jakarta, Indonesia",
      current: true,
      href: "https://bcadigital.co.id",
      logo: "🏦",
      badgeColor: "#0060af",
      desc: "Leading engineering squads, driving microservices architecture on Kubernetes (K8s), and architecting core national fund transfers (BI-FAST, RTGS, SKN) and multi-biller payment gateways under extreme transactional concurrency.",
      highlights: [
        "Lead squad engineering teams (technical direction, architectural reviews, and mentorship) while collaborating cross-functionally with product and business units.",
        "Architected and managed high-availability containerized microservices deployed on Kubernetes (K8s), ensuring 99.99% uptime, auto-scaling, and resilient production deployments.",
        "Engineered mission-critical national fund transfer switches (BI-FAST Phase 1 & 2, RTGS Clearing, SKN, and Online Interbank Transfers) processing high-volume daily interbank settlements.",
        "Architected multi-biller payment platforms integrated with 10+ major national partners (Tokopedia, Garuda Indonesia, PLN ICON+, ALTO, Baznas, Mitracom, BCA, Artajasa, Alterra).",
        "Engineered QRIS payment solutions (MPM, CPM, NFC/TAP, Cross-Border) with intelligent multi-switcher routing connectivity.",
        "Built asynchronous event-driven architectures with Apache Kafka, slashing response latency by 50% on mission-critical payment workflows.",
        "Developed mock server simulators for parallel development and automated regression testing, reducing third-party partner dependencies by 80%.",
        "Implemented SNAP Bank Indonesia security encryption standards (symmetric/asymmetric) for robust inter-system banking integrations.",
        "Authored system architecture specifications and technical documentation across core digital banking domains."
      ],
      stack: ["Kubernetes (K8s)", "Java", "Spring Boot", "Go (Golang)", "Apache Kafka", "Redis", "Elasticsearch", "ISO 8583", "BI-FAST", "National Transfers", "QRIS", "SNAP BI", "Docker"],
      cases: [
        {
          id: "transfers-bifast",
          title: "National Transfers & BI-FAST Phase 1 & 2 Engine",
          category: "Interbank Settlement Rail",
          desc: "24/7 real-time national interbank transfer infrastructure (BI-FAST, RTGS, SKN, Online Transfer) with SNAP BI Encryption.",
          metrics: "Response Time -50% • Sub-Second SLA • Zero Data Loss",
          shots: [
            { title: "Transfer Router", color: "#1e3a8a", icon: "Network" },
            { title: "K8s Microservices", color: "#2563eb", icon: "Cpu" },
            { title: "Kafka Event Bus", color: "#3b82f6", icon: "Activity" }
          ],
          deepDive: {
            overview: "Central bank real-time payment and national interbank clearing engine handling BI-FAST, RTGS, and SKN transactions with symmetric & asymmetric cryptographic signatures.",
            challenge: "Ensuring strict balance consistency, atomicity, and high availability during national peak transfer spikes without latency degradation.",
            solution: "Orchestrated containerized microservices on Kubernetes (K8s), decoupled ingestion and settlement layers via Apache Kafka, and implemented distributed saga patterns with automated fallback routing."
          }
        },
        {
          id: "multi-biller",
          title: "Multi-Biller Payment Gateway (10+ Partners)",
          category: "Payment Infrastructure",
          desc: "Central aggregator biller architecture integrated with Tokopedia, Garuda, PLN ICON+, ALTO, Baznas, Mitracom, BCA, Artajasa, and Alterra.",
          metrics: "10+ National Aggregators • 99.99% SLA",
          shots: [
            { title: "Partner Gateway", color: "#065f46", icon: "Network" },
            { title: "Biller Routing", color: "#059669", icon: "Cpu" },
            { title: "Reconciliation", color: "#10b981", icon: "FileCheck" }
          ],
          deepDive: {
            overview: "Centralized billing and payment aggregation hub connecting BCA Digital to national utility, marketplace, and biller providers.",
            challenge: "Handling protocol heterogeneity and response format variations from 10+ third-party partners under strict latency and reliability constraints.",
            solution: "Designed dynamic adapter layers, automated multi-switcher fallback, mock server simulator testing, and self-healing circuit breakers on K8s."
          }
        },
        {
          id: "qris-engine",
          title: "QRIS Multi-Switcher & Cross Border",
          category: "Payment Switching",
          desc: "Unified QRIS payment engine supporting Merchant-Presented (MPM), Customer-Presented (CPM), NFC/TAP, and Cross-Border.",
          metrics: "MPM / CPM / NFC / Tuntas • Multi-Switcher",
          shots: [
            { title: "QRIS Protocol", color: "#7c2d12", icon: "QrCode" },
            { title: "Multi-Switch Router", color: "#c2410c", icon: "Shuffle" },
            { title: "Settlement Engine", color: "#ea580c", icon: "CreditCard" }
          ],
          deepDive: {
            overview: "Intelligent QR payment switching engine routing domestic and cross-border transactions across national clearing networks.",
            challenge: "Delivering sub-second checkout speeds across online and in-store merchant points while adhering to Bank Indonesia standards.",
            solution: "Decoupled verification and settlement pipelines utilizing in-memory Redis caches and Apache Kafka event streaming."
          }
        }
      ]
    },
    {
      id: "cashlez",
      company: "Cashlez Worldwide Indonesia",
      companyShort: "CASHLEZ",
      role: "Backend Developer",
      period: "Dec 2020 — 2022 (1 yr 2 mos)",
      year: "2020",
      route: "FINTECH → GW",
      location: "Central Park, West Jakarta",
      current: false,
      href: "https://cashlez.com",
      logo: "💳",
      badgeColor: "#ea580c",
      desc: "Engineered end-to-end campaign management systems for DBS Bank, card BIN classification engines, cardholder eligibility services, and performance analytics reporting.",
      highlights: [
        "Built end-to-end campaign management systems for DBS Bank (merchant operations, card BIN classification, cardholder eligibility, and analytical reporting).",
        "Developed card BIN categorization engine for automated payment card type identification.",
        "Engineered cardholder service modules for promotional eligibility criteria and DBS Bank promo campaign enrollments.",
        "Constructed analytics reporting infrastructure to monitor campaign metrics and payment performance."
      ],
      stack: ["Java", "Spring Boot", "Redis", "Elasticsearch", "PostgreSQL", "mPOS APIs", "Microservices"],
      cases: [
        {
          id: "dbs-campaign",
          title: "DBS Bank Campaign & Cardholder Engine",
          category: "Fintech & Card Acquiring",
          desc: "Automated promo campaign validator, credit/debit card BIN classifier, and real-time eligibility evaluation.",
          metrics: "Real-time BIN Match • End-to-End Analytics",
          shots: [
            { title: "BIN Classifier", color: "#9a3412", icon: "CreditCard" },
            { title: "Eligibility Engine", color: "#c2410c", icon: "ShieldCheck" },
            { title: "Analytics Reporter", color: "#ea580c", icon: "Database" }
          ],
          deepDive: {
            overview: "Integrated service validating DBS Bank card types instantly at mPOS terminals to trigger automated merchant discounts."
          }
        }
      ]
    },
    {
      id: "telkom",
      company: "Telkom Indonesia",
      companyShort: "TELKOM",
      role: "Junior Backend Developer",
      period: "Jan 2020 — Dec 2020 (1 yr)",
      year: "2020",
      route: "TELCO → BACKEND",
      location: "Menara Multimedia, Jl. Kebon Sirih, Jakarta · On-site",
      current: false,
      href: "https://telkom.co.id",
      logo: "📡",
      badgeColor: "#dc2626",
      desc: "Architected CQRS-based runner/driver microservices, high-throughput real-time event messaging with Apache Kafka, and optimized high-frequency Redis caching.",
      highlights: [
        "Architected runner/driver microservices applying the CQRS pattern for command-query segregation in large-scale delivery operations.",
        "Built real-time event messaging infrastructure utilizing Apache Kafka for high-throughput data streaming.",
        "Engineered Redis caching strategies to maximize read throughput and minimize database load under heavy traffic."
      ],
      stack: ["Java", "Spring Boot", "Apache Kafka", "Redis", "CQRS Architecture", "MySQL", "REST APIs"],
      cases: [
        {
          id: "cqrs-runner",
          title: "CQRS Delivery Runner & Kafka Data Stream",
          category: "Distributed Telecommunication",
          desc: "Command and Query Responsibility Segregation for high-volume delivery operations with real-time stream processing.",
          metrics: "High-Throughput Streaming • Low-Latency Cache",
          shots: [
            { title: "CQRS Command", color: "#991b1b", icon: "Cpu" },
            { title: "Kafka Bus", color: "#b91c1c", icon: "Network" },
            { title: "Redis Cache", color: "#dc2626", icon: "Activity" }
          ],
          deepDive: {
            overview: "Segregated transactional write operations from analytical read workflows using CQRS and Kafka event topics."
          }
        }
      ]
    },
    {
      id: "acci",
      company: "Indonesia Cloud Computing Association (ACCI)",
      companyShort: "ACCI",
      role: "Frontend Developer & Cloud Developer",
      period: "Nov 2018 — Dec 2020 (2 yrs 2 mos)",
      year: "2018",
      route: "CLOUD → INFRA",
      location: "Greater Jakarta (Jabodetabek)",
      current: false,
      href: "https://opencloud.id",
      logo: "☁️",
      badgeColor: "#7c3aed",
      desc: "Explored cloud infrastructure and monitoring systems for SiCepat logistics client services, and developed event management platforms for cloud community initiatives.",
      highlights: [
        "Researched cloud infrastructure architectures and monitoring systems for logistics client SiCepat.",
        "Developed event management web applications supporting national cloud computing initiatives."
      ],
      stack: ["AWS", "Cloud Monitoring", "Linux", "Docker", "DevOps", "Event Platform", "Vue.js / React"],
      cases: []
    },
    {
      id: "ink-canvas",
      company: "INK & CANVAS",
      companyShort: "INK & CANVAS",
      role: "Frontend & DevOps Engineer",
      period: "Nov 2017 — Sep 2018 (11 mos)",
      year: "2017",
      route: "DEV → DIGITAL",
      location: "Bogor, Indonesia",
      current: false,
      href: "#",
      logo: "🎨",
      badgeColor: "#4f46e5",
      desc: "Frontend developer for LIA Language Institution digital transformation project, modernizing education portals and operational workflows.",
      highlights: [
        "Frontend engineer for LIA's digital transformation initiative, modernizing language institution operations.",
        "Configured continuous deployment pipelines and Linux hosting environments."
      ],
      stack: ["JavaScript", "HTML5 / CSS3", "Linux Server", "DevOps", "UI/UX Implementation"],
      cases: []
    }
  ],

  projects: [
    {
      id: "orch-h2h",
      title: "orch-h2h-isocon",
      category: "Banking Switch / ISO 8583",
      desc: "High-performance ISO 8583 Host-to-Host orchestration and binary packet converter for financial switchers.",
      repo: "https://github.com/rifaimartin/orch-h2h-isocon",
      tech: ["Java", "ISO 8583", "Netty", "TCP Sockets"],
      stars: "Core OSS"
    },
    {
      id: "colibri",
      title: "Colibri MoE Engine",
      category: "High-Performance AI Inference",
      desc: "Run massive Mixture-of-Experts LLMs on consumer hardware — pure C, zero external dependencies, streaming weights dynamically from disk.",
      repo: "https://github.com/rifaimartin/colibri",
      tech: ["C / C++", "Memory Mapping", "MoE Architecture", "Zero-Dep"],
      stars: "Experimental"
    },
    {
      id: "dna-motif",
      title: "DNA-Motif-Validation",
      category: "Research / High Performance Computing",
      desc: "CUDA GPU accelerated algorithm for high-density DNA data storage pattern encoding and motif sequence validation.",
      repo: "https://github.com/rifaimartin/DNA-Motif-Validation",
      tech: ["Python", "CUDA", "C++", "Bio-Computing"],
      stars: "Thesis Research"
    },
    {
      id: "ds-orch",
      title: "ds-orch (Distributed Orchestrator)",
      category: "Middleware / System Design",
      desc: "Distributed transaction coordinator with saga pattern implementation and automated rollback compensation.",
      repo: "https://github.com/rifaimartin/ds-orch",
      tech: ["Java", "Spring Cloud", "Kafka", "PostgreSQL"],
      stars: "Architecture"
    }
  ],

  articles: [
    {
      id: "bifast-architecture",
      title: "Architecting Resilient National Payment Rails: Lessons from BI-FAST & ISO 8583",
      category: "System Design",
      readTime: "7 min read",
      date: "2024",
      desc: "Designing sub-second interbank payment settlement engines, symmetric/asymmetric SNAP encryption, and fault-tolerant distributed routing.",
      url: "https://www.linkedin.com/in/rifai-martin/",
      tags: ["BI-FAST", "ISO 8583", "System Design", "Fintech"]
    },
    {
      id: "kafka-latency",
      title: "Taming Latency in High-Throughput Financial Pipelines with Apache Kafka",
      category: "Event-Driven",
      readTime: "5 min read",
      date: "2023",
      desc: "How we cut critical payment response times by 50% using asynchronous event streaming, partition tuning, and in-memory idempotency guards.",
      url: "https://www.linkedin.com/in/rifai-martin/",
      tags: ["Kafka", "Concurrency", "Performance", "Microservices"]
    },
    {
      id: "cqrs-microservices",
      title: "Command-Query Segregation (CQRS) in Distributed High-Volume Systems",
      category: "Architecture",
      readTime: "6 min read",
      date: "2022",
      desc: "Separating transactional write paths from high-frequency read analytics to achieve massive horizontal scalability without database contention.",
      url: "https://www.linkedin.com/in/rifai-martin/",
      tags: ["CQRS", "Distributed Systems", "Redis", "Spring Boot"]
    },
    {
      id: "engineering-leadership",
      title: "The Engineering Mindset: Transitioning from Individual Contributor to Squad Lead",
      category: "Leadership",
      readTime: "4 min read",
      date: "2024",
      desc: "Practical reflections on technical mentoring, architectural alignment with product stakeholders, and fostering high-ownership engineering squads.",
      url: "https://www.linkedin.com/in/rifai-martin/",
      tags: ["Leadership", "Mentorship", "Engineering Culture"]
    },
    {
      id: "colibri-moe",
      title: "Running Mixture-of-Experts (MoE) LLMs Locally with Zero Dependencies in C",
      category: "Deep Tech",
      readTime: "8 min read",
      date: "2025",
      desc: "Memory-mapped weight streaming and sparse activation kernels to execute large MoE neural networks on everyday consumer hardware.",
      url: "https://github.com/rifaimartin/colibri",
      tags: ["AI Inference", "C / C++", "MoE", "Performance"]
    }
  ],

  skills: {
    languages: ["Go (Golang)", "Java", "TypeScript", "JavaScript", "C / C++", "Rust", "Python", "SQL"],
    backend: ["Kubernetes (K8s)", "Microservices", "Spring Boot", "Node.js", "Express", "CQRS", "REST & gRPC", "Mock Simulator"],
    messaging: ["Apache Kafka", "RabbitMQ", "Event-Driven Architecture", "Distributed Saga"],
    data: ["Redis", "Elasticsearch", "PostgreSQL", "MySQL", "MongoDB"],
    finance: ["BI-FAST (Phase 1 & 2)", "National Transfers (RTGS / SKN / Online)", "QRIS (MPM/CPM/NFC/Cross Border)", "Multi-Biller Gateways", "ISO 8583", "SNAP BI (Sym/Asym)"],
    devops: ["Kubernetes (K8s)", "Docker", "AWS", "CI/CD", "Linux Tuning", "Monitoring & Observability"]
  },

  education: [
    {
      school: "Universitas Pelita Harapan (UPH)",
      degree: "Bachelor of Engineering — Computer Engineering",
      period: "2022 — 2026",
      gpa: "3.5 / 4.0",
      focus: "DNA Data Storage, GPU CUDA Computing, Distributed Architecture"
    },
    {
      school: "SMKN 1 CIOMAS",
      degree: "Vocational Diploma — Software Engineering",
      period: "2016 — 2019",
      focus: "Software Development, Algorithms & Computer Systems"
    }
  ],

  memories: [
    {
      title: "BCA Digital Squad Lead",
      year: "2021",
      label: "Leadership & K8s",
      desc: "Leading squad engineers architecting transfer switches, multi-biller gateways & K8s microservices."
    },
    {
      title: "BI-FAST & National Clearing",
      year: "2022",
      label: "National Settlement",
      desc: "Real-time 24/7 central bank transfer rail with Kafka async streams."
    },
    {
      title: "Kafka Speedup -50%",
      year: "2023",
      label: "Latency Optimization",
      desc: "Cut crucial payment processing response times by half with event-driven pipelines."
    },
    {
      title: "QRIS Cross Border & NFC",
      year: "2024",
      label: "Next-Gen QR",
      desc: "Rolled out contactless tap-on-phone & cross-border switcher connectivity."
    }
  ]
};

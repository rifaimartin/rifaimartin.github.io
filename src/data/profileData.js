export const profileData = {
  name: "Muhammad Rifai",
  preferredName: "Rifai Martin",
  title: "Squad Lead & IT Middleware Engineer",
  tagline: "Squad Lead & Distributed Banking Middleware Architect",
  subTagline: "Leading engineering squads at BCA Digital, architecting resilient multi-biller payment gateways, QRIS multi-switchers, and high-throughput Kafka event-driven banking pipelines.",
  location: "Jakarta Pusat, Jakarta Raya, Indonesia",
  status: "Squad Lead & IT Middleware Engineer at BCA Digital",
  flightNumber: "RM-2026",
  gate: "GATE 01 (BCA DIGITAL)",
  seat: "1A (PROD)",
  class: "First Class Middleware",
  boardingTime: "08:30 WIB",
  
  socials: [
    { label: "GitHub", url: "https://github.com/rifaimartin", username: "@rifaimartin" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/rifai-martin/", username: "rifai-martin" },
    { label: "Email", url: "mailto:rifaimartin@gmail.com", username: "rifaimartin@gmail.com" },
    { label: "Website", url: "https://rifaimartin.github.io", username: "rifaimartin.github.io" }
  ],

  experiences: [
    {
      id: "bca-digital",
      company: "PT Bank Digital BCA (BCA Digital)",
      companyShort: "BCA DIGITAL",
      role: "Squad Lead & IT Middleware Engineer",
      period: "Mar 2021 – Saat ini (5 thn 6 bln)",
      year: "2021",
      route: "CGK → PROD",
      location: "Jakarta Pusat, Jakarta Raya, Indonesia",
      current: true,
      href: "https://bcadigital.co.id",
      logo: "🏦",
      badgeColor: "#0060af",
      desc: "Memimpin tim squad engineering, memberikan panduan teknis, code review, mentorship, dan berkoordinasi langsung dengan tim produk & bisnis dalam membangun arsitektur perbankan digital berkecepatan tinggi.",
      highlights: [
        "Memimpin tim squad (panduan teknis, code review, dan mentorship) serta koordinasi langsung dengan tim produk dan bisnis.",
        "Merancang arsitektur platform pembayaran multi-biller yang terintegrasi dengan 10+ mitra (Tokopedia, Garuda, PLN ICON+, ALTO, Baznas, Mitracom, BCA, Artajasa, Alterra).",
        "Mengembangkan solusi pembayaran QRIS (MPM, CPM, NFC/TAP, Cross Border) dengan konektivitas multi-switcher.",
        "Mengimplementasikan BI-FAST Phase 1 & 2, Kliring RTGS, SKN, dan Online Switching.",
        "Membangun arsitektur async event-driven berbasis Apache Kafka, mengurangi waktu respons hingga 50% pada alur pembayaran krusial.",
        "Membangun mock server simulator untuk pengembangan paralel dan regression testing, mengurangi ketergantungan pada mitra hingga 80%.",
        "Mengimplementasikan enkripsi SNAP Bank Indonesia (simetris/asimetris) untuk integrasi antar-sistem yang aman.",
        "Menyusun dokumentasi alur arsitektur dan spesifikasi teknis di berbagai domain perbankan."
      ],
      stack: ["Java", "Spring Boot", "Go (Golang)", "Apache Kafka", "Redis", "Elasticsearch", "ISO 8583", "BI-FAST", "QRIS", "SNAP BI", "Docker", "Kubernetes"],
      cases: [
        {
          id: "multi-biller",
          title: "Multi-Biller Payment Gateway (10+ Partners)",
          category: "Payment Infrastructure",
          desc: "Arsitektur aggregator biller terintegrasi dengan Tokopedia, Garuda, PLN ICON+, ALTO, Baznas, Mitracom, BCA, Artajasa, dan Alterra.",
          metrics: "10+ National Aggregators • 99.99% SLA",
          shots: [
            { title: "Partner Gateway", color: "#1e3a8a", icon: "Network" },
            { title: "Biller Routing", color: "#2563eb", icon: "Cpu" },
            { title: "Reconciliation", color: "#3b82f6", icon: "FileCheck" }
          ],
          deepDive: {
            overview: "Platform sentral pemrosesan tagihan dan pembayaran multi-biller perbankan yang menghubungkan BCA Digital ke berbagai agregator skala nasional.",
            challenge: "Menangani variasi protokol dan format respons dari 10+ mitra pihak ketiga dengan standar keandalan tinggi dan mitigasi latency spike.",
            solution: "Merancang adapter layer dinamis, fallback multi-switcher, mock server simulator testing, serta circuit breaker otomatis."
          }
        },
        {
          id: "qris-engine",
          title: "QRIS Multi-Switcher & Cross Border",
          category: "Payment Switching",
          desc: "Solusi pembayaran QRIS terpadu mendukung Merchant-Presented (MPM), Customer-Presented (CPM), NFC/TAP, dan Cross-Border.",
          metrics: "MPM / CPM / NFC / Tuntas • Multi-Switcher",
          shots: [
            { title: "QRIS Protocol", color: "#065f46", icon: "QrCode" },
            { title: "Multi-Switch Router", color: "#059669", icon: "Shuffle" },
            { title: "Settlement Engine", color: "#10b981", icon: "CreditCard" }
          ],
          deepDive: {
            overview: "Engine switching QRIS cerdas yang menghubungkan core perbankan dengan multi-switcher nasional dan jaringan cross-border.",
            challenge: "Menghadirkan kecepatan transaksi sub-detik untuk transaksi offline maupun online dengan kepatuhan regulasi Bank Indonesia.",
            solution: "Memisahkan jalur verifikasi dan settlement menggunakan Redis in-memory cache dan Apache Kafka asynchronous pipeline."
          }
        },
        {
          id: "bi-fast",
          title: "BI-FAST Phase 1 & 2 Engine",
          category: "National Clearing",
          desc: "Infrastruktur transfer antarbank 24/7 real-time, RTGS, SKN, dan SNAP BI Encryption.",
          metrics: "Response Time -50% • Partner Dep -80%",
          shots: [
            { title: "Saga Pipeline", color: "#7c2d12", icon: "Activity" },
            { title: "SNAP Crypto", color: "#c2410c", icon: "ShieldCheck" },
            { title: "Kafka Bus", color: "#ea580c", icon: "Database" }
          ],
          deepDive: {
            overview: "Implementasi standar transfer nasional generasi baru Bank Indonesia dengan cryptographic signing simetris/asimetris.",
            challenge: "Memastikan konsistensi saldo dan transaksi atomik dalam kondisi beban jaringan ekstrem tanpa bottleneck.",
            solution: "Menerapkan distributed saga pattern, mock simulator untuk regresi independen mitra, serta optimasi connection pooling."
          }
        }
      ]
    },
    {
      id: "cashlez",
      company: "Cashlez Worldwide Indonesia",
      companyShort: "CASHLEZ",
      role: "Back End Developer",
      period: "Des 2020 – 2022 (1 thn 2 bln)",
      year: "2020",
      route: "FINTECH → GW",
      location: "Central Park, Jakarta Barat",
      current: false,
      href: "https://cashlez.com",
      logo: "💳",
      badgeColor: "#ea580c",
      desc: "Membangun sistem manajemen kampanye end-to-end untuk DBS Bank, sistem otomatisasi klasifikasi BIN kartu, modul kelayakan pemegang kartu, dan analitik performa.",
      highlights: [
        "Membangun sistem manajemen kampanye end-to-end untuk DBS Bank (operasional merchant, klasifikasi BIN kartu, kelayakan pemegang kartu, dan pelaporan analitik).",
        "Mengembangkan sistem BIN kartu untuk otomatisasi klasifikasi jenis kartu perbankan.",
        "Mengembangkan modul layanan pemegang kartu untuk logika kelayakan dan pendaftaran kampanye promo DBS Bank.",
        "Membuat infrastruktur pelaporan analitik kampanye dan visualisasi metrik performa."
      ],
      stack: ["Java", "Spring Boot", "Redis", "Elasticsearch", "PostgreSQL", "mPOS APIs", "Microservices"],
      cases: [
        {
          id: "dbs-campaign",
          title: "DBS Bank Campaign & Cardholder Engine",
          category: "Fintech & Card Acquiring",
          desc: "Sistem otomasi kampanye promosi, klasifikasi BIN kartu kredit/debit, dan validasi kelayakan nasabah.",
          metrics: "Real-time BIN Match • End-to-End Analytics",
          shots: [
            { title: "BIN Classifier", color: "#9a3412", icon: "CreditCard" },
            { title: "Eligibility Engine", color: "#c2410c", icon: "ShieldCheck" },
            { title: "Analytics Reporter", color: "#ea580c", icon: "Database" }
          ],
          deepDive: {
            overview: "Platform terintegrasi yang memvalidasi jenis kartu nasabah DBS Bank secara instan di terminal mPOS untuk mengaplikasikan diskon dan promo merchant secara otomatis."
          }
        }
      ]
    },
    {
      id: "telkom",
      company: "Telkom Indonesia",
      companyShort: "TELKOM",
      role: "Junior Back End Developer",
      period: "Jan 2020 – Des 2020 (1 thn)",
      year: "2020",
      route: "TELCO → BACKEND",
      location: "Menara Multimedia, Jl. Kebon Sirih, Jakarta · On-site",
      current: false,
      href: "https://telkom.co.id",
      logo: "📡",
      badgeColor: "#dc2626",
      desc: "Merancang microservice runner/driver berarsitektur CQRS, infrastruktur real-time event messaging dengan Apache Kafka, dan optimasi caching data berskala besar.",
      highlights: [
        "Merancang microservice runner/driver menggunakan pola CQRS untuk pemisahan command-query pada operasional pengiriman skala besar.",
        "Membangun infrastruktur real-time event messaging menggunakan Apache Kafka untuk data streaming berthroughput tinggi.",
        "Merancang strategi pengintaian (caching) Redis untuk mengoptimalkan performa pembacaan data berfrekuensi tinggi."
      ],
      stack: ["Java", "Spring Boot", "Apache Kafka", "Redis", "CQRS Architecture", "MySQL", "REST APIs"],
      cases: [
        {
          id: "cqrs-runner",
          title: "CQRS Delivery Runner & Kafka Data Stream",
          category: "Distributed Telecommunication",
          desc: "Pemisahan command dan query untuk operasional pengiriman data masif dengan real-time streaming bus.",
          metrics: "High-Throughput Streaming • Low-Latency Cache",
          shots: [
            { title: "CQRS Command", color: "#991b1b", icon: "Cpu" },
            { title: "Kafka Bus", color: "#b91c1c", icon: "Network" },
            { title: "Redis Cache", color: "#dc2626", icon: "Activity" }
          ],
          deepDive: {
            overview: "Memisahkan alur tulis transaksi dari alur baca analitik pengiriman menggunakan CQRS dan Kafka event topics."
          }
        }
      ]
    },
    {
      id: "acci",
      company: "Indonesia Cloud Computing Association (ACCI)",
      companyShort: "ACCI",
      role: "Frontend Developer & Cloud Developer",
      period: "Nov 2018 – Des 2020 (2 thn 2 bln)",
      year: "2018",
      route: "CLOUD → INFRA",
      location: "Jabodetabek",
      current: false,
      href: "https://opencloud.id",
      logo: "☁️",
      badgeColor: "#7c3aed",
      desc: "Mengeksplorasi infrastruktur cloud dan sistem monitoring untuk layanan ekspedisi SiCepat serta mengembangkan aplikasi manajemen event komunitas cloud.",
      highlights: [
        "Mengeksplorasi infrastruktur cloud dan sistem pemantauan (monitoring) untuk layanan klien ekspedisi SiCepat.",
        "Mengembangkan aplikasi manajemen acara yang berfokus pada inisiatif komunitas komputasi awan di Indonesia."
      ],
      stack: ["AWS", "Cloud Monitoring", "Linux", "Docker", "DevOps", "Event Platform", "Vue.js / React"],
      cases: []
    },
    {
      id: "ink-canvas",
      company: "INK & CANVAS",
      companyShort: "INK & CANVAS",
      role: "Front End & Devops",
      period: "Nov 2017 – Sep 2018 (11 bln)",
      year: "2017",
      route: "DEV → DIGITAL",
      location: "Bogor",
      current: false,
      href: "#",
      logo: "🎨",
      badgeColor: "#4f46e5",
      desc: "Pengembang frontend untuk proyek transformasi digital Lembaga Bahasa LIA, memodernisasi operasional dan portal pendidikan.",
      highlights: [
        "Pengembang frontend untuk proyek transformasi digital LIA, memodernisasi operasional lembaga bahasa.",
        "Menyiapkan pipeline deployment dan server hosting Linux."
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

  skills: {
    languages: ["Go (Golang)", "Java", "TypeScript", "JavaScript", "C / C++", "Rust", "Python", "SQL"],
    backend: ["Spring Boot", "Node.js", "Express", "Microservices", "CQRS", "REST & gRPC", "Mock Simulator"],
    messaging: ["Apache Kafka", "RabbitMQ", "Event-Driven Architecture", "Distributed Saga"],
    data: ["Redis", "Elasticsearch", "PostgreSQL", "MySQL", "MongoDB"],
    finance: ["ISO 8583", "BI-FAST (Phase 1 & 2)", "QRIS (MPM/CPM/NFC/Cross Border)", "SNAP BI (Sym/Asym)", "RTGS / SKN", "Multi-Biller Switching"],
    devops: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux Tuning", "Monitoring & Logging"]
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
      label: "Leadership & Scale",
      desc: "Leading squad engineers architecting multi-biller gateways & QRIS multi-switchers."
    },
    {
      title: "BI-FAST Phase 1 & 2",
      year: "2022",
      label: "National Settlement",
      desc: "Real-time 24/7 central bank transfer engine with Kafka async streams."
    },
    {
      title: "Kafka Speedup -50%",
      year: "2023",
      label: "Latency Optimization",
      desc: "Cut crucial payment processing response time by half with event-driven pipelines."
    },
    {
      title: "QRIS Cross Border & NFC",
      year: "2024",
      label: "Next-Gen QR",
      desc: "Rolled out contactless tap-on-phone & cross-border switcher connectivity."
    }
  ]
};

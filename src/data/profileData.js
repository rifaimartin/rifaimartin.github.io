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
      id: "opengym",
      title: "openGym — Self-Hosted Fitness & Workout Tracker",
      category: "Fullstack PWA & Distributed Sync",
      desc: "Privacy-first gym & body-weight tracker with interactive muscle heatmaps, 1,300+ exercise library, passkey authentication, and offline PWA sync.",
      repo: "/opengym/",
      isLocalRoute: true,
      demoUrl: "/opengym/",
      sourceRepo: "https://gitlab.com/DuarteSantos8/opengym",
      tech: ["React 19", "PWA", "Zustand", "Docker", "Capacitor", "AGPL-3.0"],
      stars: "Featured App",
      featured: true
    },
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
      id: "ini-bukan-akhir",
      title: "Ini Bukan Akhir — Perjalanan 1 Tahun & Sejarah Masuk Telkom Indonesia",
      category: "Career Journey",
      readTime: "4 min read",
      date: "25 Nov 2020",
      desc: "Kisah masuk Telkom Indonesia di usia 18 tahun mewujudkan harapan orang tua, adaptasi WFH, hingga refleksi penting: 'Jangan buru-buru jadi jago, jadi jago butuh waktu.'",
      tags: ["Telkom Indonesia", "Career Story", "Backend Dev", "Personal Growth"],
      content: `Hampir 1 tahun di Telkom Indonesia menjadi seorang Backend Developer.

Berawal dari keinginan babeh gue, beliau ingin salah satu anaknya bekerja di BUMN, dan akhirnya gue bisa mewujudkan hal itu. Di usia gue yang saat itu masih berusia 18 tahun (Januari 2020) dan sekarang 19 tahun (November 2020), gue merasa bangga terhadap diri gue sendiri karena telah mencapai sesuatu yang memang agak sulit dicapai oleh anak seusia gue saat itu.

Di usia tersebut pun gue belajar menjadi dewasa dalam hal bekerja yang baik itu seperti apa: bagaimana berkolaborasi di lingkungan korporasi besar, berani speak up di forum diskusi arsitektur, dan belajar dari setiap kesalahan. Ada banyak sekali pelajaran yang gue dapat, di mana tidak bisa gue tuliskan satu per satu di sini karena memang sangat banyak, dan itu yang membentuk kepribadian gue hari ini.

Menjalani WFH sekitar 8 bulan lebih memberikan pengalaman kerja remote yang seru dan penuh tantangan.

Pesan penting dari gue di masa sekarang, untuk diri gue di masa depan:

"Jangan buru-buru jadi jago, jadi jago butuh waktu. Jangan menyerah dengan keadaan; situasi yang sulit menentukan apakah kamu yang terpilih untuk bisa beradaptasi di dalamnya.

Permasalahan akan terus ada berdampingan dengan umur kamu yang sebentar lagi kepala dua. Pesanku jangan terlalu dipusingkan dengan segala sesuatu di luar kendali pengaruhmu, karena kamu berhak memilih hidupmu akan seperti apa."

Masih banyak hal yang harus diperbaiki dalam hidup kamu Rifai, temukan solusinya dan sibuklah pada hal itu. Ingat, hidupmu bukan hidup orang lain. Bangun dan lakukan. Suatu hari nanti kamu harus bercerita dan membagikan pengalaman hidup kamu kepada yang lain. Maju dan terus berkembang berkarya!`
    },
    {
      id: "19-tahun-kesepian",
      title: "Refleksi Usia 19 Tahun: Menolong Teman, Berproses & Mengambil Harapan",
      category: "Personal Reflections",
      readTime: "5 min read",
      date: "17 Jul 2021",
      desc: "Catatan malam sabtu saat membantu teman SMP belajar coding, kilas balik masa lalu saat diremehkan, dan rasa syukur atas orang-orang yang pernah mengulurkan tangan.",
      tags: ["Reflections", "Growth", "Mentorship", "Gratitude"],
      content: `Kemarin malam sangat senang sekali ada teman SMP berkunjung sambil membawa laptopnya ke rumah, berharap aku bisa membantu kesulitan teknis yang sedang dia hadapi seputar pemrograman. Malam sabtuku ditemani olehnya sambil aku membantunya menyelesaikan permasalahan coding dan menambahkan fitur yang membuat dirinya tersenyum senang. Aku pun ikut bahagia.

Aku banyak menceritakan pengalaman hidupku kepadanya, dengan harapan dia bisa belajar bahwa aku pun sama pernah berada di posisi sulit seperti dirinya dulu. Aku seperti melihat cerminan diriku di masa lalu, dan melihat kembali orang-orang yang pernah menolongku serta mengajariku sehingga membuatku terus semangat belajar.

Aku akan selalu mengingat mereka dan berharap tidak pernah kehilangan mereka dalam hidupku: orang-orang yang pernah ada di sisiku saat aku sulit dan mau menjulurkan tangannya untuk membuatku berdiri kembali. Terima kasih, terima kasih, terima kasih.

Aku yang dulunya hanya seorang pemuda yang terkadang sering sekali diremehkan bahkan pernah dibilang hanya jadi 'beban tim', kini diberi apresiasi sederhana dari teman lama yang justru membuat semangat belajarku semakin meningkat. Aku mulai mengerti: cacian dan remehan orang di luar sana akan selalu ada. Tinggal bagaimana kita pintar menahan diri dan menjadikannya pemantik untuk bangkit menjadi pribadi yang jauh lebih berkembang.

Kini aku melihat diriku semakin bertumbuh dari hari ke hari bersama banyaknya orang hebat yang kujumpai. Seiring berjalannya waktu, kini aku berani menyampaikan ide arsitektur, memberikan concern teknis, dan pendapatku kini didengar serta dihormati.

Aku sangat bersyukur atas proses ini. Kini mimpi itu terasa semakin dekat. Akan aku genggam terus semakin kuat tanpa takut akan kegagalan, karena jatuh saat berproses sudah menjadi bagian tak terpisahkan dari proses itu sendiri.

Untuk diriku yang sebentar lagi menginjak usia 20 tahun di tanggal 4 Agustus: semoga semakin banyak orang yang bisa kamu bantu di luar sana.`
    },
    {
      id: "belajar-dari-tech-lead",
      title: "Belajar Dari Tech Lead: Framework Speak Up (Fact - Story - Ask)",
      category: "Engineering Culture",
      readTime: "3 min read",
      date: "06 Des 2020",
      desc: "Framework komunikasi teknis saat berbicara di forum kantor dan meeting virtual menggunakan metode Fact — Story — Ask yang terinspirasi dari Tech Lead.",
      tags: ["Communication", "Tech Lead", "Soft Skills", "Meetings"],
      content: `Happy weekend guys! Di tulisan kali ini gue mau sedikit membagikan sebuah framework speak up yang sangat powerful.

Gue yakin di antara kalian kadang suka bingung dan nggak tahu harus mulai dari mana ketika coba speak up di kantor, meeting virtual, maupun forum arsitektur engineering.

Ternyata kita bisa mengimplementasikan metode terstruktur ini saat mulai menyampaikan gagasan:

1. Fact = Ceritakan sebuah fakta konkret berupa data atau temuan teknis riil.
2. Story = Ceritakan data tersebut dengan sebuah cerita atau analogi yang kontekstual (storytelling).
3. Ask = Ajukan sebuah pertanyaan terarah untuk mencari solusi dan best practice bersama.

Contoh Penerapan:
"Fact: Pak, kemarin saya menemukan rekomendasi rumus perhitungan studi kasus kita di buku rujukan A halaman 63.
Story: Saat coba saya implementasikan ke dalam studi kasus kita dan saya compare hasilnya menggunakan engine generator AI, ternyata hasilnya tidak sama.
Ask: Apakah pendekatan perhitungan saya yang perlu dikoreksi, ataukah mesin generator AI tersebut yang menggunakan formula dasar berbeda?"

Tulisan ini terinspirasi langsung dari Tech Lead gue di kantor yang super keren dalam menyampaikan sesuatu secara tertata rapi dan objektif.`
    },
    {
      id: "podcast-indonesia-belajar",
      title: "Catatan Podcast Indonesia Belajar: Problem Solving, Git Commits & Open Minded",
      category: "Learning Notes",
      readTime: "5 min read",
      date: "18 Des 2020",
      desc: "Poin-poin penting sesi diskusi bersama Mas Fauzan & Mas Setia Budi seputar hiring engineer, kualitas commit GitHub, dan esensi problem solving.",
      tags: ["Podcast", "Best Practices", "Git History", "Problem Solving"],
      content: `Belajar bareng Mas Fauzan dan Mas Setia Budi di podcast INDONESIA BELAJAR. Berikut rangkuman poin-poin krusial yang sangat berharga bagi developer:

1. Fondasi Fundamental: Kalau kalian punya basic data structure dan algoritma yang bagus, kalian akan sangat mudah berpindah ke bahasa pemrograman apa pun.
2. Team Player yang Solid: Belajar kelompok yang benar sejak dini, bukan hanya satu orang yang mengerjakan. Kerja tim yang solid di sekolah/kampus adalah simulasi penting sebelum masuk ke industri.
3. Sudut Pandang Hiring Tech Lead:
   - Tidak melihat ijazah semata, melainkan esensi rekayasa perangkat lunak (*software engineering mindset*).
   - Memberikan satu problem riil dan menyelesaikannya bersama untuk melihat naming variable, struktur kode, dan collaborative point.
4. Jejak Git History di GitHub: Commit history di GitHub sangat mencerminkan cara kerja dan alur berpikir seorang developer.
5. Good Engineer vs Average Engineer: Good engineer selalu fokus mencari solusi secara pragmatis, berani berdiskusi dengan argumen kuat namun tetap open-minded, dan tidak memaksakan ego (*showing off*).
6. Menulis Kode untuk Orang Lain: Kita menulis kode bukan hanya untuk komputer atau diri sendiri, tapi untuk dibaca dan dikembangkan oleh rekan tim di masa depan.

"Pada akhirnya semua adalah tentang problem solving. Dan masing-masing individu pasti punya cara yang unik untuk menyelesaikannya. Teruslah berlatih, karena Indonesia hanya butuh satu generasi untuk benar-benar menjadi negara yang maju. Mari terus belajar dan berkarya!"`
    },
    {
      id: "kematian-seneca",
      title: "Tentang Waktu & Kematian: Refleksi Stoikisme dari Seneca dan Film Coco",
      category: "Philosophy",
      readTime: "4 min read",
      date: "10 Mei 2020",
      desc: "Perenungan mendalam tentang Stoikisme, nilai hidup, dan kutipan Seneca: 'Life is long if you know how to use it... kita yang menjadikannya pendek.'",
      tags: ["Philosophy", "Stoicism", "Seneca", "Mindset"],
      content: `Segala ketakutan manusia akan kematian bukanlah karena kematian itu sendiri, melainkan atas anggapan (value judgment) dan gambaran pikiran kita mengenai hal tersebut.

Jika gambaran kita mengenai kematian adalah sesuatu yang menakutkan, reaksi kita akan menjadi negatif dan selalu ingin menghindarinya. Sebaliknya, jika kita melihatnya dengan tenang dan bijak, kita pun akan lebih damai dalam menjalaninya. Nalar dan rasio kitalah yang menentukan kedamaian atau kecemasan kita.

Yang terpenting bukanlah panjangnya umur, melainkan seberapa berkualitas dan bermakna hidup yang kita jalani.

"Life is long if you know how to use it… we are not given a short life but we make it short, and wasteful of it." — Seneca

Hidup ini panjang jika kita tahu bagaimana menggunakannya. Kita tidak diberikan hidup yang pendek, tetapi kitalah yang menjadikannya pendek dan terbuang untuk hal-hal yang sia-sia: kekhawatiran berlebih pada hal di luar kendali, obsesi materi berlebihan, atau terus memikirkan opini orang yang tidak seharusnya diberi porsi banyak.

Percuma diberikan 100 tahun kehidupan jika isinya hanya cemas, iri, dan amarah tanpa pernah mengasah kebijaksanaan, keberanian, pengendalian diri, dan keadilan.`
    },
    {
      id: "message-broker-otak",
      title: "Filosofi Message Broker: Mengapa Otak Kita Butuh Konsep Kafka",
      category: "Mental Models",
      readTime: "3 min read",
      date: "05 Mei 2020",
      desc: "Analogi arsitektur Apache Kafka (Publish/Subscribe) untuk menyaring arus deras informasi harian agar otak tetap fokus menghasilkan output berkualitas.",
      tags: ["Kafka", "Philosophy", "Mental Models", "Focus"],
      content: `Tiba-tiba gue membayangkan konsep Message Broker di dalam cara kerja otak manusia saat asyik membaca artikel arsitektur software.

Kenapa kita tidak menerapkan konsep Apache Kafka (platform messaging publish/subscribe) ke dalam pikiran kita untuk meminimalisir informasi sampah yang masuk ke kepala?

Biarlah dunia di sekitar kita mem-publish ribuan informasi setiap detiknya, tetapi tetap kitalah yang memegang kendali penuh untuk menentukan pesan mana yang ingin kita 'subscribe' dan cerna.

Selama ini sering kali otak menerima terlalu banyak informasi yang tidak penting, sehingga output yang keluar pun menjadi tidak terarah. Dengan membangun filter dan partisi topik yang disiplin di pikiran, kita bisa menjaga ketenangan dan fokus menghasilkan karya terbaik.`
    },
    {
      id: "meeting-sampe-sahur",
      title: "Meeting Sampe Sahur: Dinamika Arsitektur & Dedikasi Engineering",
      category: "Engineering Life",
      readTime: "2 min read",
      date: "10 Mei 2020",
      desc: "Pengalaman maraton meeting teknis hingga 4 jam saat perombakan arsitektur dan dedikasi dalam membangun sistem yang andal.",
      tags: ["Architecture", "Teamwork", "Engineering Life", "Sprint"],
      content: `Akibat perubahan arsitektur mendasar pada sistem, tim kami harus mengerahkan ekstra effort yang cukup intens... seru juga menjalaninya!

Rekor meeting teknis maraton hingga 4 jam sampai menjelang sahur dan pergantian hari menjadi pengalaman berharga tentang arti dedikasi dan komitmen tim dalam menghadirkan fitur yang stabil dan tepat waktu.

Momen-momen seperti ini yang memperkaya jam terbang, memperluas wawasan teknis, dan memperkuat rasa cinta terhadap apa yang dikerjakan.`
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
      id: "uph",
      school: "Universitas Pelita Harapan (UPH)",
      degree: "Bachelor of Engineering (B.Eng.) — Computer Engineering",
      faculty: "Department of Information Technology",
      period: "2022 — 2026",
      gpa: "3.6 / 4.0",
      location: "Tangerang, Indonesia",
      badge: "DNA Storage & GPU CUDA Research",
      highlights: [
        "High-Performance Computing & DNA Storage: Joined an advanced interdisciplinary research team investigating synthetic DNA Data Storage as an ultra-high-density biological memory medium, engineering parallel computing pipelines and high-throughput biological data processing accelerated with NVIDIA GPU CUDA.",
        "Springer Nature Publication: Co-authored and published a peer-reviewed academic research paper in Springer Nature — Communications in Computer and Information Science (CCIS) Series exploring string-matching algorithmic optimizations and KMP algorithm limitations for SQL Injection detection using Aho-Corasick algorithms."
      ],
      publications: [
        {
          title: "Comparative Analysis of String Matching Algorithms for SQL Injection Detection in Modern Web Architectures",
          publisher: "Springer Nature (CCIS Series)",
          type: "Peer-Reviewed Conference Paper"
        }
      ],
      tags: ["DNA Data Storage", "NVIDIA CUDA (C++)", "High-Performance Computing", "Bioinformatics", "Parallel Processing", "Springer Nature", "Algorithm Optimization"]
    },
    {
      id: "smkn1-ciomas",
      school: "SMK Negeri 1 Ciomas",
      degree: "Vocational Diploma — Software Engineering (RPL)",
      faculty: "Computer Science & Informatics",
      period: "2016 — 2019",
      gpa: "Honor Graduate",
      location: "Bogor, Indonesia",
      badge: "ASEAN Top 10 Game Dev",
      highlights: [
        "Web Engineering & Developer Community: Mastered core software engineering fundamentals (HTML5, CSS3, JavaScript, data structures); co-founded a peer web developer community with fellow interns to deliver technical mentoring and knowledge-sharing workshops.",
        "ASEAN Top 10 Game Developer: Clinched Top 10 Finalist standing in an ASEAN-level Game Development Championship, securing institutional development grants dedicated to upgrading the school's Software Engineering (RPL) Computer Lab.",
        "Student Leadership (OSIS): Active leadership member of the Student Council (OSIS), organizing school-wide technology initiatives and cultivating collaborative leadership skills."
      ],
      tags: ["Software Engineering", "Game Development", "Web Technologies", "Algorithms", "Leadership (OSIS)", "Community Mentorship"]
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

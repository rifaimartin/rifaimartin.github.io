// Bank Soal & Modul Psikotes Perbankan Indonesia (BCA, Mandiri, BRI, BNI, BI, blu)
// Kategori: Numerik, Verbal, Figural, Ketelitian Data (Clerical), dan Situational Judgement (SJT)

export const PSIKOTEST_CATEGORIES = {
  numerical: {
    id: "numerical",
    name: "Kemampuan Numerik & Aritmatika",
    shortName: "Numerik",
    icon: "Calculator",
    color: "#2563eb",
    desc: "Deret angka bertingkat, aritmatika finansial, margin laba-rugi, bunga & persentase.",
    targetTimePerQuestion: 45 // detik
  },
  verbal: {
    id: "verbal",
    name: "Penalaran Verbal & Silogisme",
    shortName: "Verbal",
    icon: "BookOpen",
    color: "#7c3aed",
    desc: "Analogi konsep finansial, silogisme deduktif mutlak, & penalaran logis.",
    targetTimePerQuestion: 35
  },
  figural: {
    id: "figural",
    name: "Penalaran Figural & Spasial",
    shortName: "Figural",
    icon: "Shapes",
    color: "#059669",
    desc: "Pola matriks geometris 3x3, transformasi deret bangun, & rotasi visual.",
    targetTimePerQuestion: 40
  },
  clerical: {
    id: "clerical",
    name: "Ketelitian Data & Kecepatan Clerical",
    shortName: "Ketelitian",
    icon: "FileCheck",
    color: "#ea580c",
    desc: "Pencocokan nomor rekening nasabah, kode transaksi, & deteksi angka hilang.",
    targetTimePerQuestion: 20
  },
  sjt: {
    id: "sjt",
    name: "Situational Judgement Test (SJT) Perbankan",
    shortName: "SJT Bank",
    icon: "ShieldAlert",
    color: "#0891b2",
    desc: "Studi kasus integritas perbankan, pelayanan nasabah, mitigasi fraud, & etika ODP.",
    targetTimePerQuestion: 50
  }
};

export const PSIKOTEST_QUESTIONS = [
  // ==========================================
  // 1. NUMERIK & ARITMATIKA FINANSIAL
  // ==========================================
  {
    id: "num-1",
    category: "numerical",
    type: "Deret Angka Bertingkat",
    question: "Tentukan angka selanjutnya pada deret berikut: 4, 9, 19, 39, 79, ...",
    options: ["149", "159", "169", "179", "189"],
    correctIndex: 1,
    explanation: "Pola deret adalah dikali 2 lalu ditambah 1 (×2 + 1):\n• 4 × 2 + 1 = 9\n• 9 × 2 + 1 = 19\n• 19 × 2 + 1 = 39\n• 39 × 2 + 1 = 79\n• 79 × 2 + 1 = 159.\nJawaban yang benar adalah 159.",
    tag: "Deret Aritmatika"
  },
  {
    id: "num-2",
    category: "numerical",
    type: "Deret Angka Dua Tingkat (Lompat)",
    question: "Tentukan dua angka selanjutnya dari deret: 3, 8, 6, 16, 12, 32, 24, ..., ...",
    options: ["48, 64", "64, 48", "64, 36", "48, 36", "36, 64"],
    correctIndex: 1,
    explanation: "Deret ini terdiri dari 2 pola selang-seling:\n• Deret 1 (posisi ganjil): 3, 6, 12, 24, (berikutnya: 24 × 2 = 48)\n• Deret 2 (posisi genap): 8, 16, 32, (berikutnya: 32 × 2 = 64)\nUrutan berikutnya adalah posisi genap ke-8 (64) lalu posisi ganjil ke-9 (48). Maka hasilnya: 64, 48.",
    tag: "Deret Lompat"
  },
  {
    id: "num-3",
    category: "numerical",
    type: "Aritmatika Finansial & Bunga Tabungan",
    question: "Nasabah mendepositokan dana Rp 50.000.000 dengan suku bunga tunggal 6% per tahun. Berapakah total saldo akhir setelah 8 bulan jika dipotong pajak bunga 20%?",
    options: ["Rp 51.600.000", "Rp 52.000.000", "Rp 52.400.000", "Rp 51.800.000", "Rp 52.200.000"],
    correctIndex: 0,
    explanation: "Langkah perhitungan:\n1. Bunga kotor 8 bulan = Rp 50.000.000 × 6% × (8/12) = Rp 2.000.000\n2. Pajak bunga (20%) = 20% × Rp 2.000.000 = Rp 400.000\n3. Bunga bersih = Rp 2.000.000 - Rp 400.000 = Rp 1.600.000\n4. Saldo akhir = Rp 50.000.000 + Rp 1.600.000 = Rp 51.600.000.",
    tag: "Bunga & Pajak"
  },
  {
    id: "num-4",
    category: "numerical",
    type: "Persentase Margin & Laba Rugi",
    question: "Sebuah portofolio investasi mengalami penurunan nilai sebesar 20% pada kuartal I. Berapa persentase kenaikan yang dibutuhkan pada kuartal II agar nilainya kembali ke modal awal semula?",
    options: ["20%", "22.5%", "25%", "30%", "33.3%"],
    correctIndex: 2,
    explanation: "Misal modal awal = 100.\n• Setelah turun 20%, nilai menjadi 80.\n• Untuk kembali dari 80 ke 100, dibutuhkan kenaikan sebesar (100 - 80) = 20.\n• Persentase kenaikan dari nilai 80 = (20 / 80) × 100% = 25%.\nJawaban yang benar adalah 25%.",
    tag: "Persentase Pemulihan"
  },
  {
    id: "num-5",
    category: "numerical",
    type: "Deret Pecahan & Rasio",
    question: "Tentukan nilai x pada deret: 1/2, 3/4, 9/8, 27/16, x",
    options: ["54/32", "81/32", "81/64", "64/32", "108/64"],
    correctIndex: 1,
    explanation: "Perhatikan pola pembilang dan penyebut:\n• Pembilang: 1, 3, 9, 27, (dikali 3) → 27 × 3 = 81\n• Penyebut: 2, 4, 8, 16, (dikali 2) → 16 × 2 = 32\nMaka nilai x adalah 81/32.",
    tag: "Deret Pecahan"
  },
  {
    id: "num-6",
    category: "numerical",
    type: "Perbandingan Berbalik Nilai (Kecepatan Kerja)",
    question: "Tim verifikasi data beranggotakan 6 analis mampu memvalidasi 1.200 berkas kredit dalam waktu 4 hari. Jika bank ingin menyelesaikan 1.200 berkas yang sama dalam waktu 3 hari, berapa analis tambahan yang harus ditugaskan?",
    options: ["1 analis", "2 analis", "3 analis", "4 analis", "5 analis"],
    correctIndex: 1,
    explanation: "Total beban kerja = 6 orang × 4 hari = 24 orang-hari.\n• Untuk selesai dalam 3 hari, dibutuhkan tenaga = 24 / 3 = 8 analis.\n• Analis tambahan = 8 - 6 = 2 analis tambahan.",
    tag: "Perbandingan Kerja"
  },

  // ==========================================
  // 2. PENALARAN VERBAL & SILOGISME
  // ==========================================
  {
    id: "verb-1",
    category: "verbal",
    type: "Analogi Hubungan Kata Finansial",
    question: "DEPOSITO : BUNGA = SAHAM : ...",
    options: ["DIVIDEN", "MODAL", "OBLIGASI", "LIKUIDITAS", "KREDIT"],
    correctIndex: 0,
    explanation: "Hubungan analogi adalah Instrumen Keuangan : Imbal Hasil Keuntungan yang diperoleh pemegang instrumen.\n• Deposito menghasilkan imbal hasil berupa Bunga.\n• Saham menghasilkan imbal hasil berupa Dividen.",
    tag: "Analogi Kata"
  },
  {
    id: "verb-2",
    category: "verbal",
    type: "Analogi Fungsi & Regulasi",
    question: "BANK INDONESIA : MONETER = OTORITAS JASA KEUANGAN : ...",
    options: ["FISKAL", "PENGAWASAN PERBANKAN & PASAR MODAL", "PAJAK NEGARA", "ANGGARAN BELANJA", "DISTRIBUSI UANG KERTAS"],
    correctIndex: 1,
    explanation: "Hubungan analogi adalah Lembaga : Wewenang Utama.\n• Bank Indonesia berwenang mengatur Kebijakan Moneter & Sistem Pembayaran.\n• OJK (Otoritas Jasa Keuangan) berwenang mengatur dan mengawasi sektor industri perbankan, pasar modal, dan IKNB.",
    tag: "Analogi Finansial"
  },
  {
    id: "verb-3",
    category: "verbal",
    type: "Silogisme Logika Deduktif (Semua & Sebagian)",
    question: "Premis 1: Semua nasabah prioritas memiliki saldo rekening di atas 500 juta rupiah.\nPremis 2: Sebagian nasabah prioritas adalah pengusaha ekspor-impor.\nKesimpulan yang paling valid dan mutlak benar adalah:",
    options: [
      "Semua pengusaha ekspor-impor memiliki saldo di atas 500 juta rupiah.",
      "Sebagian orang yang memiliki saldo di atas 500 juta rupiah adalah pengusaha ekspor-impor.",
      "Semua nasabah dengan saldo di atas 500 juta rupiah adalah nasabah prioritas.",
      "Pengusaha ekspor-impor yang bukan nasabah prioritas tidak memiliki saldo 500 juta rupiah.",
      "Tidak ada pengusaha ekspor-impor yang memiliki saldo di bawah 500 juta rupiah."
    ],
    correctIndex: 1,
    explanation: "Dari Premis 1 dan 2:\n• Ada kelompok 'Pengusaha ekspor-impor yang merupakan nasabah prioritas'.\n• Karena mereka nasabah prioritas, maka berdasarkan Premis 1 mereka pasti memiliki saldo di atas 500 juta rupiah.\n• Maka kesimpulan valid: 'Sebagian orang yang memiliki saldo di atas 500 juta rupiah adalah pengusaha ekspor-impor'.",
    tag: "Silogisme Formal"
  },
  {
    id: "verb-4",
    category: "verbal",
    type: "Silogisme Bersyarat (Modus Tollens)",
    question: "Premis 1: Jika sistem core banking mengalami downtime, maka transaksi transfer antarbank ditunda.\nPremis 2: Transaksi transfer antarbank hari ini diproses secara instan dan tidak ditunda.\nKesimpulan yang benar adalah:",
    options: [
      "Sistem core banking sedang dalam masa pemeliharaan rutin.",
      "Sistem core banking tidak mengalami downtime hari ini.",
      "Terjadi lonjakan volume transaksi transfer antarbank.",
      "Transaksi diproses melalui jaringan manual cabang.",
      "Sistem core banking mengalami peningkatan kecepatan."
    ],
    correctIndex: 1,
    explanation: "Pola Modus Tollens:\n• Jika P maka Q (P → Q)\n• Tidak Q (~Q)\n• Maka kesimpulan: Tidak P (~P), yaitu 'Sistem core banking tidak mengalami downtime hari ini'.",
    tag: "Modus Tollens"
  },
  {
    id: "verb-5",
    category: "verbal",
    type: "Antonim & Istilah Baku Finansial",
    question: "Lawan kata (Antonim) yang paling tepat dari kata DEPRESIASI adalah:",
    options: ["DEVALUASI", "APRESIASI", "AMORTISASI", "DEFLASI", "STAGNASI"],
    correctIndex: 1,
    explanation: "Depresiasi berarti penurunan nilai aktiva/mata uang seiring berjalannya waktu. Lawan katanya adalah Apresiasi (kenaikan/peningkatan nilai mata uang atau aset).",
    tag: "Antonim"
  },

  // ==========================================
  // 3. PENALARAN FIGURAL & SPASIAL (SVG RENDERING)
  // ==========================================
  {
    id: "fig-1",
    category: "figural",
    type: "Pola Matriks Rotasi Geometri",
    question: "Perhatikan pola rotasi jarum jam pada gambar. Pada setiap langkah, garis berputar searah jarum jam sebesar 45° dan titik hitam bertambah 1. Bentuk manakah yang melengkapi pola ke-4?",
    visualType: "matrix-rotation",
    options: ["Rotasi 135° dengan 4 titik", "Rotasi 180° dengan 3 titik", "Rotasi 225° dengan 4 titik", "Rotasi 90° dengan 4 titik", "Rotasi 135° dengan 3 titik"],
    correctIndex: 0,
    explanation: "Analisis pola:\n1. Posisi garis berputar: 0° → 45° → 90° → Langkah ke-4 adalah 135° (searah jarum jam).\n2. Jumlah titik: 1 → 2 → 3 → Langkah ke-4 memiliki 4 titik.\nMaka pilihan yang tepat adalah 'Rotasi 135° dengan 4 titik'.",
    tag: "Rotasi Geometri"
  },
  {
    id: "fig-2",
    category: "figural",
    type: "Klasifikasi Figural (Odd-One-Out)",
    question: "Di antara 5 susunan bentuk berikut, manakah bangun yang TIDAK MENGIKUTI aturan simetri lipat yang sama dengan yang lainnya?",
    visualType: "shape-classification",
    options: ["Persegi (4 sumbu simetri)", "Lingkaran (Tak terhingga)", "Segitiga Sama Sisi (3 sumbu simetri)", "Trapesium Sembarang (0 sumbu simetri)", "Persegi Panjang (2 sumbu simetri)"],
    correctIndex: 3,
    explanation: "Semua bangun (Persegi, Lingkaran, Segitiga Sama Sisi, Persegi Panjang) memiliki minimal 2 sumbu simetri lipat, sedangkan Trapesium Sembarang tidak memiliki sumbu simetri lipat sama sekali (asimetris).",
    tag: "Klasifikasi Bangun"
  },
  {
    id: "fig-3",
    category: "figural",
    type: "Deret Penambahan Elemen Bangun Datar",
    question: "Pola bangun: Segitiga (3 sisi) → Segiempat (4 sisi) → Segilima (5 sisi) → Segienam (6 sisi). Di dalam setiap bangun, jumlah garis diagonal selalu meningkat. Bentuk berikutnya adalah:",
    visualType: "polygon-progression",
    options: ["Segitujuh (Heptagon)", "Segidelapan (Oktagon)", "Segienam berarsir", "Lingkaran ganda", "Bintang 5 sudut"],
    correctIndex: 0,
    explanation: "Deret bertambah 1 sisi secara teratur: n = 3, 4, 5, 6 → n berikutnya adalah 7 (Segitujuh / Heptagon).",
    tag: "Deret Sisi Poligon"
  },

  // ==========================================
  // 4. KETELITIAN DATA & CLERICAL SPEED
  // ==========================================
  {
    id: "cle-1",
    category: "clerical",
    type: "Pencocokan Nomor Rekening & Kode Bank",
    question: "Bandingkan Pasangan Data Nasabah berikut:\nKolom A: [5270-1928-8472-9102] - PT MEGAH ABADI SENTOSA\nKolom B: [5270-1928-8472-9102] - PT MEGAH ABADI SENTOSA\nApakah kedua data di atas IDENTIK atau BERBEDA?",
    options: ["SAMA (Identik 100%)", "BERBEDA pada Nomor Rekening", "BERBEDA pada Nama Nasabah", "BERBEDA pada Tanda Hubung", "BERBEDA pada Spasi"],
    correctIndex: 0,
    explanation: "Seluruh karakter pada Kolom A dan Kolom B (angka rekening 5270-1928-8472-9102 dan teks 'PT MEGAH ABADI SENTOSA') sepenuhnya identik tanpa selisih karakter.",
    tag: "Pencocokan Data Rekening"
  },
  {
    id: "cle-2",
    category: "clerical",
    type: "Deteksi Perbedaan Karakter Teliti",
    question: "Periksa kedua kode transaksi settlement berikut:\nKode 1: BIFAST-20260830-9847291048-CGK\nKode 2: BIFAST-20260830-9847291043-CGK\nManakah pernyataan yang benar?",
    options: [
      "Kedua kode SAMA PERSIS",
      "BERBEDA pada digit ke-20 (angka '8' vs '3')",
      "BERBEDA pada tanggal transaksi",
      "BERBEDA pada kode bandara CGK",
      "BERBEDA pada tanda hubung strip"
    ],
    correctIndex: 1,
    explanation: "Perhatikan bagian nomor seri akhir:\n• Kode 1: ...9847291048-CGK (berakhiran 8)\n• Kode 2: ...9847291043-CGK (berakhiran 3)\nTerdapat perbedaan pada digit terakhir nomor seri transaksi.",
    tag: "Deteksi Kode Transaksi"
  },
  {
    id: "cle-3",
    category: "clerical",
    type: "Tes Huruf / Angka Hilang Cepat",
    question: "Diberikan barisan abjad acak: [B - F - K - P - U - Z]. Manakah abjad di bawah ini yang melompati pola yang sama (+5 langkah)?",
    options: ["C - H - M - R - W", "A - F - K - P - U", "D - I - N - S - X", "E - J - O - T - Y", "Semua opsi di atas memiliki pola selisih +5 yang konsisten"],
    correctIndex: 4,
    explanation: "Seluruh opsi (A(+5)F(+5)K(+5)P(+5)U, C(+5)H(+5)M(+5)R(+5)W, D(+5)I(+5)N(+5)S(+5)X, E(+5)J(+5)O(+5)T(+5)Y) semuanya mengikuti lompatan konsisten 5 huruf.",
    tag: "Pola Huruf Cepat"
  },

  // ==========================================
  // 5. SITUATIONAL JUDGEMENT TEST (SJT) PERBANKAN
  // ==========================================
  {
    id: "sjt-1",
    category: "sjt",
    type: "Integritas & Kepatuhan Prosedur (SOP)",
    question: "Seorang nasabah prioritas terburu-buru dan meminta Anda sebagai Relationship Manager/Officer untuk memproses pencairan deposito senilai Rp 500 juta tanpa membawa KTP asli dengan janji KTP akan diantarkan sore hari. Bagaimana tindakan terbaik Anda?",
    options: [
      "Menyetujui pencairan langsung demi menjaga kepuasan dan loyalitas nasabah prioritas tersebut.",
      "Menolak dengan sopan dan menjelaskan bahwa verifikasi identitas fisik asli adalah SOP wajib regulasi perbankan demi keamanan dana nasabah sendiri, lalu menawarkan solusi digital banking resmi jika memungkinkan.",
      "Meminta nasabah mentransfer uang muka sebagai jaminan sampai KTP asli diserahkan.",
      "Menyuruh rekan kerja lain yang menandatangani persetujuan berkas agar terhindar dari tanggung jawab.",
      "Memarahi nasabah karena tidak disiplin membawa dokumen identitas resmi."
    ],
    correctIndex: 1,
    explanation: "Prinsip Perbankan Utama: Kepatuhan SOP & Prinsip Kehati-hatian (Prudential Banking). Dokumen KYC wajib diverifikasi sebelum transaksi debit/pencairan. Menolak secara sopan dengan mengedepankan edukasi keamanan dana nasabah adalah wujud integritas dan service excellence tertinggi.",
    tag: "Integritas & KYC"
  },
  {
    id: "sjt-2",
    category: "sjt",
    type: "Penanganan Error Transaksi & Transparansi",
    question: "Saat bertugas memantau settlement transfer antarbank malam hari, Anda menemukan anomali duplikasi transaksi debet senilai Rp 50 juta pada akun seorang nasabah akibat kegagalan timeout switcher pihak ketiga. Apa langkah prioritas pertama Anda?",
    options: [
      "Mendiamkan masalah tersebut dan menunggu apakah nasabah membuat komplain resmi di call center keesokan harinya.",
      "Segera membuat laporan insiden teknis (IT incident ticket), mengisolasi log transaksi, dan mengoordinasikan prosedur auto-reversal/refund dana sesuai SLA perbankan sebelum rekonsiliasi harian ditutup.",
      "Menghapus data log transaksi dari database agar sistem tidak tampak mengalami error.",
      "Menyalahkan vendor pihak ketiga secara terbuka di grup komunikasi publik.",
      "Mematikan seluruh server agar tidak ada transaksi lain yang masuk."
    ],
    correctIndex: 1,
    explanation: "Standar ODP/IT Middleware Bank: Bertindak cepat (proactive mitigation), transparansi insiden, menjaga integritas saldo nasabah melalui mekanisme auto-reversal/reconciliation berdasar SLA resmi.",
    tag: "Mitigasi Insiden Sistem"
  },
  {
    id: "sjt-3",
    category: "sjt",
    type: "Kolaborasi Tim & Manajemen Konflik ODP",
    question: "Dalam proyek squad peluncuran fitur baru aplikasi perbankan digital, terjadi perbedaan pendapat tajam antara tim Product (menginginkan rilis cepat tanpa jeda) dan tim Security/Middleware (menemukan celah enkripsi minor yang butuh penundaan 2 hari). Sebagai Squad Lead / ODP, apa sikap Anda?",
    options: [
      "Mengabaikan temuan tim Security agar target rilis Product Manager tidak tertunda.",
      "Memfasilitasi sesi mitigasi risiko bersama: memaparkan dampak celah keamanan secara objektif, menyepakati perbaikan patch 2 hari, dan membuat rencana komunikasi peluncuran yang disesuaikan.",
      "Membiarkan kedua tim berdebat tanpa batas waktu.",
      "Memutuskan sendiri tanpa mendengarkan penjelasan teknis kedua belah pihak.",
      "Membatalkan seluruh proyek peluncuran fitur secara permanen."
    ],
    correctIndex: 1,
    explanation: "Kepemimpinan ODP Bank: Mengedepankan Risk Management, kolaborasi konstruktif (squad synergy), dan transparansi dampak bisnis vs keamanan data nasabah.",
    tag: "Leadership & Risk Management"
  }
];

// Feedback coaching rule engine berdasarkan distribusi persentase skor
export function generatePsychotestFeedback(categoryScores, totalScore) {
  const recommendations = [];

  // Feedback spesifik per kategori
  if (categoryScores.numerical < 70) {
    recommendations.push({
      category: "Kemampuan Numerik",
      status: "Perlu Latihan Intensif",
      advice: "Perbanyak latihan pola deret lompat 2 tingkat (×2+1, fibonacci) dan hafalkan formula cepat margin laba/rugi, diskon bertingkat, serta perhitungan bunga neto setelah pajak 20%."
    });
  } else {
    recommendations.push({
      category: "Kemampuan Numerik",
      status: "Sangat Baik",
      advice: "Kemampuan logika aritmatika dan analisis kuantitatif Anda sudah matang untuk standar seleksi ODP/MT Bank."
    });
  }

  if (categoryScores.verbal < 70) {
    recommendations.push({
      category: "Penalaran Verbal",
      status: "Tingkatkan Pemahaman",
      advice: "Fokus pada pemahaman relasi analogi kata finansial (Instrumen : Imbal Hasil) dan jangan menggunakan asumsi di luar premis mutlak pada soal silogisme deduktif."
    });
  } else {
    recommendations.push({
      category: "Penalaran Verbal",
      status: "Kuat",
      advice: "Kemampuan penalaran deduktif dan semantik bahasa perbankan Anda berada di persentil atas."
    });
  }

  if (categoryScores.figural < 70) {
    recommendations.push({
      category: "Penalaran Figural",
      status: "Latih Penglihatan Pola",
      advice: "Gunakan metode eliminasi sudut rotasi bertahap (45°, 90°, 180°) dan perhatikan perubahan jumlah elemen simetris dalam matriks visual 3x3."
    });
  } else {
    recommendations.push({
      category: "Penalaran Figural",
      status: "Tajam",
      advice: "Daya abstraksi spasial dan kecepatan analisis visual matriks Anda sangat solid."
    });
  }

  if (categoryScores.clerical < 75) {
    recommendations.push({
      category: "Ketelitian Data (Clerical)",
      status: "Fokus & Konsentrasi",
      advice: "Latih teknik scanning angka dari kiri ke kanan dengan kecepatan konstan tanpa mengulang pandangan, khususnya pada digit-digit akhir nomor rekening."
    });
  } else {
    recommendations.push({
      category: "Ketelitian Data",
      status: "Tinggi & Presisi",
      advice: "Tingkat akurasi pencocokan data Anda memenuhi kualifikasi ketat backoffice dan operational risk bank."
    });
  }

  if (categoryScores.sjt < 75) {
    recommendations.push({
      category: "Situational Judgement (SJT)",
      status: "Pahami Core Values",
      advice: "Selalu prioritaskan prinsip kehati-hatian perbankan (Prudential Banking), kepatuhan SOP anti-fraud, dan komunikasi solutif yang berorientasi pada kepuasan nasabah."
    });
  } else {
    recommendations.push({
      category: "Situational Judgement (SJT)",
      status: "Integritas Unggul",
      advice: "Pola pengambilan keputusan Anda selaras dengan etika profesional dan nilai integritas perbankan nasional."
    });
  }

  // Predikat kelulusan
  let grade = "C";
  let gradeTitle = "Perlu Banyak Latihan";
  let badgeColor = "#ef4444";
  let summary = "Hasil latihan Anda menunjukkan beberapa aspek yang masih memerlukan pendalaman sebelum mengikuti tes seleksi sesungguhnya.";

  if (totalScore >= 85) {
    grade = "A+";
    gradeTitle = "ODP / MT Bank Ready (Sangat Memenuhi Syarat)";
    badgeColor = "#10b981";
    summary = "Luar biasa! Skor Anda berada di atas ambang batas (passing grade) seleksi Officer Development Program (ODP) bank terkemuka.";
  } else if (totalScore >= 70) {
    grade = "B+";
    gradeTitle = "Memenuhi Syarat (Siap Bersaing)";
    badgeColor = "#2563eb";
    summary = "Bagus! Anda telah melampaui passing grade standar. Tingkatkan sedikit kecepatan pengerjaan pada kategori dengan waktu terbatas.";
  }

  return {
    grade,
    gradeTitle,
    badgeColor,
    summary,
    recommendations
  };
}

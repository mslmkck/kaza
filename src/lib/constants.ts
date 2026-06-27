// Application Constants
export const APP_NAME = "KazaDanış";
export const APP_DESCRIPTION = "Trafik kazası ve ceza itiraz danışmanlığı platformu";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/giris",
  REGISTER: "/kayit",
  FORGOT_PASSWORD: "/sifre-unuttum",
  RESET_PASSWORD: "/sifre-sifirla",
  DASHBOARD: "/panel",
  ACCIDENT_WIZARD: "/kaza-danismani",
  FINE_ANALYSIS: "/ceza-analizi",
  PETITION_BUILDER: "/dilekce-olustur",
  ACCIDENT_DIAGRAM: "/kaza-krokisi",
  DOCUMENTS: "/belgeler",
  QUESTIONS: "/sorular",
  PROFILE: "/profil",
  SETTINGS: "/ayarlar",
  ADMIN: "/yonetim",
  ADMIN_DASHBOARD: "/yonetim",
  ADMIN_USERS: "/yonetim/kullanicilar",
  ADMIN_EXPERTS: "/yonetim/uzmanlar",
  ADMIN_CASES: "/yonetim/dosyalar",
  ADMIN_QUESTIONS: "/yonetim/sorular",
  ADMIN_TEMPLATES: "/yonetim/sablonlar",
  ADMIN_CONTENT: "/yonetim/icerik",
  ADMIN_NOTIFICATIONS: "/yonetim/bildirimler",
  ADMIN_REPORTS: "/yonetim/raporlar",
  LEGAL_PRIVACY: "/gizlilik",
  LEGAL_TERMS: "/kullanim-sartlari",
  LEGAL_KVKK: "/kvkk",
  LEGAL_COOKIES: "/cereezler",
  GUIDES: "/rehberler",
  GUIDE_DETAIL: "/rehberler/:slug",
  FAQ: "/sss",
  CONTACT: "/iletisim",
} as const;

export const ACCIDENT_TYPES = [
  { value: "material_only", label: "Yalnızca Maddi Hasarlı", description: "Yaralanan yok, sadece araç hasarı" },
  { value: "with_injury", label: "Yaralanmalı", description: "Hafif veya ağır yaralı olan var" },
  { value: "with_death", label: "Ölümlü", description: "Kazada ölen kişi var" },
  { value: "hit_and_run", label: "Kaçak", description: "Taraflardan biri olay yerinden kaçtı" },
  { value: "public_property", label: "Kamu Malı Zararı", description: "Yol, ışık, levha vb. kamu malına zarar" },
  { value: "multiple_vehicles", label: "Çoklu Araç", description: "2'den fazla araç karışık" },
] as const;

export const VEHICLE_TYPES = [
  { value: "car", label: "Otomobil" },
  { value: "motorcycle", label: "Motosiklet" },
  { value: "truck", label: "Kamyon/Tır" },
  { value: "bus", label: "Otobüs/Midibüs" },
  { value: "bicycle", label: "Bisiklet" },
  { value: "other", label: "Diğer" },
] as const;

export const INSURANCE_STATUS = [
  { value: "valid", label: "Geçerli" },
  { value: "expired", label: "Süresi Dolmuş" },
  { value: "none", label: "Sigortası Yok" },
  { value: "unknown", label: "Bilinmiyor" },
] as const;

export const DAMAGE_AREAS = [
  "Ön Tampon",
  "Arka Tampon",
  "Ön Sol Kapı",
  "Ön Sağ Kapı",
  "Arka Sol Kapı",
  "Arka Sağ Kapı",
  "Sol Yan Tampon",
  "Sağ Yan Tampon",
  "Tavan",
  "Motor Kaputu",
  "Bagaj Kaputu",
  "Ön Far (Sol)",
  "Ön Far (Sağ)",
  "Arka Far (Sol)",
  "Arka Far (Sağ)",
  "Ön Cam",
  "Arka Cam",
  "Yan Camlar",
  "Jant/Lastik",
  "Şasi",
  "Diğer",
] as const;

export const INTERSECTION_TYPES = [
  { value: "four_way", label: "4'lü Kavşak" },
  { value: "t_junction", label: "T Kavşağı" },
  { value: "roundabout", label: "Dönel Kavşak" },
  { value: "y_junction", label: "Y Kavşağı" },
  { value: "interchange", label: "Geçit Kavşağı" },
  { value: "none", label: "Kavşak Değil (Açık Yol)" },
] as const;

export const WEATHER_CONDITIONS = [
  { value: "clear", label: "Açık/Güneşli" },
  { value: "cloudy", label: "Bulutlu" },
  { value: "rainy", label: "Yağmurlu" },
  { value: "snowy", label: "Karlı" },
  { value: "foggy", label: "Sisli" },
  { value: "icy", label: "Buzlu/Donmuş" },
  { value: "windy", label: "Rüzgarlı" },
] as const;

export const ROAD_CONDITIONS = [
  { value: "dry", label: "Kuru" },
  { value: "wet", label: "Islak" },
  { value: "icy", label: "Buzlu" },
  { value: "snowy", label: "Karlı" },
  { value: "gravel", label: "Çakıllı/Kumlu" },
  { value: "damaged", label: "Yaralı/Çukurlu" },
  { value: "under_construction", label: "Yapımda/Bakımda" },
] as const;

export const MANEUVERS = [
  "Düz Gidiş",
  "Sola Dönüş",
  "Sağa Dönüş",
  "U Dönüşü",
  "Geri Vites",
  "Parktan Çıkış",
  "Parke Girme",
  "Şerit Değişikliği (Sol)",
  "Şerit Değişikliği (Sağ)",
  "Geçiş Yapma",
  "Durma/Durulma",
  "Yaya Geçidi Verme",
  "Yol Verme",
  "Kırmızı Işıkta Geçiş",
  "Sarı Işıkta Geçiş",
] as const;

export const COLLISION_POINTS = [
  "Ön-Ön (Düz Çarpışma)",
  "Ön-Arka (Arkadan Çarpma)",
  "Ön-Sol Yan",
  "Ön-Sağ Yan",
  "Arka-Sol Yan",
  "Arka-Sağ Yan",
  "Sol Yan-Sol Yan (Yan yana)",
  "Sağ Yan-Sağ Yan (Yan yana)",
  "Köşe Çarpışması",
  "Araç Dönüş Sırası",
] as const;

export const TRAFFIC_SIGNS = [
  "Dur Levhası",
  "Yol Ver Levhası",
  "Kırmızı Işık",
  "Sarı Işık",
  "Yeşil Işık",
  "Maksimum Hız Limiti",
  "Geçiş Yasak",
  "Sola Dönüş Yasak",
  "Sağa Dönüş Yasak",
  "U Dönüşü Yasak",
  "Geçiş Yapma Yasak",
  "Yaya Geçidi",
  "Okul Bölgesi",
  "Hastane Bölgesi",
  "Tehlikeli Viraj",
  "Diğer",
] as const;

export const OBJECTION_REASONS = [
  {
    category: "plaka_yanlis",
    title: "Plakanın Yanlış Okunması",
    description: "Ceza tutanağında plaka yanlış yazılmış veya okunmuş",
    requiredDocuments: ["Araç ruhsatı fotokopisi", "Plaka fotoğrafı"],
    evidence: ["Plaka tanıma kamerası kaydı", "Polis durdurma tutanağı"],
    notes: "Plaka harf/rakam karışımı veya yabancı plaka okuma hatası olabilir",
  },
  {
    category: "tebligat_sorunu",
    title: "Tebligat Problemi",
    description: "Ceza kullanıcıya tebliğ edilmemiş veya tebligat hukuka aykırı yapılmış",
    requiredDocuments: ["Tebligat belgesi", "Adres kayıt belgesi"],
    evidence: ["PTT tebligat izleme numarası", "Adres değişiklik belgesi"],
    notes: "Tebligat tarihinden itibaren 15 gün içinde itiraz edilebilir",
  },
  {
    category: "radar_olcum",
    title: "Radar Ölçümüne İlişkin İtiraz",
    description: "Radar cihazı kalibrasyonu, konumu veya ölçüm yöntemi hatalı",
    requiredDocuments: ["Radar kalibrasyon belgesi", "Cihaz onay belgesi"],
    evidence: ["Kalibrasyon tarihi", "Cihaz tipi ve seri numarası"],
    notes: "Radar cihazları yılda bir kez kalibre edilmelidir",
  },
  {
    category: "isaret_gorunmez",
    title: "Trafik İşaretinin Görünür Olmaması",
    description: "İhlal edilen trafik işareti kapalı, yanlış yerde veya görünmez durumda",
    requiredDocuments: ["İşaretin fotoğrafı", "Yerel belediye yazısı"],
    evidence: ["Tarihli fotoğraf", "Görüşlü tanık beyanı"],
    notes: "İşaretin görüş mesafesi ve yüzey durumu önemlidir",
  },
  {
    category: "hatali_park",
    title: "Hatalı Park Cezası",
    description: "Park yeri işaretleri yok, yanlış veya park edilebilecek yerde ceza yazılmış",
    requiredDocuments: ["Park yerinin fotoğrafı", "İşaret levhalarının fotoğrafı"],
    evidence: ["Harita/uydu görüntüsü", "Belediye park yeri listesi"],
    notes: "Engelli park alanında park cezası ayrı değerlendirilir",
  },
  {
    category: "engelli_park",
    title: "Engelli Park Alanı Uyuşmazlığı",
    description: "Engelli park belgesi varken ceza yazılmış veya alan engelli parkı değil",
    requiredDocuments: ["Engelli park belgesi", "Araç ruhsatı", "Park yerinin fotoğrafı"],
    evidence: ["Engelli kimlik kartı", "Belediye onayı"],
    notes: "Engelli park belgesi geçerli ve aracın üzerinde olmalıdır",
  },
  {
    category: "cift_ceza",
    title: "Aynı Fiil İçin Birden Fazla Ceza",
    description: "Aynı zaman, yer ve ihlal için birden fazla ceza tutanağı düzenlenmiş",
    requiredDocuments: ["Her iki ceza tutanağı", "Zaman/yер kanıtı"],
    evidence: ["Kamera kayıtları", "Polis tutanak zamanları"],
    notes: "Hukukta 'bis in idem' ilkesiyle aynı fiil için ikinci ceza yazılamaz",
  },
  {
    category: "satis_sonrasi",
    title: "Araç Satışından Sonra Eski Sahibine Cezası",
    description: "Araç satıldıktan sonra eski sahibine ceza yazılmış",
    requiredDocuments: ["Satış sözleşmesi", "Noter tasdikli satış vaadi", "Trafik tescil belgesi"],
    evidence: ["Tescil tarihi", "Teslim tutanağı"],
    notes: "Tescil tarihinden sonraki cezalar yeni sahibindir",
  },
  {
    category: "calinti_plaka",
    title: "Çalıntı/Kopya Plaka İhtimali",
    description: "Araç sahibi değilken plakası kullanılmış (çalıntı/kopya plaka)",
    requiredDocuments: ["Polis durek tutanağı", "Araç muayene belgesi", "Alibi kanıtları"],
    evidence: ["Kamera kayıtları (araç farklıysa)", "Telefon konum kayıtları", "Tanık beyanları"],
    notes: "Durek tutanağı en güçlü kanıttır",
  },
  {
    category: "acil_durum",
    title: "Acil Durum Nedeniyle İhlal",
    description: "Sağlık, yangın, polis takibi gibi acil durum nedeniyle ihlal gerçekleşmiş",
    requiredDocuments: ["Hastane/acil servis raporu", "İtfaiye/polis tutanağı"],
    evidence: ["Acil çağrı kaydı (112, 110, 199)", "Görevli personel beyanı"],
    notes: "Kanunen 'zorunluluk hali' kapsamında değerlendirilebilir",
  },
  {
    category: "maddi_hata",
    title: "Ceza Tutanağında Maddi Hata",
    description: "Tutanağda tarih, saat, konum, madde no, tutar gibi maddi hatalar var",
    requiredDocuments: ["Hatalı tutanak fotokopisi", "Doğru bilgi kanıtları"],
    evidence: ["Resmi kayıtlar", "Kamera/radar verileri"],
    notes: "Maddi hatalar cezanın iptali için yeterli olabilir",
  },
  {
    category: "uyusmazlik",
    title: "Konum, Tarih veya Saat Uyuşmazlığı",
    description: "Tutanağdaki konum, tarih veya saat gerçek olayla uyuşmuyor",
    requiredDocuments: ["Gerçek konum/tarih kanıtları", "Telefon/GPS kayıtları"],
    evidence: ["Navigasyon kayıtları", "İşyeri giriş-çıkış kayıtları", "Market/istasyon fişleri"],
    notes: "Zaman uyuşmazlığı cezanın hukuksuzluğunu kanıtlayabilir",
  },
  {
    category: "kamera_celişki",
    title: "Kamera Görüntüsü ile Tutanak Arasındaki Çelişki",
    description: "Trafik/kamera kayıtları tutanakla çelişiyor",
    requiredDocuments: ["Kamera kaydı kopyası (resmi kurumdan)", "Tutanak fotokopisi"],
    evidence: ["Belediye/POLİS kamerası", "Özel güvenlik kamerası"],
    notes: "Resmi kurumdan kamera kaydı talep edilmesi gerekir",
  },
  {
    category: "madde_uyusmazlik",
    title: "Ceza Maddesinin Olayla Uyuşmaması",
    description: "Yazılan madde numarası işlenen fiille uyuşmuyor",
    requiredDocuments: ["İlgili madde metni", "Olay açıklaması"],
    evidence: ["Mevzuat metni", "Benzer kararlarda danıştay/İçişleri bakanlığı görüşleri"],
    notes: "Hatalı madde uygulanması cezanın kaldırılmasını gerektirir",
  },
] as const;

export const DOCUMENT_TYPES = [
  { value: "fine_decision", label: "Trafik İdari Para Cezası Karar Tutanağı" },
  { value: "notification", label: "Tebligat Belgesi" },
  { value: "identity", label: "Kimlik Fotokopisi" },
  { value: "registration", label: "Ruhsat Fotokopisi" },
  { value: "license", label: "Ehliyet Fotokopisi" },
  { value: "sale_contract", label: "Araç Satış Sözleşmesi" },
  { value: "accident_report", label: "Kaza Tespit Tutanağı" },
  { value: "photos", label: "Fotoğraflar" },
  { value: "camera_record", label: "Kamera Kayıtları" },
  { value: "witness_info", label: "Tanık Bilgileri" },
  { value: "insurance", label: "Sigorta Belgeleri" },
  { value: "expertise_report", label: "Ekspertiz Raporu" },
  { value: "medical_report", label: "Hastane Raporu" },
  { value: "service_invoice", label: "Servis Faturası" },
  { value: "official_correspondence", label: "İlgili Kurum Yazışmaları" },
  { value: "other", label: "Diğer" },
] as const;

export const QUESTION_CATEGORIES = [
  { value: "traffic_accident", label: "Trafik Kazası" },
  { value: "material_damage", label: "Maddi Hasarlı Kaza" },
  { value: "injury_accident", label: "Yaralamalı Kaza" },
  { value: "accident_report", label: "Kaza Tespit Tutanağı" },
  { value: "fault_ratio", label: "Kusur Oranı" },
  { value: "insurance", label: "Sigorta" },
  { value: "vehicle_depreciation", label: "Araç Değer Kaybı" },
  { value: "traffic_fine", label: "Trafik Cezası" },
  { value: "radar_fine", label: "Radar Cezası" },
  { value: "parking_fine", label: "Park Cezası" },
  { value: "license_suspension", label: "Ehliyete El Koyma" },
  { value: "fine_points", label: "Ceza Puanı" },
  { value: "fine_objection", label: "Ceza İtirazı" },
  { value: "documents_petitions", label: "Belge ve Dilekçe" },
] as const;

export const NOTIFICATION_TYPES = [
  { value: "missing_document", label: "Eksik Belge", color: "warning" },
  { value: "expert_answered", label: "Uzman Cevapladı", color: "success" },
  { value: "case_under_review", label: "Dosya İnceleniyor", color: "primary" },
  { value: "info_requested", label: "Ek Bilgi Talep Edildi", color: "warning" },
  { value: "petition_ready", label: "Dilekçe Hazır", color: "success" },
  { value: "deadline_approaching", label: "Yaklaşan Son Tarih", color: "error" },
  { value: "document_reviewed", label: "Belge İncelendi", color: "primary" },
  { value: "case_completed", label: "Dosya Sonuçlandı", color: "success" },
  { value: "payment_required", label: "Ödeme Gerekli", color: "warning" },
  { value: "system", label: "Sistem Bildirimi", color: "muted" },
] as const;

export const USER_ROLES = [
  { value: "visitor", label: "Ziyaretçi" },
  { value: "user", label: "Kayıtlı Kullanıcı" },
  { value: "expert", label: "Uzman Danışman" },
  { value: "lawyer", label: "Avukat" },
  { value: "admin", label: "Yönetici" },
] as const;

export const CASE_STATUSES = [
  { value: "draft", label: "Taslak" },
  { value: "submitted", label: "Gönderildi" },
  { value: "under_review", label: "İnceleniyor" },
  { value: "expert_assigned", label: "Uzman Atandı" },
  { value: "completed", label: "Tamamlandı" },
  { value: "closed", label: "Kapatıldı" },
  { value: "cancelled", label: "İptal Edildi" },
] as const;

export const FINE_STATUSES = [
  { value: "draft", label: "Taslak" },
  { value: "analyzed", label: "Analiz Edildi" },
  { value: "objection_preparing", label: "İtiraz Hazırlanıyor" },
  { value: "objection_submitted", label: "İtiraz Gönderildi" },
  { value: "under_review", label: "İnceleniyor" },
  { value: "accepted", label: "Kabul Edildi (İptal)" },
  { value: "rejected", label: "Reddedildi" },
  { value: "cancelled", label: "İptal Edildi" },
] as const;

export const QUESTION_STATUSES = [
  { value: "new", label: "Yeni" },
  { value: "under_review", label: "İnceleniyor" },
  { value: "awaiting_info", label: "Ek Bilgi Bekleniyor" },
  { value: "answered", label: "Cevaplandı" },
  { value: "closed", label: "Kapatıldı" },
] as const;

export const FILE_TYPES = {
  ALLOWED: [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "video/mp4",
    "video/quicktime",
  ],
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
};

export const LEGAL_DISCLAIMER = `Bu platform tarafından sunulan bilgiler genel bilgilendirme ve ön değerlendirme niteliğindedir. Avukatlık hizmeti, resmi bilirkişi raporu, kesin kusur tespiti veya yargı kararı yerine geçmez. Kullanıcı tarafından girilen bilgilerin doğruluğu kullanıcının sorumluluğundadır.`;

export const AI_CONFIDENCE_LEVELS = [
  { value: "low", label: "Düşük Güven", color: "error", description: "Bilgiler yetersiz veya çelişkili" },
  { value: "medium", label: "Orta Güven", color: "warning", description: "Temel analiz yapılabilir, ek bilgi önerilir" },
  { value: "high", label: "Yüksek Güven", color: "success", description: "Bilgiler yeterli, güvenilir ön değerlendirme" },
] as const;

export const PACKAGES = [
  {
    id: "single_question",
    name: "Tek Soru Paketi",
    price: 99,
    features: ["1 uzman sorusu", "24 saat içinde cevap", "Özel mesajlaşma"],
  },
  {
    id: "fine_objection",
    name: "Ceza İtiraz Paketi",
    price: 299,
    features: ["Ceza analizi", "Dilekçe hazırlama", "Belgeler kontrolü", "1 uzman görüşü"],
  },
  {
    id: "accident_analysis",
    name: "Kaza Analiz Paketi",
    price: 399,
    features: ["Kaza senaryo analizi", "Kusur oranı değerlendirmesi", "Dilekçe ve kroki", "2 uzman görüşü"],
  },
  {
    id: "expert_consultation",
    name: "Uzman Danışmanlık Paketi",
    price: 599,
    features: ["Sınırsız soru (1 ay)", "Öncelikli cevap", "Görüntülü görüşme (30 dk)", "Belge incelemesi"],
  },
  {
    id: "corporate_fleet",
    name: "Kurumsal Filo Paketi",
    price: 1499,
    features: ["10 araç için analiz", "Toplu ceza takibi", "Aylık rapor", "Özel uzman ataması"],
  },
] as const;
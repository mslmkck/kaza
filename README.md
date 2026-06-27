# KazaDanış - Trafik Kazası ve Ceza İtiraz Danışmanlığı Platformu

Türkiye'de kullanılmak üzere, trafik kazaları ve trafik idari para cezaları konusunda kullanıcılara ön bilgilendirme, belge hazırlama, süreç takibi ve uzman danışmanlığı sağlayan modern bir web uygulaması.

## 🚀 Özellikler

- **Kaza Danışmanı**: Trafik kazası sonrasında yapılması gerekenleri adım adım anlatır
- **Ceza Analizi**: Trafik cezasına itiraz edilip edilemeyeceğine dair ön analiz sunar
- **Dilekçe Oluşturucu**: Kişiselleştirilmiş itiraz dilekçesi hazırlar
- **Kaza Krokisi**: Sürükle-bırak sistemiyle basit kaza krokisi hazırlama
- **Uzman Danışmanlığı**: Trafik uzmanlarından ve avukatlardan profesyonel destek
- **Belge Kontrol**: Başvuru için gerekli belgelerin yönetimi

## 🛠️ Teknoloji Stack

### Frontend
- **Next.js 14** - React tabanlı web framework
- **TypeScript** - Tip güvenli kod
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Modern UI bileşenleri
- **Zustand** - State management
- **TanStack Query** - Veri çekme ve cache yönetimi
- **React Hook Form + Zod** - Form yönetimi ve doğrulama
- **jsPDF + docx** - PDF ve Word doküman oluşturma

### Backend (Opsiyonel)
- **Supabase** - Backend as a Service
  - PostgreSQL veritabanı
  - Kimlik doğrulama
  - Gerçek zamanlı veritabanı
  - Dosya depolama
  - Edge Functions

## 📦 Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- (Opsiyonel) Supabase hesabı

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repo-url>
cd kaza
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın**
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyerek Supabase ve diğer yapılandırmaları ayarlayın.

4. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

5. **Tarayıcıda açın**
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── page.tsx           # Ana sayfa
│   ├── giris/            # Giriş sayfası
│   ├── kayit/            # Kayıt sayfası
│   ├── kaza-danismani/   # Kaza danışmanı modülü
│   ├── ceza-analizi/     # Ceza analiz modülü
│   ├── dilekce-olustur/  # Dilekçe oluşturucu
│   ├── panel/            # Kullanıcı paneli
│   ├── yonetim/          # Admin paneli
│   ├── sorular/          # Soru-cevap modülü
│   ├── rehberler/        # Rehber sayfaları
│   └── gizlilik/         # Yasal sayfalar
├── components/
│   ├── ui/               # UI bileşenleri (Button, Card, Input vb.)
│   ├── layout/           # Layout bileşenleri (Navbar, Footer)
│   └── providers/         # Context providers
├── lib/
│   ├── supabase/         # Supabase istemcisi
│   ├── utils.ts          # Yardımcı fonksiyonlar
│   └── constants.ts       # Sabitler ve yapılandırmalar
├── store/                # Zustand state store
├── types/                # TypeScript tipleri
├── hooks/                # Custom React hooks
└── styles/               # Global CSS stilleri
```

## 🔧 Yapılandırma

### Supabase Kurulumu (Opsiyonel)

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje başlatın
3. `.env.local` dosyasında gerekli API anahtarlarını ayarlayın
4. Veritabanı tablolarını oluşturun (schema SQL dosyası için documentation klasörüne bakın)

### Ödeme Entegrasyonu (Gelecek)

Ücretli özellikler için Türkiye uyumlu ödeme sistemi entegrasyonu yapılabilir.

## 📱 Mobil Uyumluluk

Uygulama tamamen responsive tasarlanmıştır ve mobil, tablet ve masaüstü cihazlarda sorunsuz çalışır.

## 🔒 Güvenlik

- Tüm form girişleri hem istemci hem sunucu tarafında doğrulanır
- Hassas veriler şifrelenerek saklanır
- Row Level Security (RLS) ile veri erişim kontrolü
- Rate limiting ile abuse koruması

## ⚠️ Hukuki Uyarı

Bu platform tarafından sunulan bilgiler **genel bilgilendirme ve ön değerlendirme** niteliğindedir:
- Avukatlık hizmeti yerine geçmez
- Resmi bilirkişi raporu yerine geçmez
- Kesin kusur tespiti yerine geçmez
- Yargı kararı yerine geçmez

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel kullanım içindir. Detaylı bilgi için lisans dosyasına bakın.

## 📞 İletişim

Sorularınız için issue açabilir veya iletişim kanallarımızdan bize ulaşabilirsiniz.

---

**Not**: Bu proje geliştirme aşamasındadır. Tüm özellikler tam olarak entegre edilmemiş olabilir.

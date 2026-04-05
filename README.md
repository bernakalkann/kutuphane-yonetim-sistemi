# AI Book Haven (Kütüphane Yönetim Sistemi)

AI Book Haven, kitap yönetimi ve yeni nesil kütüphane işlemleri için geliştirilmiş modern, yapay zeka destekli bir RESTful API (Backend) projesidir.

## Öne Çıkan Özellikler

- **Yapay Zeka (AI) Entegrasyonu:** Google Generative AI (Gemini) kullanılarak kitap verileri üzerinde akıllı analiz ve öneri sistemi.
- **Bulut Depolama:** AWS S3 entegrasyonu ile kitap kapakları ve dosyaların buluta (Presigned URL) güvenli yüklenmesi.
- **Güvenli Mimari:** JWT (JSON Web Token) ile kullanıcı yetkilendirmesi, `bcrypt` ile şifreleme ve `Helmet` & `express-rate-limit` ile API güvenliği.
- **İlişkisel Veri Yönetimi:** PostgreSQL veritabanı ve Sequelize ORM altyapısı kullanılarak yapılandırılmış veri ilişkileri.

## Kullanılan Teknolojiler

- **Core:** Node.js, Express.js
- **Veritabanı & ORM:** PostgreSQL, Sequelize, pg-hstore
- **Kimlik & Güvenlik:** JSON Web Token (JWT), bcryptjs, Helmet, Cors
- **Harici Servisler:** AWS SDK (S3), Google Gemini AI, Multer

## Kurulum ve Çalıştırma

Lokal ortamda test etmek için aşağıdaki adımları izleyebilirsiniz:

1. **Projeyi Klonlayın:**
   ```bash
   git clone https://github.com/bernakalkann/kutuphane-yonetim-sistemi.git
   cd kutuphane-yonetim-sistemi/backend
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Ortam Değişkenlerini (Env) Ayarlayın:**
   Proje kök dizininde bir `.env` dosyası oluşturup aşağıdaki anahtarları kendi bilgilerinizle doldurun:
   - Veritabanı bağlantı URI'si
   - AWS S3 anahtarları
   - Google Gemini API anahtarı
   - JWT Secret anahtarı

4. **Sunucuyu Başlatın:**
   ```bash
   npm run dev
   ```
   *Sunucu varsayılan ayarlarla dinlemeye başlayacaktır.*

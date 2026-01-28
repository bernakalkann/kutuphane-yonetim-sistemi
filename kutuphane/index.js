const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// JSON verisini alabilmek için middleware
app.use(express.json());

// 'public' klasöründeki dosyaları statik olarak sun
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nisaasin12345#',
  database: 'kutuphane'
});

// Kitap ekleme endpoint'i
app.post('/kitap-ekle', (req, res) => {
  const { kitapadi, sayfasayisi, isbnno, puan, turno, yazarno } = req.body;

  const sql = `INSERT INTO kitap (kitapadi, sayfasayisi, isbnno, puan, turno, yazarno)
               VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [kitapadi, sayfasayisi, isbnno, puan, turno, yazarno], (err, results) => {
    if (err) {
      console.error('Kitap ekleme hatası:', err);
      res.status(500).send('Kitap ekleme hatası');
      return;
    }
    res.send('Kitap başarıyla eklendi');
  });
});

// İşlem ekleme endpoint'i
app.post('/islem-ekle', (req, res) => {
  const { kitapno, ogrno, atarih, vtarih } = req.body;

  const sql = `INSERT INTO islem (kitapno, ogrno, atarih, vtarih)
               VALUES (?, ?, ?, ?)`;

  connection.query(sql, [kitapno, ogrno, atarih, vtarih], (err, results) => {
    if (err) {
      console.error('İşlem ekleme hatası:', err);
      res.status(500).send('İşlem ekleme hatası');
      return;
    }
    res.send('İşlem başarıyla eklendi');
  });
});
// Öğrenci ekleme endpoint'i
app.post('/ogrenci-ekle', (req, res) => {
  const { ogrno, ograd, ogrsoyad, cinsiyet, sinif, dtarih, puan } = req.body;

  const sql = `INSERT INTO ogrenci (ogrno, ograd, ogrsoyad, cinsiyet, sinif, dtarih, puan)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [ogrno, ograd, ogrsoyad, cinsiyet, sinif, dtarih, puan], (err, results) => {
    if (err) {
      console.error('Öğrenci ekleme hatası:', err);
      res.status(500).send('Öğrenci ekleme hatası');
      return;
    }
    res.send('Öğrenci başarıyla eklendi');
  });
});


// Kitapları listeleme endpoint'i (HTML olarak)
app.get('/kitaplar', (req, res) => {
  const sql = 'SELECT kitapadi, sayfasayisi FROM kitap';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Kitapları getirme hatası:', err);
      return res.status(500).send('Kitapları getirme hatası');
    }

    let html = `
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Kitap Listesi</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; }
          table { border-collapse: collapse; width: 60%; margin: auto; background: white; }
          th, td { border: 1px solid #ccc; padding: 10px; }
          th { background: #eee; }
          h1 { text-align: center; }
          a { display: block; text-align: center; margin: 20px; text-decoration: none; color: #007bff; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Kitap Listesi</h1>
        <table>
          <tr><th>Kitap Adı</th><th>Sayfa Sayısı</th></tr>`;

    results.forEach(k => {
      html += `<tr><td>${k.kitapadi}</td><td>${k.sayfasayisi}</td></tr>`;
    });

    html += `
        </table>
        <a href="/">Yeni kitap ekle</a>
      </body>
      </html>`;

    res.send(html);
  });
});

// İşlem listesini dönen endpoint
app.get('/islemler', (req, res) => {
  const sql = `SELECT i.islemno, k.kitapadi, o.ograd, i.atarih, i.vtarih
               FROM islem i
               JOIN kitap k ON i.kitapno = k.kitapno
               JOIN ogrenci o ON i.ogrno = o.ogrno`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('İşlem listeleme hatası:', err);
      res.status(500).send('İşlem listeleme hatası');
      return;
    }
    res.json(results);
  });
});


// Öğrencileri listeleme
app.get('/ogrenciler', (req, res) => {
  const sql = 'SELECT * FROM ogrenci';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Öğrenci listeleme hatası:', err);
      res.status(500).send('Hata oluştu');
      return;
    }
    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});

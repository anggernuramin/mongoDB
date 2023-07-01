// Database adalah tempat untuk menyimpan collection
//      Biasanya database digunakan untuk memisahkan data secara logical peraplikasi,Artinya biasanya satu aplikas akan memiliki satu database

// membuat database baru (misal dibawah ini membuat db Ecommerce)
// use Ecommerce

// Perintah Database method
db.getName(); // untuk mengetahui db yang aktif (db yang sedang digunakan)

db.dropDatabase(); // menghapus collection(isi database) dari db yg sedang digunakan

db.version(); // versi db yg sedang digunakan

db.stat(); //Informasi lengkap tentang db

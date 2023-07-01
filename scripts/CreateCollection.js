// Collection adalah tempat untuk menyimpan document pada mongo Db/ isi dari DB

// Membuat Collection customers
db.createCollection("customers");

// Membuat Collection products
db.createCollection("products");

// Membuat Collection orders
db.createCollection("orders");

// Method pada Collection
db.getCollectionNames(); // menampilkan semua collection
db.createCollection("name Collection"); // Membuat collection baru
db.nameCollection; // Menampilkan isi collection
db.nameCollection.find().pretty(); // Menampilkan semua isi dari collection
db.nameCollection.drop(); // menghapus collection
db.nameCollection.totalSize(); // Menampilkan totol ukuran dari collection
db.nameCollection.stats(); // Statistik dari collection

db; // Merepresentasikan db yang sedang aktif

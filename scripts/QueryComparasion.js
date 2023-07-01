// QUERY COMPARASION (Membandingkan 2 Value)

// 1. $eq (equal == sama dengan)
// select * from customers where _id = 'angger'
db.customers.find({
  _id: {
    $eq: "angger",
  },
});
// Maka akan mencari pada collection customers dengan id "angger" pada semua fild

// 2. $qt (greater than == lebih besar)
// select * from products where price > 1000
db.products.find({
  price: {
    $gt: 1000,
  },
});
// Maka akan mencari pada collection product dengan field price yang lebih besar dari 1000

// insert ke collection product untuk tambah data
db.products.insertMany([
  {
    _id: 3,
    name: "Pop Mie Rasa Bakso",
    price: new NumberLong(2500),
    category: "food",
  },
  {
    _id: 4,
    name: "Samsung Galaxy S9+",
    price: new NumberLong(10000000),
    category: "handphone",
  },
  {
    _id: 5,
    name: "Acer Precator XXI",
    price: new NumberLong(25000000),
    category: "laptop",
  },
]);

// 3. KITA BISA MELAKUKAN COMPARASION DENGAN LEBIH DARI 1 FIELD
// select * from products where category in ('handphone', 'laptop') and price > 5000000
db.products.find({
  category: {
    $in: ["handphone", "laptop"],
  },
  price: {
    $gt: 5000000,
  },
});
// Maka akan mencari data dengan field category yang akan membandingkan $in(isi yang ada didalam array,handphone ATAU laptop) dan $qt(field diatas 50000000),SECARA DEFAULT PERBANDINGAN QUERY DIATAS BERNILAI AND ,Maka datanya akan tampil jika query keduanya bernilai true

// METHOD QUERY comparasion
$qte; // Membandingkan value lebih besar sama dengan  value lain
$lt; // Membandingkan value lebih kecil dengan  value lain
$lte; //Membandingkan value lebih kecil sama dengan  value lain
$in; // Membandingkan value dengan value yang ada didalam ARRAY
$nin; // Membandingkan value value dengan value yang TIDAK ADA didalam Array
$ne; // Membandingkan value yang tidak sama dengan value lain (!)

// JIKA HASIL QUERY TIDAK ADA,DATA TIDAK TAMPIL DAN TDK TERJASI ERROR

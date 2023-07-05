// ARRAY QUERY OPERATOR
//      Qury operator ini hanya bisa digunakan untuk field yang valuenya adalah array dalam suatu collect

//  insert some products  with tags (untuk data dummy saja,dan memasukkan tags field untuk melakukan query array operator)
db.products.insertMany([
  {
    _id: 6,
    name: "Logitech M235 Wireless Mouse",
    price: new NumberLong(175000),
    category: "laptop",
    tags: ["logitech", "mouse", "accessories"],
  },
  {
    _id: 7,
    name: "Havit Cooler Pad Gaming 5Fan Blue led F2082",
    price: new NumberLong(200000),
    category: "laptop",
    tags: ["cooler", "laptop", "accessories", "fan"],
  },
  {
    _id: 8,
    name: "Samsung LC24F390FHEXXD Curved Monitor ",
    price: new NumberLong(1750000),
    category: "computer",
    tags: ["samsung", "monitor", "computer"],
  },
]);

// select * from products where (tags = "samsung" and tags = "monitor")
$all; // Mencocokkan array yang mengandung element-element tertentu
db.products.find({
  tags: {
    $all: ["samsung", "monitor"],
  },
});
// Maka hasilnya akan mengembalikan nilai dimana pada collection products yang mempunyai field tags(dan valuenya berisi element array "samsung" dan "monitor"),KEDUANYA harus ada karena defaultnya $all adalah AND (Maka value "samsung" dan "monitor" harus ada)

// select * from products where tags in ("samsung",  "logitect")
$elemMatch; // Mengambil document jika tiap element diarray memenuhi kondisi tertentu,BEDANYA DENGAN $ALL pada $elemMAtch kita dapat memasukkan operator query lagi (misal $in,$gte dll)
db.products.find({
  tags: {
    $elemMatch: {
      $in: ["samsung", "logitech"],
    },
  },
});
// Maka hasilnya akan mengembalikan nilai pada field tags(yang valuenya adalah "samsung" atau "logitech"),dengan menambahkan operator query $in maka merturn OR || DAN HASILNYA akan menampilkan document dengan field tags(yang valunya ada "samsung" atau "logitech")

// select * from products where size(tags) = 3
$size; // Mengambil documnet jika panjang array sesuai dengan yang dicari
db.products.find({
  tags: {
    $size: 3,
  },
});
// Maka hasilnya akan mengembalikan documnet yang mempunyai field(Dimana panjang value pada field tags adalah === 3 (lengyh === 3,index === 2))

// JIKA DATA YANG DICARI MAKA MONGO TIDAK AKAN MERETURN APA2

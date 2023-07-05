// QUERY UPDATE
// - Sama seperti database lainnya,dimongo DB juga bisa mengubah document yang sidah kita insert ke document
// - Namun berbeda dengan perintah sql,MongoDB MEMBERI FUNTION UNTUK MENGUBAH DOCUMNET
// syntax dasar update
// db.collection.updateOne(
//   {}, //query
//   {}, // update
//   {} //option
// );

// update products set category = "food" where _id = 1
updateOne(); // Mengubah satu document yang pertama kali match dengan query
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $set: {
      category: "food",
    },
  }
);
// Maka akan mengupdate document yg mempunyai field id == 1, dana akan men set($set adalah operator pada update document yg digunakan untuk mengubah nilainya,tapi jika nilainya belum ada maka akan ditambahkan) field category === "food"

// update products set category = "food" where _id = 2
db.products.updateOne(
  {
    _id: 2,
  },
  {
    $set: {
      category: "food",
    },
  }
);

// update products set tags = ["food"] where category = "food" and tags is null
updateMany(); // Mengubah bnyak document sekaligus
db.products.updateMany(
  {
    $and: [
      {
        category: {
          $eq: "food",
        },
      },
      {
        tags: {
          $exists: false,
        },
      },
    ],
  },
  {
    $set: {
      tags: ["food"],
    },
  }
);
// Maka hasilnya adalah sebelum mengupdate data,diatas melakukan query logical AND dimana akan mencari documnet dengan field category === "food" dan tags === null (document yg tidak mempunyai field tags) LALU jika hasil query sudah ketemu maka akan $set (menambahkan field tags(dengan value array["food"]))

// update products set wrong = "wrong"
// Updatae pada semua document dengan menambahkan field wrong(dgn value string "wrong")
db.products.updateMany({}, [
  {
    $set: {
      wrong: "wrong",
    },
  },
]);

// update products set wrong = null
// menset null pada field wrong
db.products.updateMany({}, [
  {
    $set: {
      wrong: null,
    },
  },
]); // Dengan menset null isi field wrong BUKAN berarti field wrong hilang dari document

// Untuk MENGHAPUS semua field wrong maka gunakan  query update operator $unset
db.products.updateMany({}, [
  {
    $unset: ["wrong"],
  },
]);

// insert wrong document
// (misal memasukkan document untuk direplace)
db.products.insertMany([
  {
    _id: 9,
    name: "Ups Salah",
    wrong: "Salah Lagi",
  },
]);

// replace document with id 9
replaceOne(); // Mengubah total satu document dengan document baru
db.products.replaceOne(
  {
    _id: 9,
  },
  {
    name: "Adidas Pulseboost HD Running Shoes Sepatu lari Pria",
    price: new NumberLong(1100000),
    category: "shoes",
    tags: ["adidas", "shoes", "running"],
  }
); //melakukan query yg mempunyai field id === 9, Lalu mengubah semua isinya dengan data baru,field lama akan otomatis ditimpa

// INGAT,jika menggunakan updateMany()  maka dampaknya adalah ke melakukan update ke bnyak document yang memenuhi hasil query,NAMUN jika menggunakan updateOne hanya mengubah document yg pertama kali ditemukan

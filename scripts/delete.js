// DELETE
//      mongoDB memiliki function yg bisa kita gunakan untuk menghapus document collection SECARA PERMANENT
//      Documnet yg sudah kita hapus,tdk bisa dikembalikan lagi

// Insert spammer document
// masukkan dta baru sebagai contoh
db.customers.insertOne({
  _id: "contoh1",
  full_name: "Vindi Aprilia",
});

// Delete document by _id
// Menghapus satu document yg sesuai dengan query
db.customers.deleteOne({
  _id: "contoh1",
});
// Maka akan menghapus field dengan id: contoh_1 secara permanent

// Insert many spammer documents
// masukkan data contoh lebih dari 1
db.customers.insertMany([
  {
    _id: "contoh1",
    full_name: "namaContoh1",
  },
  {
    _id: "contoh2",
    full_name: "namaContoh2",
  },
  {
    _id: "contoh3",
    full_name: "namaContoh3",
  },
]);

// Delete many documents
// Kita bisa memasukkan query apapun didalam syntax operasi deleteMany
$deleteMany; // Digunakan untuk menghapus banyak documnet sekaligus
db.customers.deleteMany({
  _id: {
    $regex: "contoh",
  },
});
// Hasilnya akan menghapus document yg mempunyai field _id(yang didalamnya ada kata-kata contoh)

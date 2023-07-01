// LOGICAL QUERY OPERATOR
//       Membandingkan 2 query dengan meggunakan operator $and, $or dan $not

$and;
// Menmbandingkan 2 query dan operasi AND,Akan mengembalikan documnet jika semua kondisi benar
// select * from products where category in ('laptop', 'handphone') and price > 20000000
db.products.find({
  $and: [
    {
      category: {
        $in: ["laptop", "handphone"],
      },
    },
    {
      price: {
        $gt: 20000000,
      },
    },
  ],
});
// Maka akan menampilkan data dengan field kategory( yang terdapat laptop atau handphone) dan field price (harganya diatast 20000000)

$not;
// Membalikkan kondisi,Dan mengembalikan document yang TIDAK sesuai dengan mondisi
// select * from products where category not in ('laptop', 'handphone')
db.products.find({
  category: {
    $not: {
      $in: ["laptop", "handphone"],
    },
  },
});
// Maka akan menampilkan data dengan field category ( yang tidak ada laptop atau handphone)

$and;
// Jika ingin memfilter harga kita bisa menggunakan 2 operator saat mengquery
// select * from products where price between 10000000 and 20000000 and category != 'food'
db.products.find({
  $and: [
    {
      price: {
        $gte: 10000000,
        $lte: 20000000,
      },
    },
    {
      category: {
        $ne: "food",
      },
    },
  ],
});
// Makan akan menampilkan data dengan field harga ( >= 10000000 dan <= 200000000) DAN field category (bukan food)

// METHOD Query Logical
$or; //Menggabungkan query dengan operasi OR,Akana mengembalikan document jika salah satu kondisi query bernilai true
$nor; // Menggabungkan query dengan operasi NOR(Not OR),Akan mengembalikan documnet jika GAGAL disemua kondisi
$not; // MemBALIKkkan kondisi,Akan mengembalikan document yg tdk sesuai dengan kondisi

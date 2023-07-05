// QUERY PROJECTION OPERATOR
//      - Pada funtion find(),Terdapat parameter kedua setelah wuery,Yaitu projection
//      - Projection adalah memilih field mana yang ingin kita ambil(tampilkan) dan field mana yang ingi kita hide(sembunyikan)
// 1 == include (DItampilkan), 0 == hide (Disembunyikan)
// PROJECTION OPERATOR
$; // Hanya akan mengembalikan data pertama yang match dengan array operator
$elemMatch; // HAnya akan mengembalikan data pertama yang match dengan kondisi query
$meta; // Mengembalikan informasi metadata yang didapat dari setiap matching document
$slice; // Mengontrol jumlah data yang ditampilkan(FIELD HARUS ARRAY)

// select _id, name, category from products
db.products.find(
  {},
  {
    name: 1,
    category: 1,
  }
);
// Maka akan menampilkan field name dan category pada collection product (NAMUN field id tetap include tidak bisa dihide),(defaultnya adalah OR)

// select _id, name, category, price from products
db.products.find(
  {},
  {
    tags: 0,
  }
);
// Maka akan menampilkan sema field,KECUALI field tags pada collection products

// select _id, name, category, price, tags[first] from products where tags in ("samsung", "logitech")
$elemMatch; // Akan menampilkan data pertama yang match dengan kondisi query(Dengan menggunakan $elemMatch kita bisa menambahkan query opertor )
db.products.find(
  {
    tags: {
      $elemMatch: {
        $in: ["samsung", "logitech"],
      },
    },
  },
  {
    name: 1,
    category: 1,
    price: 1,
    "tags.$": 1,
  }
);
// 1. Akan menampilkan document yang mempunyai field tags(dan valuenya "samsung" atau logitech)
// 2. Lalu,tampilkan document tersebut dengan field name,category,dan price,dan tags(UNTUK FIELD TAGS HANYA MENAMPILKAN INDEX KE 0/Data yg pertama kali ditemukan) SAJA

// select _id, name, category, price, tags(in ("samsung", "logitech")) from products
db.products.find(
  {},
  {
    name: 1,
    category: 1,
    price: 1,
    tags: {
      $elemMatch: {
        $in: ["samsung", "logitech"],
      },
    },
  }
);
// Maka akan mencari (findAll) pada collection products dengan hanya menampilkan field name,category,price dan tags(Yang didalamnya terdapat value "samsung" atau "logitech")

// select *, score from products where $search like "monitor"
// melakukan serach dengan text hasil search adalah "monitor"
db.products.find(
  {
    $text: {
      $search: "monitor",
    },
  },
  {
    score: {
      $meta: "textScore",
    },
  }
);
// Makan akan menampilkan document yang mempunyai value "monitor" DAN AKAN MENAMPILKAN SCORE RELEVANSINYA yang hasilnya bisa kita buat untuk Sorting

// select _id, name, price, category, tags[0,2] from products
// FIeld yg dislace harus array
db.products.find(
  {},
  {
    tags: {
      $slice: 2,
    },
  }
); // Maka akan menampilkan data dengan field tags(Dengan value 2 saja (index pertama dan setelahnya)) DARI DEPAN

// select _id, name, price, category, tags[last 2] from products
db.products.find(
  {},
  {
    tags: {
      $slice: -2,
    },
  }
); // Maka akan menampilkan data dengan field tags(Dengan value -2 saja (index paling akhir dan sebelumnya)) DARI BELAKANG

// select _id, name, price, category, tags[from, limit] from products
db.products.find(
  {},
  {
    tags: {
      $slice: [1, 1],
    },
  }
); // Maka akan menampilkan data dengan field tags([index awal, Value yang diambil]) COntoh diatas akan menampilkan data dari INDEX KE 1,DAN MENAMPILKAN VALUE 1 DIMULAI DARI INDE KE 1

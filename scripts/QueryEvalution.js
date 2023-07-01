// EVALUTION QUERY OPERATOR
//      Tidak direkomendasikan untuk query dengan data yang besar menggunakan ini,Karena akan melakukan scanning satu persatu dan itu membutuhkan waktu yg lumayan lama

$expr; //Menggunakan agregation expression,Mmepunyai 2 PARAMETER(Field,Value)
// select * from products where price > 1000000
db.products.find({
  $expr: {
    $gt: ["$price", 1000000],
  },
});
// Maka akan menampilkan data dengan field price ( yang valunta > 10000000)

// select * from customers where toUpper(_id) = 'KHANNEDY'
db.customers.find({
  $expr: {
    $eq: [{ $toUpper: "$_id" }, "ANGGER"],
  },
});
// Maka akan mengembalikan field yang mempunyai id "angger",tetapi akan diuppercase dulu,Bisa digunakan saat user Input mencari data

$jsonSchema; // Validasi document sesuai dengan JSON Schema/Format valid json,Mempunyai key required: []
// select * from products where name is not null and category is not null
db.products.find({
  $jsonSchema: {
    required: ["name", "category"],
  },
});
// Maka akan menampilkan document yang mempunyai field name AND category

// select * from products where name is not null and type(name) = 'string' and type(price) = 'long'
db.products.find({
  $jsonSchema: {
    required: ["name"],
    properties: {
      name: {
        bsonType: "string",
      },
      price: {
        bsonType: "long",
      },
    },
  },
});
// Maka akan menampilkan data dyang mempunyai field name AND field name (mempunyai value string) dan field price(mempunyai value long)

$mod; // Melakukan operasi modulo/modulus (sisa bagi) Mmepunya 2 PARAMETER(Angka bagi,Hasil bagi)
// select * from products where price % 5 = 0
db.products.find({
  price: {
    $mod: [5, 0],
  },
});
// Maka akan menampilkan data dengan yang mempunyai field price (Dimana price nya jika dimodulus 5 = 0)

$regex; // Mengambil document sesuai dengan regexnya
// select * from products where name like "%mie%"
db.products.find({
  name: {
    $regex: /mie/,
    $options: "i",
  },
});
// Maka akan menampilkan data yang mempunyai field name( yang valuenya terdapat kata "mie" tidak perduli huruf kecil atau besar (not case sensitiv))

// select * from products where name like "Mie%"
db.products.find({
  name: {
    $regex: /^Mie/,
  },
});
// Maka akan menampilkan data yang mempunyai field name(yang valuenya HARUS BERAWALAN "Mie")

$text; // Melakukan pencarian menggunakan text
//1. create text index on products
db.products.createIndex({
  name: "text",
});
// Maka string text/ value text akan merepresentasikan field  name pad collection products
//2. select * from products where (name like "%mie%" or name like "%sedap%")
db.products.find({
  $text: {
    $search: "mie sedap",
  },
});
// Maka hasilnya akan menampilkan data yang mempunyai field name ( yang mempunyai value"mie OR sedap" not case sensitive)

// select * from products where name like "%mie sedap%"
db.products.find({
  $text: {
    $search: '"mie sedap"',
  },
});
// sedangkan syntax diatas masih menggunakan index name: text
// Maka hasilnya akan menampilkan data yang mempunyai field name (yang HARUS mempunyai value "mie sedap" not case sensitive)

$where; //Mengambil document dengan javascript function
// select * fro customers where _id = "angger"
db.customers.find({
  $where: function () {
    return this._id == "angger";
  },
});
// Maka hasilnya akan menampilkan data dengan field id == "angger" pada collection customers

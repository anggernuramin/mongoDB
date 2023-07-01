// QUERY DOCUMENT
//      Sama seperti direlational database(seperti MYSQL) di mongoDB kita bisa melakukan query atau pencarian document yg sudah kita simpan di collection

// dibawah ini adalah syntax untuk menampilkan data dengan method find({}) dengan field (key dan value yang sama)
// select *  from customers where _id = 'angger'  //INI PENGGUNAAN JIKA MENGGUNAKAN MYSQL
db.customers.find({
  _id: "angger",
});

// select * from customers where name = 'Eko Kurniawan Khannedy'
db.customers.find({
  name: "Angger Nur Amin",
});

// select * from products where price = 2000
db.products.find({
  price: 2000,
});

// select * from orders where items.product_id = 1
// jika ingin mengakses object didalamnya bisa menggunakan tanda .
db.orders.find({
  "items.product_id": 1,
});

// JIKA QUERY BERHASIL MAKA DATA AKAN DITAMPILKAN

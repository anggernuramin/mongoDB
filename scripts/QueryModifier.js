// QUERY MODIFIER
// - Query modifier adalah memodifikasi hasil query yang telah kita lakukan
// - COntoh yang sering kita lakukan adalah seperti(membatasi jumlah data yang tampil denga paging,sorting data hasil query)
// - Untuk memodifikasi hasil query,kita bisa menambahkan FUNCTION QUERY MODIFIER

// select count(*) from products
count(); // mengambil jumlah data
db.products.find({}).count();
// HAsilnya akan menampilkan jumlah document pada collection product dalam bentuk angka

// select * from products limit 4
limit(); // Membatasi jumlah data dari hasil query
db.products
  .find({
    price: {
      $gt: 10000,
    },
  })
  .limit(2);
// Maka akan menampilkan data dengan document yg memiliki field price dengan > 10000,DAN diabatsi yang tampil hanya 2 document saja

// select * from products offset 2
skip(); // Menghiraukan data sesuai dengan parameter yg ada pada skip()
db.products.find({}).skip(2);
// Maka akan menampilkan semua data yg ada di collection products tetapi data yang tampil dimulai diurutan 3,4, .... karena data yang diskip 2

// select * from products limit 4 offset 2
// MELAKUKAN Chaining modifier
// Misal kita ingin melakukan paging dengan menampilkan data sebanyak 4,Tetapi kita skip 4 data sebelumnya
db.products.find({}).limit(4).skip(4);

// select * from products order by name asc, category desc
sort(); //Mengurutkan dari hasil query
db.products.find({}).sort({
  name: 1,
  category: -1,
});
// Maka setelah menampilkan semua data(kebetulan contoh diatas tidak melakukan opertaional query,Hanya menampilkan semua data) akan dialakukan sorting pada field name(1 === ASCENDING(A ke Z)) LALU sorting lagi pada field category (-1 === DESCENDING(Z ke A)), Yang dikerjakan terlebih dahuku adalah sort field name

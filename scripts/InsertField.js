// INSER DOCUMENT
//      Untuk menyimpan data ke mongoDB,kita perlu membuat document dalam bentuk JSON,Jika saat kita memmbuat field tdak memasukkan id,maka akan secara otomatis dibuatkan id dengan new ObjectId()

// Insert document ke collection customers
insertOne({}); // memasukkan 1 data ke collection
db.customers.insertOne({
  _id: "angger",
  name: "Angger Nur Amin",
});

// Insert document ke collection products
insertMany({}); // Mengembalikkan sebuah Array dengan memasukkan BEBERAPA DATA langsung ke dalam collection
db.products.insertMany([
  {
    _id: 1,
    name: "Indomie Ayam Bawang",
    price: new NumberLong(2000),
  },
  {
    _id: 2,
    name: "Mie Sedap",
    price: new NumberLong(2000),
  },
]);

// Insert document ke collection orders
// Kita bisa memasukkan 1 object yg didalamnya terdapat ARRAY OF OBJECT secara KOMPLEX menggunakan insertOne()
db.orders.insertOne({
  _id: new ObjectId(),
  total: new NumberLong(8000),
  items: [
    {
      product_id: 1,
      price: new NumberLong(2000),
      quantity: new NumberInt(2),
    },
    {
      product_id: 2,
      price: new NumberLong(2000),
      quantity: new NumberInt(2),
    },
  ],
});

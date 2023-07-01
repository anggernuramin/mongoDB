// QUERY ELEMENT OPERATOR

$exists; // Akan menCOCOKkan document yang memiliki field tersebut(isi dengan true or false)
// select * from products where category is null
db.products.find({
  category: {
    $exists: false,
  },
});
// Maka akan menampilkan data pad acollection product  yang tidak mempunyai field category

$type; // Akan mencocokkan document yang memiliki type field tersebut
// select * from products where type(category) = "string"
db.products.find({
  category: {
    $type: "string",
  },
});
// Maka akan menampilkan data pada collection product dengan field category (yang didalamnya valuenya adalah string)

// select * from products where type(price) in ("int", "long")
db.products.find({
  price: {
    $type: ["int", "long"],
  },
});
// Maka akan menampilkan data yang mempunyai field price (yang didalam field terdapat value int atau long)

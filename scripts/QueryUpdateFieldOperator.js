// QUERY UPDATE FIELD OPERATOR
//      Operator yang bisa kita gunakan untuk field update
$set; // Mengubah nilai field document,jika field nya belum ada amaka akan otomatis dibuatkan
$unset; // Menghapus field yg ada didalam didocument
$rename; // Mengubah nama field
$inc; // Menaikan nilai number pada field dengan jumlah tertentu
$currentDate; //  Mengubah field menjadi waktu saat ini

// alter table customers change name full_name
db.customers.updateMany(
  {},
  {
    $rename: {
      name: "full_name",
    },
  }
);
// Maka akan mencari disemua document yang mempunyai field name pada collection customers dan mengganti menjadi field full_name

// update products set stock = stock + 10
db.products.updateMany(
  {},
  {
    $inc: {
      stock: 10,
    },
  }
);
// Menambahkan field stock pada semua document pada products collection dengan nilai awal 10
// Dan jika kita update lagi maka stock akan bertambah DEFAULTNYA ADALAH DITAMBAH, jika kita ingin mengurangi value pada field sctock maka kita bisa
db.products.updateMany(
  {},
  {
    $inc: {
      stock: -5,
    },
  }
);
// Biasa digunakan untuk sistem ADD TO CARD pada Ecommerce

// update products set lastModifiedDate = current_date()
db.products.updateMany(
  {},
  {
    $currentDate: {
      lastModifiedDate: {
        $type: "date",
      },
    },
  }
);
// Maka hasilnya akan menambahkan field pada semua document yg ada di products collection DAN menambahkan field lastModifiedDate(dan valuenya waktu saat ini dengan tipe data "date")
// Format waktu yang dipakai adalah UTC , Jadi kira-kira jika ingin mrnjadikan waktu ke WIB harus dikurangi 7 jam

// ARRAY UPDATE OPERATOR
// - Secara default,saat ini kita mengubah field dengan tipe data array maka seluruh isi array didalamnya ikut berubah
// - Kadang kita ingin menambah atau hanya mengubah sata array tanpa harus mengubah seluruh isi nya
// OPERATOR UPDATE PADA FIELD ARRAY

// update products set ratings = [90, 80, 70]
// Update semua document yang ada didalam collection products dengan menambahkan field ratirngs yang isinya adalah ARRAY
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

// update first element of array, query must include array fields
$; // Mengupdate data array pertama(index ke 0) sesuai dengan kondisi query
db.products.updateMany(
  {
    ratings: 90,
  },
  {
    $set: {
      "ratings.$": 100,
    },
  }
);
// 1. Perintah query diatas mencari field rating(dengan value yg ada angka 90s) di semua document
// 2. jika hasil query sudah dapat,Maka update field ratings(dengan value yg pertama kali ditemukan lalu UBAH dengan value 100)

// update all element of array
// $[] Mengupdate semua data array sesuai dengan kondisi query
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[]": 100,
    },
  }
);
// 1. Update semua document
// 2. Lalu update field ratings(Dengan value 100,berapapun bnyak nya data array didalamnya maka update dengan value 100)

// update products set ratings = [90, 80, 70]
// set kembali ke awal untuk melanjutkan contoh query array update operator
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

// update element of array based on arrayFilters
// Mengupdate semua isi array yang sesuai dengan arrayFilters
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.$[element]": 100,
    },
  },
  {
    arrayFilters: [
      {
        element: {
          $gte: 80,
        },
      },
    ],
  }
);
// 1. Membuat identifier element(dengan value 100)
// 2. lalu akan memfilter element yg nilainya >= 80 maka,value pada array akan diubah menjadi 100
// identifier harus sama saat melakukan query (CONTOH DIATAS menggunakan nama identifier element)

// update element of array with given index
//index Mengupdate isi dari data array sesuai dengan index arraynya
db.products.updateMany(
  {},
  {
    $set: {
      "ratings.0": 50,
      "ratings.1": 60,
    },
  }
);
// Maka hasilnya adalah akan mengupdate semua document dengan field ratings([index ke 0 = 50, DAN index ke 1 = 60])

// add "popular" to array if not exists
$addToSet; // Menambahkan value ke array,Jika bekum ada ditambahkan Jika sudah MAKA DIHIRAUKAN
db.products.updateOne(
  {
    _id: 1,
  },
  {
    $addToSet: {
      tags: "popular",
    },
  }
);
// 1. Melakukan query dengan menselect document yg mempunyai id 1
// 2. Lalu menambahlan isi array pada field tags("popular")
// 3. Dan secara default field(Berupa Array)

// remove first element of array
$pop; // Menghapus element pertama (-1) dan terakhir ( 1 ) pad array
db.products.updateMany(
  {},
  {
    $pop: {
      ratings: 1,
    },
  }
);
// 1. Menselect semua document
// 2. Menghapus isi field rating(-1 (index paling awal) , 1 (index paling akhir))

// update products set rating = [90, 80, 70]
db.products.updateMany(
  {},
  {
    $set: {
      ratings: [90, 80, 70],
    },
  }
);

// remove all element where ratings >= 80
$pull; // Menghapus semua element diarray yang sesuai dengan kondisi query
db.products.updateMany(
  {},
  {
    $pull: {
      ratings: {
        $gte: 80,
      },
    },
  }
);
// 1. Menselect semua document
// 2. Memghapus isi array yang ada difield ratings(Dengan query yg isinya >= 80)

// add 100 to ratings
$push; // Menambahkan element/isi pada array
db.products.updateMany(
  {},
  {
    $push: {
      ratings: 100,
    },
  }
);
// 1. Menselect semua document
// 2. Menambahkan isi/elemet pada field ratings(dengan value 100) DEFAULTNYA ANGKA ditaruh diindex terakhir

// remove element 100
$pullAll; // Menghapus semua isi array
db.products.updateMany(
  {},
  {
    $pullAll: {
      ratings: [1000],
    },
  }
);
//Maka pada field ratings(fieldny adalah array) akan menghapus data 100 didalamnya,parameter dari rating[isinya adalah data yg akan dihapus]

// add 100, 200, 300 to ratings
$each; // Digunakan untuk menambahkan multiple element(data lebih dari 1),yang digunakan didalam perintah $push
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300],
      },
    },
  }
);
// Hasilnya akan menambah data(sebanya 3) ke dalam field ratings

// add trendinDigunakan didalam perintah $addToset dan $push,Menambah value didalam array,Namun jika valuenya sudah ada maka akan dihiraukan,jika belum maka akan ditambahkan
db.products.updateMany(
  {},
  {
    $addToSet: {
      tags: {
        $each: ["trending", "popular"],
      },
    },
  }
);
// Maka hasilnya akan menambahkan value didalam field tags,Gunakan perintah $each KARENA INGIN MEMASSUKKAN LEBIH DARI 1 VALUE DAN DIGUNAKAN DIDALAM $addToSet

// add hot in posititon 1
$position; // Digunakan didalam perintah $push untuk mengubah posisi index,saat menambahkan data
db.products.updateMany(
  {},
  {
    $push: {
      tags: {
        $each: ["hot"],
        $position: 1,
      },
    },
  }
);
//Maka hasilnya adalah menambahkan value hot ke dalam field tags(ke URUTAN 1,URUTAN DIDALAMNYA DIMULAU DARI 0) gunakan $each untuk menambahkan data,Karena menggunakan $push

// add all element, but limit with slice
$slice; // Digunakan didalam $push untuk menentukan jumlah maksimal data array yang ditampilkan
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [500, 600, 700, 800, 900],
        $slice: -5,
      },
    },
  }
);
//Maka hasilnya akan menampilkan -5 data DARI URUTAN BELAKANG
// jika INGIN DARI DEPAN maka cukup 5 saja(tanpa - didepan)

// add all element, and sort desc
$sort; // Digunakan untuk mengurutkan SETELAH OPERASI $push
db.products.updateMany(
  {},
  {
    $push: {
      ratings: {
        $each: [100, 200, 300, 400, 500, 1000],
        $sort: 1,
      },
    },
  }
);
// MakA hasilnya Discending dari URUTAN BESAR KE KECIL (-1)
// jika ingin Ascending DARI KECIL KE BESAR (1)

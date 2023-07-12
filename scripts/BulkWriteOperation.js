// BULK WRITE OPERATION
//  Komunikasi antara aplikasi dengan database biasanya dilakukan secara reques dan response
//  Artinya tiap perintah yg ingin kita kirimkan ke databse,akan direspon secara langsung,Maka jika data yang direquest hanya satu-satu jika datanya besar maka akan lambat
//  DENGAN BULK WRITE kita bisa dalam satu request kita bisa MENGIRIM BANYAK PERINTAH
// Fitur ini cocok pada kasus jika kita ingin melakukan operasi bulk atu batch secara sekaligus

// 1. TIDAK SEMUA PERINTAH QUERY DAPAT DIMASUKKAN KEDALAM PARAMETER BULK WRITE OPERATION
// PARAMETER yg bisa dimasukka
$insertOne(), $updateOne(), updateMany(), replaceOne(), deleteOne(), deleteMany();
$bulkWrite; //Melakukan operasi (insert,update,delete) banyak secara sekaligus
db.customers.bulkWrite([
  {
    insertOne: {
      document: {
        _id: 1,
        full_name: "Nur",
      },
    },
  },
  {
    insertOne: {
      document: {
        _id: 2,
        full_name: "Amin",
      },
    },
  },
  {
    updateMany: {
      filter: {
        _id: {
          $in: [1, 2],
        },
      },
      update: {
        $set: {
          full_name: "Angger Nur Amin",
        },
      },
    },
  },
]);
// Pada operasi bulkWrite diatas melakukan 3 perintah
// 1. menambahkan data dengan operasi $insertOne()
// 2. Menambahkan data dengan operasi $insertOne() lagi
// 3. Melakukan update banyak data dimana didalamnya menagndung 2 perintah :
//      -  memfilter semua data pada collection customers yg mempunyai id[1,2]
//      - lalu data didalamnya akan diupdate dengan funsi $set yang hasilnya akan menset    field  full_name: menjadi "Angger Nur Amin"

// SYNTAX DIATAS => Merequest sekali ke databse,Tetapi melakukan oeprasi lebih dari satu

// SCHEMA VALIDATION
//  - DimongoDB fitur untuk validasi data lebih canggih
//  - mongoDB mendukung validation menggunakan jsonSchema
//  - Dengan memvalidasi request keDB,MAKA HAL ITU LEBIH BAIK ,akan mengurangi request yang eror
//  - JSON SCHEMA = Adalah standart resmi untuk memvalidasi data json,Dengan menggunakan json schema kita bisa memberi batasan,data json apa yang valid,sehimgga bisa dimasukkan ke dalam collection
// Misal : field name harus diisi string,jika tidak maka eror,data tidak bisa dimasukkan ke collection

// 1.Create category collection (Syntax untuk membuat collection Baru dan menerapkan schema validation)
// membuat collection baru "merchants"
db.createCollection("merchants", {
  validationAction: "error", // menampilkan pesan eror jika data yg dimasukkan tidak sesuai dengan schema validation
  validator: {
    $jsonSchema: {
      bsonType: "object", // set bsonType menjadi object(krena kita ingin memasukkan object)
      required: ["name", "balance", "type", "address"], // required(syarat yg harus dipenuhi) harus terdapat field name,balance,type,addres (tidak boleh hnya satu field)
      properties: {
        // digunakan untuk menuliskan required untuk setiap field
        name: {
          bsonType: "string", // field name tipe data harus string
          description: "Must be a string",
        },
        balance: {
          bsonType: "long", // field balance(tipe data harus long)
          description: "Must be a long",
        },
        type: {
          enum: ["PREMIUM", "REGULAR"], // field type(isinya harus string PREMIUM atau REGULAR pilih salah satu)
          description: "Can only be one of enum values",
        },
        address: {
          // field object(didalamnya terdapat object lagi)
          bsonType: "object", // object karena ingin memasukkan object lagi
          required: ["street", "city"], // mandatory (harus mempunyai field street dan city)
          properties: {
            street: {
              bsonType: "string", // field street(tipe data harus string)
              description: "Must be a string",
            },
            city: {
              bsonType: "string", // field city (tipe data harus string)
              description: "Must be a string",
            },
            country: {
              bsonType: "string", // field country OPTIONAL,boleh ada atau tidak saat kita insert data ke collection merchants(NAMUN jika kita ingin memasukkan field string(TIPE DATA HARUS STRING))
              description: "Must be a string",
            },
          },
        },
      },
    },
  },
});

// Insert valid document
// Memasukkan data ke collection merchant DENGAN DOCUMENT YG SESUAI DENGAN SCHEMA VALIDATION YANG SUDAH DISET DIAWAL
db.merchants.insertOne({
  _id: "toko1",
  name: "Toko Satu", // true(karena name tipe data = string)
  balance: new NumberLong(1000000), // true (karena tipe data = long)
  type: "PREMIUM", // true (karena tipe data string dan isinya = PREMIUM)
  address: {
    // true (karena didalamnya terdapat field yg sesuai dengan required)
    street: "Jalan Raya Belum Jadi", //true (karena tipe data = string)
    city: "Jakarta", // true (karena tipe data = string)
    country: "Indonesia", // true (karena tipe data = string)
  },
});
// kita tetap bisa MENAMBAHKAN field baru pada collection,NAMUN REQUIRED YANG DISET DI SCHEMA VALIDATION DIATAS HARUS TERPENUHI

// Inser Invalid document: Name is blank
// Memasukkan data yang salah(tidak valid) dengan JSON SCHEMA
// ERROR karena tidak terdapat field name,saat memasukkan data ke merchants collection
db.merchants.insertOne({
  _id: "toko2",
  balance: new NumberLong(1000000),
  type: "PREMIUM",
  address: {
    street: "Jalan Raya Belum Jadi",
    city: "Jakarta",
    country: "Indonesia",
  },
});
// Maka hasilnya adalah pesan eror (Document failed validation) dan document tdk dimasukkan ke collection

// Inser Invalid document: Address City is blank
// Memasukkan data yang salah(tidak valid) dengan JSON SCHEMA
// ERROR karena tidak terdapat field city pada field address
db.merchants.insertOne({
  _id: "toko2",
  name: "Toko Dua",
  balance: new NumberLong(1000000),
  type: "PREMIUM",
  address: {
    street: "Jalan Raya Belum Jadi",
    country: "Indonesia",
  },
});

// 2. Add validator to customers collection (Memasukkan schema validation ke collection yang sudah ada data didalamnya)
db.runCommand({
  collMod: "customers", // nama collection
  validationAction: "error", // pesan eror jika data yang dimasukkan failed
  validator: {
    $jsonSchema: {
      bsonType: "object", // set menjadi object (karena format yg k=akan mau masukkan berupa object)
      required: ["full_name"], // set field yh harus ada
      properties: {
        // setting required tiap field
        full_name: {
          bsonType: "string", // field full_name tipe data harus string
          description: "Must be a string",
        },
      },
    },
  },
});
// Maka hasilnya adalah data yang kita ingin masukkan sekarang ke collection harus sesuai dengan schema validation
// TETAPI DATA SEBELUMNYA YANG ADA DICOLLECTION TIDAK AKAN HILANG WALUPUN TUDAK SESUAI DENGAN SCHEMA VALIDATION YANG KITA SET

// insert invalid Document (memasukkan document yg valid)
db.customers.deleteOne({
  full_name: "Vindi April",
});

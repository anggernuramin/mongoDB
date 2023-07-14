db.data.aggregate([
  {
    $group: { _id: "$borough", restorant: { $sum : 1 } },
  },
]);

// nIlai tertinggi
db.data.aggregate([
    {
      $group: { _id: "$borough", scoreTertinggi: { $avg : "$grades.score" } },
    }
  ])

// nilai rata-rata
db.data.aggregate([
    {
      $group: {
        _id: "$borough",
        rata_rata: { $avg: "$grades.score" }
      }
    },
    {
      $match: {
        rata_rata: { $gt: 8 }
      }
    },
  ])
  
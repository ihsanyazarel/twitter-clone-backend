/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const users = [{
  userName: 'İhsan',
  userSurname: "Yazarel",
  userEmail: "ihsanyazarel@hotmail.com",
  nickName: "ihsanyazarel",
  password: "$2a$10$c05BGuU3VeLdX8g6OwyQA.EJftuqzHjpRtEsjLegmRWBye55WBllS",
  role: "Admin",
  numberOfFollowers: 2,
  numberOfFollowing: 100,
  secretQuestion: "$2a$10$AMTn8.H1hHuHBohN9ID9D.3ySRk0zZKXw/pbfsJg4OfThD9fvlPBW"
},
{
  userName: 'Aytaç',
  userSurname: "Şahin",
  userEmail: "haytacsahin@gmail.com",
  nickName: "haytac",
  password: "$2a$10$/Q5ZniUGEdH526o0hiUqaeqNnTJ3a1BSexFAWfGgI.Jl4FRhhXGda",
  role: "Admin",
  numberOfFollowers: 3,
  numberOfFollowing: 150,
  secretQuestion: "$2a$10$SWtr5xn.IVQzsw5ErSf4lu3Pfyes4RTbLaXfJNSrbVL.sOxMIofOC"
},
{
  userName: 'Serkan',
  userSurname: "Toraman",
  userEmail: "storaman@gmail.com",
  nickName: "storaman",
  password: "$2a$10$iH.8ORGKoOn8ZKsLagfBtOKR1KxHl5TmZspAgyCVqOcT6PkRVWcpG",
  role: "User",
  numberOfFollowers: 3,
  numberOfFollowing: 150,
  secretQuestion: "$2a$10$dp49AL6bVmhWb.Ay7QC3tuTIb79psm0P3DIAXiqTdtw2AZGUU1BVS"
},
{
  userName: 'Yaşar',
  userSurname: "Muslu",
  userEmail: "fenerli@gmail.com",
  nickName: "fenerli",
  password: "$2a$10$WWbodmsGCpJ8LGk0NTjs6uDiyiZs63pH5ds.k1XapkGGIi2nyblxS",
  role: "User",
  numberOfFollowers: 3,
  numberOfFollowing: 150,
  secretQuestion: "$2a$10$Q2RczqhQz0S6kqQTBLd6NOMKwpyFPIIdIkbfzxEvtJ1lcFmGwaPBK"
},
{
  userName: 'Ayşegül',
  userSurname: "Baş",
  userEmail: "a.bas@gmail.com",
  nickName: "aysegulbas",
  password: "$2a$10$xVgyu0N/2EoNywZOiLaOYOc64JPCYhgvfIrmmvWlM2kPWERUrq6ie",
  role: "User",
  numberOfFollowers: 3,
  numberOfFollowing: 150,
  secretQuestion: "$2a$10$AmPpSWDvUDI3huaXz82yCezgyAyLdlRXmA3htgaADKsuSUFuqcRz."
},
];


exports.seed = async function(knex) {
  return knex('Users')
  .truncate()
  .then(function() {
    return knex('Users').insert(users);
  });
};

exports.users = users;
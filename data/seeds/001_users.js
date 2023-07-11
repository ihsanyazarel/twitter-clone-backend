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
  numberOfFollowing: 100
},
{
  userName: 'Aytaç',
  userSurname: "Şahin",
  userEmail: "haytacsahin@gmail.com",
  nickName: "haytac",
  password: "$2a$10$/Q5ZniUGEdH526o0hiUqaeqNnTJ3a1BSexFAWfGgI.Jl4FRhhXGda",
  role: "Admin",
  numberOfFollowers: 3,
  numberOfFollowing: 150
},
{
  userName: 'Serkan',
  userSurname: "Toraman",
  userEmail: "storaman@gmail.com",
  nickName: "storaman",
  password: "$2a$10$iH.8ORGKoOn8ZKsLagfBtOKR1KxHl5TmZspAgyCVqOcT6PkRVWcpG",
  role: "User",
  numberOfFollowers: 3,
  numberOfFollowing: 150
},
{
  userName: 'Yaşar',
  userSurname: "Muslu",
  userEmail: "fenerli@gmail.com",
  nickName: "fenerli",
  password: "$2a$10$WWbodmsGCpJ8LGk0NTjs6uDiyiZs63pH5ds.k1XapkGGIi2nyblxS",
  role: "User",
  numberOfFollowers: 3,
  numberOfFollowing: 150
},
{
  userName: 'Ayşegül',
  userSurname: "Baş",
  userEmail: "a.bas@gmail.com",
  nickName: "aysegulbas",
  password: "$2a$10$xVgyu0N/2EoNywZOiLaOYOc64JPCYhgvfIrmmvWlM2kPWERUrq6ie",
  role: "User",
  numberOfFollowers: 3,
  numberOfFollowing: 150
},
];


exports.seed = async function(knex) {
  return knex('Users').insert(users);
};

exports.users = users;
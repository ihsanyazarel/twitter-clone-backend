/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const users = [{
  userName: 'İhsan',
  userSurname: "Yazarel",
  userEmail: "ihsanyazarel@hotmail.com",
  nickName: "ihsanyazarel",
  password: "1234",
  role: "Admin",
  numberOfFollowers: 2,
  numberOfFollowing: 100
},
{
  userName: 'Aytaç',
  userSurname: "Şahin",
  userEmail: "haytacsahin@gmail.com",
  nickName: "haytac",
  password: "1234",
  role: "Admin",
  numberOfFollowers: 3,
  numberOfFollowing: 150
},
{
  userName: 'Serkan',
  userSurname: "Toraman",
  userEmail: "storaman@gmail.com",
  nickName: "storaman",
  password: "1234",
  role: "User",
  numberOfFollowers: 3,
  numberOfFollowing: 150
},
{
  userName: 'Yaşar',
  userSurname: "Muslu",
  userEmail: "fenerli@gmail.com",
  nickName: "fenerli",
  password: "1234",
  role: "User",
  numberOfFollowers: 3,
  numberOfFollowing: 150
},
{
  userName: 'Ayşegül',
  userSurname: "Baş",
  userEmail: "a.bas@gmail.com",
  nickName: "aysegulbas",
  password: "1234",
  role: "User",
  numberOfFollowers: 3,
  numberOfFollowing: 150
},
];


exports.seed = async function(knex) {
  return knex('Users').insert(users);
};

exports.users = users;
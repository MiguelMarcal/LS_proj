const pgp = require('pg-promise')()
// connectionString used in pg-promisse to connect to the DB, "postgresql://'username':'password'@localhost:'port'/'DB name'" 
const connectionString = 
  "postgresql://miguel:4132@localhost:5432/LS_proj"

const db = pgp(connectionString)


async function read_all(){
  await db.any("select * from gh_user")
  .then(data => console.table(data)
  )
  .catch(err => console.log(err))
}


async function insert_gh_user(name, location){
  await db.none('INSERT INTO gh_user(gh_name, gh_location) VALUES($1, $2)', [name, location])
  .then(console.log(`User ${name} is located at ${location} (added to the DB)`))
  .catch(err => console.log(err))
}


async function get_user_location(location){
  await db.any('SELECT * FROM gh_user WHERE LOWER(gh_user.gh_location) LIKE LOWER($1)', '%' + [location] + '%')
  .then(data => console.table(data))
  .catch(err => { console.log(err); })
}

//Used to check if the user is already in the DataBase, it will return a empty array if the user is not in the database
async function check_user_db(name){
  return await db.any('SELECT gh_name FROM gh_user WHERE LOWER(gh_user.gh_name) = LOWER($1)', [name])
  .then(data => { 
    // return data.lengh??
    if(data.length == 1){ 
      return 1
    }else{
       return 0
    }
  })
  .catch(err => { console.log(err); })
}


function close_db_connection(){
  db.$pool.end();
}

var exports = {
  read_all,
  insert_gh_user,
  get_user_location,
  close_db_connection,
  check_user_db
}

module.exports = exports
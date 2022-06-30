const program = require('commander')
const GH_export = require('./gh.js');
const PSQL_export = require('./psql.js')
program
  .version("1.0")
  .description("Search for github users")


/*
  For the command 'search', checks if there is a GitHub account with the given name and saves it to the DB
  if it is not already there.

*/
program
  .command("search <username>")
  .alias("s")
  .description("Search for a GitHub user's location")
  .action( async (username) => { 
    var local = await GH_export.Bgh_info(username);        
    var exists = await PSQL_export.check_user_db(username)

    if( local != undefined || local === null ){
      if(exists){
        console.log( `User ${username} is located at ${local}.` ) 
      } else{
        await PSQL_export.insert_gh_user( username, local );
      }
    } else{
      console.log( "User not found" )
    }
    PSQL_export.close_db_connection();
  })


program
  .command("find <location>")
  .alias("f")
  .description("Find every user in the DB from the given location")
  .action( async (location) => {
    await PSQL_export.get_user_location(location)
    PSQL_export.close_db_connection();
  })


program
  .command("all")
  .alias("a")
  .description("find every user in the DB")
  .action( async () => {
    await PSQL_export.read_all()
    PSQL_export.close_db_connection();
  })


program
  .command("languages <username>")
  .alias("l")
  .description("See every repo from the given username")
  .action((username) => {
    GH_export.user_Planguages(username);
  })






program.parse(process.argv)

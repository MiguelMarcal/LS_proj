const fetch = require('node-fetch')

  /*
    Uses fetch to retrieve data about the given username, returning its location (it can be null)
  */
function Bgh_info(name){
  return fetch(`https://api.github.com/users/${name}`, {
  method: "GET",
  headers: {
    Authorization:`token Personal Token` // Here it is used 'token personaltoken' because of limitations by the github API
  }   
})
  .then(data => data.json()) //Converting the response to a JSON object
  .then(dataj => {
    return dataj.location;
  })
  .catch( error => console.error(error));
}

/*
To check what languages are used in each repository
*/
function user_Planguages(name){
  fetch(`https://api.github.com/users/${name}/repos`, {
    method: "GET",
    headers: {
      Authorization:`token Personal Token`  // Here it is used 'token personaltoken' because of limitations by the github API
    }
  })
  .then(response => response.json())
  .then( (data) => {
    let languages = [];
    for(var i = 0; i < data.length; i++){
      ( function(i){
          fetch('https://api.github.com/repos/' + data[i].full_name + '/languages', {
            method: "GET",
            headers: {
              Authorization:`token Personal Token`  // Here it is used 'token personaltoken' because of limitations by the github API
             }
          })
          .then(response => response.json())
          .then(res => {
            for (var key in res) {
              languages.push(key)
            }
            var clean_languages = new Set(languages)
            var clean_languages = [...clean_languages]
            if(languages.length == 0){
            console.log(`\nRepo ${data[i].name}\n---> Has no code`)
            }else{
              console.log(`\nRepo \'${data[i].name}\' uses:`)
              console.table(clean_languages)
            }
          })
          .catch(err => console.log(err))
      })(i);
            
    }
  })
  .catch( error => console.error(error));
}

var exports = {
  Bgh_info,
  user_Planguages
}
module.exports = exports

const superagent = require('superagent');

// unsplash callback function - sets us up for AND uses superagent
function getImages(request, response){
  // set up for easy superagent use
  // console.log(request.query.imageSearch); // in place of hardcoded bees
  const imageQuery = request.query.imageSearch;
  // as opposed to this https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY&query=bees
  const url = 'https://api.unsplash.com/search/photos';
  const query = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: imageQuery,
  };

  // USE superagent to make the api call. the DATA we care most about lives at results.body
  superagent
    .get(url)
    .query(query)
    .then(imageResults => {
      response.status(200).send(imageResults.body.results.map(img => new ImageObject(img)));
    });

}

// things I want from API
// alt_description
// urs.regular
// user.name

function ImageObject(img){
  this.alt = img.alt_description;
  this.url = img.urls.regular;
  this.photographer = img.user.name;
}

// note syntax for what we are exporting
module.exports = getImages;
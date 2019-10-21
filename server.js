const OAuth = require('OAuth');
import {
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret,
  port
} from './config';
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  port:5000,
  host: 'localhost'
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

server.route([{
  method: 'GET',
  path: '/getTimeline',
  handler: handleTweets
},
  {
    method: 'POST',
    path: '/postTweet',
    handler: handlePostTweet
  },
  {
    method: 'DELETE',
    path: '/deleteTweet/{id}',
    handler: handleDeleteTweet
  },
  {
    method: 'POST',
    path: '/reTweet/{id}',
    handler: handleReTweet
  }
]);

function authenticate() {
  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    consumer_key,
    consumer_secret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  return oauth;
}
// get  twitter feeds from  user timeline - by Dhwani Sanghvi
 function handleTweets(req, reply) {
  const oauth = authenticate();
  oauth.get(
    'https://api.twitter.com/1.1/statuses/home_timeline.json',
    access_token_key,
    access_token_secret,
    ((error, data, response) => {
      if (error) console.error(error);
  reply.response(data).code(200)
    }))
}

// post a  feed  by Amit Vijapure
function handlePostTweet(request, reply) {
  const oauth = authenticate();
  const {
    status
  } = request.body;
  oauth.post(
    'https://api.twitter.com/1.1/statuses/update.json',
    access_token_key,
    access_token_secret,
    status,
    ((error, data, response) => {
      if (error) console.error(error);
  reply.response(data).code(200)
    })
)
}

// handle Re-tweet - by PraveenKumar Thakur
 function handleReTweet(request, reply) {
  const oauth = authenticate();
  const {
    id
  } = request.query;

  oauth.post(
    `https://api.twitter.com/1.1/statuses/retweet/${id}.json`,
    access_token_key,
    access_token_secret,
    ((error, data, response) => {
      if (error) console.error(error);
  reply.response(data).code(200)
    })
)
}

// handle Delete tweet  of user - by Jignesh Madhani
function handleDeleteTweet(request, reply) {
  const oauth = authenticate();
  const {
    id
  } = request.params;
  oauth.post(
    `https://api.twitter.com/1.1/statuses/destroy/${id}.json`,
    access_token_key,
    access_token_secret,
    ((error, data, response) => {
      if (error) console.error(error);
  reply.response(data).code(200)
    })
)
}

module.exports = server;
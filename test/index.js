const assert = require('chai').assert;
const server = require('../server');
const request = require('request');
const nock = require('nock');
const mock = require('./timeline-mock.js')

server.register([{
  register: require('inject-then')
}])

describe('Twitter Api ', function () {
  beforeEach(() => {
    nock('https://api.twitter.com/1.1/statuses/home_timeline.json')
  .get('/handleTimeline')
    .reply(200, mock);
});
  it('call handleTimeline', function () {
    return server.injectThen({
      method: 'GET',
      url: '/handleTimeline'
    })
      .then(
        function (response) {
          assert.deepEqual(response.raw.req.url,'/handleTimeline');
          assert.deepEqual(response.raw.req.method,'GET');

        }
      )
  })

  it('call handleReTweet', function () {
    return server.injectThen({
      method: 'post',
      url: '/handleRetweet'
    })
      .then(
        function (response) {
          assert.deepEqual(response.raw.req.url,'/handleRetweet');
          assert.deepEqual(response.raw.req.method,'POST');

        }
      )
  })

  it('call handleDelete', function () {
    return server.injectThen({
      method: 'delete',
      url: '/deleteTweet'
    })
      .then(
        function (response) {
          assert.deepEqual(response.raw.req.url,'/deleteTweet');
          assert.deepEqual(response.raw.req.method,'DELETE');

        }
      )
  })

  it('call post Tweet', function () {
    console.log("server",server)
    return server.injectThen({
      method: 'post',
      url: '/postTweet'
    })
      .then(
        function (response) {
          assert.deepEqual(response.raw.req.url,'/postTweet');
          assert.deepEqual(response.raw.req.method,'POST');

        }
      )
  })
  it('should invalidate if server is running', function () {
    return server.injectThen({
      method: 'GET',
      url: '/'
    })
      .then(
        function (response) {
          assert.notEqual(response.statusCode, 400);
        }
      )
  })
})
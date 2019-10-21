import React, { Component} from 'react';
import axios from "axios";
import FeedCard from './components/feed';
import FormField from "./components/formField";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      feeds: [],
      tweet:''
    };
     this.handleRetweet = this.handleRetweet.bind(this);
    this.handleDeleteTweet = this.handleDeleteTweet.bind(this);
    this.handlePostTweet = this.handlePostTweet.bind(this);
  }


  componentDidMount() {
    this.getTweets()
      .then(res => this.setState({ data: res.express }))
  .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  
  getTweets = async () => {
  const {data} = await axios.get('/getTimeline');
  this.setState({feeds:data})

  if (data.status !== 200) {
this.setState({error:data})
   throw Error(data.message)
  }
}

handleDeleteTweet = async(id) => {
const response = await axios.delete(`/deleteTweet/${id}`);
}

handleRetweet = async(id) => {
  const response = await axios.post(`/reTweet/${id}`);
  if(response.status === 200){
  }
}
handlePostTweet = async(status) => {
  const response = await axios.post('/postTweet', status);
}

render() {
  const {feeds}= this.state;
  return (
    <div>
    <FormField handlePostTweet ={this.handlePostTweet}/>
    {feeds.map((feed, index) => (
    <FeedCard key={feed.id_str} text={feed.text} user={feed.user}
    id={feed.id_str}
    media={feed.entities.media && feed.entities.media[0].media_url}
    count={{fav:feed.favorite_count, reTweet:feed.retweet_count}}
    handleRetweets={this.handleRetweet}
  handleDeleteTweet= {this.handleDeleteTweet}
    />
))}
</div>
);
}

}

export default App;
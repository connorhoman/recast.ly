import exampleVideoData from '/src/data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import searchYouTube from '../lib/searchYouTube.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInPlayer: exampleVideoData[0],
      videoList: exampleVideoData.slice(1)
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(clickedVideo) {
    this.setState({
      videoInPlayer : clickedVideo,
      videoList : this.state.videoList.filter(video => video.id.videoId !== clickedVideo.id.videoId)
    });
  }

  componentDidMount() {
    let init = {
      key: YOUTUBE_API_KEY,
      max: 5,
      q: 'Warcraft 3 Remastered'
    };

    let cb = (function(data) {
      this.setState({
        videoInPlayer: data[0],
        videoList: data.slice(1)
      });
    }.bind(this);
    searchYouTube(init, cb);
  }

  render() {
    return (<div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <div><h5><em>search</em> view goes here</h5></div>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={this.state.videoInPlayer}/>
        </div>
        <div className="col-md-5">
          <VideoList onClick={this.handleClick} videos={this.state.videoList}/>
        </div>
      </div>
    </div>
    );
  }
}
// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

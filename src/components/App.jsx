import exampleVideoData from '/src/data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import Search from './Search.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInPlayer: exampleVideoData[0],
      videoList: exampleVideoData,
      // input: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  handleClick(clickedVideo) {
    this.setState({
      videoInPlayer: clickedVideo,
    });
  }

  searchClick() {
    let text = document.getElementsByClassName('form-control')[0].value;
  
    let init = {
      key: YOUTUBE_API_KEY,
      max: 5,
      query: text 
    };
    let cb = data => {
      this.setState({
        videoInPlayer: data[0],
        videoList: data
      });
    };
    
    this.props.searchYouTube(init, cb);
    document.getElementsByClassName('form-control')[0].value = '';
  }

  // getData() {

  // }
  componentDidMount() {
    let init = {
      key: YOUTUBE_API_KEY,
      max: 5,
      query: 'inception'
    };

    let cb = data => {
      this.setState({
        videoInPlayer: data[0],
        videoList: data
      });
    };
    this.props.searchYouTube(init, cb);
  }

  render() {
    return (<div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search search={this.searchClick}/>
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

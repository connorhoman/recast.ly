var searchYouTube = (options, callback) => {
  $.ajax({
      data: {
        key: options.key,
        q: options.query,
        type: 'video',
        videoEmbeddable: 'true',
        part: 'snippet',
        maxResults: options.max
      },
      type: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      success: function(data) {
        callback(data.items);
      }
  })
};

export default searchYouTube;

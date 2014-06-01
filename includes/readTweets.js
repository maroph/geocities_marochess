/* 
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/
 * Last Update : 04-AUG-2012 , 17:53
 * License     : Creative Commons Attribution 3.0 Germany License
 *               http://creativecommons.org/licenses/by/3.0/de/deed.en
 * =============================================================================
 * TweetReader: a jQuery based Twitter tweets reading JavaScript.
 * This JavaScript code is based on the following post:
 * Title: Create A Dead Simple Twitter Feed with jQuery<br/>
 * URL:   http://www.queness.com/post/8567/create-a-dead-simple-twitter-feed-with-jquery
 */


/**
 * Twitter tweets reader JavaScript.
 * Parameters to set:
 * TweetReader.user      : Twitter username
 * TweetReader.numTweets : number of tweets to show
 * TweetReader.appendTo  : id/class to append tweets
 */
TweetReader = {
	// core function of TweetReader
	loadTweets: function() {
		$.ajax({
			url      : 'http://api.twitter.com/1/statuses/user_timeline.json/',
			type     : 'GET',
			dataType : 'jsonp',
			data     : {
				screen_name      : TweetReader.user,
				include_rts      : true,
				count            : TweetReader.numTweets,
				include_entities : true
			},
            success: function(data) {

			 var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';

                 // first delete old content
                 $(TweetReader.appendTo).text('');
				 // append tweets into page
				 for (var i = 0; i < data.length; i++) {
					$(TweetReader.appendTo).append(
						html.replace('TWEET_TEXT', TweetReader.ify.clean(data[i].text))
							.replace(/USER/g, data[i].user.screen_name)
							.replace('AGO', TweetReader.timeAgo(data[i].created_at))
							.replace(/ID/g, data[i].id_str)
					);
				 }					
			}	
		});
	}, 
	
		
	/**
      * relative time calculator FROM TWITTER
      * @param dateString {string} twitter date string returned from Twitter API
      * @return {string} relative time like "2 minutes ago"
      */
    timeAgo: function(dateString) {
		var rightNow = new Date();
		var then = new Date(dateString);
		
		if ($.browser.msie) {
			// IE can't parse these crazy Ruby dates
			then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
		}

		var diff = rightNow - then;

		var second = 1000,
		    minute = second * 60,
		    hour   = minute * 60,
		    day    = hour * 24;

		if (isNaN(diff) || diff < 0) {
			return then; // if unknown return the Twitter dateString only
		}

		if (diff < second * 2) {
			// within 2 seconds
			return 'right now (' + then + ')';
		}

		if (diff < minute) {
			return Math.floor(diff / second) + ' seconds ago (' + then + ')';
		}

		if (diff < minute * 2) {
			return 'about 1 minute ago (' + then + ')';
		}

		if (diff < hour) {
			return Math.floor(diff / minute) + ' minutes ago (' + then + ')';
		}

		if (diff < hour * 2) {
			return 'about 1 hour ago (' + then + ')';
		}

		if (diff < day) {
			return  Math.floor(diff / hour) + ' hours ago (' + then + ')';
		}

		if (diff > day && diff < day * 2) {
			return 'yesterday (' + then + ')';
		}

		if (diff < day * 365) {
			return Math.floor(diff / day) + ' days ago (' + then + ')';
		}

		else {
			return 'over a year ago (' + then + ')';
		}
	}, // timeAgo()
    
	
    /**
      * The Twitalinkahashifyer!
      * http://www.dustindiaz.com/basement/ify.html
      * Eg:
      * ify.clean('your tweet text');
      */
    ify:  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },

      at: function(tweet) {
        return tweet.replace(/\B[@ï¼ ]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },

      list: function(tweet) {
        return tweet.replace(/\B[@ï¼ ]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },

      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },

      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    } // ify
};

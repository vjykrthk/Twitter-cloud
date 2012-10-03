(function(){

	$("#create_cloud").on('click', function(e) {		
		e.preventDefault();
		var twitter_handle = $('#twitter_handle').val();
		yqlQuery(twitter_handle)		
	} );

	function yqlQuery(twitter_handle) {
		yqlURL = "http://query.yahooapis.com/v1/public/yql",
		query = 'select * from twitter.user.timeline(0,200) where screen_name="' + twitter_handle + '"',
		data = {
        	q: query,
        	format: 'json',
        	env: 'store://datatables.org/alltableswithkeys'
     	 };
      	$.get(yqlURL, data, function(response) { get_tweets(response) }, 'jsonp');
	}

	function get_tweets(response) {
			console.log(response)
			var tweets = response.query.results.statuses.status
			var t = [];
			for (i = 0; i < tweets.length; i++) {
				l = tweets[i].text.split(" ").length;

				t[l] = (t[l] == undefined) ? 1 : t[l] +1
				console.log(t[l])
			}
			built_freq_val_object_array(t);
	}

	function built_freq_val_object_array(t) {
		var tt = []
		for(i=0; i<t.length; i++) {
			if(t[i] != undefined) {
				tt.push({ value: t[i], content: i })
			}
		}

		template = $.trim( $('#tweet_list_template').html());

		frag = "";

		$.each( tt, function( index, obj ) {
		frag +=
			template.replace( /{{value}}/ig, obj.value )
					.replace( /{{content}}/ig, obj.content );		
		});
		$("#tweet_list_container").html("").append(frag).tagcloud({height:500, 
			sizemin:12, sizemax:100,colormin:"F81908", colormax:"2F29FF"});
		$("#tweet_list_container>li").sort(value);
	}

})();
$.ajax({
  "url":"https://www.kimonolabs.com/api/dk3ccga4?apikey=iJgWrYB6oSsnFWLyiVIcGM2Xj4Jjbfsi",
  "crossDomain":true,
  "dataType":"jsonp",
  //Make a call to the Kimono API following the "url" 
  
  'success': function(response){ 
  // If the call request was successful and the data was retrieved, 
  // this function will create a list displaying the data
  
    var collection = response.results.collection1;

    var lastTweet = collection[0].lastTweet.text;
    var currentStatus = lastTweet.split('(')[0];
    console.log(currentStatus);

    if (currentStatus.indexOf("out") != -1) {
      var status = "out";
    } else if (currentStatus.indexOf("home") != -1) {
      var status = "in";
    }

    if (status === "out") {
      $("#weather").css("display","inline");
    }

    console.log(status);

    var elapsedTimeType = collection[0].tweetTime.text.slice(-1);
    console.log(elapsedTimeType);
    var elapsedTime = collection[0].tweetTime.text;
    console.log(elapsedTime);

    // This function writes the little content-blurb based on whether
    // the last tweet was Pépito entering or leaving. The language changes
    // based on whether the timestamp ends with "h" or "m" and otherwise
    // just says he's been gone for days.

    function writeStatus(a) {
      if (a === "out") {
        if (elapsedTimeType === "h") {
          if (elapsedTime.slice(0,-1) === "1") {
            var outside = "Pépito has been outside for one hour."
          } else {
          var outside = "Pépito has been outside for " + elapsedTime.slice(0,-1) + " hours."
          }
        } else if (elapsedTimeType === "m") {
          if (elapsedTime.slice(0,-1) === "1") {
            var outside = "Pépito has been outside for one minute."
          } else {
            var outside = "Pépito has been outside for " + elapsedTime.slice(0,-1) + " minutes."
          }
        } else {
          var outside = "Pépito has been outside for days!"
        }
        $("#status").html(outside);
        $("#audio").html('<source src="audio/outside.mp3" type="audio/mpeg">');
        // $("body").css("background-image", "url('images/forest.jpg')");
      } else if (a === "in") {
        if (elapsedTimeType === "h") {
          if (elapsedTime.slice(0,-1) === "1") {
            var inside = "Pépito has been inside for one hour."
          } else {
          var inside = "Pépito has been inside for " + elapsedTime.slice(0,-1) + " hours."
          }
        } else if (elapsedTimeType === "m") {
          if (elapsedTime.slice(0,-1) === "1") {
            var inside = "Pépito has been inside for one minute."
          } else {
            var inside = "Pépito has been inside for " + elapsedTime.slice(0,-1) + " minutes."
          }
        } else {
          var inside = "Pépito has been inside for days!"
        }
        $("#status").html(inside); 
        $("#audio").html('<source src="audio/inside.mp3" type="audio/mpeg">');
        $("body").css("background-image", "url('images/catbed.jpg')");
      }
    }

    writeStatus(status);

    if (status === "in") {
      var buttonOff = "images/tv_on.png";
      var buttonOn = "images/tv_off.png";
    } else if (status === "out") {
      var buttonOff = "images/bird_on.png";
      var buttonOn = "images/bird_off.png";
    }

    // Sets the image for the pause  and play buttons based on inside/outside status
    // audio autoplays, so shows "on" button at first

    var audioStatus = true;
    $("#button_image").attr("src", buttonOff);

    $("#button").click(function() {
      if (audioStatus === true) {
        $("#audio").each(function() {
          this.pause();
          $("#button_image").attr("src", buttonOn);
          audioStatus = false;
      });} else if (audioStatus === false) {
        $("#audio").each(function() {
          this.play();
          $("#button_image").attr("src", buttonOff);
          audioStatus = true;
        });
      }
    });



  }

});

jQuery(document).ready(function($) {
  $.ajax({
    url : "http://api.wunderground.com/api/2148427742f34360/geolookup/conditions/q/France/Toulouse.json",
    dataType : "jsonp",

    success : function(response) {

    var location = response['location']['city'];
    var weather = response['current_observation']['weather'];
    $("#weather_text").html(weather + " <em>chez</em> Pépito");

  }
  });
});

jQuery(document).ready(function($) {
  $.ajax({
    url : "http://api.wunderground.com/api/2148427742f34360/webcams/q/France/Toulouse.json",
    dataType : "jsonp",

    success : function(response) {
    var webcam = response['webcams'][1]['CURRENTIMAGEURL'];
    var webcamURL = "'"+webcam+"'"

    var currentStatus = $("#status").html();
    console.log(currentStatus);

    if (currentStatus.indexOf("outside") != -1) {
      $('body').css("background-image", "url("+webcamURL+")");
      $('body').css("background","cover");
    };
    
  }
  });
});
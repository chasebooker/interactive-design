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
    };

    status = "out"; // overriding to use as example

    console.log(status);

    var elapsedTimeType = collection[0].tweetTime.text.slice(-1);
    console.log(elapsedTimeType);
    var elapsedTime = collection[0].tweetTime.text;
    console.log(elapsedTime);

    // This function writes the little content-blurb based on whether
    // the last tweet was Pépito entering or leaving. The language changes
    // based on whether the timestamp ends with "h" or "m" and otherwise
    // just says he's been gone for days.

    // Overwriting as example

    elapsedTime = "8h";
    elapsedTimeType = "h";
    status = "out";

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

// Fetches and writes the weather status in the #weather div

jQuery(document).ready(function($) {
  $.ajax({
    url : "http://api.wunderground.com/api/2148427742f34360/geolookup/conditions/q/France/Toulouse.json",
    dataType : "jsonp",

    success : function(response) {

    var location = response['location']['city'];
    var weather = response['current_observation']['weather'];
    var temp = response['current_observation']['temp_f'];

    console.log(weather);

    $("#weather_text").html(weather+"<br>"+temp+"&#176;F");

    function weatherColor(bg,type) {
      $("body").css("background-color",bg);
      $("#weather").css("color",type);
    };

    var currentStatus = $("#status").html();
    currentStatus = currentStatus.split(" ")[3]
    console.log(currentStatus);

    // Change background based on the time of day
    // if Pépito is outside

    var date = new Date();
    console.log(date);
    var time = date.getUTCHours();
    console.log(time);


    $("body").css("background-color", "#A9CCFF");
    $("#sun").css("display", "inline");


    


  }
  });
});

// Displays a webcam image from Toulouse if Pépito is outside

jQuery(document).ready(function($) {
  $.ajax({
    url : "http://api.wunderground.com/api/2148427742f34360/webcams/q/France/Toulouse.json",
    dataType : "jsonp",

    success : function(response) {
    var webcam = response['webcams'][2]['CURRENTIMAGEURL'];
    var webcamURL = "'"+webcam+"'"

    var currentStatus = $("#status").html();
    currentStatus = currentStatus.split(" ")[3]
    console.log(currentStatus);

    if (currentStatus === "outside") {
      $('body').css("background-image", "url("+webcamURL+")");
      $('body').css("background","cover");
      $("#weather").css("display","inline");
    };
    
  }
  });
});
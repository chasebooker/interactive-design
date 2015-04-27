// 1) Find your API's unique code.
//    To do this, go to your API's page and copy the string of numbers and letters after "apis/" in the URL
//    Paste this code in line 10 of the below code after "api/" and before the "?"

// 2) Find your username's unique API key.
//    When you are logged into Kimono, click your name at the top right and click "Account".
//    Your API key will appear. Paste this code in line 10 of the below code after "apikey-"

$.ajax({
  "url":"https://www.kimonolabs.com/api/dk3ccga4?apikey=iJgWrYB6oSsnFWLyiVIcGM2Xj4Jjbfsi",
  "crossDomain":true,
  "dataType":"jsonp",
  //Make a call to the Kimono API following the "url" 
  
  'success': function(response){ 
  // If the call request was successful and the data was retrieved, this function will create 
  // a list displaying the data
  

    var collection = response.results.collection1;

    var lastTweet = collection[0].lastTweet.text;
    var currentStatus = lastTweet.split('(')[0];
    console.log(currentStatus);

    if (currentStatus.indexOf("out") != -1) {
      var status = "out";
    } else if (currentStatus.indexOf("home") != -1) {
      var status = "in";
    }
    console.log(status);

    var elapsedTimeType = collection[0].tweetTime.text.slice(-1);
    console.log(elapsedTimeType);
    var elapsedTime = collection[0].tweetTime.text;
    console.log(elapsedTime);

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
        $("body").css("background-image", "url('images/forest.jpg')");
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

    var audioStatus = true;

    $("#button").click(function() {
      if (audioStatus === true) {
        $("#audio").each(function() {
          this.pause();
          $("#button_image").attr("src","images/play.png");
          audioStatus = false;
        });} else if (audioStatus === false) {
          $("#audio").each(function() {
            this.pause();
            this.play();
            $("#button_image").attr("src","images/stop.png");
            audioStatus = true;
          });
        }
      });



  }

});


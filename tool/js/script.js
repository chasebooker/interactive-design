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

    var tweetContent = collection[0].lastTweet.text;
    console.log(tweetContent);

    var pepitoPic = collection[0].tweetImage.src;
    console.log(pepitoPic);

    var regExp = /\(([^)]+)\)/;
    var timestamp = regExp.exec(tweetContent)[1];
    console.log(timestamp);  

    var catStatus = tweetContent.split('(')[0];
    console.log(catStatus);

    var currentDate = moment().format();
    console.log(currentDate);

    function toTimeZone(time, zone) {
      var format = "YYYY/MM/DD HH:mm:ss ZZ";
      return moment(time, format).tz(zone).format(format);
    }

    var adjustedTime = toTimeZone(currentDate, "Europe/Paris");
    console.log(adjustedTime);

    function splitTime(time) {
      var timeArray = time.split(":");
      return timeArray;
    }

    var adjustedTimeSplit = splitTime(adjustedTime);
    var timestampSplit = splitTime(timestamp);
    console.log(adjustedTimeSplit, timestampSplit);

    

    var difference = [
      adjustedTimeSplit[0] - timestampSplit[0],
      adjustedTimeSplit[1] - timestampSplit[1],
      adjustedTimeSplit[2] - timestampSplit[2]
    ]
    console.log(difference);

    function writeStatus(status) {
      if (status === "Pépito is out") { 
        var outside = "Pépito has been outside for " + 
          difference[0] + " hours and " + difference[1] + " minutes";
        $("#status").html(outside); 
        $("body").css("background-image", "url('images/forest.jpg')");
      }
      else { 
        var inside = "Pépito has been inside for " + 
          difference[0] + " hours and " + difference[1] + " minutes";
        $("#status").html(inside);
        $("body").css("background-image", "url('images/catbed.jpg')");
        }
    }

    writeStatus(catStatus);

  }

});


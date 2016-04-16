////////////////////////////////////////////////
//SUBMIT ROAD RAGE
////////////////////////////////////////////////
function submitRage(){
	$(document).ready(function(){
		
		$("#raterage").click(function(e) {

		  e.preventDefault();
		  var name = $("#name").val(); 
		  var score = $("input[type='radio'][name='score']:checked").val();
		  var city = $("#city").val();
		  var dataString = 'score='+score+'&city='+city+'&ref=mobile';
		  $.ajax({
			type:'POST',
			crossDomain: true,
			data:dataString,
			url:'http://www.monkeymeter.com/submit-app.php',
			success:function(data) {
			alert(data);
			  $( "#recent" ).trigger( "click" );
			}
		  });
		return false;
		
		});
	});
}




////////////////////////////////////////////////
//SHOW PAGE CONTENT/MENU
////////////////////////////////////////////////
function showPageContent(){
		$("#recentragers").css("display", "none");
		$("#forecastpage").css("display", "none");
		$("#newspage").css("display", "none");
		$("#topragerspage").css("display", "none");
		$("#recentusragerspage").css("display", "none");
		$(document).ready(function(){
				
				$("#rate").click(function(){
				$(".pages").css("display", "none");
				$("#rateyourroadrage").css("display", "inline-block");
			});
			
				$("#recent").click(function(){
				$(".pages").css("display", "none");
				$("#recentragers").css("display", "inline-block");
			});

				$("#forecast").click(function(){
				$(".pages").css("display", "none");
				$("#forecastpage").css("display", "inline-block");
			});	
			
				$("#topragers").click(function(){
				$(".pages").css("display", "none");
				$("#topragerspage").css("display", "inline-block");
			});

				$("#news").click(function(){
				$(".pages").css("display", "none");
				$("#newspage").css("display", "inline-block");
			});		

				$("#recentusragers").click(function(){
				$(".pages").css("display", "none");
				$("#recentusragerspage").css("display", "inline-block");
			});				
		});
}



////////////////////////////////////////////////
//SHOW RECENT RAGERS FOR LOCATION
//AND GET TOTAL POINTS FOR CITY FORECAST
////////////////////////////////////////////////

var cityScore = 0;
var recentcityScore = 0;

function getScores(){
	var recentHTML = "<table id='recentragers' border='0' cellpadding='3' style='margin-bottom:20px;'><tbody>";
	var abc = Math.random();
	
	var totalPoints = 0;
	var recentPoints = 0; //first 10% of all entries, to compare with total ave, to see trend
	var tpCount = 0;
	
	$.ajax({
		url: "http://www.monkeymeter.com/json/scores.json?refresh=" + abc,
		//force to handle it as text
		dataType: "text",
		success: function(data) {
			
			//data downloaded so call parseJSON function 
			//and pass downloaded data
			var json = $.parseJSON(data);
			
			//get recent data for the city the user is in
			var x = json.scores.length;
			var percX = x/15; //percentage of recent scores to grab
			var city = $("#city").val();
			
			for (var i = 0; i < x; i++){
				
				if (city == json.scores[i].city){ 
					var gw = 20*json.scores[i].score; //graph
		            var z = json.scores[i].score * 1;
					totalPoints = totalPoints + z;
					tpCount = tpCount + 1;
					
					if (tpCount < percX){
						recentPoints = recentPoints + z;
					}
					
					if (tpCount < 50){  //limiting to 25 to show on screen.
						recentHTML =  recentHTML + "<tr><td>"+json.scores[i].when+"</td><td>"+json.scores[i].score+" <img border='0' src='img/graph.jpg' width='"+gw+"' height='10' alt='"+json.scores[i].score+"'></td></tr>"; 		
					}
				}

			}
			recentHTML = recentHTML + "</tbody></table>";
			
			
			recentcityScore = recentPoints/percX;
			recentcityScore = recentcityScore.toFixed(2);
			cityScore = totalPoints/tpCount;
			$('#recentscores').html(recentHTML+"<p>&nbsp;</p>");
					
		}
	});
	
}



////////////////////////////////////////////////
//SHOW FORECAST FOR CITY
////////////////////////////////////////////////

function getForecast(){
var fcScore = [];
fcScore[0] = cityScore;
var forecastHTML = "";
var ratings = [];
var fontcolor =[];
var ratingpic= [];
 


	
//gettings days of week 
var d = new Date();
var weekday = new Array(7);
weekday[0]=  ["Sun", .02];
weekday[1] = ["Mon", .03];
weekday[2] = ["Tue", .03];
weekday[3] = ["Wed", .04];
weekday[4] = ["Thu", .04];
weekday[5] = ["Fri", .05];
weekday[6] = ["Sat", .04];

var n=weekday[d.getDay()]; 
var dayNum = d.getDay();
if (dayNum < 3){
	var day3 = weekday[dayNum+2][0]; 
	var day4 = weekday[dayNum+3][0]; 
	var day5 = weekday[dayNum+4][0]; 
	fcScore[1]=fcScore[0] + weekday[dayNum+1][1];
	fcScore[2]=fcScore[0] + weekday[dayNum+2][1];
	fcScore[3]=fcScore[0] + weekday[dayNum+3][1];
	fcScore[4]=fcScore[0] + weekday[dayNum+4][1];
}

if (dayNum ==3 ){
	var day3 = weekday[5][0]; 
	var day4 = weekday[6][0]; 
	var day5 = weekday[0][0]; 
	fcScore[1]=fcScore[0] + weekday[4][1];
	fcScore[2]=fcScore[0] + weekday[5][1];
	fcScore[3]=fcScore[0] + weekday[6][1] ;
	fcScore[4]=fcScore[0] + weekday[0][1];

}

if (dayNum ==4 ){
	var day3 = weekday[6][0]; 
	var day4 = weekday[0][0]; 
	var day5 = weekday[1][0]; 
	fcScore[1]=fcScore[0] + weekday[5][1];
	fcScore[2]=fcScore[0] + weekday[6][1];
	fcScore[3]=fcScore[0] + weekday[0][1] ;
	fcScore[4]=fcScore[0] + weekday[1][1];

}
if (dayNum ==5 ){
	var day3 = weekday[0][0]; 
	var day4 = weekday[1][0]; 
	var day5 = weekday[2][0]; 
	fcScore[1]=fcScore[0] + weekday[6][1];
	fcScore[2]=fcScore[0] + weekday[0][1];	
	fcScore[3]=fcScore[0] + weekday[1][1];
	fcScore[4]=fcScore[0] + weekday[2][1];
}
if (dayNum ==6 ){
	var day3 = weekday[1][0]; 
	var day4 = weekday[2][0]; 
	var day5 = weekday[3][0]; 
	fcScore[1]=fcScore[0] + weekday[0][1];
	fcScore[2]=fcScore[0] + weekday[1][1];	
	fcScore[3]=fcScore[0] + weekday[2][1];
	fcScore[4]=fcScore[0] + weekday[3][1];
}

//get rating level
for (var i = 0; i < 5; i++){
	if (fcScore[i] > 0)
		{
		ratings[i]="None";
		fontcolor[i] = "blue";
		ratingpic[i]="img/monkey-ok.png";
		}
	if (fcScore[i]  > 1)
		{
		ratings[i]="Low";
		fontcolor[i] = "green";
		ratingpic[i]="img/monkey-ok.png";
		}
	if (fcScore[i]  > 2)
		{
		ratings[i]="Ave";
		fontcolor[i] = "black";
		ratingpic[i]="img/monkey-ave.png";
		}
	if (fcScore[i] > 3)
		{
		ratings[i]="High";
		fontcolor[i] = "orange";
		ratingpic[i]="img/monkey-high.png";
		}
	if (fcScore[i]  > 4)
		{
		ratings[i]="Dangerous"; 
		fontcolor[i] = "red";
		ratingpic[i]="img/monkey-dan.png";
		} 
} 	

//show trend
var arrow="";
var altarrow = "";
if (cityScore <= recentcityScore){
	arrow = "up.jpg";
	altarrow = "road rage has been increasing";
	fcScore[0] = fcScore[0] + .04;
	}
else {
	arrow = "down.jpg";
	altarrow = "road rage has been decreasing";
	fcScore[0] = fcScore[0] - .03;
	}
	

forecastHTML = "<p>Current rating in your area is: <strong><span style=\"color:" + fontcolor[0] + " \">" + cityScore.toFixed(2) + "</span></strong>, and the recent trend is that "+altarrow+".<br><img class=\"trend\" src=\"img/" + arrow + "\" alt=\"" + altarrow + "\"></p>";


forecastHTML = forecastHTML + "<div id=\"theforecast\">";

	forecastHTML = forecastHTML + "<div class=\"forecasting\">";
		forecastHTML = forecastHTML + "<div class=\"fcheader\">Today</div>";
		forecastHTML = forecastHTML + "<div class=\"fcrating\"><img src=\"" + ratingpic[0] + "\"><br>"  + ratings[0] + "<br>" +  fcScore[0].toFixed(2) + "</div>";
	forecastHTML = forecastHTML + "</div>";
	
	forecastHTML = forecastHTML + "<div class=\"forecasting\">";
		forecastHTML = forecastHTML + "<div class=\"fcheader\">Tomorrow</div>";
		forecastHTML = forecastHTML + "<div class=\"fcrating\"><img src=\"" + ratingpic[1] + "\"><br>"  + ratings[1] + "<br>" +  fcScore[1].toFixed(2) + "</div>";
	forecastHTML = forecastHTML + "</div>";

	forecastHTML = forecastHTML + "<div class=\"forecasting\">";
		forecastHTML = forecastHTML + "<div class=\"fcheader\">" + day3 + "</div>";
		forecastHTML = forecastHTML + "<div class=\"fcrating\"><img src=\"" + ratingpic[2] + "\"><br>"  + ratings[2] + "<br>" +  fcScore[2].toFixed(2) + "</div>";
	forecastHTML = forecastHTML + "</div>";

	forecastHTML = forecastHTML + "<div class=\"forecasting\">";
		forecastHTML = forecastHTML + "<div class=\"fcheader\">" + day4 + "</div>";
		forecastHTML = forecastHTML + "<div class=\"fcrating\"><img src=\"" + ratingpic[3] + "\"><br>"  + ratings[3] + "<br>" +  fcScore[3].toFixed(2) + "</div>";
	forecastHTML = forecastHTML + "</div>";

	forecastHTML = forecastHTML + "<div class=\"forecasting\">";
		forecastHTML = forecastHTML + "<div class=\"fcheader\">" + day5 + "</div>";
		forecastHTML = forecastHTML + "<div class=\"fcrating\"><img src=\"" + ratingpic[4] + "\"><br>"  + ratings[4] + "<br>" +  fcScore[3].toFixed(2) + "</div>";
	forecastHTML = forecastHTML + "</div>";
	
forecastHTML = forecastHTML + "</div>";

$('#forecastforcity').html(forecastHTML);
}



////////////////////////////////////////////////
//SHOW RECENT RAGERS THROUGHOUT US
////////////////////////////////////////////////

function getUSratings(){
	var recentHTML = "<table id='usrecentragers' border='0' cellpadding='3' style='margin-bottom:20px; font-size:85%;width=100%;'><tbody>";
	var abc = Math.random();
	
	$.ajax({
		url: "http://www.monkeymeter.com/json/scores.json?refresh=" + abc,
		//force to handle it as text
		dataType: "text",
		success: function(data) {
			
			//data downloaded so call parseJSON function 
			//and pass downloaded data
			var json = $.parseJSON(data);
			
			//get recent data for the city the user is in
			var x = json.scores.length;
						
			for (var i = 0; i < 100; i++){
				

					var gw = 8*json.scores[i].score; //graph
		            var z = json.scores[i].score * 1;
					//show only year
					json.scores[i].when = json.scores[i].when.slice(0,10); 
					
						recentHTML =  recentHTML + "<tr><td width='160'>"+json.scores[i].city+"</td><td width='100' style='white-space: nowrap;'>"+json.scores[i].when+"</td><td><span style='font-weight:bold;'>"+json.scores[i].score+"</span></td><td width='45'> <img border='0' src='img/graph.jpg' width='"+gw+"' height='10' alt='"+json.scores[i].score+"'></td></tr>"; 		


			}
			recentHTML = recentHTML + "</tbody></table>";
			$('#recentusratings').html(recentHTML+"<p>&nbsp;</p>");
					
		}
	});
	
}
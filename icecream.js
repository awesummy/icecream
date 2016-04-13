function initMap() {
//	var URL = "1GDI1qvPmMKCvYlIcXjbrLX1Zx4w8miz87JIf-2-fc5U";
    var URL = "1VCgZ2FIGL-HAnfHihjKs99nR_P7ghMcXJryR6BSlnjQ";
	Tabletop.init( { key: URL, callback: next, simpleSheet: true } )
}


function next(data) {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: new google.maps.LatLng(40.763641, -73.983307)
	});

	
	var geocoder = new google.maps.Geocoder();
	
	for(var i = 0; i < data.length; i++) {
		console.log(data[i])
		var address = data[i]["address"];
		geocoder.geocode( {"address": address}, makeCallBack(data, i, map));	
	}//for loop
}// function
	

	
function makeCallBack(data1, i, map) {
	//console.log(i);
	
	var geocodeCallBack = function(results, status) {
		var coded = results[0].geometry.location;
		console.log(i);
		console.log(data1[i]["name"]);
		
        
			var marker = new google.maps.Marker({
				position: coded,
				map: map,
				name: data1[i]["storename"],
				address: data1[i]["address"],
                description: data1[i]["description"],
				storehours: data1[i]["storehours"],
				site: data1[i]["website"],
                review: data1[i]["ourreview"],
			});
							
			var infowindow = new google.maps.InfoWindow({
				content: "temp"
			});
			

            
			marker.addListener('click', function() {
				infowindow.setContent('<div id="content"><b>Name: </b>'+ this.name + '<br><b>Address: </b>' + 
					this.address + '<br><b>Description: </b>' + this.description + 
					'<br><b>Store Hours: </b>' + this.storehours + '<br><b>Website: </b><a id="links" target="blank" href="'+this.site+'">Click to learn more</a>'+ '<br><b>Review: </b><a id="links" target="blank" href="'+this.review+'">Read our review</a>'+ 
					'</div>');
				infowindow.open(map, this);
			});

		
	} //geocodeCallBack
	
	
	
	return geocodeCallBack;
} //makeCallBack
	   
	   

				
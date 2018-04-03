
//---------------------------------------------------------------

	var table_mgmt_api 	= "snap_table.php";
	var table_func_api	= "snap_table/snap_table.php";
	
	var base_view	= "mgmt_table"; 
	
	var vdiweb_link	= "/vdiweb/"
	
	var view_build		= []; 
	var view_call_fw 	= []; 

//---------------------------------------------------------------
	
	function view_call(){
		
		if( hash_handler['get']('snap_table_view') != undefined ){
			
			var snap_table_view = hash_handler['get']('snap_table_view');
		}
		else{
			var snap_table_view = base_view;
			window.location.hash = hash_handler['set']( "snap_table_view" , snap_table_view );
		}
		
		view_call_fw[ snap_table_view ]();
	}

//---------------------------------------------------------------

	function IsJsonString( str ) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

//---------------------------------------------------------------

	function center_domel( domel ) {
		
				
		var body_with 		= document.body.offsetWidth;
		var body_height 	= document.body.offsetHeight;
		
		var domel_with 		= domel.offsetWidth;
		var domel_height 	= domel.offsetHeight;
		
		var left 	= (( body_with - domel_with ) / 2 ) / body_with * 100 ;
		var top 	= (( body_height - domel_height ) / 2 ) / body_height * 100 ;
		
				
		domel.style.position 	= "fixed";
		domel.style.left 		= left+"%";
		domel.style.top 		= top+"%";
	}
	
//---------------------------------------------------------------
	
	function menue_create( domel ) {
		
		//------------------------------
		
			var menue_vals = [];
				
				menue_vals["mgmt_table"] 	= "Tables";
				menue_vals["fk_table"] 		= "Foreign Keys";
				menue_vals["howto"] 		= "How to use";
				
		//------------------------------
		
			var menue_bar = document.getElementById("menue_bar");
				menue_bar.innerHTML = "";
		
		//------------------------------
		
			for( var prop in menue_vals ){
				
				var menue_btn = document.createElement("DIV");
					menue_btn.innerHTML = menue_vals[prop];
					
					menue_btn.setAttribute( "view" , prop );
					menue_btn.onclick = function(){
						
						var view = this.getAttribute( "view" );
						
						window.location.hash = hash_handler['set']( "snap_table_view" , view );
						location.reload();
					}
					
				menue_bar.appendChild(menue_btn);
			}
			
		//------------------------------
	}
	
//---------------------------------------------------------------

	function form_post( api , formData , follow_func ){
		
		var http 	= new XMLHttpRequest();
		http.open("POST", api );
		http.send(formData);	
		
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200 ) {
				
				console.log( http.responseText );
				
				if( IsJsonString( http.responseText ) == true && follow_func != undefined ){ 
					
					var obj = JSON.parse( http.responseText );
					follow_func( obj );
				}
				else if( follow_func != undefined ){
					follow_func( http.responseText );	
				}
				else{
					
				}
			}
			else if( http.readyState == 4 && http.status.substring(0,1) == 4 ) {
				console.log( http.responseText );
				
				alert(http.responseText);
			}
		}
	}


//-------------------------------------------------------------


//var formData = new FormData();
//	formData.append("function", "init_app" );
//	formData.append("controller_ip", controller_ip.value );

//	form_post( auth_api , formData , view_call );	
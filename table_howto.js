//---------------------------------------------------------------

	view_call_fw['howto'] = function (){
		
		//------------------------------
		
			var file_path = "howto_txt.html";
		
		//------------------------------
		
			var formData = new FormData();
			formData.append("function", "content_call" );
			formData.append("file_path", file_path );

			form_post( table_mgmt_api , formData , view_build["howto"] );
		
		//------------------------------
	}
	
//---------------------------------------------------------------

	view_build['howto'] = function( content ){
		
		//------------------------------
		
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";
		
		//------------------------------
				var html_target = document.createElement("DIV");
					html_target.classList.add("html_target");
					html_target.innerHTML = content;
				
				mainres.appendChild(html_target);
	}	
	
//---------------------------------------------------------------
//---------------------------------------------------------------

	view_call_fw['preview'] = function (){
		
		//---------------------------
		
			window.snap_table_func_api = table_mgmt_api;
		
		//---------------------------
		
			var target_domel = document.getElementById("topres");
				target_domel.innerHTML = "";
		
		//---------------------------
			
				var back_btn = document.createElement("BUTTON");
				target_domel.appendChild(back_btn);
					back_btn.classList.add("back_btn");
					back_btn.innerHTML = 'back'
					back_btn.onclick = function(){
						
						window.location.hash = hash_handler['set']( "snap_table_view" , "mgmt_table" );
						window.snap_table_id = table_id; 
									
						location.reload();
					}
		//---------------------------
		
			var table_id = hash_handler['get']( "snap_table_id" );
			
		//---------------------------	
			
			var formData = new FormData();
			formData.append("function", "snap_table_call" );
			formData.append("table_id", table_id );
			formData.append("target_domid", "mainres" );

			form_post( table_mgmt_api , formData , view_build["insert"] );
			
		
		//---------------------------
	}
	
//---------------------------------------------------------------


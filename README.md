# snap_table
A web-based table editor. Easy to implement into your WebApps

This is a simple to implement and easy to use web-based table editor.
It's based on standard script languages and tools without the need of a database in the Back-End.
Javascript, HTML5, CSS (Front-End)
PHP (API / Back-End)
JSON (File-based Key => Value Store)
The code ( tool folder => snap_table ) can be cloned into your web application base directory via git
git clone https://github.com/alirionx/snap_table.git
chown www-data:www-data snap_table
You can simply define and test a table via the Management Web Tool ( Menue => Tables )
It is possible to define custom dropdowns as well as linked dropdowns ( Menue => Tables )
Feels free to customize the table style via "snap_table_cus.css" in the tool folder "snap_table"
The following code has to be copied into the head of your HTML document:
<head>

<script type="text/javascript" src="snap_table/table_functions.js"></script>;
<script type="text/javascript" src="snap_table/app_base.js"></script>
<script type="text/javascript" src="snap_table/table_insert.js"></script>

<script type="text/javascript" src="snap_table/hashhandler.js"></script>

</head>

After that you can call the table into a HTML container like this:
<body onload="snap_table_call( 3 , 'test_target' )">

<div id="test_target"> </div>

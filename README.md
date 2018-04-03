# snap_table
A web-based table editor. Easy to implement into your WebApps

<h3>This is a simple to implement and easy to use web-based table editor.</h3>
<h4>It's based on standard script languages and tools without the need of a database in the Back-End.</h4>
<ul>
<li>Javascript, HTML5, CSS (Front-End)</li>
<li>PHP (API / Back-End)</li>
<li>JSON (File-based Key => Value Store)</li>
</ul>
<h4>The code ( tool folder => snap_table ) can be cloned into your web application base directory via git</h4>
git clone https://github.com/alirionx/snap_table.git<br>
chown www-data:www-data snap_table<br>
and brows the cloned directory e.g. http://example.com/yourapp/snap_table/<br>
<ul>
<li>You can simply define and test a table via the Management Web Tool ( Menue => Tables )</li>
<li>It is possible to define custom dropdowns as well as linked dropdowns ( Menue => Tables )</li>
<li>Feels free to customize the table style via "snap_table_cus.css" in the tool folder "snap_table"</li>
</ul>

<h4>The following code has to be copied into the head of your HTML document:</h4>

&lt;head&gt;<br>
	<br>
	&lt;script type="text/javascript" src="snap_table/table_functions.js"&gt;&lt;/script&gt;;<br>
	&lt;script type="text/javascript" src="snap_table/app_base.js"&gt;&lt;/script&gt;<br>
	&lt;script type="text/javascript" src="snap_table/table_insert.js"&gt;&lt;/script&gt;<br>
	<br>
	&lt;script type="text/javascript" src="snap_table/hashhandler.js"&gt;&lt;/script&gt;<br>
	<br>
&lt;/head&gt;<br>
<br>

<h4>After that you can call the table into a HTML container like this:</h4>

&lt;body onload="snap_table_call( 3 , 'test_target' )"&gt;<br>
	<br>
	&lt;div id="test_target"&gt; &lt;/div&gt;<br>

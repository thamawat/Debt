<?php 
include "Controller/database.php";
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<!-- include css file-->
<link rel="stylesheet" href="Controller/css/bootstrap.min.css">
<link rel="stylesheet" href="Controller/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="Controller/css/style.css">
<link rel="stylesheet" href="Controller/css/font-awesome.min.css">

<!--include js file-->
<script src="Controller/js/bootstrap.js" type="text/javascript"></script>
<script src="Controller/js/bootstrap.min.js" type="text/javascript"></script>
<script src="Controller/js/npm.js" type="text/javascript"></script>
<script src="Controller/js/jquery-3.1.1.min.js" type="text/javascript"></script>
<script src="Controller/js/jquery.min.js" type="text/javascript"></script>
<script>
	window.jQuery || document.write('<script src="Controller/js/jquery.min.js"><\/script>')
</script>
<script src="Controller/js/ie10-viewport-bug-workaround.js" type="text/javascript"></script>

<title>Debt - Dashboard</title>
</head>

<body>
<?php
	//include "View/sidebar.php";
	//include "View/navbar.php";
	include "View/dashboard.php";
?>
<!--<h1><?php echo database::test(); ?></h1>-->

</body>

</html> 
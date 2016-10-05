<?php 
class database{
		private static $host = "192.168.123.200";
		private static $user = "external";
		private static $pass = "passw0rd";
		private static $dbname = "nova";
		private static $connect;

		private static function connect(){
			self::$connect = mysqli_connect(self::$host, self::$user, self::$pass, self::$dbname);
			mysqli_Set_charset(self::$connect, "utf8");
		}

		private static function close(){
			mysqli_close(self::$connect);
		}

		public static function test(){
			self::connect();
			$strSql = "SELECT created_at FROM instance_actions WHERE id = 1;";
			$query = mysqli_query(self::$connect, $strSql);
			if($query){
				$data = mysqli_fetch_assoc($query)['created_at'];
				self::close();
				return $data;
			}
			else{
				self::close();
				return "Error";
			}
		}

		public static function query($strSql){
			self::connect();
			$query = mysqli_query(self::$connect, $strSql);
			if($query){
				$data = mysqli_fetch_assoc($query);
				self::close();
				return $data;
			}
			else{
				self::close();
				return "Error";
			}
		}
}
?>
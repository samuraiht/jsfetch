<?php
# データベースから読み出せるとなお良しです！
$zaiko = [
	['name' => 'Apple', 'count' => 13],
	['name' => 'Orange', 'count' => 7],
	['name' => 'Kiwi', 'count' => 3]
];

//url: https://????.com/ajax.php?mode=zaiko
//method: "POST" -> name=Orange
#if($_GET['mode'] === "login") {
#	$item = $_POST['id'];//Orange
#	//在庫をデータベースから取得してレスポンス
#	//echo …;
#}

//URL: https://~~~.php?name=Apple
//$requrest = '';
if(!empty($_GET['name'])) $request = $_GET['name']; else if(!empty($_POST['name'])) $request = $_POST['name'];//post形式の場合はこっち(getが空なので)

//$request -> 'Apple'等
$result = 2;
$count = 0;
if(!empty($request)) {
	foreach($zaiko as $record) {
		if($request === $record['name']) {
			$result = 0;
			$count = $record['count'];
			break;
		}
	}
	$result = 1;
}
echo '{"result":' . $result . ',"count":' . $count . '}';
?>
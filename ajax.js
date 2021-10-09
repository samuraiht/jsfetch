window.onload = () => {
// GET / POST メソッドの実装の例
  async function fetchData(requestURL, getQuery = '', postQuery = '') {
    const ispost = postQuery != '';
// 既定のオプションには * が付いています
    const data = {
      method: ispost ? 'POST' : 'GET',// *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': ispost ? 'application/x-www-form-urlencoded' : 'text/plain'},
      mode: 'cors',// no-cors, *cors, same-origin
      cache: 'no-cache',// *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',// include, *same-origin, omit
      redirect: 'follow',// manual, *follow, error
      referrerPolicy: 'no-referrer'// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    if(ispost) data.body = postQuery;// 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります

    const response = await fetch(requestURL + (getQuery != '' ? '?' + getQuery : ''), data);
    return response.json();// レスポンスの JSON を解析
  }

  function showResult(data) {
    console.log(data);//レスポンス
    const text = document.getElementById('response');
    switch(data.result) {
      case 0:
        text.textContent = '在庫は' + data.count + '個です。';
        break;
      case 1:
        text.textContent = '存在しない品目です。';
        break;
      case 2:
        text.textContent = 'パラメーターが正しくありません。';
    }
  }

// GETの呼び出し例
  document.getElementById('get').onclick = e => {
    e.preventDefault();//既定の動作(formの送信など)を停止
    fetchData('ajax.php', 'name=' + document.getElementById('item').value).then(data => { showResult(data); });
  };

// POSTの呼び出し例
  document.getElementById('post').onclick = e => {
    e.preventDefault();
    fetchData('ajax.php', '', 'name=' + document.getElementById('item').value).then(data => { showResult(data); });
  };
};
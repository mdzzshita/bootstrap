var products;

var request = new XMLHttpRequest();
request.open('GET', 'products.json');
request.responseType = 'json';

request.onload = function() {
    if(request.status === 200) 
    {
      products = request.response;
      console.log(products);
    } 
    else 
    {
      console.log('网络请求失败' + request.status + ': ' + request.statusText)
    }
  };
  
  request.send();
 $(document).ready(function() {
  $("#bookFilter").click(function(e) {

/*
[{"bookId":1,"name":"test","user":{"userId":1,"firstName":"hgjgh","lastName":"ghj"},"available":false,"categories":["Fantasy"]},{"bookId":2,"name":"Book test","user":{"userId":2,"firstName":"test","lastName":"test"},"available":false,"categories":["Detective fiction"]}]
*/

var books = [];

var content;



    var table = document.querySelector("table");
		$.ajax({
                 method: "GET",
                 url: "http://localhost:8080/books/test/?categories=",
                 success: function(data) {
                    const obj = JSON.parse(content);
                    console.log('object is ' + obj)
                 },
                 error: function(er) {
                   console.log(er);
                 }
               });

console.log('content is ' + content)

//var object = JSON.parse(content);

//console.log('object is ' + object)




   var trArr = table.getElementsByTagName('tr');
    for (var i = 0, l = trArr.length; i < l; i++)
        trArr[i].insertCell(0);


  })
});
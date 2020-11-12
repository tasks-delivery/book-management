 $(document).ready(function() {
  $("#bookFilter").click(function(e) {

   findBook();

   var table = document.querySelector("table");

   var trArr = table.getElementsByTagName('tr');
    for (var i = 0, l = trArr.length; i < l; i++)
        trArr[i].insertCell(0);


  })

  async function findBook() {

  var books = [];

  const endpoint = 'http://localhost:8080/books/test/?categories=';
  	let response = await fetch(endpoint);
  	let json = await response.json();
  	for(i = 0; i < json.length; i++){

		var book = new Book(json[i].name, json[i].categories, json[i].available);

  	    console.log('name is ' + book.name);
  	    console.log('cat is ' + book.categories);
  	    console.log('ava is ' + book.available);

  	    books.push(book);

  	}

  	console.log('books are ' + books);

  }

  function Book(name, categories, available) {
    this.name = name;
    this.categories = categories;
    this.available = available;
  }
});
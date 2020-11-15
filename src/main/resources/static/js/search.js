 $(document).ready(function() {

  $(window).load(function(){
         findBook("", "");
  });

  $("#bookFilter").click(function(e) {

    var bookName = $("#bookName").val();
	var categoryList = [];
    var selector = document.querySelector("select");
    var option = selector.options[selector.selectedIndex];

	categoryList.push(option.value);

    findBook(categoryList, bookName);

  })

  async function findBook(categories, name) {

  $('table').html("");

  var books = [];

  console.log('filtered name is ' + + name);

  const endpoint = "/books/?categories=" + categories + "&name=" + name;
  	let response = await fetch(endpoint);
  	let json = await response.json();
  	for(i = 0; i < json.length; i++){

		var book = new Book(json[i].name, json[i].categories, json[i].available);

  	    console.log('name is ' + book.name);
  	    console.log('cat is ' + book.categories);
  	    console.log('ava is ' + book.available);

        renderTable(book.name, book.categories, book.available)

  	    books.push(book);

  	}

  	console.log('books are ' + books);

  }

  function renderTable(name, category, available){

    var table = document.querySelector("table");

        row = document.createElement("tr");

        cellName = document.createElement("td");
        cellCategory = document.createElement("td");
        cellAvailable = document.createElement("td");

        cellAvailable.innerHTML="<img class=\"book-status-img\" src=\"/asset/true.png\" th:src=\"@{asset/true.png}\"/>";
		if(!available){
			cellAvailable.innerHTML="<img class=\"book-status-img\" src=\"/asset/false.png\" th:src=\"@{asset/true.png}\"/>";
		}

        cellName.setAttribute('class', 'name-cell');
        cellCategory.setAttribute('class', 'category-cell');
        cellAvailable.setAttribute('class', 'available-cell');

        textName = document.createTextNode(name);
        textCategory = document.createTextNode(category);
        textAvailable = document.createTextNode("");

        cellName.appendChild(textName);
        cellCategory.appendChild(textCategory);
        cellAvailable.appendChild(textAvailable);

        row.appendChild(cellName);
        row.appendChild(cellCategory);
        row.appendChild(cellAvailable);

        table.appendChild(row);
  }

  function Book(name, categories, available) {
    this.name = name;
    this.categories = categories;
    this.available = available;
  }

});
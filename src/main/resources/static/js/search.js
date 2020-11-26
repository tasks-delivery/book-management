var books = [];

function storeBookId(event){

    window.onclick = e => {
        localStorage.setItem("bookId", e.target.id);
    }

}

//***********************************Book Dialog**************************



function removeBook(event){

    window.onclick = e => {


jQuery(function($) {
$( "#myModal" ).dialog({
      autoOpen: false,
      height: 520,
      width:  520, resizable: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });

    $( "#removeIcon" ).click(function() {
      $( "#myModal" ).dialog( "open" );
    });

 });


    }

}



//**********************************************************************

$(document).ready(function() {

  $(window).load(function(){
        var header = document.querySelector("header");
        var img = document.createElement("img")
        img.setAttribute('onclick', 'location.href="/book";');
        img.setAttribute('src', '/asset/admin-icon.png');
        img.setAttribute('th:src', '@{asset/admin-icon.png}');
        img.setAttribute('class', 'admin-icon');
        header.appendChild(img);
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

  console.log('filtered name is ' + + name);

  const endpoint = "/books/?categories=" + categories + "&name=" + name;
  	let response = await fetch(endpoint);
  	let json = await response.json();
  	for(i = 0; i < json.length; i++){

		var book = new Book(json[i].bookId, json[i].name, json[i].categories, json[i].available);

  	    console.log('bookId is ' + book.bookId);
  	    console.log('name is ' + book.name);
  	    console.log('cat is ' + book.categories);
  	    console.log('ava is ' + book.available);

        renderTable(book)

  	    books.push(book);

  	}

  	console.log('books are ' + books);

  }






  function renderIcon(available, bookId){
  	return "<img class='book-status-img' src='/asset/"+available+".png' th:src='@{asset/"+available+".png}'/>"
      +"<a href='/edit' onclick='storeBookId()'>"
      +"<img id="+bookId+" class='edit-book-img' src='/asset/edit-icon.png' th:src='@{asset/edit-icon.png}'/>"
      +"</a>"
      +"<a id='removeIcon'>"
      +"<img class='remove-book-img' src='/asset/delete-icon.png' th:src='@{asset/delete-icon.png}'/>"
      +"</a>";
  }

    function dialog() {
        var dialog = $('#bookDialog').dialog();

    }

  function renderTable(book){

    var table = document.querySelector("table");

        row = document.createElement("tr");

        cellName = document.createElement("td");
        cellCategory = document.createElement("td");
        cellAvailable = document.createElement("td");

		cellAvailable.innerHTML = renderIcon(book.available, book.bookId);

        cellName.setAttribute('class', 'name-cell');
        cellCategory.setAttribute('class', 'category-cell');
        cellAvailable.setAttribute('class', 'available-cell');

        textName = document.createTextNode(book.name);
        textCategory = document.createTextNode(book.categories);
        textAvailable = document.createTextNode("");

        cellName.appendChild(textName);
        cellCategory.appendChild(textCategory);
        cellAvailable.appendChild(textAvailable);

        row.appendChild(cellName);
        row.appendChild(cellCategory);
        row.appendChild(cellAvailable);

        table.appendChild(row);
  }

  function Book(bookId, name, categories, available) {
    this.bookId = bookId;
    this.name = name;
    this.categories = categories;
    this.available = available;
  }

});
function Book(id, name, categories, available) {
  this.id = id;
  this.name = name;
  this.categories = categories;
  this.available = available;
}

var books = [];

function storeBookId(event){

    window.onclick = e => {
        localStorage.setItem("bookId", e.target.id);
    }

}

function removeBook(event){

    window.onclick = e => {

    if(e.target.id.length != 0){

         $.ajax({
              method: "DELETE",
              url: "book/?id=" + e.target.id,
              error: function(er) {
                console.log(er);
              },
               statusCode: {
                  200: function() {
                      $('table').html("");
                      console.log("Book is removed");

                      for(i = 0; i < books.length; i++){

                         if(books[i].bookId == e.target.id){

                             var index = books.indexOf(books[i]);
                             if (index !== -1) {
                               books.splice(index, 1);
                               break;
                             }

                         }
                      }

                      for(i = 0; i < books.length; i++){

                         var book = new Book(books[i].id, books[i].name, books[i].categories[0].name, books[i].available);

                         console.log('bookId is ' + book.id);
                         console.log('name is ' + book.name);
                         console.log('cat is ' + book.categories[0].name);
                         console.log('ava is ' + book.available);

                         renderTable(book)

                      }

                  },
                  400: function() {
                    throw new Error('Book with user cannot be removed');
                  },
                  404: function() {
                    throw new Error('Book not found');
                  }
                }
            });

        }

    }

}

function renderIcon(available, id){
		return "<img class='book-status-img' src='/asset/"+available+".png' th:src='@{asset/"+available+".png}'/>"
        +"<a href='/edit' onclick='storeBookId()'>"
        +"<img id="+id+" class='edit-book-img' src='/asset/edit-icon.png' th:src='@{asset/edit-icon.png}'/>"
        +"</a>"
        +"<a onclick='removeBook()'>"
        +"<img id="+id+" class='remove-book-img' src='/asset/delete-icon.png' th:src='@{asset/delete-icon.png}'/>"
        +"</a>";
	}

  function renderTable(book){

    var table = document.querySelector("table");

        row = document.createElement("tr");

        cellName = document.createElement("td");
        cellCategory = document.createElement("td");
        cellAvailable = document.createElement("td");

		cellAvailable.innerHTML = renderIcon(book.available, book.id);

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

  console.log('filtered name is ' + + name);

  const endpoint = "/books/?categories=" + categories + "&name=" + name;
  	let response = await fetch(endpoint);
  	let json = await response.json();
  	for(i = 0; i < json.length; i++){

		var book = new Book(json[i].id, json[i].name, json[i].categories[0].name, json[i].available);

  	    console.log('bookId is ' + book.id);
  	    console.log('name is ' + book.name);
  	    console.log('cat is ' + book.categories[0].name);
  	    console.log('ava is ' + book.available);

        renderTable(book)

  	    books.push(book);

  	}

  	console.log('books are ' + books);

  }

});
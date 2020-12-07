function Book(bookId, name, categories, available) {
  this.bookId = bookId;
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

function removeBook(bookId){

 var table = document.querySelector(".table-separator");

	  var div = document.querySelector('#ele-overlay');
	  div.setAttribute('class', 'overlay');
      table.append(div);

      var dialog = document.getElementById("myDialog");

      if(dialog.open == false){
         dialog.showModal();
      }

	  var btnCancel = document.querySelector("#btn-cancel");
	  btnCancel.addEventListener("click", function() {
	    var dialog = document.getElementById("myDialog");
	    div.style.display = "none";
        dialog.close();
	  });

      var btnOk = document.querySelector("#btn-ok");
      btnOk.addEventListener("click", function() {

        if(bookId != 0){

                 $.ajax({
                      method: "DELETE",
                      url: "book/?id=" + bookId,
                      error: function(er) {
                        console.log(er);
                      },
                       statusCode: {
                          200: function() {
                              $('table').html("");
                              console.log("Book is removed");

                              for(i = 0; i < books.length; i++){

                                 if(books[i].bookId == bookId){

                                     var index = books.indexOf(books[i]);
                                     if (index !== -1) {
                                       books.splice(index, 1);
                                       break;
                                     }

                                 }
                              }

                              for(i = 0; i < books.length; i++){

                                 var book = new Book(books[i].bookId, books[i].name, books[i].categories, books[i].available);

                                 console.log('bookId is ' + book.bookId);
                                 console.log('name is ' + book.name);
                                 console.log('cat is ' + book.categories);
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
         div.style.display = "none";
         dialog.close();
      });

}


function renderIcon(available, bookId){
		return "<img class='book-status-img' src='/asset/"+available+".png' th:src='@{asset/"+available+".png}'/>"
        +"<a href='/edit' onclick='storeBookId()'>"
        +"<img id="+bookId+" class='edit-book-img' src='/asset/edit-icon.png' th:src='@{asset/edit-icon.png}'/>"
        +"</a>"
        +"<a onclick='removeBook("+bookId+")'>"
        +"<img id="+bookId+" class='remove-book-img' src='/asset/delete-icon.png' th:src='@{asset/delete-icon.png}'/>"
        +"</a>";
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

});
$(document).ready(function() {

 var bookId = null;

 $(window).load(function(){

      bookId = localStorage.getItem("bookId");
      findBookById(bookId);

 });

 async function findBookById(bookId){
		const endpoint = "/book/" + bookId;
		let response = await fetch(endpoint);
		let book = await response.json();
		console.log('bookId is ' + book.bookId);
		console.log('name is ' + book.name);
		console.log('cat is ' + book.categories);
		console.log('ava is ' + book.available);
		console.log('first name is ' + book.user.firstName);
		console.log('last name is ' + book.user.lastName);

		$("#book-name").val(book.name);
		$("#first-name").val(book.user.firstName);
		$("#last-name").val(book.user.lastName);
		$('#category-selector').val(book.categories[0]);

 }

 $("#bookSubmit").click(function(e) {
   e.preventDefault();

   var categoryList = [];
   var selector = document.querySelector("select");
   var option = selector.options[selector.selectedIndex];
   var bookName = $("#book-name").val();

   if(option.value.length == 0){
       throw new Error('Category or book name are empty');
   }

   if(bookName.length == 0){
       throw new Error('Category or book name are empty');
   }

   if (!bookName.replace(/\s/g, '').length) {
       throw new Error('Book name cannot be contains only spaces');
   }

   categoryList.push(option.value);

   var bookData = {
           name: bookName,
           categories:categoryList,
           user:
               {
               firstName:$("#first-name").val(),
               lastName:$("#last-name").val()
               }
   }

   console.log(bookData);
   $.ajax({
         method: "PUT",
         url: "book/" + bookId,
         dataType: "json",
         contentType: 'application/json',
         data: JSON.stringify(bookData),
         success: function(data) {
           console.log(data);
         },
         error: function(er) {
           console.log(er);
         },
          statusCode: {
             200: function() {
               location.href='/search';
             },
             400: function() {
               throw new Error('Book already exists');
             }
           }
       });

  })

});
$(document).ready(function() {

 var bookId = null;

 $(window).load(function(){

      bookId = localStorage.getItem("bookId");
      findBookById(bookId);
	  console.log('bookId from localStore is ' + bookId);
 });

 async function findBookById(bookId){
		const endpoint = "/book/" + bookId;
		let response = await fetch(endpoint);
		let book = await response.json();
		console.log('bookId is ' + book.id);
		console.log('name is ' + book.name);
		console.log('cat is ' + book.categories);
		console.log('ava is ' + book.available);
		console.log('first name is ' + book.user.firstName);
		console.log('last name is ' + book.user.lastName);

		$("#book-name").val(book.name);
		$("#first-name").val(book.user.firstName);
		$("#last-name").val(book.user.lastName);
		$('#category-selector').val(book.categories[0].name);

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
           categories:[{
                      name:categoryList[0]
                      }],

           user:
               {
               firstName:$("#first-name").val(),
               lastName:$("#last-name").val()
               },

//TODO: Fake book location data, should be replaced to final solution in future.
            location:
                {
                variety:'A',
                number:'2'
                },

//TODO: Fake publisher data, should be replaced to final solution in future.
            publisher:
                {
                name:'Publisher Home At Moscow',
                date:'2020-12-06 20:21:34.231'
                },

//TODO: Fake author data, should be replaced to final solution in future.
            authors:
            [{
            firstName:'First name test',
            lastName:'Last name test'
            }]
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
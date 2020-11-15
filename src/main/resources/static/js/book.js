 $(document).ready(function() {
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
         method: "POST",
         url: "book",
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
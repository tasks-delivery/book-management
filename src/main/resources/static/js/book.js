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

//TODO: Fake book location data, should be replaced to final solution in future.
            bookTypes:
                [{
                name:'Free book'
                }],

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

    $.ajax({
         method: "POST",
         url: "api/book",
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
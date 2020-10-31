 $(document).ready(function() {
  $("#bookSubmit").click(function(e) {
    e.preventDefault();

	var categoryList = [];
    var selector = document.querySelector("select");
    var option = selector.options[selector.selectedIndex];
    categoryList.push(option.value);

	var bookData = {
            name: $("#book-name").val(),
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
      }
    });

  })
});
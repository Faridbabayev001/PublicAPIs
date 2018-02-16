$(document).ready(function () {
    $('#searchForm').submit(function (e) {
        e.preventDefault();
        var searchText = $('#search').val();
        var table = $('#myTable');
        var tableBody = table.find('tbody');
        var errorField = $('.errorFiled')
        var errorText = errorField.find('span');
        tableBody.html('');
        if (searchText.trim() != '') {
            $.getJSON('https://api.publicapis.org/entries?title=' + searchText, function (result) {
                if (result.count) {
                    errorField.hide();
                    table.show();
                    $.each(result.entries, function (key, value) {
                        console.log(value.Auth);
                        value.Auth = (value.Auth == '') ? "No" : value.Auth;
                        tableBody.append(
                            "<tr>" +
                            "<td>" + value.API + "</td>" +
                            "<td>" + value.Description + "</td>" +
                            "<td>" + value.Auth + "</td>" +
                            "<td>" + value.HTTPS + "</td>" +
                            "<td>" + value.Category + "</td>" +
                            "<td>" + value.Cors + "</td>" +
                            "<td>" +
                            "<a href='" + value.Link + "' target='_blank'>Go</a>" +
                            "</td>" +
                            "</tr >"
                        );
                    });
                } else {
                    table.hide();                    
                    errorField.show();
                    errorText.html('').html(searchText)
                }
            });
        }
    });
})
$(document).ready(function (){
    let title; let message; let image;
    let url = new URL(document.location.href);
    let id = url.searchParams.get('id');
    let path = `http://localhost:3000/posts/${id}`;
    $.ajax({
        url: path,
        method: "GET",
        success: function(data){
            $('#postTitle').val(data.postTitle);
            $('.card-body').val(data.postMessage);
        }
        
    });
    $('#updateButton').on('click',function(){
        title = $('#postTitle').val();
        message =  $('.card-body').val();
        image = 'https://picsum.photos/200/300/',
        newData =  { postTitle: title, postMessage: message, postImage: image };
        $.ajax({
            url: path,
            method: "PUT",
            data: newData,
            success: function(data){
                     /* sweet alert starts here */
                    swal({
                        position: 'top-end',
                        type: 'update success',
                        title: 'Your post has been made',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    /* sweet alert ends here */
                }
            
            });
    });
});
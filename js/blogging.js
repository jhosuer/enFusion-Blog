$(blog);

function blog() {
    var id;
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/posts",
        dataType: "JSON",
        success: function (response) {
            let blogResponse = response.reverse();
            JSON.stringify(blogResponse);
            $.each(blogResponse, function (index, value) {
                //alert(value.postTitle)
                let blogTitle = value.postTitle;
                let currentMessage = value.postMessage;
                let currentImage = value.postImage;
                let subCurrentMessage = currentMessage.substring(0, 201);
                dbID = value.id;
                //let j = this.id;
                let currentList = `<br><div class='col-md-4 blogList'>
                <img src='${currentImage}' id='bloggingTitle'><br><h4>${blogTitle}</h4><span>${subCurrentMessage}</span><br><a href="fullBlog.html?postid=${dbID}" class='seeMore'>See More -></a></div>`;
                $('.blogPost .blogTopRow').append(currentList);
            });
                // let fullList = `<br><div class='col-md-4 fullBlogList'>
                // <img src='${currentImage}' id='bloggingImage'><br><h4>${blogTitle}</h4><br><span>${currentMessage}</span></div>`;
                // $('.fullBlogPost .fullBlogTopRow').append(fullList);

            $(document).on('click',function(){
                    //alert($(this).closest('a')).attr(dbID);
                    //alert(Cookies.get(id));
                    // let fullList = `<br><div class='col-md-4 fullBlogList'>
                    // <img src='${currentImage}' id='bloggingImage'><br><h4>${blogTitle}</h4><br><span>${currentMessage}</span></div>`;
                
                //$('.fullBlogPost .fullBlogTopRow').append(Cookies.get(id));
                    
            });
           
        }

    });  
}
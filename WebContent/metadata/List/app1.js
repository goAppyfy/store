
//var likesCount = parseInt($('button[data-control-name=likes_count]  .visually-hidden')[0].innerText.split(' ')[0])
//var commnetsCount = parseInt($('button[data-control-name=comments_count]  .visually-hidden')[0].innerText.split(' ')[0])

function showAllComments(callback) {
    if ($('#show_prev').length == 0) {
        if (callback) {
            callback();
        }
    } else {
        if ($('.loader').length == 0) {
            $('#show_prev').click();
        }
        setTimeout(function() {
            showAllComments(callback);
        }, 1000);
    }
};

function saveComments(callback) {
    var data = 'Name,EmailId,PhoneNo,Reference,Comment,Profile Link,Avtar Link';
    var i = 1;
    
    var articles = $('.feed-s-comments-list article');
    articles.each(function(i, article) {
        var name = '';
        var comment = '';
        var email = '';
        var no = '';
        var refLink = '';
        var avtarURL = '';
        var profileLink = '';

        try {
            name = $(article).find('.profile-link span').first().html();
            if (name.indexOf(',') != -1) {
                name = '"' + name + '"';
            }
        } catch (e) {}
        try {
        	$(article).find('.feed-s-comment-item__main-content').find('span').find('span').each(function(i,span) {
        		comment = comment + span.innerHTML; 
        	});
            
            if (comment) {
                comment = comment.replace(/(\n)+/g, ' ').trim();
                comment.split(' ').forEach(function(word) {
//                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//                    if (re.test(word)) {
//                        email = word;
//                    }
                	if(word.indexOf('@') != -1 && word.indexOf('.') != -1 ){
                		email = word;
                	}
                    word = word.replace(/\+/g, '').replace(/-/g, '').trim();
                    if (!isNaN(word) && (word.length == 10 || word.length == 11 || word.length == 12)) {
                        no = word;
                        if (no.length == 11 || no.length == 12) {
                            no = no.substring(no.length - 10);
                        }
                    }
                });
                if (comment.indexOf(',') != -1) {
                    comment = '"' + comment + '"';
                }
            }
        } catch (e) {}
        try {
            refLink = $(article).find('.feed-s-comment-item__main-content').find('a').first().attr('href') || '';
            if (refLink.startsWith('/')) {
            	refLink = window.location.origin + refLink;
            }
        } catch (e) {}
        try {
            avtarURL = $(article).find('.avatar').first().attr('src');
            if (avtarURL.startsWith('data:')) {
                avtarURL = '';
            }
        } catch (e) {}
        try {
            profileLink = $(article).find('.profile-link')[0].href || '';
        } catch (e) {}
        
        data = data + '\n' + name + ',' + email + ',' + no + ',' + refLink + ',' + comment + ',' + profileLink + ',' + avtarURL;
        
    });
    console.log(data);
    if (callback) {
        callback(data);
    }
};

function download(fileName, text) {
    var el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    el.setAttribute('download', fileName);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}

showAllComments(function() {
    saveComments(function(data) {
        download('LinkedList.csv', data);
    });
});
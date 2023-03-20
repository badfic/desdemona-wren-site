import './common';
import $ from 'jquery';
import tumblrLogoUrl from './img/tumblr_logo.png';

$.get("https://blog.tallsdoe.com/feed.xml", function (data) {
    var i = 1;
    $(data).find("entry").each(function () {
        var el = $(this);

        var title = el.find("title").text();
        var descriptionArr = el.find("content").text().split(" ")
        var descriptionWords = descriptionArr.slice(0, Math.min(descriptionArr.length - 1, 30)).join(" ");
        var link = "https://blog.tallsdoe.com" + el.find("link").text();

        $('#blog-roll-' + i).append('<a href="' + link + '"><img class="img-fluid" src="' + tumblrLogoUrl + '"><h4>' + title + '</h4></a><p>' + descriptionWords + '...</p>');

        i++;
        return i <= 3;
    })
});

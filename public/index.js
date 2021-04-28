import './common';
import $ from 'jquery';
import tumblrLogoUrl from './img/tumblr_logo.png';

$.get("https://blog.desdemonawren.com/rss", function (data) {
    var i = 1;
    $(data).find("item").each(function () {
        var el = $(this);

        var title = el.find("title").text();
        var descriptionArr = el.find("content\\:encoded").text().split(" ")
        var descriptionWords = descriptionArr.slice(0, Math.min(descriptionArr.length - 1, 30)).join(" ");
        var link = el.find("link").text();
        var imageUrl = el.find("media\\:thumbnail").attr("url");

        if (imageUrl) {
            $('#blog-roll-' + i).append('<a href="' + link + '"><img class="img-fluid" src="' + imageUrl + '"><h4>' + title + '</h4></a><p>' + descriptionWords + '...</p>');
        } else {
            $('#blog-roll-' + i).append('<a href="' + link + '"><img class="img-fluid" src="' + tumblrLogoUrl + '"><h4>' + title + '</h4></a><p>' + descriptionWords + '...</p>');
        }

        i++;
        return i <= 3;
    })
});

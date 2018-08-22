var date = new Date();
var dateToString = (date.getMonth() + 1) + "월" + " " + (date.getDate()) + "일";
document.getElementById('Date').innerHTML = dateToString.toString();

var cards;
var count = 0;
function getCards() {
    $.ajax({
        type: "GET",
        url: Url.Card,
        headers: { "token": localStorage.systube },
        processData: false,
        contentType: false,
        success: function (response) {
            cards = response;
            cardScroll(8);
        },
        error: function (error) {}
    });
}

function cardMake(jsonObject) {
    var card = $('#cardDummy').clone(true);
    card[0].id = jsonObject.index;
    card.attr('style', 'display: block');
    card.addClass('active-card');
    card.children(0)[0].children[0].src = "https://www.youtube.com/embed/" + jsonObject.link + "?controls=2";
    card.children(0)[1].children[0].innerHTML = jsonObject.title;
    card.children(0)[1].children[1].innerHTML = jsonObject.date + "<br>" + jsonObject.name;
    card.children(0)[3].children[0].value = jsonObject.index;
    card.children(0)[3].children[0].children[1].innerText = "(" + jsonObject.like + ")";
    card.children(0)[3].children[1].value = jsonObject.index;
    card.children(0)[3].children[1].children[1].innerText = "(" + jsonObject.dislike + ")";
    if (jsonObject.userLike != null) {
        if (jsonObject.userLike == 'Y') {
            card.children(0)[3].children[0].classList.add('font-red');
        } else if (jsonObject.userLike == 'N') {
            card.children(0)[3].children[1].classList.add('font-blue');
        }
    }
    return card;
}

function cardScroll(wanted) {
    var limit = count + wanted;
    for (count; count < limit; count++) {
        var jsonObject = cards[count];
        var card = cardMake(jsonObject);
        $('.card-columns').append(card);
    }
}

$(document).ready(
    setTimeout(function () { getCards(); }, 0)
);

$(window).scroll(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        setTimeout(function () { cardScroll(9); }, 0)
    }
});

$('#ModalConfirm').click(function () {
    var modalLink;
    try {
        modalLink = new URL($('#ModalLink').val()).searchParams.get("v");
    } catch (exception) {
        modalLink = null;
    }

    var url = "https://img.youtube.com/vi/" + modalLink + "/0.jpg ";
    document.getElementById('ModalYoutube').src = url;
});

$('#ModalYoutube').click(function () {
    var linkTag = document.getElementById("Card[link]");
    var titleTag = document.getElementById("Card[title]");
    var modalLink = new URL($('#ModalLink').val()).searchParams.get("v");

    if (modalLink != null) {
        var url = "https://img.youtube.com/vi/" + modalLink + "/0.jpg ";
        $('#YoutubePop').modal('hide');
        $('#YoutubePhoto').css("background-image", "url(" + url + ")");
        linkTag.value = modalLink;
    }
});

$('#CardButton').click(function () {
    if (localStorage.systube == null) {
        openNav('LoginForm');
        return;
    }

    var linkTag = document.getElementById("Card[link]");
    var titleTag = document.getElementById("Card[title]");

    if (linkTag.value == null || linkTag.value == "") {
        $('#YoutubePop').modal();
        return;
    }

    if (titleTag.value == null || titleTag.value == "") {
        titleTag.focus();
        return;
    }

    // AJAX
    var formData = new FormData();
    formData.append('link', linkTag.value);
    formData.append('title', titleTag.value);

    $.ajax({
        type: "POST",
        url: Url.Card,
        headers: { "token": localStorage.systube },
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#CardCancelButton').click();
            $.ajax({
                type: "GET",
                url: Url.Card + "/" + response,
                headers: { "token": localStorage.systube },
                processData: false,
                contentType: false,
                success: function (response) {
                    var card = cardMake(response);
                    $('#cardForm').after(card);
                },
                error: function (error) {
                    localStorage.removeItem('systube');
                    openNav('LoginForm');
                }
            });
        },
        error: function (error) {
            $('#CardCancelButton').click();
            localStorage.removeItem('systube');
            openNav('LoginForm');
        }
    });
});

$('#CardCancelButton').click(function () {
    var linkTag = document.getElementById("Card[link]");
    var titleTag = document.getElementById("Card[title]");

    $('#ModalYoutube').attr("src", "https://static.highsnobiety.com/wp-content/uploads/2017/10/19172718/play-youtube-background-phone-01.gif");
    $('#ModalLink').val("");
    $('#YoutubePhoto').css("background-image", "");
    linkTag.value = "";
    titleTag.value = "";
});

$('#cardLike').click(function () {
    var cardForm = this;

    if (localStorage.systube == null) {
        openNav('LoginForm');
        return;
    }

    if (this.value == null || this.value == "") {
        return;
    }

    // AJAX
    var formData = new FormData();
    formData.append('userLike', "Y");

    $.ajax({
        type: "POST",
        url: Url.Card + "/" + this.value + "/like",
        headers: { "token": localStorage.systube },
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $.ajax({
                type: "GET",
                url: Url.Card + "/" + cardForm.value,
                headers: { "token": localStorage.systube },
                processData: false,
                contentType: false,
                success: function (jsonObject) {
                    cardForm.parentElement.children[0].classList.add('font-red');
                    cardForm.parentElement.children[0].children[1].innerText = "(" + jsonObject.like + ")";
                    cardForm.parentElement.children[1].classList.remove('font-blue');
                    cardForm.parentElement.children[1].children[1].innerText = "(" + jsonObject.dislike + ")";
                },
                error: function (error) {
                    localStorage.removeItem('systube');
                    openNav('LoginForm');
                }
            });
        },
        error: function (error) {
            $('#CardCancelButton').click();
            localStorage.removeItem('systube');
            openNav('LoginForm');
        }
    });
});

$('#cardDislike').click(function () {
    var cardForm = this;

    if (localStorage.systube == null) {
        openNav('LoginForm');
        return;
    }

    if (this.value == null || this.value == "") {
        return;
    }

    // AJAX
    var formData = new FormData();
    formData.append('userLike', "N");

    $.ajax({
        type: "POST",
        url: Url.Card + "/" + this.value + "/like",
        headers: { "token": localStorage.systube },
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
            $.ajax({
                type: "GET",
                url: Url.Card + "/" + cardForm.value,
                headers: { "token": localStorage.systube },
                processData: false,
                contentType: false,
                success: function (jsonObject) {
                    cardForm.parentElement.children[0].classList.remove('font-red');
                    cardForm.parentElement.children[0].children[1].innerText = "(" + jsonObject.like + ")";
                    cardForm.parentElement.children[1].classList.add('font-blue');
                    cardForm.parentElement.children[1].children[1].innerText = "(" + jsonObject.dislike + ")";
                },
                error: function (error) {
                    localStorage.removeItem('systube');
                    openNav('LoginForm');
                }
            });
        },
        error: function (error) {
            $('#CardCancelButton').click();
            localStorage.removeItem('systube');
            openNav('LoginForm');
        }
    });
});
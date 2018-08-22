const ServerUrl = "http://192.168.1.22:8080";
const Url = {
    "Login": ServerUrl + "/user/login",
    "Signup": ServerUrl + "/user/join",
    "Profile": ServerUrl + "/user/info",
    "Card": ServerUrl + "/boards",
};

var kindForm = "LoginForm";

function openNav() {
    if (localStorage.systube != null) {
        if (kindForm == "LogoutForm") {
            localStorage.removeItem('systube');
            kindForm = "LoginForm";
        } else {
            profileSetting();
            kindForm = "ProfileForm";
        }
    }

    if (kindForm == "ProfileForm" && localStorage.systube == null) {
        kindForm = "LoginForm";
    }

    document.getElementById("sideNav").style.width = "350px";
    setTimeout(function () {
        document.getElementById(kindForm).style.display = "block";
    }, 700);
}

function closeNav() {
    clearAll();
    document.getElementById("sideNav").style.width = "0";
    setTimeout(function () {
        document.getElementById(kindForm).style.display = "none";
    }, 0);
}

$('#openNavButton').click(function () {
    openNav();
});

$('#closeNavButton').click(function () {
    closeNav();
});

function GoForm(tempKindForm) {
    closeNav();
    setTimeout(function () {
        kindForm = tempKindForm;
        openNav();
    }, 700);
}

$(function () {
    $('form div .sidenav-inputs').each(function (e) {
        $(this).focus(function (e) {
            $(this).parent().toggleClass('none-active-class active-class');
        }).blur(function (e) {
            $(this).parent().toggleClass('active-class none-active-class');
        });
    });
});

function clearAll() {
    document.getElementById("Login[email]").value = "";
    document.getElementById("Login[password]").value = ""
    document.getElementById("Signup[photoBrief]").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVeZ3MrCQT9V5-PqAINbwmxBmv4IhcSnr5KBw5sHsl3JBXj1o";
    document.getElementById("Signup[photo]").value = "";
    document.getElementById("Profile[photoBrief]").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVeZ3MrCQT9V5-PqAINbwmxBmv4IhcSnr5KBw5sHsl3JBXj1o";
    document.getElementById("Profile[photo]").value = "";
    document.getElementById("Profile[email]").value = "";
    document.getElementById("Profile[password]").value = "";
    document.getElementById("Profile[name]").value = "";
}
const themeSelect =
document.getElementById(
    "themeSelect"
);

const notificationSelect =
document.getElementById(
    "notificationSelect"
);

const saveButton =
document.getElementById(
    "saveSettings"
);


// LOAD SETTINGS
const savedTheme =
localStorage.getItem(
    "theme"
);

if(savedTheme ===
"light"){

    document.body.classList.add(
        "light-mode"
    );
}

const savedNotification =
localStorage.getItem(
    "notification"
);


if(savedTheme){

    themeSelect.value =
    savedTheme;

    if(savedTheme ===
    "light"){

        document.body.classList.add(
            "light-mode"
        );
    }
}

if(savedNotification){

    notificationSelect.value =
    savedNotification;
}


// SAVE SETTINGS
saveButton.addEventListener(
"click", () => {

    localStorage.setItem(
        "theme",
        themeSelect.value
    );

    localStorage.setItem(
        "notification",
        notificationSelect.value
    );

    if(themeSelect.value ===
"light"){

    document.body.classList.add(
        "light-mode"
    );

}else{

    document.body.classList.remove(
        "light-mode"
    );
}

    alert(
        "Settings berhasil disimpan"
    );

});
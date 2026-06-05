// ==================================
// DATA SOURCE
// Dummy sekarang
// Nanti ganti ke ESP32
// ==================================

const DATA_SOURCE =
"data/dummy.json";

let lastWarning =
"none";

// SENSOR VALUE
const phValue =
document.getElementById("phValue");

const tempValue =
document.getElementById("tempValue");

const doValue =
document.getElementById("doValue");

// SENSOR STATUS
const phStatus =
document.getElementById("phStatus");

const tempStatus =
document.getElementById("tempStatus");

const doStatus =
document.getElementById("doStatus");

// ACTUATOR
const pumpIndicator =
document.getElementById("pumpIndicator");

const roofIndicator =
document.getElementById("roofIndicator");

const feederStatus =
document.getElementById(
    "feederStatus"
);

const feederTime =
document.getElementById(
    "feederTime"
);

const deviceStatus =
document.getElementById(
    "deviceStatus"
);

const pondName =
document.getElementById(
    "pondName"
);

const lastUpdate =
document.getElementById(
    "lastUpdate"
);

const warningBox =
document.getElementById(
    "warningBox"
);

const warningTitle =
document.getElementById(
    "warningTitle"
);

const warningText =
document.getElementById(
    "warningText"
);

// LOAD DATA
function loadSensor(){
fetch(DATA_SOURCE)
.then(response => response.json())
.then(data => {

    const ph = data.sensor.ph;
    const temp = data.sensor.temperature;
    const doLevel = data.sensor.do;
    const feedingSchedule = data.feeding_schedule;
    const feedingStatus = data.feeding_status;
    const device =
data.device_status;
const pond =
data.pond_name;

    // POND NAME
    pondName.textContent =
    pond;

    // LAST UPDATE
    const now =
    new Date();

    lastUpdate.textContent =
    "Last Update: " +
    now.toLocaleTimeString(
    "id-ID"
    );

    // PH
    phValue.textContent = ph;

    if(ph >= 6.5 && ph <= 8){

        phStatus.textContent =
        "Normal";

    }else{

        phStatus.textContent =
        "Tidak Stabil";
    }

    // TEMPERATURE
    tempValue.textContent =
    temp + "°C";

    if(temp >= 32){

        tempStatus.textContent =
        "Panas Tinggi";

        roofIndicator.textContent =
        "ON";

        roofIndicator.classList.remove(
            "off"
        );

        roofIndicator.classList.add(
            "on"
        );

    }

    else if(temp >= 29){

        tempStatus.textContent =
        "Warning";
    }

    else if(temp <= 28){

        tempStatus.textContent =
        "Optimal";

        roofIndicator.textContent =
        "OFF";

        roofIndicator.classList.remove(
            "on"
        );

        roofIndicator.classList.add(
            "off"
        );
    }

    // DO
    doValue.textContent =
    doLevel;

    if(doLevel < 3){

        doStatus.textContent =
        "Kritis";

        pumpIndicator.textContent =
        "ON";

        pumpIndicator.classList.remove(
            "off"
        );

        pumpIndicator.classList.add(
            "on"
        );
    }

    else if(doLevel >= 3 &&
            doLevel < 4){

        doStatus.textContent =
        "Mulai Rendah";
    }

    else if(doLevel >= 4 &&
            doLevel <= 5){

        doStatus.textContent =
        "Aman";
    }

    else{

        doStatus.textContent =
        "Sangat Baik";

        pumpIndicator.textContent =
        "OFF";

        pumpIndicator.classList.remove(
            "on"
        );

        pumpIndicator.classList.add(
            "off"
        );
    }

// FEEDER
feederStatus.textContent =
feedingStatus;

feederTime.textContent =
"Next: " +
feedingSchedule[2] +
" WIB";

// DEVICE STATUS
if(device ===
"online"){

    deviceStatus.textContent =
    "🟢 Connected";

}else{

    deviceStatus.textContent =
    "🔴 Offline";
}

// WARNING SYSTEM

warningBox.classList.remove(
    "hidden"
);

warningTitle.textContent =
"Monitoring Aman";

warningText.textContent =
"Tidak ada warning";


// SUHU KRITIS
if(temp >= 32){

    warningTitle.textContent =
    "⚠ Suhu Terlalu Tinggi";

    warningText.textContent =
    "Auto Roof dibuka otomatis";

    const notification =
    localStorage.getItem(
        "notification"
    );

    if(notification !==
    "off" &&
    lastWarning !==
    "temperature"){

        lastWarning =
        "temperature";

        alert(
            "⚠ WARNING\n\nSuhu Terlalu Tinggi!\nAuto Roof dibuka otomatis"
        );
    }
}


// DO KRITIS
else if(doLevel < 3){

    warningTitle.textContent =
    "⚠ DO Kritis";

    warningText.textContent =
    "Water Pump aktif otomatis";

    const notification =
    localStorage.getItem(
        "notification"
    );

    if(notification !==
    "off" &&
    lastWarning !==
    "do"){

        lastWarning =
        "do";

        alert(
            "⚠ WARNING\n\nDO Kritis!\nWater Pump aktif otomatis"
        );
    }
}


// NORMAL
else{

    lastWarning =
    "none";
}

});

}

loadSensor();

setInterval(() => {

    loadSensor();

}, 1000);
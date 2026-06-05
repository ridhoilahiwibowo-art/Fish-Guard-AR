const autoBtn = document.getElementById("autoBtn");
const manualBtn = document.getElementById("manualBtn");

const pumpSwitch = document.getElementById("pumpSwitch");
const roofSwitch = document.getElementById("roofSwitch");

const pumpStatus = document.getElementById("pumpStatus");
const roofStatus = document.getElementById("roofStatus");

// DEFAULT MODE
setAutoMode();

// LOAD SENSOR DATA
fetch("data/dummy.json")
    .then(response => response.json())
    .then(data => {

        const temp = data.sensor.temperature;
        const doLevel = data.sensor.do;

        // AUTO ROOF
        if(temp >= 32){

            roofSwitch.checked = true;

            roofStatus.textContent =
                "Roof ON otomatis (Suhu tinggi)";

        }

        else if(temp >= 29){

            roofStatus.textContent =
                "Warning suhu meningkat";
        }

        else if(temp < 28){

            roofSwitch.checked = false;

            roofStatus.textContent =
                "Roof OFF";
        }

        // WATER PUMP
        if(doLevel < 3){

            pumpSwitch.checked = true;

            pumpStatus.textContent =
                "Pump ON otomatis (DO kritis)";
        }

        else if(doLevel >= 3 && doLevel < 4){

            pumpStatus.textContent =
                "Warning DO rendah";
        }

        else if(doLevel >= 4 && doLevel <= 5){

            pumpStatus.textContent =
                "DO Aman";
        }

        else if(doLevel > 5){

            pumpSwitch.checked = false;

            pumpStatus.textContent =
                "Pump OFF";
        }

    });

// AUTO MODE
function setAutoMode(){

    autoBtn.classList.add("active");
    manualBtn.classList.remove("active");

    pumpSwitch.disabled = true;
    roofSwitch.disabled = true;
}

// MANUAL MODE
function setManualMode(){

    manualBtn.classList.add("active");
    autoBtn.classList.remove("active");

    pumpSwitch.disabled = false;
    roofSwitch.disabled = false;
}

// BUTTON
autoBtn.addEventListener(
    "click",
    setAutoMode
);

manualBtn.addEventListener(
    "click",
    setManualMode
);
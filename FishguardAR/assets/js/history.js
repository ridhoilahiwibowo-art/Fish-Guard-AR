const historyContainer =
document.getElementById(
    "historyContainer"
);

fetch("data/history.json")
.then(response => response.json())
.then(data => {

    data.forEach(item => {

        let statusClass = "safe";

        if(item.status ===
            "Warning"){

            statusClass =
            "warning";
        }

        if(item.status ===
            "Kritis"){

            statusClass =
            "critical";
        }

        const historyCard = `
        
        <div class="history-card">

            <div class="history-top">

                <div class="history-time">
                    ${item.time}
                </div>

                <div class=
                "history-status ${statusClass}">

                    ${item.status}

                </div>

            </div>

            <div class="sensor-history">

                <div class="sensor-box">
                    <h4>pH</h4>
                    <p>${item.ph}</p>
                </div>

                <div class="sensor-box">
                    <h4>Suhu</h4>
                    <p>
                    ${item.temperature}°C
                    </p>
                </div>

                <div class="sensor-box">
                    <h4>DO</h4>
                    <p>${item.do}</p>
                </div>

            </div>

        </div>
        `;

        historyContainer.innerHTML +=
        historyCard;

    });

});
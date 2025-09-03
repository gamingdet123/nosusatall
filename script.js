const PASSWORD = "dontrapeme123";
const lockScreen = document.getElementById("lockScreen");
const lockIcon = document.getElementById("lockIcon");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");

// מסך נעילה ראשוני
passwordInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    if (passwordInput.value === PASSWORD) {
      lockIcon.textContent = "🔓";
      lockIcon.style.transform = "scale(2)";
      setTimeout(() => {
        lockScreen.style.display = "none";
      }, 1000);
    } else {
      passwordInput.value = "";
      passwordInput.placeholder = "סיסמה לא נכונה!";
    }
  }
});

// אתחול המפה על חריש
var map = L.map('map').setView([32.455, 35.046], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// כפתור להתחבר
loginBtn.addEventListener("click", function() {
  let pass = prompt("הכנס סיסמה להתחברות:");
  if (pass === PASSWORD) {
    alert("✅ התחברת בהצלחה!");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        L.circleMarker([lat, lon], {
          radius: 12,
          color: "cyan",
          fillColor: "blue",
          fillOpacity: 0.6
        }).addTo(map).bindPopup("📱 זה הטלפון שלך!");
        map.setView([lat, lon], 16);
      });
    }
  } else {
    alert("❌ סיסמה לא נכונה");
  }
});
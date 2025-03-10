async function fetchRooms() {
  try {
    const response = await fetch(
      "https://hotelbooking.stepprojects.ge/api/Rooms/GetAll"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const roomsData = await response.json();

    for (let i = 0; i < 9; i++) {
      if (roomsData[i]) {
        const room = roomsData[i];
        const roomType = room.name || "Room Type Not Available";
        const price = room.pricePerNight
          ? `$${room.pricePerNight}`
          : "Price Not Available";

        let roomImg = "https://via.placeholder.com/300";
        if (room.images && room.images.length > 0) {
          roomImg = room.images[0].source || roomImg;
        }

        const roomDiv = document.getElementById(`room${i+1}`);
        roomDiv.innerHTML = `
          <div class="h3-div">
            <h3>${roomType}</h3>
            <h3>Night price :: ${price}</h3>
          </div>
          <img src="${roomImg}" alt="${roomType}" />
          <button class="book-button">Book Now</button>
        `;
      }
    }
  } catch (error) {
    console.error("Error fetching room data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchRooms);

document.querySelector(".fa-bars").addEventListener("click", function () {
  const menu = document.querySelector("ul");
  menu.style.display = menu.style.display === "none" ? "flex" : "none";
});


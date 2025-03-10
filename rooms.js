async function fetchRooms(filterType = "ALL") {
  try {
    const response = await fetch(
      "https://hotelbooking.stepprojects.ge/api/Rooms/GetAll"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const roomsData = await response.json();

    console.log(`Filter Type: ${filterType}`);
    console.log(`Rooms Data:`, roomsData);

    const filterMap = {
      "Single Room": ["Junior Suite"],
      "Double Room": ["Premium Room", "Club Twin Room"],
      "Deluxe Room": [
        "Grand Deluxe Suite",
        "Executive Suite",
        "Deluxe Twin Room",
        "Deluxe Double Room",
      ],
    };

    let filteredRooms = [];
    if (filterType === "ALL") {
      filteredRooms = roomsData;
    } else {
      filteredRooms = roomsData.filter((room) =>
        filterMap[filterType]?.includes(room.name)
      );
    }

    console.log(`Filtered Rooms:`, filteredRooms);

    const roomsContainer = document.querySelector(".guests-fav-rooms");
    roomsContainer.innerHTML = "";

    if (filteredRooms.length === 0) {
      roomsContainer.innerHTML = `<p>No rooms available for this category.</p>`;
      return;
    }

    filteredRooms.forEach((room) => {
      const roomDiv = document.createElement("div");
      roomDiv.classList.add("appended-divs");

      const roomType = room.name || "Room Type Not Available";
      const price = room.pricePerNight
        ? `$${room.pricePerNight}`
        : "Price Not Available";

      let roomImg = "https://via.placeholder.com/300";
      if (room.images && room.images.length > 0) {
        roomImg = room.images[0].source || roomImg;
      }

      roomDiv.innerHTML = `
                <div class="h3-div">
                    <h3>${roomType}</h3>
                    <h3>Night price :: ${price}</h3>
                </div>
                <img src="${roomImg}" alt="${roomType}" />
                <button class="book-button">Book Now</button>
            `;

      roomsContainer.appendChild(roomDiv);
    });
  } catch (error) {
    console.error("Error fetching room data:", error);
  }
}

document.querySelectorAll(".same-buttons, .all-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filterType = button.textContent.trim();
    fetchRooms(filterType === "ALL" ? "ALL" : filterType);
  });
});

document.addEventListener("DOMContentLoaded", () => fetchRooms("ALL"));

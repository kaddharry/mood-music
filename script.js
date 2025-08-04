// script.js

let songs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ",
    mood: "energetic",
    liked: false
  }
];

const songListSection = document.getElementById("song-list");
const form = document.querySelector("form");
const moodButtons = document.querySelectorAll("#mood-buttons button");

function renderSongs(filterMood = null) {
  // Remove old cards
  const oldCards = document.querySelectorAll(".song-card");
  oldCards.forEach(card => card.remove());

  // Add cards based on mood
  const filtered = filterMood ? songs.filter(song => song.mood === filterMood) : songs;

  filtered.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `
      <h3>${song.title}</h3>
      <p><strong>Artist:</strong> ${song.artist}</p>
      <p><a href="${song.url}" target="_blank">Play</a></p>
      <button onclick="toggleLike(${index})">${song.liked ? "❤️ Liked" : "🤍 Like"}</button>
      <button onclick="deleteSong(${index})">❌ Delete</button>
    `;
    songListSection.appendChild(card);
  });
}

function toggleLike(index) {
  songs[index].liked = !songs[index].liked;
  renderSongs(currentMood); // re-render with current filter
}

function deleteSong(index) {
  songs.splice(index, 1);
  renderSongs(currentMood); // re-render with current filter
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newSong = {
    title: form.title.value,
    artist: form.artist.value,
    url: form.url.value,
    mood: form.mood.value,
    liked: false
  };

  songs.push(newSong);
  form.reset();
  renderSongs(currentMood); // stay on same mood
});

let currentMood = null;

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentMood = btn.textContent.toLowerCase(); // match mood in lowercase
    renderSongs(currentMood);
  });
});

// Initial render
renderSongs();

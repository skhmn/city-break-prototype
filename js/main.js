// Setup map
const map = L.map('map').setView([54.969, -1.607], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Bridge data
const bridges = [
  {
    name: "Tyne Bridge",
    coords: [54.968072612075105, -1.6059809874822748],
    img: "images/Tyne_Bridge.jpg",
    desc: "The Tyne Bridge is a famous arch bridge linking Newcastle and Gateshead. Opened in 1928, it’s a symbol of the North East and often compared to Sydney’s Harbour Bridge.",
    rating: 0
  },
  {
    name: "Millennium Bridge",
    coords: [54.96982081995391, -1.5991213794889532],
    img: "images/Millenium_Bridge.jpg",
    desc: "The Millennium Bridge is a pedestrian and cyclist tilt bridge, opened in 2001. It connects Gateshead and Newcastle, providing stunning views of the Quayside.",
    rating: 0
  },
  {
    name: "High Level Bridge",
    coords: [54.96736478446097, -1.608929102824653],
    img: "images/HighLevel_Bridge.jpg",
    desc: "The High Level Bridge is a combined road and rail bridge, opened in 1849. It’s known for its unique design and offers great views of the River Tyne.",
    rating: 0
  },
  {
    name: "Swing Bridge",
    coords: [54.96755753755125, -1.6074264118852148],
    img: "images/Swing_Bridge.jpg",
    desc: "The Swing Bridge is a road and pedestrian bridge that can swing open to allow ships to pass. Opened in 1876, it’s an engineering marvel of its time.",
    rating: 0
  }
];

let currentBridge = null;

// Add each marker
bridges.forEach((bridge, index) => {
  const marker = L.marker(bridge.coords).addTo(map);

  // Tooltip with image
  marker.bindTooltip(
      `<strong>${bridge.name}</strong><br><img src="${bridge.img}" style="width:100px;" alt="${bridge.name} preview">`,
      { direction: 'top', offset: [0, -10] }
  );

  const popupHTML = `
    <div class="popup-content" tabindex="0" style="font-size: 1rem;">
      <h3 style="margin-bottom: 0.3em;">${bridge.name}</h3>
      <img src="${bridge.img}" alt="Photo of ${bridge.name}" class="popup-img" style="width:100%;border-radius:6px;margin-bottom:0.5em;" />
      <p>${bridge.desc}</p>
      <button class="open-review"  aria-label="Open reviews for ${bridge.name}"
              style="margin-top: 10px; padding: 6px 12px;"
              onclick="openReviewModal(${index})">
              Read Reviews  
      </button>
    </div>
  `;

  marker.bindPopup(popupHTML);

  marker.on('click', () => {
    marker._icon.classList.add('bounce');
    setTimeout(() => marker._icon.classList.remove('bounce'), 700);
  });
});

function openReviewModal(index) {
  currentBridge = index;
  const modal = document.getElementById('reviewModal');
  const title = document.getElementById('reviewTitle');
  title.innerText = `Reviews for ${bridges[index].name}`;
  setStars(bridges[index].rating);
  modal.style.display = 'block';
  modal.focus();
}

function closeReviewModal() {
  document.getElementById('reviewModal').style.display = 'none';
}

function setRating(stars) {
  if (currentBridge !== null) {
    bridges[currentBridge].rating = stars;
    setStars(stars);
  }
}

function setStars(stars) {
  const starsContainer = document.getElementById('stars');
  starsContainer.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const span = document.createElement('span');
    span.textContent = i <= stars ? '★' : '☆';
    span.style.cursor = 'pointer';
    span.onclick = () => setRating(i);
    span.setAttribute('tabindex', '0');
    span.setAttribute('role', 'button');
    span.setAttribute('aria-label', `Rate ${i} star${i > 1 ? 's' : ''}`);
    starsContainer.appendChild(span);
  }
}

// ESC key closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeReviewModal();
});


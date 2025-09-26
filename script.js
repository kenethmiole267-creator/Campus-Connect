// ======== DATA ========
// Here we store all the events, clubs and announcements
var data = {
  events: [
    {
      id: 1,
      title: "AHOYRIENTATION 2025",
      date: "2025-07-31",
      desc: "Welcome new students to LPU-C!",
      img: "event1.jpg"
    },
    {
      id: 2,
      title: "Pirates W.A.V.E",
      date: "2025-08-14",
      desc: "Welcoming All Victors of Education.",
      img: "event2.jpg"
    },
    {
      id: 3,
      title: "LEAF WALK 2025",
      date: "2025-08-14",
      desc: "Annual Leaf Walk and Pep Rally 2025.",
      img: "event3.jpg"
    }
  ],
  clubs: [
    {
      id: 1,
      name: "Central Student Government",
      desc: "LPU Cavite Central Student Government - LYCESGO",
      img: "club1.jpg"
    },
    {
      id: 2,
      name: "College of Information Technology and Computer Science Student Government",
      desc: "LPU Cavite - CCS Student Government",
      img: "club2.jpg"
    },
    {
      id: 3,
      name: "College of Engineering and Architecture Student Government",
      desc: "LPU Cavite - CEA Student Government",
      img: "club3.jpg"
    }
  ],
  announcements: [
    "Community Bazaar for a Cause: September 22-26, 2025.",
    "Class Suspended: September 26-27, 2025.",
    "Midterm Examination: October 15-22, 2025."
  ]
};

// ======== SELECT HTML ELEMENTS ========
var featuredContainer = document.getElementById("featured");
var eventsContainer   = document.getElementById("eventsList");
var clubsContainer    = document.getElementById("clubsList");
var announceBanner    = document.getElementById("announceBanner");
var annList           = document.getElementById("annList");
var searchInput       = document.getElementById("search");
var navToggle         = document.getElementById("navToggle");
var navLinks          = document.getElementById("navLinks");

// ======== FUNCTIONS ========

// This function creates the HTML for a single card
function createCardHTML(img, title, extra, desc) {
  var html = "";
  html += '<img src="' + img + '" alt="' + title + '">';
  html += "<h3>" + title + "</h3>";
  if (extra) {
    html += "<p><strong>" + extra + "</strong></p>";
  }
  html += "<p>" + desc + "</p>";
  return html;
}

// Show the first two events as "featured"
function renderFeatured() {
  if (!featuredContainer) return;
  featuredContainer.innerHTML = "";
  var firstTwo = data.events.slice(0, 2);
  firstTwo.forEach(function(ev) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML = createCardHTML(ev.img, ev.title, "Date: " + ev.date, ev.desc);
    featuredContainer.appendChild(card);
  });
}

// Show all events (or a filtered list)
function renderEvents(list) {
  if (!list) list = data.events;
  eventsContainer.innerHTML = "";
  list.forEach(function(ev) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML = createCardHTML(ev.img, ev.title, "Date: " + ev.date, ev.desc);
    eventsContainer.appendChild(card);
  });
}

// Show all clubs
function renderClubs() {
  clubsContainer.innerHTML = "";
  data.clubs.forEach(function(cl) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML = createCardHTML(cl.img, cl.name, "", cl.desc);
    clubsContainer.appendChild(card);
  });
}

// Show all announcements as a list
function renderAnnouncements() {
  annList.innerHTML = "";
  data.announcements.forEach(function(a) {
    var li = document.createElement("li");
    li.textContent = a;
    annList.appendChild(li);
  });
}

// ======== ANNOUNCEMENT BANNER ROTATION ========
var currentAnnIndex = 0;
function rotateAnnouncements() {
  if (!announceBanner) return;
  announceBanner.textContent = data.announcements[currentAnnIndex];
  currentAnnIndex = (currentAnnIndex + 1) % data.announcements.length;
}
setInterval(rotateAnnouncements, 4000); // every 4 seconds

// ======== SEARCH FILTER ========
if (searchInput) {
  searchInput.addEventListener("input", function() {
    var term = searchInput.value.toLowerCase();
    var filtered = data.events.filter(function(ev) {
      return ev.title.toLowerCase().includes(term) ||
             ev.desc.toLowerCase().includes(term);
    });
    renderEvents(filtered);
  });
}

// ======== MOBILE NAVIGATION TOGGLE ========
if (navToggle && navLinks) {
  navToggle.addEventListener("click", function() {
    navLinks.classList.toggle("show");
  });
}

// ======== INITIAL LOAD ========
renderFeatured();
renderEvents();
renderClubs();
renderAnnouncements();
rotateAnnouncements();

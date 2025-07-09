const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const profileSection = document.getElementById("profile");
const errorText = document.getElementById("error");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const fetchGitHubUser = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();
    displayProfile(data);
    errorText.classList.add("hidden");
  } catch (err) {
    profileSection.classList.add("hidden");
    errorText.classList.remove("hidden");
  }
};

const displayProfile = (data) => {
  document.getElementById("avatar").src = data.avatar_url;
  document.getElementById("name").textContent = data.name || "No Name";
  document.getElementById("username").textContent = "@" + data.login;
  document.getElementById("join-date").textContent = "Joined: " + new Date(data.created_at).toDateString();
  document.getElementById("bio").textContent = data.bio || "No bio available.";
  document.getElementById("repos").textContent = data.public_repos;
  document.getElementById("followers").textContent = data.followers;
  document.getElementById("following").textContent = data.following;
  document.getElementById("location").textContent = data.location || "Not Available";
  document.getElementById("twitter").textContent = data.twitter_username || "Not Available";
  document.getElementById("website").textContent = data.blog || "Not Available";
  document.getElementById("company").textContent = data.company || "Not Available";

  profileSection.classList.remove("hidden");




};

searchBtn.addEventListener("click", () => {
  const username = searchInput.value.trim();
  if (username) fetchGitHubUser(username);
});

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  document.body.classList.toggle("light", !isDark);
  themeIcon.src = isDark ? "assets/images/sun-icon.webp" : "assets/images/moon-icon.png";
});

function saveProfile() {
    const name = document.getElementById("name").value;
    const hometown = document.getElementById("hometown").value;
    const favourite = document.getElementById("favourite").value;

    const output = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Hometown:</strong> ${hometown}</p>
    <p><strong>Favourite Bridge:</strong> ${favourite}</p>
  `;
    document.getElementById("userOutput").innerHTML = output;
    alert("Profile updated successfully!");
}

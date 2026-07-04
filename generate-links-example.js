/**
 * Example script to generate personalized invitation links
 *
 * Usage:
 *   bun run generate-links-example.js
 *
 * This will output personalized invitation links for each guest
 */

// Simple base64 encode function (same as in safeBase64)
function base64Encode(str) {
  return Buffer.from(str, "utf-8").toString("base64");
}

function generateInvitationLink(
  uid,
  guestName,
  baseUrl = "http://localhost:5173",
  useUidPath = false,
) {
  const encodedName = base64Encode(guestName);

  // Frontend-only mode (no database): keep root path and only pass guest.
  if (!useUidPath) {
    return `${baseUrl}/?guest=${encodedName}`;
  }

  // API/database mode: include invitation UID in path.
  return `${baseUrl}/${uid}?guest=${encodedName}`;
}

// ===== CONFIGURATION =====
const INVITATION_UID = "chaker-chourouk-2026"; // Change this to your invitation UID
//const BASE_URL = "http://localhost:5173"; // Change this to your production URL
const BASE_URL = "invitation.onrender.com"
const USE_UID_PATH = false; // false = no DB mode, true = DB/API mode

// List of guests
const guestList = [
  "Said Jabbour",
  "Mohamed Graiet",
  "Mourad Kmimech",
  "Badran Raddaoui",
  "Ines Jday",
  "Oussama Fekih Hassen",
  "Asma Amaidi",
  "Nejmeddine Rassas",
  "Ahmed Attigue",
  "Ramzi Mahmoudi",
  "Taoufik Sakka Rouis",
  "Nizar Omheni",
  "Imed Abbassi",
  "Eya Dhifallah",
  "Sami Bhiri",
  "Malek Ben Salem",
  "Lazhar Hamel",
  "Anis Sayedi",
  "Anis Boussaada",
  "Hamdi Mabrouk",
  "Noureddine Issaoui",
  "Thouraya Benlazreg Chouba",
  "Yesmin Saafi",
  "Amira Fayouka",
  "Ikram Garfatta",
  "Heykel Gzara",
  "Hichem Karchoud",
  "Sameh Hbaieb Turki",
  "Abdesslem Makhlouf",
  "Nagui Maatouk", 
  "Zied Jaoua",
  "Raghda Jouirou",
  "Guest",
];

// ===== GENERATE LINKS =====
console.log(
  "\n╔══════════════════════════════════════════════════════════════╗",
);
console.log("║          PERSONALIZED WEDDING INVITATION LINKS               ║");
console.log(
  "╚══════════════════════════════════════════════════════════════╝\n",
);

console.log(`Mode: ${USE_UID_PATH ? "UID path (requires DB/API)" : "Frontend-only (no DB)"}`);
console.log(`Invitation UID: ${INVITATION_UID}`);
console.log(`Base URL: ${BASE_URL}\n`);
console.log("─".repeat(70) + "\n");

guestList.forEach((guestName, index) => {
  const link = generateInvitationLink(
    INVITATION_UID,
    guestName,
    BASE_URL,
    USE_UID_PATH,
  );
  console.log(`${index + 1}. ${guestName}`);
  console.log(`   ${link}\n`);
});

console.log("─".repeat(70));
console.log(`\nTotal guests: ${guestList.length}`);
console.log("\nHow to use:");
console.log("1. Share each personalized link with the corresponding guest");
console.log("2. When they open the link, their name will be pre-filled");
console.log("3. They can still edit their name if needed\n");
console.log(
  `4. Current mode: ${USE_UID_PATH ? "requires backend + database" : "works without backend/database"}\n`,
);

const config = {
  data: {
    // Main invitation title that appears on the page
    title: "إستدعاء لحضور حفل زفاف شاكر و شروق",
    // Opening message/description of the invitation
    description:
      "بقلوب يغمرها الحب و السعادة تتشرف عائلتا السيد أحمد الشرع و حرمه دليلة الشرع و السيد خميس محفوظ و حرمه السيدة وهيبة الطوزي بدعوتكم لحظور حفل زفاف إبنيهما شاكر و شروق", // Nanti ini dibikin random
    // Groom's name
    groomName: "شاكر",
    // Bride's name
    brideName: "شروق",
    // Groom's parents names
    parentGroom: "السيد أحمد الشرع & حرمه دليلة الشرع",
    // Bride's parents names
    parentBride: "السيد خميس محفوظ & حرمه السيدة وهيبة الطوزي",
    // Wedding date (format: YYYY-MM-DD)
    date: "2026-07-22",
    // Google Maps link for location (short clickable link)
    maps_url: "https://maps.app.goo.gl/Sd3t3NWHopus221t9",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
    maps_embed:
      "https://www.google.com/maps/place/Spring+LAND/@35.7737581,10.8230038,17z/data=!3m1!4b1!4m6!3m5!1s0x130212caab765af7:0x543ba2e8d37151a8!8m2!3d35.7737581!4d10.8230038!16s%2Fg%2F1typr4rb?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D",
    // Event time (free format, example: "10:00 - 12:00 WIB")
    time: "21:00",
    // Venue/building name
    location: "SPRING LAND Monastir, Tunisia",
    // Full address of the wedding venue
    address: "Av. de la République, Monastir 5000",
    // Image that appears when link is shared on social media
    ogImage: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFDfFvizFacLOvv_7CW37o1KLxR3R44Uuo_JyfFfDYtnlLursysvVk2RLaunUJj4kK7234TfANoZXkWpQmRXi-4nVEgAhqf7B1s2_ezfJ-sOgVgg6xw3kqI4kX7KWCCoPE5DsCb=w64-h64-p-k-no",
    // Icon that appears in browser tab
    favicon: "/images/favicon.ico",
    // List of event agenda/schedule
    agenda: [
      {
        // First event name
        title: "حنة العروسة",
        // Event date (format: YYYY-MM-DD)
        date: "2026-07-20",
        // Start time (format: HH:MM)
        startTime: "21:00",
        // End time (format: HH:MM)
        // endTime: "17:30",
        // Event venue
        location: "قاعة الأفراح الياسمين بجمال",
        // Full address
        // address: "Jl. Jend. Sudirman No.1, Jakarta",
      },
      {
        // Second event name
        title: "العشاء",
        date: "2026-07-21",
        startTime: "بعد صلاة المغرب بمنزلهم الكائن بنهج محمد علي منزل النور",
        // endTime: "17:30",
        //location: "Grand Ballroom, Hotel Majesty",
        // address: "Jl. Jend. Sudirman No.1, Jakarta",
      },
      // You can add more agenda items with the same format
    ],

    // Background music settings
    audio: {
      // Music file (choose one or replace with your own file)
      src: "/audio/fulfilling-humming.mp3", // or /audio/nature-sound.mp3
      // Music title to display
      title: "Fulfilling Humming", // or Nature Sound
      // Whether music plays automatically when website opens
      autoplay: true,
      // Whether music repeats continuously
      loop: true,
    },

    // List of bank accounts for digital envelope/gifts
    banks: [
      {
        // Bank name
        bank: "Bank Central Asia",
        // Account number
        accountNumber: "1234567890",
        // Account holder name (all uppercase)
        accountName: "FULAN",
      },
      {
        bank: "Bank Mandiri",
        accountNumber: "0987654321",
        accountName: "FULANA",
      },
      // You can add more banks with the same format
    ],
  },
};

export default config;

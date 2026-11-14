window.SITE_DATA = {
  name: "Samuelson Matanda", // TODO: confirm full name spelling
  studio: "MatandaDesign",
  title: "Graphic Designer",
  location: "Kampala, Uganda",
  tagline: "I design brands people remember.",
  bio: [
    "I'm a graphic designer based in Kampala, Uganda, working under the name MatandaDesign. I design logos, posters, flyers and social media graphics for churches, small businesses and creators.",
    "I'm early in my design career and I'm learning fast. Every project teaches me something about how clear ideas, careful typography and strong colour can help a brand be understood in seconds.",
    "I care about simple, memorable ideas that still work when they are small, printed in one colour, or shared on a phone screen."
  ],
  tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe Premiere Pro", "Adobe After Effects", "Canva Pro"],
  contact: {
    email: "", // TODO: add email; hide the email button if empty
    phones: ["+256 761 999 092", "+256 794 539 064"],
    whatsapp: "256761999092"
  },
  social: {
    instagram: "", // TODO: full URL, hide icon if empty
    tiktok: "",
    linkedin: "",
    x: "",
    youtube: ""
  },
  siteUrl: "https://matandamabomba-design.github.io/graphic-design-portfolio/",
  categories: ["Logo & Branding", "Event Flyers", "Social Media", "Product Promo"],
  projects: [
    // visible:true shows it on the site. Set false to hide.
    {
      id: "eagles-conference-2026",
      title: "Eagles Conference 2026",
      category: "Event Flyers",
      year: "2026",
      image: "assets/images/projects/eagles-conference-2026.jpg",
      description: "Conference poster for International Rescue Ministry, Kinshasa.",
      visible: true,
      featured: true,
      caseStudy: {
        role: "Poster design",
        brief: "International Rescue Ministry needed a poster for the Eagles Conference 2026 (theme: Increase) held 3 to 7 December 2026 at Terre Jaune, Nsele, Kinshasa, DR Congo. It had to present three speakers, the schedule and the venue clearly, and feel modern rather than traditional.",
        approach: [
          "I built the layout around a big, layered 'eagles conference' wordmark in the blue-to-green colours of the ministry's brand.",
          "The three speakers sit in stacked rounded cards over bright geometric gradients, which gives depth and a clear reading order from top to bottom.",
          "Dates, venue and times are set in a bold condensed typeface on a calm white background so the practical information is readable at a glance, and a QR code and social handle make the next step easy."
        ],
        deliverables: ["Print-ready poster", "Social media version (4:5)", "QR code placement"],
        gallery: []
      }
    },
    // visible:true shows it on the site. Set false to hide.
    {
      id: "international-rescue-ministry-logo",
      title: "International Rescue Ministry",
      category: "Logo & Branding",
      year: "",
      image: "assets/images/projects/international-rescue-ministry-logo.png",
      description: "Logo mark combining a globe, an open Bible, a cross and a rescuing hand.",
      visible: true, // TODO: keep visible only if I designed this logo.
      featured: true,
      caseStudy: null
    },
    // visible:true shows it on the site. Set false to hide.
    {
      id: "matandadesign-identity",
      title: "MatandaDesign identity",
      category: "Logo & Branding",
      year: "2026",
      image: "assets/images/projects/matandadesign-logo.png",
      description: "My own studio identity: a monogram and a hand-drawn style wordmark.",
      visible: true,
      featured: true,
      caseStudy: {
        role: "Logo and identity design",
        brief: "I needed a mark for my own design practice that is simple, distinctive and works in black or white.",
        approach: [
          "I combined the letters M and D into a single monogram so the studio name is recognisable even at very small sizes.",
          "The wordmark uses tall, narrow letterforms with a lighter serif 'DESIGN' beneath it, creating contrast between bold and delicate.",
          "I made a black version and a white version so the identity works on any background."
        ],
        deliverables: ["Primary logo (black)", "Reversed logo (white)", "Social media usage on posts and flyers"],
        gallery: ["assets/images/projects/matandadesign-logo-white.png"]
      }
    },
    // visible:true shows it on the site. Set false to hide.
    {
      id: "welcome-november-campaign",
      title: "Welcome to November series",
      category: "Social Media",
      year: "2026",
      image: "assets/images/projects/welcome-november-blue.jpg",
      description: "A set of five new-month social media posts, each with its own look.",
      visible: true,
      featured: true,
      caseStudy: {
        role: "Social media design",
        brief: "Create a set of new-month greetings for the MatandaDesign pages that stay recognisable as one brand while exploring different colour and layout directions.",
        approach: [
          "I kept the logo, contact details and social handles in the same place across every post so the brand is consistent.",
          "I changed colour, composition and typography for each variation (deep green and yellow, royal blue, split warm tones, diagonal purple, and a 3D calendar) to test what feels strongest.",
          "Text is kept short and the call to action is always visible."
        ],
        deliverables: ["Five square and portrait social posts", "Consistent footer with contact and social handles"],
        gallery: [
          "assets/images/projects/welcome-november-green.jpg",
          "assets/images/projects/welcome-november-split.jpg",
          "assets/images/projects/welcome-november-purple.jpg",
          "assets/images/projects/happy-new-month-calendar.jpg"
        ]
      }
    },
    // visible:true shows it on the site. Set false to hide.
    {
      id: "welcome-november-green",
      title: "Welcome to November, green",
      category: "Social Media",
      year: "2026",
      image: "assets/images/projects/welcome-november-green.jpg",
      description: "A green and yellow new-month greeting for social media.",
      visible: true,
      featured: false,
      caseStudy: null
    },
    // visible:true shows it on the site. Set false to hide.
    {
      id: "welcome-november-split",
      title: "Happy New Month, October to November",
      category: "Social Media",
      year: "2026",
      image: "assets/images/projects/welcome-november-split.jpg",
      description: "A split-tone new-month greeting for social media.",
      visible: true,
      featured: false,
      caseStudy: null
    },
    // visible:true shows it on the site. Set false to hide.
    {
      id: "welcome-november-purple",
      title: "Welcome to November, diagonal",
      category: "Social Media",
      year: "2026",
      image: "assets/images/projects/welcome-november-purple.jpg",
      description: "A diagonal purple composition for a new-month greeting.",
      visible: true,
      featured: false,
      caseStudy: null
    },
    // visible:true shows it on the site. Set false to hide.
    {
      id: "happy-new-month-calendar",
      title: "Happy New Month, calendar",
      category: "Social Media",
      year: "2026",
      image: "assets/images/projects/happy-new-month-calendar.jpg",
      description: "A calendar-inspired new-month greeting for social media.",
      visible: true,
      featured: false,
      caseStudy: null
    },
    // visible:true shows it on the site. Set false to hide.
    {
      id: "biobite-nkate-pa",
      title: "BioBite Foods, Nkate Pa",
      category: "Product Promo",
      year: "2026",
      image: "assets/images/projects/biobite-nkate-pa.jpg",
      description: "A product promotion for BioBite Foods Nkate Pa.",
      visible: true, // TODO: keep visible only if I have the client's permission and the image is my own work.
      featured: false,
      caseStudy: null
    }
  ]
};

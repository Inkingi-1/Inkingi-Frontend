export interface StoreFAQ {
  question: string;
  answer: string;
}

export interface Store {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  expressDelivery: boolean;
  newPartner: boolean;
  logo: string;
  image: string;
  location: string;
  productsCount: number;
  distance: string;
  partnerLogo: string;
  partnerName: string;
  description: string;
  yearsActive: number;
  projectsSupplied: number;
  compliance: string;
  dispatchTime: string;
  regNumber: string;
  vatNumber: string;
  status: string;
  sustainabilityCertificate: string;
  faqs: StoreFAQ[];
}

export const mockStores: Store[] = [
  {
    id: "kigali-industrial-hub",
    name: "Kigali Industrial Hub",
    rating: 4.9,
    verified: true,
    expressDelivery: false,
    newPartner: false,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVb7fkaTk0Po4vT3cQDyuh3wFlCyCB1jB5IHaIdfZ-hnaYloUbtiu4J8WOLsu61QI8V4Bgvru2FIbUbC0AzmGk64cUeq3u6iyXyaoNM2MYlJbRBaf04q4XjesmyrvJ3jI3s5rd0Ci8TUbNcfIobPusEERFKx6S2cqflbjYy3rm-lkkn_LFiI-Lnjbu8VkcWO3VgWfkAyblp_ke885QUMzw151sxtLea2ST8ugcPm4HZlppJAf1Eu8JNIvBK2xgRJ3-XdDQ6hc75n4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNBmL04eZNtEdEmj2O-Sf337cwuMKvfR1CkcR77JTHs21FSUVAm3BU0mjP9wAIRGhtIDHaPfc8z1M1YU8dIPauJ_YUuFX9ycEHGajkEWndXcMJybKI2FwygH3YAYAAY_4Rqy0df8EzsFQf3cy1JIhsJrQCgTw_8jdnHgPQcMR0Q6JXG6B9zDu5aYPzmnk7Jx0B7S2UUuQJFmwGQkKxyCW8QLA0O3W80INxe1AWGzzBX6_ZLRbOvSxqcVeZG93O60xvGiOTOwP6U2Y",
    location: "Nyarugenge, Kigali",
    productsCount: 1240,
    distance: "2.4km away",
    partnerLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVb7fkaTk0Po4vT3cQDyuh3wFlCyCB1jB5IHaIdfZ-hnaYloUbtiu4J8WOLsu61QI8V4Bgvru2FIbUbC0AzmGk64cUeq3u6iyXyaoNM2MYlJbRBaf04q4XjesmyrvJ3jI3s5rd0Ci8TUbNcfIobPusEERFKx6S2cqflbjYy3rm-lkkn_LFiI-Lnjbu8VkcWO3VgWfkAyblp_ke885QUMzw151sxtLea2ST8ugcPm4HZlppJAf1Eu8JNIvBK2xgRJ3-XdDQ6hc75n4",
    partnerName: "Bosch Authorized Partner",
    description: "Providing Rwanda's construction industry with certified structural steel, reinforced cement, and heavy masonry since 2012.",
    yearsActive: 12,
    projectsSupplied: 500,
    compliance: "100%",
    dispatchTime: "24h",
    regNumber: "102384955-RW",
    vatNumber: "203-948-112",
    status: "ACTIVE",
    sustainabilityCertificate: "REMA Environmental Certification (2024-2026) for Sustainable Quarrying & Logistics.",
    faqs: [
      {
        question: "Do you offer site-specific testing?",
        answer: "Yes, for large orders (>50 tons), our quality control engineer can provide on-site slump tests for concrete and strength certificates for steel batches."
      },
      {
        question: "Can we schedule staggered deliveries?",
        answer: "Absolutely. Many projects have limited storage. You can purchase in bulk to lock in pricing and schedule deliveries according to your project timeline."
      },
      {
        question: "How do you handle off-loading?",
        answer: "Our fleet includes trucks equipped with hydraulic cranes (HIAB) for steel and pallets. General site labor is expected for off-loading bagged materials unless 'Premium Delivery' is selected."
      }
    ]
  },
  {
    id: "volcano-power-tools",
    name: "Volcano Power & Tools",
    rating: 4.7,
    verified: false,
    expressDelivery: true,
    newPartner: false,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTaqvmZwKedeQ6DnrDQlD8oZZDQqw03OhOfYUQQ-KZaDA3gJzwprPhzblWqxCz_QRjUuDooefl9N9MvOlM-ok1f12udeiWdXQCyBrx7wBg4kdXmaHhL1NiOzDttINlOhTphucUYzYG_zRGVD39eWCevohdDCH0Q67uTD5o508MJMZlCY6obhgTw3i_nfX9aPfR4imPdTbmPp5eUiJiahukPcTG-Dlu90oV0g_U5HeyOaSsFvNlIlgzS_7xBpsAHDngQ_86zFN1Qz4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzLyvAl_YJg1UBCzxOHtNLfD90ZGGpKKxwLKrxZjNY8zmd_wjUrc8Lj7YBh2FXtAKWf1Ecr0cfyqxGD5OxPKHCIx1aSkiutZGUuRG9wb4JTGrrgdY7bihVu53psx9uC8ciSrfYxEa05OZMC9L3N31SUG79dRYfAtkHW3g1O1qki6QUEKd026e5vVlwHCP8gbp7pNjGVuG3f3pT3CESWj4gRXK1_dFV2y_kPSEN5RzOInKBdajywh86FQhjbXZ4K4zu9rhaS7smGLQ",
    location: "Musanze District",
    productsCount: 850,
    distance: "Nearby site",
    partnerLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTaqvmZwKedeQ6DnrDQlD8oZZDQqw03OhOfYUQQ-KZaDA3gJzwprPhzblWqxCz_QRjUuDooefl9N9MvOlM-ok1f12udeiWdXQCyBrx7wBg4kdXmaHhL1NiOzDttINlOhTphucUYzYG_zRGVD39eWCevohdDCH0Q67uTD5o508MJMZlCY6obhgTw3i_nfX9aPfR4imPdTbmPp5eUiJiahukPcTG-Dlu90oV0g_U5HeyOaSsFvNlIlgzS_7xBpsAHDngQ_86zFN1Qz4",
    partnerName: "Schneider Authorized Dealer",
    description: "Your absolute destination for professional power systems, high-durability electrical copper wiring, and automated circuit systems in Musanze.",
    yearsActive: 6,
    projectsSupplied: 180,
    compliance: "98%",
    dispatchTime: "2h Express",
    regNumber: "108394021-RW",
    vatNumber: "208-490-210",
    status: "ACTIVE",
    sustainabilityCertificate: "Musanze Green Energy Initiative certified supplier.",
    faqs: [
      {
        question: "Do electrical products come with warranties?",
        answer: "Yes, all our Schneider and professional electrical equipment carry a minimum 12-month manufacturer warranty with local replacement."
      },
      {
        question: "Can you design a site electrical plan?",
        answer: "We have certified electrical technicians who can inspect your architectural plans and supply custom pre-wired distribution board boxes directly to site."
      }
    ]
  },
  {
    id: "lake-view-masonry",
    name: "Lake View Masonry",
    rating: 4.8,
    verified: true,
    expressDelivery: false,
    newPartner: false,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpL0qEKyo6eOwqqou7AcxCmizrhOIFSrsLzS2LhUR9ECVqLaqgX5fPFh3pu57uaaBGaJzqo0X2AAC8ftaIoI8o6t1QFXGMJDFmpYetL9RcprV5YQ0ecyG32r1KIWWrjZ5PojeQa9bXXDP0tqnnIwr_74l-jpBS7UKyu9gFpPZi6SmVtvgjTdC8wqfBVB3tAQMFdJMhvnhWOEZ-3nSUkIRpqR3PuhmN4jr9ql-tv8ekWTzEhdFbrkziH6J76XyXYv7tawmYMP0yAE",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpF8e3tQm5Y2i2p27b6cjzxUnj7prKyK14tvZbgU-mjOsRF_-OvwwuBRP9tCbud2NUavMr15yL1EljbVCmkiy2JDFmpZmyqnjYYl_rMutGt8WBg32mVwOUbdK9-a4xLbMFtCyvUskcKt0_OiCMMwAkZUuYx6sXBgieoTdiK36vEGNwsQM38eJDdIa6XNzTjc1_8CFXHQwBe5EJ8WIsXxqSOlRyJeIpKrHht84T9zt5FK-RtDogHgJks4vB7kkO_rXd7PH2EdP30eM",
    location: "Rubavu, Western",
    productsCount: 2100,
    distance: "5.1km away",
    partnerLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpL0qEKyo6eOwqqou7AcxCmizrhOIFSrsLzS2LhUR9ECVqLaqgX5fPFh3pu57uaaBGaJzqo0X2AAC8ftaIoI8o6t1QFXGMJDFmpYetL9RcprV5YQ0ecyG32r1KIWWrjZ5PojeQa9bXXDP0tqnnIwr_74l-jpBS7UKyu9gFpPZi6SmVtvgjTdC8wqfBVB3tAQMFdJMhvnhWOEZ-3nSUkIRpqR3PuhmN4jr9ql-tv8ekWTzEhdFbrkziH6J76XyXYv7tawmYMP0yAE",
    partnerName: "Lafarge Official Partner",
    description: "Premium manufacturer of architectural bricks, reinforced structural blocks, and custom cut Rwandan stone cladding.",
    yearsActive: 15,
    projectsSupplied: 850,
    compliance: "100%",
    dispatchTime: "48h",
    regNumber: "104829304-RW",
    vatNumber: "204-829-304",
    status: "ACTIVE",
    sustainabilityCertificate: "REMA Sustainable Quarry and Stone Cladding extraction license (2023-2027).",
    faqs: [
      {
        question: "Do you supply custom stone sizes?",
        answer: "Yes, our stonemasons in Rubavu can pre-cut stone cladding to your architectural thickness specifications. Lead time varies from 5 to 10 days."
      },
      {
        question: "What is your moisture rating for structural blocks?",
        answer: "All our concrete blocks are cured in temperature-controlled chambers, ensuring less than 5% absorption rate, surpassing standard building codes."
      }
    ]
  },
  {
    id: "elite-finishes",
    name: "Elite Finishes Rwanda",
    rating: 4.5,
    verified: false,
    expressDelivery: false,
    newPartner: true,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhFLlnLhLhehZeIYqYVaZB6Y2CxRvUoZnTmFWbmqIZkI9sni308nnpHPPjtJPpagJvCdt_GV40zYYp4fBeDft42Ho6BwT20mHdvbNLm23MHQ2cXI3npCewY0yiY_En2TMvKXRy39XMHXKpZIbq0BGrgaJ5U19W-IZdsMI-p2Y9AVaQuKwzKr7Ddt-uPutCZsNlDwNkTRpDNqZtNKtGrKFSrGqq7iBtjULRyOQbmExQBEKL3bu86m2Hsh4BSw8bcwJ10wUpi_7RXGo",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOshNr4fyQHsU47w01Q9huh6w63raj6T9VP6uU04TXNG6XS5eSOZySPVcbWGyiQ_M8wrtHqJ8dhbZrzDNNjGBWbrhA1-1c8IW1p8ldi3zZ6SDlq0X0SmpwpuO-oOjj_-gdjaaa0BhVwiibJGUSD8xxMqSmx1DGtIGNFW61jQ8YhgVCai8fyqzkMehSikul2ZhbtRS8K_x3bU0LFkHwK-HxPu841jAzoFXJPViRteKSzYcpuF2RzzIYazS2oP60P7RDvkz4Ds016Es",
    location: "Remera, Kigali",
    productsCount: 420,
    distance: "1.8km away",
    partnerLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhFLlnLhLhehZeIYqYVaZB6Y2CxRvUoZnTmFWbmqIZkI9sni308nnpHPPjtJPpagJvCdt_GV40zYYp4fBeDft42Ho6BwT20mHdvbNLm23MHQ2cXI3npCewY0yiY_En2TMvKXRy39XMHXKpZIbq0BGrgaJ5U19W-IZdsMI-p2Y9AVaQuKwzKr7Ddt-uPutCZsNlDwNkTRpDNqZtNKtGrKFSrGqq7iBtjULRyOQbmExQBEKL3bu86m2Hsh4BSw8bcwJ10wUpi_7RXGo",
    partnerName: "Kohler Design Showroom",
    description: "Premium sanitary fixtures, architectural handles, and designer format porcelain tiles for luxury real estate.",
    yearsActive: 2,
    projectsSupplied: 60,
    compliance: "100%",
    dispatchTime: "12h",
    regNumber: "109823049-RW",
    vatNumber: "209-823-049",
    status: "ACTIVE",
    sustainabilityCertificate: "Kohler Certified Water-Saving Fixtures compliance.",
    faqs: [
      {
        question: "Do you hold local stock of porcelain tiles?",
        answer: "We keep standard sizes (60x60, 60x120) in stock in our Remera warehouse. Luxury formats are imported and require a 45-day lead time."
      }
    ]
  }
];

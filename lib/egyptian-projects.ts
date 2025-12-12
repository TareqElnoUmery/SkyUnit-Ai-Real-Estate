// Egyptian Premium Real Estate Projects Data
// 7 Major Developments for skyunitai.site

export interface Project {
  id: string;
  name: string;
  location: string;
  developer: string;
  area: string;
  units: string;
  types: string[];
  priceRange: string;
  paymentPlan: string;
  completionDate: string;
  amenities: string[];
  expectedROI: string;
  image: string;
  description: string;
}

export const egyptianProjects: Project[] = [
  {
    id: "madinaty",
    name: "Madinaty",
    location: "New Cairo",
    developer: "Talaat Moustafa Group",
    area: "8,000 acres",
    units: "120,000+",
    types: ["Villas", "Apartments", "Twin Houses"],
    priceRange: "2-5M EGP",
    paymentPlan: "10% down / 6 years",
    completionDate: "Phased 2025-2030",
    amenities: ["Schools", "Shopping Mall", "Central Lake", "Green Spaces", "Hospitals"],
    expectedROI: "15-20% annually",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description: "Largest integrated residential community in Egypt with world-class amenities"
  },
  {
    id: "zelal-new-cairo",
    name: "Zelal New Cairo",
    location: "New Cairo",
    developer: "Talaat Moustafa Group",
    area: "100 acres",
    units: "5,000",
    types: ["Townhouses", "Semi-villas"],
    priceRange: "3-6M EGP",
    paymentPlan: "5% down / 5 years",
    completionDate: "2027",
    amenities: ["Country Club", "Parks", "Restaurants", "Retail"],
    expectedROI: "18% annually",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    description: "Luxury townhouse community with premium lifestyle amenities"
  },
  {
    id: "zelal-el-shorouk",
    name: "Zelal El Shorouk",
    location: "El Shorouk",
    developer: "Talaat Moustafa Group",
    area: "50 acres",
    units: "2,000",
    types: ["Apartments", "Duplexes"],
    priceRange: "1.5-3M EGP",
    paymentPlan: "10% down / 4 years",
    completionDate: "2026",
    amenities: ["Mosque", "Shopping Center", "Playgrounds", "Schools"],
    expectedROI: "12% annually",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1",
    description: "Family-oriented community with complete services"
  },
  {
    id: "zelal-sheikh-zayed",
    name: "Zelal Sheikh Zayed",
    location: "Sheikh Zayed",
    developer: "Talaat Moustafa Group",
    area: "80 acres",
    units: "4,000",
    types: ["Duplexes", "Villas"],
    priceRange: "4-7M EGP",
    paymentPlan: "7% down / 7 years",
    completionDate: "2028",
    amenities: ["Gym", "Olympic Pool", "Tennis Courts", "Golf Course"],
    expectedROI: "22% annually",
    image: "https://images.unsplash.com/photo-1570129477492-45a003537e1f",
    description: "Premium gated community with sports facilities"
  },
  {
    id: "saba-6th-october",
    name: "Saba 6th October",
    location: "6th of October City",
    developer: "Ora Developers",
    area: "60 acres",
    units: "3,000",
    types: ["Villas", "Twin Houses"],
    priceRange: "5-8M EGP",
    paymentPlan: "10% down / 8 years",
    completionDate: "2027",
    amenities: ["Golf Course", "Lakes", "Stables", "Sports Complex"],
    expectedROI: "16% annually",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    description: "Exclusive villa community with lifestyle amenities"
  },
  {
    id: "walkway-new-capital",
    name: "Walkway New Capital (D2 R3)",
    location: "New Administrative Capital",
    developer: "New Urban Communities Authority",
    area: "20 acres",
    units: "1,000",
    types: ["Apartments", "Studios"],
    priceRange: "2-4M EGP",
    paymentPlan: "5% down / 5 years",
    completionDate: "2026",
    amenities: ["Walkways", "Green Spaces", "Retail", "Metro Access"],
    expectedROI: "14% annually",
    image: "https://images.unsplash.com/photo-1494708842018-dca5f79c23ad",
    description: "Modern residential units in Egypt's new capital"
  },
  {
    id: "maspero-towers",
    name: "Maspero Business Towers Heights",
    location: "Downtown Cairo",
    developer: "Madinet Nasr",
    area: "5 acres",
    units: "500 (Mixed)",
    types: ["Offices", "Apartments"],
    priceRange: "10-20M EGP",
    paymentPlan: "20% down / 10 years",
    completionDate: "2025",
    amenities: ["Metro Access", "Business Hub", "Restaurants", "Retail"],
    expectedROI: "25% annually",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e",
    description: "Premium commercial and residential tower in CBD"
  }
];

export const getProjectById = (id: string) => {
  return egyptianProjects.find(p => p.id === id);
};

export const getProjectsByLocation = (location: string) => {
  return egyptianProjects.filter(p => p.location.includes(location));
};

export const getProjectsByPriceRange = (minPrice: number, maxPrice: number) => {
  return egyptianProjects.filter(p => {
    const priceStr = p.priceRange.split('-')[1];
    const price = parseInt(priceStr);
    return price >= minPrice && price <= maxPrice;
  });
};

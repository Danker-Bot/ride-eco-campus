export const UNIVERSITIES = {
  PILAR: {
    name: "USAL Campus Pilar",
    address: "Champagnat 1599, B1630AHU Pilar",
    coordinates: { lat: -34.4581, lng: -58.9139 }
  },
  CAPITAL: {
    name: "USAL Capital", 
    address: "Av. Callao 801, C1023AAE CABA",
    coordinates: { lat: -34.6016, lng: -58.3875 }
  }
} as const;

export type UniversityKey = keyof typeof UNIVERSITIES;

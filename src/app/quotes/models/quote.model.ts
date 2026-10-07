export interface Quote {
  id: string;
  productType: 'CP';
  status: 'Incomplete' | 'Completed';
  currentStep: number;

  businessInfo: {
    businessName: string;
    businessType: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };

  propertyInfo: {
    propertyType: string;
    propertyAddress: string;
    yearBuilt: number;
    buildingArea: number;
    numberOfFloors: number;
    constructionType: string;
    occupancyType: string;
  };

  coverageInfo: {
    buildingCoverage: number;
    businessPersonalProperty: number;
    equipmentCoverage: number;
    businessInterruptionCoverage: number;
    generalLiabilityCoverage: number;
    deductible: number;
  };

  createdAt: string;
  updatedAt: string;
}
import { Drug, Pharmacy } from "../pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn for a regular drug", () => {
    const pharmacy = new Pharmacy([new Drug("test", 2, 3)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs).toEqual([new Drug("test", 1, 2)]);
  });

  it("should handle 'Dafalgan' degradation correctly", () => {
    const pharmacy = new Pharmacy([new Drug("Dafalgan", 2, 20)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs).toEqual([new Drug("Dafalgan", 1, 18)]);
    pharmacy.updateBenefitValue(); // Day 2
    expect(pharmacy.drugs).toEqual([new Drug("Dafalgan", 0, 16)]);
    pharmacy.updateBenefitValue(); // Day 3
    expect(pharmacy.drugs).toEqual([new Drug("Dafalgan", -1, 12)]);
  });

  it("should update 'Herbal Tea' benefit correctly", () => {
    const pharmacy = new Pharmacy([new Drug("Herbal Tea", 5, 10)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs).toEqual([new Drug("Herbal Tea", 4, 11)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs).toEqual([new Drug("Herbal Tea", 3, 12)]);
  });

  it("should update 'Herbal Tea' twice faster", () => {
    const pharmacy = new Pharmacy([new Drug("Herbal Tea", -1, 10)])
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs).toEqual([new Drug("Herbal Tea", -2, 12)])
  })

  it("should update 'Fervex' benefit correctly", () => {
    const pharmacy = new Pharmacy([new Drug("Fervex", 11, 10)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs).toEqual([new Drug("Fervex", 10, 12)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs).toEqual([new Drug("Fervex", 9, 14)]);
  });

  it("should handle 'Magic Pill' correctly", () => {
    const pharmacy = new Pharmacy([new Drug("Magic Pill", 0, 40)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs).toEqual([new Drug("Magic Pill", 0, 40)]);
  });
});

describe("Drugs", () => {
    it("should update the benefit of a drug normally", () => {
      const drug = new Drug("simpleDrug", 1, 2);
      drug.updateBenefit(-1);
      expect(drug).toEqual(new Drug("simpleDrug", 1, 1));
    });

    it("should not allow benefit to go below 0", () => {
      const drug = new Drug("simpleDrug", -1, 2);
      drug.updateBenefit(-3);
      expect(drug).toEqual(new Drug("simpleDrug", -1, 0));
    });

    it("should handle 'Dafalgan' degradation correctly", () => {
    const pharmacy = new Pharmacy([new Drug("Dafalgan", 2, 20)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Dafalgan", 1, 18));
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Dafalgan", 0, 16));
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Dafalgan", -1, 12));
  });

  it("should not decrease Magic Pill's expiration", () => {
    const pharmacy = new Pharmacy([new Drug("Magic Pill", 2, 80)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Magic Pill", 2, 80));
  });

  it("should increase Herbal Tea's benefit twice as fast after expiration", () => {
    const pharmacy = new Pharmacy([new Drug("Herbal Tea", 0, 10)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Herbal Tea", -1, 12));
  });

  it("should handle Fervex correctly near expiration", () => {
    const pharmacy = new Pharmacy([new Drug("Fervex", 5, 10)]);
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", 4, 13));
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", 3, 16));
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", 2, 19));
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", 1, 22));
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", 0, 25));
    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", -1, 0));
  });
});


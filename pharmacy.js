import {
  DrugSettings,
  DrugSupplier,
  drugNameToSupplier
} from "./utils/drugSuppliers";
import { BENEFIT_MAX, BENEFIT_MIN, DEGRADATION_MODIFIER } from "./utils/statics";

export class Drug {
  /**
   ** @type {Map<DrugSupplier, Drug>}
  **/
  constructor(name, expiresIn, benefit) {
    if (new.target === Drug) {
      const supplier = drugNameToSupplier[name];
      if (supplier) {
        return this.drugGenerator(supplier, expiresIn, benefit)
      }
    }

    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  /**
   ** @param {DrugSupplier} supplier
   ** @param {number} expiresIn
   ** @param {number} benefit
  **/
  drugGenerator(supplier, expiresIn, benefit) {
    const DrugClass = drugSupplierMap.get(supplier)
    return DrugClass ? new DrugClass(expiresIn, benefit) : null
  }

  reduceExpiration() {
    this.expiresIn -= 1;
  }

  updateBenefit(factor) {
    this.benefit = Math.min(
      BENEFIT_MAX,
      Math.max(BENEFIT_MIN, this.benefit + factor)
    );
  }

  updateBenefitFactor() {
    const drugSetting = DrugSettings[this.name];
    if (!drugSetting) {
      this.updateBenefit(DEGRADATION_MODIFIER);
      return
    }

    let updatedFactor = drugSetting.degradationFactor;
    if (this.expiresIn < 0
        && drugNameToSupplier[this.name] !== DrugSupplier.HERBAL_TEA
    ) updatedFactor*=2;
    this.updateBenefit(updatedFactor);
  }

  update() {
    this.reduceExpiration();
    this.updateBenefitFactor();
  }
}

class Doliprane extends Drug {
  constructor(expiresIn, benefit) {
    super(DrugSupplier.DOLIPRANE.description, expiresIn, benefit)
  }
}

class HerbalTea extends Drug {
  constructor(expiresIn, benefit) {
    super(DrugSupplier.HERBAL_TEA.description, expiresIn, benefit)
  }

  updateBenefitFactor() {
    const factor =
      DrugSettings[this.name].degradationFactor * (this.expiresIn < 0 ? 2 : 1);
    this.updateBenefit(factor);
  }
}

class MagicPill extends Drug {
  constructor(expiresIn, benefit) {
    super(DrugSupplier.MAGIC_PILL.description, expiresIn, benefit)
  }

  update() {}
}
class Fervex extends Drug {
  constructor(expiresIn, benefit) {
    super(DrugSupplier.FERVEX.description, expiresIn, benefit)
  }
  updateBenefitFactor() {
    const { degradationFactor } = DrugSettings[this.name];
    const baseFactor = Math.abs(degradationFactor);
    if (this.expiresIn < 0) baseFactor * 2;

    // i'll set statics value if time
    const benefitUpdates = [
      { condition: () => this.expiresIn < 0, action: () => this.benefit = 0 },
      { condition: () => this.expiresIn <= 5, action: () => this.updateBenefit(baseFactor * 3) },
      { condition: () => this.expiresIn <= 10, action: () => this.updateBenefit(baseFactor * 2) },
      { condition: () => true, action: () => this.updateBenefit(baseFactor) }
    ];

    const { action } = benefitUpdates.find(update => update.condition()) || {};
    action();
    console.log(this.benefit);
  }
}

class Dafalgan extends Drug {
  constructor(expiresIn, benefit) {
    super(DrugSupplier.DAFALGAN.description, expiresIn, benefit)
  }

  updateBenefitFactor() {
    const { degradationFactor } = DrugSettings[this.name];
    const updatedFactor = this.expiresIn < 0 ? degradationFactor * 2 : degradationFactor;
    this.updateBenefit(updatedFactor);
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      drug.update()
    })
    return this.drugs
  }
}

const drugSupplierMap = new Map([
  [DrugSupplier.DOLIPRANE, Doliprane],
  [DrugSupplier.HERBAL_TEA, HerbalTea],
  [DrugSupplier.MAGIC_PILL, MagicPill],
  [DrugSupplier.FERVEX, Fervex],
  [DrugSupplier.DAFALGAN, Dafalgan]
])

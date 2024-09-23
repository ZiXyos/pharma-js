import { DrugSupplier, drugNameToSupplier } from "./utils/drugSuppliers";
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
}

class MagicPill extends Drug {
  constructor(expiresIn, benefit) {
    super(DrugSupplier.MAGIC_PILL.description, expiresIn, benefit)
  }
}
class Fervex extends Drug {
  constructor(expiresIn, benefit) {
    super(DrugSupplier.FERVEX.description, expiresIn, benefit)
  }
}

class Dafalgan extends Drug {
  constructor(expiresIn, benefit) {
    super(DrugSupplier.DAFALGAN.description, expiresIn, benefit)
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      drug.reduceExpiration();
      drug.updateBenefit(DEGRADATION_MODIFIER)
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

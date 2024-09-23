import { DEGRADATION_MODIFIER } from "./statics"

/**
 ** @readonly
 ** @enum {Symbol}
**/
export const DrugSupplier = {
  DOLIPRANE: Symbol("Doliprane"),
  HERBAL_TEA: Symbol("Herbal Tea"),
  MAGIC_PILL: Symbol("Magic Pill"),
  FERVEX: Symbol("Fervex"),
  DAFALGAN: Symbol("Dafalgan")
}

export const drugNameToSupplier = {
  "Doliprane": DrugSupplier.DOLIPRANE,
  "Herbal Tea": DrugSupplier.HERBAL_TEA,
  "Magic Pill": DrugSupplier.MAGIC_PILL,
  "Fervex": DrugSupplier.FERVEX,
  "Dafalgan": DrugSupplier.DAFALGAN
};

/**
** @typedef {Object} DrugSettings
** @property {number} degradationFactor
**/
export const DrugSettings = {
  "Doliprane": { degradationFactor: DEGRADATION_MODIFIER },
  "Herbal Tea": { degradationFactor: 1 },
  "Magic Pill": { degradationFactor: 0 },
  "Fervex": { degradationFactor: 1 },
  "Dafalgan": { degradationFactor: DEGRADATION_MODIFIER * 2 }
}

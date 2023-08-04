export type ProductType = {
  id: string;
  name: string;
  image: string | null;
  unit_amount: number;
  description: string | null;
  currency: string;
  not_discounts: boolean | null;
  not_bonus_program: boolean | null;
};

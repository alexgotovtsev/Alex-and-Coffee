export type AddCartType = {
  id: string;
  name: string;
  type: string;
  unit_amount: number | null;
  image?: string;
  unit: number;
  description?: string;
  quantity?: number | 1;
  currency: string;
};

// Cupones activos — cambiar acá para agregar/desactivar.
// Para gestión desde admin, migrar a una tabla `coupons` en Supabase.

export type Coupon = {
  code: string;
  percent: number;
  label: string;
  active: boolean;
};

export const COUPONS: Record<string, Coupon> = {
  CAMELIA10: {
    code: "CAMELIA10",
    percent: 10,
    label: "10% off en tu primera compra",
    active: true,
  },
};

export function validateCoupon(input: string): Coupon | null {
  const code = input.trim().toUpperCase();
  const coupon = COUPONS[code];
  if (!coupon || !coupon.active) return null;
  return coupon;
}

export function applyCoupon(subtotal: number, coupon: Coupon | null) {
  if (!coupon) return { discount: 0, total: subtotal };
  const discount = Math.round((subtotal * coupon.percent) / 100);
  return { discount, total: subtotal - discount };
}

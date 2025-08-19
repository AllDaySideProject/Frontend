import { useMemo } from "react";

export default function usePricing(input = [], discountInput = 0) {
  const items = useMemo(() => {
    if (Array.isArray(input)) return input;
    if (input && typeof input === "object") {
      const { price = 0, count = 1 } = input;
      return [{ price, count }];
    }
    return [];
  }, [input]);

  const { subtotal, discount, total } = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + (it.originalPrice ?? it.price) * (it.count ?? 1), 0);

    const rawDiscount =
      typeof discountInput === "function"
        ? Number(discountInput(items)) || 0
        : Number(discountInput) || 0;

    const discount = items.reduce((sum, it) => sum + ((it.originalPrice ?? it.price) - it.price) * (it.count ?? 1), 0);
    const total = subtotal - discount;

    return { subtotal, discount, total };
  }, [items, discountInput]);

  const fmt = (n) => Number(n).toLocaleString("ko-KR");

  return { subtotal, discount, total, fmt };
}

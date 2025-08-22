import { useMemo } from "react";

export default function usePricing(input = [], discountInput = 0) {
  const items = useMemo(() => { // 계산에 사용할 상품 배열
    if (Array.isArray(input)) return input; // 배열이 들어오면 그대로 사용
    if (input && typeof input === "object") {
      const { price = 0, count = 1 } = input;
      return [{ price, count }]; // 객체 하나만 들어온 경우 변환
    }
    return [];
  }, [input]);

  const { subtotal, discount, total } = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + (it.originalPrice ?? it.price) * (it.count ?? 1), 0); // 원가 합

    const rawDiscount =
      typeof discountInput === "function"
        ? Number(discountInput(items)) || 0
        : Number(discountInput) || 0;

    const discount = items.reduce((sum, it) => sum + ((it.originalPrice ?? it.price) - it.price) * (it.count ?? 1), 0); // 할인가 계산
    const total = subtotal - discount; // 총 합계

    return { subtotal, discount, total };
  }, [items, discountInput]);

  const fmt = (n) => Number(n).toLocaleString("ko-KR"); // 예: 10000을 "10,000" 형식으로 변경

  return { subtotal, discount, total, fmt };
}

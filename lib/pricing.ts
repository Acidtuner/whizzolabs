const BASE = 450;

function roundUpToNearest5(n: number): number {
  return Math.ceil(n / 5) * 5;
}

export function getUnitPrice(boardQuantity: number): number {
  if (boardQuantity <= 1) return BASE;
  if (boardQuantity === 2) return roundUpToNearest5(BASE * 0.9);
  if (boardQuantity === 3) return roundUpToNearest5(BASE * 0.85);
  return roundUpToNearest5(BASE * 0.8);
}

export type CartItemInput = {
  sku: string;
  quantity: number;
  engravingText?: string | null;
  isTenPack?: boolean;
};

export type CartCalculation = {
  lines: Array<{
    sku: string;
    quantity: number;
    unitPrice: number;
    engravingFee: number;
    lineTotal: number;
  }>;
  boardQuantity: number;
  productSubtotal: number;
  engravingTotal: number;
  shipping: number;
  codFee: number;
  gst: number;
  prepaidDiscount: number;
  finalPayable: number;
  codEligible: boolean;
  discountPercent: number;
};

export function calculateCart(
  items: CartItemInput[],
  paymentMethod: "prepaid" | "cod" | null = null
): CartCalculation {
  const boardItems = items.filter((i) => !i.isTenPack);
  const boardQuantity = boardItems.reduce((s, i) => s + i.quantity, 0);
  const unitPrice = getUnitPrice(boardQuantity);

  let discountPercent = 0;
  if (boardQuantity === 2) discountPercent = 10;
  else if (boardQuantity === 3) discountPercent = 15;
  else if (boardQuantity >= 4) discountPercent = 20;

  const lines = items.map((item) => {
    const isTen = item.isTenPack;
    const price = isTen ? 2499 : unitPrice;
    const engravingFee = !isTen && item.engravingText ? 75 * item.quantity : 0;
    const lineTotal = price * item.quantity + engravingFee;
    return {
      sku: item.sku,
      quantity: item.quantity,
      unitPrice: price,
      engravingFee,
      lineTotal,
    };
  });

  const productSubtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const engravingTotal = lines.reduce((s, l) => s + l.engravingFee, 0);

  const preEngraving = productSubtotal - engravingTotal;
  const shipping = preEngraving >= 699 ? 0 : 60;

  const hasEngraving = lines.some((l) => l.engravingFee > 0);
  const codFee = paymentMethod === "cod" ? 49 : 0;

  const gstBase = productSubtotal + shipping + codFee;
  const gst = Math.round(gstBase * 0.12);

  let finalBeforePrepaid = gstBase + gst;
  const prepaidDiscount = paymentMethod === "prepaid" ? 30 : 0;
  const finalPayable = Math.max(0, finalBeforePrepaid - prepaidDiscount);

  const codEligible = finalPayable < 1500 && !hasEngraving;

  return {
    lines,
    boardQuantity,
    productSubtotal,
    engravingTotal,
    shipping,
    codFee,
    gst,
    prepaidDiscount,
    finalPayable,
    codEligible,
    discountPercent,
  };
}

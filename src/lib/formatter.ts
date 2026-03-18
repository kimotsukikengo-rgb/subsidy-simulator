const currencyFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('ja-JP', {
  maximumFractionDigits: 0,
});

/** 通貨フォーマット（¥1,000,000） */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

/** 数値フォーマット（1,000,000） */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** 万円単位フォーマット（100万円） */
export function formatManYen(value: number): string {
  if (value >= 100_000_000) {
    return `${(value / 100_000_000).toFixed(value % 100_000_000 === 0 ? 0 : 1)}億円`;
  }
  if (value >= 10_000) {
    return `${(value / 10_000).toFixed(value % 10_000 === 0 ? 0 : 1)}万円`;
  }
  return `${numberFormatter.format(value)}円`;
}

/** パーセントフォーマット */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** 全角数字を半角に変換 */
export function toHalfWidth(str: string): string {
  return str.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  );
}

/** 数値文字列をパース（カンマ・全角対応） */
export function parseJapaneseNumber(str: string): number {
  const half = toHalfWidth(str).replace(/[,、]/g, '');
  const num = Number(half);
  return isNaN(num) ? 0 : num;
}

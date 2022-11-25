import "intl";
import "intl/locale-data/jsonp/en";
// required for android

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

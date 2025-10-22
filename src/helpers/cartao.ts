const coresCartao: Record<string, string> = {
  nubank: "#8A05BE",
  inter: "#FF7A00",
  santander: "#EC0000",
  default: "#444",
};

export function getCardColor(emissor: string) {
  return coresCartao[emissor.toLowerCase()] ?? coresCartao.default;
}

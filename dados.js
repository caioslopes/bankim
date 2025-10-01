const DataStorage = (() => {
  const STORAGE_KEY = "app";

  function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);

    const defaultData = {
      salario: 0,
      meses: {},
      parcelas: [],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }

  function save(dados) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
  }

  let dados = load();

  return {
    getSalario: () => dados.salario,
    setSalario: (valor) => {
      dados.salario = valor;
      save(dados);
    },
    getMes: (mesAno) => {
      if (!dados.meses[mesAno]) {
        dados.meses[mesAno] = {
          fatura: [],
          totais: {
            fatura: 0,
            total: 0,
            parcelas: 0,
            saldo: dados.salario,
          },
        };
        save(dados);
      }
      return dados.meses[mesAno];
    },
    updateMes: (mesAno, novosDados) => {
      dados.meses[mesAno] = { ...dados.meses[mesAno], ...novosDados };
      save(dados);
    },
    pertenceAoMes(parcela, mesReferencia) {
      const [anoIni, mesIni] = parcela.inicio.split("-").map(Number);
      const [anoRef, mesRef] = mesReferencia.split("-").map(Number);

      const inicioIndex = anoIni * 12 + (mesIni - 1);
      const refIndex = anoRef * 12 + (mesRef - 1);
      const fimIndex = inicioIndex + parcela.repeticoes - 1;

      return refIndex >= inicioIndex && refIndex <= fimIndex;
    },
    numeroParcela(parcela, mesReferencia) {
      const [anoIni, mesIni] = parcela.inicio.split("-").map(Number);
      const [anoRef, mesRef] = mesReferencia.split("-").map(Number);
      const index =
        anoRef * 12 + (mesRef - 1) - (anoIni * 12 + (mesIni - 1)) + 1;
      return index;
    },
    getTodosMeses: () => dados.meses,
    getParcelas: () => dados.parcelas,
    addParcela: (parcela) => {
      dados.parcelas.push(parcela);
      save(dados);
    },
    setFatura: (mesAno, csvData) => {
      const mes = DataStorage.getMes(mesAno);
      mes.fatura = csvData;

      const fatura = csvData.reduce((sum, item) => sum + (item.valor || 0), 0);
      const parcelas = DataStorage.getParcelas()
        .filter((parcela) => DataStorage.pertenceAoMes(parcela, mesAno))
        .reduce((sum, f) => sum + (f.valor || 0), 0);

      mes.totais.fatura = fatura;
      mes.totais.parcelas = parcelas;
      mes.totais.total = fatura + parcelas;
      mes.totais.saldo = dados.salario - (fatura + parcelas);

      save(dados);
    },
    exportJSON: () => {
      return JSON.stringify(dados, null, 2);
    },
  };
})();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => console.log("Service Worker registrado:", reg.scope))
      .catch((err) => console.log("Falha ao registrar Service Worker:", err));
  });
}

function renderMeses() {
  const container = document.getElementById("months-list");
  if (!container) return;

  container.innerHTML = "";

  const meses = DataStorage.getTodosMeses();

  console.log(meses);

  Object.entries(meses).forEach(([mesAno, dados]) => {
    const [ano, mes] = mesAno.split("-");
    const nomeMes = new Date(ano, mes - 1).toLocaleString("pt-BR", {
      month: "long",
    });

    const card = document.createElement("div");
    card.classList.add("month-card");

    console.log(dados);

    card.innerHTML = `
      <h3>${nomeMes} / ${ano}</h3>
      <p><strong>Fatura:</strong> R$ ${dados.totais.fatura.toFixed(2)}</p>
      <p><strong>Total:</strong> R$ ${dados.totais.total.toFixed(2)}</p>
      <p><strong>Saldo:</strong> R$ ${dados.totais.saldo.toFixed(2)}</p>
    `;

    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = `mes.html?mes=${mesAno}`;
    });

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const salaryValue = document.getElementById("salary-value");
  const editButton = document.getElementById("edit-salary");

  salaryValue.textContent = DataStorage.getSalario().toLocaleString("pt-BR");

  let isEditing = false;

  editButton.addEventListener("click", () => {
    isEditing = !isEditing;

    if (isEditing) {
      salaryValue.contentEditable = "true";
      salaryValue.focus();
      editButton.textContent = "💾";
    } else {
      salaryValue.contentEditable = "false";
      editButton.textContent = "✏️";

      let valor = salaryValue.textContent.replace(/\D/g, "");
      valor = valor ? parseInt(valor) : 0;

      salaryValue.textContent = valor.toLocaleString("pt-BR");
      DataStorage.setSalario(valor);

      Object.keys(DataStorage.getTodosMeses()).forEach((mesAno) => {
        const mes = DataStorage.getMes(mesAno);
        mes.totais.saldo = valor - mes.totais.total;
        DataStorage.updateMes(mesAno, mes);
      });

      renderMeses();
    }
  });

  renderMeses();

  const form = document.getElementById("future-expenses-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const descricao = form.descricao.value.trim();
      const valor = parseFloat(form.valor.value) || 0;
      const parcelas = parseInt(form.parcelas.value) || 1;
      const dataInicial = form["data-inicial"].value;

      let inicio = "";
      if (dataInicial) {
        const [ano, mes] = dataInicial.split("-");
        inicio = `${ano}-${mes}`;
      } else {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        inicio = `${ano}-${mes}`;
      }

      const novaParcela = {
        descricao,
        valor,
        repeticoes: parcelas,
        inicio,
      };

      DataStorage.addParcela(novaParcela);

      alert(`Conta futura "${descricao}" adicionada com sucesso!`);

      form.reset();

      Object.keys(DataStorage.getTodosMeses()).forEach((mesAno) => {
        const mes = DataStorage.getMes(mesAno);
        const parcelasDoMes = DataStorage.getParcelas().filter((p) =>
          DataStorage.pertenceAoMes(p, mesAno)
        );
        const totalParcelas = parcelasDoMes.reduce(
          (sum, p) => sum + (p.valor || 0),
          0
        );
        mes.totais.parcelas = totalParcelas;
        mes.totais.total = mes.totais.fatura + totalParcelas;
        mes.totais.saldo = DataStorage.getSalario() - mes.totais.total;
        DataStorage.updateMes(mesAno, mes);
      });

      renderMeses();
    });
  }

  document.getElementById("csvForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("csvInput");
    const mesInput = document.getElementById("csvMonth");
    const file = fileInput.files[0];
    const mesReferencia = mesInput.value; // "YYYY-MM"

    if (!file || !mesReferencia) {
      alert("Selecione o mês e o arquivo CSV.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      delimiter: "", // auto-detect
      complete: function (results) {
        const linhas = results.data;

        const dadosCSV = [];
        for (const linha of linhas) {
          const valor = parseFloat(
            (linha["Valor"] || linha["valor"] || "0")
              .replace("R$", "")
              .replace(".", "")
              .replace(",", ".")
              .trim()
          );

          const categoria = linha["Categoria"] || linha["categoria"];
          if (
            !categoria ||
            isNaN(valor) ||
            (linha["Lançamento"] &&
              linha["Lançamento"].includes("PAGAMENTO ON"))
          )
            continue;

          dadosCSV.push({ categoria, valor });
        }

        DataStorage.setFatura(mesReferencia, dadosCSV);

        alert(`Fatura do mês ${mesReferencia} carregada com sucesso!`);

        renderMeses();

        fileInput.value = "";
        mesInput.value = "";
      },
      error: function (err) {
        alert("Erro ao ler CSV: " + err.message);
      },
    });
  });
});

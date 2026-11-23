const esc = (value) => String(value ?? "—").replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[c]));
const show = (value) => value == null ? "Não avaliado" : `${value}/100`;
const section = (heading, html) => `<section><h2>${esc(heading)}</h2>${html}</section>`;
const text = (value) => `<p>${esc(value)}</p>`;
const list = (values) => `<ul>${values.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>`;
const hex = /^#[a-f\d]{6}(?:[a-f\d]{2})?$/i;
const swatch = (value) => hex.test(value) ? `<span class="swatch" style="background:${value}"></span>${esc(value)}` : esc(value);
const table = (columns, rows) => rows.length
  ? `<table><thead><tr>${columns.map((column) => `<th>${esc(column)}</th>`).join("")}</tr></thead><tbody>${
    rows.map((row) => `<tr>${row.map((v) => `<td>${esc(v)}</td>`).join("")}</tr>`).join("")
  }</tbody></table>`
  : text("Sem evidência no recorte.");
const refs = (row) => (row.evidence ?? []).join(", ");

const recommendations = {
  color_discipline: "Revise valores próximos e agrupe os que têm a mesma função, preservando estados, temas e contraste.",
  typography: "Confirme as famílias e documente os tamanhos por função antes de consolidar estilos.",
  spacing_system: "Compare o uso de margem, padding e gap para identificar uma escala reutilizável.",
  border_radii: "Mapeie os raios por tipo de controle e avalie quais podem compartilhar tokens.",
  tokenization: "Comece pelas declarações visuais que mais se repetem e verifique se o CSS publicado preserva os aliases.",
  lint_compliance: "Resolva os achados do lint antes de adotar o contrato visual.",
  accessibility: "Revise os pares abaixo de 4,5:1 e teste os estados interativos separadamente.",
};

export function diagnosticHtml({ proposal, report, score, screenshot, document, designHash }) {
  const host = new URL(proposal.source.url).hostname;
  const model = report.visual_model;
  const quality = score.generated_token_quality;
  const context = proposal.screenshot.viewport;
  const categories = score.categories.map((metric) => `<article class="tile">
    <h3>${esc(metric.label)}</h3><strong class="grade ${esc(metric.grade)}">${esc(metric.grade ?? "N/A")}</strong>
    <p>${show(metric.score)}</p><p>${esc(metric.value)}</p><small>Ideal · ${esc(metric.ideal)}</small>
  </article>`).join("");
  const priorities = score.categories.filter((metric) => metric.score != null && metric.score < 90)
    .sort((a, b) => a.score - b.score)
    .map((metric) => `${metric.label} (${show(metric.score)}). ${recommendations[metric.id]}`);
  const notEvaluated = score.categories.filter((item) => item.score == null).map((item) => item.label);
  const inventory = (heading, entries) => section(heading, table(
    ["Propriedade", "Valor", "Ocorrências", "Seletor", "Evidência"],
    entries.map((row) => [row.property, row.value, row.occurrences, row.provenance?.selector, refs(row)]),
  ));
  const selected = Object.entries(document.frontmatter).filter(([key]) =>
    ["colors", "typography", "spacing", "rounded", "components"].includes(key));
  const lintRows = (score.lint?.findings ?? []).map((item) => [item.severity, item.rule, item.path, item.message]);
  const palette = (model.color_candidates ?? []).slice(0, 32);
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:">
<title>Diagnóstico visual · ${esc(host)}</title>
<style>
@page { size: A4; margin: 14mm 13mm 15mm;
  @bottom-left { content: "Design System Maker"; font: 8pt Arial; color: #565e66; }
  @bottom-right { content: counter(page) " / " counter(pages); font: 8pt Arial; color: #565e66; }
}
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 10pt/1.42 Arial, sans-serif; color: #15191d; overflow-wrap: anywhere; }
header { border-bottom: 3px solid #161616; padding-bottom: 12px; margin-bottom: 14px; }
h1 { font-size: 32pt; line-height: 1; color: #111; letter-spacing: -1.2pt; margin: 8px 0 10px; }
h2 { border-bottom: 1.5px solid #161616; padding-bottom: 4px; margin: 19px 0 8px; font-size: 14pt; break-after: avoid; }
h3 { margin: 0; font-size: 9pt; }
p { margin: 5px 0; }
small, .meta { color: #424a53; font-size: 8.5pt; }
.marker { font: 700 9pt Consolas, monospace; text-transform: uppercase; letter-spacing: .6pt; color: #2c3741; }
.panel { border: 2px solid #171717; box-shadow: 3px 3px 0 #171717; padding: 12px; break-inside: avoid; }
.score { display: flex; gap: 18px; align-items: center; margin-bottom: 12px; }
.grade { display: block; font-size: 20pt; line-height: 1; margin: 6px 0; color: #535862; }
.score .grade { font-size: 48pt; }
.grade.A,.grade.B { color: #235735; } .grade.C { color: #77590d; } .grade.D { color: #864519; } .grade.F { color: #9c2628; }
.tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.tile { background: #f2f3f4; border: 1px solid #d8dbde; padding: 8px; }
.tile p { font-size: 8.5pt; } .tile small { font-size: 8pt; }
.priorities { break-inside: avoid; }
.page-before { break-before: page; }
figure { margin: 0; break-inside: avoid; } figure img { display: block; width: 100%; max-height: 123mm; object-fit: contain; object-position: left top; border: 1px solid #ccc; }
figcaption { margin-top: 4px; font-size: 8.5pt; color: #43474b; }
table { width: 100%; border-collapse: collapse; margin: 7px 0 12px; font-size: 8.5pt; }
thead { display: table-header-group; } tr { break-inside: avoid; }
td, th { text-align: left; vertical-align: top; padding: 4px 6px; border-bottom: 1px solid #dce0e2; }
th { background: #f0f2f4; } li { margin-bottom: 4px; } ul { padding-left: 20px; margin: 7px 0; }
th:first-child { min-width: 20mm; } th:last-child { min-width: 23mm; }
.swatch { display: inline-block; width: 11px; height: 11px; margin-right: 4px; border: 1px solid #aaa; vertical-align: middle; }
</style></head><body>
<header><div class="marker">Design System Maker · ${esc(host)}</div><h1>Diagnóstico visual</h1>
<p>${esc(proposal.source.url)}</p><p class="meta">Captura em navegador · ${esc(proposal.screenshot.observed_at)} UTC · ${context.width} × ${context.height} · ${proposal.status === "ready" ? "coleta concluída" : "coleta parcial"}</p></header>
<div class="panel"><div class="score"><strong class="grade ${esc(score.grade)}">${esc(score.grade ?? "N/A")}</strong><div><div class="marker">Design Score</div><b>${show(score.overall)} · ${score.evaluated_categories}/${score.total_categories} categorias avaliadas</b><p class="meta">${esc(score.scope)}</p></div></div>
<div class="tiles">${categories}</div></div>
<div class="priorities">${section("Prioridades de revisão",
  priorities.length ? list(priorities.slice(0, 3)) : text("As categorias avaliadas não indicaram uma prioridade pela regra de triagem (nota abaixo de 90)."))}
${notEvaluated.length ? text(`Sem evidência para pontuar: ${notEvaluated.join(", ")}.`) : ""}</div>
<div class="page-before"></div>
${section("Página observada", `<figure><img src="data:image/png;base64,${screenshot.toString("base64")}" alt="Captura do viewport"><figcaption>Viewport de ${context.width} × ${context.height}. A captura registra o estado observado durante a coleta.</figcaption></figure>`)}
${section("Qualidade dos tokens gerados", `<p><b>${show(quality.score)}</b></p>` +
  text(quality.scope) + text(quality.formula) +
  table(["Critério", "Com suporte / total", "Nota", "Peso"], quality.metrics.map((row) => [row.label, `${row.passed}/${row.total}`, show(row.score), `${row.weight}%`])) +
  (quality.missing.length ? text(`Papéis sem suporte: ${quality.missing.join(", ")}.`) : "") +
  text("A nota estrutural é calculada sobre o modelo do Maker. O arquivo exporta o subconjunto compatível com o formato DESIGN.md."))}
${section("Design Score · método e evidência", text(`${score.method}. ${score.formula}`) + list(score.limitations) +
  table(["Categoria", "Regra", "Evidências"], score.categories.map((item) => [item.label, item.explanation, refs(item)])))}
${section("Contraste dos pares semânticos", text("Critério da métrica: texto normal ≥4,5:1 em pares opacos disponíveis. São candidatos do modelo do Maker. Confira o seletor citado antes de atribuir o resultado a um controle da página.") +
  table(["Par", "Texto", "Fundo", "Razão", "Resultado", "Evidência"], score.contrast_pairs.map((row) => [row.label, row.foreground, row.background, `${row.ratio.toFixed(2)}:1`, row.grade, refs(row)])))}
${section("Lint do modelo visual", score.lint ? text(`${score.lint.checked_tokens} tokens · ${score.lint.errors} erros · ${score.lint.warnings} avisos`) +
  table(["Regra", "Verificação"], score.lint.rules.map((row) => [row.id, row.description])) +
  (lintRows.length ? table(["Nível", "Regra", "Token", "Achado"], lintRows) : text("Nenhum achado segundo as regras executadas.")) +
  (score.lint.omitted_findings ? text(`${score.lint.omitted_findings} achados adicionais já incluídos nas contagens.`) : "") : text("Sem modelo para avaliar."))}
${section("Paleta observada e declarada", palette.length
  ? `<table><thead><tr><th>Cor</th><th>Origem</th><th>Seletor</th><th>Evidência</th></tr></thead><tbody>${palette.map((row) =>
    `<tr><td>${swatch(row.value)}</td><td>${esc(row.source)}</td><td>${esc(row.provenance?.selector)}</td><td>${esc(refs(row))}</td></tr>`).join("")}</tbody></table>` +
    text(`${palette.length} de ${model.color_candidates.length} candidatos apresentados. O inventário integral retido está em evidencias.json.`)
  : text("Sem candidatos de cor no modelo."))}
${inventory("Inventário CSS · cores", report.colors)}
${inventory("Inventário CSS · tipografia", report.typography)}
${inventory("Inventário CSS · espaçamento", report.spacing)}
${inventory("Inventário CSS · raios", report.radii)}
${inventory("Amostra de bordas, sombras e elevação", [...(model.tokens.borders ?? []), ...(model.tokens.shadows ?? [])].map((row) => ({ ...row, occurrences: "—" })))}
${section("Candidatos a componentes", table(["Elemento", "Seletor", "Ocorrências", "Evidência"],
  report.components.map((row) => [row.tag, row.selector, row.occurrences, refs(row)])))}
${section("Tokens exportados em DESIGN.md", text(`SHA-256: ${designHash}`) +
  table(["Grupo", "Token", "Valor ou referência", "Evidência"], selected.flatMap(([key, group]) =>
    Object.entries(group).map(([name, value]) => [key, name,
      typeof value === "object" ? Object.entries(value).map(([k, v]) => `${k} = ${v}`).join(" · ") : value,
      document.evidence[`${key}.${name}`].join(", ")]))))}
${section("Cobertura da coleta", text(`Declarações CSS retidas: ${report.sampling.sampled} de ${report.sampling.total} verificadas · ${report.element_count} elementos na amostra DOM · modelo de captura: ${model.coverage?.status ?? "indisponível"}.`) +
  text(`Cobertura da extração: ${show(report.score)} (${report.method_version}). Medida do inventário disponível.`) +
  table(["Critério", "Fração", "Peso", "Método"], report.metrics.map((row) => [row.id, `${row.numerator}/${row.denominator}`, `${row.weight}%`, row.explanation])))}
${section("Recursos e procedência", table(["Tipo", "URL", "Bytes medidos", "Método"], report.resources.map((row) => [row.kind, row.url, row.bytes, row.method])) +
  text("Hashes das respostas, observações e associações de tokens estão em evidencias.json."))}
${section("Lacunas e escopo", list([...new Set([
  "A coleta se limita à URL, ao viewport e ao estado observados. Outros breakpoints, temas, páginas e estados interativos exigem amostras próprias.",
  "Arquétipo, logotipo, animações, comparação visual e auditoria de acessibilidade completa ficam fora do recorte.",
  ...(model.coverage?.limitations ?? []), ...(model.limitations ?? []), ...report.limitations, ...report.gaps,
])]))}
</body></html>`;
}

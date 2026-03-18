import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import type { SimulationResult } from '../types/simulation';
import type { SubsidyProgram, SubsidyTrack } from '../types/subsidy';
import { formatCurrency } from './formatter';

const NAVY = 'FF1D2088';
const ORANGE = 'FFF39800';
const WHITE = 'FFFFFFFF';
const LIGHT_GRAY = 'FFF8F9FB';

function headerStyle(fill = NAVY): Partial<ExcelJS.Style> {
  return {
    font: { bold: true, color: { argb: WHITE }, size: 11, name: 'Meiryo' },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } },
    alignment: { vertical: 'middle', horizontal: 'center' },
    border: {
      bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    },
  };
}

function cellStyle(isAlt = false): Partial<ExcelJS.Style> {
  return {
    font: { size: 11, name: 'Meiryo' },
    fill: isAlt
      ? { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_GRAY } }
      : undefined,
    alignment: { vertical: 'middle' },
    border: {
      bottom: { style: 'thin', color: { argb: 'FFE5E5E5' } },
    },
  };
}

export async function exportToExcel(
  result: SimulationResult,
  program: SubsidyProgram,
  track: SubsidyTrack
): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = '補助金シミュレーター';
  workbook.created = new Date();

  // === Sheet 1: 投資シミュレーション ===
  const ws1 = workbook.addWorksheet('投資シミュレーション');
  ws1.columns = [
    { width: 25 },
    { width: 25 },
    { width: 20 },
    { width: 20 },
  ];

  // タイトル
  ws1.mergeCells('A1:D1');
  const titleCell = ws1.getCell('A1');
  titleCell.value = '補助金 投資回収シミュレーション';
  titleCell.style = {
    font: { bold: true, size: 16, color: { argb: WHITE }, name: 'Meiryo' },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } },
    alignment: { horizontal: 'center', vertical: 'middle' },
  };
  ws1.getRow(1).height = 40;

  // 補助金情報
  ws1.mergeCells('A2:D2');
  const subTitle = ws1.getCell('A2');
  subTitle.value = `${program.name} - ${track.name}`;
  subTitle.style = {
    font: { bold: true, size: 12, color: { argb: ORANGE }, name: 'Meiryo' },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A40' } },
    alignment: { horizontal: 'center', vertical: 'middle' },
  };
  ws1.getRow(2).height = 30;

  // 空行
  ws1.addRow([]);

  // 概要セクション
  const summaryHeader = ws1.addRow(['項目', '値', '', '']);
  summaryHeader.eachCell((cell) => Object.assign(cell, { style: headerStyle() }));

  const summaryData: [string, string][] = [
    ['投資総額', formatCurrency(result.input.totalInvestment)],
    ['適用補助率', result.subsidyRateDisplay],
    ['補助金額', formatCurrency(result.subsidyAmount)],
    ['実質投資額', formatCurrency(result.actualInvestment)],
    ['月次利益貢献', formatCurrency(result.monthlyProfitContribution)],
    ['投資回収期間', result.paybackPeriodMonths === Infinity ? '回収不可' : `${result.paybackPeriodMonths}ヶ月`],
    ['5年後ROI', `${result.fiveYearROI.toFixed(1)}%`],
  ];

  summaryData.forEach(([label, value], i) => {
    const row = ws1.addRow([label, value, '', '']);
    row.getCell(1).style = { ...cellStyle(i % 2 === 0), font: { bold: true, size: 11, name: 'Meiryo' } };
    row.getCell(2).style = {
      ...cellStyle(i % 2 === 0),
      font: { size: 12, bold: true, color: { argb: i === 2 ? 'FF008800' : 'FF1D2088' }, name: 'Meiryo' },
      alignment: { horizontal: 'right' },
    };
  });

  // === Sheet 2: 年次推移 ===
  const ws2 = workbook.addWorksheet('年次推移');
  ws2.columns = [
    { width: 12 },
    { width: 20 },
    { width: 15 },
    { width: 15 },
  ];

  const yearHeader = ws2.addRow(['年次', '累積利益', '累積ROI', '投資回収']);
  yearHeader.eachCell((cell) => Object.assign(cell, { style: headerStyle() }));

  result.yearlyBreakdown.forEach((row, i) => {
    const dataRow = ws2.addRow([
      `${row.year}年目`,
      formatCurrency(row.cumulativeProfit),
      `${row.cumulativeROI.toFixed(1)}%`,
      row.isPaybackYear ? '回収達成' : '',
    ]);
    dataRow.eachCell((cell) => {
      cell.style = cellStyle(i % 2 === 0);
    });
    if (row.isPaybackYear) {
      dataRow.getCell(4).style = {
        ...cellStyle(i % 2 === 0),
        font: { bold: true, color: { argb: 'FF008800' }, size: 11, name: 'Meiryo' },
      };
    }
  });

  // === Sheet 3: 会社情報 ===
  const ws3 = workbook.addWorksheet('会社情報');
  ws3.columns = [{ width: 20 }, { width: 35 }];

  const companyHeader = ws3.addRow(['項目', '内容']);
  companyHeader.eachCell((cell) => Object.assign(cell, { style: headerStyle() }));

  const ci = result.input.companyInfo;
  const companyData: [string, string][] = [
    ['会社名', ci.companyName || '未入力'],
    ['代表者名', ci.representative || '未入力'],
    ['企業規模', ci.companySize],
    ['従業員数', `${ci.employeeCount}人`],
    ['年間売上高', formatCurrency(ci.annualRevenue)],
    ['資本金', formatCurrency(ci.capitalAmount)],
    ['業種', ci.industry],
    ['所在地', ci.prefecture],
    ['設立年', `${ci.establishedYear}年`],
    ['補助金申請経験', ci.hasAppliedBefore ? 'あり' : 'なし'],
  ];

  companyData.forEach(([label, value], i) => {
    const row = ws3.addRow([label, value]);
    row.getCell(1).style = { ...cellStyle(i % 2 === 0), font: { bold: true, size: 11, name: 'Meiryo' } };
    row.getCell(2).style = cellStyle(i % 2 === 0);
  });

  // ダウンロード
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  saveAs(blob, `補助金シミュレーション_${program.shortName}_${date}.xlsx`);
}

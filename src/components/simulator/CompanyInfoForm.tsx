import { Building2 } from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { SectionCard } from '../shared/SectionCard';
import { CurrencyInput } from '../shared/CurrencyInput';
import { PREFECTURES, INDUSTRIES } from '../../types/company';
import type { CompanySize } from '../../types/subsidy';

const companySizes: { value: CompanySize; label: string; desc: string }[] = [
  { value: '小規模', label: '小規模事業者', desc: '従業員20人以下（商業・サービス業は5人以下）' },
  { value: '中小企業', label: '中小企業', desc: '資本金3億円以下 又は 従業員300人以下' },
  { value: '中堅企業', label: '中堅企業', desc: '資本金10億円未満' },
];

export function CompanyInfoForm() {
  const { companyInfo, updateCompanyInfo } = useSimulationStore();

  return (
    <SectionCard title="会社情報" icon={<Building2 size={20} />}>
      <div className="space-y-4">
        {/* 会社名・代表者 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              会社名
            </label>
            <input
              id="companyName"
              type="text"
              value={companyInfo.companyName}
              onChange={(e) => updateCompanyInfo({ companyName: e.target.value })}
              placeholder="株式会社○○"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="representative" className="block text-sm font-medium text-gray-700 mb-1">
              代表者名
            </label>
            <input
              id="representative"
              type="text"
              value={companyInfo.representative}
              onChange={(e) => updateCompanyInfo({ representative: e.target.value })}
              placeholder="山田 太郎"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none"
            />
          </div>
        </div>

        {/* 企業規模 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">企業規模</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {companySizes.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => updateCompanyInfo({ companySize: size.value })}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  companyInfo.companySize === size.value
                    ? 'border-navy-500 bg-navy-50 text-navy-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <span className="block text-sm font-bold">{size.label}</span>
                <span className="block text-xs mt-0.5 opacity-75">{size.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 従業員数・年間売上・資本金 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-1">
              従業員数
            </label>
            <div className="relative">
              <input
                id="employeeCount"
                type="number"
                min={1}
                value={companyInfo.employeeCount}
                onChange={(e) => updateCompanyInfo({ employeeCount: Number(e.target.value) || 1 })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-right pr-8
                           focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">人</span>
            </div>
          </div>
          <CurrencyInput
            id="annualRevenue"
            label="年間売上高"
            value={companyInfo.annualRevenue}
            onChange={(v) => updateCompanyInfo({ annualRevenue: v })}
          />
          <CurrencyInput
            id="capitalAmount"
            label="資本金"
            value={companyInfo.capitalAmount}
            onChange={(v) => updateCompanyInfo({ capitalAmount: v })}
          />
        </div>

        {/* 業種・都道府県・設立年 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              業種
            </label>
            <select
              id="industry"
              value={companyInfo.industry}
              onChange={(e) => updateCompanyInfo({ industry: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white
                         focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700 mb-1">
              所在地
            </label>
            <select
              id="prefecture"
              value={companyInfo.prefecture}
              onChange={(e) => updateCompanyInfo({ prefecture: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white
                         focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none"
            >
              {PREFECTURES.map((pref) => (
                <option key={pref} value={pref}>{pref}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="establishedYear" className="block text-sm font-medium text-gray-700 mb-1">
              設立年
            </label>
            <div className="relative">
              <input
                id="establishedYear"
                type="number"
                min={1900}
                max={new Date().getFullYear()}
                value={companyInfo.establishedYear}
                onChange={(e) => updateCompanyInfo({ establishedYear: Number(e.target.value) })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-right pr-8
                           focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">年</span>
            </div>
          </div>
        </div>

        {/* 補助金申請経験 */}
        <div className="flex items-center gap-2">
          <input
            id="hasApplied"
            type="checkbox"
            checked={companyInfo.hasAppliedBefore}
            onChange={(e) => updateCompanyInfo({ hasAppliedBefore: e.target.checked })}
            className="w-4 h-4 text-navy-500 border-gray-300 rounded focus:ring-navy-500"
          />
          <label htmlFor="hasApplied" className="text-sm text-gray-700">
            過去に補助金の申請経験がある
          </label>
        </div>
      </div>
    </SectionCard>
  );
}

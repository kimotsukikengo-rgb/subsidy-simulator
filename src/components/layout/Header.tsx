import { Calculator } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-navy-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-2 rounded-lg">
              <Calculator size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">補助金シミュレーター</h1>
              <p className="text-navy-100 text-xs">中小企業向け補助金 投資回収シミュレーション</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

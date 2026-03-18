export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-xs leading-relaxed">
            ※ 本シミュレーションは概算であり、実際の補助金額は審査結果により異なります。
            <br />
            ※ 各補助金制度の詳細は必ず公式サイトおよび最新の公募要領をご確認ください。
            <br />
            ※ 本ツールの利用による損害について一切の責任を負いかねます。
          </p>
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} 補助金シミュレーター
          </p>
        </div>
      </div>
    </footer>
  );
}

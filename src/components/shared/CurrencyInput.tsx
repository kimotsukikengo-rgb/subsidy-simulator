import { useState, useCallback } from 'react';
import { formatNumber, parseJapaneseNumber } from '../../lib/formatter';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  id: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export function CurrencyInput({
  value,
  onChange,
  label,
  id,
  placeholder = '0',
  min = 0,
  max,
}: CurrencyInputProps) {
  const [focused, setFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(String(value));

  const handleFocus = useCallback(() => {
    setFocused(true);
    setDisplayValue(value === 0 ? '' : String(value));
  }, [value]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    let parsed = parseJapaneseNumber(displayValue);
    if (min !== undefined && parsed < min) parsed = min;
    if (max !== undefined && parsed > max) parsed = max;
    onChange(parsed);
    setDisplayValue(String(parsed));
  }, [displayValue, min, max, onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDisplayValue(e.target.value);
    },
    []
  );

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">¥</span>
        <input
          id={id}
          type={focused ? 'text' : 'text'}
          inputMode="numeric"
          value={focused ? displayValue : formatNumber(value)}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg text-right text-sm
                     focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition-colors"
        />
      </div>
    </div>
  );
}

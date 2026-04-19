import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from '@phosphor-icons/react';

const impacts = [
  { value: 'Low',    label: 'Low',    icon: ArrowDownIcon,  color: 'bg-blue-100 text-blue-600 border-blue-300' },
  { value: 'Medium', label: 'Medium', icon: ArrowRightIcon, color: 'bg-yellow-100 text-yellow-600 border-yellow-300' },
  { value: 'High',   label: 'High',   icon: ArrowUpIcon,    color: 'bg-red-100 text-red-600 border-red-300' },
];

export default function ImpactSelect({ value, onChange }) {
  return (
    <div className="flex gap-3">
      {impacts.map(({ value: val, label, icon: Icon, color }) => (
        <button
          key={val}
          type="button"
          onClick={() => onChange(val)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all
            ${value === val
              ? `${color} border-2 scale-105 shadow-sm`
              : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
            }`}
        >
          <Icon size={16} weight={value === val ? 'fill' : 'regular'} />
          {label}
        </button>
      ))}
    </div>
  );
}
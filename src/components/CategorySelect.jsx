import {
  DropIcon,
  PersonSimpleRunIcon,
  BrainIcon,
  MoonIcon,
  StarIcon,
} from '@phosphor-icons/react';

const categories = [
  { value: 'Hydration',  label: 'Hydration', icon: DropIcon,             color: 'bg-sky-100 text-sky-600 border-sky-300' },
  { value: 'Physical',   label: 'Physical',  icon: PersonSimpleRunIcon,  color: 'bg-orange-100 text-orange-600 border-orange-300' },
  { value: 'Mental',     label: 'Mental',    icon: BrainIcon,            color: 'bg-purple-100 text-purple-600 border-purple-300' },
  { value: 'Sleep',      label: 'Sleep',     icon: MoonIcon,             color: 'bg-indigo-100 text-indigo-600 border-indigo-300' },
  { value: 'Nutrition',  label: 'Nutrition', icon: StarIcon,             color: 'bg-green-100 text-green-600 border-green-300' },
];

export default function CategorySelect({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ value: val, label, icon: Icon, color }) => (
        <button
          key={val}
          type="button"
          onClick={() => onChange(val)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all
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
import { useNavigate } from "react-router-dom";
import {
  HeartIcon,
  SparkleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  DropIcon,
  PersonSimpleRunIcon,
  BrainIcon,
  BedIcon,
  BowlFoodIcon,
  ChartLineUpIcon,
  BellRingingIcon,
  TrophyIcon,
} from "@phosphor-icons/react";

const features = [
  {
    icon: CheckCircleIcon,
    title: "Track Daily Habits",
    desc: "Add and complete habits every day. Stay consistent with your wellness goals.",
    color: "bg-purple-50 text-purple-500",
  },
  {
    icon: ChartLineUpIcon,
    title: "Visual Insights",
    desc: "See your progress across categories with beautiful charts and smart summaries.",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: TrophyIcon,
    title: "Health Score",
    desc: "Get a real-time health score based on how many habits you complete each day.",
    color: "bg-amber-50 text-amber-500",
  },
  {
    icon: BellRingingIcon,
    title: "Priority System",
    desc: "Mark habits as Low, Medium or High priority so you always know what matters most.",
    color: "bg-rose-50 text-rose-500",
  },
];

const categories = [
  { name: "Hydration", icon: DropIcon, color: "bg-sky-100 text-sky-500" },
  { name: "Physical", icon: PersonSimpleRunIcon, color: "bg-orange-100 text-orange-500" },
  { name: "Mental", icon: BrainIcon, color: "bg-violet-100 text-violet-500" },
  { name: "Sleep", icon: BedIcon, color: "bg-indigo-100 text-indigo-500" },
  { name: "Nutrition", icon: BowlFoodIcon, color: "bg-green-100 text-green-500" },
];

const steps = [
  { step: "01", title: "Add Your Habits", desc: "Create habits across 5 wellness categories with custom frequency and priority." },
  { step: "02", title: "Complete Them Daily", desc: "Check off habits as you go. Watch your health score rise in real time." },
  { step: "03", title: "Review Your Insights", desc: "See which categories you're crushing and which ones need more attention." },
];

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-[Sora]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center">
            <HeartIcon size={16} weight="fill" className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-800">Healio</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition shadow-md"
        >
          Go to Dashboard
          <ArrowRightIcon size={15} weight="bold" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">

        {/* Badge */}
        <div className="flex items-center gap-2 bg-purple-100 text-purple-600 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
          <SparkleIcon size={13} weight="fill" />
          Your Daily Wellness Companion
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold text-slate-800 leading-tight max-w-2xl">
          Build Habits That
          <span className="text-purple-600"> Actually Stick</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-5 text-lg text-slate-500 max-w-xl leading-relaxed">
          Healio helps you track your daily wellness habits across hydration, fitness, sleep, nutrition and mental health — all in one beautiful dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-7 py-3.5 bg-purple-600 text-white font-bold text-sm rounded-2xl hover:bg-purple-700 transition shadow-lg"
          >
            Get Started
            <ArrowRightIcon size={15} weight="bold" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${cat.color}`}
              >
                <Icon size={15} weight="fill" />
                {cat.name}
              </div>
            );
          })}
        </div>

      </section>

      {/* Features Section */}
      <section className="px-10 py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800">Everything You Need</h2>
            <p className="text-slate-500 mt-3 text-base">Simple tools to keep your wellness on track every single day.</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex gap-4 p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-md transition"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                    <Icon size={20} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-700">{f.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-10 py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800">How It Works</h2>
            <p className="text-slate-500 mt-3 text-base">Three simple steps to a healthier you.</p>
          </div>

          <div className="space-y-6">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="flex items-start gap-6 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                {/* Step number */}
                <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-extrabold text-sm">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-700">{s.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="px-10 py-16 bg-purple-600 text-center">
        <h2 className="text-3xl font-extrabold text-white">Ready to Start Your Wellness Journey?</h2>
        <p className="text-purple-200 mt-3 text-base max-w-md mx-auto">
          Join thousands of people building better habits every day with Healio.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-extrabold text-sm rounded-2xl hover:bg-purple-50 transition shadow-lg mx-auto"
        >
          Start Tracking Now
          <ArrowRightIcon size={15} weight="bold" />
        </button>
      </section>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function FitSlider({ defaultValue }: { defaultValue: number }) {
  const [val, setVal] = useState(defaultValue);

  const tone =
    val >= 70
      ? "text-emerald-600"
      : val >= 45
        ? "text-amber-600"
        : val > 0
          ? "text-red-500"
          : "text-muted";

  return (
    <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink">
      <span className="whitespace-nowrap">Min fit</span>
      <input
        type="range"
        name="minfit"
        min={0}
        max={100}
        step={5}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        onPointerUp={(e) => e.currentTarget.form?.requestSubmit()}
        onKeyUp={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.currentTarget.form?.requestSubmit();
          }
        }}
        className="h-1.5 w-28 cursor-pointer accent-[#0085c8]"
        aria-label="Minimum fit score"
      />
      <span className={`w-10 text-right font-bold tabular-nums ${tone}`}>
        {val > 0 ? `${val}%` : "Any"}
      </span>
    </label>
  );
}

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </NuxtLink>

      <div v-if="applicant" class="bg-white rounded-2xl shadow p-8">
        <div class="flex gap-10">
          <!-- Left: name + total score -->
          <div class="flex flex-col justify-center min-w-40">
            <p class="text-gray-400 text-sm mb-1">
              Applicant #{{ applicant.id }}
            </p>
            <h1 class="text-2xl font-bold text-gray-800">
              {{ applicant.name }}
            </h1>
            <div class="mt-4">
              <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Total Score
              </p>
              <span class="text-4xl font-bold text-indigo-600">{{
                total
              }}</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="w-px bg-gray-100 self-stretch"></div>

          <!-- Right: score bars -->
          <div class="flex-1 space-y-5">
            <ScoreBar
              label="GPA"
              :value="applicant.gpa"
              :max="4.0"
              :displayValue="`${applicant.gpa.toFixed(2)} / 4.00`"
              color="bg-violet-500"
            />
            <ScoreBar
              label="Essay Score"
              :value="applicant.essayScore"
              :displayValue="`${applicant.essayScore} / 100`"
              color="bg-blue-500"
            />
            <ScoreBar
              label="Financial Need"
              :value="applicant.financialNeed"
              :displayValue="`${applicant.financialNeed} / 100`"
              color="bg-emerald-500"
            />
            <ScoreBar
              label="Extracurricular"
              :value="applicant.extracurricular"
              :displayValue="`${applicant.extracurricular} / 100`"
              color="bg-amber-500"
            />
            <p class="text-xs text-gray-400 pt-2 border-t border-gray-100">
              Weighted: GPA 30% · Essay 25% · Financial Need 25% ·
              Extracurricular 20%
            </p>
          </div>
        </div>
      </div>

      <!-- Scoring breakdown note -->
      <div v-if="applicant" class="bg-white rounded-2xl shadow p-8 mt-6">
        <h2
          class="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4"
        >
          How the Total Score is Calculated
        </h2>

        <div class="space-y-4 text-sm text-gray-600">
          <p>
            The total score is a weighted composite of four criteria, each
            normalized to a 0–100 scale before weighting is applied.
          </p>

          <div
            class="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden"
          >
            <div
              v-for="row in breakdown"
              :key="row.label"
              class="flex items-start gap-4 px-5 py-4"
            >
              <span
                class="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                :class="row.dot"
              ></span>
              <div class="flex-1">
                <div class="flex justify-between">
                  <span class="font-medium text-gray-700">{{ row.label }}</span>
                  <span class="text-gray-400 text-xs"
                    >{{ row.weight }} of total</span
                  >
                </div>
                <p class="text-gray-400 text-xs mt-0.5">{{ row.formula }}</p>
              </div>
              <span class="text-gray-700 font-semibold shrink-0">{{
                row.contribution
              }}</span>
            </div>
          </div>

          <div
            class="flex justify-between items-center bg-indigo-50 rounded-xl px-5 py-3 font-semibold"
          >
            <span class="text-indigo-700">Total Score</span>
            <span class="text-indigo-600 text-lg">{{ total }}</span>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 mt-20">
        Applicant not found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { applicants } from "~/data/applicants.js";
import { computeTotalScore } from "~/composables/useApplicants.js";

const route = useRoute();
const applicant = computed(() =>
  applicants.find((a) => a.id === Number(route.params.id)),
);
const total = computed(() =>
  applicant.value ? computeTotalScore(applicant.value) : null,
);

const breakdown = computed(() => {
  if (!applicant.value) return [];
  const a = applicant.value;
  const gpaNorm = (a.gpa / 4.0) * 100;
  const gpaContrib = gpaNorm * 0.3;
  const essayContrib = a.essayScore * 0.25;
  const finContrib = a.financialNeed * 0.25;
  const extraContrib = a.extracurricular * 0.2;
  return [
    {
      label: "GPA",
      weight: "30%",
      dot: "bg-violet-500",
      formula: `(${a.gpa.toFixed(2)} ÷ 4.0) × 100 = ${gpaNorm.toFixed(2)}  →  ${gpaNorm.toFixed(2)} × 30% = ${gpaContrib.toFixed(2)}`,
      contribution: gpaContrib.toFixed(2),
    },
    {
      label: "Essay Score",
      weight: "25%",
      dot: "bg-blue-500",
      formula: `${a.essayScore} × 25% = ${essayContrib.toFixed(2)}`,
      contribution: essayContrib.toFixed(2),
    },
    {
      label: "Financial Need",
      weight: "25%",
      dot: "bg-emerald-500",
      formula: `${a.financialNeed} × 25% = ${finContrib.toFixed(2)}`,
      contribution: finContrib.toFixed(2),
    },
    {
      label: "Extracurricular",
      weight: "20%",
      dot: "bg-amber-500",
      formula: `${a.extracurricular} × 20% = ${extraContrib.toFixed(2)}`,
      contribution: extraContrib.toFixed(2),
    },
  ];
});
</script>

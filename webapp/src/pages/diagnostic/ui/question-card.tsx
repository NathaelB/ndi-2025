import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type DiagnosticQuestion } from "../features/types";

interface QuestionCardProps {
  question: DiagnosticQuestion;
  value?: string;
  onChange: (value: string) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  return (
    <Card className="border border-slate-700/50 bg-slate-900/40 backdrop-blur-md shadow-2xl">
      <CardHeader className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">
              {question.id === "os" && "💻"}
              {question.id === "data-location" && "🌍"}
              {question.id === "authentication" && "🔐"}
              {question.id === "hosting" && "☁️"}
              {question.id === "hardware-reuse" && "♻️"}
              {question.id === "software" && "📝"}
              {question.id === "resource-sharing" && "🤝"}
              {question.id === "digital-policy" && "📋"}
              {question.id === "training" && "👩‍🏫"}
              {question.id === "accessibility" && "♿"}
            </span>
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl leading-tight text-white">
              {question.title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-base text-slate-300">
          {question.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div
              key={option.value}
              className={`flex items-start space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
                value === option.value
                  ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                  : "border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              <RadioGroupItem
                value={option.value}
                id={`${question.id}-${option.value}`}
              />
              <Label
                htmlFor={`${question.id}-${option.value}`}
                className="flex-1 cursor-pointer leading-relaxed"
              >
                <div className="font-medium text-white">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-slate-400 mt-1">
                    {option.description}
                  </div>
                )}
              </Label>
              <div className="flex-shrink-0 text-sm font-semibold">
                {option.score > 0 && (
                  <span className="text-emerald-400">+{option.score}</span>
                )}
                {option.score === 0 && (
                  <span className="text-slate-500">0</span>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

export {
  useDiagnosticAnswers,
  useDiagnosticResult,
  useSaveDiagnostic,
  useDiagnosticHistory,
} from "./use-diagnostic";
export { computeDiagnosticScore, validateAnswers } from "./scoring";
export { ScoreProvider, useScore } from "./score-context";
export type {
  DiagnosticAnswers,
  DiagnosticResult,
  DiagnosticQuestion,
} from "./types";

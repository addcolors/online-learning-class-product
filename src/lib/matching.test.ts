import test from "node:test";
import assert from "node:assert/strict";
import { calculateFundingGap, evaluateRequirement } from "./matching.ts";

test("does not invent a result without a qualification", () => { assert.equal(evaluateRequirement({}, { minimumLanguageScore: 7 }).signal, "insufficient_information"); });
test("flags a missing published language threshold", () => { assert.equal(evaluateRequirement({ qualification: "BSc Computer Science", languageScore: 6.5 }, { qualificationKeywords: ["computer"], minimumLanguageScore: 7 }).signal, "missing_prerequisite"); });
test("returns review needed when subject evidence is incomplete", () => { const result = evaluateRequirement({ qualification: "BSc Computer Science", languageScore: 7, subjects: ["Programming"] }, { qualificationKeywords: ["computer"], minimumLanguageScore: 7, requiredSubjects: ["Mathematics"] }); assert.equal(result.signal, "review_needed"); assert.match(result.reasons[0], /Mathematics/); });
test("returns compatible only when structured evidence aligns", () => { assert.equal(evaluateRequirement({ qualification: "BSc Computer Science", languageScore: 7, subjects: ["Mathematics"] }, { qualificationKeywords: ["computer"], minimumLanguageScore: 7, requiredSubjects: ["Mathematics"] }).signal, "appears_compatible"); });
test("funding gap does not become negative", () => { assert.equal(calculateFundingGap(10000, 12000), 0); });
test("funding gap rejects invalid values", () => { assert.throws(() => calculateFundingGap(-1, 0)); });

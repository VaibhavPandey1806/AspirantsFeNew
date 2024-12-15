export interface Question {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  topic: string;
  source: string;
  section?: string;
  correctAnswer?: string;
  sectionId?: string;
  topicId?: string;
  sourceId?: string;
  comments?: string[];
}
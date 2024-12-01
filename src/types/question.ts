import { BaseItem } from './common';

export interface Category extends BaseItem {}

export interface Topic extends BaseItem {
  sectionId: string;
}

export interface Source extends BaseItem {}

export interface Question {
  submittedBy: any;
  dateTimeSubmitted: string | undefined;
  comments: string[] | null;
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
}
import questionsRu from '../locales/questions_ru.json';
import questionsEn from '../locales/questions_en.json';
import questionsKz from '../locales/questions_kz.json';

const questionFiles = {
  ru: questionsRu,
  en: questionsEn,
  kz: questionsKz,
};

export const generateQuestions = (type, count = 10, difficulty = 'Лёгкий', currentLang) => {
  const questions = questionFiles[currentLang]?.[type]?.[difficulty] || [];
  console.log(`Questions for ${type} at ${difficulty}:`, questions); 

  if (questions.length === 0) {
    console.error(`No questions found for language: ${currentLang}, type: ${type}, difficulty: ${difficulty}`);
  }

  const shuffledQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, count);

  return shuffledQuestions.map(question => ({
    question: question.question,
    options: question.options,
    answer: question.answer,
    difficulty: question.difficulty 
  }));
};
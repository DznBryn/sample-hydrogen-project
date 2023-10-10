import Layouts from '~/layouts';

import {getCMSContent} from '~/utils/functions/eventFunctions';
import {
  GET_EYE_QUIZ_QUESTIONS,
  GET_EYE_QUIZ_RESULTS,
  GET_EYE_QUIZ_CONTENT,
} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import Quiz, {links as quizStyles} from '~/modules/quiz/eyeQuiz';

export const links = () => quizStyles();

export async function loader({context}) {
  const allEyeQuizResults = await getCMSContent(context, GET_EYE_QUIZ_RESULTS);

  const allEyeQuizQuestions = await getCMSContent(
    context,
    GET_EYE_QUIZ_QUESTIONS,
  );

  const allEyeQuizContent = await getCMSContent(context, GET_EYE_QUIZ_CONTENT);

  return {
    allEyeQuizResults,
    allEyeQuizQuestions,
    allEyeQuizContent,
  };
}

export default function QuizContent() {
  const {allEyeQuizResults, allEyeQuizQuestions, allEyeQuizContent} =
    useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <Quiz
        content={{allEyeQuizResults, allEyeQuizQuestions, allEyeQuizContent}}
      />
    </Layouts.MainNavFooter>
  );
}

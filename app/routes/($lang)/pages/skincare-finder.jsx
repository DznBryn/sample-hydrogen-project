import {useLoaderData} from '@remix-run/react';

import {getCMSContent} from '~/utils/functions/eventFunctions';
import {QUIZ_CONTENT} from '~/utils/graphql/sanity/queries';

import Layouts from '~/layouts';
import Quiz, {links as quizStyles} from '~/modules/quiz/skinQuiz';

export const links = () => quizStyles();

export const meta = () => [
  {title: 'Skincare Finder | TULA Skincare'},
  {
    name: 'description',
    content:
      'View the best TULA skincare products recommended for you based on your needs.',
  },
];

const US_SKIN_QUIZ_MODEL = {
  quizID: 'US-skin-quiz',
  marketAvailability: ['US'],
  categories: ['cleanser', 'treat&prep', 'moisturizer', 'eye-balm', 'spf'],
  resultTypes: ['regular', 'advanced'],
  quizType: 'skin-quiz',
};

const CAN_SKIN_QUIZ_MODEL = {
  quizID: 'US-skin-quiz',
  marketAvailability: ['CAN'],
  categories: ['cleanser', 'treat&prep', 'moisturizer', 'eye-care', 'lip-care'],
  resultTypes: ['regular', 'advanced'],
  quizType: 'skin-quiz',
};

export async function loader({context}) {
  const IsCAN = context.env.SITE_NAME === 'CA_PROD';
  const id = IsCAN
    ? 'c7e1edfe-5c6e-4464-b52d-2cd41613ff44'
    : 'b10ae91d-1c63-4d29-bf68-5f14b9ecec7f';

  const quizContent = await getCMSContent(context, QUIZ_CONTENT, {
    id,
  });

  return {
    IsCAN,
    quizContent,
  };
}

export default function QuizContent() {
  const {IsCAN, quizContent} = useLoaderData();
  const SKIN_QUIZ_MODEL = IsCAN ? CAN_SKIN_QUIZ_MODEL : US_SKIN_QUIZ_MODEL;

  return (
    <Layouts.MainNavFooter>
      <Quiz content={quizContent} quizModel={SKIN_QUIZ_MODEL} />
    </Layouts.MainNavFooter>
  );
}

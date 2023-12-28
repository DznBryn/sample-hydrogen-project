export default function quizService(_quizModel = {}) {
  const {categories, questionsID} = _quizModel;

  function handleGetAnswersQualifiers(_answers = [], _key = 'qualifier') {
    const answers = _answers.flat().map((e) => e[_key].toLowerCase());

    return answers;
  }

  function handleGetProductQualifiers(_product, _key = 'qualifier') {
    const answers = _product?.quizAttributes?.qualifiers?.map((e) =>
      e[_key]?.toLowerCase(),
    );
    return answers;
  }

  function handleGetProductsResultByAnswers(
    _products,
    _answers,
    _key = 'qualifier',
  ) {
    const result = _products.filter(
      (prod) =>
        handleGetProductQualifiers(prod, _key)?.every(
          (value) => _answers.includes(value) || value.includes('goal'),
        ) || prod?.quizAttributes.default,
    );

    return result;
  }

  function handleGetRegularResultsByCategory(
    _products,
    _answers,
    _multipleChoice,
    _key = 'qualifier',
  ) {
    let objReturn = {};

    const products = handleGetProductsResultByAnswers(
      _products,
      _answers,
      _key,
    );

    for (const cat of categories) {
      const category = cat.toLowerCase();

      let arr = products
        .filter(
          (prod) => prod?.quizAttributes?.category.toLowerCase() === category,
        )
        .sort(
          (a, b) =>
            b?.quizAttributes?.qualifiers?.length -
            a?.quizAttributes?.qualifiers?.length,
        );

      arr = arr.sort((a) => (a?.quizAttributes.default ? 1 : -1));

      const includesGoalOnFirstResult =
        arr[0]?.quizAttributes?.qualifiers?.some((q) =>
          q[_key].includes('goal'),
        );

      objReturn[category] = includesGoalOnFirstResult
        ? getResultByGoalReference(arr, _multipleChoice, _key)
        : arr;
    }

    return objReturn;
  }

  function handleGetQuestionsByID(_questions = []) {
    let questions = [];

    for (const question of questionsID) {
      const foundQuestion = _questions.find((q) => q._id === question);
      questions = [...questions, foundQuestion];
    }

    return questions;
  }

  function handleGetUserAnswers(_answers, _key = 'qualifier') {
    return handleGetAnswersQualifiers(_answers, _key);
  }

  function getResultByGoalReference(_arr, _multipleChoice, _key = 'qualifier') {
    const idxForReference = handleGetProductQualifiers(_arr[0], _key)
      .find((el) => el?.includes('goal'))
      .split('-')[1];

    const referenceGoal =
      _multipleChoice.length >= idxForReference
        ? _multipleChoice[idxForReference - 1]?.qualifiers[0][_key]
        : _multipleChoice.at(-1)?.qualifiers[0][_key];

    return handleGetProductsResultByAnswers(
      _arr,
      [referenceGoal.toLowerCase()],
      _key,
    ).filter(
      (res) =>
        !handleGetProductQualifiers(res, _key).some((e) => e.includes('goal')),
    );
  }

  function uniq(data, key) {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  }

  function handleGetAdvancedResults(
    _advancedArr,
    _answers,
    _results,
    _coreRoutine,
    _multipleChoice,
    _key = 'qualifier',
  ) {
    let arrResult = [];

    _advancedArr.forEach((adv) => {
      let hasGoalRef = adv?.quizAttributes?.qualifiers?.some((e) =>
        e[_key].includes('goal'),
      );

      if (hasGoalRef) {
        let idxForReference;

        adv.quizAttributes.qualifiers.forEach((e) => {
          if (e[_key].includes('goal')) {
            const value = +e[_key].split('-')[1];
            idxForReference = value;
            return;
          }
          return null;
        });

        const referenceGoal =
          _multipleChoice.length >= idxForReference
            ? _multipleChoice[idxForReference - 1]?.qualifiers[0][_key]
            : _multipleChoice.at(-1)?.qualifiers[0][_key];

        const hasProductByReference = _results
          .filter((ele) =>
            ele.quizAttributes.qualifiers?.some(
              (el) => el[_key].toLowerCase() === referenceGoal.toLowerCase(),
            ),
          )[0]
          ?.quizAttributes.qualifiers?.some((e) => !e[_key].includes('goal'));

        if (hasProductByReference) {
          let returnObj = _results
            .filter((ele) =>
              ele.quizAttributes.qualifiers?.some(
                (el) => el[_key].toLowerCase() === referenceGoal.toLowerCase(),
              ),
            )
            .filter(
              (el) =>
                !el.quizAttributes.qualifiers?.some((e) =>
                  e[_key].includes('goal'),
                ),
            )[0];

          returnObj.quizAttributes.goalReferenceQualifier = referenceGoal;
          returnObj.quizAttributes.priorityOrder =
            adv.priorityOrder || idxForReference;
          returnObj.quizAttributes.goalReferenceValue = idxForReference;

          arrResult.unshift(returnObj);

          return returnObj;
        }
      } else {
        return arrResult.push(adv);
      }

      return arrResult;
    });

    arrResult = arrResult.reduce((acc, ele) => {
      const includeProductID = [
        ...Object.keys(_coreRoutine).map(
          (item) => _coreRoutine[item][0]?.productId,
        ),
      ].includes(ele?.productId);

      const coverAllAnswers =
        !ele.quizAttributes?.qualifiers ||
        ele.quizAttributes?.qualifiers
          ?.map((el) => el[_key].toLowerCase())
          ?.every((item) => _answers.includes(item.toLowerCase()));

      if (!includeProductID && coverAllAnswers) {
        acc.push(ele);
      }

      return acc;
    }, []);

    arrResult = arrResult.sort(
      (a, b) => a.quizAttributes.priorityOrder - b.quizAttributes.priorityOrder,
    );

    return uniq(arrResult, (it) => it?.productId);
  }

  function handleAddSubQuestionIntoQuestionsQueue(_questionsArray, _answer) {
    const isDuplicated = _questionsArray
      .map((q) => q.questionText)
      .includes(_answer.subQuestion.questionText);

    if (!isDuplicated) {
      _questionsArray.push(_answer.subQuestion);
    }

    return _questionsArray;
  }

  return {
    handleGetUserAnswers: handleGetUserAnswers,
    handleGetQuestionsByID: handleGetQuestionsByID,
    handleGetAdvancedResults: handleGetAdvancedResults,
    handleGetAnswersQualifiers: handleGetAnswersQualifiers,
    handleGetProductQualifiers: handleGetProductQualifiers,
    handleGetProductsResultByAnswers: handleGetProductsResultByAnswers,
    handleGetRegularResultsByCategory: handleGetRegularResultsByCategory,
    handleAddSubQuestionIntoQuestionsQueue:
      handleAddSubQuestionIntoQuestionsQueue,
  };
}

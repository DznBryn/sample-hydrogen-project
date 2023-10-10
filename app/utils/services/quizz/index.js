export default function quizService(_quizModel = {}) {
  const {categories, questionsID} = _quizModel;

  function handleGetAnswersQualifiers(_answers = [], _key = 'qualifier') {
    const answers = _answers.flat().map((e) => e[_key].toLowerCase());

    return answers;
  }

  function handleGetProductQualifiers(_product, _key = 'qualifier') {
    const answers = _product.quizAttributes?.qualifiers.map((e) =>
      e[_key].toLowerCase(),
    );
    return answers;
  }

  function handleGetProductsResultByAnswers(
    _products,
    _answers,
    _key = 'qualifier',
  ) {
    const result = _products.filter((prod) =>
      handleGetProductQualifiers(prod, _key)?.every(
        (key) => _answers.includes(key) || key.includes('goal'),
      ),
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
      'qualifier',
    );

    for (const cat of categories) {
      objReturn[cat.toLowerCase()] = products
        .filter(
          (prod) =>
            prod?.quizAttributes?.category.toLowerCase() === cat.toLowerCase(),
        )
        .sort(
          (a, b) =>
            b?.quizAttributes?.qualifiers.length -
            a?.quizAttributes?.qualifiers.length,
        );

      const includesGoalOnFirstResult = objReturn[
        cat.toLowerCase()
      ][0]?.quizAttributes?.qualifiers?.some((q) => q.name.includes('goal'));

      objReturn[cat.toLowerCase()] = includesGoalOnFirstResult
        ? getResultByGoalReference(
            objReturn[cat.toLowerCase()],
            _key,
            _multipleChoice,
          )
        : objReturn[cat.toLowerCase()];
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

  function getResultByGoalReference(_arr, _key = 'qualifier', _multipleChoice) {
    const idxForReference = handleGetProductQualifiers(_arr[0], _key)
      .find((el) => el.includes('goal'))
      .split('-')[1];

    const referenceGoal =
      _multipleChoice.length >= idxForReference
        ? _multipleChoice[idxForReference - 1]?.answersQualifiers[0]?.name
        : _multipleChoice.at(-1)?.answersQualifiers[0]?.name;

    return handleGetProductsResultByAnswers(
      _arr,
      [referenceGoal.toLowerCase()],
      _key,
    ).filter(
      (res) =>
        !handleGetProductQualifiers(res, _key).some((e) => e.includes('goal')),
    );
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
      const hasGoalRef = adv?.quizAttributes?.qualifiers?.some((e) =>
        e[_key].includes('goal'),
      );

      if (hasGoalRef) {
        let idxForReference = '';

        adv.quizAttributes.qualifiers.forEach((e) =>
          e[_key].includes('goal')
            ? (idxForReference = +e[_key].split('-')[1])
            : null,
        );

        const referenceGoal =
          _multipleChoice.length >= idxForReference
            ? _multipleChoice[idxForReference - 1]?.answersQualifiers[0]?.name
            : _multipleChoice.at(-1)?.answersQualifiers[0]?.name;

        const hasProductByReference = _results
          .filter((ele) =>
            ele.quizAttributes.qualifiers?.some(
              (el) => el.name.toLowerCase() === referenceGoal.toLowerCase(),
            ),
          )[0]
          ?.quizAttributes.qualifiers?.some((e) => !e.name.includes('goal'));

        if (hasProductByReference) {
          let returnObj = _results
            .filter((ele) =>
              ele.quizAttributes.qualifiers?.some(
                (el) => el.name.toLowerCase() === referenceGoal.toLowerCase(),
              ),
            )
            .filter(
              (el) =>
                !el.quizAttributes.qualifiers?.some((e) =>
                  e.name.includes('goal'),
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

      const coverAllAnswers = ele.quizAttributes.qualifiers
        .map((el) => el.name.toLowerCase())
        .every((item) => _answers.includes(item.toLowerCase()));

      if (!includeProductID && coverAllAnswers) {
        acc.push(ele);
      }

      return acc;
    }, []);

    arrResult = arrResult.sort(
      (a, b) => a.quizAttributes.priorityOrder - b.quizAttributes.priorityOrder,
    );

    function uniq(data, key) {
      return [...new Map(data.map((x) => [key(x), x])).values()];
    }

    return uniq(arrResult, (it) => it?.productId);
  }

  return {
    handleGetUserAnswers: handleGetUserAnswers,
    handleGetQuestionsByID: handleGetQuestionsByID,
    handleGetAdvancedResults: handleGetAdvancedResults,
    handleGetAnswersQualifiers: handleGetAnswersQualifiers,
    handleGetProductQualifiers: handleGetProductQualifiers,
    handleGetProductsResultByAnswers: handleGetProductsResultByAnswers,
    handleGetRegularResultsByCategory: handleGetRegularResultsByCategory,
  };
}

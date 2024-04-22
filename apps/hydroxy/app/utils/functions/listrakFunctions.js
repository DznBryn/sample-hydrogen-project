/*
 * ##############################
 * #     Listack Functions      #
 * ##############################
 */

const authTokenList = [
  {name: 'footer', endpoint: '/getfooter'},
  {name: 'skin_quiz', endpoint: '/getskinquiz'},
  {name: 'skin_quizuk', endpoint: '/getskinquizuk'},
];

export const getAuthorizationToken = async (typeName) => {
  const tokenType = authTokenList.find((x) => x.name === typeName);
  if (!tokenType) return null;

  const data = await requestAuthToken(tokenType.endpoint);
  const authToken = `${data.token_type} ${data.access_token}`;

  return authToken;
};

export const submitSkinQuizForm = async (
  userEmail,
  segmentationFields,
  siteName,
  env = '',
) => {
  const listrakData = getListrakIds(siteName);

  const skinQuizListId = listrakData.list_id;

  const authToken = await getAuthorizationToken(`skin_quiz${env}`);
  const endpoint = `/v1/List/${skinQuizListId}/Contact?eventIds=${listrakData.externalEventName}`;

  const body = {
    emailAddress: userEmail,
    subscriptionState: 'Subscribed',
    segmentationFieldValues: segmentationFields,
  };

  return await requestListrak(endpoint, authToken, body);
};

export const submitFooterContact = async (
  userEmail,
  userBirthday,
  siteName,
) => {
  const listrakData = getListrakIds(siteName);

  const authToken = await getAuthorizationToken('footer');
  const endpoint = `/v1/List/${listrakData.list_id}/Contact`;
  const footerExternalEventId = siteName.includes('UK') ? '13344' : '';
  const sourceId = siteName.includes('UK') ? '26851' : '';

  const body = {
    emailAddress: userEmail,
    subscriptionState: 'Subscribed',
    segmentationFieldValues: [
      {
        segmentationFieldId: listrakData.birthday_segment_id,
        value: userBirthday || '',
        footerExternalEventId: footerExternalEventId,
        sourceId: sourceId,
      },
    ],
  };

  return await requestListrak(endpoint, authToken, body);
};

export function getListrakIds(siteName = 'US_STG') {
  const giftCard = {
    US_STG: {
      list_id: 345013,
      birthday_segment_id: 431,
      externalEventName: 11771,
      fieldGroupName: 51,
      fieldName: 7810,
    },
    US_PROD: {
      list_id: 345013,
      birthday_segment_id: 431,
      externalEventName: 11771,
      fieldGroupName: 51,
      fieldName: 7810,
    },
    CA_PROD: {
      list_id: 346002,
      birthday_segment_id: 25869,
      externalEventName: 13307,
      fieldGroupName: 2873,
      fieldName: 26307,
    },
    UK_PROD: {
      list_id: 346019,
      birthday_segment_id: 26799,
      externalEventName: 13330,
      fieldGroupName: 2948,
      fieldName: 26886,
    },
  };

  return giftCard[siteName];
}

/*
 * ##############################
 * #     Internal Functions     #
 * ##############################
 */

async function requestListrak(endpoint, authToken, body) {
  const api = 'https://api.listrak.com/email' + endpoint;

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: authToken,
  });

  const response = await fetch(api, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });
  return await response.json();
}

async function requestAuthToken(endpoint) {
  const requestURL = `https://services.tula.com${endpoint}`;

  const response = await fetch(requestURL, {method: 'GET'});
  return await response.json();
}

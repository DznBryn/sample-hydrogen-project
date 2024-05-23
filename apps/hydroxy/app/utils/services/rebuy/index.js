export async function rebuyRecommendationsRequest({
  widgetId,
  requestParameters,
}) {
  try {
    const fetchRebuy = await fetch(
      `https://rebuyengine.com/api/v1/custom/id/${widgetId}?key=49a45ed960a4a3ef0c2d04ac131639f84a657256&${requestParameters}`,
    );

    const dataJson = await fetchRebuy.json();
    return dataJson;
  } catch (error) {
    console.log('Error from Rebuy call: ', error);
  }
}

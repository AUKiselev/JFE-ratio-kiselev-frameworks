import { getShortString } from "./getShortValue";

export const getDataForBlockWithImage = (article, mockData) => {
  const label = mockData.label;
  const title = article.title.length > 28 ? getShortString(article.title, 28) : article.title;
  const authorId = article.userId;
  const date = mockData.date; 
  const textContent = article.body.length > 290 ? getShortString(article.body, 290) : article.body;

  return {
    label,
    title,
    authorId,
    date,
    textContent
  };
};
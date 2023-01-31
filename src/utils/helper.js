import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    isBookmarked: false,
  };
};

export const createUploadRecipeObject = function (data) {
  const ingredients = Object.entries(data)
    .filter((entry) => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map((ing) => {
      const ingArr = ing[1].split(',').map((el) => el.trim());
      if (ingArr.length !== 3) throw new Error('Wrong Ingredient Format !!!');

      const [quantity, unit, description] = ingArr;

      return {
        quantity: quantity ? +quantity : null,
        unit,
        description,
      };
    });

  const recipe = {
    id: data.id,
    title: data.title,
    publisher: data.publisher,
    source_url: data.sourceUrl,
    image_url: data.image,
    servings: data.servings,
    cooking_time: data.cookingTime,
    ingredients: ingredients,
  };

  return recipe;
};

export const updateServings = (ingredients, servings, newServings) => {
  ingredients.forEach(
    (ing) =>
      (ing.quantity = ((ing.quantity * 1) / servings) * (newServings * 1))
  );
  return ingredients;
};

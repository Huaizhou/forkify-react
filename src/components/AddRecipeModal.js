import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import BookmarkContext from '../context/BookmarkContext';
import ResultContext from '../context/ResultContext';
import { createUploadRecipeObject } from '../utils/helper';

/**
 * Add Recipe Component
 * @returns AddRecipeModal
 */
const AddRecipeModal = ({ isActive, handleClose, handleEscape }) => {
  const { register, handleSubmit } = useForm();
  const { recipe, uploadOneResult } = useContext(ResultContext);
  const { addBookmark } = useContext(BookmarkContext);

  const handleUpload = (data, e) => {
    e.target.reset();
    handleClose();
    uploadOneResult(createUploadRecipeObject(data));

    // Navigate to the new recipe and add it to bookmark
    if (recipe.id) {
      window.history.pushState(null, '', `#${recipe.id}`);
      window.location.reload();
      addBookmark(recipe);
    }
  };

  return (
    <div
      className={`add-recipe-window ${isActive ? '' : 'hidden'}`}
      onKeyDown={handleEscape}
    >
      <button className="btn--close-modal" onClick={handleClose}>
        &times;
      </button>
      <form className="upload" onSubmit={handleSubmit(handleUpload)}>
        <div className="upload__column">
          <h3 className="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input required name="title" type="text" {...register('title')} />
          <label>URL</label>
          <input
            required
            name="sourceUrl"
            type="text"
            {...register('sourceUrl')}
          />
          <label>Image URL</label>
          <input required name="image" type="text" {...register('image')} />
          <label>Publisher</label>
          <input
            required
            name="publisher"
            type="text"
            {...register('publisher')}
          />
          <label>Prep time</label>
          <input
            required
            name="cookingTime"
            type="number"
            {...register('cookingTime')}
          />
          <label>Servings</label>
          <input
            required
            name="servings"
            type="number"
            {...register('servings')}
          />
        </div>

        <div className="upload__column">
          <h3 className="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
            {...register('ingredient-1')}
          />
          <label>Ingredient 2</label>
          <input
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
            {...register('ingredient-2')}
          />
          <label>Ingredient 3</label>
          <input
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
            {...register('ingredient-3')}
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
            {...register('ingredient-4')}
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
            {...register('ingredient-5')}
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
            {...register('ingredient-6')}
          />
        </div>

        <button className="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    </div>
  );
};

export default AddRecipeModal;

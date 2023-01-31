import { HashRouter } from 'react-router-dom';
import { useState } from 'react';
import AppContext from './context/AppContext';
import Header from './components/Header';
import Results from './components/Results';
import Content from './components/Content';
import './App.scss';
import AddRecipeModal from './components/AddRecipeModal';

function App() {
  const [isOverlayActive, setOverlayActive] = useState(false);
  const toggleOverlay = () => {
    setOverlayActive(!isOverlayActive);
  };

  // Handle Escape
  const handleEscape = (e) => {
    if (e.key === 'Escape') toggleOverlay();
  };

  // Handle click outside the modal
  const handleClick = () => {
    isOverlayActive && setOverlayActive(false);
  };

  return (
    <AppContext>
      <div className="container" onKeyDown={handleEscape}>
        <Header handleAddRecipe={toggleOverlay} />
        <Results />
        <HashRouter>
          <Content />
        </HashRouter>
      </div>
      <div
        className={`overlay ${isOverlayActive ? '' : 'hidden'}`}
        onClick={handleClick}
      ></div>
      <AddRecipeModal
        isActive={isOverlayActive}
        handleClose={toggleOverlay}
        handleEscape={handleEscape}
      />
    </AppContext>
  );
}

export default App;

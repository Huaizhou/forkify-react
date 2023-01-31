import { SearchContextProvider } from './SearchContext';
import { ResultContextProvider } from './ResultContext';
import { BookmarkContextProvider } from './BookmarkContext';
import { ActiveContextProvider } from './ActiveContext';

const AppContext = ({ children }) => {
  return (
    <SearchContextProvider>
      <ResultContextProvider>
        <BookmarkContextProvider>
          <ActiveContextProvider>{children}</ActiveContextProvider>
        </BookmarkContextProvider>
      </ResultContextProvider>
    </SearchContextProvider>
  );
};

export default AppContext;

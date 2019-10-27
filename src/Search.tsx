import React, {useState} from "react";
import "./Search.scss";

interface SearchProps {
  handleSubmit: (searchString: string) => void;
}

const Search: React.FC<SearchProps> = ({ handleSubmit }) => {
  const [state, setState] = useState("");

  return (
    <div className="search">
      <input type="text" 
        className="search__input"
        placeholder="What do you want to learn about?"
        onChange={(ev) => {setState(ev.target.value);}}
        value={state} />
      <button className="search__button" onClick={() => handleSubmit(state)}>
        Search
      </button>
    </div>
  );
};

export { Search };

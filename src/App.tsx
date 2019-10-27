import React, {useState, useEffect, useRef} from "react";
import "./App.scss";
import {Search} from "./Search";
import {Article, ArticleData} from "./Article";

// Query Wikipedia API and return a promise of Articles
function fetchArticles(sstr: string, offset: number): Promise<ArticleData[]> {
  return (fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${sstr}&sroffset=${offset}&format=json&origin=*&srlimit=20`)
    .then(result => result.json())
    .then<ArticleData[]>(json => (json as any).query.search)
    .catch<ArticleData[]>((err) => {console.log(err); return [];})
  );
}


const App: React.FC = () => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [searchString, setSearchString] = useState("");
  const ref: React.Ref<HTMLDivElement> = useRef(null);
  const visible = useIntersecting(ref, 1, "100px");


  // Fetching more articles and appending them.
  useEffect(() => {
    if (visible && searchString) {
      fetchArticles(searchString, articles.length)
        .then(newArts => {
          setArticles(articles => [...articles, ...newArts]);
        });
    }
  }, [visible, searchString]);


  return (
    <div className="App">
      <header className="header">Wikipedia search</header>
      <Search handleSubmit={handleSubmit} />
      {articles.map(art =><Article key={art.pageid} {...art} />)}
      <div ref={ref} />
    </div>
  );


  function handleSubmit(str: string): void {
    setSearchString(str);
    // Reset state when submitting a new search term.
    setArticles([]);
  }

  function useIntersecting(ref: React.Ref<HTMLDivElement>, threshold=0,
    rootMargin="0px") {
    const [intersecting, setIntersecting] = useState(false);

    useEffect(() => {
      // When triggered, set loading flag to true.
      const observer = new IntersectionObserver(
        ([entry]) => {setIntersecting(entry.isIntersecting);},
        {rootMargin: rootMargin,
          threshold: threshold });

      if(ref) {
        //@ts-ignore ref is guaranteed to be non-null
        observer.observe(ref.current);
      }

      // Clean up callback
      //@ts-ignore ref is guaranteed to be non-null
      return () => observer.unobserve(ref.current);
    }, []);
    return intersecting;
  }
};

export default App;

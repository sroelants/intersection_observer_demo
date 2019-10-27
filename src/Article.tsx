import React from "react";
import "./Article.scss";

export interface ArticleData {
  pageid: number
  title: string;
  snippet: string;
}

const Article: React.FC<ArticleData> = ({pageid, title, snippet}) => {
  return (
    <div className="card">
      <a href={"https://en.wikipedia.org/wiki?curid="+pageid}>
        <div className="card__title">
          {title}
        </div>
        <div className="card__snippet" dangerouslySetInnerHTML={{__html: snippet}}></div>
      </a>
    </div>
  );
};

export {Article};

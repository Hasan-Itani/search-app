"use client";
import { articles } from "./data.js";
import { useState } from "react";
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const term = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    const regex = new RegExp(term, "gi");
    return text.split(regex).map((part, index, arr) => {
      if (index < arr.length - 1) {
        return (
          <>
            {part}
            <span style={{backgroundColor: "yellow"}}>{text.match(regex)[index]}</span>
          </>
        );
      } else {
        return part;
      }
    });
  };

  return (
    <div
      style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial" }}
    >
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />
      <p>{filteredArticles.length} post were found.</p>

      {filteredArticles.map((article, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <h2>{highlightText(article.title)}</h2>
          <p>{article.date}</p>
          <p>{highlightText(article.description)}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

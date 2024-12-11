import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReactMarkdown from "react-markdown";
import "../index.css";

const YoutubeSummarizer = () => {
  const [summary, setSummary] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSummarize = () => {
    setClicked(false);
    setLoading(true);

    fetch(`http://127.0.0.1:5000/youtube_summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ youtube_url: youtubeURL }),
    })
      .then((response) => response.json())
      .then((data) => {
        setClicked(true);
        setLoading(false);
        setSummary(data.response);
        setThumbnailURL(data.thumbnail_url);
        setVideoTitle(data.video_title);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleInputChange = (event) => {
    setYoutubeURL(event.target.value);
  };
  return (
    <div>
      <div className="container">
        <TextField
          id="outlined-basic"
          label="Enter YouTube video URL"
          variant="outlined"
          onChange={handleInputChange}
        />
        <br />
        <br />
        <Button onClick={handleSummarize} variant="contained">
          Summarize
        </Button>
        <br />
        <br />
        {!!loading && (
          <div className="spinner"></div> // Display spinner when loading
        )}
      </div>

      {!!clicked && (
        <div>
          <h2>Video Title: {videoTitle}</h2>
          <img src={thumbnailURL} alt="Video Thumbnail" />
          <h2>Summary:</h2>
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
export default YoutubeSummarizer;

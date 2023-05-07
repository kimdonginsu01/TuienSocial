import React from "react";
import "./input.scss";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

function Input() {
  const handleSend = (e) => {
    e.preventDefault();
  };

  return (
    <form method="" action="" className="chat-input" onSubmit={handleSend}>
      <input type="text" placeholder="Aa" autoFocus />
      <div className="image">
        <input type="file" name="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <AddPhotoAlternateOutlinedIcon sx={{ cursor: "pointer" }} />
        </label>
      </div>
    </form>
  );
}

export default Input;

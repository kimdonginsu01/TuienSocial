import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const createMessage = (req, res) => {
  const { senderId, text, image, chatId } = req.body;

  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret_key", (err, userInfo) => {
    const q = `insert into messages (senderId, text, image, chatId) values(?, ?, ?, ?)`;

    db.query(q, [+senderId, text, image, +chatId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({ messageId: data.insertId, senderId, text, image, chatId });
    });
  });
};

export const getMessage = (req, res) => {
  const { chatId } = req.params;

  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret_key", (err, userInfo) => {
    const q = `select m.* from messages as m join chats as u on m.chatId = u.id where u.id = ?`;

    db.query(q, [+chatId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

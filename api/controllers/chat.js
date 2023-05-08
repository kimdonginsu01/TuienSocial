import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const createChat = (req, res) => {
  const { senderId, receipientId } = req.body;

  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret_key", (err, userInfo) => {
    try {
      const q = `SELECT * FROM chats WHERE (senderId = ? and receipientId = ?) or (senderId  = ? and receipientId = ?)`;

      db.query(q, [+senderId, +receipientId, +receipientId, +senderId], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length) return res.status(200).json(data);
        else {
          if (senderId === receipientId) return res.status(409).json("Chat created failed!");

          const newq = `INSERT INTO chats (senderId, receipientId) VALUES (?, ?)`;
          db.query(newq, [+senderId, +receipientId], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("Creat new chat successfully!");
          });
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

export const findChats = (req, res) => {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret_key", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "SELECT * FROM chats WHERE senderId = ? or receipientId = ?";

    const values = [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

export const findChat = (req, res) => {
  const { id } = req.params;

  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret_key", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "SELECT * FROM chats WHERE id = ?";

    const values = [+id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

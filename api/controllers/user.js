import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getAllUser = (req, res) => {
  // TODO:
  const name = req.query.q;

  const q = "SELECT * FROM users WHERE name LIKE ? LIMIT 5";

  db.query(q, [`%${name}%`], (err, data) => {
    if (err) return res.status(500).json(err);

    data = data.map(({ password, ...info }) => info);
    return res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  // TODO:
  const userId = req.params.userId;

  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secret_key", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "UPDATE users SET `name` = ?, `city` = ?, `email` = ?, `website` = ?, `profilePic` = ?, `coverPic` = ? WHERE id = ?";

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.email,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data?.affectedRows > 0) return res.status(200).json("Updated.");
        return res.status(403).json("You can update only your profile.");
      }
    );
  });
};

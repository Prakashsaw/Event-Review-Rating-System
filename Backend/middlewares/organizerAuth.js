import OrganizerModel from "../models/organizerModel.js";
import { verifyJWTToken } from "../utils/JWTServices.js";

const checkOrganizerAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  try {
    if (authorization && authorization.startsWith("Bearer")) {
      // Get token from header
      token = authorization.split(" ")[1];
      // console.log("Token : ", token);
      // console.log("Authorization : ", authorization);

      // Verify Token
      const verifyToken = verifyJWTToken(token);
      const { _id } = verifyToken;
      // console.log(_id);

      // Get user from token
      // Selecting all userDetailes except password so thats why we do "-password"
      req.organizer = await OrganizerModel.findById(_id).select("-password");
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "Unauthorized Organizer. Invalid token. Login Again...!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Unauthorized Orgnizer. Invalid token. Login Again...!",
    });
  }
};

export default checkOrganizerAuth;

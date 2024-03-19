import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb+srv://nikhilkajota9413750125:nikhilkajota@cluster0.wrdtpxd.mongodb.net", {
      dbName: "MERN_attendance_app",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};

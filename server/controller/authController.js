import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/userSchema.js";
import Student from "../models/Student.js"

// Register a new admin
export   const  register  = async(req, res)=> {


  const { name, email, password } = req.body;

  console.log(name, email, password)

  try {
    // Check if admin with the same email already exists

    console.log("inside catch")


    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}





// Login as an admin
export  const login=  async(req, res)=> {
  const { email, password } = req.body;

  try {
    // Check if admin with the provided email exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}




export const addstudent = async(req, res) => {

  console.log(req.body)

  const { name, rollNo } = req.body;

  try {
    // Check if a student with the same roll number already exists
    const existingStudent = await Student.findOne({ rollNo});

    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this roll number already exists' });
    }

    // Create a new student
    const newStudent = new Student({ name, rollNo });
    await newStudent.save();

    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }


}


export const getstudent = async(req, res)=>{

  try {

    const allStudent = await Student.find();

    // console.log(allStudent)
    res.status(201).json(allStudent);
    
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

}







import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import Navbar from "../page/Navbar.js";

// https://attendance-portal-5xn3.onrender.com//api/v1/user/login
// https://attendance-portal-5xn3.onrender.com//api/v1/user/register
// https://attendance-portal-5xn3.onrender.com//api/v1/user/addStudent

// https://attendance-portal-5xn3.onrender.com//api/v1/attendance/postattendance
// https://attendance-portal-5xn3.onrender.com//api/v1/attendance/getattendance/:date

const Attendance = () => {
  const [rollNo, setRoleNumber] = useState("");
  const [name, setName] = useState("");
  const [allstudents, setStudents] = useState([]);


  const [date,setDate]= useState("")


  const [selectedDate, setSelectedDate] = useState("");
  const [formattedDate, setFormattedDate] = useState(""); 



  const [selectedDatefrom, setSelectedDatefrom] = useState("");
  const [selectedDateto, setSelectedDateto] = useState("");
  const [startformattedDate, setformattedDate] = useState("");
  const [ endformattedDate , setendformattedDate ] = useState("");


  const handleDateChangefrom = (event) => {
    setSelectedDatefrom(event.target.value);
    setformattedDate(formatDate(event.target.value)); 
  };


  const handleDateChangeto = (event) => {
    setSelectedDateto(event.target.value);
    setendformattedDate(formatDate(event.target.value)); 
  };



  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setFormattedDate(formatDate(event.target.value)); 
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const addStudent = async (e) => {
    e.preventDefault();

    try {
      const add = await axios.post(
        "https://attendance-portal-5xn3.onrender.com/api/v1/user/addStudent",
        { name, rollNo }
      );

      if (add) {
        message.success("student added");

        setRoleNumber("");
        setName("");
      } else {
        message.error("student not added ");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const updateAttendance = async (userId , name , rollNo , status , date)=>{
      
    console.log(userId , name , rollNo , status , date);

    const data = {
        userId : userId , name :  name , rollNo :rollNo , status:  status
    }

    try {

       const addAttendance = await axios.post("https://attendance-portal-5xn3.onrender.com/api/v1/attendance/postattendance", {data,date })

       if (addAttendance) {
        message.success("Attendance marked ");

       
      } else {
        message.error("Attendance not marked ");
      }


        
    } catch (error) {
        console.log(error)
    }
  }


  const download = async () => {
  console.log(startformattedDate, endformattedDate);

  try {
    const response = await axios.post("https://attendance-portal-5xn3.onrender.com/api/v1/attendance/getattendance", { startformattedDate, endformattedDate });

    if (response.status === 200 && response.data) {
      // Check if the response contains the CSV data
      if (typeof response.data === 'string') {
        // Display the CSV data in Notepad
        window.open('data:text/csv;charset=utf-8,' + encodeURIComponent(response.data));
      } else if (response.data === 'No data available') {
        message.error("no data to show ");
      } else {
        cmessage.error("no data to show");
      }
    } else {
      message.error("no data to show");
    }
  } catch (error) {
    console.error('Error downloading attendance:', error);
    // Handle specific error cases if needed
  }
};




  useEffect(() => {
    const getStudent = async () => {
      const getstudents = await axios.get(
        "https://attendance-portal-5xn3.onrender.com/api/v1/user/getStudent",
      );
  
      setStudents(getstudents.data);
      
    };
  
    getStudent();
  }, [addStudent]);








  return (
    <>
      <Navbar />
      <div class="text-gray-900 bg-gray-200">
        <div class="p-4 flex justify-center">
          <h1 class="text-3xl font-bold">ATTENDENCE</h1>
        </div>

        <form class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className=" w-full text-sm  px-4 py-3 bg-red-200 focus:bg-red-100 border  border-red-200 rounded-lg focus:outline-none focus:border-red-400"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Roll No"
              onChange={(e) => setRoleNumber(e.target.value)}
              className=" w-full text-sm  px-4 py-3 bg-red-200 focus:bg-red-100 border  border-red-200 rounded-lg focus:outline-none focus:border-red-400"
            />
          </div>

          <button
            onClick={addStudent}
            class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-800 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:purple-blue-600 focus:ring-opacity-50"
            type="submit"
          >
            <span>Add student</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 rtl:-scale-x-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </form>

        
        <div>
      <label htmlFor="">Start date :- </label>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border-2 bg-gray-200 rounded-md"
      />
      {/* Display selected date in "Year-Month-Date" format */}
      {/* {selectedDate && <p>Selected date: {selectedDate}</p>} */}
      {/* Display formatted date */}
      {/* {formattedDate && <p>Formatted date: {formattedDate}</p>} */}

    </div>

        <div class="px-3 py-4 flex justify-center">
          <table class="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr class="border-b">
                <th class="text-center p-3 relative  ">S.No</th>
                <th class="text-center p-3 relative left-[6rem] ">Name</th>
                <th class="text-center p-3 relative left-[5.3rem] ">Email</th>
              </tr>
              {allstudents.length === 0 ? (
                <div className="p-5 text-red">No student added</div>
              ) :allstudents.map((value, index) => (
                <tr class="border-b hover:bg-orange-100 bg-gray-100">
                  <td class="p-3 px-5">{index + 1}</td>

                  <td class="p-3 px-5">
                    <input type="text" value="" class="bg-transparent" />
                    {value.name}
                  </td>
                  <td class="p-3 text-center">
                    <input type="text" value="" class="bg-transparent" />
                    {value.rollNo}
                  </td>

                  <td class="p-3 px-5 flex justify-end">
                    <button
                      type="button"
                      class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"

                      onClick={()=>updateAttendance( value._id ,value.name ,value.rollNo,  "present",formattedDate)}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"

                      onClick={()=>updateAttendance( value._id ,value.name ,value.rollNo,"absent",formattedDate)}

                    >
                      Absent
                    </button>
                  </td>
                </tr>
              ))}






            </tbody>
          </table>
        </div>
      </div>
      <div>
        <label className="text-2xl">Download Attedance</label>


        <div className="flex gap-5 justify-center my-5">

          <div>
            <label htmlFor="">Start date :- </label>
            <input
              type="date"
              value={selectedDatefrom}
              onChange={handleDateChangefrom}
              className="border-2 bg-gray-200 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="">End date :- </label>
            <input
              type="date"
              value={selectedDateto}
              onChange={handleDateChangeto}
              className="border-2 bg-gray-200 rounded-md"
            />
          </div>


        </div>
        <div>
          <button onClick={download}  class="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
            Download
            <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Attendance;

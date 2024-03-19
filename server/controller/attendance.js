import express from 'express';
import Attendance from "../models/attendance.js";
import { createObjectCsvWriter } from 'csv-writer';
import  fs from 'fs';






    

// export const postAttendance = async (req, res) => {
//     const { date, data } = req.body; 

//     console.log(date,data)


//     try {
        
//         const parsedDate = new Date(date);

        
//         let attendanceRecord = await Attendance.findOne({ date: parsedDate });

       
//         if (!attendanceRecord) {
//             attendanceRecord = new Attendance({
//                 date: parsedDate,
//                 records: [],
//             });
//         }

       
//         data.forEach((student) => {
            
//             const index = attendanceRecord.records.findIndex(record => record.userId.toString() === student.userId);

//             if (index === -1) {
                
//                 attendanceRecord.records.push({
//                     userId: student.userId,
//                     name: student.name,
//                     rollNo: student.rollNo,
//                     status: student.status,
//                 });
//             } else {
               
//                 attendanceRecord.records[index].status = student.status;
//             }
//         });

        
//         await attendanceRecord.save();

//         res.status(201).json({ message: 'Attendance record updated successfully' });
//     } catch (error) {
//         console.error('Error saving attendance:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// export const postAttendance = async (req, res) => {
//     const { date, data } = req.body; 

//     console.log(data.status)

//     console.log(date, data);

//     try {
//         const parsedDate = new Date(date);

//         let attendanceRecord = await Attendance.findOne({ date: parsedDate });

//         if (!attendanceRecord) {
//             attendanceRecord = new Attendance({
//                 date: parsedDate,
//                 records: [],
//             });
//         }

//        const pushdata =  attendanceRecord.records.push({
//             userId: data.userId,
//             name: data.name,
//             rollNo: data.rollNo,
//             status: data.status.toUppercase,
//         });

//         // If data is an object, handle it directly
//         // if (typeof data === 'object' && data !== null) {
//         //     const index = attendanceRecord.records.findIndex(record => record.userId.toString() === data.userId);
//         //     if (index === -1) {
//         //         attendanceRecord.records.push({
//         //             userId: data.userId,
//         //             name: data.name,
//         //             rollNo: data.rollNo,
//         //             status: data.status.toUppercase,
//         //         });
//         //     } else {
//         //         attendanceRecord.records[index].status = data.status;
//         //     }
//         // } else {
//         //     console.error('Error: data is not a valid object');
//         // }

//         await attendanceRecord.save();

//         res.status(201).json({ message: 'Attendance record updated successfully' });
//     } catch (error) {
//         console.error('Error saving attendance:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };



export const postAttendance = async (req, res) => {
    const { date, data } = req.body; 

    console.log(data.status);

    try {
        const parsedDate = new Date(date);

        let attendanceRecord = await Attendance.findOne({ date: parsedDate });

        if (!attendanceRecord) {
            attendanceRecord = new Attendance({
                date: parsedDate,
                records: [],
            });
        }

        const pushdata =  attendanceRecord.records.push({
            userId: data.userId,
            name: data.name,
            rollNo: data.rollNo,
            status: data.status, 
        });

        await attendanceRecord.save();

        res.status(201).json({ message: 'Attendance record updated successfully' });
    } catch (error) {
        console.error('Error saving attendance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};












export const employerattendance = async(req,res)=>{


    const {startformattedDate, endformattedDate}= req.body
    console.log(startformattedDate, endformattedDate )

    const startDate = new Date(startformattedDate);
    const endDate = new Date(endformattedDate);

    try {
        // Find the attendance records within the date range
        const attendanceRecords = await Attendance.find({ date: { $gte: startDate, $lte: endDate } });

        if (attendanceRecords.length === 0) {
            return res.status(404).send('Attendance data not found');
        }

        // Extract unique dates and student names
        const uniqueDates = [...new Set(attendanceRecords.map(record => record.date.toISOString().split('T')[0]))];
        const studentNames = [...new Set(attendanceRecords.flatMap(record => record.records.map(r => r.name)))];

        // Prepare attendance data for CSV
        const csvData = studentNames.map(name => {
            const rowData = { 'Name of students': name };

            uniqueDates.forEach(date => {
                const attendanceRecord = attendanceRecords.find(record => record.date.toISOString().split('T')[0] === date);
                const attendance = attendanceRecord.records.find(record => record.name === name);
                rowData[date] = attendance ? attendance.status : 'Not marked';
            });

            return rowData;
        });

        // Create CSV header configuration
        const csvHeader = [
            { id: 'Name of students', title: 'Name of students' },
            ...uniqueDates.map(date => ({ id: date, title: date }))
        ];

        // Create CSV writer
        const csvWriter = createObjectCsvWriter({
            path: 'attendance.csv',
            header: csvHeader
        });

        // Write CSV data to file
        await csvWriter.writeRecords(csvData);

        // Set response headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=attendance.csv');

        // Stream the generated CSV file to the response
        fs.createReadStream('attendance.csv').pipe(res);
    } catch (error) {
        console.error('Error downloading attendance data:', error);
        res.status(500).send('Error downloading attendance data');
    }

}



export const getStudents = async (req, res) => {
    const { date } = req.body;

    try {
        // Find attendance records for the specified date or after that date
        const students = await Attendance.find({ date });

        // Extract records from each student object
        const records = students.map(student => student.records).flat();

        res.status(200).json({ records });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


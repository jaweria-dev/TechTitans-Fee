import { useState, useEffect } from "react";
import axios from "axios";

export default function useTeacher() {
  const [teachers, setTeachers] = useState([]);

  //get teacher
  const getTeachers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/fee/portal/students/get-student"
      );
      setTeachers(data?.teacher);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return teachers;
}

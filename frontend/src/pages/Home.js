import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { AuthContext } from "../contexts/AuthContext";

import CourseCard from "../components/CourseCard/courseCard";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [hotCourses, setHotCourses] = useState([]);
  const [newCourses, setNewCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/api/getHotCourses`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/getNewCourses`),
      user.id
        ? axios.post(
            `${process.env.REACT_APP_API_URL}/api/getMyCourses`,
            { userId: user.id },
            {
              headers: {
                Authorization: `Bearer ${Cookie.get("accessToken")}`,
              },
            }
          )
        : null,
    ])
      .then(([hotCoursesRes, newCoursesRes, myCoursesRes]) => {
        setHotCourses(hotCoursesRes.data.courses);
        setNewCourses(newCoursesRes.data.courses);
        if (myCoursesRes) {
          let tempCourses = myCoursesRes.data.map((course) => ({
            thumbnail: course.course_image,
            title: course.course_name,
            description: course.course_description,
            id: course.course_id,
          }));
          setMyCourses(tempCourses);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {myCourses.length > 0 ? (
        <div>
          <h2 className=" my-4">Khóa học đã đăng ký</h2>

          <div className="row">
            {loading ? (
              <center>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </center>
            ) : (
              myCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>
        </div>
      ) : null}
      <h2 className=" mb-3">Khóa học nhiều người đăng kí</h2>
      {/* 8 khóa */}
      <div className="row">
        {loading ? (
          <center>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </center>
        ) : (
          hotCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>
      <h2 className=" my-4">Khóa học mới nhất</h2>
      {/* 8 khóa */}
      <div className="row">
        {loading ? (
          <center>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </center>
        ) : (
          newCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

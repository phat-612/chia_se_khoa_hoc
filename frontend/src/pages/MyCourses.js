import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MyCourses = () => {
  return (
    <div>
      <h3>Khóa Học Của Tôi</h3>
      <div class="card" style={{ width: "18rem" }}>
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Tên Khóa Học</h5>
          <p class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro fugit
            pariatur voluptatum neque numquam ad tempora facere ducimus dolorem
            repudiandae, nulla et corporis, quae, necessitatibus praesentium
            minus vel nisi. Sint.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;

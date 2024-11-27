import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Cookie from "js-cookie";
import { AuthContext } from "../../contexts/AuthContext";
const StarRating = ({ rating }) => {
  const star = [];
  for (let i = 1; i <= 5; i++) {
    star.push(
      i <= rating ? (
        <li className="me-1" key={i}>
          <i className="fa-solid fa-star text-warning"></i>
        </li>
      ) : (
        <li key={i}>
          <i className="fa-regular fa-star text-warning"></i>
        </li>
      )
    );
  }
  return (
    <ul
      data-mdb-rating-init
      className="d-flex rating list-unstyled fs-4 mb-3 "
      data-mdb-toggle="rating"
    >
      {star}
    </ul>
  );
};

const ReviewCourse = () => {
  const { user, loading } = useContext(AuthContext);
  const { idCourses } = useParams();
  const [isReview, setIsReview] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewUser, setReviewUser] = useState({});
  const [formReview, setFormReview] = useState({
    course_id: idCourses,
    rating: 0,
    comment: "",
    idReview: "",
  });
  const handleInputCmt = (event) => {
    const { name, value } = event.target;
    if (value.length >= 500) {
      return;
    }
    setFormReview({ ...formReview, [name]: value });
  };
  const handleCancelEdit = (event) => {
    setIsEdit(false);
    setFormReview({
      ...formReview,
      rating: reviewUser.rating,
      comment: reviewUser.comment,
    });
  };
  const handleClickStar = (rating) => {
    if (isReview && !isEdit) {
      return;
    }
    setFormReview({ ...formReview, rating: rating });
  };

  // gửi đánh giá
  const handleSendReview = () => {
    if (formReview.rating == 0) {
      alert("Vui lòng chọn sao cho đánh giá");
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/api//addReview`, formReview, {
        headers: {
          Authorization: `Bearer ${Cookie.get("accessToken")}`,
        },
      })
      .then((response) => {
        setFormReview({ ...formReview, rating: 0, comment: "" });
        getReview();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // sửa đánh giá
  const handleEditReview = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/editReview`, formReview, {
        headers: {
          Authorization: `Bearer ${Cookie.get("accessToken")}`,
        },
      })
      .then((response) => {
        getReview();
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // sắp xếp
  const handleChangeSort = (event) => {
    const typeSort = event.target.value;
    if (typeSort == "old") {
      handleSortOld();
    } else {
      handleSortNew();
    }
  };
  const handleSortOld = () => {
    const sortReview = [...reviews].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    setReviews(sortReview);
  };
  const handleSortNew = () => {
    const sortReview = [...reviews].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setReviews(sortReview);
  };
  // lấy dữ liệu đánh giá
  const getReview = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/getReviewByIdCourse/${idCourses}`
    );
    const resReviews = res.data.reviews;
    console.log(resReviews);

    setReviews(resReviews);
    const reviewUser = resReviews.find((review) => review.user_id == user.id);
    // kiểm tra đã từng review
    if (reviewUser) {
      setIsReview(true);
      setReviewUser(reviewUser);
      setFormReview({
        ...formReview,
        rating: reviewUser.rating,
        comment: reviewUser.comment,
        idReview: reviewUser.id,
      });
    }
  };
  useEffect(() => {
    getReview();
  }, [loading]);
  return (
    <div className="container mt-4">
      <div className="d-flex flex-start w-100">
        <img
          className="rounded-circle shadow-1-strong me-3"
          src={user.avatar}
          alt="avatar"
          width="65"
          height="65"
        />
        <div className="w-100">
          <h5 className="mb-0 text-capitalize">{user.fullname}</h5>
          <ul
            data-mdb-rating-init
            className="d-flex rating list-unstyled fs-4 mb-3 "
            data-mdb-toggle="rating"
          >
            {[1, 2, 3, 4, 5].map((rating) =>
              rating <= formReview.rating ? (
                <li
                  onClick={() => {
                    handleClickStar(rating);
                  }}
                  className="me-1 "
                  style={{ cursor: "pointer" }}
                  key={rating}
                >
                  <i className="fa-solid fa-star text-warning"></i>
                </li>
              ) : (
                <li
                  onClick={() => {
                    handleClickStar(rating);
                  }}
                  className="me-1"
                  style={{ cursor: "pointer" }}
                  key={rating}
                >
                  <i className="fa-regular fa-star text-warning"></i>
                </li>
              )
            )}
          </ul>
          <div data-mdb-input-init className="form-outline">
            <textarea
              maxLength="500"
              className="form-control"
              id="textAreaExample"
              rows="4"
              placeholder="Nhập đánh giá của bạn..."
              name="comment"
              onChange={handleInputCmt}
              value={formReview.comment}
              disabled={isReview && !isEdit}
            >
              {formReview.comment}
            </textarea>
          </div>
          {isReview && !isEdit ? (
            <div className="d-flex justify-content-end my-3">
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-success"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                Sửa đánh giá
              </button>
            </div>
          ) : !isReview ? (
            <div className="d-flex justify-content-end my-3">
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-success"
                onClick={handleSendReview}
              >
                Gửi đánh giá
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end my-3">
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-outline-secondary me-3"
                onClick={handleCancelEdit}
              >
                Hủy
              </button>
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-success"
                onClick={handleEditReview}
              >
                Gửi yêu cầu sửa đánh giá
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <div className="text-body">
          <div className=" p-3">
            {/* sort theo ngày */}
            <div className="d-flex justify-content-between mb-5">
              <h3 className="mb-0">Đánh giá khóa học</h3>
              <select
                className="fw-light border-0"
                style={{ outline: "none", boxShadow: "none" }}
                onChange={handleChangeSort}
              >
                <option value="">Sắp xếp đánh giá</option>
                <option value="new">Đánh giá mới nhất</option>
                <option value="old">Đánh giá cũ nhất</option>
              </select>
            </div>
            {/* Khu vực xem đánh giá */}
            <div className="areaReview">
              {reviews.map((review, index) =>
                review.status == 1 ? (
                  <div key={index} className="w-100">
                    <div className="d-flex flex-start p-4">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src={review.avatar}
                        alt="avatar"
                        width="60"
                        height="60"
                      />
                      <div className="w-100">
                        <div>
                          <div className="d-flex justify-content-between">
                            <div className="d-inline align-items-center mb-3">
                              <h6 className="fw-bold text-capitalize mb-1">
                                {review.fullname}
                              </h6>
                              <p className="mb-0">
                                {moment(review.created_at)
                                  .utcOffset("+07:00")
                                  .format("DD/MM/YYYY")}
                              </p>
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                        </div>
                        <p className="mb-0">{review.comment}</p>
                      </div>
                    </div>
                    <hr className="my-0" style={{ height: "1px" }} />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCourse;

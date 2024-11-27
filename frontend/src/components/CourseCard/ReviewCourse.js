import React from "react";

const ReviewCourse = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex flex-start w-100">
        <img
          className="rounded-circle shadow-1-strong me-3"
          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
          alt="avatar"
          width="65"
          height="65"
        />
        <div className="w-100">
          <h5 className="mb-0 text-capitalize">User</h5>
          <ul
            data-mdb-rating-init
            className="d-flex rating list-unstyled fs-4 mb-3 "
            data-mdb-toggle="rating"
          >
            <li className="me-1">
              <i class="fa-solid fa-star text-warning"></i>
            </li>
            <li>
              <i class="fa-regular fa-star text-warning"></i>
            </li>
          </ul>
          <div data-mdb-input-init className="form-outline">
            <textarea
              maxlength="500"
              className="form-control"
              id="textAreaExample"
              rows="4"
              placeholder="Nhập đánh giá của bạn..."
            ></textarea>
          </div>
          <div className="d-flex justify-content-end my-3">
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-outline-secondary me-3"
            >
              Hủy
            </button>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-success"
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <div className="text-body">
          <div className=" p-3">
            <div className="d-flex justify-content-between mb-5">
              <h3 className="mb-0">Đánh giá khóa học</h3>
              <select
                class="fw-light border-0"
                style={{ outline: "none", boxShadow: "none" }}
              >
                <option value="">Sắp xếp đánh giá</option>
                <option value="old">Đánh giá cũ nhất</option>
                <option value="new">Đánh giá mới nhất</option>
              </select>
            </div>

            <div className="d-flex flex-start">
              <img
                className="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                alt="avatar"
                width="60"
                height="60"
              />
              <div>
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="d-inline align-items-center mb-3">
                      <h6 className="fw-bold text-capitalize mb-1">
                        Maggie Marsh
                      </h6>
                      <p className="mb-0">March 07, 2021</p>
                    </div>
                    <ul
                      data-mdb-rating-init
                      className="d-flex rating list-unstyled fs-4 mb-3 "
                      data-mdb-toggle="rating"
                    >
                      <li className="me-1">
                        <i class="fa-solid fa-star text-warning"></i>
                      </li>
                      <li>
                        <i class="fa-regular fa-star text-warning"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it.
                </p>
              </div>
            </div>
          </div>

          <hr className="my-0" />

          <div className="card-body p-4">
            <div className="d-flex flex-start">
              <img
                className="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                alt="avatar"
                width="60"
                height="60"
              />
              <div>
                <h6 className="fw-bold mb-1">Lara Stewart</h6>
                <div className="d-flex align-items-center mb-3">
                  <p className="mb-0">March 15, 2021</p>
                </div>
                <p className="mb-0">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classNameical Latin
                  literature from 45 BC, making it over 2000 years old. Richard
                  McClintock, a Latin professor at Hampden-Sydney College in
                  Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the
                  cites.
                </p>
              </div>
            </div>
          </div>

          <hr className="my-0" style={{ height: "1px" }} />

          <div className="card-body p-4">
            <div className="d-flex flex-start">
              <img
                className="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(33).webp"
                alt="avatar"
                width="60"
                height="60"
              />
              <div>
                <h6 className="fw-bold mb-1">Alexa Bennett</h6>
                <div className="d-flex align-items-center mb-3">
                  <p className="mb-0">March 24, 2021</p>
                </div>
                <p className="mb-0">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCourse;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/styles.css";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Axios를 사용하여 데이터를 가져오는 부분(Get)
    axios
      .get("/reports") // 엔드포인트 수정
      .then((response) => {
        setReports(response.data);
        // 초기에는 모두 더보기 상태를 false로 초기화
        setShowMore(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleMore = (index) => {
    // 해당 인덱스의 더보기 상태만을 true로 설정하고, 나머지는 모두 false로 설정
    setShowMore((prev) =>
      prev.map((_, i) => (i === index ? !prev[index] : false))
    );
  };

  const handleSearch = (Id) => {
    // 페이지 이동과 함께 새로고침
    window.location.href = `/recipes/${Id}`;
  };

  return (
    <div className="report-history">
      <div id="report-header">신고접수내역</div>
      <div id="main-report-bar">
        <div class="exam-item category">구분</div>
        <div class="exam-item title">제목</div>
        <div class="exam-item author">작성자</div>
        <div class="exam-item reported">신고자</div>
        <div class="exam-item report-content">신고내용</div>
        <div class="exam-item status"></div>
      </div>
      {reports.map((report, index) => (
        <div key={report.reportId}>
          <div id="report-bar">
            <div class="exam-item category">{report.reportCategory}</div>
            <div
              class="exam-item title"
              onClick={() => handleSearch(report.recipeId)}
            >
              {report.contentTitle}
            </div>
            <div class="exam-item author">{report.authorName}</div>
            <div class="exam-item reported">{report.reportedName}</div>
            <div class="exam-item report-content">{report.reportReason}</div>
            {/* <div class="exam-item status">{report.processing ? 'Yes' : 'No'}</div> */}
            <div className="exam-item status">
              <img src="/images/moreSee.png" alt="moreSee icon" className="moreSee-icon" onClick={() => toggleMore(index)}/>
            </div>
          </div>
          {/* 더보기 창 */}
          {showMore[index] && (
            <div className="more-box">{report.reportReason}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportList;

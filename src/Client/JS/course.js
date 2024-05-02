const locationMap = document.getElementById("location-map");

let map; // 카카오 지도
let userLatitude;
let userLongitude;
let isMapDrawn = false;
let courseData = [];
let markers = [];

// 마커를 그리는 함수
const addMarkers = (position) => {
  let marker = new kakao.maps.Marker({
    position: position,
  });
  marker.setMap(map);
  marker.push(marker);
};
// 마커를 지우는 함수
const delMarker = () => {
  for (let i = 0; i < marker.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
};

const addCourseMarker = (course) => {
  let markerImageUrl = "/file/map_not_done.png";
  let markerImageSize = new kakao.maps.Size(24, 35);
  const kakaoMarkerImage = new kakao.maps.MarkerImage(
    markerImageUrl,
    markerImageSize
  );

  const LatLng = new kakao.maps.LatLng(
    course.course_latitude,
    course.course_longitude
  );

  new kakao.maps.Marker({
    map: map,
    position: LatLng,
    title: course.course_name,
    image: kakaoMarkerImage,
  });
};

const setCourseMarker = () => {
  for (let i = 0; i < courseData.length; i++) {
    addCourseMarker(courseData[i]);
  }
};

const drawMap = (latitude, longitude) => {
  // 1번쨰 인자: 지도그릴 DOM
  map = new kakao.maps.Map(locationMap, {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 2,
  });
  map.setZoomable(false);
};

const configLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((pos) => {
      userLatitude = pos.coords.latitude;
      userLongitude = pos.coords.longitude;

      if (!isMapDrawn) {
        drawMap(userLatitude, userLongitude);
        setCourseMarker();
        isMapDrawn = true;
      }

      addMarkers(new kakao.maps.LatLng(userLatitude, userLongitude));
    });
  }
};

const makeCourseNaviHTML = (data) => {
  const courseWrap = document.getElementById("courseWrap");
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<li class='course'>`;
    html += `<p>${data[i].course_name}</p>`;
    html += `</li>`;
  }
  html += `<li id="myPosition" class="course on">나의 위치 </li>`;
  courseWrap.innerHTML = html;
};

const getCourseList = async () => {
  const response = await fetch("/api/course");
  const result = await response.json();
  courseData = result.data;

  makeCourseNaviHTML(courseData);
  configLocation();
};
getCourseList();

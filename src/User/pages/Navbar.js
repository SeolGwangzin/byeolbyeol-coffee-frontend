import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../component/UserAction"; // logoutUser 액션 크리에이터 임포트
import axios from "axios";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UpdatePage from "./UpdatePage";
import Kakao from "../component/OAuth2RedirectHandeler";
import UserNickName from "../component/UserNickName";
import logo from "../../assets/logo.png";
import person from "../../assets/Person.svg";
import "../styles/Page.css";
import RecipeViewPage from "../../pages/RecipeViewPage";
import RecipeDetailViewPage from "../../pages/RecipeDetailViewPage";
import AddRecipePage from "../../pages/AddRecipePage";
import SearchBar from "../../search/component/SearchBar";
import RankingPage from "../../pages/RankingPage";

function Navbar() {
  const user = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/users/login");
  };

  const handleRandomRecipe = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes");
      const recipes = response.data;

      const randomIndex = Math.floor(Math.random() * recipes.length);
      const randomRecipe = recipes[randomIndex];

      navigate(`/recipes/${randomRecipe.recipeId}`);
    } catch (error) {
      console.error("레시피 목록을 가져오는데 실패했습니다:", error);
    }
  };

  return (
    <div>
      <div className="navbar-section">
        <img
          className="navbarLogo"
          src={logo}
          alt="별별커피 로고"
          onClick={goToHome}
        />
        <Link to="/recipes">
          <button id="recipe" className="recipePageBtn">
            레시피
          </button>
        </Link>
        <Link to="/ranking">
          <button id="ranking" className="rankingPageBtn">
            랭킹
          </button>
        </Link>
        <Link to="/">
          <button id="cafereview" className="cafereviewPagewBtn">
            카페리뷰
          </button>
        </Link>
        <button
          id="randomcoffee"
          className="randomPageBtn"
          onClick={handleRandomRecipe}
        >
          오늘 뭐마셔?
        </button>
        <SearchBar />
        <div className="container">
          <img className="personicon" src={person} alt="User Icon" />
          {user ? (
            <>
              <UserNickName />
              <button
                id="logout"
                className="LogoutPageBtn"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/users/login">
              <button id="login" className="LoginPageBtn">
                로그인
              </button>
            </Link>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetailViewPage />} />
        <Route path="/recipes" element={<RecipeViewPage />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/signup" element={<SignupPage />} />
        <Route path="/users/update" element={<UpdatePage />} />
        <Route path="/login/oauth/kakao/callback" element={<Kakao />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </div>
  );
}

export default Navbar;

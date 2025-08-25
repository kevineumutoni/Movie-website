"use client";
import React, { useState } from "react";
import MovieDashboard from "./movieDashboard/page";
import Footer from "./footer/page";
import SignInPage from "./signIn/page";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!loggedIn ? (
        <SignInPage />
      ) : (
        <>
          <MovieDashboard />
          <Footer />
        </>
      )}
    </div>
  );
}
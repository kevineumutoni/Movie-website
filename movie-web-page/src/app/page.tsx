"use client";
import React, { useState } from "react";
import MovieDashboard from "./movieDashboard/page";
import Footer from "./footer/page";
import SignInPage from "./signIn";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!loggedIn ? (
        <SignInPage onSignIn={() => setLoggedIn(true)} />
      ) : (
        <>
          <MovieDashboard />
          <Footer />
        </>
      )}
    </div>
  );
}
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import photo from "./study_login.webp";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);

  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Password validation function
  const isPasswordValid = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;
    return hasUppercase && hasLowercase && hasMinLength;
  };

  // ✅ Email/password registration
  const handleRegister = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!isPasswordValid(password)) {
      setPasswordError(
        "Password must have at least 6 characters, including uppercase and lowercase letters."
      );
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("✅ Register successful!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // ✅ Google Sign-in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);

        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("✅ Registered with Google!");
            navigate(location.state?.from || "/");
          });
      })
      .catch((error) => {
        toast.error("❌ Google login failed!");
        console.error(error);
      });
  };

  return (
    <div
      className="flex justify-center min-h-screen items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${photo})` }}
    >
      <div className="card w-full max-w-sm shrink-0 shadow-2xl py-6 px-5 
                      bg-black/40 backdrop-blur-sm border border-white/10 
                      text-white rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Register Your Account
        </h2>

        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset space-y-1.5">
            {/* Name */}
            <label className="font-semibold text-gray-300">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="input transition-all duration-300 bg-white/5 border border-gray-400 text-white placeholder-gray-400 focus:border-amber-950 focus:outline-none"
            />

            {/* Photo URL */}
            <label className="font-semibold text-gray-300">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Enter photo URL"
              required
              className="input transition-all duration-300 bg-white/5 border border-gray-400 text-white placeholder-gray-400 focus:border-amber-950 focus:outline-none"
            />

            {/* Email */}
            <label className="font-semibold text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="input transition-all duration-300 bg-white/5 border border-gray-400 text-white placeholder-gray-400 focus:border-amber-950 focus:outline-none"
            />

            {/* Password */}
            <label className="font-semibold text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="input transition-all duration-300 bg-white/5 border border-gray-400 text-white placeholder-gray-400 focus:border-amber-950 focus:outline-none"
            />
            {passwordError && (
              <p className="text-xs text-red-700">{passwordError}</p>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="btn mt-4 w-full bg-gradient-to-r from-amber-950 to-amber-200 hover:from-amber-400 hover:to-amber-100 border-none"
            >
              Register
            </button>

            <div className="flex w-full flex-col">
              <div className="divider before:bg-amber-950 after:bg-amber-950">
                OR
              </div>
            </div>

            {/* Google Sign-in */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn bg-white text-black border-white flex items-center justify-center gap-2"
            >
              <svg
                aria-label="Google logo"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path fill="#fff" d="M0 0H512V512H0" />
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  />
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  />
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  />
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  />
                </g>
              </svg>
              Register with Google
            </button>

            {/* Login Link */}
            <p className="font-semibold text-center pt-5">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-amber-950 hover:underline">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;

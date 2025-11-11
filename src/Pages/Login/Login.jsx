import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import photo from "./study_login.webp";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";



const Login = () => {
  const { signIn, signInWithGoogle, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Handle email/password login
  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("✅ Login successful!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        console.error(error);
        setError("❌ Invalid email or password.");
        toast.error(error.message);
      });
  };

  // ✅ Handle Google Sign-in
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
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("✅ Logged in with Google!");
            navigate(location.state?.from || "/");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("❌ Google login failed!");
      });
  };

  return (
    <div
      className="flex justify-center min-h-screen items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${photo})` }}
    >
      <div
        className="card w-full max-w-sm shrink-0 shadow-2xl py-6 px-5 
                      bg-black/40 backdrop-blur-sm border border-white/10 
                      text-white rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset space-y-1.5">
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

            {error && <p className="text-xs text-red-700">{error}</p>}

            <div className="flex justify-between items-center pt-2">
              <a
                href="#"
                className="text-sm text-amber-500 hover:underline hover:text-amber-300"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn mt-4 w-full bg-gradient-to-r from-amber-950 to-amber-200 hover:from-amber-400 hover:to-amber-100 border-none"
            >
              Login
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
              Login with Google
            </button>

            {/* Register Link */}
            <p className="font-semibold text-center pt-5">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-amber-950 hover:underline">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;

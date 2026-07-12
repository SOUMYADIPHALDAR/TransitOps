import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Sign up to get started
        </p>

        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" />
            I agree to the Terms & Conditions
          </label>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-sm text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          <span>OR</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path fill="#4285F4" d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.79h3.14c1.84-1.7 2.92-4.2 2.92-7.75Z" />
            <path fill="#34A853" d="M12 21.76c2.62 0 4.82-.87 6.43-2.36l-3.14-2.79c-.87.59-1.98.94-3.29.94-2.53 0-4.68-1.71-5.45-4.01H3.3v2.88A9.72 9.72 0 0 0 12 21.76Z" />
            <path fill="#FBBC05" d="M6.55 13.54A5.84 5.84 0 0 1 6.25 12c0-.53.1-1.04.3-1.54V7.58H3.3A9.72 9.72 0 0 0 2.28 12c0 1.57.38 3.06 1.02 4.42l3.25-2.88Z" />
            <path fill="#EA4335" d="M12 6.45c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.81 3.52 14.62 2.24 12 2.24A9.72 9.72 0 0 0 3.3 7.58l3.25 2.88C7.32 8.16 9.47 6.45 12 6.45Z" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <Link
                to="/"
                className="text-blue-600 hover:underline">
                Login
            </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;

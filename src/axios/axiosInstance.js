import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    timeout: 4000,
});

const refreshAccessToken = async () => {
    try {
        // Replace these values with your actual refresh token and token endpoint
        const refreshToken = localStorage.getItem("refresh_token");
        const tokenEndpoint = "http://127.0.0.1:8000/api/v1/token/refresh/";

        // Make a POST request to the token endpoint with the refresh token
        const response = await axios.post(tokenEndpoint, {
            refresh: refreshToken,
            // Include any other required data for the token endpoint
        });

        // Handle the response and extract the new access token
        const newAccessToken = response.data.access_token;

        // Return the new access token
        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};

axiosInstance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        // Check if response is 401 status code then make
        //  request to generate access token
        // using refresh token

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Generate a new access token
                const newAccessToken = await refreshAccessToken();

                // Update the Authorization header with the new access token
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;

                // Retry the original request with the new access token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Handle the error if refreshing the access token fails
                console.error("Error refreshing access token:", refreshError);

                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
export default axiosInstance;

const backendDomain = "http://localhost:8080"

const ApiSummary = {
    signUp: {
        url: `${backendDomain}/api/signUp`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signIn`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout: {
        url: `${backendDomain}/api/logout`,
        method: "get"
    },
    allUsers: {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    }
}

export default ApiSummary;
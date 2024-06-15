const backendDomain = "http://localhost:8080"

const ApiSummary = {
    signUp: {
        url: `${backendDomain}/api/signUp`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signIn`,
        method: "post"
    }
}

export default ApiSummary;
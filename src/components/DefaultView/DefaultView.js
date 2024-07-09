export default function DefaultView({ users, currentUser, setCurrentUser, setView }) {
    return currentUser ? (
        <button onClick={() => users.signOut(() => setCurrentUser(null))}>
            Sign out
        </button>
    ) : (
        <>
            <button onClick={() => setView("signIn")}>
                Sign in
            </button>

            <button onClick={() => setView("register")}>
                Register
            </button>
        </>
    );
}
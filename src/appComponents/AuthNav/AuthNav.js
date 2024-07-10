export default function DefaultView({ users, currentUser, setView }) {
    return (
        <nav>
            {currentUser ? (
                <button onClick={() => users.signOut()}>
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
            )}
        </nav>
    );
}
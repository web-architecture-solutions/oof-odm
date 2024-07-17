import Button from "../../../form/components/Button/Button";

export default function AuthNav({ 
    currentUser, 
    handleOnSignOut,
    handleOnSignIn,
    handleOnRegister
}) {
    return (
        <nav>
            {currentUser ? (
                <Button onClick={handleOnSignOut}>
                    Sign out
                </Button>
            ) : (
                <>
                    <Button onClick={handleOnSignIn}>
                        Sign in
                    </Button>

                    <Button onClick={handleOnRegister}>
                        Register
                    </Button>
                </>
            )}
        </nav>
    );
}
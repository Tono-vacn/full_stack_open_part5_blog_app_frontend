import PropTypes from 'prop-types'
const LoginForm = ({
    handleLogin,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange
}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                  username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id = 'username'
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                  password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id = 'password'
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id='login-button' type="submit">login</button>
            </form>
        </div>
    )}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm
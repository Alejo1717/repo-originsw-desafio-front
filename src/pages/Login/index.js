import React from "react";
import { ENDPOINTs } from "../../config/env.config";
import { login } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { singin } from "../../stores/modules/auth.reducer";
import { createUser } from "../../stores/modules/user.reducer";
import jwt_decode from "jwt-decode";

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false)

    const handleSubmit = async () => {
        console.log(username, password, ENDPOINTs.LOGIN)
        const res = await login(username, password);
        if (res.token) {
            const decoded = jwt_decode(res.token);
            await localStorage.setItem('token', res.token);
            console.log('decoded', decoded)
            dispatch(createUser(decoded))
            dispatch(singin(true));
        } else {
            setError(true)
            console.log('No habilitar')
        }
    };
    return (
        <div >
            <div className="class-form">
                <div class="colm-form">
                    <form className="form-container" >
                        <div>
                            <label className="label-text">Usuario </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Ingrse nombre de usuario"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.currentTarget.value)}
                            />
                        </div>
                        <div style={{ marginTop: 10}}>
                            <label className="label-text">Clave </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="************"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', height: 30, alignItems: 'center' }}>
                            {
                                error &&
                                <label className="label-error">Usuario o Clave Invalida</label>
                            }

                        </div>

                        <div >
                            <button className="btn-login" type="button" onClick={handleSubmit}>
                                Ingresar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

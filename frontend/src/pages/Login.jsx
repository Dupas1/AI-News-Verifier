import React from "react";

function Login() {
  return (
    <div className="site-container">
      <h1 className="title">Login</h1>
      <form>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
export default function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
       <p className="text-3xl font-bold text-red-500 text-center mt-10">
      Tailwind is working 🎉
    </p>
      <form>
        <input type="text" placeholder="Usuario" /><br />
        <input type="password" placeholder="Contraseña" /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
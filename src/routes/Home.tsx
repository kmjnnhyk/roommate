import useNavigate from "../hooks/useNavigate.hook";

export default function Home() {
  const { navigate } = useNavigate();

  return (
    <div>
      <span>
        <button
          type="button"
          onClick={() => {
            navigate("home");
          }}
        >
          home
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("content");
          }}
        >
          content
        </button>
      </span>
    </div>
  );
}

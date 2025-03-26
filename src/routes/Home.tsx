import { useNavigate } from "../router";

export default function Home() {
  const { navigate } = useNavigate();

  return (
    <div>
      <span>
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          home
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/content", { id: "7" });
          }}
        >
          content
        </button>
      </span>
    </div>
  );
}

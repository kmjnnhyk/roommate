import { useNavigate } from "../router";

export default function Root() {
  const { navigate } = useNavigate();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          navigate("/room/$id", { id: "1234" });
        }}
      >
        go game id
      </button>
    </div>
  );
}

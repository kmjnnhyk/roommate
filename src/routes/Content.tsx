import { useNavigate } from "../router";

export default function Content() {
  const { navigate } = useNavigate();

  return (
    <div>
      content
      <button
        type="button"
        onClick={() => {
          navigate("");
        }}
      >
        go back
      </button>
    </div>
  );
}

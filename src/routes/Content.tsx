import useNavigate from "../hooks/useNavigate.hook";

export default function Content() {
  const { navigate } = useNavigate();

  return (
    <div>
      content
      <button
        type="button"
        onClick={() => {
          navigate("home");
        }}
      >
        go back
      </button>
    </div>
  );
}

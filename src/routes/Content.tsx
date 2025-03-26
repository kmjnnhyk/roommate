import { useNavigate } from "../router";

export default function Content() {
  const { goBack, getSearchParams } = useNavigate();
  const params = getSearchParams("/content");

  return (
    <div>
      {`content ${params.id}`}
      <button
        type="button"
        onClick={() => {
          goBack();
        }}
      >
        go back
      </button>
    </div>
  );
}

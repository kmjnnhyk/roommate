const useNavigate = () => {
  const navigate = (path: string) => {
    window.location.replace(`http://localhost:5173/${path}`);
  };

  const goBack = () => {
    window.history.back();
  };

  return { navigate, goBack };
};

export default useNavigate;

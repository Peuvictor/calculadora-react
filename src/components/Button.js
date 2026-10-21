export default function Button({ label, onClick, spanTwo }) {
  return (
    <button
      className={spanTwo ? "span-two" : ""}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

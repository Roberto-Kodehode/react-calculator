import "./display.css";

export default function Display({ value }) {
  return (
    <div className="display" mode="single" max={70}>
      {value}
    </div>
  );
}

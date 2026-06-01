export default function Progress({numQuestions, index}) {
  return (
    <header className="progress">
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>Points X/X</p>
    </header>
  );
}
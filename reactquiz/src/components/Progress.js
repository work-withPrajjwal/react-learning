export default function Progress({numQuestions, index}) {
  return (
    <header className="progress">
      <p>
        Question <stong>{index + 1}</stong>/{numQuestions}
      </p>
      <p>Points X/X</p>
    </header>
  );
}
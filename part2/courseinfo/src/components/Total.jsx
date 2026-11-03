const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => {
    return a + b.exercises;
  }, 0);
  return <p>total of {total} exercises</p>;
};

export default Total;

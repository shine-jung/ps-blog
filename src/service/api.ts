export const fetchProblemInfo = async (problemId: number) => {
  return await (
    await fetch(`https://solved.ac/api/v3/problem/show?problemId=${problemId}`)
  ).json();
};

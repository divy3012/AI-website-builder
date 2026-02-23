const extractJson = async (text) => {
  if (!text) {
    return;
  }
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrase = cleaned.indexOf("{");
  const secoundBrase = cleaned.lastIndexOf("}");

  if (firstBrase == -1 || secoundBrase == -1) return null;
  const jsonString = cleaned.slice(firstBrase, secoundBrase + 1);
  return JSON.parse(jsonString);
};

export default extractJson;
